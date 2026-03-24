import Markdown from '@/components/Markdown';
import { getMarkdownContent } from '@/lib/markdown';

export const metadata = {
  title: 'Publications | Shilaj Baral',
  description: 'Selected publications in AI-assisted CFD for nuclear systems.',
};

export default function PublicationsPage() {
  const doc = getMarkdownContent<{ title: string }>('publications.md');

  return (
    <article>
      <p className="text-xs font-medium uppercase tracking-widest text-sky-600 dark:text-cyan-300">Publications</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{doc.frontmatter.title}</h1>
      <div className="mt-6 prose prose-slate max-w-none dark:prose-invert">
        <Markdown content={doc.content} />
      </div>
    </article>
  );
}
