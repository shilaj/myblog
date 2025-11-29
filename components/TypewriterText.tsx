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

  const cursorVisible = displayed.length === text.length ? 'opacity-0' : 'opacity-100';

  return (
    <span className={`inline-flex items-baseline gap-1 ${className ?? ''}`}>
      <span>{displayed || text}</span>
      <span className={`h-6 w-px bg-white ${cursorVisible} animate-pulse`} aria-hidden="true" />
    </span>
  );
}
