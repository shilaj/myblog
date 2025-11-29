import { MarkdownRenderer } from '@/components/markdown-renderer';
import { getMarkdownContent } from '@/lib/markdown';

export const metadata = { title: 'Publications' };

export default function PublicationsPage() {
  const { frontmatter, content } = getMarkdownContent('publications.md');

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="mb-8 space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-200/80">{frontmatter.description}</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">{frontmatter.title || 'Selected Publications'}</h1>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-sky-900/20">
        <MarkdownRenderer content={content} />
      </div>
    </section>
  );
}
