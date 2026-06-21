import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import NewsletterSignup from '@/components/NewsletterSignup';

export const metadata: Metadata = {
  title: 'Start Here',
  description:
    'New here? Start with what Karen Pendergrass is building, why heavy metals in food are next, and the four ways to read, fund, or build on the work.',
  alternates: { canonical: '/start' },
};

const ladder: { tier: string; title: string; body: string; href: string; cta: string }[] = [
  {
    tier: 'Free',
    title: 'Read how I think',
    body: 'Frameworks, case studies, and STOP recommendations as I publish them. Start with the writing, or get it by email below.',
    href: '/writing',
    cta: 'Browse the writing',
  },
  {
    tier: '$1,500 / hr',
    title: 'Advisory',
    body: 'For founders, executives, and product teams who need a specific question answered by someone who has already solved it.',
    href: '/advisory',
    cta: 'Book advisory',
  },
  {
    tier: '$75K+',
    title: 'Roundtable',
    body: 'Structured multi-omics sessions that produce prioritized targets, testable therapeutic directions, and a published synthesis.',
    href: '/roundtable',
    cta: 'Request a roundtable',
  },
  {
    tier: 'Inquiry',
    title: 'Board & advisory roles',
    body: 'Longer-term seats where the work compounds: standards, certification design, and AI-first operations.',
    href: '/contact',
    cta: 'Start a conversation',
  },
];

export default function StartHerePage() {
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
            Start Here
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight max-w-4xl"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
          >
            Where to begin.
          </h1>
          <p
            className="mt-6 text-lg md:text-xl leading-relaxed max-w-2xl"
            style={{ color: 'var(--color-ink-secondary)' }}
          >
            This site documents how I build standards and frameworks before there is a market for
            them &mdash; and how you can use, fund, or build on that work. If you would rather be
            right early than agree late, you are in the right place.
          </p>
        </div>
      </section>

      {/* The Cause */}
      <article className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-20 prose">
        <ScrollReveal animation="fade-in">
          <h2>What I am working on now</h2>
          <p>
            The through-line across everything I do is translating complex systems science into
            frameworks people can actually use. Right now that work points at the problem most of
            the industry still treats as a footnote: the heavy metals in what we eat, and the
            certification standard the food system does not yet have. It is the same pattern as the
            rest of my career &mdash; the standard arrives late, so I build it early.
          </p>
        </ScrollReveal>
      </article>

      {/* The ladder */}
      <section className="relative py-16 md:py-24" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal animation="fade-in">
            <h2
              className="text-3xl md:text-4xl font-medium mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              Four ways in.
            </h2>
            <p
              className="text-lg leading-relaxed max-w-2xl mb-12"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              Start free. Go deeper when you need to.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ladder.map((rung, i) => (
              <ScrollReveal key={rung.title} animation="slide-up" delay={i * 80}>
                <div className="venture-card p-8 flex flex-col h-full">
                  <p
                    className="text-[11px] font-mono tracking-wider mb-4"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    {rung.tier}
                  </p>
                  <p
                    className="text-2xl font-medium mb-3 tracking-tight"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                  >
                    {rung.title}
                  </p>
                  <p
                    className="text-sm leading-relaxed flex-1 mb-6"
                    style={{ color: 'var(--color-ink-secondary)' }}
                  >
                    {rung.body}
                  </p>
                  <Link
                    href={rung.href}
                    className="inline-flex items-center text-sm font-medium link-animate"
                    style={{ color: 'var(--color-accent-dark)' }}
                  >
                    {rung.cta} &rarr;
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter — the free rung */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="graph-paper-overlay absolute inset-0" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-10">
          <ScrollReveal animation="fade-in">
            <h2
              className="text-2xl md:text-3xl font-medium mb-3 tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              The free rung
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              New research and frameworks, delivered as I publish them. It is the cheapest way to
              see whether the way I think is useful to you.
            </p>
          </ScrollReveal>
          <NewsletterSignup />
          <p className="mt-6 text-sm">
            <Link href="/manifesto" className="link-animate" style={{ color: 'var(--color-accent-dark)' }}>
              Or read what I believe &rarr;
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
