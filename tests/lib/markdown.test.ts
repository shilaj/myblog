import fs from 'fs';
import path from 'path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  getAllPoems,
  getAllPosts,
  getAllProjects,
  getMarkdownContent,
  getPoemBySlug,
  getPoemSlugs,
  getPostBySlug,
  getPostSlugs,
  getProjectBySlug,
  getProjectSlugs,
} from '../../lib/markdown';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blogs');
const POEM_DIR = path.join(process.cwd(), '_posts');
const PROJECT_DIR = path.join(process.cwd(), 'content', 'projects');
const tempFiles: string[] = [];

function writeTempFile(dir: string, filename: string, body: string): void {
  const filePath = path.join(dir, filename);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, body);
  tempFiles.push(filePath);
}

function writeTempPost(filename: string, title: string, date: string): void {
  const mockPost = `---\ntitle: "${title}"\ndate: "${date}"\n---\nTemporary content for ${title}\n`;
  writeTempFile(BLOG_DIR, filename, mockPost);
}

function writeTempPoem(filename: string, title: string, date: string): void {
  const mockPoem = `---\ntitle: "${title}"\ndate: "${date}"\nsubtitle: "Notebook"\n---\n${title} lines\n`;
  writeTempFile(POEM_DIR, filename, mockPoem);
}

function writeTempProject(filename: string, title: string, date: string): void {
  const mockProject = `---\ntitle: "${title}"\ndate: "${date}"\nsummary: "${title} summary"\ntags: ["Test"]\nimage: "/projects/${title}.png"\n---\ncontent for ${title}\n`;
  writeTempFile(PROJECT_DIR, filename, mockProject);
}

afterEach(() => {
  for (const file of tempFiles.splice(0)) {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  }
});

describe('markdown helpers', () => {
  it('reads structured content pages with frontmatter intact', () => {
    const doc = getMarkdownContent<{ name: string }>('home.md');

    expect(doc.frontmatter.name).toBe('Shilaj Baral');
    expect(doc.content).toContain('I design data pipelines');
  });

  it('lists existing blog slugs', () => {
    writeTempPost('listable-post.md', 'Listable Post', '2024-05-01');

    const slugs = getPostSlugs();

    expect(slugs).toContain('listable-post');
  });

  it('loads individual posts when slug exists', () => {
    writeTempPost('readable-post.md', 'Readable Post', '2024-06-02');

    const post = getPostBySlug('readable-post');

    expect(post).not.toBeNull();
    expect(post?.frontmatter.title).toBe('Readable Post');
    expect(post?.content).toContain('Temporary content for Readable Post');
  });

  it('returns null when a post slug is missing', () => {
    const post = getPostBySlug('does-not-exist');

    expect(post).toBeNull();
  });

  it('sorts posts in descending order by date', () => {
    writeTempPost('newer-post.md', 'Newer Post', '2024-12-01');
    writeTempPost('older-post.md', 'Older Post', '2023-01-01');

    const posts = getAllPosts();
    const slugOrder = posts.map((post) => post.slug);

    expect(slugOrder[0]).toBe('newer-post');
    expect(slugOrder.indexOf('older-post')).toBeGreaterThan(slugOrder.indexOf('newer-post'));
  });

  it('hydrates poem helpers from the legacy _posts directory', () => {
    writeTempPoem('2025-01-01-test-poem.md', 'Test Poem', '2025-01-01');

    const slugs = getPoemSlugs();
    expect(slugs).toContain('2025-01-01-test-poem');

    const poem = getPoemBySlug('2025-01-01-test-poem');
    expect(poem?.frontmatter.title).toBe('Test Poem');

    const poems = getAllPoems();
    expect(poems[0]?.slug).toBe('2025-01-01-test-poem');
  });

  it('hydrates project helpers and exposes metadata', () => {
    writeTempProject('temp-project.md', 'Temp Project', '2024-11-11');

    const slugs = getProjectSlugs();
    expect(slugs).toContain('temp-project');

    const project = getProjectBySlug('temp-project');
    expect(project?.frontmatter.summary).toContain('summary');

    const projects = getAllProjects();
    expect(projects.some((entry) => entry.slug === 'temp-project')).toBe(true);
  });
});
