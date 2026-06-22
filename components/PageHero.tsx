import type { ReactNode } from 'react';

// Navy banded page header matching the homepage hero language. Use at the
// top of routes to give every page a consistent, bold entry band.
export default function PageHero({
  eyebrow,
  title,
  description,
  caps = true,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  /** Uppercase marquee title (short titles). Set false for long, sentence-like titles. */
  caps?: boolean;
}) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'var(--color-ink-deep)', color: '#f6f8fa' }}
    >
      <div className="aurora aurora-dark" aria-hidden="true" />
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 py-20 md:py-28">
        {eyebrow && (
          <p className="cc-eyebrow text-[11px] mb-6" style={{ color: 'var(--color-accent)' }}>
            {eyebrow}
          </p>
        )}
        <h1
          className="cc-hero-title"
          style={{
            fontSize: caps ? 'clamp(2.5rem, 6vw, 5.5rem)' : 'clamp(1.9rem, 4vw, 3.25rem)',
            textTransform: caps ? undefined : 'none',
            lineHeight: caps ? undefined : 1.12,
          }}
        >
          {title}
        </h1>
        {description && (
          <div
            className="text-base md:text-lg leading-relaxed mt-7 max-w-2xl [&_a]:text-[var(--color-accent)] [&_a]:underline [&_a]:underline-offset-2 [&_a]:font-medium"
            style={{ color: 'rgba(255,255,255,0.82)' }}
          >
            {description}
          </div>
        )}
      </div>
    </section>
  );
}
