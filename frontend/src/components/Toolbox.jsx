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

// Warm accent chips, rotated deterministically by index (not random) so the
// rack reads as an intentional pattern: burnt orange, brick red, mustard gold.
const ACCENTS = ['#E85D2C', '#C73E3E', '#C9963C'];

// Cream used for glyphs, labels, borders and connectors across the section.
const CREAM = 'F0E6D2';

function ToolIcon({ name, slug }) {
  const [failed, setFailed] = useState(false);
  if (!slug || failed) {
    return <span className="text-sm font-extrabold tracking-tight text-[#F0E6D2]">{initials(name)}</span>;
  }
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${CREAM}`}
      alt={name}
      className="h-5 w-5 md:h-6 md:w-6"
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}

/** A tool hanging from a brass nail; sweeps of the cursor set it swinging. */
function HangingTool({ name, slug, stringLen, accent }) {
  const controls = useAnimationControls();

  const swing = () =>
    controls.start({
      rotate: [0, -10, 7, -4, 2, 0],
      transition: { duration: 1.1, ease: 'easeOut' },
    });

  return (
    <div className="flex flex-col items-center">
      {/* connector dot — cream at low opacity */}
      <div className="relative z-10 h-[7px] w-[7px] rounded-full bg-[#F0E6D2]/60 shadow-[0_1px_2px_rgba(0,0,0,0.7)]" />

      <motion.div
        className="flex flex-col items-center"
        style={{ transformOrigin: 'top center' }}
        animate={controls}
        onMouseEnter={swing}
      >
        {/* cord — cream at low opacity */}
        <div
          className="w-px bg-gradient-to-b from-[#F0E6D2]/40 to-[#F0E6D2]/15"
          style={{ height: stringLen }}
        />

        {/* accent chip holding the icon */}
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-[#F0E6D2]/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_18px_rgba(0,0,0,0.55)] md:h-14 md:w-14"
          style={{ backgroundColor: accent }}
        >
          <ToolIcon name={name} slug={slug} />
        </div>

        <span className="mt-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#A89680] md:text-[10px]">
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
  const stringLens = [10, 18, 13, 21, 15];

  return (
    <section id="toolbox" className="grain relative flex h-screen flex-col overflow-hidden bg-[#1A1410] text-[#F0E6D2]">
      {/* transition in: the cream shelf tears down into the espresso */}
      <svg
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        aria-hidden
        className="relative z-10 block h-6 w-full shrink-0 text-cream md:h-9"
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

      <div className="relative flex min-h-0 flex-1 flex-col justify-center px-4 py-4 md:px-10 md:py-6">
        <motion.header
          className="mx-auto mb-5 max-w-3xl shrink-0 text-center md:mb-7"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#E85D2C] md:text-sm">
            02 &mdash; The Workshop
          </p>
          <h2 className="font-display text-2xl font-bold tracking-tight text-[#F0E6D2] md:text-4xl">
            Tools Behind Every Chapter
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-xs text-[#A89680] md:text-sm">
            The technologies that bring these ideas to life.
          </p>
        </motion.header>

        {/* walnut rack panel */}
        <motion.div
          className="relative mx-auto w-full max-w-4xl shrink-0 rounded-2xl bg-[#241C16] px-4 py-5 ring-1 ring-[#F0E6D2]/20 shadow-[0_30px_60px_rgba(0,0,0,0.6)] md:px-10 md:py-7"
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
          <span className="pointer-events-none absolute inset-2 rounded-xl border border-[#F0E6D2]/10" />
          <Screw className="left-3 top-3" />
          <Screw className="right-3 top-3" />
          <Screw className="bottom-3 left-3" />
          <Screw className="bottom-3 right-3" />

          <div className="relative grid grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-5 md:gap-x-5 md:gap-y-6">
            {TOOLS.map((t, i) => (
              <HangingTool
                key={t.name}
                name={t.name}
                slug={t.slug}
                stringLen={stringLens[i % stringLens.length]}
                accent={ACCENTS[i % ACCENTS.length]}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
