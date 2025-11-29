import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'AI & CFD Research Portfolio',
  description: 'Data-driven academic portfolio built with Next.js and Markdown content.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-slate-950 text-slate-100 antialiased">
        <div className="min-h-screen">
          <Nav />
          <main className="mx-auto w-full max-w-5xl px-6 pb-16 pt-10 md:px-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
