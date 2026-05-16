import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Shilaj Baral — AI & Computational Fluid Dynamics',
  description:
    'Graduate researcher at POSTECH building hybrid CFD + machine learning workflows for advanced nuclear systems.',
  openGraph: {
    title: 'Shilaj Baral',
    description:
      'AI for fluid dynamics. Hybrid CFD + ML for nuclear systems research at POSTECH.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t!=='light')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen text-slate-900 antialiased dark:text-slate-100">
        <Providers>
          <Nav />
          <main className="mx-auto w-full max-w-5xl px-6 pb-20 pt-10 md:px-10">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
