import type { CourseContent } from "./content-types";

export const CONTENT_B: CourseContent[] = [
  {
    id: "c7",
    intro:
      "وب با سه لایه ساخته می‌شود: HTML ساختار، CSS ظاهر و جاوااسکریپت رفتار. در این دوره دو لایه اول را عمیق یاد می‌گیری — نه با حفظ‌کردن propertyها، بلکه با درک مدل جعبه‌ها و سیستم چیدمان که همه‌چیز روی آن سوار است.",
    outcomes: [
      "نوشتن HTML معنادار و دسترس‌پذیر",
      "تسلط بر Flexbox و Grid برای هر چیدمانی",
      "طراحی ریسپانسیو با Media Query",
      "انیمیشن و ترنزیشن حرفه‌ای",
    ],
    lessons: [
      {
        id: "c7-l1",
        title: "HTML معنادار و مدل جعبه",
        minutes: 45,
        blocks: [
          { k: "p", t: "HTML فقط چیدمان متن نیست؛ معنای سند را تعریف می‌کند. مرورگر، موتور جست‌وجو و صفحه‌خوان‌ها همه از تگ‌های معنادار برای فهم صفحه استفاده می‌کنند. div و span فقط وقتی مجازند که تگ معنادار مناسبی وجود نداشته باشد." },
          { k: "code", lang: "html", title: "index.html", code: "<!DOCTYPE html>\n<html lang=\"fa\" dir=\"rtl\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <title>Blog</title>\n</head>\n<body>\n    <header>\n        <nav aria-label=\"Main\">\n            <a href=\"/\">Home</a>\n            <a href=\"/blog\">Blog</a>\n        </nav>\n    </header>\n    <main>\n        <article>\n            <h1>First Post</h1>\n            <p>Every element has a meaning.</p>\n        </article>\n    </main>\n    <footer>© 2026</footer>\n</body>\n</html>" },
          { k: "h", t: "مدل جعبه؛ همه‌چیز یک جعبه است" },
          { k: "p", t: "هر عنصر در CSS یک جعبه مستطیلی است با چهار لایه: محتوا، padding (فاصله داخلی)، border و margin (فاصله بیرونی). بزرگ‌ترین منبع سردرگمی تازه‌کارها، محاسبه اندازه واقعی جعبه است — تا اینکه box-sizing وارد می‌شود." },
          { k: "code", lang: "css", title: "box-model.css", code: "/* بدون box-sizing: عرض واقعی = 300 + 20 + 2 = 322px ! */\n.card {\n    width: 300px;\n    padding: 10px;\n    border: 1px solid #ccc;\n}\n\n/* راه‌حل استاندارد: ریست سراسری */\n*, *::before, *::after {\n    box-sizing: border-box;   /* padding و border داخل width */\n}\n\n.card {\n    margin: 16px;             /* margin بیرون می‌ماند */\n}" },
          { k: "warn", title: "تله margin", t: "دو عنصر عمودی با margin ۲۰ و ۳۰، فاصله ۵۰ ندارند — فاصله ۳۰ است! به این پدیده Margin Collapse می‌گویند و فقط در جهت عمودی رخ می‌دهد. اگر فاصله دقیق می‌خواهی از Flexbox یا Grid با gap استفاده کن." },
          { k: "tip", title: "نکته منتور", t: "قبل از هر CSS، DevTools را باز کن و در تب Computed، جعبه واقعی عنصر را ببین. درک بصری مدل جعبه، ۸۰٪ باگ‌های چیدمان را قبل از شروع حل می‌کند." },
        ],
        quiz: [
          { q: "با box-sizing: border-box، یک عنصر width: 300px و padding: 20px چه عرضی اشغال می‌کند؟", opts: ["۳۴۰ پیکسل", "۳۰۰ پیکسل", "۳۲۰ پیکسل", "بستگی به مرورگر دارد"], ans: 1, why: "در border-box پدینگ و بوردر داخل همان ۳۰۰ پیکسل جا می‌گیرند؛ محتوای داخلی کوچک‌تر می‌شود ولی جعبه ثابت می‌ماند." },
          { q: "کدام تگ برای ناوبری اصلی صفحه مناسب‌تر است؟", opts: ["div", "section", "nav", "span"], ans: 2, why: "nav به مرورگر و صفحه‌خوان‌ها می‌گوید اینجا بلوک ناوبری است؛ صفحه‌خوان‌ها حتی میان‌بر پرش به آن دارند." },
        ],
      },
      {
        id: "c7-l2",
        title: "Flexbox و Grid؛ پایان جنگ چیدمان",
        minutes: 65,
        blocks: [
          { k: "p", t: "قبل از این دو، چیدمان با float و position یک میدان جنگ بود. قانون ساده: Flexbox برای یک بُعد (یک ردیف یا یک ستون) و Grid برای دو بُعد (ردیف و ستون همزمان). با همین قاعده، ۹۵٪ چیدمان‌های وب مدرن حل می‌شوند." },
          { k: "code", lang: "css", title: "flexbox.css", code: ".navbar {\n    display: flex;\n    justify-content: space-between;  /* محور اصلی */\n    align-items: center;             /* محور فرعی */\n    gap: 16px;\n}\n\n/* کارت‌های هم‌اندازه که نشکنند */\n.cards {\n    display: flex;\n    flex-wrap: wrap;\n}\n.cards > * {\n    flex: 1 1 280px;    /* رشد کن، کوچک شو، حداقل 280px */\n}" },
          { k: "code", lang: "css", title: "grid.css", code: "/* چیدمان کلاسیک صفحه */\n.layout {\n    display: grid;\n    grid-template-columns: 240px 1fr;   /* سایدبار + محتوا */\n    grid-template-rows: 64px 1fr auto;\n    grid-template-areas:\n        \"header header\"\n        \"sidebar main\"\n        \"footer footer\";\n    min-height: 100vh;\n}\n.header  { grid-area: header; }\n.sidebar { grid-area: sidebar; }\n.main    { grid-area: main; }\n.footer  { grid-area: footer; }\n\n/* گالری با تعداد ستون خودکار */\n.gallery {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    gap: 12px;\n}" },
          { k: "def", term: "minmax و auto-fill", t: "الگوی repeat(auto-fill, minmax(220px, 1fr)) بدون حتی یک Media Query، گالری‌ای می‌سازد که تعداد ستون‌هایش با عرض صفحه تنظیم می‌شود — قدرتمندترین یک‌خط CSS مدرن." },
          { k: "tip", title: "نکته منتور", t: "gap را به margin ترجیح بده: فقط بین آیتم‌ها فاصله می‌گذارد نه دور‌تا‌دور، و در RTL هم درست کار می‌کند. فاصله‌گذاری با margin روی آیتم‌های flex/grid بوی کد قدیمی می‌دهد." },
        ],
        quiz: [
          { q: "برای چیدمان «سه ستون با هدر تمام‌عرض» کدام ابزار مناسب‌تر است؟", opts: ["Flexbox", "Grid", "float", "position"], ans: 1, why: "این چیدمان دوبُعدی است (ردیف هدر + ردیف ستون‌ها)؛ Grid با template-areas آن را declarative و خوانا می‌کند." },
          { q: "خاصیت gap چه مزیتی نسبت به margin دارد؟", opts: ["سریع‌تر رندر می‌شود", "فقط بین آیتم‌ها فاصله می‌گذارد و در RTL سالم است", "رنگ‌پذیر است", "هیچ مزیتی ندارد"], ans: 1, why: "margin دور همه آیتم‌ها فاصله می‌اندازد و در لبه‌ها باید خنثی شود؛ gap دقیقاً همان فاصله بین آیتم‌هاست." },
        ],
      },
      {
        id: "c7-l3",
        title: "ریسپانسیو و انیمیشن",
        minutes: 55,
        blocks: [
          { k: "p", t: "طراحی ریسپانسیو یعنی یک صفحه برای همه اندازه‌ها؛ و رویکرد مدرن «موبایل اول» است: استایل پایه را برای کوچک‌ترین صفحه بنویس و با Media Query برای صفحه‌های بزرگ‌تر توسعه بده. واحد‌های نسبی (rem، %، vw) و توابعی مثل clamp() کار را تمیز می‌کنند." },
          { k: "code", lang: "css", title: "responsive.css", code: "/* موبایل اول: تایپوگرافی سیال */\nh1 {\n    font-size: clamp(1.8rem, 4vw + 1rem, 3.2rem);\n}\n\n.container {\n    width: min(92%, 1100px);   /* حداکثر 1100px، وگرنه 92% */\n    margin-inline: auto;\n}\n\n/* دسکتاپ: منوی افقی و سایدبار */\n@media (min-width: 768px) {\n    .menu { flex-direction: row; }\n    .layout { grid-template-columns: 260px 1fr; }\n}" },
          { k: "h", t: "انیمیشن با performance" },
          { k: "code", lang: "css", title: "motion.css", code: ".card {\n    transition: transform 0.25s ease, box-shadow 0.25s ease;\n}\n.card:hover {\n    transform: translateY(-6px);\n    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);\n}\n\n/* فقط transform و opacity روی GPU انیمیت می‌شوند */\n@keyframes fade-up {\n    from { opacity: 0; transform: translateY(24px); }\n    to   { opacity: 1; transform: translateY(0); }\n}\n.reveal { animation: fade-up 0.6s ease both; }\n\n@media (prefers-reduced-motion: reduce) {\n    * { animation: none; transition: none; }\n}" },
          { k: "warn", title: "قانون ۶۰ فریم", t: "فقط transform و opacity را انیمیت کن؛ انیمیشن روی width یا top باعث Reflow کل صفحه و لگ می‌شود. و همیشه prefers-reduced-motion را محترم بشمار — بعضی کاربران با حرکت زیاد واقعاً اذیت می‌شوند." },
          { k: "def", term: "clamp()", t: "تابع clamp(min, preferred, max) مقداری سیال می‌دهد که از بازه خارج نمی‌شود؛ برای تایپوگرافی و فاصله‌ها بدون Media Query." },
        ],
        quiz: [
          { q: "رویکرد «موبایل اول» یعنی چه؟", opts: ["اول اپلیکیشن موبایل بساز", "استایل پایه برای موبایل و توسعه با min-width", "استفاده از max-width", "طراحی فقط برای موبایل"], ans: 1, why: "با min-width استایل‌های بزرگ‌تر فقط اضافه می‌شوند؛ کد پایه سبک می‌ماند و دستگاه‌های ضعیف‌تر CSS کمتری پردازش می‌کنند." },
          { q: "چرا transform برای انیمیشن بهتر از تغییر top است؟", opts: ["ساده‌تر نوشته می‌شود", "بدون Reflow روی GPU اجرا می‌شود", "در همه مرورگرها کار می‌کند", "رنگ‌ها را هم تغییر می‌دهد"], ans: 1, why: "تغییر top چیدمان کل صفحه را دوباره محاسبه می‌کند؛ transform فقط لایه عنصر را جابه‌جا می‌کند و بقیه صفحه دست‌نخورده می‌ماند." },
        ],
      },
    ],
  },
  {
    id: "c8",
    intro:
      "جاوااسکریپت زبان وب است؛ تنها زبانی که مرورگر مستقیم اجرا می‌کند و با Node.js از مرورگر بیرون آمده و همه‌جا هست. این دوره مفاهیمی را هدف می‌گیرد که در مصاحبه‌ها و کد واقعی هر روز به آن‌ها برمی‌خوری.",
    outcomes: [
      "درک عمیق Scope و Closure",
      "کار با DOM و رویدادها",
      "برنامه‌نویسی ناهمگام با Promise و async/await",
      "آشنایی با ماژول‌ها و ابزارهای مدرن",
    ],
    lessons: [
      {
        id: "c8-l1",
        title: "زبان؛ متغیر، Scope و DOM",
        minutes: 55,
        blocks: [
          { k: "p", t: "جاوااسکریپت مدرن (ES6+) سه نوع متغیر دارد و فقط یکی از آن‌ها را باید تقریباً همیشه استفاده کنی: const. تفاوت let و var در Scope است؛ var به بلاک if احترام نمی‌گذارد و منشاء باگ‌های کلاسیک است." },
          { k: "code", lang: "js", title: "scope.js", code: "const API = \"https://api.example.com\";  // ثابت\nlet count = 0;                          // قابل تغییر\n\nfor (let i = 0; i < 3; i++) {\n    setTimeout(() => console.log(i), 100);\n}\n// با let: 0 1 2   |   با var: 3 3 3  (همه یک متغیر را می‌بینند!)\n\n// Template literal و Destructuring\nconst user = { name: \"Ali\", age: 25 };\nconst { name, age } = user;\nconsole.log(`${name} is ${age}`);" },
          { k: "h", t: "DOM؛ پل بین کد و صفحه" },
          { k: "code", lang: "js", title: "dom.js", code: "const btn = document.querySelector(\"#submit\");\nconst list = document.querySelector(\"#items\");\n\nbtn.addEventListener(\"click\", () => {\n    const li = document.createElement(\"li\");\n    li.textContent = \"New item\";\n    list.appendChild(li);\n});\n\n// Event Delegation: یک listener برای همه آیتم‌ها\nlist.addEventListener(\"click\", (e) => {\n    if (e.target.tagName === \"LI\") {\n        e.target.classList.toggle(\"done\");\n    }\n});" },
          { k: "def", term: "Event Delegation", t: "به‌جای listener جداگانه برای هر آیتم، یک listener روی والد بگذار و از event.target بفهم کدام فرزند کلیک شده — حافظه کمتر و مدیریت آیتم‌های داینامیک رایگان." },
          { k: "warn", title: "var را بازنشسته کن", t: "var دو مشکل بزرگ دارد: Scope تابعی به‌جای بلاکی و Hoisting گیج‌کننده. در کد جدید فقط const و بنویس و let فقط وقتی واقعاً بازتخصیص لازم داری." },
        ],
        quiz: [
          { q: "خروجی حلقه بالا با var چیست؟", opts: ["0 1 2", "1 2 3", "3 3 3", "undefined"], ans: 2, why: "var یک متغیر واحد برای کل حلقه می‌سازد؛ وقتی callbackها اجرا می‌شوند حلقه تمام شده و مقدارش ۳ است." },
          { q: "Event Delegation چه مزیتی دارد؟", opts: ["کلیک سریع‌تر ثبت می‌شود", "یک listener روی والد، همه فرزندان را پوشش می‌دهد", "جلوگیری از کلیک راست", "نیاز به querySelector را حذف می‌کند"], ans: 1, why: "هم حافظه کمتر مصرف می‌شود و هم آیتم‌هایی که بعداً داینامیک اضافه می‌شوند، خودبه‌خود پوشش داده می‌شوند." },
        ],
      },
      {
        id: "c8-l2",
        title: "توابع، Closure و آرایه‌ها",
        minutes: 60,
        blocks: [
          { k: "p", t: "در جاوااسکریپت تابع شهروند درجه یک است: در متغیر ذخیره می‌شود، پاس داده می‌شود و برمی‌گردد. Closure وقتی شکل می‌گیرد که تابع، متغیرهای محدوده تولدش را حتی بعد از تمام‌شدن آن محدوده به یاد می‌آورد — یکی از قدرتمندترین و پرمصاحبه‌ترین مفاهیم زبان." },
          { k: "code", lang: "js", title: "closure.js", code: "function counter() {\n    let count = 0;                 // در Scope بسته حبس می‌شود\n    return {\n        inc: () => ++count,\n        get: () => count,\n    };\n}\n\nconst c = counter();\nc.inc(); c.inc();\nconsole.log(c.get());   // 2 — count زنده ماند!\n\n// کاربرد واقعی: Debounce\nfunction debounce(fn, delay = 300) {\n    let timer;\n    return (...args) => {\n        clearTimeout(timer);\n        timer = setTimeout(() => fn(...args), delay);\n    };\n}" },
          { k: "h", t: "متدهای آرایه؛ حلقه‌نویسی ممنوع" },
          { k: "code", lang: "js", title: "arrays.js", code: "const products = [\n    { name: \"Laptop\", price: 1200, stock: 3 },\n    { name: \"Phone\",  price: 800,  stock: 0 },\n    { name: \"Tablet\", price: 600,  stock: 7 },\n];\n\nconst names = products.map(p => p.name);\nconst available = products.filter(p => p.stock > 0);\nconst total = products.reduce((sum, p) => sum + p.price, 0);\nconst expensive = products.find(p => p.price > 1000);\n\nconsole.log(available.length, total);   // 2 2600" },
          { k: "tip", title: "نکته منتور", t: "به‌جای حلقه for برای تبدیل داده، اول فکر کن: map (تبدیل تک‌به‌تک)، filter (انتخاب)، reduce (جمع‌کردن به یک مقدار) یا find (اولین انطباق). این چهار تا ۹۰٪ پردازش داده در فرانت‌اند را پوشش می‌دهند." },
        ],
        quiz: [
          { q: "چرا تابع get هنوز به count دسترسی دارد؟", opts: ["چون count سراسری است", "چون Closure متغیرهای Scope تولد را نگه می‌دارد", "چون جاوااسکریپت کش می‌کند", "چون const بوده است"], ans: 1, why: "وقتی تابعی ساخته می‌شود، به Scope زنجیره‌ای که در آن متولد شده وصل می‌ماند؛ حتی وقتی counter() برگشته، count زنده است." },
          { q: "برای محاسبه مجموع قیمت‌ها کدام متد مناسب است؟", opts: ["map", "filter", "reduce", "find"], ans: 2, why: "reduce یک آرایه را به یک مقدار واحد (عدد، شیء و...) کاهش می‌دهد — دقیقاً کاری که جمع‌زدن نیاز دارد." },
        ],
      },
      {
        id: "c8-l3",
        title: "ناهمگامی؛ Promise و async/await",
        minutes: 70,
        blocks: [
          { k: "p", t: "جاوااسکریپت تک‌رشته‌ای است؛ پس عملیات طولانی (شبکه، فایل) نباید رشته را مسدود کند. راه‌حل: Event Loop. عملیات‌ها در پس‌زمینه انجام می‌شوند و نتیجه با Promise برمی‌گردد؛ async/await هم سینتکس خوانای همان Promise است، نه چیز جدیدی." },
          { k: "code", lang: "js", title: "async.js", code: "// Promise: سه حالت — pending, fulfilled, rejected\nasync function getUser(id) {\n    const res = await fetch(`/api/users/${id}`);\n    if (!res.ok) throw new Error(`HTTP ${res.status}`);\n    return res.json();\n}\n\nasync function main() {\n    try {\n        const user = await getUser(42);\n        console.log(user.name);\n    } catch (err) {\n        console.error(\"Failed:\", err.message);\n    }\n}\n\nmain();" },
          { k: "h", t: "موازی یا متوالی؟" },
          { k: "code", lang: "js", title: "parallel.js", code: "// بد: متوالی — ۳ ثانیه + ۲ ثانیه = ۵ ثانیه\nconst a = await fetchJson(\"/a\");   // 3s\nconst b = await fetchJson(\"/b\");   // 2s\n\n// خوب: موازی — max(3, 2) = ۳ ثانیه\nconst [x, y] = await Promise.all([\n    fetchJson(\"/a\"),\n    fetchJson(\"/b\"),\n]);" },
          { k: "warn", title: "اشتباه رایج", t: "استفاده از await داخل حلقه برای درخواست‌های مستقل، آن‌ها را متوالی می‌کند و سرعت را چند برابر کم می‌کند. اگر درخواست‌ها مستقل‌اند، Promise.all بزن؛ اگر ترتیب مهم نیست و شکست یکی قابل‌قبول است، Promise.allSettled." },
          { k: "def", term: "Event Loop", t: "مکانیزمی که صف callbackها را بعد از خالی‌شدن پشته اجرا می‌کند؛ به همین دلیل setTimeout(fn, 0) هم بلافاصله اجرا نمی‌شود — اول باید پشته فعلی خالی شود." },
        ],
        quiz: [
          { q: "Promise.all با یکی از Promiseهای reject شده چه می‌کند؟", opts: ["بقیه را ادامه می‌دهد", "بلافاصله کل نتیجه reject می‌شود", "undefined برمی‌گرداند", "خطای syntax می‌دهد"], ans: 1, why: "Promise.all همه‌یا‌هیچ است؛ برای تحمل شکستِ بخشی از کارها از Promise.allSettled استفاده کن." },
          { q: "چرا جاوااسکریپت با وجود Event Loop گاهی «گیر» می‌کند؟", opts: ["چون چندرشته‌ای است", "چون کد همگامِ سنگین، پشته را اشغال می‌کند", "چون Promiseها کندند", "گیر نمی‌کند"], ans: 1, why: "Event Loop فقط وقتی نوبت می‌گیرد که پشته خالی باشد؛ یک حلقه سنگین همگام، کل رابط کاربری را فریز می‌کند." },
        ],
      },
    ],
  },
  {
    id: "c9",
    intro:
      "React کتابخانه‌ای برای ساخت رابط کاربری از کامپوننت‌های قابل‌استفاده مجدد است. اما React حفظ‌کردنی نیست؛ درک‌کردنی است. این دوره روی سه مفهوم متمرکز است که همه‌چیز را توضیح می‌دهند: کامپوننت، State و رندر.",
    outcomes: [
      "تفکر کامپوننتی و تقسیم UI",
      "مدیریت State با useState و جریان داده یک‌طرفه",
      "Side Effectها با useEffect",
      "بهینه‌سازی رندر و اجتناب از باگ‌های رایج",
    ],
    lessons: [
      {
        id: "c9-l1",
        title: "کامپوننت و JSX؛ ذهنیت React",
        minutes: 50,
        blocks: [
          { k: "p", t: "React صفحه را درختی از کامپوننت‌ها می‌بیند؛ هر کامپوننت تابعی است که props می‌گیرد و JSX برمی‌گرداند. JSX نه HTML است نه رشته — توصیفی از UI است که کامپایلر آن را به فراخوانی تابع تبدیل می‌کند. قانون طلایی: کامپوننت باید خالص باشد؛ همان ورودی، همان خروجی." },
          { k: "code", lang: "jsx", title: "App.jsx", code: "function Badge({ children, color = \"teal\" }) {\n    return (\n        <span className={`badge badge-${color}`}>\n            {children}\n        </span>\n    );\n}\n\nfunction CourseCard({ course }) {\n    return (\n        <article className=\"card\">\n            <h3>{course.title}</h3>\n            <Badge color=\"amber\">{course.level}</Badge>\n            <p>{course.summary}</p>\n        </article>\n    );\n}\n\nexport default function App() {\n    return courses.map(c => <CourseCard key={c.id} course={c} />);\n}" },
          { k: "def", term: "key", t: "شناسه‌ای که به React می‌گوید کدام آیتم کدام است؛ بدون key درست، React نمی‌فهمد کدام آیتم حذف یا جابه‌جا شده و State آیتم‌ها قاطی می‌شود. هرگز از اندیس آرایه برای لیست‌های تغییرپذیر استفاده نکن." },
          { k: "warn", title: "خلوص کامپوننت", t: "در بدنه کامپوننت هرگز داده را mutate نکن، درخواست شبکه نزن و تاریخ/تصادفی را مستقیم نخوان. این کارها باید در Event Handlerها یا useEffect انجام شوند — وگرنه رندرهای غیرقابل‌پیش‌بینی خواهی داشت." },
          { k: "tip", title: "نکته منتور", t: "قبل از نوشتن کد، UI را روی کاغذ به جعبه‌های تو در تو تقسیم کن و نام بگذار. این طراحی ۵ دقیقه‌ای، ساختار props و State را قبل از کد مشخص می‌کند." },
        ],
        quiz: [
          { q: "چرا از اندیس آرایه به‌عنوان key در لیست‌های تغییرپذیر نباید استفاده کرد؟", opts: ["کند است", "با حذف/جابجایی، State آیتم‌های اشتباه به هم وصل می‌شود", "کامپایل نمی‌شود", "React اجازه نمی‌دهد"], ans: 1, why: "اندیس به موقعیت می‌چسبد نه به هویت؛ وقتی آیتمی حذف شود، State آیتم بعدی به اشتباه جابه‌جا می‌شود." },
          { q: "کامپوننت «خالص» یعنی چه؟", opts: ["بدون props", "همان ورودی، همیشه همان خروجی و بدون اثر جانبی", "فقط HTML برگرداند", "بدون className"], ans: 1, why: "خلوص یعنی بدنه کامپوننت چیزی جز محاسبه UI انجام ندهد؛ اثرات جانبی به Event Handler و useEffect منتقل می‌شوند." },
        ],
      },
      {
        id: "c9-l2",
        title: "State؛ قلب تپنده React",
        minutes: 65,
        blocks: [
          { k: "p", t: "State داده‌ای است که با گذر زمان تغییر می‌کند و UI باید به آن واکنش نشان دهد. وقتی setState صدا زده می‌شود، React دوباره کامپوننت را رندر می‌کند — اما نه کل صفحه؛ با مقایسه درخت مجازی (Virtual DOM) فقط بخش‌های تغییریافته را به‌روز می‌کند." },
          { k: "code", lang: "jsx", title: "Counter.jsx", code: "import { useState } from \"react\";\n\nexport function Counter() {\n    const [count, setCount] = useState(0);\n\n    // فرم تابعی: همیشه از آخرین state مطمئن باش\n    const bump = () => setCount(c => c + 1);\n\n    return (\n        <div>\n            <p>Count: {count}</p>\n            <button onClick={() => { bump(); bump(); }}>\n                +2\n            </button>\n        </div>\n    );\n}" },
          { k: "warn", title: "تله state قدیمی", t: "setCount(count + 1) دو بار پشت‌سرهم فقط یکی اضافه می‌کند! چون هر دو فراخوانی count یکسانی را می‌بینند. فرم تابعی setCount(c => c + 1) همیشه روی آخرین مقدار اعمال می‌شود و راه‌حل است." },
          { k: "h", t: "جریان داده یک‌طرفه" },
          { k: "p", t: "در React داده از بالا به پایین می‌رود (props) و رویدادها از پایین به بالا می‌آیند (callback). اگر دو کامپوننت هم‌سطح به یک state نیاز دارند، آن را به نزدیک‌ترین والد مشترک بالا ببر — الگویی که به Lifting State Up معروف است." },
          { k: "code", lang: "jsx", title: "search.jsx", code: "function SearchBox({ value, onChange }) {\n    return <input value={value} onChange={e => onChange(e.target.value)} />;\n}\n\nfunction ResultList({ query }) {\n    const results = courses.filter(c => c.title.includes(query));\n    return <ul>{results.map(c => <li key={c.id}>{c.title}</li>)}</ul>;\n}\n\nexport function Search() {\n    const [query, setQuery] = useState(\"\");   // state در والد مشترک\n    return (\n        <div>\n            <SearchBox value={query} onChange={setQuery} />\n            <ResultList query={query} />\n        </div>\n    );\n}" },
        ],
        quiz: [
          { q: "چرا setCount(c => c + 1) مطمئن‌تر از setCount(count + 1) است؟", opts: ["سریع‌تر است", "روی آخرین مقدار اعمال می‌شود نه مقدار قدیمیِ closure", "دو بار اعمال می‌شود", "رندر را حذف می‌کند"], ans: 1, why: "فرم تابعی یک صف است؛ React هر به‌روزرسانی را روی نتیجه قبلی اعمال می‌کند، پس حتی چند فراخوانی متوالی درست جمع می‌شوند." },
          { q: "وقتی دو کامپوننت هم‌سطح به یک داده نیاز دارند، state کجا می‌رود؟", opts: ["در یکی از آن‌ها", "نزدیک‌ترین والد مشترک", "در سراسری‌ترین نقطه", "در هر دو"], ans: 1, why: "Lifting State Up: state به والد مشترک می‌رود و با props پایین می‌آید — کمترین سطح ممکن، نه الزاماً Context." },
        ],
      },
      {
        id: "c9-l3",
        title: "useEffect و رندر کارآمد",
        minutes: 70,
        blocks: [
          { k: "p", t: "هر چیزی که «اثر جانبی» است — درخواست شبکه، اشتراک، تایمر، تغییر document — جای useEffect است. اما useEffect چاقوی دو لبه است؛ بیشتر باگ‌های «حلقه بی‌نهایت رندر» از آرایه وابستگی اشتباه می‌آید." },
          { k: "code", lang: "jsx", title: "useEffect.jsx", code: "import { useEffect, useState } from \"react\";\n\nexport function UserPage({ userId }) {\n    const [user, setUser] = useState(null);\n\n    useEffect(() => {\n        let alive = true;\n        fetch(`/api/users/${userId}`)\n            .then(r => r.json())\n            .then(data => { if (alive) setUser(data); });\n\n        // Cleanup: اگر کامپوننت پرید یا userId عوض شد\n        return () => { alive = false; };\n    }, [userId]);   // فقط وقتی userId تغییر کند\n\n    return user ? <h1>{user.name}</h1> : <p>Loading...</p>;\n}" },
          { k: "table", head: ["آرایه وابستگی", "رفتار"], rows: [["[]", "فقط یک بار بعد از mount"], ["[a, b]", "وقتی a یا b تغییر کند"], ["(نباشد)", "بعد از هر رندر — تقریباً همیشه اشتباه"]] },
          { k: "h", t: "رندر کمتر، نه زودتر" },
          { k: "list", items: ["React.memo کامپوننتی که props یکسان دارد را دوباره رندر نمی‌کند", "useMemo نتیجه محاسبات سنگین را کش می‌کند", "useCallback هویت تابع را بین رندرها ثابت نگه می‌دارد", "لیست‌های بزرگ را Virtualize کن (فقط آیتم‌های قابل‌دیدن رندر شوند)"] },
          { k: "warn", title: "اشتباه کلاسیک", t: "ساخت آبجکت یا آرایه داخل JSX و پاس‌دادن آن به کامپوننت memo‌شده، memo را بی‌اثر می‌کند؛ چون هویت آبجکت هر رندر عوض می‌شود. آبجکت‌ها را با useMemo بساز." },
          { k: "tip", title: "نکته منتور", t: "قبل از هر بهینه‌سازی، با React DevTools Profiler ببین چه چیزی واقعاً زیاد رندر می‌شود. ۹۰٪ «مشکلات کارایی» اصلاً وجود ندارند و ۱۰٪ بقیه معمولاً با بالا بردن state حل می‌شوند نه memo." },
        ],
        quiz: [
          { q: "اگر آرایه وابستگی useEffect فراموش شود چه می‌شود؟", opts: ["فقط یک بار اجرا می‌شود", "بعد از هر رندر اجرا می‌شود", "هرگز اجرا نمی‌شود", "کامپایلر خطا می‌دهد"], ans: 1, why: "بدون آرایه وابستگی، React دلیلی برای اجرا نکردن ندارد؛ اثر بعد از هر رندر تکرار می‌شود و اگر state را تغییر دهد، حلقه بی‌نهایت می‌سازد." },
          { q: "چرا آبجکت ساخته‌شده داخل رندر، React.memo را بی‌اثر می‌کند؟", opts: ["چون بزرگ است", "چون هویت مرجع آن هر رندر عوض می‌شود", "چون memo فقط برای عدد کار می‌کند", "بی‌اثر نمی‌کند"], ans: 1, why: "memo با مقایسه سطحی props کار می‌کند؛ {} !== {} چون دو مرجع متفاوت‌اند. با useMemo هویت را ثابت نگه دار." },
        ],
      },
    ],
  },
  {
    id: "c10",
    intro:
      "Node.js جاوااسکریپت را از مرورگر به سرور آورد و با معماری رویدادمحورِ ناهمگام، مدل سرورهای سنتی را تکان داد. در این دوره از Event Loop شروع می‌کنیم و به ساخت API واقعی با Express و اتصال به دیتابیس می‌رسیم.",
    outcomes: [
      "درک Event Loop و معماری ناهمگام Node",
      "ساخت REST API کامل با Express",
      "Middleware، اعتبارسنجی و مدیریت خطا",
      "اتصال به MongoDB/PostgreSQL",
    ],
    lessons: [
      {
        id: "c10-l1",
        title: "Node و Event Loop",
        minutes: 50,
        blocks: [
          { k: "p", t: "سرورهای سنتی به‌ازای هر درخواست یک Thread می‌سازند؛ با هزاران کاربر، هزاران Thread و حافظه سر به فلک. Node مسیر دیگری رفت: یک Thread اصلی با Event Loop. عملیات‌های I/O (دیسک، شبکه) به libuv سپرده می‌شوند و وقتی تمام شدند، callbackشان به صف برمی‌گردد." },
          { k: "code", lang: "js", title: "server.js", code: "const http = require(\"http\");\n\nconst server = http.createServer((req, res) => {\n    if (req.url === \"/\") {\n        res.writeHead(200, { \"Content-Type\": \"text/plain\" });\n        res.end(\"Hello from Node!\");\n    } else {\n        res.writeHead(404);\n        res.end(\"Not Found\");\n    }\n});\n\nserver.listen(3000, () => {\n    console.log(\"Server running on http://localhost:3000\");\n});" },
          { k: "def", term: "Non-blocking I/O", t: "Thread اصلی هرگز منتظر دیسک یا شبکه نمی‌ماند؛ درخواست I/O را می‌فرستد و به کار بعدی می‌رسد. نتیجه: یک Thread می‌تواند هزاران اتصال همزمان را مدیریت کند — مناسب I/O-bound، نه CPU-bound." },
          { k: "warn", title: "جایی که Node می‌میرد", t: "پردازش CPU-bound سنگین (مثل فشرده‌سازی بزرگ یا پردازش تصویر همگام) کل Event Loop را می‌گیرد و همه درخواست‌ها معطل می‌شوند. برای این کارها از Worker Thread، صف جداگانه یا زبان مناسب‌تر استفاده کن." },
          { k: "tip", title: "نکته منتور", t: "قاعده طلایی: «یا callback بده، یا Promise برگردان، یا خطا را پرتاب کن». هیچ‌وقت خطا را قورت نده؛ یک خطای بی‌صدا در سرور، باگی است که نیمه‌شب در Production پیدا می‌شود." },
        ],
        quiz: [
          { q: "چرا Node برای APIهای پرترافیکِ دیتابیس‌محور مناسب است؟", opts: ["چون چندرشته‌ای است", "چون I/O ناهمگام است و Thread اصلی بلاک نمی‌شود", "چون سریع‌ترین زبان است", "چون حافظه بیشتری دارد"], ans: 1, why: "بیشتر زمان یک API صرف انتظار برای دیتابیس و شبکه است؛ Node در این انتظارها بیکار نمی‌ماند و به درخواست‌های دیگر سرویس می‌دهد." },
          { q: "برای پردازش تصویر سنگین در Node چه باید کرد؟", opts: ["همان Thread اصلی", "Worker Thread یا سرویس جداگانه", "setTimeout", "افزایش RAM"], ans: 1, why: "پردازش همگام CPU-bound کل Event Loop را فریز می‌کند؛ Worker Thread پردازش را به رشته موازی منتقل می‌کند." },
        ],
      },
      {
        id: "c10-l2",
        title: "REST API با Express",
        minutes: 65,
        blocks: [
          { k: "p", t: "Express لایه نازکی روی http است که مسیریابی و Middleware را ساده می‌کند. REST یعنی منابع (اسم‌ها) با URL و عملیات (فعل‌ها) با HTTP Method: GET خواندن، POST ایجاد، PUT/PATCH به‌روزرسانی و DELETE حذف. پاسخ‌ها با کد وضعیت معنا پیدا می‌کنند: ۲۰۰ موفق، ۲۰۱ ایجاد شد، ۴۰۴ نیست، ۴۲۲ ورودی نامعتبر." },
          { k: "code", lang: "js", title: "api.js", code: "const express = require(\"express\");\nconst app = express();\napp.use(express.json());\n\nlet books = [{ id: 1, title: \"Clean Code\", author: \"Martin\" }];\n\n// GET /books\napp.get(\"/books\", (req, res) => {\n    res.json(books);\n});\n\n// POST /books با اعتبارسنجی\napp.post(\"/books\", (req, res) => {\n    const { title, author } = req.body;\n    if (!title || !author) {\n        return res.status(422).json({ error: \"title and author required\" });\n    }\n    const book = { id: books.length + 1, title, author };\n    books.push(book);\n    res.status(201).json(book);\n});\n\n// Middleware مدیریت خطا — همیشه آخر\napp.use((err, req, res, next) => {\n    console.error(err);\n    res.status(500).json({ error: \"Internal Server Error\" });\n});\n\napp.listen(3000);" },
          { k: "h", t: "Middleware؛ زنجیره پردازش" },
          { k: "p", t: "هر درخواست از یک زنجیره Middleware عبور می‌کند؛ هر کدام یا پاسخ می‌دهد یا با next() به بعدی می‌سپارد. لاگ، احراز هویت، Rate Limit و CORS همه با همین الگو پیاده می‌شوند — قدرت اصلی Express." },
          { k: "code", lang: "js", title: "middleware.js", code: "const logger = (req, res, next) => {\n    console.log(`${req.method} ${req.url}`);\n    next();   // بدون این، درخواست برای همیشه گیر می‌کند!\n};\n\napp.use(logger);" },
          { k: "warn", title: "فراموشی next()", t: "Middleware‌ای که نه پاسخ بدهد و نه next() را صدا بزند، درخواست را تا ابد معلق می‌کند و کاربر فقط Timeout می‌بیند. این باگ در لاگ‌ها هم دیده نمی‌شود — همیشه یکی از این دو را انجام بده." },
        ],
        quiz: [
          { q: "کدام ترکیب Method و کد وضعیت برای «ایجاد منبع جدید» درست است؟", opts: ["GET + 200", "POST + 201", "PUT + 404", "POST + 200"], ans: 1, why: "POST برای ایجاد است و 201 Created دقیقاً می‌گوید «منبع ساخته شد»؛ معمولاً با آدرس منبع جدید در Location همراه است." },
          { q: "اگر Middlewareای next() را صدا نزند چه می‌شود؟", opts: ["به Middleware بعدی می‌رود", "درخواست معلق می‌ماند تا Timeout", "خطای 500 می‌دهد", "Express خطا می‌دهد"], ans: 1, why: "زنجیره قطع می‌شود؛ نه پاسخی فرستاده می‌شود و نه خطایی — درخواست تا Timeout کلاینت باز می‌ماند." },
        ],
      },
      {
        id: "c10-l3",
        title: "دیتابیس و لایه‌بندی",
        minutes: 70,
        blocks: [
          { k: "p", t: "API بدون دیتابیس یعنی داده‌ها با ری‌استارت سرور می‌پرند. اتصال به دیتابیس را با یک درایور انجام می‌دهیم و برای جلوگیری از تزریق SQL، همیشه از Query پارامتری‌شده استفاده می‌کنیم. و مهم‌تر از اتصال: ساختار کد — Handler نباید مستقیم SQL بنویسد." },
          { k: "code", lang: "js", title: "pg.js", code: "const { Pool } = require(\"pg\");\nconst pool = new Pool({ connectionString: process.env.DATABASE_URL });\n\n// Repository: تنها جایی که SQL زندگی می‌کند\nasync function findUserByEmail(email) {\n    const { rows } = await pool.query(\n        \"SELECT id, name, email FROM users WHERE email = $1\",\n        [email]   // پارامتری — هرگز string concat نکن!\n    );\n    return rows[0];\n}\n\n// Handler: فقط HTTP\napp.get(\"/users/by-email\", async (req, res, next) => {\n    try {\n        const user = await findUserByEmail(req.query.email);\n        if (!user) return res.status(404).json({ error: \"Not found\" });\n        res.json(user);\n    } catch (err) {\n        next(err);   // به Middleware خطا بسپار\n    }\n});" },
          { k: "def", term: "SQL Injection", t: "اگر ورودی کاربر مستقیم داخل رشته SQL الحاق شود، مهاجم می‌تواند ساختار query را عوض کند؛ مثلاً با ' OR '1'='1 همه رکوردها را بخواند. Query پارامتری‌شده ورودی را «داده» نگه می‌دارد نه «کد»." },
          { k: "tip", title: "نکته منتور", t: "لایه‌ها را جدا کن: Route فقط مسیر، Handler فقط HTTP و اعتبارسنجی، Service منطق کسب‌وکار و Repository دسترسی به داده. وقتی هر لایه یک مسئولیت دارد، تست‌کردن هرکدام بدون بقیه ممکن می‌شود." },
        ],
        quiz: [
          { q: "چرا pool.query با $1 امن‌تر از ساخت رشته با + است؟", opts: ["سریع‌تر است", "ورودی به‌عنوان داده فرستاده می‌شود نه بخشی از SQL", "کوتاه‌تر است", "نیاز به await ندارد"], ans: 1, why: "در query پارامتری‌شده، دیتابیس ساختار دستور را از قبل می‌شناسد؛ کاراکترهای خاص ورودی هرگز به‌عنوان SQL تفسیر نمی‌شوند." },
          { q: "مسئولیت لایه Repository چیست؟", opts: ["پاسخ HTTP", "منطق کسب‌وکار", "دسترسی به داده و SQL", "مسیریابی"], ans: 2, why: "SQL و جزئیات دیتابیس فقط در Repository؛ بقیه لایه‌ها با متد‌های معنادار مثل findUserByEmail کار می‌کنند و قابل‌تعویض‌اند." },
        ],
      },
    ],
  },
  {
    id: "c11",
    intro:
      "دیتابیس جایی است که کد خوب می‌تواند با یک query بد نابود شود — یا یک query خوب، سرور ضعیف را نجات دهد. این دوره هم SQL و مدل رابطه‌ای را عمیق پوشش می‌دهد و هم نگاه مهندسی می‌دهد: چه زمانی SQL و چه زمانی NoSQL؟",
    outcomes: [
      "طراحی اسکیما و نرمال‌سازی",
      "نوشتن query با JOIN و GROUP BY",
      "اینکس‌گذاری و خواندن Execution Plan",
      "تشخیص موارد مناسب NoSQL",
    ],
    lessons: [
      {
        id: "c11-l1",
        title: "مدل رابطه‌ای و SQL",
        minutes: 55,
        blocks: [
          { k: "p", t: "در مدل رابطه‌ای داده در جدول‌هایی از ردیف و ستون ذخیره می‌شود و جدول‌ها با کلید خارجی به هم وصل می‌شوند. SQL زبان اعلامی است: نمی‌گویی «چطور» بگرد، می‌گویی «چه» می‌خواهی — و موتور query خودش بهترین مسیر را پیدا می‌کند." },
          { k: "code", lang: "sql", title: "schema.sql", code: "CREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    email VARCHAR(255) UNIQUE NOT NULL,\n    name VARCHAR(100) NOT NULL,\n    created_at TIMESTAMP DEFAULT NOW()\n);\n\nCREATE TABLE orders (\n    id SERIAL PRIMARY KEY,\n    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n    total NUMERIC(10, 2) NOT NULL,\n    status VARCHAR(20) DEFAULT 'pending'\n);\n\nCREATE INDEX idx_orders_user ON orders(user_id);" },
          { k: "h", t: "JOIN؛ وصل‌کردن جدول‌ها" },
          { k: "code", lang: "sql", title: "join.sql", code: "-- سفارش‌های هر کاربر با مجموع خرید\nSELECT u.name,\n       COUNT(o.id) AS order_count,\n       COALESCE(SUM(o.total), 0) AS spent\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nGROUP BY u.id, u.name\nHAVING COALESCE(SUM(o.total), 0) > 1000000\nORDER BY spent DESC\nLIMIT 10;" },
          { k: "def", term: "LEFT JOIN", t: "همه ردیف‌های جدول چپ را نگه می‌دارد حتی اگر در جدول راست جفتی نداشته باشند (ستون‌های راست NULL می‌شوند). INNER JOIN فقط جفت‌شده‌ها را برمی‌گرداند — برای گزارش «همه کاربران حتی بدون خرید»، LEFT لازم است." },
          { k: "warn", title: "ترتیب WHERE و HAVING", t: "WHERE قبل از گروه‌بندی فیلتر می‌کند و HAVING بعد از آن. شرط روی ستون تجمیعی (مثل SUM) فقط در HAVING مجاز است — یکی از رایج‌ترین خطاهای SQL تازه‌کارها." },
        ],
        quiz: [
          { q: "تفاوت WHERE و HAVING چیست؟", opts: ["هیچ تفاوتی ندارند", "WHERE قبل از GROUP BY فیلتر می‌کند، HAVING بعد از آن", "HAVING سریع‌تر است", "WHERE فقط برای عدد کار می‌کند"], ans: 1, why: "WHERE ردیف‌های خام را فیلتر می‌کند و HAVING گروه‌های ساخته‌شده را؛ پس شرط روی COUNT/SUM جای HAVING است." },
          { q: "ON DELETE CASCADE چه می‌کند؟", opts: ["جلوی حذف کاربر را می‌گیرد", "با حذف کاربر، سفارش‌هایش هم حذف می‌شوند", "سفارش‌ها را آرشیو می‌کند", "خطای 500 می‌دهد"], ans: 1, why: "CASCADE یعنی حذف از والد به فرزند سرریز می‌کند؛ بدون آن، حذف کاربر به‌خاطر کلید خارجی خطا می‌دهد." },
        ],
      },
      {
        id: "c11-l2",
        title: "نرمال‌سازی و اینکس",
        minutes: 65,
        blocks: [
          { k: "p", t: "نرمال‌سازی یعنی حذف افزونگی داده: هر حقیقت فقط یک جا ذخیره شود تا به‌روزرسانی آن در هزار ردیف لازم نشود. اما نرمال‌سازی افراطی JOINهای سنگین می‌سازد؛ هنر مهندس، یافتن تعادل است — Denormalization آگاهانه برای سرعت خواندن، کاملاً مشروع است." },
          { k: "list", items: ["1NF: هر سلول یک مقدار اتمی؛ آرایه داخل ستون ممنوع", "2NF: ستون‌های غیرکلیدی به کل کلید وابسته باشند نه بخشی از آن", "3NF: هیچ ستون غیرکلیدی به ستون غیرکلیدی دیگر وابسته نباشد", "مثال نقض: ذخیره نام شهر در جدول سفارش، وقتی شهر از کدپستی قابل‌استخراج است"] },
          { k: "h", t: "اینکس؛ فهرست مطالب کتاب" },
          { k: "p", t: "بدون اینکس، هر WHERE کل جدول را اسکن می‌کند (O(n)). اینکس ساختار درختی B-Tree است که ستون را مرتب نگه می‌دارد و جست‌وجو را به O(log n) می‌رساند — اما نوشتن را کمی گران‌تر می‌کند، چون هر INSERT باید اینکس را هم به‌روز کند." },
          { k: "code", lang: "sql", title: "explain.sql", code: "-- قبل از اینکس: Seq Scan روی 5 میلیون ردیف\nEXPLAIN ANALYZE\nSELECT * FROM orders WHERE status = 'failed';\n\nCREATE INDEX idx_orders_status ON orders(status);\n\n-- بعد: Index Scan در چند میلی‌ثانیه\nEXPLAIN ANALYZE\nSELECT * FROM orders WHERE status = 'failed';" },
          { k: "warn", title: "ایندکس رایگان نیست", t: "هر اینکس هم حافظه می‌گیرد و هم هر نوشتن را کندتر می‌کند. روی هر ستونی اینکس نزن؛ اول با EXPLAIN ANALYZE گلوگاه واقعی را پیدا کن، بعد فقط همان‌جا." },
          { k: "tip", title: "نکته منتور", t: "قاعده سرانگشتی: ستون‌هایی که در WHERE، JOIN و ORDER BY زیاد می‌آیند کاندید ایندکس‌اند؛ ستون‌هایی با تنوع کم (مثل جنسیت) معمولاً اینکس مفیدی نمی‌سازند." },
        ],
        quiz: [
          { q: "چرا اینکس، INSERT را کندتر می‌کند؟", opts: ["نمی‌کند", "چون ساختار درختی اینکس هم باید به‌روز شود", "چون اینکس قفل می‌گذارد", "چون لاگ می‌نویسد"], ans: 1, why: "هر ردیف جدید باید جای درستش در B-Tree اینکس پیدا و درج شود؛ پس نوشتن روی جدول پر از اینکس گران‌تر است." },
          { q: "هدف اصلی نرمال‌سازی چیست؟", opts: ["سرعت خواندن", "حذف افزونگی و جلوگیری از ناسازگاری داده", "کاهش حجم دیتابیس", "ساده‌تر شدن query"], ans: 1, why: "وقتی یک حقیقت یک جا ذخیره شود، به‌روزرسانی آن در یک ردیف انجام می‌شود و امکان داده متناقض از بین می‌رود." },
        ],
      },
      {
        id: "c11-l3",
        title: "NoSQL؛ کجا و چرا",
        minutes: 55,
        blocks: [
          { k: "p", t: "NoSQL یعنی «نه فقط SQL»؛ خانواده‌ای از دیتابیس‌ها که مدل رابطه‌ای را برای مقیاس یا انعطاف خاص رها می‌کنند. مهم‌ترین درس این جلسه: انتخاب دیتابیس بر اساس الگوی دسترسی داده است، نه مد روز." },
          { k: "table", head: ["نوع", "مثال", "مناسب برای"], rows: [["Document", "MongoDB", "داده نیمه‌ساختاری با schema متغیر"], ["Key-Value", "Redis", "کش، Session، شمارنده"], ["Column-Family", "Cassandra", "نوشتن حجیم و توزیع‌شده"], ["Graph", "Neo4j", "شبکه‌های اجتماعی، تقلب‌یابی"]] },
          { k: "code", lang: "js", title: "mongo.js", code: "// Document: کل سفارش یک سند، بدون JOIN\nconst order = {\n    user: { id: 42, name: \"Ali\" },\n    items: [\n        { sku: \"A-1\", qty: 2, price: 350000 },\n        { sku: \"B-7\", qty: 1, price: 120000 },\n    ],\n    status: \"paid\",\n    createdAt: new Date(),\n};\n\nawait orders.insertOne(order);\n\n// query: تو در تو اما بدون JOIN\nawait orders.find({ \"items.sku\": \"A-1\", status: \"paid\" }).toArray();" },
          { k: "def", term: "CAP و Trade-off", t: "در سیستم توزیع‌شده نمی‌توان همزمان سازگاری (C)، دسترس‌پذیری (A) و تحمل پارتیشن (P) را کامل داشت. SQL معمولاً CP و بسیاری از NoSQLها AP را ترجیح می‌دهند؛ انتخاب یعنی پذیرش آگاهانه این مصالحه." },
          { k: "warn", title: "اشتباه رایج", t: "رفتن سراغ NoSQL فقط برای «فرار از JOIN و schema» معمولاً پشیمانی می‌آورد؛ چون تراکنش و گزارش‌گیری رابطه‌ای را از دست می‌دهی. اول مطمئن شو الگوی دسترسی‌ات واقعاً با مدل سند یا کلید-مقدار جور است." },
        ],
        quiz: [
          { q: "برای Session کاربرها در یک فروشگاه بزرگ کدام انتخاب منطقی‌تر است؟", opts: ["PostgreSQL", "Redis", "MongoDB", "Neo4j"], ans: 1, why: "Session خواندن و نوشتن کلید-مقدار بسیار سریع با TTL است — دقیقاً تخصص Redis؛ نه JOIN لازم است نه query پیچیده." },
          { q: "مزایای ذخیره کل سفارش در یک سند Mongo چیست؟", opts: ["اینکس بهتر", "خواندن سفارش بدون JOIN و مطابق ساختار برنامه", "حجم کمتر", "تراکنش قوی‌تر"], ans: 1, why: "برنامه شیء سفارش را یک‌جا می‌خواند و می‌نویسد؛ مدل داده دقیقاً شکل کد است — اما گزارش‌های تجمیعی سخت‌تر می‌شود." },
        ],
      },
    ],
  },
  {
    id: "c12",
    intro:
      "وقتی یک سیستم از یک فایل رد می‌شود، مسئله دیگر «کد» نیست؛ «مرزها» هستند. این دوره درباره تصمیم‌های ساختاری است که تغییرشان بعداً گران‌ترین هزینه را دارد: لایه‌بندی، ماژولار بودن و شکستن سیستم به سرویس‌ها — یا نشکستن!",
    outcomes: [
      "طراحی معماری لایه‌ای و Clean Architecture",
      "تحلیل Monolith در برابر Microservices",
      "الگوهای ارتباطی: REST، Message Queue و Event",
      "مقابله با چالش‌های سیستم توزیع‌شده",
    ],
    lessons: [
      {
        id: "c12-l1",
        title: "لایه‌بندی و Clean Architecture",
        minutes: 60,
        blocks: [
          { k: "p", t: "معماری یعنی تصمیم درباره «چه چیزی اجازه دارد به چه چیزی وابسته باشد». در Clean Architecture وابستگی‌ها فقط به سمت داخل مجازند: فریم‌ورک‌ها و دیتابیس در بیرونی‌ترین لایه و قوانین کسب‌وکار در مرکز. نتیجه: تعویض دیتابیس یا فریم‌ورک بدون دست‌زدن به منطق اصلی." },
          { k: "code", lang: "txt", title: "structure", code: "src/\n├── domain/            # قلب سیستم — بدون هیچ وابستگی\n│   ├── entities/      # User, Order, Product\n│   ├── services/      # قوانین کسب‌وکار خالص\n│   └── ports/         # interfaceها (OrderRepository)\n├── application/       # use caseها (PlaceOrderUseCase)\n├── adapters/          # ترجمه دنیای بیرون به domain\n│   ├── web/           # controllerها و routeها\n│   ├── persistence/   # پیاده‌سازی repository با SQL\n│   └── messaging/     # producer/consumer\n└── infra/             # config، bootstrap، DI" },
          { k: "def", term: "Port و Adapter", t: "domain نیازهایش را به‌صورت interface (Port) اعلام می‌کند — مثلاً «یک OrderRepository می‌خواهم». Adapter پیاده‌سازی واقعی است (PostgresOrderRepository). domain نمی‌داند و نباید بداند پشت صحنه چه دیتابیسی است." },
          { k: "code", lang: "ts", title: "ports.ts", code: "// domain/ports/order-repository.ts\nexport interface OrderRepository {\n    findById(id: string): Promise<Order | null>;\n    save(order: Order): Promise<void>;\n}\n\n// application/place-order.ts — فقط به port وابسته است\nexport class PlaceOrder {\n    constructor(private orders: OrderRepository) {}\n\n    async run(userId: string, items: CartItem[]): Promise<Order> {\n        const order = Order.create(userId, items);\n        await this.orders.save(order);\n        return order;\n    }\n}" },
          { k: "warn", title: "معماری برای بعداً", t: "Clean Architecture برای سیستم‌هایی است که رشد می‌کنند و تیم‌ها تغییر می‌کنند. برای یک MVP دو هفته‌ای، این لایه‌ها سرعت را می‌کشند. قانون: وقتی دردِ تغییر حس شد، جدا کن — نه قبل از آن." },
          { k: "tip", title: "نکته منتور", t: "ساده‌ترین تست معماری: اگر بتوانی use caseها را بدون دیتابیس، بدون HTTP و بدون فریم‌ورک تست کنی، مرزها درست کشیده شده‌اند." },
        ],
        quiz: [
          { q: "در Clean Architecture وابستگی‌ها به کدام سمت مجازند؟", opts: ["به سمت بیرون (فریم‌ورک‌ها)", "به سمت داخل (domain)", "دوطرفه", "بستگی به اندازه پروژه دارد"], ans: 1, why: "مرکز (قوانین کسب‌وکار) باید از همه‌چیز مستقل بماند؛ دیتابیس و فریم‌ورک به آن وابسته‌اند نه برعکس." },
          { q: "مزیت Port/Adapter چیست؟", opts: ["کد کمتر", "تعویض پیاده‌سازی (مثل دیتابیس) بدون تغییر منطق", "سرعت بیشتر query", "حذف نیاز به تست"], ans: 1, why: "منطق به interface وابسته است؛ برای تست Fake و برای تولید Postgres — هر دو بدون تغییر یک خط از domain." },
        ],
      },
      {
        id: "c12-l2",
        title: "Monolith یا Microservices؟",
        minutes: 65,
        blocks: [
          { k: "p", t: "میکروسرویس مد شده، اما اکثر تیم‌هایی که زود شکسته‌اند، پشیمان‌اند. حقیقت: Monolith خوب‌ساخته (Modular Monolith) برای ۹۰٪ محصولات تا سال‌ها کافی است. میکروسرویس هزینه دارد: شبکه غیرقابل‌اعتماد، توزیع داده، استقرار پیچیده و Observability." },
          { k: "table", head: ["معیار", "Modular Monolith", "Microservices"], rows: [["استقرار", "ساده — یک artifact", "چندین pipeline و نسخه‌بندی"], ["ارتباط", "فراخوانی تابع — سریع و مطمئن", "شبکه — کند و خطاپذیر"], ["تراکنش", "ACID ساده", "Saga — پیچیده و eventually consistent"], ["تیم", "مناسب تیم کوچک", "تیم‌های مستقل و بزرگ"], ["مقیاس", "کل سیستم با هم", "مقیاس مستقل هر بخش"]] },
          { k: "def", term: "Bounded Context", t: "مرزی از DDD که داخلش یک مدل معنایی یکپارچه حاکم است؛ مثلاً «کالا» در context انبار یعنی موجودی و وزن، در context فروش یعنی قیمت و توضیح. مرزهای سرویس باید با این contextها منطبق شوند نه با جدول‌های دیتابیس." },
          { k: "warn", title: "قانون شکستن", t: "تا وقتی درد واقعی نداری نشکن: دردی مثل استقرار کندِ ناشی از اندازه، تیم‌هایی که روی کد هم پا می‌گذارند، یا نیاز مقیاس مستقل یک بخش. «پیش‌بینی رشد آینده» به‌تنهایی دلیل موجهی نیست." },
          { k: "tip", title: "نکته منتور", t: "Modular Monolith یعنی همان معماری لایه‌ای با مرزهای سفت: هر ماژول فقط از طریق interface عمومی ماژول دیگر را می‌شاید. اگر روزی شکستن لازم شد، مرزها از قبل آماده‌اند." },
        ],
        quiz: [
          { q: "بزرگ‌ترین هزینه پنهان میکروسرویس چیست؟", opts: ["لایسنس", "انتقال ارتباط درون‌پردازشی به شبکه‌ای غیرقابل‌اعتماد", "نیاز به RAM بیشتر", "کند بودن زبان‌ها"], ans: 1, why: "فراخوانی که دیروز یک تابع بود حالا درخواست شبکه است: Timeout، Retry، نسخه‌بندی و خطای جزئی — پیچیدگی‌ای که در Monolith اصلاً وجود نداشت." },
          { q: "مرز مناسب برای شکستن به سرویس چیست؟", opts: ["تعداد خطوط کد", "Bounded Context و نیاز مستقل تیم/مقیاس", "تعداد endpointها", "تصمیم مدیر فنی"], ans: 1, why: "مرزهای معنایی کسب‌وکار پایدارند؛ مرز بر اساس جدول یا endpoint با اولین تغییر نیازمندی جابه‌جا می‌شود و شکست‌ها شروع می‌شود." },
        ],
      },
      {
        id: "c12-l3",
        title: "ارتباط سرویس‌ها و Event-Driven",
        minutes: 70,
        blocks: [
          { k: "p", t: "سرویس‌ها دو جور حرف می‌زنند: همگام (REST/gRPC — «الان جواب بده») و ناهمگام (پیام — «هر وقت رسیدی انجام بده»). ارتباط همگام زنجیره وابستگی می‌سازد؛ اگر سرویس پایین‌دست بیفتد، بالادست هم می‌افتد. Message Broker این وابستگی را می‌شکند." },
          { k: "code", lang: "js", title: "producer.js", code: "// سرویس سفارش: فقط اعلام می‌کند چه اتفاقی افتاد\nconst { Kafka } = require(\"kafkajs\");\nconst kafka = new Kafka({ brokers: [\"kafka:9092\"] });\nconst producer = kafka.producer();\n\nasync function placeOrder(order) {\n    await orders.save(order);\n\n    await producer.send({\n        topic: \"order.placed\",\n        messages: [{\n            key: order.id,\n            value: JSON.stringify({\n                orderId: order.id,\n                userId: order.userId,\n                items: order.items,\n            }),\n        }],\n    });\n    // سرویس سفارش نمی‌داند چه کسی گوش می‌دهد:\n    // انبار موجودی کم می‌کند، ایمیل تأیید می‌رود، وفاداری امتیاز می‌دهد\n}" },
          { k: "def", term: "Event", t: "گزارش تغییری که قبلاً رخ داده — گذشته‌نگر و تغییرناپذیر: order.placed نه order.place. مصرف‌کننده‌ها می‌توانند بعداً اضافه شوند بدون اینکه تولیدکننده تغییر کند؛ همین «جهل متقابل» قدرت معماری رویدادمحور است." },
          { k: "h", t: "وقتی تراکنش ACID ممکن نیست" },
          { k: "p", t: "در سیستم توزیع‌شده نمی‌شود در یک تراکنش هم سفارش را ثبت کرد هم موجودی را کم کرد؛ چون دو دیتابیس جداست. راه‌حل Saga: هر قدم یک تراکنش محلی + یک Event؛ و اگر قدمی شکست، Eventهای جبرانی (Compensation) مراحل قبل را برمی‌گردانند." },
          { k: "warn", title: "Event هم رایگان نیست", t: "معماری رویدادمحور یعنی پذیرش Eventually Consistency: برای لحظاتی سفارش ثبت شده ولی موجودی هنوز کم نشده. اگر کسب‌وکار این تأخیر را تحمل نمی‌کند، همان فراخوانی همگام با مدارشکن (Circuit Breaker) انتخاب درست‌تری است." },
        ],
        quiz: [
          { q: "مهم‌ترین مزیت Message Broker بین دو سرویس چیست؟", opts: ["سرعت بیشتر درخواست", "قطع وابستگی همگام؛ خرابی مصرف‌کننده تولیدکننده را نمی‌خواباند", "امنیت بیشتر", "کاهش حجم داده"], ans: 1, why: "تولیدکننده پیام را به Broker می‌سپارد و برمی‌گردد؛ مصرف‌کننده هر وقت آماده بود پردازش می‌کند — خرابی‌ها و ترافیک‌ها جدا می‌شوند." },
          { q: "الگوی Saga چه مسئله‌ای را حل می‌کند؟", opts: ["سرعت query", "تراکنش چندسرویسی بدون قفل سراسری", "احراز هویت", "نسخه‌بندی API"], ans: 1, why: "به‌جای یک تراکنش توزیع‌شده غیرممکن، زنجیره‌ای از تراکنش‌های محلی با Event و مسیر جبران برای شکست تعریف می‌شود." },
        ],
      },
    ],
  },
];
