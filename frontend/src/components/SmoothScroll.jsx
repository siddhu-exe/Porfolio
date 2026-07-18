import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Active Lenis instance (null on touch devices / reduced motion, where native
// scroll is used instead). Nav clicks route through scrollToSection below so
// they glide through Lenis's pipeline instead of fighting it with native
// scrollIntoView (normalizeScroll intercepts native smooth scrolling).
let lenisInstance = null;

/**
 * Smoothly scroll to a section id (or 'top'). Uses Lenis when active — with a
 * long eased glide so pinned sections scrub through premium-slow — and falls
 * back to native smooth scroll otherwise.
 */
export function scrollToSection(target) {
  const dest = target === 'top' ? 0 : document.getElementById(target);
  if (dest !== 0 && !dest) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(dest, {
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 4), // easeOutQuart glide
    });
  } else if (dest === 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    dest.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Site-wide smooth scroll (Lenis), kept on the same frame clock as GSAP so it
 * never fights ScrollTrigger's pinned curtain transition:
 *  - Lenis's raf loop is driven by `gsap.ticker` instead of its own rAF, so
 *    both libraries tick in lockstep on the same frame.
 *  - Every Lenis `scroll` event calls `ScrollTrigger.update()`, so pins/scrubs
 *    read Lenis's (eased) scroll position immediately instead of waiting for
 *    the next native `scroll` event — this is what removes the "laggy /
 *    disconnected from input" feel during the pin.
 *  - `ScrollTrigger.normalizeScroll(true)` stops the browser's native scroll
 *    from fighting Lenis's virtual scroll (prevents the double-scroll jitter
 *    that otherwise shows up around pinned sections).
 * Lenis stays active through the pinned section — pausing/resuming it around
 * the pin introduced a visible hitch when re-enabled, so continuous smoothing
 * with ticker-sync ended up feeling tighter than toggling it off.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    // Touch devices keep native scroll — Lenis's virtual scroll can feel odd
    // against touch gestures, and ScrollTrigger's pin already has a simpler
    // non-pinned fallback on mobile.
    if (prefersReducedMotion || !isFinePointer) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisInstance = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker (shared frame clock) instead of its own
    // requestAnimationFrame loop.
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.normalizeScroll(true);
    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', onRefresh);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
