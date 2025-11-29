'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Publications', href: '/publications' },
  { label: 'Conferences/Talks', href: '/conferences' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Hobbies', href: '/hobbies' },
  { label: 'CV', href: '/cv' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          AC | Research Portfolio
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-200 sm:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition hover:text-white ${isActive ? 'text-white' : 'text-slate-300'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-white/10 p-2 text-slate-100 sm:hidden"
          aria-label="Toggle navigation"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-3 sm:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium text-slate-200">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-2 py-1 transition hover:text-white ${isActive ? 'bg-white/5 text-white' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
