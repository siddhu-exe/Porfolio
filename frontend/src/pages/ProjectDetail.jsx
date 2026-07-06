import { useParams, Link } from 'react-router-dom';

/**
 * Placeholder detail page. The real per-project layout is a later phase — this
 * just proves the /projects/:slug route + navigation are wired up.
 */
export default function ProjectDetail() {
  const { slug } = useParams();
  const title = slug
    .split('-')
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <main className="dot-grid flex min-h-screen flex-col items-center justify-center px-8 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-terracotta">
        Project
      </p>
      <h1 className="mt-3 text-5xl font-bold tracking-headline text-ink md:text-7xl">
        {title}
      </h1>
      <p className="mt-5 max-w-md text-ink/60">
        The full project write-up is coming soon. This page is a placeholder for
        the detailed case study.
      </p>
      <Link
        to="/"
        className="mt-10 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-transform hover:scale-105"
      >
        &larr; Back to shelf
      </Link>
    </main>
  );
}
