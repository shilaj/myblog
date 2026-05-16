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
      <p className="eyebrow">{role}</p>
      <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white lg:text-[2.5rem]">
        <TypewriterText key={lang} text={t.title} />
      </h1>
      <p className="mt-4 text-base text-slate-600 dark:text-slate-300 lg:text-lg">{t.subtitle}</p>
      <div className="mt-5 prose prose-slate dark:prose-invert max-w-none prose-a:text-sky-600 dark:prose-a:text-cyan-300 prose-a:no-underline hover:prose-a:underline">
        <Markdown content={t.content} />
      </div>
    </>
  );
}
