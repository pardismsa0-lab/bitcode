import type { CourseContent, Lesson } from "./content-types";
import { CONTENT_A } from "./content1";
import { CONTENT_B } from "./content2";
import { CONTENT_C } from "./content3";
import { CONTENT_NEW } from "./content-new";
import { EXTRA_LESSONS_A } from "./content4";
import { EXTRA_LESSONS_B } from "./content5";

const ALL: CourseContent[] = [...CONTENT_A, ...CONTENT_B, ...CONTENT_C, ...CONTENT_NEW];
const EXTRAS: Lesson[] = [...EXTRA_LESSONS_A, ...EXTRA_LESSONS_B];

const byId = new Map(ALL.map((c) => [c.id, c]));
const lessonById = new Map(EXTRAS.map((l) => [l.id, l]));

const pick = (id: string): CourseContent => {
  const c = byId.get(id);
  if (!c) throw new Error(`محتوای ${id} پیدا نشد`);
  return c;
};
const lesson = (id: string): Lesson => {
  const l = lessonById.get(id);
  if (!l) throw new Error(`درس ${id} پیدا نشد`);
  return l;
};

/* ---------- شبیه‌سازهای تزریق‌شده به درس‌های پایه ---------- */
const VISUALS: Record<string, { visual: string; title: string; pos: number }[]> = {
  "c3-l1": [{ visual: "bigo", title: "شبیه‌ساز: منحنی‌های پیچیدگی", pos: 2 }],
  "c3-l2": [
    { visual: "arrayInsert", title: "شبیه‌ساز: درج در آرایه", pos: 2 },
    { visual: "linkedList", title: "شبیه‌ساز: لیست پیوندی", pos: 3 },
  ],
  "c3-l3": [
    { visual: "stack", title: "شبیه‌ساز: پشته", pos: 2 },
    { visual: "queue", title: "شبیه‌ساز: صف", pos: 3 },
  ],
  "c4-l1": [{ visual: "binarySearch", title: "شبیه‌ساز: جست‌وجوی دودویی", pos: 2 }],
  "c4-l2": [{ visual: "recursionTree", title: "شبیه‌ساز: درخت فراخوانی", pos: 2 }],
  "c5-l1": [{ visual: "sdlc", title: "شبیه‌ساز: چرخه حیات نرم‌افزار", pos: 2 }],
  "c14-l1": [{ visual: "gitGraph", title: "شبیه‌ساز: شعبه و ادغام در Git", pos: 2 }],
  "c15-l2": [{ visual: "dockerLayers", title: "شبیه‌ساز: کانتینر در برابر VM", pos: 2 }],
  "c12-l1": [{ visual: "microvmono", title: "شبیه‌ساز: سبک‌های معماری", pos: 2 }],
  "n-net-l1": [{ visual: "layers", title: "شبیه‌ساز: لایه‌های شبکه", pos: 2 }],
  "n-net-l2": [{ visual: "httpCycle", title: "شبیه‌ساز: چرخه یک درخواست", pos: 2 }],
  "n-os-l1": [{ visual: "stackHeap", title: "شبیه‌ساز: Stack و Heap", pos: 2 }],
  "n-os-l2": [{ visual: "deadlock", title: "شبیه‌ساز: بن‌بست", pos: 2 }],
  "n-cpp-l1": [{ visual: "stackHeap", title: "شبیه‌ساز: حافظه Stack و Heap", pos: 2 }],
  "n-java-l1": [{ visual: "stackHeap", title: "شبیه‌ساز: مرجع در Stack، شی در Heap", pos: 2 }],
  "c11-l2": [{ visual: "hashTable", title: "شبیه‌ساز: ایندکس، هشِ دیتابیس", pos: 2 }],
  "c2-l1": [{ visual: "stackHeap", title: "شبیه‌ساز: متغیر و حافظه", pos: 3 }],
};

/* ---------- درس‌های تکمیلی هر دوره ---------- */
const COURSE_EXTRAS: Record<string, string[]> = {
  py: ["py-x1"],
  dsa: ["dsa-x1", "dsa-x2", "dsa-x3"],
  algo: ["algo-x1", "algo-x2", "algo-x3"],
  se: ["se-x1"],
  java: ["java-x1"],
  os: ["os-x1"],
  net: ["net-x1"],
  react: ["react-x1"],
  node: ["node-x1"],
  sql: ["sql-x1"],
  arch: ["arch-x1"],
  devops: ["devops-x1"],
  ml: ["ml-x1"],
  git: ["se-x1"],
};

const injectVisuals = (content: CourseContent): CourseContent => ({
  ...content,
  lessons: content.lessons.map((l) => {
    const extra = VISUALS[l.id];
    if (!extra) return l;
    const blocks = [...l.blocks];
    [...extra].sort((a, b) => b.pos - a.pos).forEach((e) =>
      blocks.splice(e.pos, 0, { k: "visual", visual: e.visual, title: e.title })
    );
    return { ...l, blocks };
  }),
});

const build = (base: CourseContent, courseId: string): CourseContent => {
  const withVisuals = injectVisuals(base);
  const extras = (COURSE_EXTRAS[courseId] ?? []).map(lesson);
  return extras.length ? { ...withVisuals, lessons: [...withVisuals.lessons, ...extras] } : withVisuals;
};

/*
  نگاشت شناسه دوره‌های data.ts به محتوای آموزشی
*/
const RAW: Record<string, CourseContent> = {
  py: build(pick("c1"), "py"),
  dsa: build(pick("c3"), "dsa"),
  algo: build(pick("c4"), "algo"),
  se: build(pick("c5"), "se"),
  react: build(pick("c9"), "react"),
  node: build(pick("c10"), "node"),
  sql: build(pick("c11"), "sql"),
  arch: build(pick("c12"), "arch"),
  test: build(pick("c13"), "test"),
  devops: build(pick("c15"), "devops"),
  ml: build(pick("c17"), "ml"),

  /* دوره «لینوکس، ترمینال و Git از صفر»: لینوکس + Git + درس اسکرام مشترک */
  git: {
    id: "git",
    intro:
      "ترمینال خانه‌ی هر مهندس نرم‌افزار است و Git زبان مشترک همه تیم‌های دنیا. این دوره دو بال پروازت را همزمان می‌سازد: اول لینوکس و خط فرمان — جایی که کامپیوتر واقعاً فرمان می‌برد — بعد Git از اولین commit تا Branch و Pull Request، و در نهایت نگاهی به فرایند تیمی‌ای که این ابزارها را زنده می‌کند.",
    outcomes: [
      "راحت‌شدن کامل با ترمینال و دستورات لینوکس",
      "مدیریت فایل‌ها، مجوزها و Processها از خط فرمان",
      "درک مدل Git: Commit، Branch و Merge",
      "همکاری تیمی با GitHub و Pull Request",
    ],
    lessons: [pick("c2").lessons[0], pick("c2").lessons[1], pick("c14").lessons[0], lesson("se-x1")],
  },

  java: build(pick("n-java"), "java"),
  cpp: build(pick("n-cpp"), "cpp"),
  os: build(pick("n-os"), "os"),
  dp: build(pick("n-dp"), "dp"),
  net: build(pick("n-net"), "net"),
};

/* تزریق شبیه‌سازها به درس‌های ترکیبی دوره git */
RAW.git = injectVisuals(RAW.git);

export const COURSE_CONTENT: Record<string, CourseContent> = RAW;
