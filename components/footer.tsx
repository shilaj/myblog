'use client';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-slate-950/70 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 text-sm text-slate-300 sm:flex-row sm:items-center sm:px-6">
        <p>© {year} Dr. Aria Chen. All Rights Reserved.</p>
        <p className="text-slate-400">Crafted with Next.js, Tailwind CSS, and Markdown-first content.</p>
      </div>
    </footer>
  );
}
