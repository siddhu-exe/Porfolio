import { useEffect, useState } from 'react';
import Signature from './Signature.jsx';

const SOCIALS = [
  { label: 'GitHub', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
  { label: 'Instagram', href: '#' },
];

/**
 * Fixed to the viewport bottom BEHIND the page (z-0 vs main's z-10). The page
 * content scrolls up and off it — same stage-like, scroll-linked reveal as the
 * hero -> shelf transition, mirrored.
 */
export default function Footer({ onReachOut }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 z-0 flex h-screen w-full flex-col overflow-hidden bg-mustard">
      {/* denser dot grid on yellow */}
      <div
        aria-hidden
        className="absolute inset-0 [background-image:radial-gradient(rgba(23,23,23,0.16)_1.5px,transparent_1.5px)] [background-size:26px_26px]"
      />

      <div className="relative flex min-h-0 flex-1 flex-col px-8 pt-6 md:px-16">
        {/* top bar: socials + email */}
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest text-ink/70 md:text-xs">
          <div className="flex gap-4 md:gap-6">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} className="transition-colors hover:text-ink">
                {s.label}
              </a>
            ))}
          </div>
          <a href="mailto:hello@siddharth.dev" className="transition-colors hover:text-ink">
            hello@siddharth.dev
          </a>
        </div>

        {/* ghost name with the signature floating over it */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          <h2 className="select-none text-center font-bold leading-[0.95] tracking-headline text-[#E0C336]">
            <span className="block text-[11vw]">SIDDHARTH</span>
            <span className="block text-[11vw]">DONGARDIVE</span>
          </h2>
          <Signature className="absolute w-[200px] md:w-[300px]" />
        </div>
      </div>

      {/* cream strip */}
      <div className="relative border-t border-ink/15 bg-cream px-8 py-7 md:px-16 md:py-9">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-ink/60">Let&apos;s build something</p>
            <h3 className="mt-1 text-3xl font-bold leading-[1.02] tracking-headline text-ink md:text-5xl">
              MEANINGFUL
              <br />
              AND MEMORABLE
            </h3>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <span className="text-sm text-ink/60">Reach out</span>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink/30 text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink/30 text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4v15h-4V8zm7.5 0h3.8v2.05h.06c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V23h-4v-7.9c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.17V23H8V8z" />
                </svg>
              </a>
              <button
                onClick={onReachOut}
                aria-label="Send a message"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink/30 text-xl font-bold text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                @
              </button>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-1.5 border-t border-ink/10 pt-4 text-xs font-medium text-ink/60 md:flex-row md:items-center md:justify-between">
          <a
            href="https://www.nithinmwarrier.com/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            Inspired by <span className="font-bold text-ink/80">Nithin M Warrier</span>
          </a>
          <span>© {new Date().getFullYear()} Siddharth Dongardive</span>
          <span>India {time}</span>
          <span>
            Created with <span className="font-bold text-ink/80">Claude Code</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
