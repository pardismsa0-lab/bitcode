import type { CourseContent } from "./content-types";

export const CONTENT_NEW: CourseContent[] = [
  {
    id: "n-java",
    intro:
      "جاوا هنوز زبان سیستم‌های سازمانی بزرگ است: بانک‌ها، بیمه‌ها، اندروید — و مهم‌تر از همه، بهترین کلاس برای یادگیری تفکر شی‌گرای واقعی. در این دوره فقط سینتکس یاد نمی‌گیری؛ یاد می‌گیری مثل یک مهندس، شی‌ها را طراحی کنی.",
    outcomes: [
      "تسلط بر کلاس، شی و کپسوله‌سازی",
      "درک درست وراثت، اینترفیس و چندریختی",
      "کار حرفه‌ای با Collections و Generics",
      "نوشتن کد استاندارد و آماده‌ی کار تیمی",
    ],
    lessons: [
      {
        id: "n-java-l1",
        title: "از کلاس تا شی؛ کپسوله‌سازی",
        minutes: 50,
        blocks: [
          { k: "p", t: "کلاس نقشه‌ی ساخت است و شی، ساختمان واقعی. وقتی می‌نویسی new BankAccount()، جاوا در حافظه یک نمونه مستقل می‌سازد که فیلدهای خودش را دارد. هنر طراحی شی این است که مشخص کنی هر شی چه چیزی را خودش نگه می‌دارد (فیلد) و چه کاری را بلد است (متد)." },
          { k: "code", lang: "java", title: "BankAccount.java", code: "public class BankAccount {\n    private double balance;          // فیلد خصوصی: از بیرون قابل دستکاری نیست\n    private final String owner;\n\n    public BankAccount(String owner) {   // سازنده: تضمین می‌کند شی سالم متولد شود\n        this.owner = owner;\n        this.balance = 0;\n    }\n\n    public void deposit(double amount) {\n        if (amount <= 0) throw new IllegalArgumentException(\"مبلغ نامعتبر\");\n        balance += amount;\n    }\n\n    public boolean withdraw(double amount) {\n        if (amount > balance) return false;   // قانون کسب‌وکار داخل خود شی\n        balance -= amount;\n        return true;\n    }\n\n    public double getBalance() { return balance; }   // دسترسی کنترل‌شده\n}" },
          { k: "def", term: "کپسوله‌سازی (Encapsulation)", t: "فیلدها private باشند و دسترسی فقط از طریق متدهای عمومی انجام شود. این‌طوری قانون‌های موجودی (مثلاً «برداشت بیشتر از موجودی ممنوع») در یک جا اعمال می‌شوند و هیچ کد بیرونی نمی‌تواند دورشان بزند." },
          { k: "warn", title: "فیلد public ممنوع", t: "اگر balance را public کنی، هر کس می‌تواند بنویسد acc.balance = -999999 و هیچ کنترلی نداری. اصلاحش یعنی تغییر امضای کد در کل پروژه — هزینه‌ای که با یک private ساده هرگز پیش نمی‌آمد." },
          { k: "tip", title: "قرارداد نام‌گذاری جاوا", t: "کلاس‌ها PascalCase (BankAccount)، متدها و فیلدها camelCase (getBalance)، ثابت‌ها UPPER_SNAKE (MAX_LIMIT). این قرارداد در همه تیم‌های جاوا یکسان است و کد تو را حرفه‌ای نشان می‌دهد." },
        ],
        quiz: [
          { q: "سازنده (Constructor) چه تضمینی می‌دهد؟", opts: ["سرعت بیشتر برنامه", "اینکه شی از همان لحظه تولد در وضعیت معتبر باشد", "جلوگیری از وراثت", "کاهش مصرف حافظه"], ans: 1, why: "سازنده تنها جایی است که حتماً اجرا می‌شود؛ اگر فیلدهای ضروری را آنجا مقداردهی کنی، هیچ‌وقت شی نصفه‌ونیمه وجود نخواهد داشت." },
          { q: "چرا فیلدها را private می‌کنیم؟", opts: ["جاوا مجبور کرده", "تا تغییر وضعیت فقط از مسیر متدهای کنترل‌شده و قانون‌دار بگذرد", "برای افزایش سرعت", "تا وراثت ممکن شود"], ans: 1, why: "کپسوله‌سازی یعنی «تنها راه تغییر، از درِ قانونی است»؛ هر تغییری که بعداً بخواهی (مثل ثبت لاگ هنگام برداشت) فقط در یک متد اعمال می‌شود." },
        ],
      },
      {
        id: "n-java-l2",
        title: "وراثت، اینترفیس و چندریختی",
        minutes: 60,
        blocks: [
          { k: "p", t: "چندریختی یعنی یک متغیر از نوع پایه، به نمونه‌های مختلف اشاره کند و هر کدام رفتار خودشان را اجرا کنند. جاوا در زمان اجرا تصمیم می‌گیرد کدام پیاده‌سازی صدا زده شود (Dynamic Dispatch) — همین یک مکانیزم، پایه‌ی طراحی انعطاف‌پذیر است." },
          { k: "code", lang: "java", title: "Payment.java", code: "public interface Payment {\n    boolean pay(double amount);\n}\n\npublic abstract class BasePayment implements Payment {\n    protected final String customer;\n    protected BasePayment(String customer) { this.customer = customer; }\n}\n\npublic class CardPayment extends BasePayment {\n    public CardPayment(String c) { super(c); }\n    @Override public boolean pay(double amount) {\n        System.out.println(\"Card: \" + amount);\n        return true;\n    }\n}\n\npublic class CryptoPayment extends BasePayment {\n    public CryptoPayment(String c) { super(c); }\n    @Override public boolean pay(double amount) {\n        System.out.println(\"Wallet: \" + amount);\n        return true;\n    }\n}\n\n// چندریختی در عمل: این متد هیچ چیز درباره‌ی نوع پرداخت نمی‌داند\npublic void checkout(Payment p, double total) {\n    p.pay(total);   // در اجرا، پیاده‌سازی درست صدا زده می‌شود\n}" },
          { k: "table", head: ["ویژگی", "اینترفیس", "کلاس انتزاعی"], rows: [["پیاده‌سازی دارد؟", "نه (فقط قرارداد)", "بله، تا حدی"], ["چند ارثی", "بله (چند implements)", "نه (یک extends)"], ["فیلد وضعیت", "ندارد", "می‌تواند داشته باشد"], ["کاربرد", "تعریف قابلیت", "تقسیم کد مشترک خانواده"]] },
          { k: "tip", title: "ترکیب بر وراثت", t: "وراثت فقط وقتی که واقعاً «یک نوع از» برقرار است (CardPayment یک Payment است). برای استفاده از قابلیت‌های یک کلاس دیگر، آن را به‌صورت فیلد نگه دار (Composition) — وراثتِ سلیقه‌ای، بزرگ‌ترین منبع کد شکننده در جاواست." },
        ],
        quiz: [
          { q: "وقتی p از نوع Payment به یک CryptoPayment اشاره کند، p.pay() چه می‌کند؟", opts: ["خطای compile می‌دهد", "پیاده‌سازی CryptoPayment اجرا می‌شود", "پیاده‌سازی پایه اجرا می‌شود", "هیچ‌کدام اجرا نمی‌شود"], ans: 1, why: "نوع متغیر، قراردادی است که compiler چک می‌کند؛ اما در زمان اجرا، JVM بر اساس نوع واقعی شی، متد Overrideشده را صدا می‌زند — همان چندریختی." },
          { q: "کی اینترفیس را به کلاس انتزاعی ترجیح می‌دهیم؟", opts: ["وقتی می‌خواهیم وضعیت مشترک بدهیم", "وقتی می‌خواهیم یک «قابلیت» تعریف کنیم که کلاس‌های نامرتبط هم می‌توانند داشته باشند", "وقتی فقط یک پیاده‌سازی وجود دارد", "هرگز"], ans: 1, why: "اینترفیس قرارداد خالص است؛ مثلاً Serializable یا Comparable را کلاس‌هایی پیاده می‌کنند که هیچ شباهتی به هم ندارند — وراثت چنین چیزی را نمی‌تواند." },
        ],
      },
      {
        id: "n-java-l3",
        title: "Collections و Stream؛ داده در مقیاس",
        minutes: 55,
        blocks: [
          { k: "p", t: "آرایه ثابت است؛ دنیای واقعی نه. جاوا برای هر شکل داده یک ساختار دارد: لیست برای ترتیب، Map برای کلید-مقدار، Set برای یکتایی. انتخاب ساختار درست یعنی تفاوت بین میلی‌ثانیه و دقیقه." },
          { k: "code", lang: "java", title: "Inventory.java", code: "Map<String, Integer> stock = new HashMap<>();\nstock.put(\"SSD-1TB\", 14);\nstock.put(\"RAM-32\", 6);\nstock.put(\"GPU-4070\", 0);\n\n// جست‌وجوی O(1) با کلید\nint ssd = stock.getOrDefault(\"SSD-1TB\", 0);\n\n// Stream: خواندنی مثل جمله\nList<String> outOfStock = stock.entrySet().stream()\n    .filter(e -> e.getValue() == 0)\n    .map(Map.Entry::getKey)\n    .sorted()\n    .toList();\n\nSystem.out.println(outOfStock);   // [GPU-4070]" },
          { k: "table", head: ["نیاز", "ساختار", "چرا"], rows: [["دسترسی با ایندکس", "ArrayList", "خواندن O(1)"], ["جست‌وجو با کلید", "HashMap", "خواندن/نوشتن O(1) میانگین"], ["بدون تکرار", "HashSet", "تضمین یکتایی"], ["صف پردازش", "LinkedList / ArrayDeque", "درج و حذف سر و ته ارزان"]] },
          { k: "def", term: "Generics", t: "List<String> یعنی کامپایلر قبل از اجرا جلوی اشتباه را می‌گیرد؛ هیچ Integer‌ای پنهانی وارد لیست رشته‌ها نمی‌شود و موقع خواندن نیازی به Cast نیست. Generics یعنی «باگ در کامپایل، نه در پروداکشن»." },
          { k: "warn", title: "تغییر Collection وسط حلقه", t: "حذف عنصر از لیست در حال پیمایش با for معمولی، ConcurrentModificationException می‌دهد. برای حذف فیلتری از removeIf یا stream استفاده کن." },
        ],
        quiz: [
          { q: "برای ذخیره «نام کاربر → امتیاز» کدام ساختار مناسب است؟", opts: ["ArrayList", "HashMap", "HashSet", "آرایه"], ans: 1, why: "رابطط کلید-مقدار دقیقاً کار Map است؛ جست‌وجوی امتیاز یک کاربر در HashMap میانگین O(1) است، در لیست O(n)." },
          { q: "filter در Stream چه می‌کند؟", opts: ["عناصر را مرتب می‌کند", "عناصری که شرط را ندارند حذف می‌کند و بقیه را عبور می‌دهد", "عناصر را تبدیل می‌کند", "لیست را خالی می‌کند"], ans: 1, why: "filter یک شرط (Predicate) می‌گیرد و فقط عناصر true را به مرحله بعد Stream می‌فرستد؛ تبدیل کار map و مرتب‌سازی کار sorted است." },
        ],
      },
    ],
  },
  {
    id: "n-cpp",
    intro:
      "سی‌پلاس‌پلاس سخت نیست؛ صادق است — دقیقاً نشان می‌دهد ماشین چه می‌کند. اگر حافظه، اشاره‌گر و RAII را بفهمی، در هر زبان دیگری برنامه‌نویس قوی‌تری می‌شوی. این دوره سی‌پلاس‌پلاس مدرن (C++17/20) است، نه سبک دهه نود.",
    outcomes: [
      "درک عمیق Stack/Heap و اشاره‌گرها",
      "مدیریت حافظه با RAII و Smart Pointerها",
      "استفاده مدرن از STL و الگوریتم‌ها",
      "خواندن و نوشتن کد استاندارد C++17/20",
    ],
    lessons: [
      {
        id: "n-cpp-l1",
        title: "حافظه: Stack، Heap و اشاره‌گرها",
        minutes: 60,
        blocks: [
          { k: "p", t: "هر متغیر یک آدرس دارد و اشاره‌گر، متغیری است که مقدارش آدرس است. درک اینکه چه چیزی روی Stack ساخته می‌شود (خودکار و سریع) و چه چیزی روی Heap (دستی و خطرناک)، مرز بین برنامه‌نویس معمولی و مهندس سیستم است." },
          { k: "code", lang: "cpp", title: "memory.cpp", code: "#include <iostream>\nusing namespace std;\n\nvoid byValue(int x) { x = 100; }           // کپی — بی‌اثر روی اصلی\nvoid byRef(int& x) { x = 100; }            // ارجاع — همان متغیر\nvoid byPtr(int* p) { *p = 100; }           // اشاره‌گر — با واسطه آدرس\n\nint main() {\n    int n = 5;\n    byValue(n); cout << n << endl;   // 5\n    byRef(n);   cout << n << endl;   // 100\n    n = 5;\n    byPtr(&n);  cout << n << endl;   // 100\n\n    // Heap: مسئولیتش با توست!\n    int* arr = new int[1000];\n    // ... اگر delete[] فراموش شود => نشت حافظه\n    delete[] arr;\n}" },
          { k: "def", term: "اشاره‌گر در برابر ارجاع", t: "اشارهگر می‌تواند null باشد و بعداً به چیز دیگری اشاره کند؛ ارجاع باید همان لحظه ساخت به یک متغیر واقعی وصل شود و دیگر جدا نمی‌شود. برای پارامتر خروجی، ارجاع امن‌تر و خواناتر است." },
          { k: "warn", title: "اشاره‌گر معلق (Dangling)", t: "اگر به آدرس متغیری اشاره کنی که از Stack خارج شده (مثلاً آدرس متغیر محلی یک تابع برگردانده شود)، برنامه «گاهی» درست کار می‌کند و «گاهی» کرش — بدترین نوع باگ. هیچ اشاره‌گری نباید به عمرِ کوتاه‌تر از خودش گره بخورد." },
          { k: "tip", title: "چرا Stack سریع است؟", t: "تخصیص Stack فقط جابه‌جایی یک اشاره‌گر است؛ Heap دنبال بلوک خالی می‌گردد و نیاز به مدیریت دارد. به همین دلیل متغیرهای محلی ارزان‌اند و new هزینه دارد." },
        ],
        quiz: [
          { q: "تفاوت byRef(int& x) و byValue(int x) چیست؟", opts: ["هیچ تفاوتی ندارند", "ارجاع با خود متغیر اصلی کار می‌کند؛ مقدار فقط یک کپی می‌گیرد", "مقدار سریع‌تر است", "ارجاع فقط برای آرایه‌هاست"], ans: 1, why: "در call-by-value تابع یک کپی دارد و تغییرش به اصلی نمی‌رسد؛ ارجاع نامِ دیگری برای همان متغیر اصلی است." },
          { q: "نشت حافظه (Memory Leak) یعنی چه؟", opts: ["RAM خراب شده", "بلوکی از Heap تخصیص یافته ولی هیچ اشاره‌گری به آن نمانده تا آزادش کند", "استفاده از Stack زیاد شده", "اشاره‌گر null است"], ans: 1, why: "وقتی new می‌زنی و delete را گم می‌کنی، آن بلوک تا پایان برنامه اشغال می‌ماند؛ در سرورهای بلندمدت این یعنی مرگ تدریجی." },
        ],
      },
      {
        id: "n-cpp-l2",
        title: "RAII و Smart Pointerها؛ خداحافظی با delete",
        minutes: 60,
        blocks: [
          { k: "p", t: "RAII یعنی «تملک منبع = شروع عمر یک شی». وقتی منبع را داخل یک کلاس بگذاری، دِستراکتر — که جاوا و پایتون تضمینش نمی‌کنند ولی سی‌پلاس‌پلاس همیشه صدایش می‌زند — آزادسازی را تضمین می‌کند. حتی اگر استثنا پرتاب شود." },
          { k: "code", lang: "cpp", title: "raii.cpp", code: "#include <fstream>\n#include <memory>\n#include <vector>\nusing namespace std;\n\n// RAII کلاسیک: فایل با ساخت باز، با تخریب بسته می‌شود\nvoid read_log() {\n    ifstream f(\"app.log\");      // باز شد\n    string line;\n    getline(f, line);\n    // حتی اگر اینجا استثنا پرتاب شود، f بسته می‌شود\n}\n\n// Smart Pointer: مالکیت هوشمند\nstruct Report { string title; };\n\nauto make_report() {\n    auto r = make_unique<Report>();   // مالک: unique_ptr\n    r->title = \"Q1\";\n    return r;                          // بدون کپی منتقل (Move) می‌شود\n}\n\nint main() {\n    vector<unique_ptr<Report>> reports;\n    reports.push_back(make_report());\n    // خروج از scope => همه به‌طور خودکار پاک می‌شوند. delete‌ای در کار نیست!\n}" },
          { k: "def", term: "Move Semantics", t: "به‌جای کپی‌کردن محتویات یک شی بزرگ، «مالکیت» منابعش را به شی جدید منتقل می‌کنیم (std::move). نتیجه: بازگشت آبجکت‌های بزرگ از تابع تقریباً رایگان می‌شود — چیزی که در سی‌پلاس‌پلاس قدیم درد بود." },
          { k: "warn", title: "new/delete ممنوع در کد مدرن", t: "تقریباً هرگز نباید خام new بزنی. make_unique و make_shared همه سناریوها را پوشش می‌دهند و نشت حافظه را ساختاری غیرممکن می‌کنند. new خام فقط هنگام نوشتن خودِ Smart Pointerها مجاز است." },
          { k: "tip", title: "قانون انتخاب", t: "پیش‌فرض: unique_ptr (یک مالک، صفر هزینه سربار). فقط وقتی واقعاً چند مالک لازم داری shared_ptr — و بدان که شمارنده اتمی آن هزینه دارد. circular reference با shared_ptr = نشت؛ از weak_ptr استفاده کن." },
        ],
        quiz: [
          { q: "unique_ptr چه زمانی حافظه را آزاد می‌کند؟", opts: ["وقتی delete صدا زده شود", "وقتی از scope خارج شود — خودکار", "وقتی گربج‌کالکتور برسد", "هرگز"], ans: 1, why: "unique_ptr یک شی RAII است؛ دِستراکترش در خروج از scope اجرا و منبع آزاد می‌شود. سی‌پلاس‌پلاس GC ندارد، ولی RAII از GC قابل‌پیش‌بینی‌تر است." },
          { q: "std::move چه می‌کند؟", opts: ["بایت‌ها را جابه‌جا می‌کند", "کپی عمیق می‌گیرد", "با تبدیل به rvalue اجازه می‌دهد منابع «دزدیده» شوند به‌جای کپی", "شی را حذف می‌کند"], ans: 2, why: "move خودش چیزی جابه‌جا نمی‌کند؛ فقط به کامپایلر می‌گوید «این شی دیگر لازم نیست، می‌توانی محتویاتش را ببری» — سازنده Move بقیه کار را می‌کند." },
        ],
      },
      {
        id: "n-cpp-l3",
        title: "STL و الگوریتم‌های مدرن",
        minutes: 55,
        blocks: [
          { k: "p", t: "STL سه‌گانه‌ی کانتینر + الگوریتم + ایتراتور است. به‌جای حلقه دستی برای جست‌وجو و مرتب‌سازی، الگوریتم‌های استاندارد را با Lambda ترکیب کن: کوتاه‌تر، درست‌تر، و معمولاً سریع‌تر — چون بهینه‌سازی‌شده‌اند." },
          { k: "code", lang: "cpp", title: "stl.cpp", code: "#include <algorithm>\n#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nstruct Student { string name; double gpa; };\n\nint main() {\n    vector<Student> s = {{\"ara\", 17.2}, {\"sara\", 19.1}, {\"kia\", 15.8}};\n\n    // مرتب‌سازی با Lambda — GPA نزولی\n    sort(s.begin(), s.end(), [](const Student& a, const Student& b) {\n        return a.gpa > b.gpa;\n    });\n\n    // اولین دانشجوی ممتاز\n    auto top = find_if(s.begin(), s.end(),\n        [](const Student& x) { return x.gpa >= 19; });\n\n    if (top != s.end()) cout << top->name << endl;   // sara\n\n    // Range-for مدرن\n    for (const auto& st : s) cout << st.name << \" \";\n}" },
          { k: "table", head: ["کانتینر", "دسترسی", "جست‌وجو", "کاربرد"], rows: [["vector", "ایندکس O(1)", "O(n)", "پیش‌فرض مطلق؛ کش‌دوست"], ["unordered_map", "با کلید O(1)", "O(1)", "جدول کلید-مقدار"], ["map", "با کلید O(log n)", "O(log n)", "وقتی ترتیب کلید مهم است"], ["list", "O(n)", "O(n)", "فقط درج/حذف وسط زیاد"]] },
          { k: "tip", title: "C++20 در یک نگاه", t: "Ranges نوشتن pipeline مثل sort(v) | filter | transform را ممکن کردند، Concepts خطاهای قالب را خواندنی کردند و constexpr محاسبات زمان کامپایل را گسترش داد. پروژه‌های جدید را با استاندارد 20 شروع کن." },
        ],
        quiz: [
          { q: "چرا vector تقریباً همیشه انتخاب پیش‌فرض است؟", opts: ["همه عملیاتش O(1) است", "حافظه پیوسته دارد و با کش CPU دوست است", "از list کوچک‌تر است", "تنها کانتینر STL است"], ans: 1, why: "پیوستگی حافظه یعنی prefetch و کش بهتر؛ حتی درج انتهای vector معمولاً از هر کانتینر دیگری در عمل سریع‌تر است. اول vector، بعد پروفایل، بعد تغییر." },
          { q: "Lambda در الگوریتم‌های STL چه نقشی دارد؟", opts: ["جایگزین کلاس‌هاست", "رفتار دلخواه (مقایسه، فیلتر) را بدون نوشتن تابع جدا تزریق می‌کند", "حافظه آزاد می‌کند", "خطا می‌گیرد"], ans: 1, why: "الگوریتم‌ها اسکلت عمومی‌اند (sort، find_if)؛ Lambda بخش «چطور مقایسه/فیلتر کن» را در همان جا و خوانا مشخص می‌کند." },
        ],
      },
    ],
  },
  {
    id: "n-os",
    intro:
      "سیستم‌عامل بزرگ‌ترین دروغی است که خوب کار می‌کند: به هر برنامه القا می‌کند که کل CPU و همه‌ی حافظه مال اوست. در این دوره زیر کاپوت Processها، Threadها، Lockها و حافظه مجازی را می‌بینی — همان چیزهایی که در مصاحبه‌های فنی و دیباگ پروداکشن واقعی به دردت می‌خورند.",
    outcomes: [
      "تمایز دقیق Process و Thread",
      "تحلیل زمان‌بندی و مسائل همزمانی",
      "شناسایی Race Condition و راه‌حل‌های آن",
      "درک حافظه مجازی، Paging و Swap",
    ],
    lessons: [
      {
        id: "n-os-l1",
        title: "Process و Thread؛ توهم چندکاره‌گی",
        minutes: 50,
        blocks: [
          { k: "p", t: "برنامه فایل مرده‌ی روی دیسک است؛ Process همان برنامه در حال اجرا با حافظه اختصاصی خودش. سیستم‌عامل با Context Switch آن‌قدر سریع بین Processها جابه‌جا می‌شود که به چشم می‌آید همزمان‌اند — روی یک هسته، فقط یک نفر در هر لحظه اجراست." },
          { k: "code", lang: "bash", title: "terminal", code: "# چه چیزی در حال اجراست؟\n$ ps aux | head\nUSER   PID  %CPU %MEM  COMMAND\nroot     1   0.0  0.1  /sbin/init\nsara  2143  12.4  3.2  /usr/bin/python3 server.py\n\n# هر Process چند Thread دارد؟\n$ ps -o nlwp -p 2143\nNLWP\n   8\n\n# پایتون: دو Thread یک Process — حافظه مشترک\nimport threading\n\ndef worker(name):\n    print(f\"salam az {name}\")\n\nt1 = threading.Thread(target=worker, args=(\"t1\",))\nt2 = threading.Thread(target=worker, args=(\"t2\",))\nt1.start(); t2.start()\nt1.join();  t2.join()" },
          { k: "table", head: ["ویژگی", "Process", "Thread"], rows: [["حافظه", "کاملاً جدا", "مشترک (Heap) — Stack جدا"], ["هزینه ساخت", "سنگین (کپی جدول‌ها)", "سبک"], ["ارتباط", "IPC (pipe, socket)", "مستقیم از حافظه مشترک"], ["خرابی", "به بقیه آسیب نمی‌زند", "یک Thread می‌تواند همه را بکُشد"]] },
          { k: "def", term: "Context Switch", t: "ذخیره وضعیت (رجیسترها، جدول صفحه) پردازش فعلی و بارگذاری وضعیت بعدی. هر سوئیچ چند میکروثانیه هزینه دارد؛ برای همین Processهای زیادِ فعال، کل سیستم را کند می‌کنند حتی اگر CPU بیکار به نظر برسد." },
        ],
        quiz: [
          { q: "دو Thread داخل یک Process چه چیزی را به اشتراک دارند؟", opts: ["هیچ‌چیز", "فایل‌های باز، Heap و متغیرهای سراسری — ولی Stack جدا دارند", "فقط Stack", "فقط رجیسترها"], ans: 1, why: "قدرت Threadها در اشتراک حافظه است (ارتباط ارزان) و خطرشان هم در همان است (Race Condition). Stack و رجیسترها برای هر Thread مستقل‌اند." },
          { q: "فرمان fork در یونیکس چه می‌کند؟", opts: ["یک Thread جدید می‌سازد", "یک کپی از Process جاری می‌سازد؛ پدر و فرزند از همان خط ادامه می‌دهند", "برنامه را می‌بندد", "حافظه را آزاد می‌کند"], ans: 1, why: "fork یک Process فرزند تقریباً همسان می‌سازد؛ تفاوت فقط در مقدار بازگشتی است (۰ برای فرزند، PID فرزند برای پدر). shellها این‌طوری فرمان‌ها را اجرا می‌کنند." },
        ],
      },
      {
        id: "n-os-l2",
        title: "همزمانی: از Race Condition تا Deadlock",
        minutes: 60,
        blocks: [
          { k: "p", t: "وقتی دو Thread همزمان به یک داده مشترک می‌رسند و حداقل یکی می‌نویسد، نتیجه به زمان‌بندی وابسته می‌شود — این یعنی Race Condition. افزایش یک شمارنده حتی «یکی زیاد کن» نیست؛ سه عمل است: بخوان، جمع کن، بنویس — و وسطش می‌تواند پرش رخ بدهد." },
          { k: "code", lang: "py", title: "race_vs_lock.py", code: "import threading\n\ncounter = 0\n\ndef buggy_inc():\n    global counter\n    for _ in range(100_000):\n        counter += 1        # خواندن + جمع + نوشتن => Race!\n\ncounter = 0\nthreads = [threading.Thread(target=buggy_inc) for _ in range(4)]\n[t.start() for t in threads]\n[t.join() for t in threads]\nprint(counter)              # تقریباً هیچ‌وقت 400000 نیست!\n\n# راه‌حل: Lock — فقط یک نفر در بحران\nlock = threading.Lock()\ncounter = 0\n\ndef safe_inc():\n    global counter\n    for _ in range(100_000):\n        with lock:          # ناحیه بحرانی کوچک\n            counter += 1\n\nthreads = [threading.Thread(target=safe_inc) for _ in range(4)]\n[t.start() for t in threads]\n[t.join() for t in threads]\nprint(counter)              # همیشه 400000" },
          { k: "def", term: "Deadlock", t: "وقتی هر Thread منتظر منبعی است که Thread دیگر گرفته و هیچ‌کس کوتاه نمی‌آید: چهار شرط لازم است (انحصار متقابل، نگه‌داشتن و انتظار، عدم پیش‌گیری، انتظار دوطرفه). راه‌حل کلاسیک: همه Threadها Lockها را به یک ترتیب ثابت بگیرند." },
          { k: "warn", title: "GIL نجاتت نمی‌دهد", t: "در پایتون GIL فقط اجرای همزمان بایت‌کد را محدود می‌کند؛ Race Conditionها سر جای خودشان‌اند چون پرش بین دستورها مجاز است. هیچ زبانی تو را از فکرکردن درباره همزمانی معاف نمی‌کند." },
          { k: "tip", title: "بهترین Lock، Lock حذف‌شده است", t: "اول بپرس آیا اصلاً اشتراک لازم است؟ داده‌های تغییرناپذیر (Immutable) بین Threadها بفرست یا هر Thread نتیجه‌اش را برگرداند و یکی جمع بزند — Message Passing به‌جای حافظه مشترک، کل کلاس باگ را حذف می‌کند." },
        ],
        quiz: [
          { q: "Race Condition دقیقاً چه زمانی رخ می‌دهد؟", opts: ["وقتی CPU داغ کند", "دسترسی همزمان چند اجرا به داده مشترک که حداقل یکی می‌نویسد و ترتیب اثرگذار است", "فقط در دیتابیس", "وقتی حافظه پر شود"], ans: 1, why: "سه عنصر لازم‌اند: اشتراک، هم‌زمانی و نوشتن. اگر همه فقط بخوانند، هیچ Race‌ای نیست — برای همین Immutability این‌قدر قوی است." },
          { q: "کدام روش Deadlock را عملاً غیرممکن می‌کند؟", opts: ["افزایش تعداد Threadها", "گرفتن همه Lockها به یک ترتیب سراسری ثابت", "استفاده از Lock بزرگ‌تر", "ری‌استارت برنامه"], ans: 1, why: "ترتیب ثابت، شرط «انتظار دوطرفه دایره‌ای» را می‌شکند: اگر همه اول A را بگیرند بعد B، هیچ دایره‌ای شکل نمی‌گیرد." },
        ],
      },
      {
        id: "n-os-l3",
        title: "حافظه مجازی: دروغ زیبای Paging",
        minutes: 55,
        blocks: [
          { k: "p", t: "هر Process فکر می‌کند یک حافظه پیوسته و خصوصی از آدرس ۰ دارد — ولی واقعیت تکه‌تکه‌های ۴KB (Page) است که جدول صفحه آن‌ها را به آدرس فیزیکی ترجمه می‌کند. نتیجه: ایزولاسیون کامل Processها + امکان اجرای برنامه‌های بزرگ‌تر از RAM با Swap." },
          { k: "code", lang: "bash", title: "terminal", code: "# وضعیت واقعی حافظه\n$ free -h\n               total    used    free   available\nMem:            15Gi   9.2Gi   1.1Gi      5.4Gi\nSwap:          4.0Gi   512Mi   3.5Gi\n\n# چه چیزی Swap شده؟ (ستون VmSwap)\n$ grep VmSwap /proc/2143/status\nVmSwap:     48236 kB\n\n# Page Faultها را زنده ببین\n$ vmstat 1\nprocs  memory             swap   io   system   cpu\n r  b  swpd   free      si   so    bi    bo   in   cs\n 1  0 512000 1123456    0    0    14    28  310  540" },
          { k: "table", head: ["مفهوم", "معنی", "اثر عملی"], rows: [["Page Fault", "صفحه در RAM نبود؛ از دیسک خوانده شد", "هر بار چند میکروثانیه جریمه"], ["TLB", "کشِ ترجمه آدرس مجازی→فیزیکی", "بدون آن هر دسترسی حافظه دو برابر هزینه داشت"], ["Swap", "صفحات کم‌مصرف روی دیسک", "نجات از OOM، ولی هزار برابر کندتر از RAM"]] },
          { k: "def", term: "Thrashing", t: "وقتی RAM واقعاً پر است و سیستم وقتش را به جای کار، به جابه‌جایی صفحات بین RAM و دیسک می‌گذرد: دیسک ۱۰۰٪، برنامه‌ها قفل. درمان: RAM بیشتر، Processهای کمتر، یا swapiness کمتر — نه صبر!" },
          { k: "tip", title: "چرا malloc سریع است ولی RAM مصرفی واقعی نیست؟", t: "malloc فقط آدرس مجازی رزرو می‌کند؛ صفحات فیزیکی اولین لمس (Page Fault) تخصیص می‌یابند — Lazy Allocation. برای همین است که RSS با VSZ فرق دارد و malloc یک گیگ، فوراً یک گیگ RAM نمی‌خورد." },
        ],
        quiz: [
          { q: "Page Fault یعنی چه؟", opts: ["RAM خراب شده", "CPU به صفحه‌ای رسید که در RAM نیست و باید از دیسک آورده شود", "برنامه کرش کرده", "TLB پر شده"], ans: 1, why: "Page Fault خطا نیست؛ مکانیزم عادی حافظه مجازی است. فقط وقتی تعدادش زیاد شود (Thrashing) نشانه کمبود RAM است." },
          { q: "چرا Swap سیستم را کند می‌کند؟", opts: ["چون RAM را خالی می‌کند", "چون دسترسی به دیسک هزاران برابر کندتر از RAM است و CPU معطل می‌ماند", "چون CPU را اشغال می‌کند", "کند نمی‌کند"], ans: 1, why: "SSD خوب حدود ۱۰۰ میکروثانیه تأخیر دارد در برابر ۱۰۰ نانوثانیه RAM — سه مرتبه بزرگی. Swap برای نجات از کرش است، نه برای سرعت." },
        ],
      },
    ],
  },
  {
    id: "n-dp",
    intro:
      "الگوهای طراحی قانون نیستند؛ واژگان مشترک و آزمون‌پسند مهندسان‌اند. وقتی می‌گویی «اینجا Observer بزن»، همه تیم فوراً شکل راه‌حل را می‌فهمند. در این دوره پرکاربردترین الگوها را با مثال واقعی یاد می‌گیری — و مهم‌تر از آن، یاد می‌گیری کجا از الگوها دوری کنی.",
    outcomes: [
      "شناخت سه دسته اصلی الگوها و جایگاه هرکدام",
      "پیاده‌سازی Factory، Singleton، Observer، Strategy و Decorator",
      "انتخاب الگوی درست برای مسئله واقعی",
      "پرهیز از Over-Engineering و الگوزدگی",
    ],
    lessons: [
      {
        id: "n-dp-l1",
        title: "الگوهای ساختاری: تولد اشیا",
        minutes: 50,
        blocks: [
          { k: "p", t: "مسئله: ساخت مستقیم شی با new، کد را به جزئیات وابسته می‌کند. اگر نوع کانال اطلاع‌رسانی از روی Config انتخاب شود و فردا کانال جدیدی اضافه شود، بدون الگو باید ده‌جا if/else را دست بزنیم. Factory یعنی «ساخت را بسپار به کسی که می‌داند»." },
          { k: "code", lang: "py", title: "factory.py", code: "class Channel:\n    def send(self, msg: str): ...\n\nclass EmailChannel(Channel):\n    def send(self, msg): print(f\"[email] {msg}\")\n\nclass SmsChannel(Channel):\n    def send(self, msg): print(f\"[sms] {msg}\")\n\n# Factory: تنها جایی که if/else زندگی می‌کند\ndef create_channel(kind: str) -> Channel:\n    if kind == \"email\": return EmailChannel()\n    if kind == \"sms\":   return SmsChannel()\n    raise ValueError(f\"unknown channel: {kind}\")\n\n# بقیه‌ی سیستم فقط Channel می‌شناسد — کانال جدید یعنی یک خط به Factory\ndef notify(user, text):\n    ch = create_channel(user.preferred)\n    ch.send(text)" },
          { k: "code", lang: "py", title: "singleton.py", code: "class Config:\n    _instance = None\n\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n            cls._instance.values = {}\n        return cls._instance\n\na, b = Config(), Config()\nprint(a is b)   # True — یک نمونه برای همه\n\n# ولی در تست:\ncfg = Config()          # چه مقادیری دارد؟ از کجا آمده؟\n# Singleton یعنی وابستگی پنهان — Mock کردنش کابوس است" },
          { k: "warn", title: "Singleton = حالت سراسری در لباس موجه", t: "Singleton تست‌پذیری را می‌کشد (نمی‌توانی نمونه جایگزین بدهی)، ترتیب ساخت را مخفی می‌کند و در همزمانی قفل می‌خواهد. اغلب «تزریق یک نمونه مشترک» (Dependency Injection) همان کار را بدون معایبش انجام می‌دهد." },
          { k: "def", term: "دسته Creational", t: "الگوهایی که «چگونه ساخته شود» را کنترل می‌کنند: Factory Method (ساخت شرطی)، Abstract Factory (خانواده‌های سازگار)، Builder (ساخت مرحله‌ای شی پیچیده)، Singleton (تک‌نمونه) و Prototype (ساخت با کپی)." },
        ],
        quiz: [
          { q: "Factory Method چه چیزی را از بقیه کد حذف می‌کند؟", opts: ["نیاز به کلاس‌ها", "وابستگی بقیه سیستم به نوع دقیق شی — if/else ساخت فقط یک‌جا می‌ماند", "نیاز به تست", "همه حلقه‌ها"], ans: 1, why: "بقیه سیستم فقط با قرارداد (Channel) کار می‌کنند؛ افزودن TelegramChannel یعنی یک خط در Factory و صفر تغییر در مصرف‌کننده‌ها — Open/Closed." },
          { q: "چرا Singleton در تست مشکل‌ساز است؟", opts: ["کند است", "نمونه سراسری بین تست‌ها نشت می‌کند و نمی‌توان جایگزین کنترل‌شده تزریق کرد", "فقط در جاوا کار می‌کند", "مشکلی ندارد"], ans: 1, why: "تست خوب ایزوله است؛ Singleton به‌ذات سراسری است. ترتیب اجرای تست‌ها نتیجه را عوض می‌کند — کلاسیک‌ترین منبع Flaky Test." },
        ],
      },
      {
        id: "n-dp-l2",
        title: "الگوهای رفتاری: تقسیم کار اشیا",
        minutes: 60,
        blocks: [
          { k: "p", t: "الگوهای رفتاری درباره «چگونه اشیا با هم حرف می‌زنند» هستند. Observer جایگزین Polling است: به‌جای اینکه مدام بپرسی «خبری شد؟»، می‌گویی «خبر شد بگو». Strategy جایگزین if/elseهای بلند انتخاب رفتار است: هر رفتار یک شی می‌شود و در زمان اجرا تعویض می‌شود." },
          { k: "code", lang: "py", title: "observer_strategy.py", code: "# Observer: ناشر خبر می‌دهد، مشترک‌ها واکنش می‌دهند\nclass EventBus:\n    def __init__(self):\n        self.subs = {}\n\n    def on(self, event, fn):\n        self.subs.setdefault(event, []).append(fn)\n\n    def emit(self, event, data):\n        for fn in self.subs.get(event, []):\n            fn(data)\n\nbus = EventBus()\nbus.on(\"order.created\", lambda o: print(f\"anbar: amade-sazi {o}\"))\nbus.on(\"order.created\", lambda o: print(f\"sms: {o} sabt shod\"))\nbus.emit(\"order.created\", \"#1042\")   # هر دو بدون شناختن هم اجرا می‌شوند\n\n# Strategy: الگوریتم تخفیف، یک شی قابل‌تعویض\nclass PercentOff:\n    def __init__(self, p): self.p = p\n    def apply(self, price): return price * (1 - self.p)\n\nclass FlatOff:\n    def __init__(self, amount): self.amount = amount\n    def apply(self, price): return max(0, price - self.amount)\n\ndef checkout(price, strategy):\n    return strategy.apply(price)\n\nprint(checkout(1000, PercentOff(0.2)))   # 800\nprint(checkout(1000, FlatOff(150)))      # 850" },
          { k: "table", head: ["مسئله", "الگو", "ایده کلیدی"], rows: [["انتشار خبر بدون شناختن گیرنده‌ها", "Observer", "ناشر فقط می‌گوید «اتفاق افتاد»"], ["انتخاب رفتار در زمان اجرا", "Strategy", "هر الگوریتم یک شی"], ["ترتیب ثابت مراحل با جزئیات متغیر", "Template Method", "اسکلت در پایه، جزئیات در فرزند"], ["پیمایش بدون افشای ساختار", "Iterator", "next() بدون دانستن آرایه/درخت"]] },
          { k: "tip", title: "Strategy در برابر State", t: "ساختار هر دو یکسان است؛ تفاوت در نیت: در Strategy مشتری الگوریتم را انتخاب می‌کند (تخفیف درصدی یا ثابت)؛ در State خود شی وقتی وضعیتش عوض می‌شود رفتارش عوض می‌شود (سفارش: پرداخت‌نشده → ارسال‌شده)." },
        ],
        quiz: [
          { q: "Observer چه جایگزینی برای Polling است؟", opts: ["درخواست مکرر برای بررسی تغییر", "فراخوانی خودکار مشترک‌ها در لحظه وقوع رویداد", "ذخیره در دیتابیس", "صف پیام"], ans: 1, why: "Polling یعنی پرسیدنِ تکراری حتی وقتی خبری نیست (اتلاف)؛ Observer یعنی واکنش دقیقاً وقتی اتفاق می‌افتد — و ناشر نیازی ندارد مشترک‌ها را بشناسد." },
          { q: "Strategy چه بویی از کد را از بین می‌برد؟", opts: ["حلقه‌های تو در تو", "if/else یا switchهای بلند انتخاب رفتار که با هر گزینه جدید بلندتر می‌شوند", "متغیرهای سراسری", "کامنت‌ها"], ans: 1, why: "هر گزینه جدید در if/else یعنی دست‌زدن به تابع مشترک (خطر شکستن بقیه)؛ با Strategy یک کلاس جدید اضافه می‌شود و کد قدیمی دست نمی‌خورد." },
        ],
      },
      {
        id: "n-dp-l3",
        title: "الگوهای ساختاری و الگوها در دنیای واقعی",
        minutes: 55,
        blocks: [
          { k: "p", t: "الگوهای ساختاری نحوه ترکیب اشیا را شکل می‌دهند: Decorator بدون وراثت قابلیت اضافه می‌کند (لاگینگ دور یک تابع)، Adapter رابط ناسازگار را ترجمه می‌کند (مثل کتابخانه‌هایی که در فرانت‌اند Axios را به Fetch وصل می‌کنند). و خبر خوب: تو همین حالا هم داری از الگوها استفاده می‌کنی — MVC، Repository و Dependency Injection همه الگوهای اعمال‌شده‌اند." },
          { k: "code", lang: "py", title: "decorator_adapter.py", code: "import time, functools\n\n# Decorator: رفتار دور تابع، بدون دست‌زدن به آن\ndef timed(fn):\n    @functools.wraps(fn)\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = fn(*args, **kwargs)\n        print(f\"{fn.__name__}: {time.perf_counter() - start:.3f}s\")\n        return result\n    return wrapper\n\n@timed\ndef heavy_report(rows):\n    return sum(rows)\n\nheavy_report(range(1_000_000))   # heavy_report: 0.021s\n\n# Adapter: پرداخت‌یار قدیمی با امضای متفاوت\nclass LegacyGateway:\n    def do_pay(self, card_number, amount_in_rials): ...\n\nclass GatewayAdapter:\n    def __init__(self, legacy): self.legacy = legacy\n    def pay(self, card, amount_tomans):      # امضای مدرن تیم\n        self.legacy.do_pay(card, amount_tomans * 10)\n\n# کل سیستم با .pay() مدرن کار می‌کند؛ فقط این کلاس Legacy را می‌شناسد" },
          { k: "table", head: ["اگر می‌شنوی…", "احتمالاً الگو"], rows: [["«این سرویس را Mock کن»", "پشت هر Mock یک Adapter یا Proxy نهفته"], ["«Middleware بنویس»", "Decorator/Chain of Responsibility"], ["«Hook اضافه کن»", "Observer"], ["«Connection Pool»", "Object Pool + Proxy"], ["«ORM»", "Data Mapper / Active Record"]] },
          { k: "warn", title: "الگوزدگی (Over-Engineering)", t: "الگو راه‌حل برای درد است، نه تزئین کد. «Factory برای کلاسی که یک‌جا و همیشه یک نوع ساخته می‌شود» یا «Strategy برای دو حالت ثابت» فقط پیچیدگی اضافه می‌کند. اول کد ساده مستقیم؛ وقتی درد واقعی ظاهر شد، الگو." },
        ],
        quiz: [
          { q: "Decorator چه برتری‌ای نسبت به وراثت دارد؟", opts: ["سریع‌تر است", "ترکیب رفتارها در زمان اجرا بدون انفجار کلاس‌های فرزند — لاگ‌دار + کش‌دار + … قابل ترکیب‌اند", "ساده‌تر است", "تست نمی‌خواهد"], ans: 1, why: "وراثت ترکیب‌نشدنی است: LoggingCachingRetryHttpClient کی تمام می‌شود؟ Decoratorها لایه‌لایه روی هم سوار می‌شوند و هرکدام یک مسئولیت دارند." },
          { q: "Adapter چه زمانی لازم می‌شود؟", opts: ["وقتی کد کند است", "وقتی با رابطی کار داریم که امضایش با چیزی که سیستم انتظار دارد ناسازگار است", "وقتی حافظه کم است", "هرگز در وب"], ans: 1, why: "سرویس‌های خارجی، کتابخانه‌های قدیمی، APIهای نسخه‌های مختلف — هر جای «دنیای واقعی با قرارداد ما فرق دارد» جای Adapter است؛ تغییرات را در یک کلاس کوچک حبس می‌کند." },
        ],
      },
    ],
  },
  {
    id: "n-net",
    intro:
      "وقتی آدرسی را تایپ می‌کنی، ده‌ها لایه با هم کار می‌کنند تا بایت‌ها از یک سر دنیا برگردند. در این دوره مسیر یک درخواست را از کیبورد تا سرور دنبال می‌کنی: لایه‌ها، DNS، HTTP و TLS — و در آخر آن‌قدر امنیت شبکه که بفهمی روی خط چه اتفاقی می‌افتد.",
    outcomes: [
      "درک مدل TCP/IP و نقش هر لایه",
      "دنبال‌کردن رزولوشن DNS و چرخه یک درخواست HTTP",
      "تفسیر Status Codeها و Headerها",
      "شناخت حملات رایج شبکه و دفاع‌های پایه",
    ],
    lessons: [
      {
        id: "n-net-l1",
        title: "سفر یک بسته؛ لایه‌ها و پروتکل‌ها",
        minutes: 55,
        blocks: [
          { k: "p", t: "اینترنت شاهکار «تقسیم کار» است: هر لایه فقط کار خودش را می‌کند و بقیه را نمی‌شناسد. وقتی پیامی می‌فرستی، در هر لایه یک سربرگ به آن اضافه می‌شود (Encapsulation) و در مقصد لایه‌به‌لایه باز می‌شود. اگر لایه‌ها را بفهمی، هر خطای شبکه را می‌توانی به یک لایه خاص نسبت بدهی — نیمی از راه دیباگ." },
          { k: "code", lang: "bash", title: "terminal", code: "# آیا مقصد زنده است؟ (لایه شبکه)\n$ ping -c 3 bitcode.academy\n64 bytes from 185.143.233.12: icmp_seq=1 ttl=52 time=18.4 ms\n\n# مسیر بسته کجاها می‌رود؟\n$ traceroute bitcode.academy\n 1  192.168.1.1        0.9 ms    # مودم خانه\n 2  10.20.0.1          4.1 ms    # ISP محلی\n 3  185.143.232.1     17.8 ms    # هسته ISP\n 4  185.143.233.12    18.4 ms    # مقصد!\n\n# چه پورت‌هایی گوش می‌دهند؟\n$ ss -tulpn\ntcp  LISTEN  0  128  0.0.0.0:22    # SSH\ntcp  LISTEN  0  511  0.0.0.0:80    # HTTP\ntcp  LISTEN  0  511  0.0.0.0:443   # HTTPS" },
          { k: "table", head: ["لایه", "پروتکل‌ها", "وظیفه", "واحد داده"], rows: [["کاربرد", "HTTP, DNS, SMTP", "معنی پیام برای برنامه", "Message"], ["انتقال", "TCP, UDP", "رسیدن کامل و به‌ترتیب (TCP) یا سریع (UDP)", "Segment"], ["شبکه", "IP, ICMP", "مسیریابی بین شبکه‌ها", "Packet"], ["پیوند", "Ethernet, WiFi", "انتقال روی سیم/موج", "Frame"]] },
          { k: "def", term: "TCP در برابر UDP", t: "TCP مثل نامه سفارشی است: اتصال می‌سازد (Handshake سه‌مرحله‌ای)، تحویل و ترتیب را تضمین و گمشده را دوباره می‌فرستد. UDP مثل پخش رادیویی: سریع، بدون تضمین — برای ویدیو زنده و بازی که تأخیر از گمشدگی بدتر است." },
        ],
        quiz: [
          { q: "چرا استریم ویدیو معمولاً UDP را ترجیح می‌دهد؟", opts: ["امن‌تر است", "تأخیر از یک فریم گمشده بدتر است؛ بازفرستادن TCP لحظه را از دست می‌دهد", "رایگان است", "رمزنگاری دارد"], ans: 1, why: "در پخش زنده، فریمی که دیر برسد بی‌ارزش است؛ UDP بدون سربار تأیید و بازفرستانی، سریع‌ترین مسیر را می‌رود و گمشدگی را لایه‌های بالاتر جبران می‌کنند." },
          { q: "وقتی ping جواب نمی‌دهد ولی سایت باز می‌شود، چه اتفاقی افتاده؟", opts: ["اینترنت قطع است", "احتمالاً سرور یا فایروال بسته‌های ICMP را مسدود کرده؛ HTTP روی TCP جداگانه کار می‌کند", "DNS خراب است", "غیرممکن است"], ans: 1, why: "هر پروتکل مسیر خودش را دارد؛ خیلی از سرورها برای کاهش سطح حمله ICMP را می‌بندند. نتیجه: ping تنها معیار «زنده بودن» نیست." },
        ],
      },
      {
        id: "n-net-l2",
        title: "DNS و HTTP؛ زبان وب",
        minutes: 60,
        blocks: [
          { k: "p", t: "مرورگر فقط IP می‌فهمد، انسان فقط نام. DNS دفترچه تلفن توزیع‌شده‌ی اینترنت است: رزولوشن از کش مرورگر شروع و تا روت‌سرورها می‌رود. بعد از پیدا شدن IP، گفت‌وگوی واقعی با HTTP شروع می‌شود — پروتکلی متنی و ساده که با همان سادگی، کل وب را حمل می‌کند." },
          { k: "code", lang: "txt", title: "request-response", code: "# درخواست خام مرورگر\nGET /courses/react HTTP/1.1\nHost: bitcode.academy\nAccept: text/html\nCookie: session=abc123\n\n# پاسخ سرور\nHTTP/1.1 200 OK\nContent-Type: text/html; charset=utf-8\nCache-Control: max-age=300\nSet-Cookie: session=abc123; HttpOnly; Secure\n\n<!doctype html>..." },
          { k: "table", head: ["کد", "معنی", "در عمل"], rows: [["200", "موفق", "همه‌چیز درست"], ["301 / 302", "منتقل شده (دائم / موقت)", "مرورگر خودکار دنبال می‌کند"], ["401", "هویت نامشخص", "لاگین نکرده‌ای"], ["403", "هویت معلوم، اجازه نداری", "لاگین کرده‌ای ولی دسترسی نه"], ["404", "منبع وجود ندارد", "URL اشتباه یا حذف‌شده"], ["500 / 503", "خطای سرور / سرویس موقتاً پایین", "مشکل از سمت ماست"]] },
          { k: "def", term: "HTTPS و TLS", t: "HTTP متن ساده است؛ در کافه‌ی دارای WiFi مشترک هر کسی می‌تواند آن را بخواند. HTTPS همان HTTP داخل یک تونل رمزنگاری TLS است: Handshake با گواهی هویت سرور را ثابت و کلید نشست را می‌سازد؛ از آن پس حتی اگر بسته‌ها شنود شوند، خواندنی نیستند." },
          { k: "tip", title: "هدرهایی که مصاحبه‌گر می‌پرسد", t: "Cache-Control (کش‌پذیری)، Set-Cookie با HttpOnly و Secure (دسترسی جاوااسکریپت ممنوع + فقط HTTPS)، Content-Type (جلوگیری از حدس‌زدن مرورگر) و CORS-Headerها — این چهار تا را عمیق بفهم." },
        ],
        quiz: [
          { q: "تفاوت 401 و 403 چیست؟", opts: ["فرقی ندارند", "در 401 معلوم نیست کی هستی؛ در 403 معلومی ولی اجازه نداری", "403 بدتر از 500 است", "هر دو خطای سرورند"], ans: 1, why: "401 یعنی Authentication لازم است (لاگین کن)؛ 403 یعنی Authorization ناموفق (نقش/دسترسی نداری). درمان اولی ورود است، دومی تغییر اجازه." },
          { q: "DNS چه نقشی در باز شدن سایت دارد؟", opts: ["رمزنگاری می‌کند", "نام دامنه را به IP سرور ترجمه می‌کند تا مرورگر بداند به کجا وصل شود", "صفحه را کش می‌کند", "هیچ نقشی ندارد"], ans: 1, why: "مسیریابی اینترنت فقط با IP ممکن است؛ DNS حلقه‌ی گمشده‌ی بین «نام خوانا» و «آدرس قابل‌مسیریابی» است — با کش‌های لایه‌لایه که رزولوشن را میلی‌ثانیه‌ای می‌کنند." },
        ],
      },
      {
        id: "n-net-l3",
        title: "امنیت شبکه؛ به خط اعتماد نکن",
        minutes: 55,
        blocks: [
          { k: "p", t: "قانون صفر شبکه: هر بایتی که از دستگاهت خارج می‌شود، قابل خواندن و تغییر است — مگر ثابت شده باشد که نیست. MITM یعنی کسی وسط راه خود را جا بزند؛ DDoS یعنی سیل درخواست جعلی سرویس را خفه کند. دفاع، لایه‌لایه است: رمزنگاری، احراز هویت، فایروال و مانیتورینگ." },
          { k: "code", lang: "bash", title: "terminal", code: "# آیا اتصال واقعاً HTTPS است؟ گواهی را ببین\n$ openssl s_client -connect bitcode.academy:443 -brief\nCONNECTION ESTABLISHED\nProtocol version: TLSv1.3\nCiphersuite: TLS_AES_256_GCM_SHA384\nVerification: OK                # زنجیره گواهی معتبر است\n\n# پورت‌های باز سیستم خودت — سطح حمله را بشناس\n$ ss -tulpn | grep LISTEN\n\n# فایروال ساده: فقط 22 و 443 باز\n$ sudo ufw allow 22/tcp\n$ sudo ufw allow 443/tcp\n$ sudo ufw enable\nStatus: active" },
          { k: "list", items: ["همیشه HTTPS — حتی برای APIهای داخلی؛ گواهی رایگان Let's Encrypt بهانه را گرفته", "DNS over HTTPS/TLS تا دفترچه تلفن هم شنود نشود", "پورت‌های باز را ماهی یک بار بازبینی کن؛ هر پورت باز یک در است", "SSH فقط با کلید، بدون رمز عبور و بدون root", "لاگ دسترسی‌ها را نگه دار؛ حمله‌ای که دیده نشود، اتفاق نیفتاده"] },
          { k: "def", term: "Man-in-the-Middle", t: "مهاجم بین تو و سرور می‌نشیند؛ پیام‌ها را می‌خواند و حتی تغییر می‌دهد — مثلاً در WiFi عمومی جعلی. HTTPS سالم با گواهی معتبر، چون مرورگر هویت سرور را رمزنگارانه تأیید می‌کند، این حمله را بی‌اثر می‌کند." },
          { k: "warn", title: "VPN همه‌چیز نیست", t: "VPN فقط ترافیک را تا سرور VPN رمز می‌کند؛ از آن‌جا به بعد همان قوانین برقرار است. VPN به سایتی که HTTP ساده می‌فرستد، جادو نمی‌کند. امنیت در لایه‌هاست: TLS، احراز هویت قوی و حداقل دسترسی — هیچ‌کدام جای دیگری را نمی‌گیرند." },
        ],
        quiz: [
          { q: "حمله MITM دقیقاً چه می‌کند؟", opts: ["رمز عبور را حدس می‌زند", "بین دو طرف ارتباط قرار می‌گیرد و ترافیک را شنود یا دستکاری می‌کند", "سرور را خاموش می‌کند", "فایل‌ها را پاک می‌کند"], ans: 1, why: "در WiFi عمومی یا ARP جعلی، مهاجم خودش را به‌جای دروازه جا می‌زند؛ قربانی فکر می‌کند مستقیم با سرور حرف می‌زند. TLS با تأیید هویت سرور، این توهم را می‌شکند." },
          { q: "فایروال چه کاری انجام می‌دهد؟", opts: ["ویروس‌ها را پاک می‌کند", "ترافیک ورودی/خروجی را بر اساس قوانین (پورت، IP، پروتکل) اجازه یا مسدود می‌کند", "رمزنگاری می‌کند", "سرعت را بالا می‌برد"], ans: 1, why: "فایروال درِبان لایه شبکه است: هر سرویسی که لازم نیست از بیرون برسد، پورتش بسته می‌شود — کوچک‌کردن سطح حمله، مؤثرترین دفاع اولیه." },
        ],
      },
    ],
  },
];
