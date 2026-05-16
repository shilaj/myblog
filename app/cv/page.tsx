import Link from 'next/link';
import Markdown from '@/components/Markdown';
import { getMarkdownContent } from '@/lib/markdown';

export const metadata = {
  title: 'CV | Shilaj Baral',
  description: 'Curriculum vitae.',
};

export default function CvPage() {
  const doc = getMarkdownContent<{ title: string }>('cv.md');

  return (
    <div className="fade-up space-y-8">
      <article>
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Curriculum Vitae</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-4xl">
              {doc.frontmatter.title}
            </h1>
          </div>
          <Link
            href="/resume/Shilaj_Baral_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-400 hover:text-sky-700 hover:shadow-md hover:shadow-sky-500/20 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-cyan-300/60 dark:hover:text-cyan-200"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </Link>
        </header>
        <div className="card p-6 lg:p-8">
          <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-sky-600 dark:prose-a:text-cyan-300 prose-a:no-underline hover:prose-a:underline">
            <Markdown content={doc.content} />
          </div>
        </div>
      </article>
    </div>
  );
}
