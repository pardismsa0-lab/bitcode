import type { CourseContent } from "./content-types";
import { CONTENT_A } from "./content1";
import { CONTENT_B } from "./content2";
import { CONTENT_C } from "./content3";
import { CONTENT_NEW } from "./content-new";

const ALL: CourseContent[] = [...CONTENT_A, ...CONTENT_B, ...CONTENT_C, ...CONTENT_NEW];

const byId = new Map(ALL.map((c) => [c.id, c]));

const pick = (id: string): CourseContent => {
  const c = byId.get(id);
  if (!c) throw new Error(`محتوای ${id} پیدا نشد`);
  return c;
};

/*
  نگاشت شناسه دوره‌های data.ts به محتوای آموزشی:
  c1=پایتون  c2=لینوکس  c3=ساختمان داده  c4=الگوریتم  c5=مهندسی نرم‌افزار
  c9=React  c10=Node  c11=پایگاه داده  c12=معماری  c13=تست
  c14=Git  c15=DevOps  c17=هوش مصنوعی/ML
*/
export const COURSE_CONTENT: Record<string, CourseContent> = {
  py: pick("c1"),
  dsa: pick("c3"),
  algo: pick("c4"),
  se: pick("c5"),
  react: pick("c9"),
  node: pick("c10"),
  sql: pick("c11"),
  arch: pick("c12"),
  test: pick("c13"),
  devops: pick("c15"),
  ml: pick("c17"),

  /* دوره «لینوکس، ترمینال و Git از صفر»: ترکیب دو درس لینوکس + یک درس Git */
  git: {
    id: "git",
    intro:
      "ترمینال خانه‌ی هر مهندس نرم‌افزار است و Git زبان مشترک همه تیم‌های دنیا. این دوره دو بال پروازت را همزمان می‌سازد: اول لینوکس و خط فرمان — جایی که کامپیوتر واقعاً فرمان می‌برد — و بعد Git، از اولین commit تا Branch و Pull Request.",
    outcomes: [
      "راحت‌شدن کامل با ترمینال و دستورات لینوکس",
      "مدیریت فایل‌ها، مجوزها و Processها از خط فرمان",
      "درک مدل Git: Commit، Branch و Merge",
      "همکاری تیمی با GitHub و Pull Request",
    ],
    lessons: [pick("c2").lessons[0], pick("c2").lessons[1], pick("c14").lessons[0]],
  },

  java: pick("n-java"),
  cpp: pick("n-cpp"),
  os: pick("n-os"),
  dp: pick("n-dp"),
  net: pick("n-net"),
};
