import Image from 'next/image';
import Link from 'next/link';
import Markdown from '@/components/Markdown';
import {
  getAllPoems,
  getAllProjects,
  getMarkdownContent,
} from '@/lib/markdown';

export const metadata = {
  title: 'Hobbies | AI × CFD',
  description: 'Personal pursuits that keep research balanced.'
};

export default function HobbiesPage() {
  const doc = getMarkdownContent<{ title: string }>('hobbies.md');
  const poems = getAllPoems();
  const projects = getAllProjects();

  const heroBlocks = [
    {
      id: 'poetry',
      title: 'Poetry notebooks',
      description: 'Nepali + English verses exploring pace, belonging, and breath.',
      accent: 'Poetry',
    },
    {
      id: 'projects',
      title: 'Pet playgrounds',
      description: 'Collection of mere tries!',
      accent: 'Projects',
    },
  ];

  const cleanExcerpt = (raw: string) =>
    raw
      .replace(/<br\s*\/?>(\s)*/gi, ' ')
      .replace(/<[^>]+>/g, '')
      .trim();

  return (
    <article className="max-w-none">
      <p className="text-sm uppercase tracking-widest text-slate-400">Hobbies</p>
      <h1 className="text-4xl font-semibold text-white">{doc.frontmatter.title}</h1>
      <div className="mt-6 prose prose-invert max-w-none">
        <Markdown content={doc.content} />
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {heroBlocks.map((block) => (
          <Link
            key={block.id}
            href={`#${block.id}`}
            className="group rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-300">
              <span>{block.accent}</span>
              <span className="opacity-60">Dive in</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-white">{block.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{block.description}</p>
          </Link>
        ))}
      </div>

      <section id="poetry" className="mt-16">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-pink-200">Poetry</p>
            <h3 className="text-2xl font-medium text-white">Verses & breathwork</h3>
          </div>
          <span className="text-sm text-slate-400">{poems.length} notebooks</span>
        </div>
        <div className="mt-6 grid gap-4">
          {poems.map((poem) => {
            const excerpt = cleanExcerpt(poem.content);

            return (
              <Link
                key={poem.slug}
                href={`/hobbies/poetry/${poem.slug}`}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5 transition hover:border-pink-200/40 hover:bg-white/10"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-pink-200">
                  <span>{poem.frontmatter.subtitle || 'Poem'}</span>
                  <span className="text-white/30">
                    {new Date(poem.frontmatter.date).toLocaleDateString(undefined, {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <h4 className="mt-3 text-xl font-semibold text-white">{poem.frontmatter.title}</h4>
                <p className="mt-2 text-sm text-slate-300">
                  {excerpt.slice(0, 120)}
                  {excerpt.length > 120 ? '…' : ''}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="projects" className="mt-16">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Pet projects</p>
            <h3 className="text-2xl font-medium text-white">Playful sandboxes</h3>
          </div>
          <span className="text-sm text-slate-400">{projects.length} builds</span>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/hobbies/projects/${project.slug}`}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-cyan-200/50"
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
                <div className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                  {project.frontmatter.tags?.join(' · ') || 'Experiment'}
                </div>
                <h4 className="mt-3 text-xl font-semibold text-white">{project.frontmatter.title}</h4>
                <p className="mt-2 text-sm text-slate-300">{project.frontmatter.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
