import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToSection } from './SmoothScroll.jsx';

const ITEMS = [
  { label: 'Home', target: 'top' },
  { label: 'Works', target: 'shelf' },
  { label: 'Contact', target: 'contact' },
];

const listVariants = {
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const itemVariants = {
  closed: { opacity: 0, y: 14 },
  open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function MenuPill() {
  const [open, setOpen] = useState(false);

  const go = (target) => {
    setOpen(false);
    // Route through Lenis (when active) for an eased premium glide that stays
    // in sync with the pinned GSAP sections — native scrollIntoView fights
    // normalizeScroll and lands with a jolt.
    scrollToSection(target);
  };

  return (
    <div className="relative flex justify-center">
      {/* Invisible backdrop: clicking outside collapses the panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {!open ? (
        <motion.button
          layoutId="menu-shell"
          style={{ borderRadius: 999 }}
          className="z-50 bg-mustard px-8 py-3 text-base font-semibold text-ink shadow-sm"
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Menu&ensp;&#9776;
        </motion.button>
      ) : (
        <motion.div
          layoutId="menu-shell"
          style={{ borderRadius: 28 }}
          className="absolute bottom-0 z-50 w-64 bg-ink px-8 py-7 text-cream shadow-2xl"
        >
          <motion.nav
            className="flex flex-col items-center gap-4"
            initial="closed"
            animate="open"
            variants={listVariants}
          >
            {ITEMS.map((item) => (
              <motion.button
                key={item.label}
                variants={itemVariants}
                className="text-xl font-semibold tracking-tight text-cream transition-colors hover:text-mustard"
                onClick={() => go(item.target)}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.nav>
        </motion.div>
      )}
    </div>
  );
}
