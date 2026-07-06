import { useState } from 'react';
import { motion } from 'framer-motion';
import BookSpine from './BookSpine.jsx';
import BookModal from './BookModal.jsx';
import CursorBadge from './CursorBadge.jsx';

const CATEGORY_ORDER = ['SQL', 'Machine Learning', 'Deep Learning', 'NLP', 'AI Agents'];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * The black stage. It scrolls up OVER the pinned hero (see Home.jsx), so its
 * stepped podium top edge rises into view like a stage being raised.
 */
export default function ProjectShelf({ projects }) {
  const [active, setActive] = useState(null);
  const [hovering, setHovering] = useState(false);

  const shelves = CATEGORY_ORDER.map((category) => ({
    category,
    books: projects.filter((p) => p.category === category),
  }));

  return (
    <section id="shelf" className="relative">
      <CursorBadge active={hovering} className="h-16 w-16 bg-mustard text-sm text-ink">
        Click
      </CursorBadge>

      {/* Stepped podium silhouette rising over the hero */}
      <div aria-hidden className="flex flex-col items-center">
        <div className="h-5 w-[36%] bg-ink md:h-8" />
        <div className="h-5 w-[58%] bg-ink md:h-8" />
        <div className="h-5 w-[80%] bg-ink md:h-8" />
      </div>

      <div className="bg-ink px-8 pb-28 pt-16 text-cream md:px-16 md:pb-36 md:pt-24">
        <motion.header
          className="mx-auto mb-16 max-w-3xl text-center md:mb-24"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
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
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-cream/60 md:text-base">
            Every project on this shelf represents a challenge, an idea, and the journey
            of turning code into real-world solutions.
          </p>
        </motion.header>

        <div className="mx-auto max-w-3xl">
          {shelves.map(({ category, books }, si) => {
            const mid = Math.ceil(books.length / 2);
            const left = books.slice(0, mid);
            const right = books.slice(mid);
            return (
              <div key={category} className="mb-14 md:mb-20">
                <div className="flex items-end justify-center gap-4 px-2 md:gap-10">
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

                  <div className="pb-4 text-center">
                    <span className="block text-[10px] font-semibold tracking-[0.35em] text-terracotta">
                      {String(si + 1).padStart(2, '0')}
                    </span>
                    <span className="mt-1 block min-w-[6.5rem] text-base font-semibold uppercase tracking-[0.18em] text-cream/90 md:min-w-[13rem] md:text-2xl">
                      {category}
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

                {/* shelf ledge with soft drop shadow */}
                <div className="relative">
                  <div className="h-2.5 rounded-[3px] border-t border-cream/25 bg-gradient-to-b from-neutral-600 to-neutral-800" />
                  <div className="absolute inset-x-8 top-full h-5 bg-black/70 blur-lg" />
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
