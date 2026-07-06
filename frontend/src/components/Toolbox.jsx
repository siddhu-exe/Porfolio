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
    return <span className="text-base font-extrabold tracking-tight text-bark">{initials(name)}</span>;
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

/** A tool that hangs from a nail and swings when the cursor sweeps over it. */
function HangingTool({ name, slug, stringLen }) {
  const controls = useAnimationControls();

  const swing = () =>
    controls.start({
      rotate: [0, -13, 9, -6, 4, -2, 0],
      transition: { duration: 1.15, ease: 'easeOut' },
    });

  return (
    <div className="flex flex-col items-center">
      {/* nail head */}
      <div className="relative z-10 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-500 shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
        <span className="absolute inset-[2px] rounded-full bg-zinc-400/60" />
      </div>

      <motion.div
        className="-mt-1 flex flex-col items-center"
        style={{ transformOrigin: 'top center' }}
        animate={controls}
        onMouseEnter={swing}
      >
        {/* string */}
        <div className="w-px bg-tan/70" style={{ height: stringLen }} />

        {/* the hanging tag / key holding the icon */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-[0_6px_14px_rgba(0,0,0,0.45)] md:h-16 md:w-16">
          {/* punched hole the string threads through */}
          <span className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-bark/60 shadow-inner" />
          <ToolIcon name={name} slug={slug} />
        </div>

        <span className="mt-2 text-[11px] font-semibold tracking-wide text-tan md:text-xs">{name}</span>
      </motion.div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Toolbox() {
  // Stagger string lengths per column so the rack looks hand-hung, not gridded.
  const stringLens = [16, 26, 20, 30, 22];

  return (
    <section id="toolbox" className="relative overflow-hidden bg-bark text-cream">
      {/* transition in: a torn cream edge tears the cream shelf into the brown */}
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

      {/* dark-wood grain + vignette */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 [background:repeating-linear-gradient(90deg,rgba(0,0,0,0.25)_0px,rgba(0,0,0,0.25)_2px,transparent_2px,transparent_9px)]"
      />
      <div aria-hidden className="absolute inset-0 [background:radial-gradient(120%_80%_at_50%_0%,transparent,rgba(0,0,0,0.55))]" />

      <div className="relative px-4 pb-12 pt-4 md:px-10 md:pb-16 md:pt-6">
        <motion.header
          className="mx-auto mb-8 max-w-3xl text-center md:mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-cream md:text-5xl">
            Tools Behind Every Chapter
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-cream/60 md:text-base">
            The technologies that bring these ideas to life.
          </p>
        </motion.header>

        {/* the toolbox / pegboard panel, in the lighter brown — wide + shallow */}
        <motion.div
          className="relative mx-auto max-w-6xl rounded-3xl border-4 border-[#3A2517] bg-gradient-to-b from-wood to-[#563922] px-4 py-6 shadow-2xl md:px-10 md:py-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {/* plank seams */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-40 [background:repeating-linear-gradient(0deg,transparent_0,transparent_46px,rgba(0,0,0,0.25)_46px,rgba(0,0,0,0.25)_48px)]"
          />
          {/* inner frame */}
          <span className="pointer-events-none absolute inset-3 rounded-2xl border border-black/20" />

          <div className="relative grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-5 md:gap-x-6 md:gap-y-7">
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
