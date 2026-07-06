import { useEffect, useState } from 'react';

export default function Typewriter({ text, delay = 0, speed = 100, onComplete, className }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          const next = c + 1;
          if (next >= text.length) {
            clearInterval(interval);
            onComplete?.();
          }
          return Math.min(next, text.length);
        });
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {text.slice(0, count)}
      <span className="tw-cursor">|</span>
    </span>
  );
}
