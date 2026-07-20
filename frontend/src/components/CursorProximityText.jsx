import { forwardRef, useImperativeHandle, useRef } from 'react';
import { animate } from 'framer-motion';

/**
 * Imperative proximity controller for character nodes created by an existing
 * text split. Keeping the nodes outside React state prevents reconciliation
 * from invalidating a library-managed SplitText DOM tree.
 */
const CursorProximityText = forwardRef(function CursorProximityText(
  { radius = 160, maxScale = 1.18 },
  ref,
) {
  const cleanupRef = useRef(null);

  useImperativeHandle(ref, () => ({
    activate(characters) {
      cleanupRef.current?.();

      if (!characters?.length) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const headline = characters[0]?.parentElement?.closest('h1');
      headline?.setAttribute('data-proximity-active', 'true');

      const innerCharacters = characters.map((outerCharacter) => {
        let innerCharacter = outerCharacter.querySelector(':scope > .proximity-char-inner');
        if (!innerCharacter) {
          innerCharacter = document.createElement('span');
          innerCharacter.className = 'proximity-char-inner';
          innerCharacter.textContent = outerCharacter.textContent;
          outerCharacter.replaceChildren(innerCharacter);
        }
        return innerCharacter;
      });
      const animationControls = innerCharacters.map(() => null);
      const currentScales = innerCharacters.map(() => 1);

      const updateCharacters = (event) => {
        // Some desktop browsers report `(pointer: fine)` incorrectly, so use
        // the pointer event itself as the reliable input-capability signal.
        if (event.pointerType === 'touch') return;

        innerCharacters.forEach((character, index) => {
          const rect = character.getBoundingClientRect();
          const dx = event.clientX - (rect.left + rect.width / 2);
          const dy = event.clientY - (rect.top + rect.height / 2);
          const distance = Math.hypot(dx, dy);
          const proximity = Math.max(0, 1 - distance / radius);
          const falloff = proximity * proximity * (3 - 2 * proximity);

          const scale = 1 + (maxScale - 1) * falloff;
          if (Math.abs(scale - currentScales[index]) < 0.004) return;

          currentScales[index] = scale;
          animationControls[index]?.stop();
          animationControls[index] = animate(character, { scale }, {
            type: 'spring',
            stiffness: 520,
            damping: 38,
            mass: 0.22,
          });
        });
      };

      const resetCharacters = () => innerCharacters.forEach((character, index) => {
        currentScales[index] = 1;
        animationControls[index]?.stop();
        animationControls[index] = animate(character, { scale: 1 }, {
          type: 'spring',
          stiffness: 520,
          damping: 38,
          mass: 0.22,
        });
      });
      const cleanup = () => {
        window.removeEventListener('pointermove', updateCharacters);
        window.removeEventListener('blur', resetCharacters);
        document.documentElement.removeEventListener('mouseleave', resetCharacters);
        headline?.removeAttribute('data-proximity-active');
        animationControls.forEach((controls) => controls?.stop());
        innerCharacters.forEach((character) => {
          character.style.removeProperty('transform');
          character.style.removeProperty('will-change');
        });
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
