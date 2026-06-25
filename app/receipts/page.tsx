import type { Metadata } from 'next';
import Link from 'next/link';
import {
  provenReceipts,
  standingReceipts,
  oracleQuote,
  type Receipt,
} from '@/lib/receipts';

export const metadata: Metadata = {
  title: 'The Receipts',
  description:
    "Karen Pendergrass's documented track record of calling trends early: Paleo in 2009, microbiome medicine in 2011, the first recorded FMT for celiac disease in 2012, fiber on the front of the can, the nickel problem, phage therapy, and more — with the years and the gaps.",
  keywords: [
    'Karen Pendergrass predictions',
    'trends called early',
    'Paleo Foundation founder',
    'microbiome medicine',
    'FMT celiac disease first',
    'nickel food regulation prediction',
    'phage therapy prediction',
    'track record',
  ],
  alternates: { canonical: '/receipts' },
  openGraph: {
    title: 'The Receipts — A Documented Track Record',
    description:
      'Paleo in 2009. Microbiome medicine in 2011. The first recorded FMT for celiac in 2012. Fiber on the can. The nickel problem. The receipts, with the years and the gaps.',
    type: 'website',
    url: 'https://karenpendergrass.com/receipts',
  },
};

function ReceiptRow({ r }: { r: Receipt }) {
  const body = (
    <div className="grid grid-cols-[4.5rem_1fr] sm:grid-cols-[7rem_1fr] gap-4 sm:gap-8 py-7 border-b border-ink/8 last:border-b-0">
      <div className="pt-1">
        <span
          className="block text-sm sm:text-base font-medium"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-dark)' }}
        >
          {r.called}
        </span>
        {r.gap && (
          <span className="block mt-1 text-[10px] uppercase tracking-[0.14em] text-ink-muted">
            {r.gap}
          </span>
        )}
      </div>
      <div>
        <h3
          className="text-lg sm:text-xl font-medium text-ink leading-snug mb-1.5"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {r.title}
        </h3>
        <p className="text-sm sm:text-[0.95rem] text-ink-light leading-relaxed">{r.detail}</p>
        {r.href &&
          (r.external ? (
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2.5 text-xs font-medium text-accent-dark hover:text-accent transition-colors"
            >
              See it <span aria-hidden="true">→</span>
            </a>
          ) : (
            <Link
              href={r.href}
              className="inline-flex items-center gap-1 mt-2.5 text-xs font-medium text-accent-dark hover:text-accent transition-colors"
            >
              Read the work <span aria-hidden="true">→</span>
            </Link>
          ))}
      </div>
    </div>
  );

  return body;
}

export default function ReceiptsPage() {
  return (
    <div className="page-enter">
      {/* Hero band (navy) */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{ background: 'var(--color-ink-deep)', color: '#fff' }}
      >
        <div className="aurora aurora-dark" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <p className="cc-eyebrow text-[11px] mb-6" style={{ color: 'var(--color-accent)' }}>
            A documented track record
          </p>
          <h1 className="cc-hero-title" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>
            The Receipts
          </h1>
          <p
            className="mt-6 text-lg md:text-xl leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-display)' }}
          >
            I have a documented habit of being right about direction and early about timing. Not
            guesses. Dated calls, with the years and the gaps. Here they are.
          </p>
        </div>
      </section>

      {/* Oracle quote */}
      <section className="max-w-4xl mx-auto px-6 py-14 md:py-20 text-center">
        <p className="cc-eyebrow text-[11px] mb-6" style={{ color: 'var(--color-accent-dark)' }}>
          The Oracle
        </p>
        <blockquote
          className="text-2xl md:text-4xl font-medium leading-tight text-ink"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          “Well, if it isn’t the{' '}
          <span style={{ color: 'var(--color-accent-dark)' }}>Oracle</span> herself.”
        </blockquote>
        <p className="cc-eyebrow text-[10px] mt-6" style={{ color: 'var(--color-ink-light)' }}>
          {oracleQuote.author} · {oracleQuote.role}
        </p>
      </section>

      {/* Proven */}
      <section className="max-w-4xl mx-auto px-6 pb-8">
        <div className="mb-6 flex items-baseline justify-between border-b-2 border-ink/10 pb-3">
          <h2
            className="text-sm font-semibold uppercase tracking-[0.16em] text-ink"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Called early, proven right
          </h2>
        </div>
        <div>
          {provenReceipts.map((r) => (
            <ReceiptRow key={`${r.called}-${r.title}`} r={r} />
          ))}
        </div>
      </section>

      {/* Standing */}
      <section className="max-w-4xl mx-auto px-6 pt-10 pb-8">
        <div className="mb-6 flex items-baseline justify-between border-b-2 border-ink/10 pb-3">
          <h2
            className="text-sm font-semibold uppercase tracking-[0.16em] text-ink"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            On the board, still playing out
          </h2>
        </div>
        <div>
          {standingReceipts.map((r) => (
            <ReceiptRow key={`${r.called}-${r.title}`} r={r} />
          ))}
        </div>
      </section>

      {/* Closing CTA (navy) */}
      <section
        className="relative mt-12 py-20 md:py-24 overflow-hidden"
        style={{ background: 'var(--color-ink-deep)', color: '#fff' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="cc-hero-title" style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}>
            Called the last decade.
            <br />
            <span style={{ color: 'var(--color-accent)' }}>Calling the next one.</span>
          </h2>
          <p
            className="mt-6 mb-9 text-base md:text-lg"
            style={{ color: 'rgba(255,255,255,0.72)', fontFamily: 'var(--font-display)' }}
          >
            If you would rather hear what is coming from someone with a record of calling it early
            than from a trend report, that is exactly what the advisory work is for.
          </p>
          <Link
            href="/advisory"
            className="inline-block px-8 py-4 text-[12px] tracking-[0.12em] uppercase"
            style={{
              background: 'var(--color-accent)',
              color: 'var(--color-ink-deep)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Work with me
          </Link>
        </div>
      </section>
    </div>
  );
}
