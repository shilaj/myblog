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

const CONTENT_DIR = path.join(process.cwd(), 'content');
const BLOG_DIR = path.join(CONTENT_DIR, 'blogs');

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

export function getPostBySlug(slug: string): MarkdownDocument<BlogFrontmatter> & { slug: string } {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(BLOG_DIR, `${realSlug}.md`);
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
    .sort((postA, postB) => {
      const dateA = new Date(postA.frontmatter.date || '').getTime();
      const dateB = new Date(postB.frontmatter.date || '').getTime();

      return dateB - dateA;
    });
}
