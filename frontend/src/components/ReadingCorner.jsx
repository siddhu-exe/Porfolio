import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Swap `url` for the real Medium links when published.
const ARTICLES = [
  {
    title: 'Bagging',
    tag: 'Ensemble Learning',
    blurb: 'How bootstrap aggregation tames variance.',
    color: '#8F3A31',
    url: 'https://medium.com/',
  },
  {
    title: 'Random Forest',
    tag: 'From Trees to Forests',
    blurb: 'Why many weak trees beat one deep one.',
    color: '#2E6149',
    url: 'https://medium.com/',
  },
  {
    title: 'Logistic Regression',
    tag: 'The Classic Classifier',
    blurb: 'The workhorse behind probability outputs.',
    color: '#2F5170',
    url: 'https://medium.com/',
  },
];

const EASE = [0.22, 1, 0.36, 1];

const rest = { rotateY: -30, y: 0 };
const hover = { rotateY: 0, y: -16 };

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
      {/* contact shadow on the ledge, spreading as the book lifts */}
      <motion.div
        aria-hidden
        className="absolute inset-x-5 bottom-[-12px] h-3 rounded-[50%] bg-black blur-md"
        variants={{ rest: { opacity: 0.55, scaleX: 0.92 }, hover: { opacity: 0.8, scaleX: 1.12 } }}
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
          <span className="absolute inset-0 bg-black/30" />
          <span className="absolute inset-x-1 top-2 h-px bg-white/25" />
          <span className="absolute inset-x-1 bottom-2 h-px bg-white/25" />
          <span className="book-title relative max-h-[78%] overflow-hidden whitespace-nowrap text-[10px] font-semibold tracking-[0.12em] text-white/90">
            {article.title}
          </span>
        </div>

        {/* front cover — editorial jacket */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-l-sm rounded-r-md p-4 shadow-[0_18px_40px_rgba(0,0,0,0.65)]"
          style={{ backgroundColor: article.color, backfaceVisibility: 'hidden' }}
        >
          {/* cloth texture + tonal depth */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/25" />
          <span className="pointer-events-none absolute inset-0 opacity-20 [background:repeating-linear-gradient(45deg,transparent_0,transparent_3px,rgba(255,255,255,0.05)_3px,rgba(255,255,255,0.05)_4px)]" />
          {/* spine gutter + foil frame */}
          <span className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/45 to-transparent" />
          <span className="pointer-events-none absolute inset-2.5 rounded-[4px] border border-white/25" />

          <div className="relative flex h-full flex-col p-1.5">
            {/* masthead */}
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/60">
              Article {String(index + 1).padStart(2, '0')}
            </p>
            <span className="mt-2 h-px w-8 bg-white/40" />

            {/* title block */}
            <div className="mt-auto">
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55">
                {article.tag}
              </p>
              <h3 className="mt-1.5 text-[1.35rem] font-bold leading-[1.08] tracking-tight text-white">
                {article.title}
              </h3>
              <p className="mt-2 text-[10.5px] leading-snug text-white/65">{article.blurb}</p>
            </div>

            {/* colophon */}
            <div className="mt-4 flex items-end justify-between border-t border-white/20 pt-2">
              <span className="text-[8.5px] font-semibold uppercase tracking-[0.2em] text-white/60">
                S. Dongardive
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  useGSAP(
    () => {
      const articles = gsap.utils.toArray('.latest-read-item', listRef.current);
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduceMotion) {
        gsap.set(articles, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        articles,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.44,
          ease: 'power2.out',
          stagger: 0.07,
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 80%',
            once: true,
          },
          onComplete: () => gsap.set(articles, { clearProps: 'transform,opacity' }),
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="reading" className="grain relative overflow-hidden bg-black text-cream">
      {/* The Toolbox → Reading Corner seam is drawn by <ScrollMorphEdge> in
          Home.jsx (a velocity-reactive morphing curve), so there is no static
          edge here. Top padding below leaves room for that overlay. */}

      {/* faint dot grid on black */}
      <div
        aria-hidden
        className="absolute inset-0 [background-image:radial-gradient(rgba(247,241,237,0.06)_1px,transparent_1px)] [background-size:26px_26px]"
      />

      <div className="relative px-6 pb-24 pt-10 md:px-16 md:pb-32 md:pt-14">
        <motion.header
          className="mx-auto mb-14 max-w-2xl text-center md:mb-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-terracotta md:text-sm">
            03 &mdash; The Reading Corner
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-cream md:text-6xl">Reading Corner</h2>
          <svg viewBox="0 0 220 12" className="mx-auto mt-4 w-40 text-terracotta">
            <path d="M2 8 C 30 2, 50 10, 80 6 S 140 2, 218 6" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-cream/60 md:text-base">
            Sharing what I learn through articles, tutorials, and engineering insights.
          </p>
        </motion.header>

        <div className="mx-auto max-w-4xl">
          <div ref={listRef} className="flex flex-wrap items-end justify-center gap-x-14 gap-y-16 md:gap-x-24">
            {ARTICLES.map((a, i) => (
              <div key={a.title} className="latest-read-item">
                <ArticleBook article={a} index={i} />
              </div>
            ))}
          </div>

          {/* wooden ledge the books stand on */}
          <div className="relative mt-3">
            <div className="h-2.5 rounded-[3px] border-t border-white/20 bg-gradient-to-b from-[#8B6F55] to-[#5E4936]" />
            <div className="absolute inset-x-10 top-full h-5 bg-black/80 blur-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
