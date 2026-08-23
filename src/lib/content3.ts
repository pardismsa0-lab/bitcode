import type { CourseContent } from "./content-types";
import { CONTENT_A } from "./content1";
import { CONTENT_B } from "./content2";

export const CONTENT_C: CourseContent[] = [
  {
    id: "c13",
    intro:
      "کدی که تست ندارد، کد نیست؛ حدس است. تست خودکار تنها راهی است که می‌توانی تغییر بزرگی بدهی و با اطمینان Deploy کنی. در این دوره از تست واحد تا TDD و تست یکپارچگی را با ابزارهای واقعی تمرین می‌کنی.",
    outcomes: [
      "نوشتن تست واحد معنادار با pytest",
      "Mock کردن وابستگی‌ها",
      "اجرای چرخه کامل TDD",
      "ساخت هرم تست برای یک پروژه واقعی",
    ],
    lessons: [
      {
        id: "c13-l1",
        title: "هرم تست و تست واحد",
        minutes: 55,
        blocks: [
          { k: "p", t: "هرم تست می‌گوید: تعداد زیادی تست واحدِ سریع و ارزان، تعداد متوسطی تست یکپارچگی و چند تست end-to-end. تیم‌هایی که برعکس عمل می‌کنند (بستنی قیفی!) با هر تغییر، ساعت‌ها تست کند UI را منتظر می‌مانند و اعتمادشان به تست‌ها از بین می‌رود." },
          { k: "table", head: ["لایه", "سرعت", "چه چیزی را چک می‌کند"], rows: [["واحد (Unit)", "میلی‌ثانیه", "یک تابع/کلاس در ایزوله"], ["یکپارچگی", "ثانیه", "همکاری اجزا با دیتابیس/سرویس واقعی"], ["End-to-End", "دقیقه", "مسیر کامل کاربر در UI"]] },
          { k: "code", lang: "py", title: "test_pricing.py", code: "# src/pricing.py\ndef final_price(base: float, discount: float, vip: bool) -> float:\n    price = base * (1 - discount)\n    if vip:\n        price *= 0.9          # 10% extra for VIP\n    return round(price, 2)\n\n# tests/test_pricing.py\nimport pytest\nfrom src.pricing import final_price\n\ndef test_no_discount():\n    assert final_price(100, 0, vip=False) == 100.0\n\ndef test_discount_applied():\n    assert final_price(200, 0.25, vip=False) == 150.0\n\ndef test_vip_stacks():\n    assert final_price(100, 0, vip=True) == 90.0\n\n@pytest.mark.parametrize(\"base,expected\", [\n    (0, 0.0), (50, 45.0), (1000, 900.0),\n])\ndef test_vip_various(base, expected):\n    assert final_price(base, 0, vip=True) == expected" },
          { k: "def", term: "AAA", t: "الگوی Arrange–Act–Assert: اول داده‌ها را بچین، بعد فقط یک عمل انجام بده و در نهایت نتیجه را بررسی کن. تستی که دو Act دارد، در شکست معلوم نیست کدام بخش را بگیرد." },
          { k: "tip", title: "نکته منتور", t: "نام تست را جمله کامل بنویس: test_vip_discount_stacks_on_base_discount. وقتی تست می‌شکند، نامش باید بدون بازکردن کد بگوید چه انتظاری نقض شده." },
          { k: "warn", title: "تستِ بی‌ارزش", t: "تست get/set ساده یا تستی که دقیقاً پیاده‌سازی را تکرار می‌کند (آینه‌نگاری)، فقط هزینه دارد؛ با هر تغییر می‌شکند بدون اینکه باگی بگیرند. تست رفتار را بنویس نه خطوط کد را." },
        ],
        quiz: [
          { q: "چرا در هرم تست، تست واحد باید بیشترین تعداد را داشته باشد؟", opts: ["چون راحت‌تر نوشته می‌شود", "چون سریع، ارزان و دقیق‌ترین محل‌یابی خطا را دارد", "چون ابزارش رایگان است", "چون باگ بیشتری می‌گیرد"], ans: 1, why: "تست واحد در میلی‌ثانیه اجرا و دقیقاً می‌گوید کدام تابع چه انتظاری را نقض کرده؛ e2e فقط می‌گوید «یک چیزی شکست»." },
          { q: "تست کدام رفتار را می‌سنجد نه چه چیزی را؟", opts: ["پیاده‌سازی داخلی", "رفتار قابل‌مشاهده از بیرون", "تعداد خطوط", "نام متغیرها"], ans: 1, why: "اگر تست به جزئیات داخلی وابسته باشد، هر ریفکتور سالمی آن را می‌شکند؛ تست رفتار، بازنویسی داخلی را آزاد می‌گذارد." },
        ],
      },
      {
        id: "c13-l2",
        title: "Mock و ایزوله‌سازی وابستگی‌ها",
        minutes: 60,
        blocks: [
          { k: "p", t: "تست واحد نباید به دیتابیس، شبکه یا زمان وابسته باشد؛ وگرنه کند و ناپایدار (Flaky) می‌شود. راه‌حل: وابستگی‌ها را با نمونه ساختگی (Mock) جایگزین کن. تزریق وابستگی که در درس SOLID دیدی، دقیقاً همین‌جا پاداشش را می‌دهد." },
          { k: "code", lang: "py", title: "test_notify.py", code: "# src/notify.py\nclass WelcomeService:\n    def __init__(self, mailer):\n        self.mailer = mailer     # تزریق وابستگی\n\n    def welcome(self, user):\n        if user.active:\n            self.mailer.send(user.email, \"Welcome!\")\n            return True\n        return False\n\n# tests/test_notify.py\nfrom unittest.mock import Mock\n\ndef test_welcome_sends_email():\n    mailer = Mock()\n    svc = WelcomeService(mailer)\n    user = Mock(active=True, email=\"a@b.co\")\n\n    assert svc.welcome(user) is True\n    mailer.send.assert_called_once_with(\"a@b.co\", \"Welcome!\")\n\ndef test_inactive_gets_no_email():\n    mailer = Mock()\n    svc = WelcomeService(mailer)\n    assert svc.welcome(Mock(active=False)) is False\n    mailer.send.assert_not_called()" },
          { k: "def", term: "Flaky Test", t: "تستی که گاهی پاس می‌شود و گاهی نه — معمولاً به‌خاطر وابستگی به زمان، شبکه یا ترتیب اجرا. یک تست Flaky اعتبار کل سویییت را از بین می‌برد؛ یا تعمیرش کن یا حذفش." },
          { k: "warn", title: "زیاده‌روی در Mock", t: "اگر نیمی از تستت Mock است، داری Mock را تست می‌کنی نه کد را! Mock فقط برای مرزهای سیستم (شبکه، دیتابیس، ساعت)؛ منطق محاسباتی را با داده واقعی تست کن." },
          { k: "tip", title: "نکته منتور", t: "برای زمان از freezegun و برای HTTP از responses استفاده کن تا وابستگی‌های واقعیِ غیرقابل‌پیش‌بینی از تست خارج شوند — تفاوت بین سویییت ۲ ثانیه‌ای و ۲ دقیقه‌ای." },
        ],
        quiz: [
          { q: "چرا تست نباید به شبکه وابسته باشد؟", opts: ["چون کند است", "چون نتیجه غیرقابل‌تکرار و ناپایدار می‌شود", "چون امن نیست", "همه موارد"], ans: 3, why: "شبکه هم کند است (سرعت سویییت)، هم غیرقابل‌اتکا (Flaky) و هم در CI ممکن است اصلاً در دسترس نباشد — همه دلایل با هم." },
          { q: "assert_called_once_with چه چیزی را بررسی می‌کند؟", opts: ["مقدار بازگشتی تابع", "اینکه Mock دقیقاً یک بار با همان آرگومان‌ها صدا شده", "سرعت اجرا", "نوع آرگومان‌ها"], ans: 1, why: "این یعنی رفتارِ تعامل درست بوده: سرویس خوش‌آمدگویی دقیقاً یک ایمیل، به آدرس درست، با متن درست فرستاده است." },
        ],
      },
      {
        id: "c13-l3",
        title: "TDD؛ تست اول، کد بعد",
        minutes: 65,
        blocks: [
          { k: "p", t: "در TDD چرخه کوچک قرمز-سبز-ریفکتور را تکرار می‌کنی: اول تستی بنویس که شکست می‌خورد (قرمز)، حداقل کدی که پاسش کند (سبز)، و بعد بدون تغییر رفتار، تمیزش کن (ریفکتور). نتیجه: طراحی‌ای که ذاتاً تست‌پذیر است و هیچ کد مرده‌ای ندارد." },
          { k: "code", lang: "py", title: "tdd-cycle.py", code: "# 1) RED: تست قبل از کد — هنوز تابعی نیست\ndef test_parse_duration_minutes():\n    assert parse_duration(\"1h30m\") == 90\n    assert parse_duration(\"45m\") == 45\n    assert parse_duration(\"2h\") == 120\n\n# 2) GREEN: ساده‌ترین پیاده‌سازی که پاس کند\ndef parse_duration(text: str) -> int:\n    import re\n    h = re.search(r\"(\\d+)h\", text)\n    m = re.search(r\"(\\d+)m\", text)\n    minutes = 0\n    if h:\n        minutes += int(h.group(1)) * 60\n    if m:\n        minutes += int(m.group(1))\n    return minutes\n\n# 3) REFACTOR: تمیزسازی با خیال راحت — تست نگهبان است" },
          { k: "list", items: ["قرمز: مطمئن شو تست به دلیل درست شکست می‌خورد (نه خطای import)", "سبز: کد زشت مجاز است! فقط پاس کند", "ریفکتور: حالا نام‌ها و ساختار را تمیز کن", "چرخه را کوچک نگه دار: هر چرخه زیر ۵ دقیقه"] },
          { k: "def", term: "Test Coverage", t: "درصد خطوط اجراشده توسط تست. عدد خوبی برای شروع ۸۰٪ است، اما Coverage بالا تضمین کیفیت نیست — می‌شود بدون حتی یک assert به ۱۰۰٪ رسید! تستِ معنا دار مهم‌تر از درصد است." },
          { k: "tip", title: "نکته منتور", t: "TDD سفت‌وسخت برای همه کدها لازم نیست، اما برای منطق کسب‌وکار پیچیده (قیمت‌گذاری، قوانین، پارسرها) معجزه می‌کند؛ چون مجبورت می‌کند قبل از کد، قرارداد را دقیق تعریف کنی." },
        ],
        quiz: [
          { q: "در مرحله «سبز» چه چیزی مجاز است؟", opts: ["کد تمیز و نهایی", "ساده‌ترین کد ممکن حتی زشت — ریفکتور بعداً", "تغییر تست برای پاس‌شدن", "حذف تست‌های شکست‌خورده"], ans: 1, why: "فلسفه این است که اول رفتار درست شود، بعد زیبایی؛ ترکیب «کد تمیز و کد درست» همزمان، هر دو را سخت می‌کند." },
          { q: "Coverage ۹۵٪ بدون assert چه ارزشی دارد؟", opts: ["خیلی زیاد", "تقریباً هیچ — خط اجرا شده به معنی بررسی‌شده نیست", "متوسط", "فقط برای گزارش مدیریتی مفید است"], ans: 1, why: "Coverage فقط می‌گوید کد اجرا شد؛ assertها هستند که بررسی می‌کنند خروجی درست است. درصد را بالا بگیر ولی به‌تنهایی به آن اعتماد نکن." },
        ],
      },
    ],
  },
  {
    id: "c14",
    intro:
      "گیت فقط ابزار ذخیره کد نیست؛ حافظه جمعی پروژه و بستر همکاری تیم است. و CI/CD یعنی هر تغییری خودکار تست و Deploy شود — تا «روی ماشین من کار می‌کرد» برای همیشه بازنشسته شود.",
    outcomes: [
      "درک عمیق مدل commit/branch/merge",
      "همکاری تیمی با Pull Request و Rebase",
      "طراحی استراتژی Branching",
      "ساخت Pipeline خودکار با GitHub Actions",
    ],
    lessons: [
      {
        id: "c14-l1",
        title: "مدل گیت؛ عکس‌های فوریِ کد",
        minutes: 50,
        blocks: [
          { k: "p", t: "گیت هر commit را نه به‌شکل diff، که یک Snapshot کامل از پروژه ذخیره می‌کند و هر commit به والدش اشاره دارد — یک گراف جهت‌دار. سه ناحیه را بشناس: Working Directory (تغییرات تو)، Staging (آماده commit) و Repository (تاریخچه ثبت‌شده)." },
          { k: "code", lang: "bash", title: "git-basics", code: "git init\ngit status                  # وضعیت سه ناحیه\ngit add src/                # فقط این مسیر به Staging\ngit commit -m \"feat: add price calculator\"\n\ngit log --oneline --graph   # تاریخچه فشرده\ngit diff                    # Working در برابر Staging\ngit diff --staged           # Staging در برابر آخرین commit\n\n# اصلاح اشتباه‌های رایج\ngit commit --amend          # اصلاح پیام/محتوای آخرین commit\ngit restore --staged file   # بیرون‌آوردن از Staging\ngit checkout -- file        # دورریختن تغییرات (مراقب!)" },
          { k: "def", term: "Conventional Commits", t: "قالب پیام feat: / fix: / docs: / refactor: که تاریخچه را خوانا و قابل‌اتوماسیون می‌کند؛ ابزارهایی مثل semantic-release از همین پیام‌ها نسخه بعدی و Changelog را خودکار می‌سازند." },
          { k: "warn", title: "فرمان‌های خطرناک", t: "git push --force تاریخچه مشترک را بازنویسی می‌کند و کار هم‌تیمی‌ها را می‌پرد؛ فقط روی branch شخصی خودت و ترجیحاً با --force-with-lease. و git reset --hard تغییرات ذخیره‌نشده را بی‌بازگشت پاک می‌کند." },
          { k: "tip", title: "نکته منتور", t: "هر commit باید یک تغییر منطقی و کامل باشد که بیلد را نشکند. commitهای «wip» و «fix typo fix fix» نشانه این است که مرز تغییرات را قبل از کار مشخص نکرده‌ای." },
        ],
        quiz: [
          { q: "تفاوت git diff و git diff --staged چیست؟", opts: ["هیچ", "اولی Working با Staging، دومی Staging با آخرین commit را مقایسه می‌کند", "اولی کندتر است", "دومی فقط برای branch اصلی است"], ans: 1, why: "دو مرز جداست: آنچه نوشته‌ای ولی add نکرده‌ای، در برابر آنچه add کرده‌ای ولی هنوز commit نشده." },
          { q: "چرا git push --force روی branch مشترک خطرناک است؟", opts: ["کند است", "تاریخچه را بازنویسی می‌کند و commitهای دیگران را می‌پرد", "رمز می‌خواهد", "CI را متوقف می‌کند"], ans: 1, why: "بازنویسی تاریخچه یعنی hashها عوض می‌شوند؛ هم‌تیمی‌هایی که روی تاریخچه قبلی کار کرده‌اند، با pull بعدی به تعارض و پرش مواجه می‌شوند." },
        ],
      },
      {
        id: "c14-l2",
        title: "کار تیمی؛ PR، Rebase و Branching",
        minutes: 60,
        blocks: [
          { k: "p", t: "جریان کاری مدرن: از branch اصلی یک شاخه کوتاه‌عمر بساز، کار کن، Pull Request بزن و بعد از Code Review و سبزبودن CI، merge کن. PR فقط دکمه merge نیست؛ محل انتقال دانش تیم است — جایی که باگ‌ها قبل از Production پیدا می‌شوند." },
          { k: "code", lang: "bash", title: "team-flow", code: "# شروع کار از به‌روزترین main\ngit checkout main && git pull\ngit checkout -b feat/search-api\n\n# ... چند commit ...\n\n# قبل از PR: تاریخچه را خطی و تمیز کن\ngit fetch origin\ngit rebase origin/main          # commitهای من روی آخرین main\ngit push --force-with-lease     # فقط branch خودم\n\n# در GitHub: Pull Request + Reviewer + CI\n# بعد از approve:\ngit checkout main\ngit merge --squash feat/search-api    # یک commit تمیز\ngit branch -d feat/search-api" },
          { k: "table", head: ["Merge", "Rebase"], rows: [["تاریخچه واقعی با merge commit", "تاریخچه خطی و تمیز"], ["امن — چیزی بازنویسی نمی‌شود", "hashها عوض می‌شوند؛ فقط روی کار منتشرنشده"], ["مناسب ادغام به main", "مناسب به‌روزرسانی feature branch"]] },
          { k: "warn", title: "قانون طلایی Rebase", t: "هرگز branch مشترکی که دیگران روی آن کار می‌کنند rebase نکن. Rebase برای مرتب‌کردن تاریخچه شخصی قبل از PR است — بعد از merge هم که دیگر فایده ندارد." },
          { k: "def", term: "Trunk-Based Development", t: "همه روی main (یا شاخه‌های زیر یک روز) کار می‌کنند و تغییرات بزرگ با Feature Flag خاموش Deploy می‌شوند. نتیجه: بدون hell ادغام شاخه‌های چندماهه و همیشه قابل‌انتشار." },
        ],
        quiz: [
          { q: "چه زمانی rebase ممنوع است؟", opts: ["روی branch شخصی قبل از PR", "روی branch مشترک با دیگران", "بعد از fetch", "برای مرتب‌کردن commitها"], ans: 1, why: "Rebase تاریخچه را بازنویسی می‌کند؛ اگر کس دیگری همان تاریخچه را داشته باشد، کارش با تاریخچه جدید ناسازگار می‌شود." },
          { q: "مزیت squash merge چیست؟", opts: ["سریع‌تر است", "چندین commit توسعه را به یک commit تمیز در main تبدیل می‌کند", "تعارض را حل می‌کند", "branch را حذف می‌کند"], ans: 1, why: "تاریخچه main فقط تغییرات منطقی کامل را نشان می‌دهد؛ «fix review comment 2» و «wip» در main ماندگار نمی‌شوند." },
        ],
      },
      {
        id: "c14-l3",
        title: "CI/CD با GitHub Actions",
        minutes: 65,
        blocks: [
          { k: "p", t: "CI یعنی هر push به‌طور خودکار تست شود؛ CD یعنی نسخه تأییدشده خودکار Deploy شود. بدون CI، وضعیت کد را فقط موقع merge می‌فهمیم — خیلی دیر. با CI، هر commit جواب می‌گیرد: سبز یا قرمز." },
          { k: "code", lang: "yaml", title: ".github/workflows/ci.yml", code: "name: CI\n\non:\n  pull_request:\n    branches: [main]\n  push:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Setup Python\n        uses: actions/setup-python@v5\n        with:\n          python-version: \"3.12\"\n\n      - name: Install\n        run: pip install -r requirements.txt\n\n      - name: Lint\n        run: ruff check .\n\n      - name: Test\n        run: pytest --cov=src --fail-under=80" },
          { k: "h", t: "Deploy خودکار" },
          { k: "code", lang: "yaml", title: "deploy.yml (ادامه)", code: "  deploy:\n    needs: test               # فقط اگر تست سبز بود\n    if: github.ref == 'refs/heads/main'\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Build image\n        run: docker build -t registry.io/app:${{ github.sha }} .\n      - name: Push & rollout\n        run: |\n          docker push registry.io/app:${{ github.sha }}\n          kubectl set image deploy/app app=registry.io/app:${{ github.sha }}" },
          { k: "def", term: "Pipeline as Code", t: "تعریف CI/CD در فایلی کنار کد؛ یعنی فرایند Build و Deploy هم نسخه‌کنترل، هم Review و هم تاریخچه دارد — نه تنظیماتی جادویی در پنل یک سرور گمنام." },
          { k: "tip", title: "نکته منتور", t: "سرعت Pipeline حیاتی است: کش‌کردن وابستگی‌ها، اجرای موازی jobها و fail-fast. Pipeline ده دقیقه‌ای یعنی توسعه‌دهنده context switch می‌کند و PRها روی هم می‌مانند." },
        ],
        quiz: [
          { q: "needs: test در job دوم چه تضمینی می‌دهد؟", opts: ["اجرای همزمان", "Deploy فقط بعد از موفقیت تست‌ها", "سرعت بیشتر", "اجرای دوباره تست‌ها"], ans: 1, why: "وابستگی jobها ترتیب می‌سازد؛ اگر تست قرمز باشد، Deploy اصلاً اجرا نمی‌شود — دقیقاً همان «فقط کد سبز به Production»." },
          { q: "مزیت Pipeline as Code چیست؟", opts: ["رایگان است", "فرایند استقرار نسخه‌کنترل و مرورپذیر می‌شود", "نیاز به YAML ندارد", "فقط برای Docker است"], ans: 1, why: "تغییر فرایند Deploy خودش یک PR می‌شود؛ تاریخچه، Review و Rollback دارد — نه تنظیماتی که فقط یک نفر می‌شناسد." },
        ],
      },
    ],
  },
  {
    id: "c15",
    intro:
      "«روی ماشین من کار می‌کرد» با کانتینر بازنشسته شد. داکر برنامه و تمام وابستگی‌هایش را در یک بسته استاندارد می‌بندد و کوبرنتیز صدها کانتینر را در مقیاس بزرگ مدیریت می‌کند. این دوره، الفبای DevOps مدرن است.",
    outcomes: [
      "ساخت Image بهینه با Dockerfile چندمرحله‌ای",
      "اجرای چندکانتینری با Docker Compose",
      "درک Pod، Deployment و Service در کوبرنتیز",
      "استقرار و مقیاس‌کردن یک برنامه واقعی",
    ],
    lessons: [
      {
        id: "c15-l1",
        title: "کانتینر؛ ایزوله، نه مجازی",
        minutes: 55,
        blocks: [
          { k: "p", t: "ماشین مجازی کل سیستم‌عامل را شبیه‌سازی می‌کند؛ کانتینر فقط پروسه‌ای است که با namespace و cgroup از بقیه جدا شده — بدون سیستم‌عامل مهمان. نتیجه: استارت در ثانیه، حجم مگابایتی، و یک Image که از لپ‌تاپ تا دیتاسنتر یکسان اجرا می‌شود." },
          { k: "code", lang: "dockerfile", title: "Dockerfile", code: "# Build stage: همه ابزارهای ساخت\nFROM python:3.12-slim AS build\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\n# Runtime stage: فقط نتیجه — Image نهایی کوچک و امن\nFROM python:3.12-slim\nWORKDIR /app\nCOPY --from=build /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages\nCOPY src/ ./src/\nUSER 1000\nEXPOSE 8000\nCMD [\"python\", \"-m\", \"src.main\"]" },
          { k: "code", lang: "bash", title: "docker-cli", code: "docker build -t myapp:1.0 .\ndocker run -p 8000:8000 -e DB_URL=postgres://... myapp:1.0\ndocker ps\ndocker logs -f <container_id>\ndocker images\ndocker system prune    # پاکسازی Imageهای بلااستفاده" },
          { k: "def", term: "Image و کانتینر", t: "Image بسته غیرقابل‌تغییر (شامل کد و وابستگی‌ها) است؛ کانتینر نمونه در حال اجرای آن — مثل کلاس و شیء. یک Image می‌تواند همزمان هزاران کانتینر داشته باشد." },
          { k: "warn", title: "ترتیب لایه‌ها", t: "داکر لایه‌ها را کش می‌کند؛ COPY requirements.txt را قبل از COPY کل کد بگذار تا تا زمانی که وابستگی‌ها عوض نشده‌اند، لایه pip install کش بماند و Build از دقیقه‌ها به ثانیه‌ها برسد." },
          { k: "tip", title: "نکته منتور", t: "از Imageهای slim یا alpine شروع کن، با USER غیر-root اجرا کن و هیچ وقت secret را داخل Image نفرست (در تاریخچه لایه‌ها ماندگار است!). این سه، ۸۰٪ بهداشت کانتینر است." },
        ],
        quiz: [
          { q: "مزیت اصلی Build چندمرحله‌ای چیست؟", opts: ["سریع‌تر اجرا می‌شود", "Image نهایی بدون ابزارهای ساخت، کوچک و امن می‌شود", "کش بهتر", "نیاز به Dockerfile ندارد"], ans: 1, why: "کامپایلر و dev-dependencyها در stage ساخت می‌مانند؛ به Production فقط باینری و runtime می‌رسد — سطح حمله و حجم کمتر." },
          { q: "رابطه Image و کانتینر مثل چیست؟", opts: ["فایل و پوشه", "کلاس و شیء", "کلاینت و سرور", "والد و فرزند"], ans: 1, why: "Image تعریف غیرقابل‌تغییر است و کانتینر نمونه در حال اجرا؛ از یک Image می‌توان بی‌نهایت کانتینر مستقل ساخت." },
        ],
      },
      {
        id: "c15-l2",
        title: "Docker Compose؛ ارکستر محلی",
        minutes: 55,
        blocks: [
          { k: "p", t: "اپلیکیشن واقعی فقط یک کانتینر نیست: وب + دیتابیس + کش + صف پیام. Compose این توپولوژی را در یک فایل YAML تعریف می‌کند تا همه تیم با یک فرمان، دقیقاً همان محیط را بالا بیاورند." },
          { k: "code", lang: "yaml", title: "docker-compose.yml", code: "services:\n  web:\n    build: .\n    ports:\n      - \"8000:8000\"\n    environment:\n      - DATABASE_URL=postgres://app:secret@db:5432/app\n      - REDIS_URL=redis://cache:6379\n    depends_on:\n      - db\n      - cache\n\n  db:\n    image: postgres:16-alpine\n    environment:\n      - POSTGRES_PASSWORD=secret\n      - POSTGRES_DB=app\n    volumes:\n      - pgdata:/var/lib/postgresql/data   # ماندگاری داده\n\n  cache:\n    image: redis:7-alpine\n\nvolumes:\n  pgdata:" },
          { k: "code", lang: "bash", title: "compose-cli", code: "docker compose up -d          # اجرا در پس‌زمینه\ndocker compose ps\ndocker compose logs -f web    # فقط لاگ وب\ndocker compose down           # توقف و حذف کانتینرها\ndocker compose down -v        # + حذف volumeها (داده!)" },
          { k: "warn", title: "depends_on کافی نیست", t: "depends_on فقط ترتیب استارت کانتینرها را می‌دهد، نه آمادگی دیتابیس! وب ممکن است قبل از آماده‌شدن Postgres بالا بیاید و crash کند. راه‌حل: healthcheck + condition: service_healthy یا Retry در کد." },
          { k: "def", term: "Volume", t: "فضای ذخیره بیرون از چرخه حیات کانتینر؛ وقتی کانتینر پاک شود، داده volume می‌ماند. دیتابیس بدون volume یعنی با هر down -v کل داده می‌پرد!" },
        ],
        quiz: [
          { q: "چرا دیتابیس در Compose به volume نیاز دارد؟", opts: ["برای سرعت", "چون بدون آن با حذف کانتینر، داده هم حذف می‌شود", "برای شبکه", "الزامی نیست"], ans: 1, why: "لایه نوشتنی کانتینر با خود کانتینر نابود می‌شود؛ volume داده را بیرون از این چرخه حیات نگه می‌دارد." },
          { q: "depends_on چه چیزی را تضمین نمی‌کند؟", opts: ["ترتیب استارت", "آماده‌پذیری سرویس وابسته", "شبکه مشترک", "هیچ‌کدام"], ans: 1, why: "فقط ترتیب شروع کانتینر است؛ Postgres چند ثانیه بعد از استارت آماده پذیرش اتصال می‌شود — برای آن healthcheck لازم است." },
        ],
      },
      {
        id: "c15-l3",
        title: "کوبرنتیز؛ مقیاس بدون خواب",
        minutes: 70,
        blocks: [
          { k: "p", t: "وقتی ده‌ها سرویس و صدها کانتینر داری، سوال‌ها عوض می‌شود: کدام کانتینر مرد؟ ترافیک چطور پخش شود؟ چطور بدون Downtime آپدیت کنیم؟ کوبرنتیز جواب این‌هاست: وضعیت دلخواه را اعلام می‌کنی و او مدام واقعی را به آن می‌رساند." },
          { k: "code", lang: "yaml", title: "deployment.yaml", code: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\nspec:\n  replicas: 3                 # همیشه ۳ کپی زنده\n  selector:\n    matchLabels:\n      app: web\n  template:\n    metadata:\n      labels:\n        app: web\n    spec:\n      containers:\n        - name: web\n          image: registry.io/app:1.2.0\n          ports:\n            - containerPort: 8000\n          readinessProbe:     # ترافیک فقط به کپی آماده\n            httpGet:\n              path: /healthz\n              port: 8000" },
          { k: "list", items: ["Pod: کوچک‌ترین واحد — یک یا چند کانتینر با شبکه مشترک", "Deployment: نگهبان وضعیت دلخواه + Rollout و Rollback خودکار", "Service: آدرس و Load Balancer پایدار برای مجموعه Podها", "HPA: مقیاس خودکار بر اساس CPU/RAM یا متریک سفارشی"] },
          { k: "def", term: "Reconciliation Loop", t: "قلب کوبرنتیز: حلقه‌ای بی‌پایان که وضعیت واقعی را می‌خواند و با وضعیت دلخواه مقایسه و اصلاح می‌کند. کانتینری که می‌میرد، بدون دخالت انسان دوباره ساخته می‌شود — چون سیستم اعلامی (Declarative) است نه دستوری." },
          { k: "warn", title: "K8s چوب جادو نیست", t: "کوبرنتیز خودش پیچیدگی دارد؛ برای یک سرویس ساده اغلب اورت‌کیل است. قانون: اول Compose یا یک PaaS؛ وقتی مدیریت دستی واقعاً دردناک شد، آن‌وقت K8s — نه قبل از آن." },
        ],
        quiz: [
          { q: "اگر یکی از ۳ Podها crash کند چه می‌شود؟", opts: ["سرویس قطع می‌شود", "Deployment به‌طور خودکار جایگزینش می‌کند", "باید دستی restart کرد", "replicas به ۲ تغییر می‌کند"], ans: 1, why: "Reconciliation Loop می‌بیند واقعی (۲) با دلخواه (۳) فرق دارد و Pod جدید می‌سازد — Self-healing بدون دخالت انسان." },
          { q: "نقش readinessProbe چیست؟", opts: ["لاگ گرفتن", "فقط Podهای آماده ترافیک بگیرند؛ مثلاً هنگام لود کش", "جلوگیری از crash", "بکاپ گرفتن"], ans: 1, why: "Service فقط به Podهایی ترافیک می‌فرستد که آماده‌اند؛ هنگام آپدیت، Pod جدید اول گرم می‌شود و بعد وارد چرخه ترافیک می‌شود — بدون 500 برای کاربر." },
        ],
      },
    ],
  },
  {
    id: "c16",
    intro:
      "امنیت یک Feature نیست که آخر پروژه اضافه شود؛ خصیصه‌ای است که در هر خط تصمیم گرفته می‌شود. این دوره بدون ترسناک‌کردن، مهم‌ترین تهدیدها و دفاع‌های عملی را یاد می‌دهد — همان‌هایی که در OWASP Top 10 می‌آیند.",
    outcomes: [
      "جلوگیری از تزریق SQL و XSS",
      "طراحی احراز هویت با JWT و Session",
      "ذخیره امن رمز عبور با هش",
      "مدیریت secret و HTTPS",
    ],
    lessons: [
      {
        id: "c16-l1",
        title: "تزریق و XSS؛ دو دشمن قدیمی",
        minutes: 55,
        blocks: [
          { k: "p", t: "تزریق وقتی رخ می‌دهد که ورودی کاربر به‌جای «داده»، به‌عنوان «دستور» تفسیر شود — در SQL، سیستم‌عامل یا مرورگر. دفاع مشترک همه این‌ها یک اصل است: مرز سخت بین داده و کد." },
          { k: "code", lang: "py", title: "sqli.py", code: "# آسیب‌پذیر: ورودی داخل رشته SQL\ncursor.execute(f\"SELECT * FROM users WHERE name = '{name}'\")\n# name = \"' OR '1'='1\"  => همه کاربران برمی‌گردند!\n\n# امن: query پارامتری‌شده\ncursor.execute(\"SELECT * FROM users WHERE name = %s\", (name,))\n# ورودی هر چه باشد، فقط یک مقدار متنی است" },
          { k: "code", lang: "js", title: "xss.js", code: "// آسیب‌پذیر: HTML کاربر مستقیم به صفحه\nel.innerHTML = userComment;\n// comment = \"<img src=x onerror=steal(document.cookie)>\"\n\n// امن: متن به‌عنوان متن رندر می‌شود\nel.textContent = userComment;\n\n// در React هم همین اصل خودکار است:\n// {comment} — همیشه escape می‌شود\n// dangerouslySetInnerHTML — پرچم قرمز! فقط با ضدعفونی" },
          { k: "table", head: ["حمله", "مسیر", "دفاع اصلی"], rows: [["SQL Injection", "فرم ورود / پارامتر URL", "Query پارامتری‌شده + ORM"], ["XSS", "کامنت / پروفایل کاربر", "Output encoding + CSP"], ["Command Injection", "نام فایل آپلودی", "اجتناب از shell + allow-list"]] },
          { k: "def", term: "CSP", t: "هدر Content-Security-Policy به مرورگر می‌گوید اسکریپت فقط از چه منابعی مجاز است؛ حتی اگر XSS رخ بدهد، اجرای اسکریپت خارجی یا inline را خنثی می‌کند — لایه دفاع دوم." },
          { k: "warn", title: "فیلتر سیاه‌لیستی ممنوع", t: "تلاش برای حذف کلمات کلیدی بد (مثل پاک‌کردن 'SELECT') همیشه راه فرار دارد. همیشه از allow-list و ساختارهای امن (پارامتر، escape) استفاده کن — دفاع ساختاری نه متنی." },
        ],
        quiz: [
          { q: "چرا query پارامتری‌شده در برابر تزریق مقاوم است؟", opts: ["کلمات خطرناک را حذف می‌کند", "ساختار SQL قبل از رسیدن داده نهایی شده؛ داده هرگز کد نمی‌شود", "رمزنگاری می‌کند", "ورودی را کوتاه می‌کند"], ans: 1, why: "دیتابیس اول ساختار query را می‌سازد و بعد مقادیر را فقط به‌عنوان داده جایگذاری می‌کند؛ کاراکترهای خاص معنای دستوری پیدا نمی‌کنند." },
          { q: "در React چرا {userComment} امن است ولی dangerouslySetInnerHTML نه؟", opts: ["سرعت فرق دارد", "React در اولی به‌طور خودکار خروجی را escape می‌کند", "دومی کندتر است", "فرقی ندارند"], ans: 1, why: "React کاراکترهای معنادار HTML را به متن بی‌خطر تبدیل می‌کند؛ dangerouslySetInnerHTML عمداً این سپر را خاموش می‌کند." },
        ],
      },
      {
        id: "c16-l2",
        title: "احراز هویت؛ Session و JWT",
        minutes: 60,
        blocks: [
          { k: "p", t: "HTTP بی‌حالت است؛ سرور دو کاربر متوالی را نمی‌شناسد. راه‌حل: بعد از ورود، یک مدرک به کاربر بده و در هر درخواست ببین. دو مدل اصلی: Session (مدرک در سرور، کوکی فقط شناسه) و JWT (مدرک امضاشده در دست کاربر)." },
          { k: "code", lang: "js", title: "jwt.js", code: "const jwt = require(\"jsonwebtoken\");\n\n// هنگام ورود — امضا با secret فقط سمت سرور\nconst token = jwt.sign(\n    { sub: user.id, role: user.role },\n    process.env.JWT_SECRET,\n    { expiresIn: \"15m\" }          // عمر کوتاه!\n);\n\n// Middleware احراز هویت\nfunction auth(req, res, next) {\n    const token = req.headers.authorization?.split(\" \")[1];\n    try {\n        req.user = jwt.verify(token, process.env.JWT_SECRET);\n        next();\n    } catch {\n        res.status(401).json({ error: \"invalid token\" });\n    }\n}" },
          { k: "table", head: ["معیار", "Session", "JWT"], rows: [["محل حالت", "سرور (Redis)", "کلاینت (توکن امضاشده)"], ["ابطال فوری", "ساده — حذف session", "سخت — توکن تا انقضا معتبر است"], ["مقیاس‌پذیری", "نیاز به store مشترک", "بی‌حالت — مناسب میکروسرویس"], ["حجم درخواست", "کوچک (فقط id)", "بزرگ‌تر (کل payload)"]] },
          { k: "warn", title: "رمز عبور هرگز", t: "رمز را ذخیره نکن — هش کن! با bcrypt/argon2 که عمداً کند هستند و salt خودکار دارند. MD5 و SHA256 خالص برای رمز ممنوع‌اند: با جدول رنگین‌کمان در ثانیه شکسته می‌شوند." },
          { k: "code", lang: "py", title: "password.py", code: "import bcrypt\n\nhashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())\n# ذخیره hashed — نه password!\n\nok = bcrypt.checkpw(password.encode(), hashed)\n# بررسی: هش دوباره محاسبه و مقایسه می‌شود" },
          { k: "tip", title: "نکته منتور", t: "Access Token کوتاه‌عمر (۱۵ دقیقه) + Refresh Token بلندعمر با قابلیت ابطال، الگوی استاندارد صنعت است. و هرگز token را در localStorage نگذار — کوکی HttpOnly امن‌تر است." },
        ],
        quiz: [
          { q: "چرا bcrypt برای رمز عبور بهتر از SHA256 است؟", opts: ["خروجی کوتاه‌تری دارد", "عمداً کند و saltدار است؛ brute force گران می‌شود", "جدیدتر است", "برگشت‌پذیر است"], ans: 1, why: "سرعت برای رمز عیب است: اگر دیتابیس لو برود، مهاجم میلیاردها حدس در ثانیه می‌زند؛ کندی bcrypt این را عملاً غیرممکن می‌کند." },
          { q: "بزرگ‌ترین ضعف JWT در برابر Session چیست؟", opts: ["حجم", "ابطال فوری توکن قبل از انقضا سخت است", "امن نیست", "فقط برای موبایل کار می‌کند"], ans: 1, why: "توکن امضاشده تا انقضا معتبر است؛ اگر لو برود یا کاربر اخراج شود، session را می‌شود همان لحظه حذف کرد ولی JWT را نه (مگر با blacklist)." },
        ],
      },
      {
        id: "c16-l3",
        title: "HTTPS، Secret و چک‌لیست استقرار",
        minutes: 50,
        blocks: [
          { k: "p", t: "HTTPS ترافیک را رمز می‌کند تا در مسیر شنود و دستکاری نشود؛ با Let's Encrypt رایگان و خودکار است — امروز بهانه‌ای برای HTTP نیست. اما بزرگ‌ترین نشت‌ها از کد می‌آید: secretهایی که داخل Git push شده‌اند و تا ابد در تاریخچه‌اند." },
          { k: "code", lang: "bash", title: "secrets", code: "# هرگز در کد:\nAPI_KEY = \"sk-live-8f3a...\"    # ❌ داخل git می‌ماند!\n\n# همیشه متغیر محیطی:\nimport os\nAPI_KEY = os.environ[\"API_KEY\"]   # ✅\n\n# و در .gitignore:\necho \".env\" >> .gitignore\n\n# اگر اشتباهاً push شد، فقط حذف کافی نیست!\ngit filter-repo --path .env --invert-paths\n# و مهم‌تر: همان لحظه secret را Rotate کن" },
          { k: "list", items: ["HSTS: هدری که مرورگر را مجبور به HTTPS می‌کند", "به‌روزرسانی وابستگی‌ها: بیشتر نفوذها از CVEهای شناخته‌شده‌اند", "Least Privilege: هر سرویس فقط دسترسی‌هایی که لازم دارد", "لاگ حساس ممنوع: رمز و token هرگز نباید در لاگ بیاید", "2FA برای ادمین‌ها و دسترسی‌های حساس"] },
          { k: "def", term: "Attack Surface", t: "مجموع نقاطی که مهاجم می‌تواند وارد شود: هر endpoint باز، هر پورت، هر وابستگی. هرچه سطح حمله کوچک‌تر (پورت‌های کمتر، سرویس‌های کمتر، دسترسی‌های کمتر)، امنیت بیشتر — امنیت یعنی کم‌کردن، نه افزودن ابزار." },
          { k: "warn", title: "تاریخچه Git حافظه دارد", t: "push کردن .env یعنی انتشار عمومی؛ حتی با حذف در commit بعدی، در تاریخچه و کش‌های GitHub می‌ماند و ربات‌ها در چند ثانیه پیدایش می‌کنند. تنها راه: حذف از تاریخچه + چرخش فوری secret." },
        ],
        quiz: [
          { q: "اگر secret اشتباهاً push شد، اولین کار چیست؟", opts: ["حذف commit", "چرخش (Rotate) فوری همان secret", "پاک‌کردن branch", "اطلاع به تیم"], ans: 1, why: "فرض کن لو رفته — ربات‌ها در ثانیه می‌خوانندش. حذف از تاریخچه لازم است ولی تا secret عوض نشود، آسیب ادامه دارد." },
          { q: "HTTPS جلوی چه چیزی را می‌گیرد؟", opts: ["همه هک‌ها", "شنود و دستکاری ترافیک در مسیر", "SQL Injection", "فیشینگ"], ans: 1, why: "TLS کانال را رمز و یکپارچه می‌کند؛ ولی اگر خود برنامه تزریق داشته باشد یا کاربر رمز را در سایت جعلی بزند، HTTPS کمکی نمی‌کند — یک لایه از چند لایه است." },
        ],
      },
    ],
  },
  {
    id: "c17",
    intro:
      "یادگیری ماشین از «برنامه‌نویسی قواعد» به «یادگیری از داده» تغییر مسیر می‌دهد. در این دوره مفاهیم پایه ML، شبکه‌های عصبی و کار عملی با LLMها را می‌بینی — با نگاه مهندس نرم‌افزار، نه فقط دانشمند داده.",
    outcomes: [
      "درک نظارت‌شده/نظارت‌نشده و معیارهای ارزیابی",
      "آموزش اولین مدل با scikit-learn",
      "شهود شبکه عصبی و Backpropagation",
      "کار مهندسی‌شده با LLMها و Prompt Engineering",
    ],
    lessons: [
      {
        id: "c17-l1",
        title: "ML چیست؟ از قاعده تا داده",
        minutes: 55,
        blocks: [
          { k: "p", t: "در برنامه‌نویسی سنتی، قاعده را تو می‌نویسی و خروجی تولید می‌شود؛ در یادگیری ماشین، داده و خروجی را می‌دهی و مدل قاعده را پیدا می‌کند. وقتی قاعده‌ها برای نوشتن پیچیده‌اند (تشخیص اسپم، قیمت‌گذاری، تشخیص تصویر) این مسیر برنده است." },
          { k: "code", lang: "py", title: "first_model.py", code: "from sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score, confusion_matrix\n\nX_train, X_test, y_train, y_test = train_test_split(\n    features, labels, test_size=0.2, random_state=42\n)\n\nmodel = LogisticRegression(max_iter=1000)\nmodel.fit(X_train, y_train)              # یادگیری از داده\n\npred = model.predict(X_test)             # آزمون با داده ندیده\nprint(accuracy_score(y_test, pred))      # 0.87\nprint(confusion_matrix(y_test, pred))" },
          { k: "def", term: "Overfitting", t: "مدلی که داده تمرین را حفظ کرده به‌جای یادگیری الگو؛ در تمرین عالی و در داده جدید ضعیف. راه‌ها: داده بیشتر، مدل ساده‌تر، Regularization و اعتبارسنجی متقاطع." },
          { k: "table", head: ["نوع یادگیری", "داده", "مثال"], rows: [["نظارت‌شده", "ورودی + برچسب", "تشخیص اسپم، پیش‌بینی قیمت"], ["نظارت‌نشده", "فقط ورودی", "خوشه‌بندی مشتریان"], ["تقویتی", "پاداش/جریمه", "بازی، رباتیک"]] },
          { k: "warn", title: "داده مهم‌تر از مدل", t: "مدل پیشرفته با داده کثیف، از مدل ساده با داده تمیز بدتر است. ۸۰٪ کار واقعی ML مهندسی داده است: تمیزکردن، برخورد با مقادیر گمشده و جلوگیری از نشت اطلاعات بین train و test." },
          { k: "tip", title: "نکته منتور", t: "همیشه یک baseline ساده بساز (مثل میانگین یا رگرسیون خطی) و مدل‌های پیچیده را با آن مقایسه کن؛ اگر مدل پیچیده baseline را نمی‌برد، همان ساده را Deploy کن." },
        ],
        quiz: [
          { q: "مدلی با دقت ۹۹٪ در train و ۶۰٪ در test چه مشکلی دارد؟", opts: ["Underfitting", "Overfitting — قواعد را حفظ کرده نه یاد نگرفته", "داده کم است", "مدل ساده است"], ans: 1, why: "شکاف بزرگ بین دقت تمرین و آزمون امضای Overfitting است؛ مدل نویزهای داده تمرین را هم یاد گرفته." },
          { q: "چرا test set نباید در آموزش استفاده شود؟", opts: ["کند است", "چون معیار بی‌طرفانه «داده ندیده» را از بین می‌برد", "حجمش زیاد است", "فرمت متفاوت دارد"], ans: 1, why: "اگر مدل test را ببیند، نمره‌اش بازتاب حفظ‌کردن است نه تعمیم؛ دقیقاً مثل امتحانی که سوالاتش از قبل پخش شده." },
        ],
      },
      {
        id: "c17-l2",
        title: "شبکه عصبی؛ لایه به لایه",
        minutes: 65,
        blocks: [
          { k: "p", t: "شبکه عصبی زنجیره‌ای از توابع ساده است: هر نورون، میانگین وزنی ورودی‌ها را از یک تابع غیرخطی رد می‌کند. جادو در Backpropagation است: خطا از خروجی به عقب برمی‌گردد و به هر وزن می‌گوید چقدر و به کدام جهت تغییر کند — گرادیان." },
          { k: "code", lang: "py", title: "network.py", code: "import torch\nimport torch.nn as nn\n\nclass Net(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.layers = nn.Sequential(\n            nn.Linear(784, 128),   # ورودی: پیکسل‌های تصویر 28x28\n            nn.ReLU(),             # غیرخطی — بدون آن شبکه خطی می‌ماند\n            nn.Linear(128, 32),\n            nn.ReLU(),\n            nn.Linear(32, 10),     # خروجی: 10 رقم\n        )\n\n    def forward(self, x):\n        return self.layers(x.view(x.size(0), -1))\n\nmodel = Net()\noptimizer = torch.optim.Adam(model.parameters(), lr=1e-3)\nloss_fn = nn.CrossEntropyLoss()" },
          { k: "h", t: "حلقه آموزش در یک نگاه" },
          { k: "code", lang: "py", title: "train_loop.py", code: "for epoch in range(10):\n    for x, y in train_loader:\n        optimizer.zero_grad()        # 1) گرادیان قبلی پاک\n        pred = model(x)              # 2) Forward: پیش‌بینی\n        loss = loss_fn(pred, y)      # 3) اندازه‌گیری خطا\n        loss.backward()              # 4) Backward: محاسبه گرادیان‌ها\n        optimizer.step()             # 5) به‌روزرسانی وزن‌ها\n    print(f\"epoch {epoch}: loss = {loss:.4f}\")" },
          { k: "def", term: "Learning Rate", t: "اندازه گام هر به‌روزرسانی وزن؛ خیلی بزرگ باشد همگرا نمی‌شود (از دره می‌پرد) و خیلی کوچک باشد عملاً یاد نمی‌گیرد. تنظیم آن اولین چیزی است که وقتی آموزش خراب می‌شود بررسی می‌کنیم." },
          { k: "tip", title: "نکته منتور", t: "به‌عنوان مهندس نرم‌افزار لازم نیست از صفر شبکه بنویسی؛ اما بفهم forward/backward/optimizer چه می‌کنند تا بتوانی آموزش‌های گیرکرده را دیباگ کنی — دقیقاً مثل فهم Event Loop برای دیباگ Node." },
        ],
        quiz: [
          { q: "بدون تابع فعال‌ساز غیرخطی مثل ReLU چه می‌شود؟", opts: ["مدل کند می‌شود", "کل شبکه معادل یک تبدیل خطی ساده می‌شود", "دقت بالا می‌رود", "حافظه بیشتر لازم است"], ans: 1, why: "ترکیب توابع خطی، خطی می‌ماند؛ پس هزار لایه هم قدرت یک لایه را دارد. غیرخطی است که به شبکه قدرت تقریب هر تابعی را می‌دهد." },
          { q: "ترتیب درست حلقه آموزش کدام است؟", opts: ["backward سپس forward", "forward، loss، backward، optimizer.step", "step سپس loss", "zero_grad در پایان"], ans: 1, why: "اول پیش‌بینی و خطا محاسبه می‌شود، بعد گرادیان‌ها به عقب پخش و در نهایت وزن‌ها به‌روز می‌شوند؛ zero_grad هم قبل از backward برای پاک‌کردن گرادیان قبلی." },
        ],
      },
      {
        id: "c17-l3",
        title: "LLMها و مهندسی Prompt",
        minutes: 60,
        blocks: [
          { k: "p", t: "مدل‌های زبانی بزرگ، شبکه‌های عصبی‌اند که روی حجم عظیم متن آموزش دیده‌اند و «کلمه بعدی» را پیش‌بینی می‌کنند — اما همین کار ساده در مقیاس، توانایی‌هایی مثل خلاصه، ترجمه و کدنویسی پدید آورده. برای مهندس، LLM یک API است؛ هنر، مهندسی ورودی آن است." },
          { k: "code", lang: "py", title: "llm_call.py", code: "from openai import OpenAI\nclient = OpenAI()\n\nresponse = client.chat.completions.create(\n    model=\"gpt-4o\",\n    temperature=0.2,              # کم = قطعی‌تر؛ زیاد = خلاق‌تر\n    messages=[\n        {\"role\": \"system\",\n         \"content\": \"You are a code reviewer. Reply in Persian,\"\n                    \"be concise, cite line numbers.\"},\n        {\"role\": \"user\",\n         \"content\": f\"Review this diff:\\n{diff}\"},\n    ],\n)\n\nprint(response.choices[0].message.content)" },
          { k: "list", items: ["نقش و قالب خروجی را مشخص کن: «فقط JSON برگردان»", "مثال بده (Few-shot)؛ کیفیت را چشمگیر بالا می‌برد", "مسئله بزرگ را به مراحل کوچک بشکن (Chain-of-thought)", "خروجی را اعتبارسنجی کن؛ مدل اشتباه می‌کند و مطمئن است!", "RAG: به‌جای تکیه بر حافظه مدل، سند واقعی را به context بده"] },
          { k: "def", term: "Hallucination", t: "تولید پاسخ اشتباه با اعتمادبه‌نفس کامل؛ ذاتی مدل‌های مولد است نه باگ موقت. در سیستم‌های واقعی خروجی LLM «پیشنهاد» است نه «حقیقت» — همیشه اعتبارسنجی، تست و مسیر بازگشت برای انسان نگه دار." },
          { k: "warn", title: "داده حساس را نفرست", t: "متن prompt ممکن است برای آموزش استفاده شود یا در لاگ‌های سرویس بماند. رمز عبور، کلید API و داده محرمانه مشتری هرگز نباید وارد prompt یک مدل ابری شود." },
          { k: "tip", title: "نکته منتور", t: "prompt را مثل کد مدیریت کن: داخل ریپازیتوری، با نسخه و تست. وقتی prompt تغییر می‌کند، رفتار سیستم تغییر کرده — پس باید Review و قابلیت Rollback داشته باشد، دقیقاً مثل هر کد دیگری." },
        ],
        quiz: [
          { q: "برای خروجی قابل‌اعتمادتر کدام temperature مناسب‌تر است؟", opts: ["2.0", "0.2", "همیشه 1", "temperature بی‌تأثیر است"], ans: 1, why: "temperature پایین توزیع کلمه بعدی را تیزتر می‌کند؛ خروجی قطعی‌تر و تکرارپذیرتر — مناسب کارهای ساختاریافته مثل استخراج داده." },
          { q: "چرا RAG از پرسیدن مستقیم سؤال واقعی بهتر است؟", opts: ["ارزان‌تر است", "پاسخ بر اساس سند واقعیِ داخل context است نه حافظه مدل", "سریع‌تر است", "نیاز به prompt ندارد"], ans: 1, why: "وقتی سند مرتبط بازیابی و به context داده می‌شود، مدل به‌جای حدس از حافظه (که ممکن است قدیمی یا اشتباه باشد)، از همان سند جواب می‌سازد." },
        ],
      },
    ],
  },
];

export const COURSE_CONTENT: Record<string, CourseContent> = [...CONTENT_A, ...CONTENT_B, ...CONTENT_C].reduce(
  (acc, c) => {
    acc[c.id] = c;
    return acc;
  },
  {} as Record<string, CourseContent>
);
