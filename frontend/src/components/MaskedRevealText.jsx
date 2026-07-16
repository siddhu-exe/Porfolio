import { motion } from 'framer-motion';

/**
 * Native reproduction of the Framer "ScrollRevealText" module's "Masked Lines"
 * preset (ScrollRevealText-vXBxyx). The Framer module depends on Framer's
 * editor runtime and can't be imported into a plain Vite/React app, so this
 * rebuilds the effect it produces: each line is wrapped in an overflow-hidden
 * mask and its text slides up from translateY(100%) to 0, staggered line by
 * line, when the block scrolls into view.
 *
 * Pass an array of lines (or a single string). `as` sets the wrapper tag.
 */
const EASE = [0.22, 1, 0.36, 1];
const STAGGER = 0.15; // matches the Framer preset's stagger

export default function MaskedRevealText({
  lines,
  className = '',
  lineClassName = '',
  as: Tag = 'div',
  once = true,
}) {
  const items = Array.isArray(lines) ? lines : [lines];
  const MotionTag = motion[Tag] || motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-15%' }}
    >
      {items.map((line, i) => (
        // mask: clips the line while it slides up into place
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName}`}
            variants={{
              hidden: { y: '100%' },
              show: {
                y: '0%',
                transition: { duration: 0.9, ease: EASE, delay: i * STAGGER },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
