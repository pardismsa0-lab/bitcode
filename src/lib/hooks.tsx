import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ---------- اعداد فارسی ---------- */
const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
export const fa = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => FA_DIGITS[+d]);

export const faGroup = (n: number): string =>
  fa(n.toLocaleString("en-US")).replace(/,/g, "٬");

/* ---------- prefers-reduced-motion ---------- */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* ---------- intersection observer ---------- */
export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ---------- scroll reveal wrapper ---------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/* ---------- count up ---------- */
export function useCountUp(target: number, start: boolean, duration = 1500): number {
  const [val, setVal] = useState(0);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setVal(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, reduced]);
  return val;
}

/* ---------- scramble / decode ---------- */
const POOL = "!<>-_\\/[]{}=+*^?#$%&";

export function useScramble(text: string, start: boolean, speed = 26): string {
  const [out, setOut] = useState(text);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setOut(text);
      return;
    }
    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      const revealed = Math.floor(frame / 2);
      let s = "";
      for (let i = 0; i < text.length; i += 1) {
        const ch = text[i];
        if (ch === " ") {
          s += " ";
          continue;
        }
        s += i < revealed ? ch : POOL[Math.floor(Math.random() * POOL.length)];
      }
      setOut(s);
      if (revealed >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, start, speed, reduced]);
  return out;
}
