import Link from 'next/link';
import { formatDate, readingTime } from '@/lib/content';

interface ArticleCardProps {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  featured?: boolean;
}

const categoryLabels: Record<string, string> = {
  'microbiome-research': 'Microbiome Research',
  analysis: 'Analysis',
  essays: 'Essays',
};

export default function ArticleCard({
  title,
  slug,
  date,
  category,
  excerpt,
  content,
  featured = false,
}: ArticleCardProps) {
  const displayExcerpt =
    excerpt ||
    content
      .replace(/[#*_\[\]()]/g, '')
      .replace(/\n+/g, ' ')
      .slice(0, 200)
      .trim() + '...';

  if (featured) {
    return (
      <article className="group">
        <Link href={`/writing/${slug}`} className="block">
          <div className="mb-3 flex items-center gap-3">
            <span
              className="text-xs font-semibold uppercase tracking-widest text-accent"
              style={{ letterSpacing: '0.1em' }}
            >
              {categoryLabels[category] || category}
            </span>
            <span className="text-xs text-ink-muted">{readingTime(content)}</span>
          </div>
          <h2
            className="text-2xl md:text-3xl font-medium leading-tight text-ink group-hover:text-accent transition-colors mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h2>
          <p className="text-ink-light leading-relaxed mb-3 line-clamp-3">
            {displayExcerpt}
          </p>
          <time className="text-xs text-ink-muted">{formatDate(date)}</time>
        </Link>
      </article>
    );
  }

  return (
    <article className="group py-6 border-b border-ink/5 last:border-b-0">
      <Link href={`/writing/${slug}`} className="block">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-xs font-semibold uppercase tracking-widest text-accent"
            style={{ letterSpacing: '0.1em' }}
          >
            {categoryLabels[category] || category}
          </span>
          <span className="text-ink-muted text-xs">&middot;</span>
          <time className="text-xs text-ink-muted">{formatDate(date)}</time>
          <span className="text-ink-muted text-xs">&middot;</span>
          <span className="text-xs text-ink-muted">{readingTime(content)}</span>
        </div>
        <h3
          className="text-lg font-medium text-ink group-hover:text-accent transition-colors mb-1.5"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h3>
        <p className="text-sm text-ink-light leading-relaxed line-clamp-2">
          {displayExcerpt}
        </p>
      </Link>
    </article>
  );
}
