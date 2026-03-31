import type { Metadata } from 'next';
import Link from 'next/link';
import { getVentures } from '@/lib/content';
import SectionHeader from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Ventures',
  description:
    'The five organizations founded by Karen Pendergrass: Paleo Foundation, Microbiome Medicine, Journal of Food Metallomics, Tinies, and Gardens of St. Gertrude.',
};

const statusStyles: Record<string, { label: string; dot: string }> = {
  active: { label: 'Active', dot: 'bg-sage' },
  building: { label: 'Building', dot: 'bg-accent' },
  research: { label: 'Research', dot: 'bg-ink-muted' },
};

export default function VenturesPage() {
  const ventures = getVentures();

  return (
    <div className="page-enter max-w-3xl mx-auto px-6 pt-16 pb-20">
      <SectionHeader
        label="Ventures"
        title="Five organizations, one through-line"
        description={
          <>
            Every project connects back to translating complex systems science into
            frameworks that people can actually use. From{' '}
            <Link href="/frameworks/hmtc" className="text-accent">
              food safety certification
            </Link>{' '}
            to{' '}
            <Link href="/publications" className="text-accent">
              microbiome research
            </Link>{' '}
            to animal welfare.
          </>
        }
      />

      <div className="flex flex-col gap-12">
        {ventures.map((venture) => {
          const status = statusStyles[venture.status] || statusStyles.active;
          return (
            <article key={venture.slug} className="border-b border-ink/5 pb-10 last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2
                    className="text-2xl font-medium text-ink"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {venture.name}
                  </h2>
                  <p className="text-sm text-ink-muted mt-0.5">{venture.role}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                  <span className="text-xs text-ink-muted">{status.label}</span>
                </div>
              </div>
              <p className="text-ink-light leading-relaxed mb-4">{venture.description}</p>
              <a
                href={venture.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-accent font-medium link-animate"
              >
                {venture.url.replace('https://', '')}
                <span>↗</span>
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}
