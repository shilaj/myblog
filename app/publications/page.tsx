import Markdown from '@/components/Markdown';
import { getMarkdownContent } from '@/lib/markdown';

export const metadata = {
  title: 'Publications',
  description: 'Selected publications updated via Markdown.'
};

export default function PublicationsPage() {
  const doc = getMarkdownContent<{ title: string }>('publications.md');

  return (
    <article className="prose prose-invert max-w-none">
      <p className="text-sm uppercase tracking-widest text-slate-400">Publications</p>
      <h1>{doc.frontmatter.title}</h1>
      <Markdown content={doc.content} />
    </article>
  );
}
