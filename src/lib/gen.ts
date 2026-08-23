import type { Block, Lesson, Quiz } from "./content-types";

/* ---------- قالب فشرده درس ---------- */
export type QSpec = [string, string[], number, string];

export interface LSpec {
  id: string;
  t: string;
  m?: number;
  p: string;                        // پاراگراف اصلی
  pts?: string[];                   // نکات کلیدی
  code?: [string, string, string];  // [lang, title, code]
  tab?: [string[], string[][]];
  def?: [string, string];
  tip?: string;
  warn?: string;
  visual?: string;
  q: QSpec[] | QSpec;
}

const toQuizzes = (q: LSpec["q"]): QSpec[] =>
  Array.isArray(q[0]) ? (q as QSpec[]) : [q as QSpec];

export function mkL(s: LSpec): Lesson {
  const blocks: Block[] = [{ k: "p", t: s.p }];
  if (s.pts) blocks.push({ k: "list", items: s.pts });
  if (s.code) blocks.push({ k: "code", lang: s.code[0], title: s.code[1], code: s.code[2] });
  if (s.tab) blocks.push({ k: "table", head: s.tab[0], rows: s.tab[1] });
  if (s.def) blocks.push({ k: "def", term: s.def[0], t: s.def[1] });
  if (s.visual) blocks.push({ k: "visual", visual: s.visual, title: "شبیه‌ساز تعاملی" });
  if (s.tip) blocks.push({ k: "tip", title: "نکته منتور", t: s.tip });
  if (s.warn) blocks.push({ k: "warn", title: "هشدار", t: s.warn });
  const quiz: Quiz[] = toQuizzes(s.q).map(([q, opts, ans, why]) => ({ q, opts, ans, why }));
  return { id: s.id, title: s.t, minutes: s.m ?? 40, blocks, quiz };
}

export const mkLs = (specs: LSpec[]): Lesson[] => specs.map(mkL);
