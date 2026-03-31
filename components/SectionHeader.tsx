interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-10">
      {label && (
        <p
          className="text-xs font-semibold uppercase tracking-widest text-accent mb-3"
          style={{ letterSpacing: '0.12em' }}
        >
          {label}
        </p>
      )}
      <h2
        className="text-3xl md:text-4xl font-medium text-ink leading-tight"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-ink-light leading-relaxed max-w-2xl">{description}</p>
      )}
    </div>
  );
}
