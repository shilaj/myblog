import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Comments from '@/components/Comments';
import Markdown from '@/components/Markdown';
import { getProjectBySlug, getProjectSlugs, getAllProjects } from '@/lib/markdown';

type ProjectPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return { title: 'Project not found' };
  }

  return {
    title: `${project.frontmatter.title} | Pet Projects`,
    description: project.frontmatter.summary,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }
  const projects = getAllProjects();
  const index = projects.findIndex((entry) => entry.slug === project.slug);

  if (index === -1) {
    notFound();
  }

  const showNavLinks = projects.length > 1;
  const previousProject = showNavLinks ? projects[(index + 1) % projects.length] : null;
  const nextProject = showNavLinks ? projects[(index - 1 + projects.length) % projects.length] : null;

  const isExternalLink = project.frontmatter.link?.startsWith('http');

  return (
    <article className="max-w-3xl">
      <Link href="/hobbies#projects" className="text-sm text-slate-400 hover:text-white">
        ← Back to pet projects
      </Link>
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-cyan-200">Pet project</p>
      <h1 className="text-4xl font-semibold text-white">{project.frontmatter.title}</h1>
      <p className="text-sm text-slate-400">{project.frontmatter.summary}</p>

      {project.frontmatter.image && (
        <div className="relative mt-8 h-64 w-full overflow-hidden rounded-3xl border border-white/10">
          <Image
            src={project.frontmatter.image}
            alt={project.frontmatter.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover object-center"
          />
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
        {project.frontmatter.tags?.map((tag) => (
          <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200">
            {tag}
          </span>
        ))}
        {project.frontmatter.link && (
          <Link
            href={project.frontmatter.link}
            className="text-cyan-300 underline"
            target={isExternalLink ? '_blank' : undefined}
          >
            Live demo ↗
          </Link>
        )}
        {project.frontmatter.repo && (
          <Link href={project.frontmatter.repo} className="text-cyan-300 underline" target="_blank">
            Source ↗
          </Link>
        )}
      </div>

      {project.frontmatter.embedPath && (
        <section className="mt-8 space-y-3">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-xl shadow-cyan-500/10">
            <iframe
              src={project.frontmatter.embedPath}
              title={`${project.frontmatter.title} playable demo`}
              className="h-[640px] w-full"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-slate-400">
            Tip: use headphones for interval cues and try streak mode to trigger the gradient bloom.
          </p>
        </section>
      )}

      <div className="prose prose-invert mt-8">
        <Markdown content={project.content} />
      </div>
      <div className="mt-12 flex flex-col gap-4 text-sm text-cyan-200 md:flex-row md:items-center md:justify-between">
        {previousProject ? (
          <Link href={`/hobbies/projects/${previousProject.slug}`} className="flex items-center gap-2 hover:underline">
            <span aria-hidden="true">←</span>
            <span className="text-white">{previousProject.frontmatter.title}</span>
          </Link>
        ) : (
          <span className="text-slate-500">Only build so far</span>
        )}
        {nextProject ? (
          <Link href={`/hobbies/projects/${nextProject.slug}`} className="flex items-center gap-2 hover:underline">
            <span className="text-white">{nextProject.frontmatter.title}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <span className="text-slate-500">Only build so far</span>
        )}
      </div>
      <Comments threadId={`project-${params.slug}`} title="Project comments" />
    </article>
  );
}
