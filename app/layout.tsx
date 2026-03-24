import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Shilaj Baral',
  description: 'Graduate Student Researcher — AI & Computational Fluid Dynamics.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      {/* Anti-FOUC: apply dark class before first paint */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t!=='light')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-[#0b1424] dark:text-slate-100">
        <Providers>
          <Nav />
          <main className="mx-auto w-full max-w-5xl px-6 pb-16 pt-10 md:px-10">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
