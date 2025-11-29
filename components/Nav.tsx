"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

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

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold tracking-[0.3em] text-white">
          SB
        </Link>
        <nav className="flex flex-wrap gap-3 text-sm text-slate-200">
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
    </header>
  );
}
