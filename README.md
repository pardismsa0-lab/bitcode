# Bitcode - وبسایت آموزشی مهندسی نرم‌افزار

<p dir="rtl">
یک پلتفرم آموزشی مدرن برای یادگیری مهندسی نرم‌افزار با استفاده از React، TypeScript و Vite.
</p>

## 🚀 ویژگی‌ها

- ✅ **React 18** با hooks و functional components
- ✅ **TypeScript** با strict mode برای type safety کامل
- ✅ **Vite** برای build سریع و HMR
- ✅ **Tailwind CSS v4** برای styling
- ✅ **React Router v7** برای navigation
- ✅ **Recharts** برای نمودارها و visualization
- ✅ **Framer Motion** برای انیمیشن‌های smooth
- ✅ **dnd-kit** برای drag and drop
- ✅ **Supabase** برای backend
- ✅ **Testing** با Vitest و Testing Library
- ✅ **ESLint & Prettier** برای code quality

## 📦 نصب و راه‌اندازی

### پیش‌نیازها

- Node.js >= 22.0.0
- npm >= 10.0.0

```bash
# بررسی نسخه Node.js
node --version

# اگر نیاز به ارتقا دارید:
# nvm install 22
# nvm use 22
```

### نصب dependencies

```bash
npm install
```

### تنظیم متغیرهای محیطی

```bash
# کپی کردن فایل نمونه
cp .env.example .env.local

# ویرایش فایل .env.local و اضافه کردن مقادیر Supabase
```

### اجرای پروژه در حالت توسعه

```bash
npm run dev
```

پروژه در آدرس [http://localhost:3000](http://localhost:3000) قابل دسترسی است.

## 🛠️ دستورات موجود

| دستور | توضیح |
|-------|-------|
| `npm run dev` | اجرای سرور توسعه با HMR |
| `npm run build` | بیلد گرفتن برای production |
| `npm run preview` | پیش‌نمایش بیلد production |
| `npm run typecheck` | بررسی typeها با TypeScript |
| `npm run lint` | بررسی کد با ESLint |
| `npm run lint:fix` | رفع خودکار مشکلات ESLint |
| `npm run format` | فرمت کردن کد با Prettier |
| `npm run format:check` | بررسی فرمت کد |
| `npm run test` | اجرای تست‌ها در حالت watch |
| `npm run test:run` | اجرای یکباره تست‌ها |
| `npm run test:coverage` | اجرای تست‌ها با گزارش coverage |

## 📁 ساختار پروژه

```
bitcode/
├── src/
│   ├── components/     # کامپوننت‌های React
│   ├── lib/           # داده‌ها و utilityها
│   ├── test/          # فایل‌های تست
│   ├── App.tsx        # کامپوننت اصلی
│   ├── main.tsx       # نقطه ورود
│   └── index.css      # استایل‌های سراسری
├── .env.example       # نمونه متغیرهای محیطی
├── .eslintrc.cjs      # پیکربندی ESLint
├── .prettierrc.js     # پیکربندی Prettier
├── index.html         # HTML اصلی
├── package.json       # dependencies و scripts
├── tsconfig.json      # پیکربندی TypeScript
└── vite.config.js     # پیکربندی Vite
```

## 🔒 امنیت

این پروژه دارای dependencies آپدیت شده است:
- `react-router-dom@^7.18.2` - رفع آسیب‌پذیری‌های امنیتی
- `uuid@^14.0.2` - رفع مشکل buffer bounds check

برای بررسی آسیب‌پذیری‌ها:
```bash
npm audit
```

## 🧪 تست

تست‌ها با Vitest و Testing Library نوشته شده‌اند:

```bash
# اجرای تست‌ها
npm run test

# اجرای تست‌ها با گزارش coverage
npm run test:coverage
```

## 🎨 استایل‌دهی

این پروژه از Tailwind CSS v4 استفاده می‌کند. برای سفارشی‌سازی:

1. فایل `src/index.css` را ویرایش کنید
2. از utility classهای Tailwind استفاده کنید
3. برای استایل‌های پیچیده‌تر از CSS Modules یا styled-components استفاده کنید

## 🚀 deployment

### بیلد برای production

```bash
npm run build
```

خروجی در پوشه `dist` قرار می‌گیرد.

### استقرار روی پلتفرم‌های مختلف

#### Vercel
```bash
npm install -g vercel
vercel deploy
```

#### Netlify
```bash
npm run build
# آپلود پوشه dist روی Netlify
```

#### Docker
```bash
docker build -t bitcode .
docker run -p 3000:3000 bitcode
```

## 🤝 مشارکت

1. Fork پروژه
2. ایجاد branch جدید (`git checkout -b feature/amazing-feature`)
3. Commit تغییرات (`git commit -m 'Add some amazing feature'`)
4. Push به branch (`git push origin feature/amazing-feature`)
5. ایجاد Pull Request

## 📄 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## 📞 پشتیبانی

برای سوالات و مشکلات، لطفاً issue ایجاد کنید یا با ما تماس بگیرید.

---

<div dir="rtl">
<p>ساخته شده با ❤️ توسط تیم Bitcode</p>
</div>
