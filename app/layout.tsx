import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LayoutShell } from '@/components/layout-shell';

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
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
