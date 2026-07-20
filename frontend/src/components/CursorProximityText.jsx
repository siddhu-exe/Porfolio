import { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';

/**
 * Imperative proximity controller for character nodes created by an existing
 * text split. Keeping the nodes outside React state prevents reconciliation
 * from invalidating a library-managed SplitText DOM tree.
 */
const CursorProximityText = forwardRef(function CursorProximityText(
  { radius = 150, maxScale = 1.15 },
  ref,
) {
  const cleanupRef = useRef(null);

  useImperativeHandle(ref, () => ({
    activate(characters) {
      cleanupRef.current?.();

      if (!characters?.length) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!window.matchMedia('(pointer: fine)').matches) return;

      const setters = characters.map((character) => {
        gsap.set(character, {
          display: 'inline-block',
          transformOrigin: '50% 70%',
          willChange: 'transform',
        });

        return gsap.quickTo(character, 'scale', {
          duration: 0.2,
          ease: 'back.out(1.12)',
        });
      });

      const updateCharacters = (event) => {
        characters.forEach((character, index) => {
          const rect = character.getBoundingClientRect();
          const dx = event.clientX - (rect.left + rect.width / 2);
          const dy = event.clientY - (rect.top + rect.height / 2);
          const distance = Math.hypot(dx, dy);
          const proximity = Math.max(0, 1 - distance / radius);
          const falloff = proximity * proximity * (3 - 2 * proximity);

          setters[index](1 + (maxScale - 1) * falloff);
        });
      };

      const resetCharacters = () => setters.forEach((setScale) => setScale(1));
      const cleanup = () => {
        window.removeEventListener('pointermove', updateCharacters);
        window.removeEventListener('blur', resetCharacters);
        document.documentElement.removeEventListener('mouseleave', resetCharacters);
        gsap.set(characters, { scale: 1, clearProps: 'willChange,transformOrigin' });
      };

      window.addEventListener('pointermove', updateCharacters, { passive: true });
      window.addEventListener('blur', resetCharacters);
      document.documentElement.addEventListener('mouseleave', resetCharacters);
      cleanupRef.current = cleanup;
    },
    deactivate() {
      cleanupRef.current?.();
      cleanupRef.current = null;
    },
  }));

  return null;
});

export default CursorProximityText;
