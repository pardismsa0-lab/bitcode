import type { Hue } from "../lib/data";
import { Reveal } from "../lib/hooks";
import { IconStar } from "./Icons";

export const HUES: Record<Hue, { text: string; chip: string; ring: string; soft: string }> = {
  amber: { text: "text-amber", chip: "bg-amber/10 text-amber border-amber/30", ring: "border-amber/40", soft: "bg-amber/15" },
  teal: { text: "text-teal", chip: "bg-teal/10 text-teal border-teal/30", ring: "border-teal/40", soft: "bg-teal/15" },
  cyan: { text: "text-cyan", chip: "bg-cyan/10 text-cyan border-cyan/30", ring: "border-cyan/40", soft: "bg-cyan/15" },
  coral: { text: "text-coral", chip: "bg-coral/10 text-coral border-coral/30", ring: "border-coral/40", soft: "bg-coral/15" },
};

export function Stars({ value, className = "w-3.5 h-3.5" }: { value: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" dir="ltr" aria-label={`امتیاز ${value} از ۵`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(value) ? "text-amber" : "text-night-600"}>
          <IconStar className={className} />
        </span>
      ))}
    </span>
  );
}

export function SectionHead({
  index,
  title,
  en,
  desc,
}: {
  index: string;
  title: string;
  en: string;
  desc?: string;
}) {
  return (
    <Reveal className="max-w-3xl">
      <div className="flex items-center gap-4">
        <span className="font-code text-amber text-sm tracking-[0.25em] border border-amber/30 bg-amber/5 px-2.5 py-1 rounded">
          {index}
        </span>
        <span className="font-code text-faint text-[11px] tracking-[0.35em] uppercase">{en}</span>
        <span className="hidden sm:block h-px flex-1 bg-gradient-to-l from-linec to-transparent" />
      </div>
      <h2 className="font-display text-4xl sm:text-5xl leading-[1.25] mt-5 text-mist">{title}</h2>
      {desc && <p className="text-dim leading-8 mt-4 text-[15px]">{desc}</p>}
    </Reveal>
  );
}

export function LevelBar({ level }: { level: "مقدماتی" | "متوسط" | "پیشرفته" }) {
  const n = level === "مقدماتی" ? 1 : level === "متوسط" ? 2 : 3;
  return (
    <span className="inline-flex items-center gap-1" title={`سطح: ${level}`}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-1 rounded-sm ${i === 1 ? "h-2" : i === 2 ? "h-3" : "h-4"} ${i <= n ? "bg-current" : "bg-night-600"}`}
        />
      ))}
    </span>
  );
}
