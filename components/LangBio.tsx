"use client";

import { useLang } from './LangContext';
import Markdown from './Markdown';
import TypewriterText from './TypewriterText';

export type BioTranslation = {
  title: string;
  subtitle: string;
  content: string;
};

type Props = {
  translations: Record<string, BioTranslation>;
  role: string;
};

export default function LangBio({ translations, role }: Props) {
  const { lang } = useLang();
  const t = translations[lang] ?? translations['en'];

  return (
    <>
      <p className="text-xs font-medium uppercase tracking-widest text-sky-600 dark:text-cyan-300">{role}</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-4xl">
        <TypewriterText key={lang} text={t.title} />
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">{t.subtitle}</p>
      <div className="mt-4 prose prose-sm prose-slate dark:prose-invert max-w-none">
        <Markdown content={t.content} />
      </div>
    </>
  );
}
