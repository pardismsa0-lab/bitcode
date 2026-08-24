export type Hue = "amber" | "teal" | "cyan" | "coral";

export type CatId = "prog" | "cs" | "se" | "web" | "data" | "infra";

export interface Course {
  id: string;
  title: string;
  cat: CatId;
  level: "مقدماتی" | "متوسط" | "پیشرفته";
  hours: number;
  sessions: number;
  students: number;
  rating: number;
  price: number; // 0 = رایگان
  popular?: boolean;
  instructor: string;
  skills: string[];
  hue: Hue;
}

export const categories: { id: CatId | "all"; label: string }[] = [
  { id: "all", label: "همه دوره‌ها" },
  { id: "prog", label: "برنامه‌نویسی" },
  { id: "cs", label: "علوم کامپیوتر" },
  { id: "se", label: "مهندسی نرم‌افزار" },
  { id: "web", label: "توسعه وب" },
  { id: "data", label: "داده و هوش مصنوعی" },
  { id: "infra", label: "زیرساخت و DevOps" },
];

export const courses: Course[] = [
  { id: "py", title: "مبانی برنامه‌نویسی با پایتون", cat: "prog", level: "مقدماتی", hours: 42, sessions: 28, students: 4820, rating: 4.9, price: 0, popular: true, instructor: "دکتر آرش کمالی", skills: ["متغیرها و تایپ‌ها", "توابع", "حلقه‌ها", "کار با فایل"], hue: "teal" },
  { id: "java", title: "برنامه‌نویسی شی‌گرا با جاوا", cat: "prog", level: "مقدماتی", hours: 56, sessions: 34, students: 3150, rating: 4.8, price: 1980000, instructor: "مهندس سارا محمدی", skills: ["کلاس و شی", "وراثت", "اینترفیس", "اصول SOLID"], hue: "amber" },
  { id: "cpp", title: "سی‌پلاس‌پلاس مدرن برای سیستم‌سازی", cat: "prog", level: "پیشرفته", hours: 62, sessions: 36, students: 1980, rating: 4.7, price: 2850000, instructor: "دکتر بردیا افشار", skills: ["اشاره‌گرها", "مدیریت حافظه", "C++20", "STL"], hue: "cyan" },
  { id: "dsa", title: "ساختمان داده‌ها و الگوریتم‌ها", cat: "cs", level: "متوسط", hours: 68, sessions: 40, students: 3940, rating: 5.0, price: 2450000, popular: true, instructor: "دکتر بردیا افشار", skills: ["درخت‌ها و گراف", "مرتب‌سازی", "پیچیدگی زمانی", "هش‌تیبل"], hue: "cyan" },
  { id: "algo", title: "طراحی الگوریتم‌های پیشرفته", cat: "cs", level: "پیشرفته", hours: 44, sessions: 26, students: 1280, rating: 4.7, price: 2850000, instructor: "دکتر بردیا افشار", skills: ["برنامه‌ریزی پویا", "الگوریتم حریصانه", "تقسیم و حل", "NP-کامل"], hue: "coral" },
  { id: "os", title: "سیستم‌عامل: از پردازش تا همزمانی", cat: "cs", level: "متوسط", hours: 48, sessions: 30, students: 2210, rating: 4.6, price: 2250000, instructor: "دکتر بردیا افشار", skills: ["Thread و Lock", "زمان‌بندی", "حافظه مجازی", "فایل‌سیستم"], hue: "amber" },
  { id: "net", title: "شبکه‌های کامپیوتری و پروتکل‌ها", cat: "cs", level: "متوسط", hours: 50, sessions: 32, students: 2040, rating: 4.6, price: 2150000, instructor: "مهندس نگار رستمی", skills: ["TCP/IP", "DNS و HTTP", "مسیریابی", "امنیت شبکه"], hue: "teal" },
  { id: "se", title: "مهندسی نرم‌افزار و مدل‌سازی UML", cat: "se", level: "متوسط", hours: 52, sessions: 30, students: 2760, rating: 4.9, price: 2250000, popular: true, instructor: "دکتر آرش کمالی", skills: ["چرخه حیات", "UML", "نیازمندی‌ها", "اسکرام"], hue: "amber" },
  { id: "dp", title: "الگوهای طراحی به زبان ساده", cat: "se", level: "پیشرفته", hours: 38, sessions: 22, students: 2140, rating: 4.9, price: 2650000, instructor: "مهندس نگار رستمی", skills: ["Creational", "Structural", "Behavioral", "مثال‌های واقعی"], hue: "teal" },
  { id: "arch", title: "معماری نرم‌افزار و میکروسرویس‌ها", cat: "se", level: "پیشرفته", hours: 54, sessions: 32, students: 1860, rating: 4.8, price: 3200000, popular: true, instructor: "دکتر آرش کمالی", skills: ["Clean Architecture", "DDD", "رویدادمحور", "مقیاس‌پذیری"], hue: "coral" },
  { id: "test", title: "تست نرم‌افزار و TDD عملی", cat: "se", level: "متوسط", hours: 36, sessions: 24, students: 1530, rating: 4.7, price: 1980000, instructor: "مهندس سارا محمدی", skills: ["هرم تست", "Unit Test", "TDD", "Refactor"], hue: "cyan" },
  { id: "react", title: "توسعه فرانت‌اند حرفه‌ای با React", cat: "web", level: "متوسط", hours: 60, sessions: 38, students: 3680, rating: 4.9, price: 2650000, popular: true, instructor: "مهندس نگار رستمی", skills: ["Hooks", "State Management", "Routing", "Performance"], hue: "cyan" },
  { id: "node", title: "توسعه بک‌اند با Node.js", cat: "web", level: "متوسط", hours: 48, sessions: 30, students: 2950, rating: 4.8, price: 2450000, instructor: "مهندس سارا محمدی", skills: ["Express", "REST API", "Auth", "پایگاه داده"], hue: "teal" },
  { id: "sql", title: "پایگاه داده، SQL و طراحی اسکیما", cat: "data", level: "مقدماتی", hours: 40, sessions: 26, students: 3320, rating: 4.8, price: 1850000, instructor: "مهندس سارا محمدی", skills: ["PostgreSQL", "طراحی اسکیما", "ایندکس‌گذاری", "تراکنش"], hue: "amber" },
  { id: "ml", title: "یادگیری ماشین کاربردی", cat: "data", level: "پیشرفته", hours: 58, sessions: 34, students: 1740, rating: 4.7, price: 3400000, instructor: "دکتر بردیا افشار", skills: ["Python", "Scikit-learn", "مدل‌سازی", "ارزیابی"], hue: "coral" },
  { id: "devops", title: "DevOps: داکر، کوبرنتیز و CI/CD", cat: "infra", level: "پیشرفته", hours: 52, sessions: 30, students: 1620, rating: 4.8, price: 3100000, popular: true, instructor: "مهندس نگار رستمی", skills: ["Docker", "Kubernetes", "GitHub Actions", "مانیتورینگ"], hue: "cyan" },
  { id: "git", title: "لینوکس، ترمینال و Git از صفر", cat: "infra", level: "مقدماتی", hours: 30, sessions: 20, students: 5120, rating: 4.9, price: 0, instructor: "مهندس نگار رستمی", skills: ["Shell", "دستورات لینوکس", "Git و GitHub", "SSH"], hue: "teal" },
  { id: "vibe", title: "وایب کدینگ؛ برنامه‌نویسی هم‌نشین با هوش مصنوعی", cat: "data", level: "مقدماتی", hours: 34, sessions: 22, students: 6240, rating: 4.9, price: 0, popular: true, instructor: "مهندس کیان مرادی", skills: ["Prompt Engineering", "Cursor و Copilot", "ساخت MVP", "Agentها"], hue: "coral" },
  { id: "linux", title: "لینوکس اوبونتو؛ از نصب تا مدیریت سرور", cat: "infra", level: "مقدماتی", hours: 60, sessions: 32, students: 7410, rating: 4.9, price: 0, popular: true, instructor: "مهندس سامان کیانی", skills: ["Ubuntu Server", "Bash Scripting", "Systemd", "SSH و شبکه", "امنیت و سخت‌سازی"], hue: "amber" },
];

export interface Phase {
  id: number;
  term: string;
  title: string;
  weeks: number;
  desc: string;
  tags: string[];
  hue: Hue;
}

export const phases: Phase[] = [
  { id: 1, term: "فاز ۱", title: "پی‌ریزی: برنامه‌نویسی مقدماتی", weeks: 8, desc: "اولین خطوط کد را با پایتون می‌نویسی و با ترمینال، لینوکس و Git آشنا می‌شوی؛ ابزارهایی که هر روزِ یک مهندس را می‌سازند.", tags: ["مبانی پایتون", "اوبونتو، لینوکس و Git", "وایب کدینگ با AI"], hue: "teal" },
  { id: 2, term: "فاز ۲", title: "شی‌گرایی و ساختمان داده‌ها", weeks: 10, desc: "تفکر شی‌گرا را با جاوا تمرین می‌کنی و ساختمان داده‌های کلیدی را پیاده‌سازی می‌کنی تا کدت ساختار پیدا کند.", tags: ["شی‌گرایی جاوا", "ساختمان داده‌ها", "پروژه کتابخانه"], hue: "amber" },
  { id: 3, term: "فاز ۳", title: "عمق علوم کامپیوتر", weeks: 12, desc: "الگوریتم‌های پیشرفته، سیستم‌عامل و شبکه؛ همان چیزی که مهندسان خودساخته را از کدنویس‌ها جدا می‌کند.", tags: ["الگوریتم پیشرفته", "سیستم‌عامل", "شبکه"], hue: "cyan" },
  { id: 4, term: "فاز ۴", title: "مهندسی نرم‌افزار کلاسیک", weeks: 8, desc: "چرخه حیات، نیازمندی‌ها و مدل‌سازی UML را یاد می‌گیری و اولین سیستم واقعی را روی کاغذ طراحی می‌کنی.", tags: ["مهندسی نرم‌افزار", "UML", "پایگاه داده"], hue: "coral" },
  { id: 5, term: "فاز ۵", title: "طراحی حرفه‌ای و کیفیت", weeks: 8, desc: "الگوهای طراحی و TDD؛ از اینجا به بعد کدی می‌نویسی که هم‌تیمی‌ها دوستش دارند و تغییرش نمی‌ترساند.", tags: ["الگوهای طراحی", "تست و TDD", "کد تمیز"], hue: "teal" },
  { id: 6, term: "فاز ۶", title: "توسعه وب فول‌استک", weeks: 12, desc: "با React و Node.js یک محصول واقعی از دیتابیس تا رابط کاربری می‌سازی و دیپلوی می‌کنی.", tags: ["React", "Node.js", "REST API"], hue: "amber" },
  { id: 7, term: "فاز ۷", title: "معماری و سیستم‌های توزیع‌شده", weeks: 10, desc: "میکروسرویس‌ها، داکر و کوبرنتیز؛ سیستم‌هایی که زیر بار میلیون‌ها کاربر خم نمی‌شوند.", tags: ["معماری نرم‌افزار", "Docker و K8s", "امنیت"], hue: "cyan" },
  { id: 8, term: "فاز ۸", title: "پروژه پایانی و ورود به بازار کار", weeks: 6, desc: "پروژه جامع تیمی، مرور کد توسط منتور، ساخت رزومه مهندسی و شبیه‌سازی مصاحبه‌های فنی.", tags: ["پروژه تیمی", "Code Review", "مصاحبه فنی"], hue: "coral" },
];

export interface Module {
  id: number;
  title: string;
  hours: number;
  lessons: string[];
}

export const syllabus: Module[] = [
  { id: 1, title: "تفکر مهندسی و چرخه حیات نرم‌افزار", hours: 6, lessons: ["نرم‌افزار چیست و چرا «مهندسی»؟", "چرخه‌های حیات: از آبشاری تا چابک", "نقش‌های تیم نرم‌افزاری", "اقتصاد نرم‌افزار و برآورد هزینه"] },
  { id: 2, title: "مهندسی نیازمندی‌ها", hours: 8, lessons: ["استخراج نیازمندی‌ها و مصاحبه با ذی‌نفع", "نوشتن User Story و سناریو", "تحلیل ریسک و امکان‌سنجی", "مدیریت تغییر نیازمندی‌ها"] },
  { id: 3, title: "مدل‌سازی با UML", hours: 8, lessons: ["کلاس‌دیاگرام و روابط چهارگانه", "نمودار Sequence و Activity", "نمودار حالت و اجزا", "از مدل تا اسکلت کد"] },
  { id: 4, title: "معماری نرم‌افزار", hours: 10, lessons: ["لایه‌بندی و Clean Architecture", "معماری رویدادمحور و Message Queue", "میکروسرویس در برابر مونولیت", "ویژگی‌های کیفی: مقیاس‌پذیری و دسترس‌پذیری", "مستندسازی تصمیمات معماری (ADR)"] },
  { id: 5, title: "الگوهای طراحی و کد تمیز", hours: 9, lessons: ["اصول SOLID در عمق", "الگوهای ساختاری: از Adapter تا Decorator", "الگوهای رفتاری: Strategy و Observer", "Refactor بدون ترس با تست"] },
  { id: 6, title: "توسعه چابک و اسکرام", hours: 6, lessons: ["اسپرینت و مراسم اسکرام", "بورد کانبان و جریان کار", "برآورد با Story Point", "ابزارها: از Jira تا Linear"] },
  { id: 7, title: "تست، کیفیت و DevOps", hours: 9, lessons: ["هرم تست و انواع تست", "TDD عملی با مثال واقعی", "CI/CD با GitHub Actions", "داکر برای توسعه‌دهنده‌ها"] },
  { id: 8, title: "نگهداری، تکامل و پروژه پایانی", hours: 6, lessons: ["بدهی فنی و مدیریت آن", "مانیتورینگ و Observability", "طراحی و پیاده‌سازی پروژه پایانی", "دفاع از پروژه و دریافت گواهی"] },
];

export interface Mentor {
  name: string;
  role: string;
  tags: string[];
  coursesCount: number;
  students: number;
  rating: number;
  initials: string;
  hue: Hue;
}

export const mentors: Mentor[] = [
  { name: "دکتر آرش کمالی", role: "دکترای مهندسی نرم‌افزار · ۱۲ سال تجربه معماری سیستم", tags: ["معماری نرم‌افزار", "UML", "سیستم‌های توزیع‌شده"], coursesCount: 5, students: 6400, rating: 4.9, initials: "آک", hue: "amber" },
  { name: "مهندس سارا محمدی", role: "مهندس ارشد بک‌اند · مدرس Clean Code", tags: ["جاوا", "Node.js", "کد تمیز"], coursesCount: 4, students: 4850, rating: 4.8, initials: "سم", hue: "teal" },
  { name: "دکتر بردیا افشار", role: "مدرس المپیاد کامپیوتر · متخصص الگوریتم", tags: ["الگوریتم", "گراف", "برنامه‌نویسی رقابتی"], coursesCount: 3, students: 3720, rating: 5.0, initials: "با", hue: "cyan" },
  { name: "مهندس نگار رستمی", role: "مهندس فرانت‌اند و DevOps · منتور پروژه‌های تیمی", tags: ["React", "Docker", "CI/CD"], coursesCount: 5, students: 5230, rating: 4.9, initials: "نر", hue: "coral" },
  { name: "مهندس سامان کیانی", role: "مدیر سیستم ارشد · ۱۰ سال مدیریت سرورهای لینوکسی در مقیاس تولید", tags: ["Ubuntu", "Systemd", "Bash", "امنیت"], coursesCount: 3, students: 7410, rating: 4.9, initials: "سا", hue: "amber" },
  { name: "مهندس کیان مرادی", role: "متخصص توسعه با هوش مصنوعی · سازنده ۱۲ محصول Vibe-first", tags: ["Vibe Coding", "LLM و Agent", "Prompt Design"], coursesCount: 2, students: 6240, rating: 4.9, initials: "کم", hue: "coral" },
];

export interface Testimonial {
  text: string;
  name: string;
  role: string;
  stars: number;
}

export const testimonials: Testimonial[] = [
  { text: "بعد از دوره معماری نرم‌افزار، در مصاحبه فنی یک فین‌تک قبول شدم. سوالاتی که پرسیدند دقیقاً همان چیزهایی بود که دکتر کمالی در دوره باز کرده بود.", name: "امیرحسین رضایی", role: "مهندس بک‌اند · فین‌تک", stars: 5 },
  { text: "مسیر یادگیری ترم‌بندی‌شده باعث شد از سردرگمی بیرون بیایم. می‌دانستم هر هفته چه چیزی یاد می‌گیرم و چرا.", name: "مهسا کریمی", role: "دانشجوی کامپیوتر · دانشگاه تهران", stars: 5 },
  { text: "تمرین‌های دوره ساختمان داده واقعا چالشی بود. برای اولین بار احساس کردم مسئله‌حل‌کردن را یاد گرفته‌ام نه حفظ‌کردن.", name: "پارسا نعمتی", role: "توسعه‌دهنده نرم‌افزار", stars: 5 },
  { text: "پروژه پایانی دوره فول‌استک را داخل رزومه‌ام گذاشتم و همان پروژه در سه مصاحبه موضوع اصلی صحبت بود.", name: "الناز موسوی", role: "فرانت‌اند دولوپر", stars: 5 },
  { text: "کلاس‌های لایو کدریوی هر هفته نقطه قوت ماجراست. جایی که گیر می‌کنی، همان لحظه می‌پرسی و جلو می‌روی.", name: "کیان مرادی", role: "تغییر مسیر شغلی به برنامه‌نویسی", stars: 4 },
  { text: "به‌عنوان یک مهندس با ۵ سال سابقه، دوره الگوهای طراحی دیدم را به کد خودم تغییر داد. حالا Refactor برایم ترسناک نیست.", name: "شیرین احمدی", role: "مهندس نرم‌افزار ارشد", stars: 5 },
];

export interface Faq { q: string; a: string }

export const faqs: Faq[] = [
  { q: "هیچ پیش‌زمینه‌ای از برنامه‌نویسی ندارم؛ از کجا شروع کنم؟", a: "از «مسیر یادگیری» شروع کن. فاز ۱ برای همین طراحی شده: مبانی پایتون + لینوکس و Git، بدون هیچ پیش‌نیازی. دوره پایتون هم کاملاً رایگان است تا بدون ریسک شروع کنی." },
  { q: "آیا بعد از پایان دوره گواهی صادر می‌شود؟", a: "بله. با گذراندن حداقل ۸۰٪ جلسات و قبولی در پروژه پایانی، گواهی دیجیتال با کد یکتا دریافت می‌کنی که قابل استعلام و افزودن به لینکدین است." },
  { q: "دسترسی من به محتوای دوره چقدر است؟", a: "دسترسی مادام‌العمر. هر آپدیتی که روی دوره منتشر شود هم بدون هزینه به کتابخانه‌ات اضافه می‌شود؛ چون مهندسی نرم‌افزار یک‌بار یاد گرفتن ندارد." },
  { q: "تمرین‌ها و پروژه‌ها چگونه بررسی می‌شوند؟", a: "تمرین‌های کدبیس با تست خودکار سنجیده می‌شوند و پروژه‌ها توسط منتورهای انسانی Code Review می‌شوند — با کامنت‌های خط‌به‌خط، دقیقاً مثل یک تیم واقعی." },
  { q: "اگر از دوره راضی نبودم چه؟", a: "تا ۷ روز بعد از خرید، بدون هیچ سوالی، کل مبلغ برگشت داده می‌شود. کیفیت آموزش برای ما شوخی نیست." },
  { q: "امکان بورسیه یا تخفیف دانشجویی هست؟", a: "هر ترم ۱۰٪ از ظرفیت دوره‌ها به بورسیه دانشجویان مستعد اختصاص دارد. دانشجویان فعال هم با معدل بالای ۹۰ در تمرین‌ها، ۲۵٪ تخفیف دوره بعدی می‌گیرند." },
];

export const liveSessions = [
  { title: "کدریوی زنده پروژه میکروسرویس دانشجویان", mentor: "دکتر آرش کمالی", day: "شنبه", time: "۲۰:۰۰", live: true },
  { title: "پرسش و پاسخ: نقشه راه ورود به بازار کار", mentor: "مهندس نگار رستمی", day: "دوشنبه", time: "۲۱:۰۰", live: false },
  { title: "کارگاه عملی الگوریتم: گراف در مصاحبه", mentor: "دکتر بردیا افشار", day: "چهارشنبه", time: "۱۹:۳۰", live: false },
];

export const techMarquee = ["پایتون", "جاوا", "TypeScript", "React", "Node.js", "Git", "Docker", "Kubernetes", "PostgreSQL", "Linux", "UML", "Clean Architecture", "CI/CD", "GraphQL", "Rust"];

export const stats = [
  { value: 17, suffix: "", label: "دوره تخصصی", sub: "در ۶ حوزه مهندسی" },
  { value: 840, suffix: "+", label: "ساعت آموزش ویدیویی", sub: "با پروژه و تمرین" },
  { value: 12400, suffix: "+", label: "دانشجوی فعال", sub: "در سراسر کشور" },
  { value: 96, suffix: "٪", label: "نرخ رضایت", sub: "بر اساس نظرسنجی ترم قبل" },
];
