import Markdown from '@/components/Markdown';
import { getMarkdownContent } from '@/lib/markdown';

export const metadata = {
  title: 'Conferences & Talks | Shilaj Baral',
  description: 'Conference presentations and invited talks.',
};

export default function ConferencesPage() {
  const doc = getMarkdownContent<{ title: string }>('conferences.md');

  return (
    <article className="fade-up">
      <header className="mb-8">
        <p className="eyebrow">Conferences & Talks</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-4xl">
          {doc.frontmatter.title}
        </h1>
      </header>
      <div className="card p-6 lg:p-8">
        <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-sky-600 dark:prose-a:text-cyan-300 prose-a:no-underline hover:prose-a:underline">
          <Markdown content={doc.content} />
        </div>
      </div>
    </article>
  );
}
