import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { scrollToSection } from './SmoothScroll.jsx';

const ITEMS = [
  { label: 'Home', target: 'top', number: '01' },
  { label: 'Works', target: 'shelf', number: '02' },
  { label: 'Contact', target: 'contact', number: '03' },
];

const itemVariants = {
  closed: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
  },
  open: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + index * 0.045, duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function MenuPill() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus({ preventScroll: true });
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const go = (target) => {
    setOpen(false);
    scrollToSection(target);
  };

  return (
    <div className="relative flex h-12 justify-center">
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>

      <div
        ref={menuRef}
        className="t-morph t-home-menu absolute bottom-0 z-50 bg-mustard text-ink"
        data-open={open}
      >
        <nav
          id="hero-navigation"
          aria-label="Primary navigation"
          className="t-morph-menu flex flex-col px-5 pb-5 pt-4 text-cream"
        >
          <div className="mb-3 flex items-center justify-between border-b border-cream/20 pb-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-cream/55">
              Index
            </span>
            <button
              ref={closeRef}
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="relative grid h-8 w-8 place-items-center text-cream outline-none focus-visible:ring-1 focus-visible:ring-mustard"
            >
              <span className="absolute h-px w-4 rotate-45 bg-current" />
              <span className="absolute h-px w-4 -rotate-45 bg-current" />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center">
            {ITEMS.map((item, index) => (
              <motion.button
                key={item.label}
                type="button"
                custom={index}
                variants={itemVariants}
                initial="closed"
                animate={open ? 'open' : 'closed'}
                onClick={() => go(item.target)}
                className="group/item flex items-baseline justify-between border-b border-cream/10 py-2.5 text-left outline-none last:border-0 focus-visible:text-mustard"
              >
                <span className="font-display text-2xl leading-none transition-colors duration-200 group-hover/item:text-mustard">
                  {item.label}
                </span>
                <span className="text-[9px] tracking-[0.18em] text-cream/40 transition-colors duration-200 group-hover/item:text-mustard">
                  {item.number}
                </span>
              </motion.button>
            ))}
          </div>
        </nav>

        <button
          type="button"
          className="t-morph-plus flex items-center justify-center gap-3 px-5 font-semibold"
          aria-expanded={open}
          aria-controls="hero-navigation"
          onClick={(event) => {
            event.stopPropagation();
            setOpen(true);
          }}
        >
          <span>Menu</span>
          <span className="relative h-3.5 w-4" aria-hidden="true">
            <span className="absolute left-0 top-1 h-px w-4 bg-current" />
            <span className="absolute bottom-1 left-0 h-px w-4 bg-current" />
          </span>
        </button>
      </div>
    </div>
  );
}
