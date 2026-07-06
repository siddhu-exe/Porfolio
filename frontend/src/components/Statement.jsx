import { motion } from 'framer-motion';

/**
 * Dark interlude between the hero and the shelf. Rises over the pinned hero
 * with the stepped podium edge, holds the big statement line (reference:
 * "4+ years of crafting…"), then hands off to the cream shelf section through
 * a rough hand-painted brush edge — a color shift, not a transition.
 */
export default function Statement() {
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

        <div className="relative flex min-h-screen flex-col items-center justify-center px-8 py-24 md:px-16">
          <div className="flex w-full items-center gap-6 md:gap-12">
            <span className="hidden h-px flex-1 bg-cream/25 md:block" />
            <motion.h2
              className="mx-auto max-w-4xl text-center text-[1.75rem] font-light leading-snug tracking-tight md:text-6xl md:leading-tight"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-bold">Every book</span> on this shelf represents
              a challenge solved and a lesson learned.
            </motion.h2>
            <span className="hidden h-px flex-1 bg-cream/25 md:block" />
          </div>

          {/* flowing hand-drawn line, drawn in on scroll */}
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
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
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
