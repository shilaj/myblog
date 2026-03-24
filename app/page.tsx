import Image from 'next/image';
import Link from 'next/link';
import Markdown from '@/components/Markdown';
import LangBio, { type BioTranslation } from '@/components/LangBio';
import ZoomableImage from '@/components/ZoomableImage';
import {
  getMarkdownContent,
  tryGetMarkdownContent,
  getAllPosts,
  getCollaboratorImages,
} from '@/lib/markdown';

export const dynamic = 'force-static';

type HomeFrontmatter = {
  name: string;
  role: string;
  title: string;
  subtitle: string;
  profile_image_path?: string;
  social_links?: Record<string, string>;
};

const socialIcons: Record<string, React.ReactNode> = {
  github: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.5v-1.8c-3.3.7-4-1.5-4-1.5-.6-1.3-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.6-.8 1.6-.8.9-1.6 2.5-1.1 3.1-.8.1-.7.4-1.1.7-1.4-2.6-.3-5.4-1.3-5.4-5.7 0-1.3.5-2.3 1.2-3.2-.1-.4-.5-1.5.1-3 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.5.2 2.6.1 3a5.1 5.1 0 0 1 1.2 3.2c0 4.4-2.8 5.4-5.4 5.7.4.3.7.9.7 1.8v2.7c0 .2.2.6.8.5A12 12 0 0 0 12 .5Z" /></svg>,
  linkedin: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 8.8h3.9V21H3zM9 8.8h3.7v1.7h.1a4 4 0 0 1 3.6-2c3.8 0 4.5 2.5 4.5 5.8V21H17v-6.1c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3v6.2H9z" /></svg>,
  scholar: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M12 2 3 6.5l9 4.5 7.5-3.8V14h2V6.6zm-9 7v6.5L12 21l9-5.5V9l-9 4.5z" /></svg>,
  email: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M2 6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2 0v.2l8 5 8-5V6H4zm16 3.5-7.7 4.8a1 1 0 0 1-1 0L4 9.5V18h16z" /></svg>,
  orcid: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m-2.3 4.2v11.6h-1.4V6.2zm1.7 0h3.3a4.2 4.2 0 0 1 0 8.4h-1.9v3.2h-1.4zm1.4 1.4v5.6h1.9a2.8 2.8 0 0 0 0-5.6z" /></svg>,
  x: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M18.1 2.3h3.7l-8.1 9.3 9.4 12.1h-7.4l-5.2-6.9-6 6.9H0l8.7-10-9-11.4h7.6l4.7 6.2z" /></svg>,
};

const socialLabels: Record<string, string> = {
  github: 'GitHub', linkedin: 'LinkedIn', scholar: 'Scholar',
  email: 'Email', orcid: 'ORCID', x: 'X',
};

function buildBio(doc: { frontmatter: HomeFrontmatter; content: string }): BioTranslation {
  return { title: doc.frontmatter.title, subtitle: doc.frontmatter.subtitle, content: doc.content };
}

export default function HomePage() {
  const homeDoc = getMarkdownContent<HomeFrontmatter>('home.md');
  const neDoc = tryGetMarkdownContent<Partial<HomeFrontmatter>>('home.ne.md');
  const koDoc = tryGetMarkdownContent<Partial<HomeFrontmatter>>('home.ko.md');
  const publicationsDoc = getMarkdownContent<{ title: string }>('publications.md');
  const posts = getAllPosts().slice(0, 3);
  const collaboratorImages = getCollaboratorImages();

  const translations: Record<string, BioTranslation> = {
    en: buildBio(homeDoc),
    ne: neDoc
      ? { title: neDoc.frontmatter.title ?? homeDoc.frontmatter.title, subtitle: neDoc.frontmatter.subtitle ?? homeDoc.frontmatter.subtitle, content: neDoc.content }
      : buildBio(homeDoc),
    ko: koDoc
      ? { title: koDoc.frontmatter.title ?? homeDoc.frontmatter.title, subtitle: koDoc.frontmatter.subtitle ?? homeDoc.frontmatter.subtitle, content: koDoc.content }
      : buildBio(homeDoc),
  };

  const pubLines = publicationsDoc.content.split('\n').filter((l) => l.trim().startsWith('- '));
  const pubsPreview = pubLines.slice(0, 3).join('\n') || publicationsDoc.content;

  return (
    <div className="space-y-14">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Left: photo + social */}
        <div className="flex flex-col items-center gap-5 lg:items-start">
          {homeDoc.frontmatter.profile_image_path && (
            <div className="relative h-44 w-44 overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-white/10 lg:h-48 lg:w-48">
              <Image
                src={homeDoc.frontmatter.profile_image_path}
                alt={homeDoc.frontmatter.name}
                fill
                sizes="192px"
                className="object-cover object-top"
                priority
              />
            </div>
          )}
          {homeDoc.frontmatter.social_links && (
            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {Object.entries(homeDoc.frontmatter.social_links).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target={url.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  title={socialLabels[key] ?? key}
                  className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 transition hover:border-slate-400 hover:text-slate-900 dark:border-white/20 dark:text-slate-300 dark:hover:border-white/40 dark:hover:text-white"
                >
                  {socialIcons[key]}
                  <span>{socialLabels[key] ?? key}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right: language-aware bio */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          <LangBio translations={translations} role={homeDoc.frontmatter.role} />
        </div>
      </section>

      {/* ── Research highlight ────────────────────────────── */}
      <section className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none lg:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-600 dark:text-cyan-200">Natural circulation</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Fluid intuition in motion</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Flow predictions using XRePIT for a 3D natural circulation case.
          </p>
          <video
            src="/assets/img/natural_circulation.mp4"
            className="mt-4 aspect-video w-full rounded-xl border border-slate-200 dark:border-white/10"
            autoPlay loop muted playsInline controls
          />
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-900/40">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-pink-600 dark:text-pink-200">Framework</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
            <a href="https://arxiv.org/abs/2510.21804" target="_blank" rel="noreferrer" className="hover:underline">
              How XRePIT works
            </a>
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            High-fidelity flow predictions via ML + CFD.
          </p>
          <div className="mt-4">
            <ZoomableImage src="/assets/img/XRePIT_workflow.jpg" alt="XRePIT framework schematic" initialZoom={1.4} priority />
          </div>
        </div>
      </section>

      {/* ── Publications preview ──────────────────────────── */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{publicationsDoc.frontmatter.title}</h2>
        <Markdown className="prose prose-sm prose-slate mt-4 max-w-none dark:prose-invert" content={pubsPreview} />
        <div className="mt-5">
          <Link href="/publications" className="text-sm font-medium text-sky-600 hover:underline dark:text-cyan-300">
            All publications →
          </Link>
        </div>
      </section>

      {/* ── Collaborators ─────────────────────────────────── */}
      {collaboratorImages.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Collaborators</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {collaboratorImages.map((src) => (
              <div key={src} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-slate-900/40 dark:shadow-none">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-950/60">
                  <Image src={src} alt="Collaborator" fill sizes="240px" className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Recent writing ────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Recent Writing</h2>
          <Link href="/blogs" className="text-sm font-medium text-sky-600 hover:underline dark:text-cyan-300">
            All posts →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
              <p className="text-xs font-medium uppercase tracking-wide text-sky-600 dark:text-cyan-200">
                {new Date(post.frontmatter.date).toLocaleDateString(undefined, {
                  year: 'numeric', month: 'short', day: 'numeric',
                })}
              </p>
              <h3 className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{post.frontmatter.title}</h3>
              {post.frontmatter.excerpt && (
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">{post.frontmatter.excerpt}</p>
              )}
              <Link href={`/blogs/${post.slug}`} className="mt-4 inline-block text-sm font-medium text-sky-600 hover:underline dark:text-cyan-300">
                Read →
              </Link>
            </article>
          ))}
          {posts.length === 0 && (
            <p className="text-sm text-slate-500 dark:text-slate-400">Add Markdown files in <code>content/blogs/</code> to publish posts.</p>
          )}
        </div>
      </section>
    </div>
  );
}
