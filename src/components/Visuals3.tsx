import { useState } from "react";
import { fa, faGroup } from "../lib/hooks";

/* ============================================================
   شبیه‌سازهای دیجیتال مارکتینگ
   ============================================================ */

/* ---------- قیف بازاریابی تعاملی ---------- */
export function MktFunnel() {
  const [top, setTop] = useState(10000);
  const [rates, setRates] = useState([10, 30, 35]); // آگاهی→علاقه، علاقه→بررسی، بررسی→خرید (درصد)

  const stages = ["آگاهی", "علاقه", "بررسی", "خرید"];
  const counts = [top];
  for (let i = 0; i < 3; i += 1) {
    counts.push(Math.round((counts[i] * rates[i]) / 100));
  }
  const customers = counts[3];
  const overall = top > 0 ? ((customers / top) * 100).toFixed(2) : "0";
  const maxCount = counts[0] || 1;

  const setRate = (i: number, v: number) =>
    setRates((prev) => prev.map((r, j) => (j === i ? v : r)));

  const colors = ["#5ec8ea", "#3fd8b6", "#ffb454", "#ff7a63"];

  return (
    <div className="border border-linec bg-night-900/80 rounded-md p-5 select-none">
      <div className="flex items-center justify-between mb-4">
        <span className="font-code text-[10px] tracking-[0.25em] text-faint">MARKETING FUNNEL</span>
        <span className="text-[11px] text-faint">نرخ‌ها را تغییر بده و اثرش را روی مشتری نهایی ببین</span>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        {["آگاهی → علاقه", "علاقه → بررسی", "بررسی → خرید"].map((label, i) => (
          <label key={label} className="block">
            <span className="flex justify-between text-[11px] text-dim mb-1">
              <span>{label}</span>
              <span className="font-code" style={{ color: colors[i + 1] }}>{fa(rates[i])}٪</span>
            </span>
            <input
              type="range"
              min={5}
              max={80}
              step={1}
              value={rates[i]}
              onChange={(e) => setRate(i, Number(e.target.value))}
              className="w-full accent-[#ffb454] cursor-pointer"
              aria-label={label}
            />
          </label>
        ))}
      </div>

      <div className="space-y-2">
        {stages.map((s, i) => {
          const widthPct = Math.max(14, (counts[i] / maxCount) * 100);
          return (
            <div key={s} className="flex items-center gap-3">
              <span className="w-14 shrink-0 text-[12px] text-dim text-left">{s}</span>
              <div className="flex-1">
                <div
                  className="h-9 rounded flex items-center justify-center text-[12px] font-bold text-night-900 transition-all duration-500 mx-auto"
                  style={{ width: `${widthPct}%`, backgroundColor: colors[i] }}
                >
                  {faGroup(counts[i])} نفر
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <div className="border border-linec rounded-md p-3">
          <p className="text-[11px] text-faint">ورودی قیف</p>
          <p className="font-code text-lg text-cyan mt-1">{faGroup(top)}</p>
        </div>
        <div className="border border-linec rounded-md p-3">
          <p className="text-[11px] text-faint">مشتری نهایی</p>
          <p className="font-code text-lg text-amber mt-1">{faGroup(customers)}</p>
        </div>
        <div className="border border-linec rounded-md p-3">
          <p className="text-[11px] text-faint">نرخ تبدیل کل</p>
          <p className="font-code text-lg text-coral mt-1">{fa(overall)}٪</p>
        </div>
      </div>

      <p className="text-[11px] text-faint mt-4 leading-6">
        هر ۱٪ بهبود در نرخ میانه قیف، مستقیم تعداد مشتری نهایی را چند درصد بالا می‌برد — به همین دلیل بهینه‌سازی
        مرحله‌ای (CRO) معمولاً از خرید ترافیک جدید بازده بیشتری دارد.
      </p>
    </div>
  );
}

/* ---------- ماشین‌حساب A/B Test ---------- */
export function AbTestCalc() {
  const [nA, setNA] = useState(2000);
  const [xA, setXA] = useState(40);
  const [nB, setNB] = useState(2000);
  const [xB, setXB] = useState(62);

  const pA = nA > 0 ? xA / nA : 0;
  const pB = nB > 0 ? xB / nB : 0;
  const pPool = nA + nB > 0 ? (xA + xB) / (nA + nB) : 0;
  const se =
    nA > 0 && nB > 0 && pPool > 0 && pPool < 1
      ? Math.sqrt(pPool * (1 - pPool) * (1 / nA + 1 / nB))
      : 0;
  const z = se > 0 ? (pB - pA) / se : 0;
  const significant = Math.abs(z) >= 1.96;
  const lift = pA > 0 ? ((pB - pA) / pA) * 100 : 0;

  const Field = ({
    label,
    value,
    onChange,
    max,
  }: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    max?: number;
  }) => (
    <label className="block">
      <span className="block text-[11px] text-dim mb-1">{label}</span>
      <input
        type="number"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        className="w-full bg-night-950 border border-linec rounded px-3 py-2 text-sm font-code text-mist outline-none focus:border-amber/60 transition-colors"
        dir="ltr"
      />
    </label>
  );

  return (
    <div className="border border-linec bg-night-900/80 rounded-md p-5 select-none">
      <div className="flex items-center justify-between mb-4">
        <span className="font-code text-[10px] tracking-[0.25em] text-faint">A/B TEST SIGNIFICANCE</span>
        <span className="text-[11px] text-faint">آیا نسخه B واقعاً بهتر است یا شانس؟</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="border border-linec rounded-md p-4 space-y-3">
          <p className="font-bold text-sm text-cyan">نسخه A (کنترل)</p>
          <Field label="تعداد بازدیدکننده" value={nA} onChange={setNA} />
          <Field label="تعداد تبدیل" value={xA} onChange={setXA} max={nA} />
          <p className="text-[12px] text-dim">
            نرخ تبدیل: <span className="font-code text-cyan">{fa((pA * 100).toFixed(2))}٪</span>
          </p>
        </div>
        <div className="border border-linec rounded-md p-4 space-y-3">
          <p className="font-bold text-sm text-amber">نسخه B (تست)</p>
          <Field label="تعداد بازدیدکننده" value={nB} onChange={setNB} />
          <Field label="تعداد تبدیل" value={xB} onChange={setXB} max={nB} />
          <p className="text-[12px] text-dim">
            نرخ تبدیل: <span className="font-code text-amber">{fa((pB * 100).toFixed(2))}٪</span>
          </p>
        </div>
      </div>

      <div className="mt-5 border border-linec rounded-md p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[12px] text-faint">بهبود نسخه B نسبت به A</p>
            <p className={`font-code text-2xl mt-1 ${lift >= 0 ? "text-teal" : "text-coral"}`}>
              {lift >= 0 ? "+" : ""}
              {fa(lift.toFixed(1))}٪
            </p>
          </div>
          <div
            className={`rounded-md px-4 py-2 text-sm font-bold ${
              significant
                ? lift >= 0
                  ? "bg-teal/15 text-teal border border-teal/40"
                  : "bg-coral/15 text-coral border border-coral/40"
                : "bg-night-800 text-dim border border-linec"
            }`}
          >
            {significant
              ? lift >= 0
                ? "✓ معنادار — B واقعاً بهتر است"
                : "✗ معنادار — B واقعاً بدتر است"
              : "هنوز معنادار نیست — داده بیشتری لازم است"}
          </div>
        </div>
        <p className="text-[11px] text-faint mt-3 leading-6">
          مقدار Z برابر <span className="font-code" dir="ltr">{z.toFixed(2)}</span> است؛ اگر قدر مطلق آن از
          <span className="font-code" dir="ltr"> 1.96 </span>
          بیشتر باشد، تفاوت در سطح اطمینان ۹۵٪ معنادار است. تفاوت‌های کوچک با نمونه کم، معمولاً فقط نویز هستند —
          قبل از تعویض نسخه، صبر کن تا داده کافی جمع شود.
        </p>
      </div>
    </div>
  );
}
