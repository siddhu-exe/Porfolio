import { useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

// name -> simpleicons slug (rendered in original brand colors via CDN).
// null slug falls back to an initials tile (e.g. XGBoost has no brand icon).
const TOOLS = [
  { name: 'Python', slug: 'python' },
  { name: 'SQL', slug: 'mysql' },
  { name: 'FastAPI', slug: 'fastapi' },
  { name: 'React', slug: 'react' },
  { name: 'TensorFlow', slug: 'tensorflow' },
  { name: 'XGBoost', slug: null },
  { name: 'Pandas', slug: 'pandas' },
  { name: 'NumPy', slug: 'numpy' },
  { name: 'MongoDB', slug: 'mongodb' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Git', slug: 'git' },
  { name: 'Linux', slug: 'linux' },
  { name: 'AWS', slug: 'amazonwebservices' },
  { name: 'OpenCV', slug: 'opencv' },
  { name: 'Scikit-learn', slug: 'scikitlearn' },
];

function initials(name) {
  return name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 3).toUpperCase();
}

function ToolIcon({ name, slug }) {
  const [failed, setFailed] = useState(false);
  if (!slug || failed) {
    return <span className="text-sm font-extrabold tracking-tight text-cream/80">{initials(name)}</span>;
  }
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt={name}
      className="h-7 w-7 md:h-8 md:w-8"
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}

/** A tool hanging from a brass nail; sweeps of the cursor set it swinging. */
function HangingTool({ name, slug, stringLen }) {
  const controls = useAnimationControls();

  const swing = () =>
    controls.start({
      rotate: [0, -10, 7, -4, 2, 0],
      transition: { duration: 1.1, ease: 'easeOut' },
    });

  return (
    <div className="flex flex-col items-center">
      {/* brass nail head */}
      <div className="relative z-10 h-[7px] w-[7px] rounded-full bg-gradient-to-br from-[#E8CFA0] to-[#8A6A3B] shadow-[0_1px_2px_rgba(0,0,0,0.7)]" />

      <motion.div
        className="flex flex-col items-center"
        style={{ transformOrigin: 'top center' }}
        animate={controls}
        onMouseEnter={swing}
      >
        {/* cord */}
        <div
          className="w-px bg-gradient-to-b from-white/30 to-white/10"
          style={{ height: stringLen }}
        />

        {/* matte tile holding the icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#241609] ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_12px_22px_rgba(0,0,0,0.55)] md:h-[4.4rem] md:w-[4.4rem]">
          <ToolIcon name={name} slug={slug} />
        </div>

        <span className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/45">
          {name}
        </span>
      </motion.div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/** Small brass screw pinning the panel's corners. */
function Screw({ className }) {
  return (
    <span
      aria-hidden
      className={`absolute h-2 w-2 rounded-full bg-gradient-to-br from-[#D9BE8C] to-[#77572F] shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${className}`}
    >
      <span className="absolute left-1/2 top-1/2 h-px w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black/50" />
    </span>
  );
}

export default function Toolbox() {
  // Stagger cord lengths per column so the rack looks hand-hung, not gridded.
  const stringLens = [14, 24, 18, 28, 20];

  return (
    <section id="toolbox" className="relative overflow-hidden bg-bark text-cream">
      {/* transition in: the cream shelf tears down into the espresso */}
      <svg
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        aria-hidden
        className="relative z-10 block h-8 w-full text-cream md:h-12"
      >
        <path
          fill="currentColor"
          d="M0,0 L1440,0 L1440,30 C 1400,42 1360,26 1320,36 C 1280,46 1240,28 1200,34
             C 1160,40 1120,50 1080,40 C 1040,30 1000,26 960,34 C 920,42 880,48 840,38
             C 800,28 760,26 720,32 C 680,38 640,50 600,42 C 560,34 520,26 480,32
             C 440,38 400,48 360,40 C 320,32 280,26 240,34 C 200,42 160,50 120,40
             C 80,30 40,28 0,36 Z"
        />
      </svg>

      {/* soft vignette, no stripes */}
      <div
        aria-hidden
        className="absolute inset-0 [background:radial-gradient(110%_90%_at_50%_10%,rgba(199,160,121,0.08),transparent_55%),radial-gradient(120%_80%_at_50%_100%,rgba(0,0,0,0.6),transparent)]"
      />

      <div className="relative px-4 pb-14 pt-4 md:px-10 md:pb-20 md:pt-6">
        <motion.header
          className="mx-auto mb-8 max-w-3xl text-center md:mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-cream md:text-5xl">
            Tools Behind Every Chapter
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-cream/55 md:text-base">
            The technologies that bring these ideas to life.
          </p>
        </motion.header>

        {/* walnut rack panel */}
        <motion.div
          className="relative mx-auto max-w-5xl rounded-2xl bg-gradient-to-b from-barklight to-[#1F1207] px-5 py-7 ring-1 ring-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] md:px-12 md:py-9"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {/* faint wood grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-30 [background:repeating-linear-gradient(93deg,transparent_0,transparent_18px,rgba(0,0,0,0.28)_18px,rgba(0,0,0,0.28)_19px)]"
          />
          {/* inner bevel */}
          <span className="pointer-events-none absolute inset-2 rounded-xl border border-white/5" />
          <Screw className="left-3 top-3" />
          <Screw className="right-3 top-3" />
          <Screw className="bottom-3 left-3" />
          <Screw className="bottom-3 right-3" />

          <div className="relative grid grid-cols-3 gap-x-3 gap-y-7 sm:grid-cols-5 md:gap-x-6 md:gap-y-8">
            {TOOLS.map((t, i) => (
              <HangingTool
                key={t.name}
                name={t.name}
                slug={t.slug}
                stringLen={stringLens[i % stringLens.length]}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
