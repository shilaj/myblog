"use client";

import { useEffect, useState } from 'react';

type TypewriterTextProps = {
  text: string;
  speed?: number;
  className?: string;
};

export default function TypewriterText({ text, speed = 40, className }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let frame = 0;
    setDisplayed('');

    const interval = window.setInterval(() => {
      frame += 1;
      setDisplayed(text.slice(0, frame));
      if (frame >= text.length) {
        window.clearInterval(interval);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [text, speed]);

  const finished = displayed.length === text.length;

  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className ?? ''}`}>
      <span>{displayed || text}</span>
      <span
        className={`inline-block h-[0.9em] w-[2px] translate-y-[2px] rounded-sm bg-gradient-to-b from-sky-400 to-indigo-500 ${
          finished ? 'animate-pulse opacity-70' : 'opacity-100'
        }`}
        aria-hidden="true"
      />
    </span>
  );
}
