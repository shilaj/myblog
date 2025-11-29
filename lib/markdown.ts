import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');
const blogDirectory = path.join(contentDirectory, 'blogs');

export type Frontmatter = Record<string, any> & {
  title?: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
  coverImage?: string;
};

export type MarkdownContent = {
  frontmatter: Frontmatter;
  content: string;
};

export function getMarkdownContent(filename: string): MarkdownContent {
  const fullPath = path.join(contentDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data as Frontmatter,
    content,
  };
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

export type BlogPost = MarkdownContent & { slug: string };

export function getPostBySlug(slug: string): BlogPost {
  const fullPath = path.join(blogDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as Frontmatter,
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();

  const posts = slugs.map((slug) => getPostBySlug(slug));

  return posts.sort((a, b) => {
    const dateA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
    const dateB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
    return dateB - dateA;
  });
}
