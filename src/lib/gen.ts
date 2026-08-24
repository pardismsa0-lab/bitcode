import type { Block, Lesson, Quiz } from "./content-types";

/* ---------- قالب فشرده درس ---------- */
export type QSpec = [string, string[], number, string];

export interface LSpec {
  id: string;
  t: string;
  m?: number;
  p: string;                        // پاراگراف اصلی (انگیزه و مفهوم)
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

/**
 * درس‌ساز فشرده — با ترتیب آموزشی استاندارد:
 *   ۱. انگیزه و مفهوم (پاراگراف)
 *   ۲. تعریف مفهوم کلیدی (قبل از هر کدی!)
 *   ۳. آنچه باید بدانید (نکات کلیدی)
 *   ۴. کاربرد و مقایسه (جدول)
 *   ۵. مثال عملی (کد — فقط بعد از فهم مفهوم)
 *   ۶. هشدار و نکته منتور
 *   ۷. جمع‌بندی  ۸. ارزشیابی
 */
export function mkL(s: LSpec): Lesson {
  const blocks: Block[] = [{ k: "p", t: s.p }];

  if (s.def) blocks.push({ k: "def", term: s.def[0], t: s.def[1] });

  if (s.pts) {
    blocks.push({ k: "h", t: "آنچه باید بدانید" });
    blocks.push({ k: "list", items: s.pts });
  }

  if (s.tab) {
    blocks.push({ k: "h", t: "کاربرد و مقایسه" });
    blocks.push({ k: "table", head: s.tab[0], rows: s.tab[1] });
  }

  if (s.visual) blocks.push({ k: "visual", visual: s.visual, title: "شبیه‌ساز تعاملی" });

  if (s.code) {
    blocks.push({ k: "h", t: "مثال عملی" });
    blocks.push({ k: "code", lang: s.code[0], title: s.code[1], code: s.code[2] });
  }

  if (s.warn) blocks.push({ k: "warn", title: "هشدار", t: s.warn });
  if (s.tip) blocks.push({ k: "tip", title: "نکته منتور", t: s.tip });

  // جمع‌بندی: برداشت اصلی درس در یک بند
  blocks.push({ k: "h", t: "جمع‌بندی" });
  blocks.push({
    k: "p",
    t: `برداشت اصلی این درس: ${s.pts?.[0] ?? s.p.split("؛")[0] + "."} بقیه درس‌های دوره همین ایده را عمیق‌تر می‌کنند؛ قبل از ادامه، پرسش‌های زیر را پاسخ بده تا مطمئن شوی مفهوم نشسته است.`,
  });

  const quiz: Quiz[] = toQuizzes(s.q).map(([q, opts, ans, why]) => ({ q, opts, ans, why }));
  return { id: s.id, title: s.t, minutes: s.m ?? 40, blocks, quiz };
}

export const mkLs = (specs: LSpec[]): Lesson[] => specs.map(mkL);

/* ---------- لایه گسترش: تبدیل درس فشرده به درس مفصل ---------- */
export interface LessonExpand {
  sections?: { h: string; p: string }[];
  example?: { lang: string; title: string; code: string };
  def?: [string, string];
  table?: [string[], string[][]];
  pitfall?: string;
  tip?: string;
  quiz?: { q: string; opts: string[]; ans: number; why: string }[];
}

export function expandLesson(l: Lesson, e: LessonExpand): Lesson {
  const ins: Block[] = [];
  (e.sections ?? []).forEach((s) => {
    ins.push({ k: "h", t: s.h }, { k: "p", t: s.p });
  });
  if (e.example)
    ins.push({ k: "h", t: "مثال حل‌شده" }, { k: "code", lang: e.example.lang, title: e.example.title, code: e.example.code });
  if (e.def) ins.push({ k: "def", term: e.def[0], t: e.def[1] });
  if (e.table) ins.push({ k: "h", t: "جدول مرجع" }, { k: "table", head: e.table[0], rows: e.table[1] });
  if (e.pitfall) ins.push({ k: "warn", title: "دام رایج", t: e.pitfall });
  if (e.tip) ins.push({ k: "tip", title: "نکته منتور", t: e.tip });

  const blocks = [...l.blocks];
  blocks.splice(1, 0, ...ins);

  const quiz = [...l.quiz, ...(e.quiz ?? [])];
  const minutes = l.minutes + (e.sections?.length ?? 0) * 8 + (e.example ? 7 : 0);
  return { ...l, blocks, quiz, minutes };
}
