import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { fa, faGroup, usePrefersReducedMotion } from "../lib/hooks";

/* ---------- قاب مشترک ---------- */
function Frame({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <figure className="my-7 border border-linec rounded-md bg-night-950/80 overflow-hidden">
      <figcaption className="flex items-center justify-between gap-3 px-5 py-3 border-b border-linec bg-night-800/60">
        <span className="font-bold text-[13px] text-amber">{title}</span>
        <span className="flex items-center gap-1.5 text-[9px] font-code text-teal border border-teal/30 bg-teal/5 rounded px-2 py-1 tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-teal glow-pulse" />
          INTERACTIVE
        </span>
      </figcaption>
      <div className="p-5">{children}</div>
      {hint && <p className="px-5 pb-4 -mt-2 text-[11.5px] leading-6 text-faint">{hint}</p>}
    </figure>
  );
}

function VBtn({ onClick, active, children, disabled }: { onClick: () => void; active?: boolean; children: ReactNode; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-xs font-semibold rounded-md border px-3.5 py-1.5 transition-all duration-200 ${
        active ? "bg-amber text-night-900 border-amber" : "border-linec text-dim hover:border-amber/50 hover:text-amber"
      } ${disabled ? "opacity-40 cursor-default" : ""}`}
    >
      {children}
    </button>
  );
}

function useTicker(on: boolean, ms: number, fn: () => void) {
  const cb = useRef(fn);
  cb.current = fn;
  useEffect(() => {
    if (!on) return;
    const id = window.setInterval(() => cb.current(), ms);
    return () => window.clearInterval(id);
  }, [on, ms]);
}

/* ---------- ۱) نمودار Big-O ---------- */
function BigO() {
  const [n, setN] = useState(16);
  const [shown, setShown] = useState<string[]>(["O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n²)"]);
  const reduced = usePrefersReducedMotion();
  const [drawn, setDrawn] = useState(reduced);
  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => setDrawn(true), 60);
    return () => window.clearTimeout(t);
  }, [reduced]);

  const fns: { name: string; f: (x: number) => number; color: string }[] = [
    { name: "O(1)", f: () => 1, color: "#5ec8ea" },
    { name: "O(log n)", f: (x) => Math.log2(x + 1), color: "#3fd8b6" },
    { name: "O(n)", f: (x) => x, color: "#ffb454" },
    { name: "O(n log n)", f: (x) => x * Math.log2(x + 1), color: "#e8b4ff" },
    { name: "O(n²)", f: (x) => x * x, color: "#ff7a63" },
  ];
  const W = 560, H = 250, P = 14;
  const X = (x: number) => P + ((x - 1) / 63) * (W - 2 * P);
  const Y = (v: number) => H - P - (Math.sqrt(v) / 64) * (H - 2 * P);
  const path = (f: (x: number) => number) => {
    let d = "";
    for (let x = 1; x <= 64; x += 1) d += `${x === 1 ? "M" : "L"}${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`;
    return d;
  };

  return (
    <Frame title="نمودار رشد تابع پیچیدگی — n را تغییر بده" hint="محور عمودی ریشه‌دوم گرفته تا همه منحنی‌ها دیده شوند؛ عدد واقعی عملیات زیر نمودار آمده. فاصله O(n²) از بقیه را در n=۶۴ ببین!">
      <div dir="ltr">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1={P} x2={W - P} y1={P + g * (H - 2 * P)} y2={P + g * (H - 2 * P)} stroke="rgba(124,178,232,0.12)" strokeDasharray="4 6" />
          ))}
          <line x1={X(n)} x2={X(n)} y1={P} y2={H - P} stroke="#ffb454" strokeWidth="1.2" strokeDasharray="3 5" opacity="0.8" />
          {fns.filter((f) => shown.includes(f.name)).map((c) => (
            <g key={c.name}>
              <path
                d={path(c.f)}
                fill="none"
                stroke={c.color}
                strokeWidth="2.2"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={drawn ? 0 : 1}
                style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)" }}
              />
              <circle cx={X(n)} cy={Y(c.f(n))} r="4.5" fill={c.color} stroke="#050d16" strokeWidth="1.5" style={{ transition: "cx 0.2s, cy 0.2s" }} />
            </g>
          ))}
          <text x={X(n)} y={P - 2} fill="#ffb454" fontSize="11" textAnchor="middle" fontFamily="JetBrains Mono">n={n}</text>
        </svg>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        {fns.map((c) => (
          <button
            key={c.name}
            onClick={() => setShown((s) => (s.includes(c.name) ? s.filter((x) => x !== c.name) : [...s, c.name]))}
            className="flex items-center gap-2 text-[11px] font-code border rounded-md px-2.5 py-1.5 transition-all"
            style={{ borderColor: shown.includes(c.name) ? c.color : "rgba(124,178,232,0.14)", color: shown.includes(c.name) ? c.color : "#64809c", opacity: shown.includes(c.name) ? 1 : 0.5 }}
          >
            <span className="w-3 h-[3px] rounded-full" style={{ background: c.color }} />
            {c.name}: {faGroup(Math.round(c.f(n)))} عملیات
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3" dir="ltr">
        <span className="font-code text-[11px] text-faint">n=2</span>
        <input type="range" min={2} max={64} value={n} onChange={(e) => setN(+e.target.value)} className="w-full accent-amber" />
        <span className="font-code text-[11px] text-faint">n=64</span>
      </div>
    </Frame>
  );
}

/* ---------- ۲) درج در آرایه ---------- */
function ArrayInsert() {
  const BASE = [10, 22, 31, 44, 55, 60];
  const [arr, setArr] = useState<number[]>(BASE);
  const [phase, setPhase] = useState<"idle" | "shift" | "done">("idle");
  const [shifts, setShifts] = useState(0);
  const tm = useRef(0);
  useEffect(() => () => window.clearTimeout(tm.current), []);

  const insert = () => {
    if (phase !== "idle") return;
    setPhase("shift");
    setShifts(arr.length - 2);
    tm.current = window.setTimeout(() => {
      setArr([10, 22, 25, 31, 44, 55, 60]);
      setPhase("done");
    }, 520);
  };
  const reset = () => { setArr(BASE); setPhase("idle"); setShifts(0); };

  return (
    <Frame title="شبیه‌ساز: درج ۲۵ در ایندکس ۲ آرایه" hint="عنصر جدید جا ندارد؛ همه عناصر از ایندکس ۲ به بعد باید یک خانه شیفت بخورند — هزینه O(n).">
      <div className="flex items-center justify-center gap-2 py-6 min-h-[92px]">
        {arr.map((v, i) => {
          const moving = phase === "shift" && i >= 2;
          const isNew = v === 25;
          return (
            <div key={`${v}-${i}`} className="flex items-center gap-2">
              <div
                className={`relative w-14 h-14 grid place-items-center rounded-md border-2 font-code font-bold text-lg transition-transform duration-500 ease-in-out ${
                  isNew ? "pop-in border-amber bg-amber/10 text-amber" : "border-linec bg-night-800 text-mist"
                }`}
                style={{ transform: moving ? "translateX(-64px)" : "none" }}
              >
                {fa(v)}
                <span className="absolute -bottom-6 text-[10px] text-faint font-code">{fa(i)}</span>
              </div>
            </div>
          );
        })}
        {phase === "shift" && (
          <div className="w-14 h-14 rounded-md border-2 border-dashed border-amber/50 grid place-items-center text-amber text-lg opacity-0 animate-[pop-in_0.5s_0.2s_forwards]">
            {fa(25)}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-3 mt-6">
        {phase === "done" ? (
          <>
            <span className="text-xs text-teal font-bold">انجام شد — {fa(shifts)} عنصر جابه‌جا شد</span>
            <VBtn onClick={reset}>شروع دوباره</VBtn>
          </>
        ) : (
          <VBtn onClick={insert} active>درج عنصر ۲۵</VBtn>
        )}
      </div>
    </Frame>
  );
}

/* ---------- ۳) لیست پیوندی ---------- */
function LinkedList() {
  const [nodes, setNodes] = useState<number[]>([3, 7, 12, 20]);
  const [counter, setCounter] = useState(0);
  const prepend = () => {
    setNodes((n) => [Math.floor(Math.random() * 40) + 1, ...n].slice(0, 7));
    setCounter((c) => c + 1);
  };
  const removeHead = () => {
    setNodes((n) => (n.length > 1 ? n.slice(1) : n));
    setCounter((c) => c + 1);
  };
  const Arrow = () => (
    <svg viewBox="0 0 26 12" className="w-7 h-3 text-faint shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 6H4" /><path d="M8 2 4 6l4 4" />
    </svg>
  );
  return (
    <Frame title="شبیه‌ساز: لیست پیوندی — فقط اشاره‌گرها" hint="درج و حذف در سر لیست فقط جابه‌جایی دو اشاره‌گر است (O(1))؛ هیچ داده‌ای شیفت نمی‌خورد.">
      <div className="flex items-center justify-center gap-1 py-6 flex-wrap min-h-[90px]">
        {nodes.map((v, i) => (
          <div key={`${v}-${i}`} className="flex items-center gap-1">
            <div className={`w-16 rounded-md border-2 ${i === 0 ? "border-teal bg-teal/10" : "border-linec bg-night-800"} ${i === 0 ? "pop-in" : ""}`}>
              <div className="grid grid-cols-2 divide-x divide-x-reverse divide-linec" dir="ltr">
                <div className="py-2.5 text-center font-code font-bold text-mist">{fa(v)}</div>
                <div className="py-2.5 text-center text-[9px] font-code text-teal grid place-items-center">next</div>
              </div>
            </div>
            {i < nodes.length - 1 && <Arrow />}
          </div>
        ))}
        <span className="font-code text-[10px] text-faint mr-2">null ⟵</span>
      </div>
      <div className="flex items-center justify-center gap-3 mt-4">
        <VBtn onClick={prepend} active>درج در سر (O(1))</VBtn>
        <VBtn onClick={removeHead}>حذف سر (O(1))</VBtn>
        <span className="text-[11px] text-faint">عملیات: {fa(counter)}</span>
      </div>
    </Frame>
  );
}

/* ---------- ۴) پشته ---------- */
function Stack() {
  const [items, setItems] = useState<number[]>([12, 34]);
  const push = () => setItems((s) => (s.length < 6 ? [...s, Math.floor(Math.random() * 90) + 5] : s));
  const pop = () => setItems((s) => s.slice(0, -1));
  return (
    <Frame title="شبیه‌ساز پشته — LIFO" hint="آخرین ورودی، اولین خروجی. اشاره‌گر top همیشه به بالای پشته نگاه می‌کند؛ هر دو عمل O(1).">
      <div className="flex items-end justify-center gap-8 py-4">
        <div className="flex flex-col-reverse items-stretch gap-1.5 w-32 min-h-[220px] justify-start border-x-2 border-b-2 border-linec rounded-b-md p-2 bg-night-900/60">
          {items.map((v, i) => (
            <div key={`${v}-${i}`} className={`pop-in text-center py-2.5 rounded font-code font-bold border ${i === items.length - 1 ? "bg-amber/15 border-amber text-amber" : "bg-night-800 border-linec text-dim"}`}>
              {fa(v)}
            </div>
          ))}
        </div>
        <div className="text-right text-[11px] space-y-2 text-faint">
          <p>top = {fa(items.length - 1)}</p>
          <p>اندازه = {fa(items.length)}</p>
          <p className="text-teal">push / pop: O(1)</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 mt-4">
        <VBtn onClick={push} active disabled={items.length >= 6}>Push</VBtn>
        <VBtn onClick={pop} disabled={items.length === 0}>Pop</VBtn>
        {items.length >= 6 && <span className="text-[11px] text-coral">Stack Overflow!</span>}
      </div>
    </Frame>
  );
}

/* ---------- ۵) صف ---------- */
function Queue() {
  const [items, setItems] = useState<number[]>([5, 18, 27]);
  const enq = () => setItems((s) => (s.length < 7 ? [...s, Math.floor(Math.random() * 90) + 5] : s));
  const deq = () => setItems((s) => s.slice(1));
  return (
    <Frame title="شبیه‌ساز صف — FIFO" hint="مثل صف نانوایی: ورود از ته (enqueue)، خروج از سر (dequeue). هر دو O(1).">
      <div className="py-6">
        <div className="flex items-center justify-center gap-1.5 min-h-[64px] flex-wrap">
          <span className="text-[10px] font-code text-teal ml-2">dequeue ←</span>
          {items.map((v, i) => (
            <div key={`${v}-${i}`} className={`w-13 px-3 py-3 text-center rounded font-code font-bold border ${i === 0 ? "pop-in bg-teal/15 border-teal text-teal" : "bg-night-800 border-linec text-dim"}`}>
              {fa(v)}
            </div>
          ))}
          <span className="text-[10px] font-code text-amber mr-2">→ enqueue</span>
        </div>
        <p className="text-center text-[11px] text-faint mt-4">head = {items[0] !== undefined ? fa(items[0]) : "—"} · طول صف = {fa(items.length)}</p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <VBtn onClick={enq} active>Enqueue</VBtn>
        <VBtn onClick={deq} disabled={items.length === 0}>Dequeue</VBtn>
      </div>
    </Frame>
  );
}

/* ---------- ۶) جست‌وجوی دودویی ---------- */
function BinarySearch() {
  const ARR = [3, 7, 12, 18, 24, 31, 38, 45, 52, 60, 67, 73, 81, 89, 94];
  const [target, setTarget] = useState(67);
  const [st, setSt] = useState({ lo: 0, hi: ARR.length - 1, mid: -1, cnt: 0, done: false, found: -1 });
  const reduced = usePrefersReducedMotion();
  const [auto, setAuto] = useState(false);

  const step = () => {
    setSt((s) => {
      if (s.done) return s;
      if (s.lo > s.hi) return { ...s, done: true, found: -1 };
      const mid = (s.lo + s.hi) >> 1;
      const cnt = s.cnt + 1;
      if (ARR[mid] === target) return { lo: s.lo, hi: s.hi, mid, cnt, done: true, found: mid };
      if (ARR[mid] < target) return { lo: mid + 1, hi: s.hi, mid, cnt, done: false, found: -1 };
      return { lo: s.lo, hi: mid - 1, mid, cnt, done: false, found: -1 };
    });
  };
  useTicker(auto && !st.done && !reduced, 850, step);
  useEffect(() => { if (st.done) setAuto(false); }, [st.done]);

  const reset = (t?: number) => {
    if (t !== undefined) setTarget(t);
    setSt({ lo: 0, hi: ARR.length - 1, mid: -1, cnt: 0, done: false, found: -1 });
    setAuto(false);
  };

  return (
    <Frame title={`جست‌وجوی دودویی — دنبال ${fa(target)} بگرد`} hint="هر مقایسه نصف بازه را حذف می‌کند: ۱۵ عنصر با حداکثر ۴ مقایسه! جست‌وجوی خطی همین را با میانگین ۸ مقایسه انجام می‌دهد.">
      <div className="flex flex-wrap items-center justify-center gap-1.5 py-3" dir="ltr">
        {ARR.map((v, i) => {
          const out = i < st.lo || i > st.hi;
          const isMid = st.mid === i;
          const isFound = st.found === i;
          return (
            <div
              key={v}
              className={`w-9 h-12 grid place-items-center rounded font-code text-[13px] font-bold border-2 transition-all duration-500 ${
                isFound ? "bg-teal/20 border-teal text-teal scale-110" : isMid ? "bg-amber/15 border-amber text-amber scale-110" : out ? "border-linec text-faint opacity-25" : "border-linec bg-night-800 text-mist"
              }`}
            >
              {fa(v)}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[11px] font-code mt-2">
        <span className="text-teal">lo = {fa(st.lo)}</span>
        <span className="text-amber">mid = {st.mid >= 0 ? fa(st.mid) : "—"}</span>
        <span className="text-cyan">hi = {fa(st.hi)}</span>
        <span className="text-mist">مقایسه‌ها: {fa(st.cnt)}</span>
      </div>
      {st.done && (
        <p className={`pop-in text-center text-sm font-bold mt-3 ${st.found >= 0 ? "text-teal" : "text-coral"}`}>
          {st.found >= 0 ? `پیدا شد! ایندکس ${fa(st.found)} با فقط ${fa(st.cnt)} مقایسه` : `در آرایه نیست — با ${fa(st.cnt)} مقایسه مطمئن شدیم`}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
        <VBtn onClick={step} disabled={st.done || auto}>قدم بعدی</VBtn>
        <VBtn onClick={() => setAuto(true)} active={auto} disabled={st.done}>پخش خودکار</VBtn>
        <VBtn onClick={() => reset()}>ریست</VBtn>
        <span className="w-px h-5 bg-linec mx-1" />
        {[24, 67, 94, 50].map((t) => (
          <VBtn key={t} onClick={() => reset(t)} active={target === t}>هدف: {fa(t)}</VBtn>
        ))}
      </div>
    </Frame>
  );
}

/* ---------- ۷) مسابقه مرتب‌سازی ---------- */
interface SortFrame { arr: number[]; cmp: number; changed: number[] }
function recordInsertion(a0: number[]): SortFrame[] {
  const a = [...a0]; const f: SortFrame[] = [{ arr: [...a], cmp: 0, changed: [] }]; let cmp = 0;
  for (let i = 1; i < a.length; i += 1) {
    const key = a[i]; let j = i - 1;
    while (j >= 0) { cmp += 1; if (a[j] > key) { a[j + 1] = a[j]; j -= 1; } else break; }
    a[j + 1] = key;
    f.push({ arr: [...a], cmp, changed: [j + 1, i] });
  }
  return f;
}
function recordQuick(a0: number[]): SortFrame[] {
  const a = [...a0]; const f: SortFrame[] = [{ arr: [...a], cmp: 0, changed: [] }]; let cmp = 0;
  const rec = (lo: number, hi: number) => {
    if (lo >= hi) return;
    const p = a[hi]; let i = lo;
    for (let j = lo; j < hi; j += 1) {
      cmp += 1;
      if (a[j] < p) { const t = a[i]; a[i] = a[j]; a[j] = t; f.push({ arr: [...a], cmp, changed: [i, j] }); i += 1; }
    }
    const t = a[i]; a[i] = a[hi]; a[hi] = t;
    f.push({ arr: [...a], cmp, changed: [i, hi] });
    rec(lo, i - 1); rec(i + 1, hi);
  };
  rec(0, a.length - 1);
  return f;
}
const SEED = [42, 15, 67, 8, 91, 23, 55, 34, 78, 12, 60, 29, 84, 5, 47, 70];

function SortRace() {
  const [alg, setAlg] = useState<"quick" | "insertion">("quick");
  const frames = useMemo(() => (alg === "quick" ? recordQuick(SEED) : recordInsertion(SEED)), [alg]);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(5);
  const reduced = usePrefersReducedMotion();
  useTicker(playing && idx < frames.length - 1, 340 - speed * 28, () => setIdx((i) => Math.min(i + 1, frames.length - 1)));
  useEffect(() => { if (idx >= frames.length - 1) setPlaying(false); }, [idx, frames.length]);

  const frame = frames[idx];
  const restart = (a: "quick" | "insertion") => { setAlg(a); setIdx(0); setPlaying(false); };

  return (
    <Frame title="مسابقه مرتب‌سازی — QuickSort در برابر InsertionSort" hint="هر میله یک عدد است؛ میله‌های کهربایی یعنی همین حالا جابه‌جا شده‌اند. سرعت را زیاد کن و تعداد مقایسه‌ها را مقایسه کن.">
      <div dir="ltr" className="flex items-end gap-[3px] h-40 px-1">
        {frame.arr.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm transition-all duration-200"
            style={{
              height: `${(v / 95) * 100}%`,
              background: frame.changed.includes(i) ? "#ffb454" : idx === frames.length - 1 ? "#3fd8b6" : "#16324c",
            }}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-4 text-[12px]">
        <span className="text-dim">گام: <b className="text-mist font-code">{fa(idx)}</b> از {fa(frames.length - 1)}</span>
        <span className="text-dim">مقایسه‌ها: <b className="text-amber font-code">{faGroup(frame.cmp)}</b></span>
        {idx === frames.length - 1 && <span className="text-teal font-bold">مرتب شد ✓</span>}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        <VBtn onClick={() => restart("quick")} active={alg === "quick"}>QuickSort</VBtn>
        <VBtn onClick={() => restart("insertion")} active={alg === "insertion"}>InsertionSort</VBtn>
        <VBtn onClick={() => { if (idx >= frames.length - 1) setIdx(0); setPlaying((p) => !p); }} active={playing}>
          {playing ? "توقف" : "پخش"}
        </VBtn>
        <VBtn onClick={() => { setIdx(0); setPlaying(false); }}>ریست</VBtn>
        {!reduced && (
          <span className="flex items-center gap-2 text-[11px] text-faint" dir="ltr">
            کند
            <input type="range" min={1} max={10} value={speed} onChange={(e) => setSpeed(+e.target.value)} className="accent-amber w-24" />
            تند
          </span>
        )}
      </div>
    </Frame>
  );
}

/* ---------- ۸) جدول هش ---------- */
function HashTable() {
  const [table, setTable] = useState<string[][]>(Array.from({ length: 8 }, () => []));
  const [flash, setFlash] = useState(-1);
  const [last, setLast] = useState<{ key: string; sum: number; idx: number } | null>(null);
  const tm = useRef(0);
  useEffect(() => () => window.clearTimeout(tm.current), []);

  const add = (key: string) => {
    const sum = [...key].reduce((s, c) => s + c.charCodeAt(0), 0);
    const idx = sum % 8;
    setTable((t) => t.map((b, i) => (i === idx && !b.includes(key) ? [...b, key] : b)));
    setLast({ key, sum, idx });
    setFlash(idx);
    window.clearTimeout(tm.current);
    tm.current = window.setTimeout(() => setFlash(-1), 900);
  };

  return (
    <Frame title="شبیه‌ساز جدول هش — کلید به سطل" hint="هش، کلید را به شماره سطل تبدیل می‌کند؛ خواندن و نوشتن به‌طور متوسط O(1) است چون مستقیم سراغ سطل می‌رویم.">
      <div className="grid grid-cols-8 gap-1.5" dir="ltr">
        {table.map((bucket, i) => (
          <div key={i} className={`rounded-md border-2 p-1.5 min-h-[92px] transition-all duration-300 ${flash === i ? "border-amber bg-amber/10 scale-105" : "border-linec bg-night-900/60"}`}>
            <p className="font-code text-[9px] text-faint text-center mb-1.5">#{fa(i)}</p>
            <div className="space-y-1">
              {bucket.map((k) => (
                <p key={k} className="pop-in font-code text-[9px] text-teal bg-teal/10 border border-teal/30 rounded px-1 py-0.5 text-center truncate">{k}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      {last && (
        <p className="pop-in text-center font-code text-[11px] text-dim mt-4" dir="ltr">
          hash("{last.key}") = {fa(last.sum)} % {fa(8)} = <b className="text-amber">{fa(last.idx)}</b>
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4" dir="ltr">
        {["ali", "sara", "omid", "nima", "reza", "tara", "kia", "ava"].map((k) => (
          <VBtn key={k} onClick={() => add(k)}>{k}</VBtn>
        ))}
        <VBtn onClick={() => { setTable(Array.from({ length: 8 }, () => [])); setLast(null); }}>پاک‌کردن</VBtn>
      </div>
    </Frame>
  );
}

/* ---------- ۹) درخت بازگشت ---------- */
interface TNode { v: number; l: TNode | null; r: TNode | null }
function buildFib(n: number): TNode {
  if (n <= 1) return { v: n, l: null, r: null };
  return { v: n, l: buildFib(n - 1), r: buildFib(n - 2) };
}
function RecursionTree() {
  const [depth, setDepth] = useState(5);
  const SP = 38;
  const { nodes, edges, dup, total, W, H } = useMemo(() => {
    const root = buildFib(depth);
    const ns: { x: number; y: number; v: number }[] = [];
    const es: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const count: Record<number, number> = {};
    const sizeOf = (node: TNode): number => 1 + (node.l ? sizeOf(node.l) : 0) + (node.r ? sizeOf(node.r) : 0);
    const place = (node: TNode, d: number, lo: number, hi: number) => {
      const x = (lo + hi) / 2;
      const i = ns.length;
      count[node.v] = (count[node.v] ?? 0) + 1;
      ns.push({ x, y: d, v: node.v });
      if (node.l) {
        place(node.l, d + 1, lo, x);
        es.push({ x1: x, y1: d, x2: ns[i + 1].x, y2: d + 1 });
      }
      if (node.r) {
        place(node.r, d + 1, x, hi);
        es.push({ x1: x, y1: d, x2: ns[i + (node.l ? sizeOf(node.l) : 0) + 1].x, y2: d + 1 });
      }
    };
    const width = 2 ** depth * SP;
    place(root, 0, 0, width);
    return { nodes: ns, edges: es, dup: count, total: ns.length, W: width, H: (depth + 1) * 58 + 8 };
  }, [depth]);

  const Y = (d: number) => d * 58 + 24;
  return (
    <Frame title="درخت فراخوانی fib(n) — هزینه بازگشت ساده" hint="گره‌های مرجانی یعنی زیرمسئله‌ای که چند بار حل شده! با memoization هر گره فقط یک‌بار حساب می‌شود — از نمایی به خطی. در n بزرگ‌تر، درخت عریض می‌شود و اسکرول افقی می‌خورد.">
      <div dir="ltr" className="overflow-x-auto pb-2">
        <svg width={W} height={H} className="block min-w-full">
          {edges.map((e, i) => (
            <line key={i} x1={e.x1} y1={Y(e.y1)} x2={e.x2} y2={Y(e.y2)} stroke="rgba(124,178,232,0.28)" strokeWidth="1.2" />
          ))}
          {nodes.map((nd, i) => {
            const repeated = dup[nd.v] > 1;
            return (
              <g key={i}>
                <circle cx={nd.x} cy={Y(nd.y)} r="13" fill={repeated ? "rgba(255,122,99,0.18)" : "rgba(63,216,182,0.13)"} stroke={repeated ? "#ff7a63" : "#3fd8b6"} strokeWidth="1.4" />
                <text x={nd.x} y={Y(nd.y) + 4} textAnchor="middle" fontSize="11" fill={repeated ? "#ff7a63" : "#3fd8b6"} fontFamily="JetBrains Mono" fontWeight="700">{nd.v}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-3 text-[12px]">
        <span className="text-dim">فراخوانی‌ها: <b className="text-mist font-code">{fa(total)}</b></span>
        <span className="text-coral">فراخوانی‌های تکراری: <b className="font-code">{fa(Object.values(dup).reduce((s, c) => s + c - 1, 0))}</b></span>
        <span className="text-teal">با memoization: <b className="font-code">{fa(depth + 1)}</b> فراخوانی</span>
      </div>
      <div className="flex items-center justify-center gap-3 mt-4" dir="ltr">
        <span className="font-code text-[11px] text-faint">n=2</span>
        <input type="range" min={2} max={7} value={depth} onChange={(e) => setDepth(+e.target.value)} className="accent-amber w-48" />
        <span className="font-code text-[11px] text-faint">n=7</span>
        <span className="font-code text-[12px] text-amber font-bold">n={fa(depth)}</span>
      </div>
    </Frame>
  );
}

/* ---------- ۱۰) پیمایش درخت BST ---------- */
const BST_POS: Record<number, { x: number; y: number }> = {
  50: { x: 100, y: 20 }, 30: { x: 55, y: 62 }, 70: { x: 145, y: 62 },
  20: { x: 30, y: 104 }, 40: { x: 80, y: 104 }, 60: { x: 120, y: 104 }, 80: { x: 170, y: 104 },
};
const BST_EDGES: [number, number][] = [[50, 30], [50, 70], [30, 20], [30, 40], [70, 60], [70, 80]];
const INORDER = [20, 30, 40, 50, 60, 70, 80];
const PREORDER = [50, 30, 20, 40, 70, 60, 80];

function Bst() {
  const [order, setOrder] = useState<"in" | "pre">("in");
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const seq = order === "in" ? INORDER : PREORDER;
  useTicker(playing && step < seq.length - 1, 750, () => setStep((s) => s + 1));
  useEffect(() => { if (step >= seq.length - 1) setPlaying(false); }, [step, seq.length]);

  const start = (o: "in" | "pre") => { setOrder(o); setStep(0); setPlaying(true); };
  const visited = seq.slice(0, step + 1);
  const active = step >= 0 ? seq[step] : -1;

  return (
    <Frame title="پیمایش درخت جست‌وجوی دودویی" hint="میان‌ترتیب (In-order) در BST خروجی مرتب می‌دهد — همین خاصیت ساده، پایه خیلی از مصاحبه‌هاست.">
      <div dir="ltr">
        <svg viewBox="0 0 200 130" className="w-full max-w-[460px] mx-auto">
          {BST_EDGES.map(([a, b]) => (
            <line key={`${a}${b}`} x1={BST_POS[a].x} y1={BST_POS[a].y} x2={BST_POS[b].x} y2={BST_POS[b].y} stroke="rgba(124,178,232,0.25)" strokeWidth="1" />
          ))}
          {Object.entries(BST_POS).map(([v, p]) => {
            const val = +v;
            const isActive = val === active;
            const isVisited = visited.includes(val);
            return (
              <g key={v}>
                <circle cx={p.x} cy={p.y} r="11" fill={isActive ? "rgba(255,180,84,0.25)" : isVisited ? "rgba(63,216,182,0.12)" : "rgba(14,34,54,0.9)"} stroke={isActive ? "#ffb454" : isVisited ? "#3fd8b6" : "#16324c"} strokeWidth="1.6" style={{ transition: "all 0.4s" }} />
                <text x={p.x} y={p.y + 3.5} textAnchor="middle" fontSize="9" fill={isActive ? "#ffb454" : isVisited ? "#3fd8b6" : "#9db4c9"} fontFamily="JetBrains Mono" fontWeight="700">{fa(val)}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="flex items-center justify-center gap-1.5 min-h-[34px] mt-2" dir="ltr">
        {visited.map((v, i) => (
          <span key={`${v}-${i}`} className="pop-in font-code text-[11px] bg-teal/10 border border-teal/30 text-teal rounded px-2 py-0.5">{fa(v)}</span>
        ))}
        {step >= seq.length - 1 && <span className="text-teal text-[11px] font-bold mr-2">— خروجی مرتب ✓</span>}
      </div>
      <div className="flex items-center justify-center gap-2 mt-3">
        <VBtn onClick={() => start("in")} active={order === "in" && playing}>میان‌ترتیب (مرتب)</VBtn>
        <VBtn onClick={() => start("pre")} active={order === "pre" && playing}>پیش‌ترتیب</VBtn>
        <VBtn onClick={() => { setStep(-1); setPlaying(false); }}>ریست</VBtn>
      </div>
    </Frame>
  );
}

/* ---------- ۱۱) گراف Git ---------- */
function GitGraph() {
  const [step, setStep] = useState(0);
  const reduced = usePrefersReducedMotion();
  useTicker(step < 7 && !reduced, 900, () => setStep((s) => s + 1));
  const commits = [
    { id: "A", x: 30, y: 30, main: true, at: 0 },
    { id: "B", x: 80, y: 30, main: true, at: 1 },
    { id: "C", x: 130, y: 58, main: false, at: 2 },
    { id: "D", x: 180, y: 58, main: false, at: 3 },
    { id: "E", x: 230, y: 30, main: true, at: 4 },
  ];
  const vis = (at: number) => ({ opacity: step >= at ? 1 : 0.08, transition: "opacity 0.5s" });
  return (
    <Frame title="مدل Git — شعبه و ادغام به‌صورت زنده" hint="Git زنجیره‌ای از Snapshot است؛ Branch فقط اشاره‌گری متحرک به یک Commit. Merge یعنی یک Commit با دو والد.">
      <div dir="ltr">
        <svg viewBox="0 0 260 88" className="w-full max-w-[520px] mx-auto">
          <line x1={30} y1={30} x2={230} y2={30} stroke="#3fd8b6" strokeWidth="1.5" style={vis(0)} />
          <path d="M80 30 C 100 30 105 58 130 58" fill="none" stroke="#ffb454" strokeWidth="1.5" style={vis(2)} />
          <line x1={130} y1={58} x2={180} y2={58} stroke="#ffb454" strokeWidth="1.5" style={vis(3)} />
          <path d="M180 58 C 205 58 210 30 230 30" fill="none" stroke="#ffb454" strokeWidth="1.5" style={vis(4)} />
          {commits.map((c) => (
            <g key={c.id} style={vis(c.at)}>
              <circle cx={c.x} cy={c.y} r="8" fill="#0a1a2a" stroke={c.main ? "#3fd8b6" : "#ffb454"} strokeWidth="2" />
              <text x={c.x} y={c.y + 3.2} textAnchor="middle" fontSize="8" fill={c.main ? "#3fd8b6" : "#ffb454"} fontFamily="JetBrains Mono" fontWeight="700">{c.id}</text>
            </g>
          ))}
          <g style={vis(1)}><text x={232} y={20} fontSize="7" fill="#3fd8b6" fontFamily="JetBrains Mono">main</text></g>
          <g style={vis(2)}><text x={182} y={76} fontSize="7" fill="#ffb454" fontFamily="JetBrains Mono">feature</text></g>
          <g style={vis(6)}>
            <text x={130} y={14} textAnchor="middle" fontSize="8" fill="#ffb454" fontFamily="JetBrains Mono">merge ✓</text>
          </g>
        </svg>
      </div>
      <p className="text-center font-code text-[11px] text-dim mt-2" dir="ltr">
        {["checkout -b feature", "commit C", "commit D", "checkout main", "merge feature", "done ✓"][Math.min(step, 5)]}
      </p>
      <div className="flex justify-center mt-3">
        <VBtn onClick={() => setStep(0)}>پخش دوباره</VBtn>
      </div>
    </Frame>
  );
}

/* ---------- ۱۲) چرخه HTTP ---------- */
const HTTP_STEPS = [
  { at: 0, text: "۱) مرورگر آدرس را می‌بیند؛ اول کش، بعد پرس‌وجوی DNS" },
  { at: 1, text: "۲) سرور DNS آدرس IP را برمی‌گرداند (مثلاً 185.143.233.4)" },
  { at: 2, text: "۳) اتصال TCP ساخته می‌شود (سه‌مرحله‌ای) و درخواست HTTP فرستاده می‌شود" },
  { at: 3, text: "۴) سرور کوئری دیتابیس را اجرا و پاسخ را آماده می‌کند" },
  { at: 2, text: "۵) پاسخ (Status 200 + JSON) برمی‌گردد" },
  { at: 0, text: "۶) مرورگر رندر می‌کند — و این چرخه برای هر منبع تکرار می‌شود" },
];
function HttpCycle() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduced = usePrefersReducedMotion();
  useTicker(playing && !reduced, 1500, () => setI((x) => (x + 1) % HTTP_STEPS.length));
  const pos = [2, 35, 66, 97][HTTP_STEPS[i].at];
  const labels = ["مرورگر", "DNS", "سرور", "دیتابیس"];
  return (
    <Frame title="سفر یک درخواست — از کلیک تا پیکسل" hint="هر بار که URL را می‌زنی این زنجیره اجرا می‌شود؛ کش و CDN یعنی کوتاه‌کردن همین مسیر.">
      <div className="relative pt-8 pb-2" dir="ltr">
        <div className="absolute top-[46px] right-[2%] left-[2%] h-px bg-linec" />
        <div
          className="absolute top-[38px] w-4 h-4 rounded-full bg-amber shadow-[0_0_18px_rgba(255,180,84,0.8)] transition-all duration-700 ease-in-out"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        />
        <div className="flex justify-between relative">
          {labels.map((l, idx) => (
            <div key={l} className={`flex flex-col items-center gap-2 transition-colors duration-500 ${HTTP_STEPS[i].at === idx ? "text-amber" : "text-faint"}`}>
              <span className={`w-10 h-10 grid place-items-center rounded-md border-2 transition-all duration-500 ${HTTP_STEPS[i].at === idx ? "border-amber bg-amber/10 scale-110" : "border-linec bg-night-800"}`}>
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  {idx === 0 && <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M3 8h18M8 21h8" /></>}
                  {idx === 1 && <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c4 4.5 4 12.5 0 17-4-4.5-4-12.5 0-17Z" /></>}
                  {idx === 2 && <><rect x="3.5" y="4" width="17" height="6.5" rx="1.5" /><rect x="3.5" y="13.5" width="17" height="6.5" rx="1.5" /><circle cx="7.3" cy="7.2" r="0.7" fill="currentColor" /><circle cx="7.3" cy="16.8" r="0.7" fill="currentColor" /></>}
                  {idx === 3 && <><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>}
                </svg>
              </span>
              <span className="text-[11px] font-bold">{l}</span>
            </div>
          ))}
        </div>
      </div>
      <p key={i} className="pop-in text-center text-[13px] text-dim border border-linec bg-night-900/70 rounded-md px-4 py-3 mt-4 min-h-[46px]">
        {HTTP_STEPS[i].text}
      </p>
      <div className="flex justify-center mt-3">
        <VBtn onClick={() => setPlaying((p) => !p)} active={playing}>{playing ? "توقف" : "پخش"}</VBtn>
      </div>
    </Frame>
  );
}

/* ---------- ۱۳) لایه‌های شبکه ---------- */
const NET_LAYERS = [
  { name: "کاربرد", proto: "HTTP", color: "#ffb454" },
  { name: "انتقال", proto: "TCP", color: "#3fd8b6" },
  { name: "شبکه", proto: "IP", color: "#5ec8ea" },
  { name: "پیوند داده", proto: "Ethernet", color: "#e8b4ff" },
];
function Layers() {
  const [step, setStep] = useState(0);
  // 0..4 encapsulate, 5..8 decapsulate
  const headers = step <= 4 ? step : Math.max(0, 8 - step);
  const activeLayer = step <= 4 ? step - 1 : 8 - step;
  const packet = ["داده"].concat(NET_LAYERS.slice(0, headers).map((l) => l.proto)).reverse();
  return (
    <Frame title="بسته‌بندی داده در لایه‌ها — Encapsulation" hint="فرستنده پایین می‌رود و در هر لایه یک سربرگ می‌چسباند؛ گیرنده بالا می‌آید و یکی‌یکی باز می‌کند. مثل پاکت‌های تودرتو.">
      <div className="grid sm:grid-cols-2 gap-6 items-center">
        <div className="space-y-1.5">
          {NET_LAYERS.map((l, idx) => (
            <div key={l.name} className={`flex items-center justify-between rounded-md border-2 px-4 py-2.5 transition-all duration-400 ${activeLayer === idx ? "scale-[1.03]" : ""}`} style={{ borderColor: activeLayer === idx ? l.color : "rgba(124,178,232,0.14)", background: activeLayer === idx ? `${l.color}14` : "rgba(10,26,42,0.6)" }}>
              <span className="text-[13px] font-bold" style={{ color: activeLayer === idx ? l.color : "#9db4c9" }}>لایه {l.name}</span>
              <span className="font-code text-[10px] px-2 py-0.5 rounded" style={{ color: l.color, background: `${l.color}1a` }}>{headers > idx ? `${l.proto} ✓` : l.proto}</span>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="font-code text-[10px] text-faint mb-2" dir="ltr">PACKET</p>
          <div key={step} className="pop-in inline-flex flex-wrap justify-center gap-1 rounded-md border border-linec bg-night-900 p-3 max-w-[240px]" dir="ltr">
            {packet.map((p) => {
              const layer = NET_LAYERS.find((l) => l.proto === p);
              return (
                <span key={p} className="font-code text-[10px] rounded px-2 py-1" style={layer ? { color: layer.color, background: `${layer.color}18`, border: `1px solid ${layer.color}55` } : { color: "#e9f1fa", background: "#16324c" }}>
                  {p === "داده" ? "DATA" : p}
                </span>
              );
            })}
          </div>
          <p className="text-[11px] text-faint mt-2">{step <= 4 ? "در حال فرستادن ↓" : "در حال دریافت ↑"}</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-5">
        <VBtn onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>قبلی</VBtn>
        <VBtn onClick={() => setStep((s) => (s + 1) % 9)} active>
          {step < 4 ? "بسته‌بندی ↓" : step < 8 ? "بازکردن ↑" : "شروع دوباره"}
        </VBtn>
      </div>
    </Frame>
  );
}

/* ---------- ۱۴) حافظه Stack/Heap ---------- */
function StackHeap() {
  const [allocs, setAllocs] = useState<{ id: number; name: string; gc: boolean }[]>([]);
  const next = useRef(1);
  const allocate = () => {
    if (allocs.length >= 3) return;
    setAllocs((a) => [...a, { id: next.current, name: `User#${next.current}`, gc: false }]);
    next.current += 1;
  };
  const deref = () => {
    setAllocs((a) => {
      const last = a[a.length - 1];
      if (!last) return a;
      return [...a.slice(0, -1), { ...last, gc: true }];
    });
    window.setTimeout(() => setAllocs((a) => a.slice(0, -1)), 700);
  };
  return (
    <Frame title="Stack در برابر Heap — خانه متغیر و خانه شی" hint="متغیر مرجع در Stack زندگی می‌کند و فقط یک «اشاره» به Heap دارد. وقتی اشاره‌گر حذف شود، GC شی را پس می‌گیرد.">
      <div className="grid grid-cols-2 gap-6 max-w-[460px] mx-auto" dir="ltr">
        <div>
          <p className="font-code text-[11px] text-cyan text-center mb-2">STACK (main)</p>
          <div className="border-2 border-linec rounded-md p-2 space-y-1.5 min-h-[140px] flex flex-col-reverse bg-night-900/60">
            {allocs.map((a) => (
              <div key={a.id} className={`pop-in font-code text-[11px] rounded px-3 py-2 border flex items-center justify-between transition-opacity duration-700 ${a.gc ? "opacity-0" : ""} border-cyan/40 bg-cyan/10 text-cyan`}>
                {a.name.toLowerCase().replace("#", "")}
                <span className="text-faint">→ ref</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="font-code text-[11px] text-amber text-center mb-2">HEAP</p>
          <div className="border-2 border-linec rounded-md p-2 space-y-1.5 min-h-[140px] flex flex-col-reverse bg-night-900/60">
            {allocs.map((a) => (
              <div key={a.id} className={`pop-in font-code text-[11px] rounded px-3 py-2 border border-amber/40 bg-amber/10 text-amber transition-all duration-700 ${a.gc ? "opacity-0 scale-75" : ""}`}>
                {'{'} name: "{a.name}" {'}'}
                {a.gc && <span className="text-coral text-[9px] block">GC'd ✓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-5">
        <VBtn onClick={allocate} active disabled={allocs.length >= 3}>new User()</VBtn>
        <VBtn onClick={deref} disabled={allocs.length === 0 || allocs[allocs.length - 1].gc}>user = null</VBtn>
      </div>
    </Frame>
  );
}

/* ---------- ۱۵) بن‌بست ---------- */
function Deadlock() {
  const [step, setStep] = useState(0);
  const reduced = usePrefersReducedMotion();
  useTicker(step < 4 && !reduced, 1100, () => setStep((s) => s + 1));
  const P = ({ name, on }: { name: string; on: boolean }) => (
    <div className={`w-24 py-4 text-center rounded-md border-2 font-code font-bold text-sm transition-all duration-500 ${on ? "border-amber bg-amber/10 text-amber" : "border-linec bg-night-800 text-dim"}`}>{name}</div>
  );
  const R = ({ name, by, waiting }: { name: string; by: string; waiting: boolean }) => (
    <div className={`w-24 py-4 text-center rounded-md border-2 font-code font-bold text-sm transition-all duration-500 ${waiting ? "border-coral bg-coral/10 text-coral animate-pulse" : by ? "border-teal bg-teal/10 text-teal" : "border-linec bg-night-800 text-dim"}`}>
      {name}
      {by && <span className="block text-[8px] font-normal mt-0.5">{waiting ? "منتظر!" : `توسط ${by}`}</span>}
    </div>
  );
  const msgs = [
    "دو پردازش، دو منبع — همه آزاد",
    "P1 منبع R1 را گرفت 🔒",
    "P2 منبع R2 را گرفت 🔒",
    "حالا هر دو منتظر منبعِ دیگری‌اند…",
    "بن‌بست! هیچ‌کس رها نمی‌کند 💀",
  ];
  return (
    <Frame title="بن‌بست (Deadlock) — انتظار دایره‌ای" hint="چهار شرط لازم: انحصار، نگه‌داشتن و انتظار، بدون پیش‌گیری، بدون پس‌گرفتن. حذف هر شرط، بن‌بست را غیرممکن می‌کند.">
      <div className="grid grid-cols-2 gap-x-16 gap-y-3 max-w-[300px] mx-auto py-4">
        <P name="P1" on={step >= 1} />
        <R name="R1" by={step >= 1 ? "P1" : ""} waiting={step >= 4} />
        <R name="R2" by={step >= 2 ? "P2" : ""} waiting={step >= 3} />
        <P name="P2" on={step >= 2} />
      </div>
      {step >= 3 && (
        <div className="flex items-center justify-center gap-2 font-code text-[10px] text-coral" dir="ltr">
          <span>P1 ⇄ R2</span>
          <span className="w-8 h-px bg-coral" />
          <span>P2 ⇄ R1</span>
          <span className="w-8 h-px bg-coral" />
          <span>circular wait</span>
        </div>
      )}
      <p key={step} className={`pop-in text-center text-[13px] font-bold mt-4 ${step >= 4 ? "text-coral" : "text-dim"}`}>{msgs[step]}</p>
      <div className="flex justify-center mt-3">
        <VBtn onClick={() => setStep(0)}>پخش دوباره</VBtn>
      </div>
    </Frame>
  );
}

/* ---------- ۱۶) خط لوله SDLC ---------- */
const SDLC = ["نیازمندی‌ها", "طراحی", "پیاده‌سازی", "تست", "استقرار", "نگهداری"];
function Sdlc() {
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  useTicker(!reduced, 1500, () => setActive((a) => (a + 1) % SDLC.length));
  return (
    <Frame title="چرخه حیات نرم‌افزار — یک دور کامل" hint="این چرخه بی‌پایان است؛ در مدل‌های چابک هر اسپرینت یک دورِ کوچک و سریع از همین حلقه است.">
      <div className="flex items-center justify-between gap-1 flex-wrap">
        {SDLC.map((s, i) => (
          <div key={s} className="flex items-center gap-1">
            <div className="flex flex-col items-center gap-2">
              <span className={`w-11 h-11 grid place-items-center rounded-full border-2 font-display text-lg transition-all duration-500 ${i === active ? "border-amber bg-amber text-night-900 scale-110 shadow-[0_0_22px_rgba(255,180,84,0.4)]" : i < active ? "border-teal/60 text-teal bg-teal/10" : "border-linec text-faint bg-night-800"}`}>
                {i < active ? "✓" : fa(i + 1)}
              </span>
              <span className={`text-[10.5px] font-bold transition-colors duration-500 ${i === active ? "text-amber" : "text-faint"}`}>{s}</span>
            </div>
            {i < SDLC.length - 1 && <span className={`h-0.5 w-4 sm:w-7 mb-6 rounded-full transition-colors duration-500 ${i < active ? "bg-teal/60" : "bg-linec"}`} />}
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ---------- ۱۷) تک‌سازه در برابر میکروسرویس ---------- */
function Microvmono() {
  const [mode, setMode] = useState<"mono" | "micro">("micro");
  const [tick, setTick] = useState(0);
  const reduced = usePrefersReducedMotion();
  useTicker(mode === "micro" && !reduced, 900, () => setTick((t) => t + 1));
  const services = ["کاربر", "سفارش", "پرداخت", "موجودی"];
  return (
    <Frame title="تک‌سازه در برابر میکروسرویس" hint="میکروسرویس رایگان نیست: شبکه، خطای جزئی و نسخه‌بندی قراردادها هزینه‌اش است. اول تک‌سازه‌ی ماژولار، بعد تصمیم.">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className={`rounded-md border-2 p-4 transition-all duration-500 ${mode === "mono" ? "border-amber" : "border-linec opacity-45"}`}>
          <p className="font-code text-[10px] text-faint text-center mb-3" dir="ltr">MONOLITH</p>
          <div className="border-2 border-linec rounded-md bg-night-800 p-3 grid grid-cols-2 gap-1.5">
            {services.map((s) => (
              <div key={s} className="text-center text-[11px] font-bold text-dim border border-linec rounded py-3 bg-night-900/70">{s}</div>
            ))}
          </div>
          <p className="text-center text-[10.5px] text-faint mt-2.5">یک Deploy · یک دیتابیس · یک خطا = همه‌چیز پایین</p>
        </div>
        <div className={`rounded-md border-2 p-4 transition-all duration-500 ${mode === "micro" ? "border-teal" : "border-linec opacity-45"}`}>
          <p className="font-code text-[10px] text-faint text-center mb-3" dir="ltr">MICROSERVICES</p>
          <div className="text-center mb-2">
            <span className={`inline-block font-code text-[10px] rounded px-3 py-1.5 border transition-colors duration-300 ${mode === "micro" ? "border-amber text-amber bg-amber/10" : "border-linec text-faint"}`}>API Gateway</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {services.map((s, i) => (
              <div key={s} className={`text-center text-[11px] font-bold rounded py-3 border transition-all duration-300 ${mode === "micro" && tick % 4 === i ? "border-teal text-teal bg-teal/10 scale-105" : "border-linec text-dim bg-night-800"}`}>{s}</div>
            ))}
          </div>
          <p className="text-center text-[10.5px] text-faint mt-2.5">Deploy مستقل · مقیاس مستقل · خرابیِ ایزوله</p>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-5">
        <VBtn onClick={() => setMode("mono")} active={mode === "mono"}>تک‌سازه</VBtn>
        <VBtn onClick={() => setMode("micro")} active={mode === "micro"}>میکروسرویس</VBtn>
      </div>
    </Frame>
  );
}

/* ---------- ۱۸) لایه‌های داکر ---------- */
function DockerLayers() {
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);
  const run = () => { setRunning(true); setCount((c) => Math.min(c + 1, 3)); };
  const layer = (t: string, c: string) => (
    <div className="text-center font-code text-[10.5px] rounded border px-3 py-2 transition-colors" style={{ borderColor: `${c}55`, color: c, background: `${c}10` }}>{t}</div>
  );
  return (
    <Frame title="کانتینر در برابر ماشین مجازی" hint="کانتینر Hypervisor و سیستم‌عامل مهمان را حذف می‌کند؛ همه کانتینرها یک کرنل را شریک‌اند — برای همین ثانیه‌ای بالا می‌آیند.">
      <div className="grid sm:grid-cols-2 gap-6 max-w-[560px] mx-auto" dir="ltr">
        <div className="space-y-1.5">
          <p className="font-code text-[10px] text-faint text-center mb-2">VM (سنگین)</p>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="space-y-1.5">{layer("Guest OS", "#ff7a63")}{layer("App A", "#9db4c9")}</div>
            <div className="space-y-1.5">{layer("Guest OS", "#ff7a63")}{layer("App B", "#9db4c9")}</div>
          </div>
          {layer("Hypervisor", "#e8b4ff")}
          {layer("Host OS + Hardware", "#64809c")}
        </div>
        <div className="space-y-1.5">
          <p className="font-code text-[10px] text-faint text-center mb-2">Container (سبک)</p>
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].slice(0, count).map((i) => (
              <div key={i} className="pop-in space-y-1.5">
                {layer(`App ${["A", "B", "C"][i]}`, "#9db4c9")}
                {layer("Deps", "#3fd8b6")}
              </div>
            ))}
            {count === 0 && <div className="col-span-3 border-2 border-dashed border-linec rounded text-center py-5 text-[10px] text-faint font-code">docker run …</div>}
          </div>
          {layer("Docker Engine", "#ffb454")}
          {layer("Host OS (shared kernel) + Hardware", "#64809c")}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 mt-5">
        <VBtn onClick={run} active disabled={count >= 3}>docker run app</VBtn>
        {running && <span className="pop-in font-code text-[11px] text-teal">✓ started in 0.{fa(3 + count)}s</span>}
        {count >= 3 && <VBtn onClick={() => { setCount(0); setRunning(false); }}>docker rm -f</VBtn>}
      </div>
    </Frame>
  );
}

/* ---------- رجیستری ---------- */
const REGISTRY: Record<string, () => ReactNode> = {
  bigo: () => <BigO />,
  arrayInsert: () => <ArrayInsert />,
  linkedList: () => <LinkedList />,
  stack: () => <Stack />,
  queue: () => <Queue />,
  binarySearch: () => <BinarySearch />,
  sortRace: () => <SortRace />,
  hashTable: () => <HashTable />,
  recursionTree: () => <RecursionTree />,
  bst: () => <Bst />,
  gitGraph: () => <GitGraph />,
  httpCycle: () => <HttpCycle />,
  layers: () => <Layers />,
  stackHeap: () => <StackHeap />,
  deadlock: () => <Deadlock />,
  sdlc: () => <Sdlc />,
  microvmono: () => <Microvmono />,
  dockerLayers: () => <DockerLayers />,
};

export default function Visual({ name }: { name: string }) {
  const render = REGISTRY[name];
  if (!render) return null;
  return <>{render()}</>;
}
