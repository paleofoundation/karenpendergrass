import { MetadataRoute } from 'next';
import { getAllPosts, getVentures } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const ventures = getVentures();
  const baseUrl = 'https://karenpendergrass.com';

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/ventures`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/writing`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/research`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/speaking`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.5 },
  ];

  const postPages = posts.map((post) => ({
    url: `${baseUrl}/writing/${post.meta.slug}`,
    lastModified: new Date(post.meta.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...postPages];
}
