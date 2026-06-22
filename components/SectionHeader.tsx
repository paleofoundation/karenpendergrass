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
        <p className="cc-eyebrow text-[11px] mb-5" style={{ color: 'var(--color-accent-dark)' }}>
          {label}
        </p>
      )}
      <h1
        className="cc-feature-title"
        style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', color: 'var(--color-ink)' }}
      >
        {title}
      </h1>
      {description && (
        <p
          className="mt-5 text-lg leading-relaxed max-w-2xl"
          style={{ color: 'var(--color-ink-secondary)' }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
