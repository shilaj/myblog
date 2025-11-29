"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/publications', label: 'Publications' },
  { href: '/conferences', label: 'Conferences/Talks' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/hobbies', label: 'Hobbies' },
  { href: '/cv', label: 'CV' }
];

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-[0.3em] text-white" onClick={closeMenu}>
            SB
          </Link>
          <button
            type="button"
            className="rounded-full border border-white/20 p-2 text-white transition hover:border-white/40 md:hidden"
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              {isOpen ? (
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
          <nav className="hidden gap-3 text-sm text-slate-200 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'rounded-full px-3 py-1 transition hover:bg-white/10',
                  pathname === item.href && 'bg-white text-slate-900'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        {isOpen && (
          <nav className="mt-4 flex flex-col gap-2 text-sm text-white md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={clsx(
                  'rounded-2xl border border-white/15 px-4 py-2 transition hover:border-white/40',
                  pathname === item.href && 'bg-white text-slate-900'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
