import { Suspense, lazy, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import LegacyWork3D from "./components/LegacyWork3D";
import Projects from "./components/Projects";
import SideWork from "./components/SideWork";
import Workflow from "./components/Workflow";
import Skills from "./components/Skills";
import Leadership from "./components/Leadership";
import Contact from "./components/Contact";
import CosmicBackground from "./components/CosmicBackground";
import SectionDepth from "./components/SectionDepth";
import ScrollDirector from "./components/ScrollDirector";
import ChapterTransition from "./components/ChapterTransition";
import { StageProvider } from "./lib/stage";
import { useSpotlight } from "./lib/useSpotlight";

const CaseStudy = lazy(() => import("./components/CaseStudy"));

function useCaseStudySlug() {
  const read = () => {
    const match = window.location.hash.match(/^#\/work\/([\w-]+)/);
    return match ? match[1] : null;
  };
  const [slug, setSlug] = useState<string | null>(read);
  useEffect(() => {
    const onChange = () => setSlug(read());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return slug;
}

function Portfolio() {
  useSpotlight();

  return (
    <div className="relative min-h-screen bg-ink">
      <a href="#main-content" className="skip-link">Skip to portfolio content</a>
      <CosmicBackground />
      <ScrollDirector />
      <div className="relative z-10">
        <Nav />
        <main id="main-content">
          {/* Act 01 — Intro */}
          <Hero />

          <ChapterTransition gate={1} />
          {/* Act 02 — Work */}
          <SectionDepth tone="data"><Projects /></SectionDepth>
          <SectionDepth tone="data" subtle><LegacyWork3D /></SectionDepth>
          <SectionDepth tone="human" subtle><SideWork /></SectionDepth>
          <SectionDepth tone="success"><Workflow /></SectionDepth>

          <ChapterTransition gate={2} />
          {/* Act 03 — Experience */}
          <SectionDepth tone="human"><Experience /></SectionDepth>

          <ChapterTransition gate={3} />
          {/* Act 04 — Capabilities */}
          <SectionDepth tone="success"><Skills /></SectionDepth>
          <SectionDepth tone="signal"><Leadership /></SectionDepth>

          <ChapterTransition gate={4} />
          {/* Act 05 — Connect */}
          <SectionDepth tone="data"><About /></SectionDepth>
          <SectionDepth tone="signal"><Contact /></SectionDepth>
        </main>
      </div>
    </div>
  );
}

function App() {
  const slug = useCaseStudySlug();

  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
      {slug ? (
        <Suspense fallback={<div className="min-h-screen bg-ink" />}>
          <CaseStudy slug={slug} />
        </Suspense>
      ) : (
        <StageProvider>
          <Portfolio />
        </StageProvider>
      )}
    </MotionConfig>
  );
}

export default App;
