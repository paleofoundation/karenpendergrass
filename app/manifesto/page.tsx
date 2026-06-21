import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Manifesto',
  description:
    'What Karen Pendergrass believes about standards, chronic disease, causal reductionism, credentials, and building frameworks before the market exists.',
  alternates: { canonical: '/manifesto' },
};

const beliefs: string[] = [
  'The standard almost always arrives late. Someone has to build it early.',
  'Most of what we call chronic and irreversible is unsolved, not unsolvable.',
  'Causal reductionism — one cause, one cure — is the most expensive habit in modern medicine.',
  'If a job can be done by AI, it should be. Including mine.',
  'You do not need permission, a credential, or an existing market to be right.',
  'The problems worth working on are usually the ones the institutions have not named yet.',
];

export default function ManifestoPage() {
  return (
    <div className="page-enter">
      {/* Header */}
      <section
        className="relative py-20 md:py-28"
        style={{ borderBottom: '1px solid var(--color-border-light)' }}
      >
        <div className="absolute inset-0 graph-paper-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--color-accent-dark)' }}
          >
            Manifesto
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight max-w-4xl"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
          >
            What I believe.
          </h1>
        </div>
      </section>

      {/* Creed */}
      <section className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <ul className="list-none p-0 m-0 space-y-8 md:space-y-10">
          {beliefs.map((belief, i) => (
            <ScrollReveal key={belief} animation="slide-up" delay={i * 70}>
              <li className="flex gap-5 items-start">
                <span
                  className="text-[11px] font-mono mt-3 shrink-0"
                  style={{ color: 'var(--color-accent-dark)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p
                  className="text-2xl md:text-3xl font-medium leading-snug tracking-tight m-0"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                >
                  {belief}
                </p>
              </li>
            </ScrollReveal>
          ))}
        </ul>

        <ScrollReveal animation="fade-in">
          <div className="mt-16 pt-10" style={{ borderTop: '1px solid var(--color-border-light)' }}>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              None of this is contrarianism for its own sake. The enemy is not a person or a company
              &mdash; it is the habit of waiting for permission, the comfort of single-cause
              stories, and institutions that move slower than the evidence. I build for the gap
              between what the research already shows and what people actually receive.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/start"
                className="inline-flex items-center px-7 py-3.5 text-sm font-medium tracking-wide rounded transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--color-ink)', color: '#fff' }}
              >
                Start here
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-7 py-3.5 text-sm font-medium tracking-wide rounded transition-all duration-300 hover:-translate-y-0.5"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink)' }}
              >
                Read the full story
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
