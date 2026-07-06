import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// The statement, word by word (bold flag for the lead-in).
const WORDS = [
  { t: 'Every', b: true },
  { t: 'book', b: true },
  { t: 'on' },
  { t: 'this' },
  { t: 'shelf' },
  { t: 'represents' },
  { t: 'a' },
  { t: 'challenge' },
  { t: 'solved' },
  { t: 'and' },
  { t: 'a' },
  { t: 'lesson' },
  { t: 'learned.' },
];

function Word({ text, bold, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.28em] inline-block ${bold ? 'font-bold' : 'font-light'}`}
    >
      {text}
    </motion.span>
  );
}

/**
 * Dark interlude between the hero and the shelf. Rises over the pinned hero
 * with the stepped podium edge. As the user scrolls through, the statement
 * lights up word by word (dim -> full opacity) and the line beneath draws
 * itself in — both tied directly to scroll position. Hands off to the cream
 * shelf through a rough hand-painted brush edge.
 */
export default function Statement() {
  const textRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ['start 0.85', 'end 0.45'],
  });

  // Words fill the first ~75% of the reveal; the line draws over the last part.
  const total = WORDS.length;
  const span = 0.75;
  const lineLength = useTransform(scrollYProgress, [0.72, 1], [0, 1]);

  return (
    <section className="relative">
      {/* stepped podium silhouette rising over the hero */}
      <div aria-hidden className="flex flex-col items-center">
        <div className="h-5 w-[36%] bg-ink md:h-8" />
        <div className="h-5 w-[58%] bg-ink md:h-8" />
        <div className="h-5 w-[80%] bg-ink md:h-8" />
      </div>

      <div className="relative bg-ink text-cream">
        {/* faint dot grid on dark */}
        <div
          aria-hidden
          className="absolute inset-0 [background-image:radial-gradient(rgba(247,241,237,0.08)_1px,transparent_1px)] [background-size:24px_24px]"
        />

        <div
          ref={textRef}
          className="relative flex min-h-screen flex-col items-center justify-center px-8 py-24 md:px-16"
        >
          <h2 className="mx-auto max-w-4xl text-center text-[1.75rem] leading-snug tracking-tight md:text-6xl md:leading-tight">
            {WORDS.map((w, i) => {
              const start = (i / total) * span;
              const end = start + span / total + 0.06;
              return (
                <Word
                  key={i}
                  text={w.t}
                  bold={w.b}
                  progress={scrollYProgress}
                  start={start}
                  end={Math.min(end, 1)}
                />
              );
            })}
          </h2>

          {/* flowing hand-drawn line, drawn in with scroll */}
          <svg
            viewBox="0 0 1200 200"
            fill="none"
            className="mt-10 w-full max-w-4xl text-cream/50 md:mt-16"
          >
            <motion.path
              d="M0 160 C 120 40, 260 185, 420 120 C 560 68, 620 30, 760 92 C 880 145, 980 180, 1100 108 C 1150 78, 1185 62, 1200 55"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: lineLength }}
            />
          </svg>
        </div>

        {/* rough brush edge: black hands off to the cream shelf */}
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          aria-hidden
          className="block h-10 w-full text-cream md:h-14"
        >
          <path
            fill="currentColor"
            d="M0,34 C 20,26 45,44 60,36 C 80,26 100,46 120,38 C 140,28 160,44 180,34
               C 200,24 225,42 240,36 C 260,30 280,48 300,40 C 320,30 340,24 360,32
               C 380,40 400,46 420,38 C 440,28 460,26 480,34 C 500,42 520,46 540,38
               C 560,28 580,24 600,30 C 620,36 640,46 660,40 C 680,32 700,24 720,30
               C 740,36 760,44 780,38 C 800,30 820,26 840,32 C 860,38 880,46 900,40
               C 920,32 940,26 960,30 C 980,34 1000,44 1020,38 C 1040,30 1060,24 1080,28
               C 1100,34 1120,44 1140,38 C 1160,30 1180,26 1200,32 C 1220,38 1240,46 1260,40
               C 1280,32 1300,26 1320,30 C 1340,34 1360,42 1380,36 C 1400,30 1420,28 1440,32
               L1440,60 L0,60 Z"
          />
        </svg>
      </div>
    </section>
  );
}
