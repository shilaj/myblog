import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getAllPosts, getMarkdownContent } from '@/lib/markdown';

export const metadata = { title: 'Blogs' };

export default function BlogsPage() {
  const posts = getAllPosts();
  const pageCopy = getMarkdownContent('blogs-page.md');

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="mb-8 space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-200/80">{pageCopy.frontmatter.intro}</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">{pageCopy.frontmatter.title}</h1>
        <p className="text-slate-300">{pageCopy.frontmatter.description}</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-sky-400/50 hover:bg-white/10"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>{post.frontmatter.date ? new Date(post.frontmatter.date).toLocaleDateString() : 'No date'}</span>
                <ArrowUpRight className="h-4 w-4 text-sky-200 opacity-0 transition group-hover:opacity-100" />
              </div>
              <h2 className="text-xl font-semibold text-white">{post.frontmatter.title}</h2>
              <p className="text-sm text-slate-300">{post.frontmatter.excerpt}</p>
            </div>
            {post.frontmatter.tags && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
