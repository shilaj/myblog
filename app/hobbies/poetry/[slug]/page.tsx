import Link from 'next/link';
import { notFound } from 'next/navigation';
import Comments from '@/components/Comments';
import Markdown from '@/components/Markdown';
import { getPoemBySlug, getPoemSlugs, getAllPoems } from '@/lib/markdown';

type PoemPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getPoemSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PoemPageProps) {
  const poem = getPoemBySlug(params.slug);

  if (!poem) {
    return { title: 'Poem not found' };
  }

  return {
    title: `${poem.frontmatter.title} | Poetry`,
    description: poem.frontmatter.subtitle || 'Poetry notebook',
  };
}

export default function PoemPage({ params }: PoemPageProps) {
  const poem = getPoemBySlug(params.slug);

  if (!poem) {
    notFound();
  }
  const poems = getAllPoems();
  const index = poems.findIndex((entry) => entry.slug === poem.slug);

  if (index === -1) {
    notFound();
  }

  const showNavLinks = poems.length > 1;
  const previousPoem = showNavLinks ? poems[(index + 1) % poems.length] : null;
  const nextPoem = showNavLinks ? poems[(index - 1 + poems.length) % poems.length] : null;

  return (
    <article className="prose prose-invert max-w-none">
      <Link href="/hobbies#poetry" className="text-sm text-slate-400 hover:text-white">
        ← Back to poetry index
      </Link>
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-pink-200">Poetry</p>
      <h1 className="text-4xl font-semibold text-white">{poem.frontmatter.title}</h1>
      <p className="text-sm text-slate-400">
        {poem.frontmatter.subtitle}
        {poem.frontmatter.date && (
          <>
            {' '}
            ·{' '}
            {new Date(poem.frontmatter.date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </>
        )}
      </p>
      <div className="mt-6">
        <Markdown content={poem.content} />
      </div>
      <div className="mt-12 flex flex-col gap-4 text-sm text-cyan-200 md:flex-row md:items-center md:justify-between">
        {previousPoem ? (
          <Link href={`/hobbies/poetry/${previousPoem.slug}`} className="flex items-center gap-2 hover:underline">
            <span aria-hidden="true">←</span>
            <span className="text-white">{previousPoem.frontmatter.title}</span>
          </Link>
        ) : (
          <span className="text-slate-500">Only entry so far</span>
        )}
        {nextPoem ? (
          <Link href={`/hobbies/poetry/${nextPoem.slug}`} className="flex items-center gap-2 hover:underline">
            <span className="text-white">{nextPoem.frontmatter.title}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <span className="text-slate-500">Only entry so far</span>
        )}
      </div>
      <Comments threadId={`poem-${params.slug}`} title="Poetry comments" />
    </article>
  );
}
