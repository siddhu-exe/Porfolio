import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion';

/**
 * A section seam drawn as a morphing SVG curve instead of a straight line. The
 * curve's amplitude reacts to scroll velocity — flick fast and it bows deeply
 * in the scroll direction; slow down and a spring settles it back to a gentle
 * resting curve. The fill matches the section sliding over the seam (usually
 * the section BELOW, whose leading edge this is), so it reads as that section's
 * curved edge.
 *
 * Reusable: <ScrollMorphEdge fillColor="#1B1109" curveDepth={22} height={90} />
 *
 * On touch / no fine-pointer, velocity tracking is skipped and a static gentle
 * curve is rendered (touch momentum makes velocity spiky).
 */
export default function ScrollMorphEdge({
  fillColor = '#1B1109',
  curveDepth = 20, // resting amplitude in px
  maxDepth = 70, // clamp for the velocity-driven amplitude
  height = 90,
  flip = false, // false: curve dips down into the fill; true: bulges up
  stiffness = 120,
  damping = 18,
  mass = 1,
  className = '',
}) {
  const ref = useRef(null);
  const [reactive, setReactive] = useState(false);

  useEffect(() => {
    setReactive(
      window.matchMedia('(pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  // Track scroll velocity while this seam is near the viewport.
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Map raw velocity (px/s) to an amplitude offset, spring-smoothed so it
  // settles naturally instead of snapping.
  const rawAmp = useTransform(scrollVelocity, [-3000, 0, 3000], [-maxDepth, 0, maxDepth], {
    clamp: true,
  });
  const springAmp = useSpring(rawAmp, { stiffness, damping, mass });

  // Resting curve + velocity offset -> the live control-point depth.
  const amplitude = useMotionValue(curveDepth);
  const staticFallback = useMotionValue(curveDepth);

  const W = 1440;
  const buildPath = (amp) => {
    // Quadratic curve across the width; `amp` pushes the mid control point.
    // Fills the TOP band, so the shape is the section-above's colored edge and
    // its curved BOTTOM dips down into the (transparent) section below.
    const dir = flip ? -1 : 1;
    const mid = height / 2;
    const ctrlY = mid + dir * amp;
    return `M0,0 L0,${mid} Q${W / 2},${ctrlY} ${W},${mid} L${W},0 Z`;
  };

  const source = reactive ? springAmp : staticFallback;
  const [d, setD] = useState(() => buildPath(curveDepth));

  useMotionValueEvent(source, 'change', (v) => {
    const base = curveDepth;
    const amp = reactive ? base + v : base;
    amplitude.set(amp);
    setD(buildPath(amp));
  });

  // Ensure an initial resting path is set once mounted.
  useEffect(() => {
    setD(buildPath(curveDepth));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curveDepth, height, flip, reactive]);

  return (
    <div ref={ref} className={`pointer-events-none relative w-full ${className}`} style={{ height, marginBottom: -1 }}>
      <svg
        viewBox={`0 0 ${W} ${height}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <motion.path d={d} fill={fillColor} />
      </svg>
    </div>
  );
}
