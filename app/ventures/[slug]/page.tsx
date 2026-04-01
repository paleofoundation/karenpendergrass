import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getVentures } from '@/lib/content';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getVentures().map((v) => ({ slug: v.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const venture = getVentures().find((v) => v.slug === params.slug);
  if (!venture) return { title: 'Venture' };
  return {
    title: `${venture.name} | Ventures`,
    description: venture.description,
  };
}

export default function VentureDetailPage({ params }: Props) {
  const venture = getVentures().find((v) => v.slug === params.slug);
  if (!venture) notFound();

  return (
    <div className="page-enter max-w-3xl mx-auto px-6 pt-16 pb-20">
      <Link href="/ventures" className="text-xs text-ink-muted hover:text-accent transition-colors mb-8 inline-block">
        ← All ventures
      </Link>
      <h1
        className="text-3xl md:text-4xl font-medium text-ink leading-tight mb-3"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {venture.name}
      </h1>
      <p className="text-sm text-ink-muted mb-6">{venture.role}</p>
      <p className="text-ink-light leading-relaxed mb-8">{venture.description}</p>
      <a
        href={venture.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-accent font-medium link-animate"
      >
        {venture.url.replace('https://', '')}
        <span>↗</span>
      </a>
    </div>
  );
}
