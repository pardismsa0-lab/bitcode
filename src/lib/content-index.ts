import type { Block, CourseContent, Lesson } from "./content-types";
import { CONTENT_A } from "./content1";
import { CONTENT_B } from "./content2";
import { CONTENT_C } from "./content3";
import { CONTENT_NEW } from "./content-new";
import { EXTRA_LESSONS_A } from "./content4";
import { EXTRA_LESSONS_B } from "./content5";
import { EXTRA_LESSONS_C } from "./content6";
import { VIBE_A } from "./content-vibe1";
import { VIBE_B } from "./content-vibe2";
import { BULK1 } from "./bulk1";
import { BULK2 } from "./bulk2";
import { BULK3 } from "./bulk3";
import { BULK4 } from "./bulk4";
import { BULK5 } from "./bulk5";
import { BULK6 } from "./bulk6";
import { DEEP_A } from "./deepdive1";
import { DEEP_B } from "./deepdive2";
import { DEEP_C } from "./deepdive3";
import { DEEP_D } from "./deepdive4";
import { DEEP_E } from "./deepdive5";
import { RICH1 } from "./rich1";
import { RICH2 } from "./rich2";
import { RICH3 } from "./rich3";
import { RICH4 } from "./rich4";
import { RICH5 } from "./rich5";
import { RICH6 } from "./rich6";

/* درس‌های «غنی» — استاندارد آموزشی کامل؛ اولویت هر دوره */
const RICH: Record<string, Lesson[]> = { ...RICH1, ...RICH2, ...RICH3, ...RICH4, ...RICH5, ...RICH6 };

const ALL: CourseContent[] = [...CONTENT_A, ...CONTENT_B, ...CONTENT_C, ...CONTENT_NEW];

const byId = new Map(ALL.map((c) => [c.id, c]));
const lessonById = new Map(
  [...EXTRA_LESSONS_A, ...EXTRA_LESSONS_B, ...EXTRA_LESSONS_C].map((l) => [l.id, l])
);

/* لایه «عمیق‌تر»: متن تکمیلی مفصل برای درس‌های پایه */
const DEEP: Record<string, Block[]> = { ...DEEP_A, ...DEEP_B, ...DEEP_C, ...DEEP_D, ...DEEP_E };

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

/* ---------- شبیه‌سازهای تزریق‌شده به درس‌ها ---------- */
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
  "v-l1": [{ visual: "vibeLoop", title: "شبیه‌ساز: حلقه وایب کدینگ", pos: 2 }],
};

/* ---------- درس‌های حجمی (bulk) هر دوره ---------- */
const BULK: Record<string, Lesson[]> = {
  ...BULK1, ...BULK2, ...BULK3, ...BULK4, ...BULK5, ...BULK6,
};

/* ---------- درس‌های تکمیلی هر دوره ---------- */
const COURSE_EXTRAS: Record<string, string[]> = {
  py: ["py-x1", "py-x2"],
  dsa: ["dsa-x1", "dsa-x2", "dsa-x3"],
  algo: ["algo-x1", "algo-x2", "algo-x3"],
  se: ["se-x1"],
  java: ["java-x1"],
  cpp: ["cpp-x1"],
  os: ["os-x1"],
  dp: ["dp-x1"],
  net: ["net-x1"],
  react: ["react-x1", "react-x2"],
  node: ["node-x1", "node-x2"],
  sql: ["sql-x1"],
  arch: ["arch-x1"],
  devops: ["devops-x1"],
  ml: ["ml-x1"],
  test: ["test-x1"],
  git: ["se-x1"],
};

/* ---------- تزریق‌ها ---------- */
const injectVisualsLesson = (l: Lesson): Lesson => {
  const extra = VISUALS[l.id];
  if (!extra) return l;
  const blocks = [...l.blocks];
  [...extra].sort((a, b) => b.pos - a.pos).forEach((e) =>
    blocks.splice(e.pos, 0, { k: "visual", visual: e.visual, title: e.title })
  );
  return { ...l, blocks };
};

const applyDeep = (l: Lesson): Lesson => {
  const deep = DEEP[l.id];
  return deep ? { ...l, blocks: [...l.blocks, ...deep] } : l;
};

const finalizeLessons = (ls: Lesson[]): Lesson[] => ls.map(injectVisualsLesson).map(applyDeep);

const build = (
  base: CourseContent,
  courseId: string,
  opts: { before?: string[]; after?: string[] } = {}
): CourseContent => {
  const core = finalizeLessons([
    ...(opts.before ?? []).flatMap((id) => pick(id).lessons),
    ...base.lessons,
    ...(opts.after ?? []).flatMap((id) => pick(id).lessons),
  ]);
  const rich = RICH[courseId] ?? [];
  const extras = (COURSE_EXTRAS[courseId] ?? []).map(lesson);
  const bulk = BULK[courseId] ?? [];
  return { id: courseId, intro: base.intro, outcomes: base.outcomes, lessons: [...rich, ...core, ...extras, ...bulk] };
};

/* ---------- دوره وایب کدینگ ---------- */
const VIBE: CourseContent = {
  id: "vibe",
  intro:
    "فوریه ۲۰۲۵ واژه‌ای ساخته شد که صنعت را تکان داد: Vibe Coding — برنامه‌نویسی با هم‌نشینی هوش مصنوعی، جایی که تو مسیر را مشخص می‌کنی و Agentها پارو می‌زنند. این دوره رایگان، از فلسفه و تاریخچه شروع می‌کند، مهندسی پرامپت و جعبه‌ابزار را می‌سازد، یک MVP واقعی را در یک روز بالا می‌آورد و با کیفیت، امنیت و آینده Agentها تمام می‌شود. پیش‌نیاز: آشنایی مقدماتی با برنامه‌نویسی در هر زبانی.",
  outcomes: [
    "درک عمیق حلقه وایب و جای درستش — کجا رها کنی، کجا فرمان بگیری",
    "نوشتن Spec و پرامپت‌های مهندسی‌شده با الگوهای تکرارشونده",
    "تسلط بر جریان کاری Cursor، Copilot و Agentها",
    "ساخت یک MVP کامل از صفر تا دموی قابل‌ارائه",
    "بازبینی، تست و ایمن‌سازی خروجی هوش مصنوعی",
    "آمادگی برای عصر Agentها، MCP و مهارت‌های کمیاب جدید",
  ],
  lessons: [...VIBE_A, ...VIBE_B, ...(BULK.vibe ?? [])],
};

/*
  نگاشت شناسه دوره‌های data.ts به محتوای آموزشی
*/
const RAW: Record<string, CourseContent> = {
  py: build(pick("c1"), "py", { after: ["c6"] }),
  dsa: build(pick("c3"), "dsa"),
  algo: build(pick("c4"), "algo"),
  se: build(pick("c5"), "se"),
  react: build(pick("c9"), "react", { before: ["c7", "c8"] }),
  node: build(pick("c10"), "node", { after: ["c16"] }),
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
    lessons: [...(RICH.git ?? []), ...finalizeLessons([
      pick("c2").lessons[0],
      pick("c2").lessons[1],
      pick("c14").lessons[0],
      lesson("se-x1"),
    ]), ...(BULK.git ?? [])],
  },

  java: build(pick("n-java"), "java"),
  cpp: build(pick("n-cpp"), "cpp"),
  os: build(pick("n-os"), "os"),
  dp: build(pick("n-dp"), "dp"),
  net: build(pick("n-net"), "net"),
  vibe: VIBE,
};

export const COURSE_CONTENT: Record<string, CourseContent> = RAW;
