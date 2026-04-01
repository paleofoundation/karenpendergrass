import Link from 'next/link';
import { formatDate, readingTime } from '@/lib/content';
import type { Post } from '@/lib/content';

interface RelatedArticlesProps {
  articles: Post[];
}

const categoryLabels: Record<string, string> = {
  'microbiome-research': 'Microbiome Research',
  analysis: 'Analysis',
  essays: 'Essays',
};

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <div>
      <p
        className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-4"
        style={{ letterSpacing: '0.1em' }}
      >
        Related reading
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((post) => (
          <Link
            key={post.meta.slug}
            href={`/writing/${post.meta.slug}`}
            className="group block"
          >
            {post.meta.coverImage && (
              <div className="mb-3 overflow-hidden rounded-lg aspect-[16/10]">
                <img
                  src={post.meta.coverImage}
                  alt={post.meta.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            )}
            <p
              className="text-[10px] font-semibold uppercase tracking-widest text-accent mb-1"
              style={{ letterSpacing: '0.1em' }}
            >
              {categoryLabels[post.meta.category] || post.meta.category}
            </p>
            <h3
              className="text-sm font-medium text-ink group-hover:text-accent transition-colors leading-snug line-clamp-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {post.meta.title}
            </h3>
            <p className="text-xs text-ink-muted mt-1">
              {readingTime(post.content)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
