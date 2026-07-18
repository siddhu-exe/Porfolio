import { useState } from 'react';
import { motion } from 'framer-motion';
import BookSpine from './BookSpine.jsx';
import BookModal from './BookModal.jsx';
import CursorBadge from './CursorBadge.jsx';

// Shelf order + captions. Books are filtered in from the fetched project list
// by matching `category`, so shelves stay data-driven (add books freely).
const SHELVES = [
  { key: 'Data Analytics', subtitle: 'Extracting insights from data to drive better decisions.' },
  { key: 'Data Visualization', subtitle: 'Transforming complex data into clear and interactive stories.' },
  { key: 'Machine Learning', subtitle: 'Building predictive models that learn from data.' },
  { key: 'Deep Learning', subtitle: 'Solving complex problems using neural networks and computer vision.' },
  { key: 'AI Applications', subtitle: 'Creating intelligent systems powered by modern AI.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Cream bookshelf section. Arrives from the black Statement section through
 * its brush edge (a color shift, no motion transition). The background gets
 * soft color washes + hand-drawn marks so it isn't a flat wall.
 */
export default function ProjectShelf({ projects }) {
  const [active, setActive] = useState(null);
  const [hovering, setHovering] = useState(false);

  const shelves = SHELVES.map(({ key, subtitle }) => ({
    category: key,
    subtitle,
    books: projects.filter((p) => p.category === key),
  }));

  return (
    <section id="shelf" className="dot-grid relative bg-cream">
      <CursorBadge active={hovering} className="h-16 w-16 bg-mustard text-sm text-ink">
        Click
      </CursorBadge>

      {/* background decorations: soft washes + hand-drawn marks */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-48 h-96 w-96 rounded-full bg-terracotta/20 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-[30rem] w-[30rem] rounded-full bg-mustard/40 blur-3xl" />
        <div className="absolute bottom-32 left-1/4 h-80 w-80 rounded-full bg-[#7A9E7E]/20 blur-3xl" />

        {/* asterisk */}
        <svg viewBox="0 0 40 40" className="absolute right-[12%] top-24 w-8 text-terracotta/70 md:w-10">
          <path d="M20 4v32M6 12l28 16M34 12L6 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
        {/* small spiral scribble */}
        <svg viewBox="0 0 60 60" className="absolute left-[8%] top-[42%] w-10 text-ink/25 md:w-14">
          <path
            d="M30 30 C 34 26, 38 30, 34 34 C 28 40, 18 34, 22 24 C 26 14, 42 16, 44 28 C 46 42, 30 52, 16 44"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        {/* underline dash */}
        <svg viewBox="0 0 120 20" className="absolute bottom-[18%] right-[10%] w-20 text-terracotta/60 md:w-28">
          <path d="M4 12 C 30 4, 60 16, 116 8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      <div className="relative px-8 pb-40 pt-16 text-ink md:px-16 md:pb-24 md:pt-24">
        <motion.header
          className="mx-auto mb-16 max-w-3xl text-center md:mb-24"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-terracotta md:text-sm">
            01 &mdash; The Shelf
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-6xl">Project Shelf</h2>
          <svg viewBox="0 0 220 12" className="mx-auto mt-4 w-40 text-terracotta">
            <path
              d="M2 8 C 30 2, 50 10, 80 6 S 140 2, 218 6"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </motion.header>

        <div className="mx-auto max-w-3xl">
          {shelves.map(({ category, subtitle, books }, si) => {
            const mid = Math.ceil(books.length / 2);
            const left = books.slice(0, mid);
            const right = books.slice(mid);
            return (
              <div key={category} className="mb-14 md:mb-20">
                <div className="flex items-end justify-center gap-3 px-2 md:gap-8">
                  <div className="flex flex-1 items-end justify-end gap-2 md:gap-3">
                    {left.map((p, i) => (
                      <BookSpine
                        key={p.id}
                        project={p}
                        delay={i * 0.08}
                        lean={si % 2 === 1 && i === 0 ? 7 : 0}
                        onOpen={setActive}
                        onHover={setHovering}
                      />
                    ))}
                  </div>

                  {/* shelf label sits up top, centered between the two books */}
                  <div className="w-40 shrink-0 self-start pt-1 text-center md:w-72">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-terracotta">
                      Shelf {si + 1}
                    </span>
                    <span className="mt-1 block text-base font-bold uppercase leading-tight tracking-[0.1em] text-ink/85 md:text-2xl">
                      {category}
                    </span>
                    <span className="mx-auto mt-2 block max-w-[11rem] text-[10px] font-normal leading-snug text-ink/55 md:max-w-[15rem] md:text-xs">
                      {subtitle}
                    </span>
                  </div>

                  <div className="flex flex-1 items-end justify-start gap-2 md:gap-3">
                    {right.map((p, i) => (
                      <BookSpine
                        key={p.id}
                        project={p}
                        delay={0.1 + i * 0.08}
                        lean={si % 2 === 0 && i === right.length - 1 ? -7 : 0}
                        onOpen={setActive}
                        onHover={setHovering}
                      />
                    ))}
                  </div>
                </div>

                {/* wooden ledge with soft drop shadow */}
                <div className="relative">
                  <div className="h-2.5 rounded-[3px] border-t border-ink/20 bg-gradient-to-b from-[#8B6F55] to-[#5E4936]" />
                  <div className="absolute inset-x-8 top-full h-4 bg-black/25 blur-md" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BookModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
