import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Signature from './Signature.jsx';
import MenuPill from './MenuPill.jsx';
import CursorBadge from './CursorBadge.jsx';
import CyclingTypewriter from './CyclingTypewriter.jsx';

const CURSOR_PHRASES = ['hey there?', 'Curious?', 'Explore My Library ↓'];

const EASE = [0.76, 0, 0.24, 1];

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const riseIn = {
  hidden: { opacity: 0, y: 70 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

/**
 * Intro sequence:
 *  intro -> signature draws itself while side lines extend in from the edges
 *  lift  -> signature block shrinks and rides up to the top of the viewport
 *  hero  -> main hero text staggers in, then the menu pill
 * After the intro, a blue "Hey there!" badge follows the cursor over the hero
 * (typed out with a blinking caret), mirroring the reference site.
 */
export default function Hero({ sinkStyle }) {
  const [phase, setPhase] = useState('intro');
  const [cursorOn, setCursorOn] = useState(false);

  useEffect(() => {
    // Signature draw takes ~2.4s; a short beat, then lift.
    const t = setTimeout(() => setPhase((p) => (p === 'intro' ? 'lift' : p)), 3100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setCursorOn(true)}
      onMouseLeave={() => setCursorOn(false)}
    >
      {/* Cursor badge runs from the moment the signature starts drawing,
          cycling through its phrases as the mouse moves over the hero. */}
      <CursorBadge
        active={cursorOn}
        centered={false}
        className="h-14 whitespace-nowrap bg-[#37ACE8] px-5 text-base text-white"
      >
        <CyclingTypewriter phrases={CURSOR_PHRASES} />
      </CursorBadge>

      <motion.div className="absolute inset-0" style={sinkStyle}>
        {/* Signature block: starts centered, lifts to the top on phase change */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div
            className="flex w-full flex-col items-center"
            animate={
              phase === 'intro'
                ? { y: 0, scale: 1 }
                : { y: '-40vh', scale: 0.38 }
            }
            transition={{ duration: 0.95, ease: EASE }}
            onAnimationComplete={() => {
              if (phase === 'lift') setPhase('hero');
            }}
          >
            <div className="flex w-full items-center">
              <motion.div
                className="h-px flex-1 origin-left bg-ink/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.1, ease: 'easeInOut' }}
              />
              <Signature className="w-[min(46vw,460px)] shrink-0" />
              <motion.div
                className="h-px flex-1 origin-right bg-ink/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.1, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Main hero text, staggered bottom-to-top / left-to-right */}
        {phase === 'hero' && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-center px-8 pt-24 md:px-16"
            variants={heroStagger}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={riseIn}
              className="mb-4 text-left text-[0.9rem] font-light uppercase leading-snug tracking-[0.35em] text-ink/70 md:mb-6 md:text-base"
            >
              SIDDHARTH 
              DONGARDIVE
            </motion.p>

            

            <h1 className="text-center font-bold leading-[0.95] tracking-tight text-ink">
              <motion.span
                variants={riseIn}
                className="block text-[12vw] md:text-[8.5vw] lg:text-[7vw]"
              >
                TURNING DATA
              </motion.span>
              <motion.span
                variants={riseIn}
                className="block text-[12vw] md:text-[8.5vw] lg:text-[7vw]"
              >
                INTO INTELLIGENCE
              </motion.span>
            </h1>

            <motion.p
              variants={riseIn}
              className="mt-4 text-right text-[0.9rem] font-light uppercase leading-snug tracking-[0.35em] text-ink/70 md:mt-6 md:text-base"
            >
              AI Engineer • Data Scientist
            </motion.p>

            <motion.div variants={riseIn} className="mt-10 md:mt-12">
              <MenuPill />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
