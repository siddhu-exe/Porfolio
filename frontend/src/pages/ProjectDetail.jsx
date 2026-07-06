import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchProject } from '../api.js';
import { fallbackProjects } from '../data/fallbackProjects.js';
import { usePageTransition } from '../components/PageTransition.jsx';

const EASE = [0.22, 1, 0.36, 1];

// Category -> approach steps, mirrored for the offline fallback.
const APPROACH_STEPS = {
  'Data Analytics': ['Collect', 'Clean', 'Explore', 'Insight'],
  'Data Visualization': ['Model Data', 'Design', 'Build', 'Publish'],
  'Machine Learning': ['Data Prep', 'Features', 'Train', 'Evaluate', 'Tune'],
  'Deep Learning': ['Collect', 'Augment', 'Build CNN', 'Train', 'Validate'],
  'AI Applications': ['Ingest', 'Embed', 'Retrieve', 'Generate', 'Serve'],
};

// Fill case-study fields for a bare fallback project so the page still renders.
function enrich(p) {
  const steps = (APPROACH_STEPS[p.category] || ['Explore', 'Build', 'Ship']).map((label) => ({ label }));
  return {
    subtitle: p.subtitle || `${p.description.split('.')[0]}.`,
    heroImage: p.heroImage || null,
    problem: p.problem || p.description,
    data: p.data || { text: 'A curated dataset assembled and cleaned for this project.', visual: null },
    approach: p.approach || { steps },
    result: p.result || { metric: '—', label: 'headline outcome', visual: null },
    reflection: p.reflection || 'Every project on the shelf leaves a lesson behind.',
    links: p.links || { github: null, demo: null },
    ...p,
  };
}

function SectionLabel({ children }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-2 w-2 rounded-full bg-terracotta" />
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">{children}</span>
    </div>
  );
}

function Framed({ src, alt, color, ratio = 'aspect-[16/9]' }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-ink/15 shadow-sm ${ratio}`}
      style={{ backgroundColor: color }}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <div className="flex h-full w-full items-center justify-center px-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-cream/90">{alt}</span>
        </div>
      )}
    </div>
  );
}

/** Data-driven horizontal step flow; goes vertical below md. */
function StepFlow({ steps }) {
  const inset = `${50 / steps.length}%`;
  return (
    <>
      {/* horizontal */}
      <div className="hidden md:block">
        <div className="relative flex justify-between">
          <span className="absolute top-5 h-px bg-ink/20" style={{ left: inset, right: inset }} />
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative z-10 flex flex-1 flex-col items-center px-2 text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/25 bg-cream text-sm font-bold text-ink">
                {i + 1}
              </span>
              <span className="mt-3 text-sm font-medium text-ink/80">{step.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* vertical */}
      <ol className="relative ml-1 space-y-6 border-l border-ink/20 pl-8 md:hidden">
        {steps.map((step, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[2.6rem] flex h-9 w-9 items-center justify-center rounded-full border border-ink/25 bg-cream text-sm font-bold text-ink">
              {i + 1}
            </span>
            <span className="text-base font-medium text-ink/80">{step.label}</span>
          </li>
        ))}
      </ol>
    </>
  );
}

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function Section({ children, className = '' }) {
  return (
    <motion.section
      className={`border-t border-ink/10 py-14 md:py-20 ${className}`}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.section>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const transitionTo = usePageTransition();
  const [project, setProject] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ok | missing

  useEffect(() => {
    let alive = true;
    setStatus('loading');
    fetchProject(slug)
      .then((p) => alive && (setProject(p), setStatus('ok')))
      .catch(() => {
        const fb = fallbackProjects.find((p) => p.slug === slug);
        if (!alive) return;
        if (fb) {
          setProject(enrich(fb));
          setStatus('ok');
        } else {
          setStatus('missing');
        }
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  const goBack = () =>
    transitionTo('/', { color: '#171717', title: 'Back to the Shelf', category: 'The Library' });

  if (status === 'loading') {
    return (
      <main className="dot-grid flex min-h-screen items-center justify-center bg-cream">
        <span className="text-sm uppercase tracking-widest text-ink/40">Opening…</span>
      </main>
    );
  }

  if (status === 'missing') {
    return (
      <main className="dot-grid flex min-h-screen flex-col items-center justify-center gap-6 bg-cream px-8 text-center">
        <h1 className="text-4xl font-bold tracking-headline text-ink">Chapter not found</h1>
        <button onClick={goBack} className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-transform hover:scale-105">
          &larr; Back to the Shelf
        </button>
      </main>
    );
  }

  const chapter = String(Math.ceil((project.id || 1) / 2)).padStart(2, '0');
  const hasDemo = project.links?.demo;
  const hasGithub = project.links?.github;

  return (
    <motion.main
      className="dot-grid min-h-screen bg-cream text-ink"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className="mx-auto max-w-4xl px-8 md:px-16">
        {/* 1. Nav row */}
        <div className="flex items-center justify-between py-6 text-xs font-semibold uppercase tracking-widest text-ink/60">
          <button onClick={goBack} className="transition-colors hover:text-ink">
            &larr; Back to Shelf
          </button>
          <span className="text-ink/40">Chapter {chapter}</span>
        </div>

        {/* 2. Header block */}
        <header className="border-t border-ink/10 pb-10 pt-12 md:pb-14 md:pt-16">
          <span className="inline-block rounded-full border border-ink/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-ink/70">
            {project.category}
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[0.95] tracking-headline text-ink md:text-7xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-ink/60 md:text-xl">
            {project.subtitle}
          </p>
        </header>

        {/* 3. Hero visual */}
        <motion.div variants={reveal} initial="hidden" animate="show">
          <Framed src={project.heroImage} alt={project.title} color={project.color} ratio="aspect-[16/9]" />
        </motion.div>

        {/* 4. The Problem */}
        <Section>
          <SectionLabel>The Problem</SectionLabel>
          <p className="max-w-2xl text-lg leading-relaxed text-ink/80">{project.problem}</p>
        </Section>

        {/* 5. The Data */}
        <Section>
          <SectionLabel>The Data</SectionLabel>
          {project.data?.visual ? (
            <div className="grid items-center gap-8 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-ink/80">{project.data.text}</p>
              <Framed src={project.data.visual} alt={`${project.category} — Data`} color={project.color} ratio="aspect-[4/3]" />
            </div>
          ) : (
            <p className="max-w-2xl text-lg leading-relaxed text-ink/80">{project.data?.text}</p>
          )}
        </Section>

        {/* 6. The Approach */}
        <Section>
          <SectionLabel>The Approach</SectionLabel>
          <div className="mt-8">
            <StepFlow steps={project.approach?.steps || []} />
          </div>
        </Section>

        {/* 7. The Result */}
        <Section>
          <SectionLabel>The Result</SectionLabel>
          <div className="flex flex-col gap-2">
            <span className="text-7xl font-bold tracking-headline text-ink md:text-8xl">
              {project.result?.metric}
            </span>
            <span className="max-w-md text-base text-ink/60">{project.result?.label}</span>
          </div>
          {project.result?.visual && (
            <div className="mt-10">
              <Framed src={project.result.visual} alt={`${project.title} — Result`} color={project.color} ratio="aspect-[16/9]" />
            </div>
          )}
        </Section>

        {/* 8. The Reflection */}
        <Section>
          <SectionLabel>The Reflection</SectionLabel>
          <p className="max-w-xl text-lg font-light leading-loose text-ink/75">{project.reflection}</p>
        </Section>

        {/* 9. Closing row */}
        <Section className="pb-0">
          <div className="flex flex-wrap items-center gap-3">
            {hasGithub && (
              <a href={project.links.github} target="_blank" rel="noreferrer" className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-transform hover:scale-105">
                GitHub &#8599;
              </a>
            )}
            {hasDemo && (
              <a href={project.links.demo} target="_blank" rel="noreferrer" className="rounded-full border border-ink/25 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-cream">
                Live Demo &#8599;
              </a>
            )}
          </div>

          {project.tech_stack?.length > 0 && (
            <div className="mt-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-ink/40">Built with</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech_stack.map((t) => (
                  <span key={t} className="rounded-full border border-ink/20 px-3 py-1 text-xs font-medium text-ink/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Section>

        {/* bottom back link */}
        <div className="border-t border-ink/10 py-14 text-center">
          <button onClick={goBack} className="rounded-full bg-ink px-7 py-3 text-sm font-semibold text-cream transition-transform hover:scale-105">
            &larr; Back to the Shelf
          </button>
        </div>
      </div>
    </motion.main>
  );
}
