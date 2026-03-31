import Link from 'next/link';
import type { Venture } from '@/lib/content';

const statusStyles: Record<string, { label: string; color: string }> = {
  active: { label: 'Active', color: 'bg-sage/10 text-sage-dark' },
  building: { label: 'Building', color: 'bg-accent/10 text-accent-dark' },
  research: { label: 'Research', color: 'bg-ink/5 text-ink-light' },
};

export default function VentureCard({ venture }: { venture: Venture }) {
  const status = statusStyles[venture.status] || statusStyles.active;

  return (
    <a
      href={venture.url}
      target="_blank"
      rel="noopener noreferrer"
      className="venture-card block bg-white rounded-lg border border-ink/5 p-6 hover:border-accent/20"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3
            className="text-lg font-medium text-ink"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {venture.name}
          </h3>
          <p className="text-xs text-ink-muted mt-0.5">{venture.role}</p>
        </div>
        <span
          className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${status.color}`}
        >
          {status.label}
        </span>
      </div>
      <p className="text-sm text-ink-light leading-relaxed">{venture.tagline}</p>
      <div className="mt-4 flex items-center gap-1 text-xs text-accent font-medium">
        <span>{venture.url.replace('https://', '')}</span>
        <span>↗</span>
      </div>
    </a>
  );
}
