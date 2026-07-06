import { useEffect, useState } from 'react';

/**
 * Types a phrase, holds, deletes, then moves to the next — looping forever.
 * Used inside the cursor badge so it reads "hey there?" -> "Curious?" ->
 * "Explore My Library ↓" and back around.
 */
export default function CyclingTypewriter({
  phrases,
  typeSpeed = 75,
  deleteSpeed = 38,
  hold = 1300,
  className,
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [mode, setMode] = useState('typing'); // typing | deleting

  useEffect(() => {
    const current = phrases[index % phrases.length];
    let timer;

    if (mode === 'typing') {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
      } else {
        timer = setTimeout(() => setMode('deleting'), hold);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed);
      } else {
        setMode('typing');
        setIndex((i) => (i + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [text, mode, index, phrases, typeSpeed, deleteSpeed, hold]);

  return (
    <span className={className}>
      {text}
      <span className="tw-cursor">|</span>
    </span>
  );
}
