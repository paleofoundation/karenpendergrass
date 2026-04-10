import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
      },
      content,
    };
  });
  
  // Sort by date, newest first
  return posts
    .filter(p => p.meta.status === 'publish')
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

// Venture data (these are structured, not from WordPress)
export interface Venture {
  name: string;
  slug: string;
  url: string;
  role: string;
  tagline: string;
  description: string;
  status: 'active' | 'building' | 'research';
}

export function getVentures(): Venture[] {
  return [
    {
      name: 'Paleo Foundation',
      slug: 'paleo-foundation',
      url: 'https://paleofoundation.com',
      role: 'Founder & CEO',
      tagline: 'Certification standards for Paleo, Keto, Grain-Free, and Heavy Metal Tested products',
      description: 'For over 15 years, the Paleo Foundation has designed and implemented food certification standards used globally by manufacturers and brands. The Heavy Metal Tested and Certified (HMTc) program establishes category-specific contaminant limits using ALARA-based principles and statistical risk matrices for food, supplements, and personal care products.',
      status: 'active',
    },
    {
      name: 'Microbiome Medicine',
      slug: 'microbiome-medicine',
      url: 'https://microbiomemedicine.com',
      role: 'Founder & Lead Researcher',
      tagline: 'Formalizing disease-associated microbiome patterns for clinical translation',
      description: 'A clinician- and researcher-facing database designed to formalize disease-associated microbiome patterns through Major Microbial Associations (MMAs) and facilitate intervention development using a structured Microbial Shift and Realignment Process (MSRP). The validation framework requires interventions to both restore altered taxa and yield clinical improvement, co-validating the intervention and the underlying microbial signature.',
      status: 'active',
    },
    {
      name: 'Journal of Food Metallomics',
      slug: 'journal-of-food-metallomics',
      url: 'https://microbialmetallomics.com',
      role: 'Founder & Editor',
      tagline: 'Integrating trace metal analysis into microbiome and food safety research',
      description: 'Foundational work introducing microbial metallomics as a critical lens to interpret pathogen virulence, microbial selection pressure, and nutrient-immune interactions in chronic diseases. Research focuses on the differential acquisition, utilization, and detoxification of trace elements among taxa enriched in disease states.',
      status: 'research',
    },
    {
      name: 'WikiBiome',
      slug: 'wikibiome',
      url: 'https://wikibiome.com',
      role: 'Founder',
      tagline: 'Open microbiome knowledge platform',
      description: 'A comprehensive open-access platform for microbiome research, making disease-associated microbiome signatures and microbial data accessible to researchers, clinicians, and the public.',
      status: 'building',
    },
    {
      name: 'Tinies',
      slug: 'tinies',
      url: 'https://tinies.app',
      role: 'Founder',
      tagline: 'Connecting animal sanctuaries with sponsors and supporters worldwide',
      description: 'A platform built from the ground up to connect animal sanctuaries with sponsors and supporters. Born from running Gardens of St. Gertrude, a cat sanctuary in Cyprus caring for 92 cats, Tinies addresses the operational and fundraising challenges that sanctuaries face globally.',
      status: 'building',
    },
    {
      name: 'Gardens of St. Gertrude',
      slug: 'gardens-of-st-gertrude',
      url: 'https://gardensofstgertrude.com',
      role: 'Founder',
      tagline: 'A cat sanctuary in Parekklisia, Cyprus',
      description: 'A cat sanctuary in Parekklisia, Cyprus, caring for 92 cats. Gardens of St. Gertrude provides permanent shelter, veterinary care, and adoption services for stray and abandoned cats in the Limassol district.',
      status: 'active',
    },
  ];
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
