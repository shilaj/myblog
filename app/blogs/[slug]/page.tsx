import { notFound } from 'next/navigation';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { getPostBySlug, getPostSlugs } from '@/lib/markdown';

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    const post = getPostBySlug(slug);
    return (
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="mb-8 space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-200/80">Blog</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">{post.frontmatter.title}</h1>
          <p className="text-sm text-slate-300">
            {post.frontmatter.date ? new Date(post.frontmatter.date).toLocaleDateString() : 'Undated'}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-sky-900/20">
          <MarkdownRenderer content={post.content} />
        </div>
      </article>
    );
  } catch (error) {
    notFound();
  }
}
