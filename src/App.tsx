import Header from "./components/Header";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import Roadmap from "./components/Roadmap";
import Syllabus from "./components/Syllabus";
import Community from "./components/Community";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen font-body text-mist antialiased">
      <div className="grid-layer" aria-hidden="true" />
      <div className="noise-layer" aria-hidden="true" />

      <Header />

      <main>
        <Hero />
        <Courses />
        <Roadmap />
        <Syllabus />
        <Community />
        <Faq />
      </main>

      <Footer />
    </div>
  );
}
