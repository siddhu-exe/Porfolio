import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * "Curtain" transition: pins `base` once its end reaches the viewport bottom,
 * then drives `curtain` up from translateY(100%) to 0 over one viewport of
 * scroll — like a curtain pulled up over the previous section. Once the curtain
 * fully covers the screen the pin releases and the page scrolls through the
 * curtain's own content as normal.
 *
 * Canonical GSAP overlap pattern: the curtain sits in normal document flow
 * right after the base but is pulled up by margin-top:-100vh so it overlaps the
 * base's final viewport. A scrubbed timeline animates its yPercent 100 -> 0
 * tied directly to scroll position (no autoplay), so fast flicks and slow drags
 * both track 1:1. Because the curtain stays in flow, everything below it scrolls
 * naturally after the reveal.
 *
 * Wraps the sections without modifying them:
 *   <PinnedCurtain base={<ProjectShelf/>} curtain={<Toolbox/>} />
 *
 * `dwellVh` (default 0) adds extra pinned scroll AFTER the reveal finishes —
 * the base stays pinned and the curtain sits fully covering the screen for
 * that many extra viewport-heights before the pin releases. This forces a
 * scroller to spend a beat inside the curtain section instead of blowing
 * straight through it.
 *
 * Below md the whole effect is skipped (touch-scroll pinning is jank-prone):
 * the sections stack in normal flow with a light fade-in on the curtain.
 */
export default function PinnedCurtain({ base, curtain, dwellVh = 0 }) {
  const pinRef = useRef(null);
  const curtainRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop / fine-pointer: the real pinned curtain.
    mm.add('(min-width: 768px)', () => {
      gsap.set(curtainRef.current, { marginTop: '-100vh' });
      gsap.set(curtainRef.current, { yPercent: 100 });

      // One viewport of scroll drives the reveal (0% -> 100%); an optional
      // extra `dwellVh` keeps the pin held (curtain fully covering) afterward.
      const revealVh = 100;
      const totalVh = revealVh + dwellVh;
      const revealFraction = revealVh / totalVh;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'bottom bottom', // pin when the base's end hits the viewport bottom
          end: `+=${totalVh}%`,
          pin: pinRef.current,
          pinSpacing: true,
          scrub: 0.6, // light smoothing so fast flicks don't stutter
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      // Reveal animates over the first slice of the track; the remaining
      // slice (dwellVh) is scrubbed scroll with nothing left to animate, so
      // the pin just holds the fully-covered curtain in place.
      tl.to(curtainRef.current, { yPercent: 0, ease: 'none', duration: revealFraction }, 0);
      if (dwellVh > 0) {
        tl.to(curtainRef.current, { yPercent: 0, duration: 1 - revealFraction }, revealFraction);
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(curtainRef.current, { marginTop: 0, yPercent: 0 });
      };
    });

    // Mobile / touch: no pin. Sections stack; curtain gets a gentle fade + rise.
    mm.add('(max-width: 767px)', () => {
      gsap.set(curtainRef.current, { marginTop: 0, yPercent: 0 });
      const anim = gsap.from(curtainRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: curtainRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
      return () => anim.scrollTrigger?.kill();
    });

    // Recompute once late-loading content (images/fonts) settles the layout.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    // Shelf height shifts when async project data arrives — keep pin point accurate.
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    if (pinRef.current) ro.observe(pinRef.current);

    return () => {
      ro.disconnect();
      window.removeEventListener('load', onLoad);
      mm.revert();
    };
  }, []);

  return (
    <div className="relative">
      {/* Pinned base (Project Shelf). overflow-hidden clips the rising curtain
          to the stage so it reads as sliding up over the base. */}
      <div ref={pinRef} className="relative z-30 overflow-hidden">
        {base}
      </div>

      {/* Curtain (Toolbox) — stays in normal flow (pulled up to overlap), so the
          page scrolls through it as usual once the reveal completes. */}
      <div ref={curtainRef} className="relative z-40">
        {curtain}
      </div>
    </div>
  );
}
