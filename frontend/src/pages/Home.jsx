import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import Hero from '../components/Hero.jsx';
import ProjectShelf from '../components/ProjectShelf.jsx';
import Footer from '../components/Footer.jsx';
import ContactModal from '../components/ContactModal.jsx';
import { fetchProjects } from '../api.js';
import { fallbackProjects } from '../data/fallbackProjects.js';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [contactOpen, setContactOpen] = useState(false);
  const shelfRef = useRef(null);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(() => setProjects(fallbackProjects));
  }, []);

  // Scroll-linked stage transition: the hero is sticky (pinned), and the shelf
  // — in normal flow right after it — scrolls up OVER it. While the shelf's
  // stepped edge rises (progress 0 -> 1), the hero sinks down and fades like a
  // trapdoor lowering.
  const { scrollYProgress } = useScroll({
    target: shelfRef,
    offset: ['start end', 'start start'],
  });

  const heroSink = {
    y: useTransform(scrollYProgress, [0, 1], ['0vh', '45vh']),
    opacity: useTransform(scrollYProgress, [0, 0.9], [1, 0]),
    scale: useTransform(scrollYProgress, [0, 1], [1, 0.93]),
  };

  return (
    <>
      {/* Opaque page content, above the fixed footer */}
      <main id="top" className="dot-grid relative z-10 bg-cream">
        <div className="sticky top-0 z-10 h-screen">
          <Hero sinkStyle={heroSink} />
        </div>
        <div ref={shelfRef} className="relative z-30">
          <ProjectShelf projects={projects} />
        </div>
      </main>

      {/* Reveal window: as the page scrolls past, the fixed footer beneath is
          uncovered with the same stage-like motion (content lifts away). */}
      <div id="contact" className="relative h-screen" />
      <Footer onReachOut={() => setContactOpen(true)} />

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
