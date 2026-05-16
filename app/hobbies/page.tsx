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
    <article className="fade-up max-w-none">
      <header className="mb-8">
        <p className="eyebrow">Hobbies</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-4xl">
          {doc.frontmatter.title}
        </h1>
      </header>

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-sky-600 dark:prose-a:text-cyan-300">
        <Markdown content={doc.content} />
      </div>

      {/* Quick-jump cards */}
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {[
          { id: 'poetry', accent: 'Poetry', title: 'Poetry notebooks', description: 'Nepali + English verses.', gradient: 'from-pink-500/20 to-rose-400/10' },
          { id: 'projects', accent: 'Projects', title: 'Pet playgrounds', description: 'A collection of experiments.', gradient: 'from-sky-500/20 to-indigo-400/10' },
        ].map((block) => (
          <Link
            key={block.id}
            href={`#${block.id}`}
            className="card card-hover group relative overflow-hidden p-6"
          >
            <div className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${block.gradient} blur-2xl opacity-70 transition group-hover:opacity-100`} aria-hidden="true" />
            <p className="eyebrow">{block.accent}</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{block.title}</h2>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">{block.description}</p>
          </Link>
        ))}
      </div>

      {/* Poetry */}
      <section id="poetry" className="mt-20 scroll-mt-24">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="eyebrow !text-pink-600 dark:!text-pink-300">Poetry</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Verses & breathwork
            </h3>
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400">{poems.length} notebooks</span>
        </div>
        <div className="grid gap-3">
          {poems.map((poem) => {
            const excerpt = cleanExcerpt(poem.content);
            return (
              <Link
                key={poem.slug}
                href={`/hobbies/poetry/${poem.slug}`}
                className="card card-hover group block p-5"
              >
                <div className="flex flex-wrap items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-pink-600 dark:text-pink-300">
                  <span>{poem.frontmatter.subtitle ?? 'Poem'}</span>
                  <span className="text-slate-400 dark:text-white/30">
                    {new Date(poem.frontmatter.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <h4 className="mt-2.5 text-lg font-semibold text-slate-900 transition group-hover:text-pink-700 dark:text-white dark:group-hover:text-pink-200">
                  {poem.frontmatter.title}
                </h4>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                  {excerpt.slice(0, 120)}{excerpt.length > 120 ? '…' : ''}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mt-20 scroll-mt-24">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="eyebrow">Pet projects</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Playful sandboxes
            </h3>
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400">{projects.length} builds</span>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/hobbies/projects/${project.slug}`}
              className="card card-hover group overflow-hidden"
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
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-sky-600 dark:text-cyan-300">
                  {project.frontmatter.tags?.join(' · ') ?? 'Experiment'}
                </p>
                <h4 className="mt-2.5 text-lg font-semibold text-slate-900 transition group-hover:text-sky-700 dark:text-white dark:group-hover:text-cyan-200">
                  {project.frontmatter.title}
                </h4>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">{project.frontmatter.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
