import Markdown from '@/components/Markdown';
import { getMarkdownContent } from '@/lib/markdown';

export const metadata = {
  title: 'Conferences & Talks | AI × CFD',
  description: 'Talks and conference participation updated from Markdown.'
};

export default function ConferencesPage() {
  const doc = getMarkdownContent<{ title: string }>('conferences.md');

  return (
    <article className="prose prose-invert max-w-none">
      <p className="text-sm uppercase tracking-widest text-slate-400">Conferences & Talks</p>
      <h1>{doc.frontmatter.title}</h1>
      <Markdown content={doc.content} />
    </article>
  );
}
