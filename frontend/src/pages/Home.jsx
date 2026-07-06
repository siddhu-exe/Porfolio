import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import Hero from '../components/Hero.jsx';
import Statement from '../components/Statement.jsx';
import ProjectShelf from '../components/ProjectShelf.jsx';
import Footer from '../components/Footer.jsx';
import ContactModal from '../components/ContactModal.jsx';
import { fetchProjects } from '../api.js';
import { fallbackProjects } from '../data/fallbackProjects.js';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [contactOpen, setContactOpen] = useState(false);
  const statementRef = useRef(null);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(() => setProjects(fallbackProjects));
  }, []);

  // Stage transition #1: the hero is pinned (sticky) while the black
  // Statement section's stepped podium edge rises over it; the hero sinks and
  // fades in lockstep with the scroll.
  const { scrollYProgress } = useScroll({
    target: statementRef,
    offset: ['start end', 'start start'],
  });

  const heroSink = {
    // reduce delay so the hero transition begins a bit sooner on scroll
    y: useTransform(scrollYProgress, [0.12, 1], ['0vh', '45vh']),
    opacity: useTransform(scrollYProgress, [0.12, 0.9], [1, 0]),
    scale: useTransform(scrollYProgress, [0.12, 1], [1, 0.93]),
  };

  return (
    <>
      {/* Opaque page content, above the fixed footer. No background of its
          own — each section paints itself, so the stepped bottom edge can
          show the footer through its gaps. */}
      <main id="top" className="relative z-10">
        {/* The sticky hero is scoped to this wrapper: it stays pinned only
            while the Statement covers it, then releases. */}
        <div className="relative">
          <div className="dot-grid sticky top-0 z-10 h-screen md:h-[170vh] bg-cream">
            <Hero sinkStyle={heroSink} />
          </div>
          <div ref={statementRef} className="relative z-30">
            <Statement />
          </div>
        </div>

        {/* Color shift (brush edge) into the cream shelf — no motion here. */}
        <div className="relative z-30">
          <ProjectShelf projects={projects} />
        </div>

        {/* Stage transition #2, mirrored: the page's bottom edge is the podium
            in reverse — it lifts away step by step, revealing the footer. */}
        <div aria-hidden className="relative z-30 flex flex-col items-center">
          <div className="h-5 w-[80%] bg-cream md:h-8" />
          <div className="h-5 w-[58%] bg-cream md:h-8" />
          <div className="h-5 w-[36%] bg-cream md:h-8" />
        </div>
      </main>

      {/* Reveal window for the fixed footer underneath */}
      <div id="contact" className="relative h-screen" />
      <Footer onReachOut={() => setContactOpen(true)} />

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
