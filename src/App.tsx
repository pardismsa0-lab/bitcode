import { Component, useEffect, useState, type ErrorInfo, type ReactNode } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import Roadmap from "./components/Roadmap";
import Syllabus from "./components/Syllabus";
import Community from "./components/Community";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import CourseView from "./components/CourseView";
import { loadProgress, saveProgress, type ProgressMap } from "./lib/progress";

type View = { t: "home" } | { t: "course"; id: string };

/* سپر خطا: هیچ‌وقت صفحه سفید نشود */
class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("خطای اجرا:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div dir="rtl" className="min-h-screen grid place-items-center bg-night-950 text-mist font-body px-4">
          <div className="max-w-lg w-full border border-coral/40 bg-night-900/80 rounded-md p-8 text-center">
            <p className="font-display text-5xl text-coral">⚠</p>
            <h1 className="font-display text-3xl mt-4">یک خطای غیرمنتظره رخ داد</h1>
            <p className="text-dim text-sm leading-7 mt-3">
              نگران نباش؛ داده‌های پیشرفتت سالم است. صفحه را دوباره بارگذاری کن؛ اگر مشکل ادامه داشت، کش مرورگر را پاک کن.
            </p>
            <p className="font-code text-[11px] text-faint mt-4 border border-linec rounded p-3 text-left" dir="ltr">
              {String(this.state.error.message || this.state.error)}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-amber text-night-900 font-bold rounded-md px-8 py-3 hover:bg-[#ffc775] transition-colors"
            >
              بارگذاری دوباره
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [view, setView] = useState<View>({ t: "home" });
  const [enrolled, setEnrolled] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState<ProgressMap>(() => loadProgress());

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [view]);

  const toggleEnroll = (id: string) =>
    setEnrolled((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleLesson = (courseId: string, lessonId: string) =>
    setProgress((prev) => {
      const done = prev[courseId] ?? [];
      const next = done.includes(lessonId) ? done.filter((l) => l !== lessonId) : [...done, lessonId];
      return { ...prev, [courseId]: next };
    });

  const openCourse = (id: string) => setView({ t: "course", id });
  const goHome = () => setView({ t: "home" });

  const navTo = (id: string) => {
    setView({ t: "home" });
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <ErrorBoundary>
      <div dir="rtl" className="min-h-screen font-body text-mist antialiased relative">
        <div className="grid-layer" aria-hidden="true" />
        <div className="noise-layer" aria-hidden="true" />

      <Header onHome={goHome} onNav={navTo} />

      {view.t === "home" ? (
        <>
          <Hero />
          <Courses
            enrolled={enrolled}
            onToggleEnroll={toggleEnroll}
            onOpen={openCourse}
            progress={progress}
          />
          <Roadmap />
          <Syllabus />
          <Community />
          <Faq />
        </>
      ) : (
        <CourseView
          courseId={view.id}
          onBack={goHome}
          completed={progress[view.id] ?? []}
          onToggleLesson={toggleLesson}
          enrolled={enrolled.has(view.id)}
          onEnroll={() => toggleEnroll(view.id)}
        />
      )}

      <Footer />
      </div>
    </ErrorBoundary>
  );
}
