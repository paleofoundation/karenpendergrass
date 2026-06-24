import type { Metadata } from 'next';
import { getAllPosts, getAllCategories, formatDate, readingTime } from '@/lib/content';
import SectionHeader from '@/components/SectionHeader';
import WritingSearch, { type SearchItem } from '@/components/WritingSearch';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Articles on microbiome research, microbial metallomics, food safety, causal reasoning, and systems thinking by Karen Pendergrass. Search the full archive.',
  alternates: {
    canonical: '/writing',
  },
};

const categoryLabels: Record<string, string> = {
  'microbiome-research': 'Microbiome Research',
  analysis: 'Analysis',
  essays: 'Essays',
  'essays-by-claude': 'Essays by Claude',
  'brass-tacks': 'Brass Tacks',
};

function deriveExcerpt(excerpt: string, content: string): string {
  if (excerpt) return excerpt;
  return (
    content
      .replace(/[#*_\[\]()]/g, '')
      .replace(/\n+/g, ' ')
      .slice(0, 200)
      .trim() + '…'
  );
}

export default function WritingPage() {
  const posts = getAllPosts();
  const categories = getAllCategories().map((c) => ({
    name: c.name,
    label: categoryLabels[c.name] || c.name,
    count: c.count,
  }));

  // Build a lightweight, client-safe search index (no full content shipped).
  const items: SearchItem[] = posts.map((post) => ({
    title: post.meta.title,
    slug: post.meta.slug,
    rawDate: post.meta.date,
    dateLabel: formatDate(post.meta.date),
    category: post.meta.category,
    categoryLabel: categoryLabels[post.meta.category] || post.meta.category,
    excerpt: deriveExcerpt(post.meta.excerpt, post.content),
    tags: Array.isArray(post.meta.tags) ? post.meta.tags : [],
    author: post.meta.author || 'Karen Pendergrass',
    readingTime: readingTime(post.content),
  }));

  return (
    <div className="page-enter max-w-3xl mx-auto px-6 pt-16 pb-20">
      <SectionHeader
        label="Writing"
        title="Articles & essays"
        description={`${posts.length} published pieces on microbiome science, metallomics, food safety, causal reasoning, and the things I can't stop thinking about.`}
      />

      <WritingSearch items={items} categories={categories} />
    </div>
  );
}
