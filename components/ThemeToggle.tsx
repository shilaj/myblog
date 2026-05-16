"use client";

import { useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-8 w-8" />;

  const isDark = theme === 'dark';
  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="group relative h-8 w-8 overflow-hidden rounded-full border border-slate-200 text-slate-500 transition hover:border-sky-300 hover:text-slate-900 dark:border-white/15 dark:text-slate-400 dark:hover:border-cyan-200/60 dark:hover:text-white"
    >
      <span
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${
          isDark ? 'translate-y-0' : '-translate-y-8'
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </span>
      <span
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${
          isDark ? 'translate-y-8' : 'translate-y-0'
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  );
}
