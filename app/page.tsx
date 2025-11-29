import Image from 'next/image';
import Link from 'next/link';
import Markdown from '@/components/Markdown';
import TypewriterText from '@/components/TypewriterText';
import ZoomableImage from '@/components/ZoomableImage';
import { getMarkdownContent, getAllPosts, getCollaboratorImages, type BlogFrontmatter } from '@/lib/markdown';

export const dynamic = 'force-static';

type HomeFrontmatter = {
  name: string;
  role: string;
  title: string;
  subtitle: string;
  profile_image_path?: string;
  social_links?: Record<string, string>;
  collaborators?: Array<{ name: string; affiliation?: string; url?: string; avatar?: string }>;
};

const socialLabels: Record<string, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  scholar: 'Google Scholar',
  twitter: 'Twitter',
  email: 'Email',
  x: 'X',
  orcid: 'ORCID'
};

export default function HomePage() {
  const homeDoc = getMarkdownContent<HomeFrontmatter>('home.md');
  const publicationsDoc = getMarkdownContent<{ title: string }>('publications.md');
  const posts = getAllPosts().slice(0, 3);
  const collaboratorImages = getCollaboratorImages();
  const publicationLines = publicationsDoc.content
    .split('\n')
    .filter((line) => line.trim().startsWith('- '));
  const publicationsPreview = publicationLines.length > 0
    ? publicationLines.slice(0, 3).join('\n')
    : publicationsDoc.content;

  return (
    <div className="space-y-12 md:space-y-16">
      <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-widest text-slate-300">{homeDoc.frontmatter.role}</p>
          <h1 className="mt-4 text-4xl font-semibold text-white lg:text-5xl">
            <TypewriterText text={homeDoc.frontmatter.title} />
          </h1>
          <p className="mt-4 text-lg text-slate-300">{homeDoc.frontmatter.subtitle}</p>
          {homeDoc.frontmatter.social_links && (
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              {Object.entries(homeDoc.frontmatter.social_links).map(([key, url]) => (
                <Link
                  key={key}
                  href={url}
                  className="rounded-full border border-white/20 px-4 py-2 text-slate-200 transition hover:bg-white hover:text-slate-900"
                >
                  {socialLabels[key] ?? key}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="rounded-2xl border border-white/15 bg-slate-900/40 p-6 text-sm text-slate-300">
          <Markdown className="prose prose-invert max-w-none" content={homeDoc.content} />
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Natural circulation</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Fluid intuition in motion</h3>
          <p className="mt-2 text-sm text-slate-300">
            Movie showing the predicted flow movements using XRePIT for a 3D natural circulation case.
          </p>
          <video
            src="/assets/img/natural_circulation.mp4"
            className="mt-4 aspect-video w-full rounded-2xl border border-white/10"
            autoPlay
            loop
            muted
            playsInline
            controls
          />
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-pink-200">Framework</p>
          <h3 className="mt-2 text-2xl font-semibold text-white"><a href="https://arxiv.org/abs/2510.21804" target="_blank" rel="noreferrer">How XRePIT works?</a></h3>
          <p className="mt-2 text-sm text-slate-300">
            XRePIT is a framework for generating high-fidelity flow predictions using machine learning and CFD.
          </p>
          <div className="mt-4">
            <ZoomableImage
              src="/assets/img/XRePIT_workflow.jpg"
              alt="XRePIT framework schematic"
              initialZoom={1.4}
              priority
            />
          </div>
        </div>
      </section>

      <section>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white">{publicationsDoc.frontmatter.title}</h2>
          <Markdown className="prose prose-invert mt-4 max-w-none" content={publicationsPreview} />
          <div className="mt-6">
            <Link href="/publications" className="text-sm text-cyan-300 hover:underline">
              Browse publications →
            </Link>
          </div>
        </div>
      </section>

      {collaboratorImages.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-white">Collaborators</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {collaboratorImages.map((src) => (
              <div key={src} className="rounded-3xl border border-white/10 bg-slate-900/40 p-3">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-950/60">
                  <Image
                    src={src}
                    alt="Collaborator portrait"
                    fill
                    sizes="(min-width: 768px) 240px, 100vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Recent Writing</h2>
          <Link href="/blogs" className="text-sm text-cyan-300 hover:underline">
            View all posts
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-wide text-cyan-200">
                {new Date(post.frontmatter.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">{post.frontmatter.title}</h3>
              {post.frontmatter.excerpt && <p className="mt-2 text-sm text-slate-300">{post.frontmatter.excerpt}</p>}
              <div className="mt-4">
                <Link href={`/blogs/${post.slug}`} className="text-sm text-cyan-300 hover:underline">
                  Read post →
                </Link>
              </div>
            </article>
          ))}
          {posts.length === 0 && (
            <p className="text-sm text-slate-400">Add Markdown files inside <code>content/blogs/</code> to publish posts.</p>
          )}
        </div>
      </section>
    </div>
  );
}
