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
    <div className="space-y-6">
      <article>
        <p className="text-xs font-medium uppercase tracking-widest text-sky-600 dark:text-cyan-300">Curriculum Vitae</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{doc.frontmatter.title}</h1>
        <div className="mt-6 prose prose-slate max-w-none dark:prose-invert">
          <Markdown content={doc.content} />
        </div>
      </article>
      <Link
        href="/resume/Shilaj_Baral_Resume.pdf"
        className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white dark:border-white/20 dark:text-cyan-300 dark:hover:bg-white dark:hover:text-slate-900"
      >
        Download PDF ↓
      </Link>
    </div>
  );
}
