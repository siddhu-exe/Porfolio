import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { subscribeToScrollProgress } from './SmoothScroll.jsx';

const TOTAL_PAGES = 6;

export default function BookmarkProgress({ visible }) {
  const fillRef = useRef(null);
  const tabRef = useRef(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!visible) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fillTo = gsap.quickTo(fillRef.current, 'scaleY', {
      duration: reduceMotion ? 0 : 0.16,
      ease: 'power2.out',
    });
    const tabTo = gsap.quickTo(tabRef.current, 'y', {
      duration: reduceMotion ? 0 : 0.16,
      ease: 'power2.out',
    });

    return subscribeToScrollProgress((progress) => {
      fillTo(progress);
      tabTo(progress * (window.innerHeight - 20));
      setPage(Math.min(TOTAL_PAGES, Math.floor(progress * TOTAL_PAGES) + 1));
    });
  }, [visible]);

  return (
    <aside
      aria-label={`Reading progress: page ${page} of ${TOTAL_PAGES}`}
      className={`group pointer-events-none fixed bottom-0 right-[6px] top-0 z-[70] transition-opacity duration-300 md:right-[18px] ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="absolute bottom-0 right-0 top-0 w-1 bg-cream/35 ring-1 ring-ink/10">
        <div
          ref={fillRef}
          className="absolute inset-x-0 top-0 h-full origin-top scale-y-0 bg-mustard will-change-transform"
        />
      </div>

      <div
        ref={tabRef}
        className="pointer-events-auto absolute right-[-5px] top-0 h-5 w-3.5 -translate-y-1 will-change-transform"
      >
        <span className="absolute inset-0 bg-mustard [clip-path:polygon(0_0,100%_0,100%_100%,50%_72%,0_100%)]" />
        <span className="absolute right-5 top-1/2 hidden -translate-y-1/2 whitespace-nowrap bg-ink px-2 py-1 text-[10px] uppercase text-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block">
          Page {page} of {TOTAL_PAGES}
        </span>
      </div>
    </aside>
  );
}
