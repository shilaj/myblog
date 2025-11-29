import { ReactNode } from 'react';
import { Navbar } from './navbar';
import { Footer } from './footer';

export function LayoutShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
