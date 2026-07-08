import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  author: string;
  tags: string[];
}

export interface Post extends PostMeta {
  contentHtml: string;
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    pubDate: new Date(data.pubDate as string),
    author: String(data.author ?? 'Admin'),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = await fs.readdir(BLOG_DIR);
  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith('.md'))
      .map(async (file) => {
        const slug = file.replace(/\.md$/, '');
        const raw = await fs.readFile(path.join(BLOG_DIR, file), 'utf8');
        const { data } = matter(raw);
        return toMeta(slug, data);
      })
  );

  return posts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  let raw: string;
  try {
    raw = await fs.readFile(filePath, 'utf8');
  } catch {
    return null;
  }

  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);

  return {
    ...toMeta(slug, data),
    contentHtml: processed.toString(),
  };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
