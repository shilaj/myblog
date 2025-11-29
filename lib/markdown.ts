import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

type Frontmatter = Record<string, unknown>;

export type MarkdownDocument<T extends Frontmatter = Frontmatter> = {
  frontmatter: T;
  content: string;
};

export type BlogFrontmatter = {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  coverImage?: string;
};

export type PoemFrontmatter = {
  title: string;
  subtitle?: string;
  date: string;
  tags?: string[];
};

export type ProjectFrontmatter = {
  title: string;
  date?: string;
  summary: string;
  tags?: string[];
  image?: string;
  link?: string;
  repo?: string;
  embedPath?: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content');
const BLOG_DIR = path.join(CONTENT_DIR, 'blogs');
const POEMS_DIR = path.join(process.cwd(), '_posts');
const PROJECTS_DIR = path.join(CONTENT_DIR, 'projects');
const PUBLIC_ASSETS_IMG_DIR = path.join(process.cwd(), 'public', 'assets', 'img');

export function getMarkdownContent<T extends Frontmatter = Frontmatter>(filename: string): MarkdownDocument<T> {
  const targetPath = path.join(CONTENT_DIR, filename);
  const fileContents = fs.readFileSync(targetPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as T,
    content,
  };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

export function getPostBySlug(
  slug: string,
): (MarkdownDocument<BlogFrontmatter> & { slug: string }) | null {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(BLOG_DIR, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    frontmatter: data as BlogFrontmatter,
    content,
  };
}

export function getAllPosts(): Array<MarkdownDocument<BlogFrontmatter> & { slug: string }> {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is MarkdownDocument<BlogFrontmatter> & { slug: string } => Boolean(post))
    .sort((postA, postB) => {
      const dateA = new Date(postA.frontmatter.date || '').getTime();
      const dateB = new Date(postB.frontmatter.date || '').getTime();

      return dateB - dateA;
    });
}

function getMarkdownFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith('.md'));
}

export function getPoemSlugs(): string[] {
  return getMarkdownFiles(POEMS_DIR).map((file) => file.replace(/\.md$/, ''));
}

export function getPoemBySlug(
  slug: string,
): (MarkdownDocument<PoemFrontmatter> & { slug: string }) | null {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(POEMS_DIR, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    frontmatter: data as PoemFrontmatter,
    content,
  };
}

export function getAllPoems(): Array<MarkdownDocument<PoemFrontmatter> & { slug: string }> {
  return getPoemSlugs()
    .map((slug) => getPoemBySlug(slug))
    .filter((poem): poem is MarkdownDocument<PoemFrontmatter> & { slug: string } => Boolean(poem))
    .sort((poemA, poemB) => {
      const dateA = new Date(poemA.frontmatter.date || '').getTime();
      const dateB = new Date(poemB.frontmatter.date || '').getTime();
      return dateB - dateA;
    });
}

export function getProjectSlugs(): string[] {
  return getMarkdownFiles(PROJECTS_DIR).map((file) => file.replace(/\.md$/, ''));
}

export function getProjectBySlug(
  slug: string,
): (MarkdownDocument<ProjectFrontmatter> & { slug: string }) | null {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(PROJECTS_DIR, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}

export function getAllProjects(): Array<MarkdownDocument<ProjectFrontmatter> & { slug: string }> {
  return getProjectSlugs()
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is MarkdownDocument<ProjectFrontmatter> & { slug: string } => Boolean(project))
    .sort((projectA, projectB) => {
      const dateA = new Date(projectA.frontmatter.date || '').getTime();
      const dateB = new Date(projectB.frontmatter.date || '').getTime();
      return dateB - dateA;
    });
}

export function getCollaboratorImages(): string[] {
  if (!fs.existsSync(PUBLIC_ASSETS_IMG_DIR)) {
    return [];
  }

  const imagePattern = /^collaborators?_.*\.(?:png|jpe?g|webp)$/i;

  return fs
    .readdirSync(PUBLIC_ASSETS_IMG_DIR)
    .filter((file) => imagePattern.test(file))
    .sort()
    .map((file) => `/assets/img/${file}`);
}
