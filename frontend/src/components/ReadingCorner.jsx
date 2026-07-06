import { motion } from 'framer-motion';

// Swap `url` for the real Medium links when published.
const ARTICLES = [
  {
    emoji: '📕',
    title: 'Bagging',
    tag: 'Ensemble Learning',
    blurb: 'How bootstrap aggregation tames variance.',
    color: '#B23A32',
    url: 'https://medium.com/',
  },
  {
    emoji: '📗',
    title: 'Random Forest',
    tag: 'From Trees to Forests',
    blurb: 'Why many weak trees beat one deep one.',
    color: '#2E7D57',
    url: 'https://medium.com/',
  },
  {
    emoji: '📘',
    title: 'Logistic Regression',
    tag: 'The Classic Classifier',
    blurb: 'The workhorse behind probability outputs.',
    color: '#2F5FA8',
    url: 'https://medium.com/',
  },
];

const EASE = [0.22, 1, 0.36, 1];

const rest = { rotateY: -32, y: 0 };
const hover = { rotateY: 0, y: -18 };

function ArticleBook({ article, index }) {
  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noreferrer"
      className="group relative block"
      style={{ perspective: 1300 }}
      initial="rest"
      whileInView="rest"
      whileHover="hover"
      viewport={{ once: true }}
      aria-label={`Read "${article.title}" on Medium`}
    >
      {/* floor shadow that spreads as the book lifts */}
      <motion.div
        aria-hidden
        className="absolute inset-x-6 bottom-[-14px] h-4 rounded-[50%] bg-black blur-md"
        variants={{ rest: { opacity: 0.5, scaleX: 0.9 }, hover: { opacity: 0.75, scaleX: 1.1 } }}
        transition={{ duration: 0.5, ease: EASE }}
      />

      <motion.div
        className="relative h-64 w-44"
        style={{ transformStyle: 'preserve-3d' }}
        variants={{ rest, hover }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        {/* pages (right side) */}
        <div
          className="absolute right-0 top-0 h-full w-5 rounded-r-sm bg-gradient-to-l from-[#efe7d8] to-[#cfc4ad]"
          style={{ transform: 'rotateY(90deg)', transformOrigin: 'right center' }}
        >
          <div className="h-full w-full [background:repeating-linear-gradient(0deg,transparent_0,transparent_3px,rgba(0,0,0,0.12)_3px,rgba(0,0,0,0.12)_4px)]" />
        </div>

        {/* spine (left side) — carries the title until the book turns face-on */}
        <div
          className="absolute left-0 top-0 flex h-full w-6 items-center justify-center rounded-l-sm"
          style={{ backgroundColor: article.color, transform: 'rotateY(-90deg)', transformOrigin: 'left center' }}
        >
          <span className="absolute inset-0 bg-black/25" />
          <span className="book-title relative max-h-[80%] overflow-hidden whitespace-nowrap text-[10px] font-semibold tracking-wide text-white/90">
            {article.title}
          </span>
        </div>

        {/* front cover */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-l-sm rounded-r-md p-4 shadow-[0_18px_40px_rgba(0,0,0,0.6)]"
          style={{ backgroundColor: article.color, backfaceVisibility: 'hidden' }}
        >
          {/* dark spine gutter + emboss frame */}
          <span className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 to-transparent" />
          <span className="pointer-events-none absolute inset-2.5 rounded-md border border-white/20" />

          <div className="relative flex items-start justify-between">
            <span className="text-3xl drop-shadow">{article.emoji}</span>
            <span className="mt-1 rounded-full bg-black/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-white/80">
              Article
            </span>
          </div>

          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
              {article.tag}
            </p>
            <h3 className="mt-1 text-lg font-bold leading-tight tracking-tight text-white">
              {article.title}
            </h3>
            <p className="mt-1 text-[11px] leading-snug text-white/70">{article.blurb}</p>

            <div className="mt-3 flex items-center justify-between">
              {/* faux barcode for book-jacket flavor */}
              <span className="flex items-end gap-[2px]" aria-hidden>
                {[3, 6, 2, 5, 3, 7, 2, 4, 6, 3].map((h, k) => (
                  <span key={k} className="w-[2px] bg-white/70" style={{ height: h + 6 }} />
                ))}
              </span>
              <span className="text-[10px] font-semibold text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Read&nbsp;&#8599;
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function ReadingCorner() {
  return (
    <section id="reading" className="relative overflow-hidden bg-black text-cream">
      {/* transition in: brown Toolbox tears down into the black */}
      <svg
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        aria-hidden
        className="relative z-10 block h-8 w-full text-bark md:h-12"
      >
        <path
          fill="currentColor"
          d="M0,0 L1440,0 L1440,32 C 1400,44 1360,26 1320,36 C 1280,46 1240,28 1200,34
             C 1160,40 1120,50 1080,40 C 1040,30 1000,26 960,34 C 920,42 880,48 840,38
             C 800,28 760,26 720,32 C 680,38 640,50 600,42 C 560,34 520,26 480,32
             C 440,38 400,48 360,40 C 320,32 280,26 240,34 C 200,42 160,50 120,40
             C 80,30 40,28 0,36 Z"
        />
      </svg>

      {/* faint dot grid on black */}
      <div
        aria-hidden
        className="absolute inset-0 [background-image:radial-gradient(rgba(247,241,237,0.06)_1px,transparent_1px)] [background-size:26px_26px]"
      />

      <div className="relative px-6 pb-24 pt-8 md:px-16 md:pb-32 md:pt-12">
        <motion.header
          className="mx-auto mb-16 max-w-2xl text-center md:mb-24"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 className="text-4xl font-bold tracking-tight text-cream md:text-6xl">Reading Corner</h2>
          <svg viewBox="0 0 220 12" className="mx-auto mt-4 w-40 text-terracotta">
            <path d="M2 8 C 30 2, 50 10, 80 6 S 140 2, 218 6" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-cream/60 md:text-base">
            Sharing what I learn through articles, tutorials, and engineering insights.
          </p>
        </motion.header>

        <motion.div
          className="mx-auto flex max-w-4xl flex-wrap items-end justify-center gap-x-14 gap-y-16 md:gap-x-24"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {ARTICLES.map((a, i) => (
            <ArticleBook key={a.title} article={a} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
