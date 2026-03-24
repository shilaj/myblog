import Image from 'next/image';
import Link from 'next/link';
import Markdown from '@/components/Markdown';
import { getAllPoems, getAllProjects, getMarkdownContent } from '@/lib/markdown';

export const metadata = {
  title: 'Hobbies | Shilaj Baral',
  description: 'Poetry and pet projects.',
};

export default function HobbiesPage() {
  const doc = getMarkdownContent<{ title: string }>('hobbies.md');
  const poems = getAllPoems();
  const projects = getAllProjects();

  const cleanExcerpt = (raw: string) =>
    raw.replace(/<br\s*\/?>(\s)*/gi, ' ').replace(/<[^>]+>/g, '').trim();

  return (
    <article className="max-w-none">
      <p className="text-xs font-medium uppercase tracking-widest text-sky-600 dark:text-cyan-300">Hobbies</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{doc.frontmatter.title}</h1>
      <div className="mt-5 prose prose-slate max-w-none dark:prose-invert">
        <Markdown content={doc.content} />
      </div>

      {/* Quick-jump cards */}
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {[
          { id: 'poetry', accent: 'Poetry', title: 'Poetry notebooks', description: 'Nepali + English verses.' },
          { id: 'projects', accent: 'Projects', title: 'Pet playgrounds', description: 'A collection of experiments.' },
        ].map((block) => (
          <Link
            key={block.id}
            href={`#${block.id}`}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:hover:bg-white/10"
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-600 dark:text-slate-300">{block.accent}</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{block.title}</h2>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">{block.description}</p>
          </Link>
        ))}
      </div>

      {/* Poetry */}
      <section id="poetry" className="mt-16">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-pink-600 dark:text-pink-200">Poetry</p>
            <h3 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">Verses & breathwork</h3>
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400">{poems.length} notebooks</span>
        </div>
        <div className="mt-5 grid gap-3">
          {poems.map((poem) => {
            const excerpt = cleanExcerpt(poem.content);
            return (
              <Link
                key={poem.slug}
                href={`/hobbies/poetry/${poem.slug}`}
                className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-pink-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-pink-200/40"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-pink-600 dark:text-pink-200">
                  <span>{poem.frontmatter.subtitle ?? 'Poem'}</span>
                  <span className="text-slate-400 dark:text-white/30">
                    {new Date(poem.frontmatter.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <h4 className="mt-2.5 text-lg font-semibold text-slate-900 dark:text-white">{poem.frontmatter.title}</h4>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                  {excerpt.slice(0, 120)}{excerpt.length > 120 ? '…' : ''}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mt-16">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-600 dark:text-cyan-200">Pet projects</p>
            <h3 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">Playful sandboxes</h3>
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400">{projects.length} builds</span>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/hobbies/projects/${project.slug}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:hover:border-cyan-200/50"
            >
              {project.frontmatter.image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.frontmatter.image}
                    alt={project.frontmatter.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-600 dark:text-cyan-200">
                  {project.frontmatter.tags?.join(' · ') ?? 'Experiment'}
                </p>
                <h4 className="mt-2.5 text-lg font-semibold text-slate-900 dark:text-white">{project.frontmatter.title}</h4>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">{project.frontmatter.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
