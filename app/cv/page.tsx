import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { getMarkdownContent } from '@/lib/markdown';

export const metadata = { title: 'Curriculum Vitae' };

export default function CvPage() {
  const { frontmatter, content } = getMarkdownContent('cv.md');
  const pdfUrl = (frontmatter as any).pdf_url;
  const updated = (frontmatter as any).updated;

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="mb-8 space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-200/80">CV</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">{frontmatter.title || 'Curriculum Vitae'}</h1>
        {updated && <p className="text-sm text-slate-300">Updated {new Date(updated).toLocaleDateString()}</p>}
        {pdfUrl && (
          <Link
            href={pdfUrl}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-sky-400/50 hover:text-white"
          >
            Download PDF <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-sky-900/20">
        <MarkdownRenderer content={content} />
      </div>
    </section>
  );
}
