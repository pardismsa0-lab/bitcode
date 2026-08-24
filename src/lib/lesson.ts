import type { Block, Lesson, Quiz } from "./content-types";

export interface QSpec {
  q: string;
  opts: string[];
  ans: number;
  why: string;
}

export interface ExampleSpec {
  lang: string;
  title: string;
  code: string;
  /** توضیح خط‌به‌خط / گام‌به‌گام مثال حل‌شده */
  walk: string[];
}

/**
 * مشخصات یک «درس استاندارد».
 * درس‌ساز تضمین می‌کند هر درس این ساختار آموزشی کامل را داشته باشد:
 *   ۱. قلاب (چرا مهم است)  ۲. بخش‌های آموزشی  ۳. مثال حل‌شده با walkthrough
 *   ۴. تعریف مفهوم کلیدی  ۵. جدول کاربرد/مقایسه  ۶. دام رایج  ۷. نکته حرفه‌ای
 *   ۸. جمع‌بندی  ۹. ارزشیابی (چند پرسش)
 */
export interface RichLessonSpec {
  id: string;
  title: string;
  minutes?: number;
  /** ۱-۲ جمله آغازین: چرا این موضوع برای یک مهندس مهم است */
  hook: string;
  /** بخش‌های آموزشی؛ هر کدام یک سرفصل + پاراگراف واقعی */
  sections: { h: string; p: string; p2?: string }[];
  example?: ExampleSpec;
  /** [نام مفهوم, تعریف دقیق] */
  concept?: [string, string];
  /** [سربرگ‌ها, ردیف‌ها] */
  table?: [string[], string[][]];
  /** دام / هشدار رایج */
  pitfall?: string;
  /** نکته حرفه‌ای منتور */
  tip?: string;
  /** جمع‌بندی درس */
  recap: string[];
  quiz: QSpec[];
}

const toQuizzes = (qs: QSpec[]): Quiz[] => qs.map(({ q, opts, ans, why }) => ({ q, opts, ans, why }));

export function richLesson(s: RichLessonSpec): Lesson {
  const blocks: Block[] = [];

  // ۱) قلاب — پاراگراف آغازین با dropcap
  blocks.push({ k: "p", t: s.hook });

  // ۲) بخش‌های آموزشی
  s.sections.forEach((sec) => {
    blocks.push({ k: "h", t: sec.h });
    blocks.push({ k: "p", t: sec.p });
  });

  // ۳) مثال حل‌شده + walkthrough
  if (s.example) {
    blocks.push({ k: "h", t: "مثال حل‌شده" });
    blocks.push({ k: "code", lang: s.example.lang, title: s.example.title, code: s.example.code });
    blocks.push({ k: "list", items: s.example.walk });
  }

  // ۴) تعریف مفهوم کلیدی
  if (s.concept) blocks.push({ k: "def", term: s.concept[0], t: s.concept[1] });

  // ۵) جدول کاربرد / مقایسه
  if (s.table) blocks.push({ k: "table", head: s.table[0], rows: s.table[1] });

  // ۶) دام رایج
  if (s.pitfall) blocks.push({ k: "warn", title: "دام رایج", t: s.pitfall });

  // ۷) نکته حرفه‌ای
  if (s.tip) blocks.push({ k: "tip", title: "نکته حرفه‌ای", t: s.tip });

  // ۸) جمع‌بندی
  blocks.push({ k: "h", t: "جمع‌بندی درس" });
  blocks.push({ k: "list", items: s.recap });

  return {
    id: s.id,
    title: s.title,
    minutes: s.minutes ?? 45,
    blocks,
    quiz: toQuizzes(s.quiz),
  };
}

export const richLessons = (specs: RichLessonSpec[]): Lesson[] => specs.map(richLesson);
