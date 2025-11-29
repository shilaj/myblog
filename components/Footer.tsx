import type { JSX } from 'react';
import { getMarkdownContent } from '@/lib/markdown';

const iconMap: Record<string, JSX.Element> = {
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.5v-1.8c-3.3.7-4-1.5-4-1.5-.6-1.3-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.6-.8 1.6-.8.9-1.6 2.5-1.1 3.1-.8.1-.7.4-1.1.7-1.4-2.6-.3-5.4-1.3-5.4-5.7 0-1.3.5-2.3 1.2-3.2-.1-.4-.5-1.5.1-3 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.5.2 2.6.1 3a5.1 5.1 0 0 1 1.2 3.2c0 4.4-2.8 5.4-5.4 5.7.4.3.7.9.7 1.8v2.7c0 .2.2.6.8.5A12 12 0 0 0 12 .5Z"
      />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 8.8h3.9V21H3zM9 8.8h3.7v1.7h.1a4 4 0 0 1 3.6-2c3.8 0 4.5 2.5 4.5 5.8V21H17v-6.1c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3v6.2H9z"
      />
    </svg>
  ),
  scholar: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M12 2 3 6.5l9 4.5 7.5-3.8V14h2V6.6zm-9 7v6.5L12 21l9-5.5V9l-9 4.5z"
      />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M2 6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2 0v.2l8 5 8-5V6H4zm16 3.5-7.7 4.8a1 1 0 0 1-1 0L4 9.5V18h16z"
      />
    </svg>
  ),
  orcid: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m-2.3 4.2v11.6h-1.4V6.2zm1.7 0h3.3a4.2 4.2 0 0 1 0 8.4h-1.9v3.2h-1.4zm1.4 1.4v5.6h1.9a2.8 2.8 0 0 0 0-5.6z"
      />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M18.1 2.3h3.7l-8.1 9.3 9.4 12.1h-7.4l-5.2-6.9-6 6.9H0l8.7-10-9-11.4h7.6l4.7 6.2z"
      />
    </svg>
  ),
};

const socialLabels: Record<string, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  scholar: 'Google Scholar',
  email: 'Email',
  orcid: 'ORCID',
  x: 'X / Twitter',
};

type HomeFrontmatter = {
  social_links?: Record<string, string>;
};

export default function Footer() {
  const year = new Date().getFullYear();
  const home = getMarkdownContent<HomeFrontmatter>('home.md');
  const socials = home.frontmatter.social_links ?? {};

  return (
    <footer className="border-t border-white/10 bg-slate-950/80 py-8 text-center text-sm text-slate-400">
      <p>© {year} Shilaj Baral. All rights reserved.</p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {Object.entries(socials).map(([key, url]) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-slate-200 transition hover:border-white/40 hover:text-white"
          >
            {iconMap[key] ?? iconMap.email}
            <span className="text-sm">{socialLabels[key] ?? key}</span>
          </a>
        ))}
      </div>
      <p className="mt-4">
        Vibe coded with{' '}
        <a
          href="https://youtube.com/playlist?list=PLAUrVu1yIeuut1m7Drx79eb5hCHwKpO6j&si=hkVM_ekYc0TUWy9a"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 transition-colors duration-200 hover:text-indigo-300"
        >
          this playlist
        </a>{' '}
        using {'GPT-5.1-Codex'}.
      </p>
    </footer>
  );
}