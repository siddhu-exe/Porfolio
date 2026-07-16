import { useEffect, useRef, useState } from 'react';

/**
 * Native reproduction of the Framer "Eye Follow Button" (Eye-Follow-Button-yMBK).
 * The original is a Framer code component that depends on Framer's proprietary
 * runtime and can't be imported into a plain Vite/React app, so this rebuilds
 * the same effect: a pill button with a pair of googly eyes whose pupils track
 * the mouse cursor (angle via atan2, travel clamped to the eye radius).
 */
function Eye({ mouse }) {
  const eyeRef = useRef(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = eyeRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = mouse.x - cx;
    const dy = mouse.y - cy;
    const angle = Math.atan2(dy, dx);
    // max pupil travel = eye radius minus pupil radius, so it stays inside
    const maxTravel = rect.width / 2 - rect.width / 6;
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxTravel);
    setPupil({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist });
  }, [mouse]);

  return (
    <span
      ref={eyeRef}
      className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white md:h-4 md:w-4"
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-ink transition-transform duration-75 ease-out md:h-[7px] md:w-[7px]"
        style={{ transform: `translate(${pupil.x}px, ${pupil.y}px)` }}
      />
    </span>
  );
}

export default function EyeFollowButton({ children, onClick, className = '' }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-cream transition-transform hover:scale-105 md:px-6 md:py-3 md:text-sm ${className}`}
    >
      <span>{children}</span>
      <span className="flex items-center gap-1">
        <Eye mouse={mouse} />
        <Eye mouse={mouse} />
      </span>
    </button>
  );
}
