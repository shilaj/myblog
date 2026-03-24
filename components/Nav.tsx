"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useLang, type Lang } from './LangContext';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/publications', label: 'Publications' },
  { href: '/conferences', label: 'Talks' },
  { href: '/blogs', label: 'Blog' },
  { href: '/hobbies', label: 'Hobbies' },
  { href: '/cv', label: 'CV' },
];

const langOptions: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ne', label: 'NE' },
  { code: 'ko', label: 'KO' },
];

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLang();

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="font-semibold tracking-[0.3em] text-slate-900 dark:text-white"
          onClick={() => setIsOpen(false)}
        >
          SB
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 text-sm text-slate-600 dark:text-slate-300 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'rounded-full px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white',
                pathname === item.href && 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Controls: lang switcher + theme toggle + mobile burger */}
        <div className="flex items-center gap-1">
          {/* Language switcher (desktop) */}
          <div className="hidden items-center rounded-full border border-slate-200 dark:border-white/15 md:flex">
            {langOptions.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={clsx(
                  'px-2.5 py-1 text-xs font-medium transition first:rounded-l-full last:rounded-r-full',
                  lang === code
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <ThemeToggle />

          {/* Mobile burger */}
          <button
            type="button"
            className="rounded-full border border-slate-200 p-1.5 text-slate-600 transition hover:bg-slate-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10 md:hidden"
            onClick={() => setIsOpen((p) => !p)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              {isOpen ? (
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-slate-200 px-4 pb-4 pt-2 dark:border-white/10 md:hidden">
          <nav className="flex flex-col gap-1 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'rounded-xl px-4 py-2 transition hover:bg-slate-100 dark:hover:bg-white/10',
                  pathname === item.href
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-700 dark:text-slate-300'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {/* Language switcher (mobile) */}
          <div className="mt-3 flex items-center gap-1">
            <span className="text-xs text-slate-400 dark:text-slate-500">Language:</span>
            {langOptions.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={clsx(
                  'rounded px-2 py-0.5 text-xs font-medium transition',
                  lang === code
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
