import Image from 'next/image';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { getMarkdownContent } from '@/lib/markdown';

export const metadata = { title: 'Hobbies' };

export default function HobbiesPage() {
  const { frontmatter, content } = getMarkdownContent('hobbies.md');
  const gallery = (frontmatter as any).gallery || [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="mb-8 space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-200/80">{frontmatter.description}</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">{frontmatter.title || 'Hobbies'}</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-sky-900/20">
            <MarkdownRenderer content={content} />
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {gallery.map((item: any) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-md shadow-sky-900/20"
              >
                {item.media ? (
                  <div className="relative h-40 w-full">
                    <Image src={item.media} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 300px" />
                  </div>
                ) : (
                  <div className="flex h-40 items-center justify-center bg-slate-900 text-sm text-slate-400">Add media</div>
                )}
                <div className="space-y-1 p-4">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-slate-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
