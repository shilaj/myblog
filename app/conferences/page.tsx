import Markdown from '@/components/Markdown';
import { getMarkdownContent } from '@/lib/markdown';

export const metadata = {
  title: 'Conferences & Talks | Shilaj Baral',
  description: 'Conference presentations and invited talks.',
};

export default function ConferencesPage() {
  const doc = getMarkdownContent<{ title: string }>('conferences.md');

  return (
    <article>
      <p className="text-xs font-medium uppercase tracking-widest text-sky-600 dark:text-cyan-300">Conferences & Talks</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{doc.frontmatter.title}</h1>
      <div className="mt-6 prose prose-slate max-w-none dark:prose-invert">
        <Markdown content={doc.content} />
      </div>
    </article>
  );
}
