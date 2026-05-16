import Link from 'next/link';
import { getAllPosts } from '@/lib/markdown';

export const metadata = {
  title: 'Blog | Shilaj Baral',
  description: 'Writeups on research, physics, and life.',
};

export default function BlogsPage() {
  const posts = getAllPosts();

  return (
    <div className="fade-up">
      <header className="mb-10">
        <p className="eyebrow">Blog</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-4xl">
          Scribbles in Progress
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
          Thoughts on research, physics, and everything in between.
        </p>
      </header>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="card card-hover group block p-6"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
              {new Date(post.frontmatter.date).toLocaleDateString(undefined, {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900 transition group-hover:text-sky-700 dark:text-white dark:group-hover:text-cyan-200">
              {post.frontmatter.title}
            </h2>
            {post.frontmatter.tags && (
              <p className="mt-1.5 text-sm text-sky-600 dark:text-cyan-200">
                {post.frontmatter.tags.join(' · ')}
              </p>
            )}
            {post.frontmatter.excerpt && (
              <p className="mt-3 text-slate-600 dark:text-slate-300">{post.frontmatter.excerpt}</p>
            )}
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-600 dark:text-cyan-300">
              Read post
              <span className="transition group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-slate-500 dark:text-slate-400">
            No posts yet — add one in <code>content/blogs/</code>.
          </p>
        )}
      </div>
    </div>
  );
}
