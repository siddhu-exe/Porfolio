import { motion } from 'framer-motion';

/**
 * Left-to-right clip wipe text reveal — the premium studio-site effect: each
 * line is uncovered horizontally from left to right (clip-path inset), with no
 * underline/rule. Lines stagger one after another.
 *
 * Native (framer-motion) reproduction of the Framer ScrollRevealText reveal —
 * no GSAP SplitText (a paid Club plugin) required.
 *
 *   lines   array of strings (or one string) — one wipe per line
 *   as      wrapper tag (h1/h2/p/…)
 *   inView  optional boolean to let a parent control the trigger (needed inside
 *           the fixed footer, where whileInView's observer never fires cleanly)
 */
const EASE = [0.76, 0, 0.24, 1]; // matches the hero's on-load easing
const STAGGER = 0.12;

export default function MaskedRevealText({
  lines,
  className = '',
  lineClassName = '',
  as: Tag = 'div',
  once = true,
  inView,
}) {
  const items = Array.isArray(lines) ? lines : [lines];
  const MotionTag = motion[Tag] || motion.div;

  const trigger =
    inView === undefined
      ? { initial: 'hidden', whileInView: 'show', viewport: { once, margin: '-12%' } }
      : { initial: 'hidden', animate: inView ? 'show' : 'hidden' };

  return (
    <MotionTag className={className} {...trigger}>
      {items.map((text, i) => (
        <motion.span
          key={i}
          className={`block ${lineClassName}`}
          variants={{
            // clipped from the right edge inward = fully hidden
            hidden: { clipPath: 'inset(0 100% 0 0)' },
            show: {
              clipPath: 'inset(0 0% 0 0)',
              transition: { duration: 0.85, ease: EASE, delay: i * STAGGER },
            },
          }}
        >
          {text}
        </motion.span>
      ))}
    </MotionTag>
  );
}
