import Link from 'next/link';
import { getAllPosts } from '@/lib/markdown';

export const metadata = {
  title: 'Blog | Shilaj Baral',
  description: 'Writeups on research, physics, and life.',
};

export default function BlogsPage() {
  const posts = getAllPosts();

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-widest text-sky-600 dark:text-cyan-300">Blog</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Scribbles in Progress</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Thoughts on research, physics, and everything else.</p>
      </header>

      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
              {new Date(post.frontmatter.date).toLocaleDateString(undefined, {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{post.frontmatter.title}</h2>
            {post.frontmatter.tags && (
              <p className="mt-1 text-sm text-sky-600 dark:text-cyan-200">{post.frontmatter.tags.join(' · ')}</p>
            )}
            {post.frontmatter.excerpt && (
              <p className="mt-3 text-slate-600 dark:text-slate-300">{post.frontmatter.excerpt}</p>
            )}
            <Link href={`/blogs/${post.slug}`} className="mt-4 inline-block text-sm font-medium text-sky-600 hover:underline dark:text-cyan-300">
              Read post →
            </Link>
          </article>
        ))}
        {posts.length === 0 && (
          <p className="text-slate-500 dark:text-slate-400">No posts yet — add one in <code>content/blogs/</code>.</p>
        )}
      </div>
    </div>
  );
}
