import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard search engines
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/donation/'],
      },
      // Google
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      // Bing
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      // OpenAI / ChatGPT crawler
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      // OpenAI browsing for ChatGPT
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      // Anthropic / Claude crawler
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      // Google Gemini
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      // Perplexity
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      // Meta AI
      {
        userAgent: 'FacebookBot',
        allow: '/',
      },
      // Apple / Siri
      {
        userAgent: 'Applebot',
        allow: '/',
      },
      // Cohere
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
