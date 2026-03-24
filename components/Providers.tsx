"use client";

import { ThemeProvider } from './ThemeContext';
import { LangProvider } from './LangContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LangProvider>{children}</LangProvider>
    </ThemeProvider>
  );
}
