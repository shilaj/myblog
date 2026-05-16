import Link from 'next/link';
import { notFound } from 'next/navigation';
import Comments from '@/components/Comments';
import Markdown from '@/components/Markdown';
import { getPostSlugs, getPostBySlug, getAllPosts } from '@/lib/markdown';

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post not found' };
  return {
    title: `${post.frontmatter.title} | Blog`,
    description: post.frontmatter.excerpt ?? post.content.slice(0, 140),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const posts = getAllPosts();
  const index = posts.findIndex((e) => e.slug === post.slug);
  if (index === -1) notFound();

  const prev = posts.length > 1 ? posts[(index + 1) % posts.length] : null;
  const next = posts.length > 1 ? posts[(index - 1 + posts.length) % posts.length] : null;

  return (
    <article className="fade-up prose prose-slate max-w-none dark:prose-invert prose-a:text-sky-600 dark:prose-a:text-cyan-300 prose-a:no-underline hover:prose-a:underline">
      <Link href="/blogs" className="not-prose inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
        ← Back to blog
      </Link>
      <p className="not-prose mt-6 text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
        {new Date(post.frontmatter.date).toLocaleDateString(undefined, {
          year: 'numeric', month: 'long', day: 'numeric',
        })}
      </p>
      <h1 className="mt-2">{post.frontmatter.title}</h1>
      {post.frontmatter.tags && (
        <p className="text-sm text-sky-600 dark:text-cyan-200">{post.frontmatter.tags.join(' · ')}</p>
      )}
      <Markdown content={post.content} />

      <div className="not-prose mt-12 flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
        {prev ? (
          <Link href={`/blogs/${prev.slug}`} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
            <span aria-hidden="true">←</span>
            <span>{prev.frontmatter.title}</span>
          </Link>
        ) : (
          <span className="text-slate-400 dark:text-slate-600">Only entry so far</span>
        )}
        {next ? (
          <Link href={`/blogs/${next.slug}`} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
            <span>{next.frontmatter.title}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <span className="text-slate-400 dark:text-slate-600">Only entry so far</span>
        )}
      </div>

      <Comments threadId={`blog-${slug}`} title="Comments" />
    </article>
  );
}
