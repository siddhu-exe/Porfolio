import { motion } from 'framer-motion';

/**
 * "Rise from a line" masked text reveal — the premium studio-site effect. Each
 * line sits in an overflow-hidden mask above a hairline rule; on scroll-into-
 * view the text rises up from BEHIND that line (translateY 110% -> 0), padded
 * slightly so descenders aren't clipped, staggered line by line. The line is
 * the baseline the text emerges from.
 *
 * Native (framer-motion) reproduction of the Framer ScrollRevealText "Masked
 * Lines" preset — no GSAP SplitText (a paid Club plugin) required.
 *
 *   lines        array of strings (or one string) — one mask per line
 *   line         show a hairline rule under each masked line (the "floor")
 *   lineColor    tailwind class for the rule color (default faint current)
 *   as           wrapper tag (h1/h2/p/…)
 */
const EASE = [0.16, 1, 0.3, 1]; // expo-out feel, per ui-ux-pro-max motion spec
const STAGGER = 0.12;

export default function MaskedRevealText({
  lines,
  className = '',
  lineClassName = '',
  as: Tag = 'div',
  once = true,
  line = false,
  lineColor = 'bg-current/15',
  inView,
}) {
  const items = Array.isArray(lines) ? lines : [lines];
  const MotionTag = motion[Tag] || motion.div;

  // When `inView` is passed (boolean), the parent controls the trigger — used
  // inside the fixed footer, where whileInView's IntersectionObserver is
  // unreliable (the footer is always geometrically on-screen behind the page,
  // so it never fires a clean enter). Otherwise fall back to whileInView.
  const trigger =
    inView === undefined
      ? { initial: 'hidden', whileInView: 'show', viewport: { once, margin: '-12%' } }
      : { initial: 'hidden', animate: inView ? 'show' : 'hidden' };

  return (
    <MotionTag className={className} {...trigger}>
      {items.map((text, i) => (
        <span key={i} className="block">
          {/* mask: clips the line while it rises up from behind the floor.
              pb/-mb pair gives descenders room without changing layout height. */}
          <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
            <motion.span
              className={`block ${lineClassName}`}
              variants={{
                hidden: { y: '110%' },
                show: {
                  y: '0%',
                  transition: { duration: 0.95, ease: EASE, delay: i * STAGGER },
                },
              }}
            >
              {text}
            </motion.span>
          </span>

          {line && (
            // the floor: a hairline that draws in under the risen text
            <motion.span
              aria-hidden
              className={`mt-2 block h-px w-full origin-left ${lineColor}`}
              variants={{
                hidden: { scaleX: 0 },
                show: {
                  scaleX: 1,
                  transition: { duration: 0.7, ease: EASE, delay: i * STAGGER + 0.15 },
                },
              }}
            />
          )}
        </span>
      ))}
    </MotionTag>
  );
}
