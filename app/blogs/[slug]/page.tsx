import Link from 'next/link';
import { notFound } from 'next/navigation';
import Comments from '@/components/Comments';
import Markdown from '@/components/Markdown';
import { getPostSlugs, getPostBySlug, getAllPosts } from '@/lib/markdown';

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post not found'
    };
  }

  return {
    title: `${post.frontmatter.title} | Blogs`,
    description: post.frontmatter.excerpt ?? post.content.slice(0, 140)
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }
  const posts = getAllPosts();
  const index = posts.findIndex((entry) => entry.slug === post.slug);

  if (index === -1) {
    notFound();
  }

  const showNavLinks = posts.length > 1;
  const previousPost = showNavLinks ? posts[(index + 1) % posts.length] : null;
  const nextPost = showNavLinks ? posts[(index - 1 + posts.length) % posts.length] : null;

  return (
    <article className="prose prose-invert max-w-none">
      <p className="text-xs uppercase tracking-wide text-slate-400">
        {new Date(post.frontmatter.date).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>
      <h1>{post.frontmatter.title}</h1>
      {post.frontmatter.tags && <p className="text-sm text-cyan-200">{post.frontmatter.tags.join(' · ')}</p>}
      <Markdown content={post.content} />
      <div className="mt-12 flex flex-col gap-4 text-sm text-cyan-200 md:flex-row md:items-center md:justify-between">
        {previousPost ? (
          <Link href={`/blogs/${previousPost.slug}`} className="flex items-center gap-2 hover:underline">
            <span aria-hidden="true">←</span>
            <span className="text-white">{previousPost.frontmatter.title}</span>
          </Link>
        ) : (
          <span className="text-slate-500">Only entry so far</span>
        )}
        {nextPost ? (
          <Link href={`/blogs/${nextPost.slug}`} className="flex items-center gap-2 hover:underline">
            <span className="text-white">{nextPost.frontmatter.title}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <span className="text-slate-500">Only entry so far</span>
        )}
      </div>
      <Comments threadId={`blog-${params.slug}`} title="Blog comments" />
    </article>
  );
}
