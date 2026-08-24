import { useEffect, useState } from "react";
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
  );
}
