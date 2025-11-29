import Link from 'next/link';
import { getAllPosts } from '@/lib/markdown';

export const metadata = {
  title: 'Blogs',
  description: 'Writeups and musings!'
};

export default function BlogsPage() {
  const posts = getAllPosts();

  return (
    <div>
      <header className="mb-8">
        <p className="text-sm uppercase tracking-widest text-slate-400">Blogs</p>
        <h1 className="text-3xl font-semibold text-white">Scribbles in Progress</h1>
        <p className="mt-2 text-slate-300">
          This is where I try to dump my thoughts!
        </p>
      </header>

      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              {new Date(post.frontmatter.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{post.frontmatter.title}</h2>
            {post.frontmatter.tags && (
              <p className="mt-1 text-sm text-cyan-200">{post.frontmatter.tags.join(' · ')}</p>
            )}
            {post.frontmatter.excerpt && <p className="mt-4 text-slate-300">{post.frontmatter.excerpt}</p>}
            <Link href={`/blogs/${post.slug}`} className="mt-4 inline-flex text-sm text-cyan-300 hover:underline">
              Read post →
            </Link>
          </article>
        ))}

        {/* {posts.length === 0 && <p className="text-slate-400">No posts yet — add one in <code>content/blogs/</code>.</p>} */}
      </div>
    </div>
  );
}
