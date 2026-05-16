import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Comments from '@/components/Comments';
import Markdown from '@/components/Markdown';
import { getProjectBySlug, getProjectSlugs, getAllProjects } from '@/lib/markdown';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: `${project.frontmatter.title} | Projects`,
    description: project.frontmatter.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const projects = getAllProjects();
  const index = projects.findIndex((e) => e.slug === project.slug);
  if (index === -1) notFound();

  const prev = projects.length > 1 ? projects[(index + 1) % projects.length] : null;
  const next = projects.length > 1 ? projects[(index - 1 + projects.length) % projects.length] : null;
  const isExternalLink = project.frontmatter.link?.startsWith('http');

  return (
    <article className="fade-up max-w-3xl">
      <Link href="/hobbies#projects" className="inline-flex items-center gap-1 text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
        ← Back to projects
      </Link>
      <p className="mt-6 eyebrow">Pet project</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-4xl">{project.frontmatter.title}</h1>
      <p className="mt-1.5 text-slate-600 dark:text-slate-400">{project.frontmatter.summary}</p>

      {project.frontmatter.image && (
        <div className="relative mt-8 h-64 w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
          <Image
            src={project.frontmatter.image}
            alt={project.frontmatter.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover object-center"
          />
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {project.frontmatter.tags?.map((tag) => (
          <span key={tag} className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-slate-600 dark:border-white/10 dark:bg-white/10 dark:text-cyan-200">
            {tag}
          </span>
        ))}
        {project.frontmatter.link && (
          <Link href={project.frontmatter.link} className="text-sm font-medium text-sky-600 underline dark:text-cyan-300" target={isExternalLink ? '_blank' : undefined}>
            Live demo ↗
          </Link>
        )}
        {project.frontmatter.repo && (
          <Link href={project.frontmatter.repo} className="text-sm font-medium text-sky-600 underline dark:text-cyan-300" target="_blank">
            Source ↗
          </Link>
        )}
      </div>

      {project.frontmatter.embedPath && (
        <section className="mt-8 space-y-2">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-black dark:border-white/10">
            <iframe
              src={project.frontmatter.embedPath}
              title={`${project.frontmatter.title} demo`}
              className="h-[min(70vh,640px)] min-h-[300px] w-full"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Tip: use headphones for interval cues and try streak mode to trigger the gradient bloom.
          </p>
        </section>
      )}

      <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
        <Markdown content={project.content} />
      </div>

      <div className="mt-12 flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
        {prev ? (
          <Link href={`/hobbies/projects/${prev.slug}`} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
            <span aria-hidden="true">←</span>
            <span>{prev.frontmatter.title}</span>
          </Link>
        ) : <span className="text-slate-400 dark:text-slate-600">Only build so far</span>}
        {next ? (
          <Link href={`/hobbies/projects/${next.slug}`} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
            <span>{next.frontmatter.title}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ) : <span className="text-slate-400 dark:text-slate-600">Only build so far</span>}
      </div>
      <Comments threadId={`project-${slug}`} title="Comments" />
    </article>
  );
}
