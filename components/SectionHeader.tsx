import type { ReactNode } from 'react';

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: ReactNode;
}

export default function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-12 md:mb-16">
      {label && (
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
          style={{ color: 'var(--color-accent)' }}
        >
          {label}
        </p>
      )}
      <h1
        className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
      >
        {title}
      </h1>
      {description && (
        <p
          className="mt-4 text-lg leading-relaxed max-w-2xl"
          style={{ color: 'var(--color-ink-secondary)' }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
