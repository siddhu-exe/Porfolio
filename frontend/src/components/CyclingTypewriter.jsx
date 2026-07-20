import { useEffect, useState } from 'react';

/** Types and deletes each phrase once, then reports that the sequence ended. */
export default function CyclingTypewriter({
  phrases,
  typeSpeed = 75,
  deleteSpeed = 38,
  hold = 1300,
  className,
  onComplete,
  run = true,
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [mode, setMode] = useState('typing');

  useEffect(() => {
    if (!run) return undefined;
    const current = phrases?.[index] ?? '';
    let timer;

    if (mode === 'typing') {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
      } else {
        timer = setTimeout(() => setMode('deleting'), hold);
      }
    } else if (text.length > 0) {
      timer = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed);
    } else if (index < phrases.length - 1) {
      setIndex((currentIndex) => currentIndex + 1);
      setMode('typing');
    } else {
      onComplete?.();
    };

    return () => clearTimeout(timer);
  }, [deleteSpeed, hold, index, mode, onComplete, phrases, run, text, typeSpeed]);

  return (
    <span className={className}>
      {text}
      <span className="tw-cursor">|</span>
    </span>
  );
}
