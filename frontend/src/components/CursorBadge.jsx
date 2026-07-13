import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * A badge that follows the mouse (custom cursor). `centered` pins it on the
 * pointer (for cursor:none targets like books); otherwise it trails beside the
 * native cursor like the reference site's blob. Fine-pointer devices only.
 */
export default function CursorBadge({ active, centered = true, className = '', children }) {
  const [finePointer, setFinePointer] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    setFinePointer(window.matchMedia('(pointer: fine)').matches);
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  if (!finePointer) return null;

  // Portal to <body>: this badge is rendered from inside sections that can be
  // pinned/transformed by GSAP ScrollTrigger (e.g. the Project Shelf). A
  // transformed ancestor turns `position: fixed` into "fixed to that ancestor",
  // which sends the badge off-screen. Escaping to <body> keeps it fixed to the
  // real viewport no matter what's animating around it.
  return createPortal(
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[80]"
      style={{ x: sx, y: sy }}
      animate={{ scale: active ? 1 : 0, opacity: active ? 1 : 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div
        className={`flex items-center justify-center rounded-full font-semibold shadow-lg ${
          centered ? '-translate-x-1/2 -translate-y-1/2' : 'translate-x-5 translate-y-5'
        } ${className}`}
      >
        {children}
      </div>
    </motion.div>,
    document.body
  );
}
