import Link from 'next/link';
import Markdown from '@/components/Markdown';
import { getMarkdownContent } from '@/lib/markdown';

export const metadata = {
  title: 'CV | AI × CFD',
  description: 'Downloadable résumé powered by Markdown.'
};

export default function CvPage() {
  const doc = getMarkdownContent<{ title: string }>('cv.md');

  return (
    <div className="space-y-6">
      <article className="prose prose-invert max-w-none">
        <p className="text-sm uppercase tracking-widest text-slate-400">Curriculum Vitae</p>
        <h1>{doc.frontmatter.title}</h1>
        <Markdown content={doc.content} />
      </article>
      <Link
        href="/resume/Shilaj_Baral_Resume.pdf"
        className="inline-flex rounded-full border border-white/20 px-5 py-2 text-sm text-cyan-300 hover:bg-white hover:text-slate-900"
      >
        Download PDF
      </Link>
    </div>
  );
}
