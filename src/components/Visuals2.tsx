import { useEffect, useMemo, useState } from "react";
import { fa, usePrefersReducedMotion } from "../lib/hooks";

/* ابزارهای مشترک */
function Btn({ on, onClick, children }: { on?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md border text-xs font-bold transition-all duration-300 cursor-pointer ${
        on ? "bg-amber text-night-900 border-amber shadow-[0_0_16px_rgba(255,180,84,0.3)]" : "border-linec text-dim hover:border-amber/50 hover:text-mist"
      }`}
    >
      {children}
    </button>
  );
}

function Box({ title, children, foot }: { title: string; children: React.ReactNode; foot?: string }) {
  return (
    <div className="border border-linec bg-night-900/80 rounded-md p-5 select-none">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="font-display text-lg text-mist">{title}</p>
      </div>
      {children}
      {foot && <p className="text-[11.5px] text-faint mt-3 leading-6 border-t border-linec/70 pt-2.5">{foot}</p>}
    </div>
  );
}

/* ---------- ۱) پیمایش گراف: BFS در برابر DFS ---------- */
const G: Record<number, number[]> = { 0: [1, 2], 1: [0, 3, 4], 2: [0, 4], 3: [1, 5], 4: [1, 2, 5], 5: [3, 4, 6], 6: [5] };
const POS: Record<number, [number, number]> = { 0: [160, 26], 1: [88, 88], 2: [232, 88], 3: [42, 158], 4: [160, 158], 5: [272, 158], 6: [160, 216] };

type Snap = { visited: number[]; frontier: number[]; cur: number | null };
function run(mode: "bfs" | "dfs"): Snap[] {
  const seen = new Set<number>([0]);
  const fr = [0];
  const snaps: Snap[] = [{ visited: [], frontier: [0], cur: null }];
  while (fr.length) {
    const cur = mode === "bfs" ? fr.shift()! : fr.pop()!;
    for (const nb of G[cur]) if (!seen.has(nb)) { seen.add(nb); fr.push(nb); }
    snaps.push({ visited: [...snaps[snaps.length - 1].visited, cur], frontier: [...fr], cur });
  }
  return snaps;
}

export function BfsDfs() {
  const [mode, setMode] = useState<"bfs" | "dfs">("bfs");
  const [step, setStep] = useState(0);
  const [play, setPlay] = useState(false);
  const reduced = usePrefersReducedMotion();
  const snaps = useMemo(() => run(mode), [mode]);

  useEffect(() => {
    setStep(0); setPlay(false);
  }, [mode]);

  useEffect(() => {
    if (!play || reduced) return;
    const id = window.setInterval(() => setStep((s) => (s >= snaps.length - 1 ? (setPlay(false), s) : s + 1)), 850);
    return () => window.clearInterval(id);
  }, [play, snaps.length, reduced]);

  const s = snaps[step];
  const edges: [number, number][] = [];
  Object.keys(G).forEach((k) => G[+k].forEach((n) => { if (+k < n) edges.push([+k, n]); }));

  return (
    <Box title="شبیه‌ساز: پیمایش گراف — صف در برابر پشته" foot="BFS با «صف» لایه‌به‌لایه جلو می‌رود (نزدیک‌ترین‌ها اول)؛ DFS با «پشته» تا ته یک شاخه می‌رود و برمی‌گردد. هر دو از ساختمان داده‌های درس قبل می‌آیند — پیمایش، جایی است که آن‌ها زنده می‌شوند.">
      <div className="flex items-center gap-2 mb-3">
        <Btn on={mode === "bfs"} onClick={() => setMode("bfs")}>BFS (صف)</Btn>
        <Btn on={mode === "dfs"} onClick={() => setMode("dfs")}>DFS (پشته)</Btn>
        <span className="mx-1 w-px h-5 bg-linec" />
        <Btn on={play} onClick={() => { if (step >= snaps.length - 1) setStep(0); setPlay(!play); }}>{play ? "توقف" : "پخش خودکار"}</Btn>
        <Btn onClick={() => { setPlay(false); setStep(Math.max(0, step - 1)); }}>قبلی</Btn>
        <Btn onClick={() => { setPlay(false); setStep(Math.min(snaps.length - 1, step + 1)); }}>بعدی</Btn>
        <span className="mr-auto text-[11px] text-faint font-code">{fa(step)} / {fa(snaps.length - 1)}</span>
      </div>

      <svg viewBox="0 0 320 240" className="w-full max-w-md mx-auto">
        {edges.map(([a, b]) => {
          const active = s.visited.includes(a) && s.visited.includes(b);
          return <line key={`${a}-${b}`} x1={POS[a][0]} y1={POS[a][1]} x2={POS[b][0]} y2={POS[b][1]} stroke={active ? "var(--color-teal)" : "var(--color-night-600)"} strokeWidth={active ? 2.5 : 1.5} className="transition-all duration-500" />;
        })}
        {Object.keys(POS).map((k) => {
          const n = +k;
          const isCur = s.cur === n;
          const isVis = s.visited.includes(n);
          const isFr = s.frontier.includes(n);
          return (
            <g key={n} className="transition-all duration-500">
              <circle cx={POS[n][0]} cy={POS[n][1]} r={16} fill={isCur ? "var(--color-amber)" : isVis ? "var(--color-teal)" : "var(--color-night-800)"} stroke={isFr && !isVis ? "var(--color-cyan)" : isVis || isCur ? "transparent" : "var(--color-night-600)"} strokeWidth={2.5} className={`transition-all duration-500 ${isCur ? "scale-110" : ""}`} style={{ transformOrigin: `${POS[n][0]}px ${POS[n][1]}px` }} />
              <text x={POS[n][0]} y={POS[n][1] + 4} textAnchor="middle" fontSize="12" fontWeight="bold" fill={isVis || isCur ? "var(--color-night-900)" : "var(--color-dim)"}>{fa(n)}</text>
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap items-center gap-2 justify-center mt-2 min-h-[34px]">
        <span className="text-[11px] text-faint font-code">{mode === "bfs" ? "queue:" : "stack:"}</span>
        {s.frontier.length === 0 && <span className="text-[11px] text-faint">— خالی —</span>}
        {s.frontier.map((n, i) => (
          <span key={`${n}-${i}`} className="pop-in w-7 h-7 grid place-items-center rounded border border-cyan/40 bg-cyan/10 text-cyan text-xs font-code">{fa(n)}</span>
        ))}
        <span className="text-[11px] text-faint font-code mr-3">ترتیب بازدید:</span>
        <span className="text-xs text-teal font-code" dir="ltr">{s.visited.map((n) => fa(n)).join(" → ") || "—"}</span>
      </div>
    </Box>
  );
}

/* ---------- ۲) جدول برنامه‌ریزی پویا (کوله‌پشتی) ---------- */
const ITEMS = [{ w: 2, v: 3 }, { w: 3, v: 4 }, { w: 4, v: 5 }, { w: 5, v: 6 }];
const CAP = 5;
function buildTable(): number[][] {
  const t: number[][] = [];
  for (let i = 0; i < ITEMS.length; i += 1) {
    const row: number[] = [];
    for (let w = 0; w <= CAP; w += 1) {
      const skip = i === 0 ? 0 : t[i - 1][w];
      const take = i > 0 && w >= ITEMS[i].w ? t[i - 1][w - ITEMS[i].w] + ITEMS[i].v : -1;
      row.push(Math.max(skip, take));
    }
    t.push(row);
  }
  return t;
}

export function DpTable() {
  const T = useMemo(buildTable, []);
  const total = ITEMS.length * (CAP + 1);
  const [step, setStep] = useState(0);
  const [play, setPlay] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!play || reduced) return;
    const id = window.setInterval(() => setStep((s) => (s >= total ? (setPlay(false), s) : s + 1)), 300);
    return () => window.clearInterval(id);
  }, [play, total, reduced]);

  const filled = step;
  const cur = filled - 1;
  const ci = cur >= 0 ? Math.floor(cur / (CAP + 1)) : -1;
  const cw = cur >= 0 ? cur % (CAP + 1) : -1;
  const took = ci >= 0 && ci > 0 && cw >= ITEMS[ci].w && T[ci - 1][cw - ITEMS[ci].w] + ITEMS[ci].v > T[ci - 1][cw];

  return (
    <Box title="شبیه‌ساز: پرشدن جدول DP — مسئله کوله‌پشتی" foot="هر خانه بهترین ارزش برای ظرفیت w با i آیتم اول است. خانه فقط به دو خانه قبلی نگاه می‌کند: «برداری» یا «نبرداری» — و این یعنی زیرمسئله‌های تکراری، همان چیزی که DP را از جست‌وجوی نمایی به چندجمله‌ای تبدیل می‌کند.">
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Btn on={play} onClick={() => { if (step >= total) setStep(0); setPlay(!play); }}>{play ? "توقف" : "پخش"}</Btn>
        <Btn onClick={() => { setPlay(false); setStep(Math.max(0, step - 1)); }}>قبلی</Btn>
        <Btn onClick={() => { setPlay(false); setStep(Math.min(total, step + 1)); }}>بعدی</Btn>
        <Btn onClick={() => { setPlay(false); setStep(0); }}>از اول</Btn>
        <span className="mr-auto text-[11px] text-faint font-code">{fa(filled)} / {fa(total)} خانه</span>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-grid gap-1 min-w-[420px]" style={{ gridTemplateColumns: `repeat(${CAP + 1}, minmax(0, 1fr))` }}>
          {T.map((row, i) =>
            row.map((v, w) => {
              const idx = i * (CAP + 1) + w;
              const shown = idx < filled;
              const isCur = idx === cur;
              const isSrc = took && ci > 0 && i === ci - 1 && (w === cw - ITEMS[ci].w || w === cw) && idx < filled;
              return (
                <div key={`${i}-${w}`} className={`h-9 rounded grid place-items-center text-xs font-code transition-all duration-300 border ${
                  isCur ? "bg-amber text-night-900 border-amber scale-110 font-bold" :
                  shown ? isSrc ? "bg-teal/25 text-teal border-teal/50" : "bg-night-800 text-mist border-linec" : "border-linec/40 text-transparent"}`}
                >{shown ? fa(v) : "·"}</div>
              );
            })
          )}
        </div>
      </div>

      <p className="text-center text-[12.5px] text-dim mt-4 leading-7 min-h-[28px]">
        {cur < 0 ? "پخش را بزن تا جدول خانه‌به‌خانه پر شود." :
          took ? <>آیتم {fa(ci + 1)} (وزن {fa(ITEMS[ci].w)}) <b className="text-teal">برداشته شد</b>: بهترینِ قبلی + ارزش آن</> :
          <>آیتم {fa(ci + 1)} جا نمی‌شود یا نمی‌ارزد — <b className="text-mist">بدون آن</b> ادامه می‌دهیم</>}
        {step === total && <b className="text-amber block">✓ جواب: حداکثر ارزش = {fa(T[ITEMS.length - 1][CAP])}</b>}
      </p>
    </Box>
  );
}

/* ---------- ۳) کش LRU ---------- */
const SEQ = [1, 2, 3, 1, 4, 2, 5, 1];
function replay(n: number) {
  let fr: number[] = [];
  let ev = -1;
  let kind: "" | "hit" | "miss" = "";
  for (let i = 0; i < n; i += 1) {
    const k = SEQ[i];
    ev = -1;
    if (fr.includes(k)) {
      fr = [k, ...fr.filter((x) => x !== k)];
      kind = "hit";
    } else {
      if (fr.length >= 3) { ev = fr[fr.length - 1]; fr = fr.slice(0, -1); }
      fr = [k, ...fr];
      kind = "miss";
    }
  }
  return { fr, ev, kind };
}

export function LruCache() {
  const [step, setStep] = useState(0);
  const [play, setPlay] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!play || reduced) return;
    const id = window.setInterval(() => setStep((s) => (s >= SEQ.length ? (setPlay(false), s) : s + 1)), 1100);
    return () => window.clearInterval(id);
  }, [play, reduced]);

  const st = replay(step);
  const key = step > 0 ? SEQ[step - 1] : null;

  return (
    <Box title="شبیه‌ساز: جایگزینی صفحه LRU — حافظه مجازی در عمل" foot="سیستم‌عامل و کش‌ها (Redis، CDN، مرورگر) همه از همین ایده استفاده می‌کنند: وقتی جا نیست، «کم‌اخیراً استفاده‌شده‌ترین» قربانی می‌شود. الگوریتم‌های صفحه‌بندی متفاوت‌اند ولی LRU نقطه شروع همه بحث‌هاست.">
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Btn on={play} onClick={() => { if (step >= SEQ.length) setStep(0); setPlay(!play); }}>{play ? "توقف" : "پخش"}</Btn>
        <Btn onClick={() => { setPlay(false); setStep(Math.max(0, step - 1)); }}>قبلی</Btn>
        <Btn onClick={() => { setPlay(false); setStep(Math.min(SEQ.length, step + 1)); }}>بعدی</Btn>
        <span className="mr-auto text-[11px] text-faint font-code">ظرفیت: {fa(3)} صفحه</span>
      </div>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-[11px] text-faint font-code">دنبال مراجعه:</span>
        {SEQ.map((k, i) => (
          <span key={i} className={`w-7 h-7 grid place-items-center rounded border text-xs font-code transition-all duration-300 ${i === step - 1 ? "bg-amber text-night-900 border-amber scale-110" : i < step ? "text-faint border-linec/50" : "text-dim border-linec"}`}>{fa(k)}</span>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 min-h-[76px]">
        {st.fr.map((k, i) => (
          <div key={`${k}-${i}`} className={`pop-in w-16 h-16 grid place-items-center rounded-md border-2 font-code text-xl font-bold transition-all duration-500 ${i === 0 ? "border-teal text-teal bg-teal/10" : "border-linec text-mist bg-night-800"}`}>{fa(k)}</div>
        ))}
        {Array.from({ length: 3 - st.fr.length }).map((_, i) => (
          <div key={`e-${i}`} className="w-16 h-16 rounded-md border-2 border-dashed border-linec/50 grid place-items-center text-faint text-[10px]">خالی</div>
        ))}
        {st.ev >= 0 && <span className="pop-in mr-3 text-xs font-bold text-coral">← {fa(st.ev)} اخراج شد!</span>}
      </div>

      <p className="text-center text-[12.5px] mt-3 min-h-[22px]">
        {key === null ? <span className="text-faint">پخش را بزن؛ هر عدد یک مراجعه به صفحه است.</span> :
          st.kind === "hit" ? <span className="text-teal font-bold">✓ برخورد (Hit): صفحه {fa(key)} بود — به جلوی صف برگشت</span> :
          <span className="text-coral font-bold">✗ خطای صفحه (Miss): صفحه {fa(key)} آورده شد{st.ev >= 0 ? ` و ${fa(st.ev)} بیرون رفت` : ""}</span>}
      </p>
    </Box>
  );
}

/* ---------- ۴) دست‌دادن TLS ---------- */
const TLS = [
  { d: 1, t: "ClientHello + سهم کلید ECDHE", n: "کلاینت نسخه TLS، فهرست رمزهای پشتیبانی‌شده و یک سهم کلید عمومی می‌فرستد — همه‌چیز آشکار است و باید باشد." },
  { d: -1, t: "ServerHello + گواهی + Finished", n: "سرور سهم کلید خودش و زنجیره گواهی‌اش را می‌فرستد تا هویتش ثابت شود؛ کلاینت امضای CA را با ریشه‌های اعتمادش چک می‌کند." },
  { d: 0, t: "استخراج کلیدهای نشست (هر دو طرف)", n: "هر طرف با سهمِ خود + سهمِ طرف مقابل، مستقل به یک رمز متقارن مشترک می‌رسد — رمزی که هرگز روی شبکه رد و بدل نشد." },
  { d: 1, t: "داده کاربردی — رمزنگاری‌شده", n: "از اینجا به بعد همه‌چیز با AES-GCM است. در TLS 1.3 کل این دست‌دادن فقط ۱ رفت‌وبرگشت طول می‌کشد." },
];

export function TlsHandshake() {
  const [s, setS] = useState(0);
  const [pct, setPct] = useState(0);
  const reduced = usePrefersReducedMotion();
  const cur = TLS[s];

  const go = (n: number) => {
    setS(n);
    if (reduced || TLS[n].d === 0) { setPct(100); return; }
    setPct(0);
    window.setTimeout(() => setPct(100), 40);
  };

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => go((s + 1) % TLS.length), 2600);
    return () => window.clearInterval(id);
  }, [s, reduced]);

  return (
    <Box title="شبیه‌ساز: دست‌دادن TLS 1.3" foot="HTTPS = HTTP روی TLS. دست‌دادن، «هویت» را با رمزنگاری نامتقارن و «سرعت» را با کلید متقارن ترکیب می‌کند — و چون سهم‌های کلید یک‌بار مصرف‌اند (Forward Secrecy)، لو رفتن کلید خصوصی سرور، ترافیک ضبط‌شده قبلی را فاش نمی‌کند.">
      <div className="grid grid-cols-2 text-center font-bold text-sm mb-2">
        <span className="text-cyan">کلاینت (مرورگر)</span>
        <span className="text-amber">سرور</span>
      </div>
      <div className="relative h-40 border-y border-linec/60">
        <span className="absolute right-[18%] top-0 bottom-0 border-r-2 border-dashed border-cyan/25" />
        <span className="absolute left-[18%] top-0 bottom-0 border-r-2 border-dashed border-amber/25" />
        <div key={s} className="absolute top-1/2 -translate-y-1/2 w-[64%] right-[18%]">
          {cur.d !== 0 ? (
            <div className="relative h-10">
              <div className="absolute top-1/2 right-0 left-0 border-t border-dashed border-linec" />
              <span className={`absolute top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-night-700 border border-linec text-[11px] font-bold whitespace-nowrap transition-all duration-700 ease-in-out ${cur.d === 1 ? "text-cyan" : "text-amber"}`} style={{ right: cur.d === 1 ? `${pct * 0.78}%` : "auto", left: cur.d === -1 ? `${pct * 0.78}%` : "auto" }}>
                {cur.t}
              </span>
            </div>
          ) : (
            <div className="pop-in flex items-center justify-between px-2">
              <span className="w-10 h-10 grid place-items-center rounded-full bg-teal/15 border border-teal/50 text-teal font-bold">🔑</span>
              <span className="text-xs font-bold text-teal">کلید مشترک ساخته شد — بدون ارسال روی شبکه</span>
              <span className="w-10 h-10 grid place-items-center rounded-full bg-teal/15 border border-teal/50 text-teal font-bold">🔑</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3">
        {TLS.map((p, i) => (
          <button key={i} onClick={() => go(i)} className={`w-8 h-8 rounded-full border text-xs font-code transition-all cursor-pointer ${i === s ? "bg-amber text-night-900 border-amber" : "border-linec text-faint hover:text-mist"}`}>{fa(i + 1)}</button>
        ))}
        <span className={`mr-auto text-xs font-bold ${s === 3 ? "text-teal" : "text-faint"}`}>{s === 3 ? "🔒 کانال امن برقرار شد" : "در حال مذاکره…"}</span>
      </div>
      <p key={`n-${s}`} className="pop-in text-[12.5px] text-dim leading-7 mt-3 border border-linec/70 rounded-md p-3 bg-night-800/50">{cur.n}</p>
    </Box>
  );
}

/* ---------- ۵) Quorum با خرابی گره ---------- */
export function Quorum() {
  const [W, setW] = useState(2);
  const [R, setR] = useState(2);
  const [dead, setDead] = useState([false, true, false]);
  const [res, setRes] = useState<{ kind: "w" | "r"; oks: boolean[]; ok: boolean; msg: string } | null>(null);

  const alive = dead.filter((d) => !d).length;

  const doWrite = () => {
    const oks = dead.map((d) => !d);
    const ok = oks.filter(Boolean).length >= W;
    setRes({ kind: "w", oks, ok, msg: ok ? `نوشتن موفق: ${fa(oks.filter(Boolean).length)} تأیید از ${fa(W)} لازم` : `نوشتن رد شد: فقط ${fa(oks.filter(Boolean).length)} گره زنده است و ${fa(W)} تأیید لازم بود` });
  };
  const doRead = () => {
    const oks = dead.map((d) => !d);
    const ok = oks.filter(Boolean).length >= R;
    const strong = W + R > 3;
    setRes({ kind: "r", oks, ok, msg: !ok ? `خواندن ناموفق: ${fa(R)} پاسخ لازم است ولی ${fa(oks.filter(Boolean).length)} گره زنده است` : strong ? "خواندن سازگار: R + W > N — حتماً جدیدترین مقدار را می‌بینی" : "خواندن انجام شد ولی R + W ≤ N — ممکن است کپی قدیمی برگردد!" });
  };

  return (
    <Box title="شبیه‌ساز: Quorum — خریدن سازگاری با پول دسترس‌پذیری" foot="N=3 کپی. با W=2 و R=2 چون R+W=4 > 3 است، هر خواندن حتماً به کپیِ تازه می‌رسد و سیستم یک خرابی را هم تحمل می‌کند. اعداد را عوض کن و ببین فرمول چطور سرنوشت را عوض می‌کند.">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <span className="flex items-center gap-1.5">
          <span className="text-[11px] text-faint font-code">W =</span>
          {[1, 2, 3].map((v) => <Btn key={v} on={W === v} onClick={() => setW(v)}>{fa(v)}</Btn>)}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-[11px] text-faint font-code">R =</span>
          {[1, 2, 3].map((v) => <Btn key={v} on={R === v} onClick={() => setR(v)}>{fa(v)}</Btn>)}
        </span>
        <span className={`text-[11px] font-code mr-auto ${W + R > 3 ? "text-teal" : "text-coral"}`}>R + W = {fa(W + R)} {W + R > 3 ? ">" : "≤"} N=3</span>
      </div>

      <div className="flex items-center justify-center gap-6 mb-4">
        {dead.map((d, i) => (
          <button key={i} onClick={() => { setDead((p) => p.map((x, xi) => (xi === i ? !x : x))); setRes(null); }} className="group text-center cursor-pointer">
            <span className={`w-16 h-16 grid place-items-center rounded-full border-2 text-xl font-bold transition-all duration-300 ${d ? "border-coral/60 bg-coral/10 text-coral line-through opacity-60" : res?.oks[i] ? (res.oks[i] ? "border-teal bg-teal/15 text-teal" : "border-linec text-faint") : "border-cyan/40 bg-cyan/5 text-cyan group-hover:scale-105"}`}>
              {d ? "✗" : fa(i + 1)}
            </span>
            <span className="block text-[10px] text-faint mt-1.5">{d ? "مرده — کلیک: زنده کن" : "زنده — کلیک: از کار بینداز"}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 mb-3">
        <Btn onClick={doWrite}>نوشتن X=7</Btn>
        <Btn onClick={doRead}>خواندن X</Btn>
        <span className="text-[11px] text-faint font-code">گره‌های زنده: {fa(alive)} از {fa(3)}</span>
      </div>

      {res && (
        <p key={res.msg} className={`pop-in text-center text-[13px] font-bold rounded-md border px-4 py-3 ${res.ok ? (res.kind === "r" && W + R <= 3 ? "border-amber/50 bg-amber/10 text-amber" : "border-teal/50 bg-teal/10 text-teal") : "border-coral/50 bg-coral/10 text-coral"}`}>{res.msg}</p>
      )}
    </Box>
  );
}

/* ---------- ۶) دیاگرام توالی ---------- */
const ACTORS = ["کاربر", "مرورگر", "API", "دیتابیس"];
const MSGS = [
  { f: 0, t: 1, l: "کلیک روی «سفارش‌ها»" },
  { f: 1, t: 2, l: "GET /api/orders" },
  { f: 2, t: 3, l: "SELECT با پارامتر کاربر", back: false },
  { f: 3, t: 2, l: "ردیف‌های سفارش", back: true },
  { f: 2, t: 1, l: "200 OK + JSON", back: true },
  { f: 1, t: 0, l: "رندر فهرست", back: true },
];
const X = [46, 140, 234, 322];

export function SeqDiagram() {
  const [step, setStep] = useState(0);
  const [play, setPlay] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!play || reduced) return;
    const id = window.setInterval(() => setStep((s) => (s >= MSGS.length ? (setPlay(false), s) : s + 1)), 1100);
    return () => window.clearInterval(id);
  }, [play, reduced]);

  return (
    <Box title="شبیه‌ساز: دیاگرام توالی — یک درخواست از کلیک تا پیکسل" foot="دیاگرام توالی (Sequence) محبوب‌ترین نمودار UML برای معماری است: نشان می‌دهد «چه کسی، چه زمانی، چه پیامی» می‌فرستد. وقتی در جلسه معماری بحث بالا می‌گیرد، کشیدن همین شکل ساده معمولاً گره را باز می‌کند.">
      <div className="flex items-center gap-2 mb-3">
        <Btn on={play} onClick={() => { if (step >= MSGS.length) setStep(0); setPlay(!play); }}>{play ? "توقف" : "پخش"}</Btn>
        <Btn onClick={() => { setPlay(false); setStep(Math.max(0, step - 1)); }}>قبلی</Btn>
        <Btn onClick={() => { setPlay(false); setStep(Math.min(MSGS.length, step + 1)); }}>بعدی</Btn>
        <span className="mr-auto text-[11px] text-faint font-code">{fa(step)} / {fa(MSGS.length)}</span>
      </div>

      <svg viewBox="0 0 368 264" className="w-full max-w-lg mx-auto">
        {ACTORS.map((a, i) => (
          <g key={a}>
            <rect x={X[i] - 34} y={6} width={68} height={24} rx={5} fill="var(--color-night-800)" stroke="var(--color-night-600)" />
            <text x={X[i]} y={22} textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--color-mist)" fontFamily="Vazirmatn">{a}</text>
            <line x1={X[i]} y1={34} x2={X[i]} y2={256} stroke="var(--color-night-600)" strokeDasharray="3 5" />
          </g>
        ))}
        {MSGS.map((m, i) => {
          const y = 58 + i * 33;
          const on = i < step;
          const active = i === step - 1;
          const x1 = X[m.f];
          const x2 = X[m.t];
          const right = Math.min(x1, x2);
          const w = Math.abs(x2 - x1);
          return (
            <g key={i} className="transition-opacity duration-500" opacity={on ? 1 : 0.12}>
              <line x1={x1} y1={y} x2={x2} y2={y} stroke={active ? "var(--color-amber)" : m.back ? "var(--color-teal)" : "var(--color-cyan)"} strokeWidth={active ? 2.5 : 1.8} strokeDasharray={m.back ? "5 4" : undefined} />
              <path d={`M ${x2} ${y} l ${x2 > x1 ? -7 : 7} -4 v 8 Z`} fill={active ? "var(--color-amber)" : m.back ? "var(--color-teal)" : "var(--color-cyan)"} />
              <text x={right + w / 2} y={y - 6} textAnchor="middle" fontSize="9.5" fill={active ? "var(--color-amber)" : "var(--color-dim)"} fontFamily="Vazirmatn">{m.l}</text>
              {active && <circle r="3.5" fill="var(--color-amber)"><animate attributeName="cx" from={x1} to={x2} dur="0.9s" repeatCount="indefinite" /><animate attributeName="cy" values={`${y};${y}`} dur="0.9s" repeatCount="indefinite" /></circle>}
            </g>
          );
        })}
      </svg>
      <p className="text-center text-[12px] text-faint mt-2">خطوط نقطه‌چین = پاسخ‌ها؛ خط پر = درخواست. فلش زرد، پیامِ در حال پرواز است.</p>
    </Box>
  );
}

/* ---------- ۷) معماری لایه‌ای (جریان درخواست) ---------- */
const LAYERS = [
  { t: "رابط و فریم‌ورک", c: "coral", d: "HTTP، HTML، فریم‌ورک وب — قابل‌تعویض‌ترین لایه" },
  { t: "سازگارکننده‌ها", c: "cyan", d: "Controller، درگاه دیتابیس، کلاینت APIهای بیرونی" },
  { t: "موارد کاربرد", c: "amber", d: "جریان‌های کاری: «ثبت سفارش» — بدون جزئیات فنی" },
  { t: "دامنه", c: "teal", d: "Entities و قوانین کسب‌وکار — قلب تغییرناپذیر" },
];
const IN_MSG = ["درخواست HTTP رسید", "Controller درخواست را به Use Case نگاشت کرد", "Use Case جریان کار را اجرا می‌کند", "قوانین دامنه اعمال شد — قلب سیستم"];
const OUT_MSG = ["نتیجه به سمت بیرون برمی‌گردد", "Presenter خروجی را به JSON تبدیل کرد", "پاسخ 200 به مرورگر فرستاده شد", ""];

export function OnionArch() {
  const [step, setStep] = useState(0);
  const [play, setPlay] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!play || reduced) return;
    const id = window.setInterval(() => setStep((s) => (s >= 7 ? (setPlay(false), s) : s + 1)), 1300);
    return () => window.clearInterval(id);
  }, [play, reduced]);

  const inward = step < 4;
  const active = inward ? step : 7 - step;
  const msg = inward ? IN_MSG[step] : OUT_MSG[step - 4];

  return (
    <Box title="شبیه‌ساز: جریان درخواست در معماری لایه‌ای" foot="قانون وابستگی: فلش‌ها فقط رو به داخل‌اند. دامنه هیچ‌کس را نمی‌شناسد؛ Use Case فقط دامنه را؛ و قاب بیرونی قابل‌تعویض است. نتیجه: تغییر دیتابیس یا فریم‌ورک، قلب سیستم را لمس نمی‌کند.">
      <div className="flex items-center gap-2 mb-4">
        <Btn on={play} onClick={() => { if (step >= 7) setStep(0); setPlay(!play); }}>{play ? "توقف" : "پخش"}</Btn>
        <Btn onClick={() => { setPlay(false); setStep(Math.max(0, step - 1)); }}>قبلی</Btn>
        <Btn onClick={() => { setPlay(false); setStep(Math.min(7, step + 1)); }}>بعدی</Btn>
        <span className={`mr-auto text-xs font-bold ${inward ? "text-cyan" : "text-teal"}`}>{inward ? "⬅ رفتن به درون" : "➡ برگشتن به بیرون"}</span>
      </div>

      <div className="space-y-1.5">
        {LAYERS.map((l, i) => {
          const on = i === active;
          const pad = i * 22;
          return (
            <div key={l.t} style={{ marginRight: pad, marginLeft: pad }} className={`rounded-md border-2 px-4 py-3 flex items-center justify-between gap-3 transition-all duration-500 ${on ? `border-${l.c} bg-night-800` : "border-linec/70 bg-night-900/50"}`}>
              <span className={`text-[13px] font-bold transition-colors duration-500 ${on ? `text-${l.c}` : "text-dim"}`}>{l.t}</span>
              <span className="text-[10.5px] text-faint hidden sm:block">{l.d}</span>
              {on && <span className={`pop-in w-3 h-3 rounded-full ${inward ? "bg-cyan" : "bg-teal"} glow-pulse shrink-0`} />}
            </div>
          );
        })}
      </div>

      <p key={step} className="pop-in text-center text-[13px] font-bold text-mist mt-4 min-h-[22px]">{msg || "پایان چرخه — وابستگی‌ها فقط رو به داخل بودند"}</p>
    </Box>
  );
}
