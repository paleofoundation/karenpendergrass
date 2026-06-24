import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ventures } from './ventures';

const contentDirectory = path.join(process.cwd(), 'content');

export interface PostMetaOpenGraph {
  title?: string;
  description?: string;
  type?: string;
  url?: string;
}

export interface PostMeta {
  title: string;
  date: string;
  slug: string;
  category: string;
  originalCategories: string[];
  tags: string[];
  status: string;
  excerpt: string;
  coverImage: string;
  /** Plain-text SEO description (≈150 chars); distinct from excerpt when set */
  description?: string;
  keywords?: string | string[];
  author?: string;
  canonicalUrl?: string;
  openGraph?: PostMetaOpenGraph;
  /** Optional curated hashtags for social share buttons (overrides tags). */
  hashtags?: string[];
}

export interface Post {
  meta: PostMeta;
  content: string;
}

export interface PageMeta {
  title: string;
  slug: string;
}

export interface Page {
  meta: PageMeta;
  content: string;
}

export function getAllPosts(): Post[] {
  const writingDir = path.join(contentDirectory, 'writing');
  
  if (!fs.existsSync(writingDir)) return [];
  
  const files = fs.readdirSync(writingDir).filter(f => f.endsWith('.mdx'));
  
  const posts = files.map(filename => {
    const filePath = path.join(writingDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    return {
      meta: {
        title: data.title || '',
        date: data.date || '',
        slug: data.slug || filename.replace('.mdx', ''),
        category: data.category || 'essays',
        originalCategories: data.originalCategories || [],
        tags: data.tags || [],
        status: data.status || 'publish',
        excerpt: data.excerpt || '',
        coverImage: data.coverImage || '',
        description: data.description || '',
        keywords: data.keywords ?? '',
        author: data.author || '',
        canonicalUrl: data.canonicalUrl || '',
        openGraph: data.openGraph || undefined,
        hashtags: data.hashtags || undefined,
      },
      content,
    };
  });
  
  // Sort by date, newest first
  return posts
    .filter(p => p.meta.status === 'publish' || p.meta.status === 'published')
    .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(contentDirectory, 'writing', `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) return null;
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return {
    meta: {
      title: data.title || '',
      date: data.date || '',
      slug: data.slug || slug,
      category: data.category || 'essays',
      originalCategories: data.originalCategories || [],
      tags: data.tags || [],
      status: data.status || 'publish',
      excerpt: data.excerpt || '',
        coverImage: data.coverImage || '',
        description: data.description || '',
        keywords: data.keywords ?? '',
        author: data.author || '',
        canonicalUrl: data.canonicalUrl || '',
        openGraph: data.openGraph || undefined,
        hashtags: data.hashtags || undefined,
    },
    content,
  };
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(p => p.meta.category === category);
}

export function getAllCategories(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const catMap: Record<string, number> = {};
  
  posts.forEach(p => {
    catMap[p.meta.category] = (catMap[p.meta.category] || 0) + 1;
  });
  
  return Object.entries(catMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPage(slug: string): Page | null {
  const filePath = path.join(contentDirectory, 'pages', `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) return null;
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return {
    meta: {
      title: data.title || '',
      slug: data.slug || slug,
    },
    content,
  };
}

// Venture data lives in a single source of truth: lib/ventures.ts
export type { Venture } from './ventures';

export function getVentures() {
  return ventures;
}

// Format a date string nicely
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Calculate reading time
export function readingTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 250);
  return `${minutes} min read`;
}
