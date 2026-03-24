import Link from 'next/link';
import { notFound } from 'next/navigation';
import Comments from '@/components/Comments';
import Markdown from '@/components/Markdown';
import { getPoemBySlug, getPoemSlugs, getAllPoems } from '@/lib/markdown';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getPoemSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props) {
  const poem = getPoemBySlug(params.slug);
  if (!poem) return { title: 'Poem not found' };
  return {
    title: `${poem.frontmatter.title} | Poetry`,
    description: poem.frontmatter.subtitle ?? 'Poetry notebook',
  };
}

export default function PoemPage({ params }: Props) {
  const poem = getPoemBySlug(params.slug);
  if (!poem) notFound();

  const poems = getAllPoems();
  const index = poems.findIndex((e) => e.slug === poem.slug);
  if (index === -1) notFound();

  const prev = poems.length > 1 ? poems[(index + 1) % poems.length] : null;
  const next = poems.length > 1 ? poems[(index - 1 + poems.length) % poems.length] : null;

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <Link href="/hobbies#poetry" className="not-prose text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
        ← Back to poetry
      </Link>
      <p className="mt-6 text-xs font-medium uppercase tracking-[0.3em] text-pink-600 dark:text-pink-200">Poetry</p>
      <h1>{poem.frontmatter.title}</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {poem.frontmatter.subtitle}
        {poem.frontmatter.date && (
          <> · {new Date(poem.frontmatter.date).toLocaleDateString(undefined, {
            year: 'numeric', month: 'long', day: 'numeric',
          })}</>
        )}
      </p>
      <Markdown content={poem.content} />

      <div className="not-prose mt-12 flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
        {prev ? (
          <Link href={`/hobbies/poetry/${prev.slug}`} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
            <span aria-hidden="true">←</span>
            <span>{prev.frontmatter.title}</span>
          </Link>
        ) : <span className="text-slate-400 dark:text-slate-600">Only entry so far</span>}
        {next ? (
          <Link href={`/hobbies/poetry/${next.slug}`} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
            <span>{next.frontmatter.title}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ) : <span className="text-slate-400 dark:text-slate-600">Only entry so far</span>}
      </div>
      <Comments threadId={`poem-${params.slug}`} title="Comments" />
    </article>
  );
}
