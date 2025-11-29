import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { getMarkdownContent } from '@/lib/markdown';

type Highlight = {
  title: string;
  description: string;
};

type Collaborator = {
  name: string;
  affiliation?: string;
  url?: string;
  avatar?: string;
};

export default function HomePage() {
  const { frontmatter, content } = getMarkdownContent('home.md');
  const {
    title,
    subtitle,
    profile_image_path,
    social_links,
    collaborators,
    name,
    role,
    tagline,
    highlights,
    collaborators_label,
    collaborators_heading,
  } = frontmatter as {
    title?: string;
    subtitle?: string;
    profile_image_path?: string;
    social_links?: Record<string, string>;
    collaborators?: Collaborator[];
    name?: string;
    role?: string;
    tagline?: string;
    highlights?: Highlight[];
    collaborators_label?: string;
    collaborators_heading?: string;
  };

  return (
    <div className="relative overflow-hidden">
      <div className="gradient-glow absolute -left-10 -top-24 h-64 w-64 rounded-full" aria-hidden />
      <div className="gradient-glow absolute -right-20 top-24 h-72 w-72 rounded-full" aria-hidden />
      <section className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-12 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:pb-24 lg:pt-16">
        <div className="space-y-6 lg:w-1/2">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-200/80">{tagline}</p>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              {title || 'Flow-Aware Intelligence'}
            </h1>
            <p className="text-xl text-slate-200 sm:text-2xl">{subtitle}</p>
            <p className="text-base font-medium text-slate-300">
              {name} · {role}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            {social_links?.github && (
              <Link
                href={social_links.github}
                className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 transition hover:border-sky-400/40 hover:text-white"
              >
                GitHub <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
            {social_links?.linkedin && (
              <Link
                href={social_links.linkedin}
                className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 transition hover:border-sky-400/40 hover:text-white"
              >
                LinkedIn <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
            {social_links?.scholar && (
              <Link
                href={social_links.scholar}
                className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 transition hover:border-sky-400/40 hover:text-white"
              >
                Google Scholar <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-sky-900/30 backdrop-blur">
            <MarkdownRenderer content={content} />
          </div>
        </div>
        <div className="relative lg:w-1/2">
          <div className="relative mx-auto h-80 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 shadow-xl shadow-sky-900/40">
            {profile_image_path ? (
              <Image
                src={profile_image_path}
                alt={name || 'Profile image'}
                fill
                className="rounded-2xl object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 text-sm text-slate-400">
                Add a profile image via content/home.md
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>
          {highlights && (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-200/80">{collaborators_label}</p>
            <h2 className="text-2xl font-semibold text-white">{collaborators_heading}</h2>
          </div>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-sky-500/50 via-slate-500/30 to-transparent sm:block" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collaborators?.map((collab) => (
            <Link
              key={collab.name}
              href={collab.url || '#'}
              className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-sky-400/50 hover:bg-white/10"
            >
              <div className="h-14 w-14 overflow-hidden rounded-full border border-white/10 bg-slate-900">
                {collab.avatar ? (
                  <Image src={collab.avatar} alt={collab.name} width={56} height={56} className="h-14 w-14 object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">Avatar</div>
                )}
              </div>
              <div>
                <p className="text-base font-semibold text-white">{collab.name}</p>
                <p className="text-sm text-slate-300">{collab.affiliation}</p>
              </div>
              <ArrowUpRight className="ml-auto h-4 w-4 text-sky-200 opacity-0 transition group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
