import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/content';
import { PUBLISHED_WRITING_SLUGS } from '@/lib/published-slugs';
import { SITE_URL } from '@/lib/site';

function assertPublishedSlugIndex(slugs: string[]) {
  const fromContent = new Set(slugs);
  for (const slug of fromContent) {
    if (!PUBLISHED_WRITING_SLUGS.has(slug)) {
      throw new Error(`published-slugs.ts is missing ${slug}`);
    }
  }
  for (const slug of PUBLISHED_WRITING_SLUGS) {
    if (!fromContent.has(slug)) {
      throw new Error(`published-slugs.ts has extra slug ${slug}`);
    }
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  assertPublishedSlugIndex(posts.map((post) => post.meta.slug));

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/start`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/leaderboard`, changeFrequency: 'daily', priority: 0.6 },
    { url: `${SITE_URL}/manifesto`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/advisory`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/publications`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/ventures`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/writing`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/receipts`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/karens-brain`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/roundtable`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/speaking`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/research`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/phage`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/frameworks`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/frameworks/triangulation-method`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/frameworks/mbti-validation-criteria`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/frameworks/hmtc`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/frameworks/microbial-metallomics`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/frameworks/major-microbial-associations`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/frameworks/stop`, changeFrequency: 'monthly', priority: 0.9 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/writing/${post.meta.slug}`,
    lastModified: new Date(post.meta.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...postPages];
}
