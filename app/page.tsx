import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Karen Pendergrass',
  description:
    'Founder of six organizations. Frameworks in microbiome science, food safety, and translational medicine.',
  alternates: {
    canonical: '/',
  },
};

const ventureRows = [
  {
    name: 'Paleo Foundation',
    url: 'https://paleofoundation.com',
    description: 'Certification standards for Paleo, Keto, Grain-Free, HMTc',
    tag: 'Standards',
  },
  {
    name: 'Microbiome Medicine',
    url: 'https://microbiomemedicine.com',
    description: 'Disease-associated microbiome patterns for clinical translation',
    tag: 'Research',
  },
  {
    name: 'Journal of Food Metallomics',
    url: 'https://microbialmetallomics.com',
    description: 'Trace metal analysis meets microbiome and food safety',
    tag: 'Publication',
  },
  {
    name: 'WikiBiome',
    url: 'https://wikibiome.com',
    description: 'Open microbiome knowledge platform for researchers and clinicians',
    tag: 'Platform',
  },
  {
    name: 'Tinies',
    url: 'https://tinies.app',
    description: 'Connecting animal sanctuaries with sponsors worldwide',
    tag: 'Social Impact',
  },
  {
    name: 'Gardens of St. Gertrude',
    url: 'https://gardensofstgertrude.com',
    description: 'Cat sanctuary in Parekklisia, Cyprus. 92 cats.',
    tag: 'Sanctuary',
  },
] as const;

const currentArticles = [
  {
    slug: 'microbial-metallomics-and-heavy-metal-contamination',
    title: 'Microbial Metallomics: The Missing Link in Heavy Metal Contamination',
    meta: 'Microbiome Research · 13 min · Feb 2026',
  },
  {
    slug: 'obesity-heavy-metals-sugar-scapegoat',
    title: "The Obesity Scapegoat: Why Sugar Isn't the Whole Story",
    meta: 'Analysis · 6 min · Jan 2026',
  },
  {
    slug: '2030-trends',
    title: '2030 Trends: What the Next Five Years Look Like',
    meta: 'Forecasting · 10 min · 2026',
  },
  {
    slug: 'range',
    title: 'Range: How a Dropped-Out, Self-Taught Polymath Ended Up Here',
    meta: 'Personal · 15 min · 2026',
  },
] as const;

const receipts: { year: string; text: string; isFuture?: boolean }[] = [
  {
    year: '2009',
    text: 'Founded Paleo Foundation. Professor said there was no market. The market arrived.',
  },
  {
    year: '2012',
    text: 'First documented FMT for Celiac Disease. 4 years before the first published case study.',
  },
  {
    year: '2020',
    text: 'Told Fred Hart that Pepsi would put prebiotics on their cans. Pepsi confirmed 2026.',
  },
  {
    year: '2025',
    text: 'Only non-PhD among 150 researchers. Invited guest at Beneficial Microbes Conference.',
  },
  {
    year: '2026',
    text: "Published Microbiome Medicine Journal, Volume I. 5 original papers on Parkinson's disease.",
  },
  {
    year: 'Soon',
    text: 'Heavy metals as the next major consumer health issue. Smart toilets for biomonitoring. Phage therapy replacing antibiotics.',
    isFuture: true,
  },
];

export default function HomePage() {
  return (
    <div className="page-enter">
      {/* ═══════════════════════════════════════════
          SECTION 1: HERO — Full viewport, editorial
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        {/* Graph paper texture layer */}
        <div className="absolute inset-0 graph-paper-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-24 lg:py-0">
            {/* Left: Text */}
            <div className="order-2 lg:order-1 max-w-xl">
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-6"
                style={{ color: 'var(--color-accent)' }}
              >
                Standards · Research · Frameworks
              </p>

              <h1
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-medium leading-[1.1] tracking-tight mb-8"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
              >
                I build the frameworks that become the standard before there&apos;s a market for them.
              </h1>

              <blockquote
                className="border-l-[3px] pl-5 md:pl-6 mb-6 max-w-lg"
                style={{ borderColor: 'var(--color-accent)' }}
              >
                <p
                  className="text-base md:text-lg italic leading-relaxed"
                  style={{ color: 'var(--color-ink-secondary)' }}
                >
                  &ldquo;Well if it isn&apos;t the oracle herself! Too bad we don&apos;t have a recording of
                  that call. And now you need to put out a 2030 trends prediction piece.&rdquo;
                </p>
              </blockquote>
              <p
                className="text-sm mb-10 pl-5 md:pl-6"
                style={{ color: 'var(--color-ink-muted)' }}
              >
                Fred Hart · Partner at Interact
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-md transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: '#fff',
                  }}
                >
                  Start a conversation
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-md transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-ink)',
                  }}
                >
                  Read the full story
                </Link>
              </div>
            </div>

            {/* Right: Portrait */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative w-full aspect-[3/4] max-w-md mx-auto lg:max-w-none lg:ml-auto">
                {/* Decorative frame */}
                <div
                  className="absolute -inset-3 rounded-lg opacity-40"
                  style={{ border: '1px solid var(--color-border)' }}
                />
                <div
                  className="absolute -inset-6 rounded-lg opacity-20 hidden lg:block"
                  style={{ border: '1px solid var(--color-border)' }}
                />
                <Image
                  src="/images/Karen_Pendergrass.png"
                  alt="Karen Pendergrass"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={100}
                  className="object-cover object-top rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--color-ink-muted)' }}>
            Scroll
          </span>
          <div className="w-px h-8" style={{ backgroundColor: 'var(--color-ink-muted)' }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: THE RECEIPTS — Timeline
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32" style={{ borderTop: '1px solid var(--color-border-light)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal animation="fade-in">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-16"
              style={{ color: 'var(--color-accent)' }}
            >
              — The Receipts
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {receipts.map((item, i) => (
              <ScrollReveal key={item.year} animation="slide-up" delay={i * 80}>
                <div className="group">
                  <p
                    className="text-3xl md:text-4xl font-medium mb-3"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: item.isFuture ? 'var(--color-accent-light)' : 'var(--color-accent)',
                    }}
                  >
                    {item.year}
                  </p>
                  <p
                    className={`text-sm md:text-base leading-relaxed ${item.isFuture ? 'italic' : ''}`}
                    style={{ color: 'var(--color-ink-secondary)' }}
                  >
                    {item.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: WORK WITH ME — Service tiers
          ═══════════════════════════════════════════ */}
      <section
        className="relative py-24 md:py-32"
        style={{ backgroundColor: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border-light)' }}
      >
        <div className="absolute inset-0 graph-paper-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal animation="fade-in">
            <h2
              className="text-3xl md:text-4xl font-medium mb-3"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              Work with me
            </h2>
            <p
              className="text-lg leading-relaxed max-w-2xl mb-14"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              Three ways, depending on what you need and how fast you need it.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Advisory */}
            <ScrollReveal animation="slide-up" delay={0}>
              <div
                className="venture-card p-8 md:p-10 flex flex-col h-full"
              >
                <p
                  className="text-xs font-semibold uppercase tracking-[0.15em] mb-5"
                  style={{ color: 'var(--color-ink-muted)' }}
                >
                  Advisory
                </p>
                <p
                  className="text-2xl md:text-3xl font-medium mb-5"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                >
                  $1,500/hr
                </p>
                <p
                  className="text-sm leading-relaxed flex-1 mb-8"
                  style={{ color: 'var(--color-ink-secondary)' }}
                >
                  For founders, executives, and product teams who need a specific question answered by
                  someone who&apos;s already solved it.
                </p>
                <Link
                  href="/advisory"
                  className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium rounded-md transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-ink)',
                  }}
                >
                  Book advisory
                </Link>
              </div>
            </ScrollReveal>

            {/* Roundtable — Featured */}
            <ScrollReveal animation="slide-up" delay={100}>
              <div
                className="venture-card p-8 md:p-10 flex flex-col h-full"
                style={{ borderColor: 'var(--color-accent)' }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-[0.15em] mb-5"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Roundtable
                </p>
                <p
                  className="text-2xl md:text-3xl font-medium mb-5"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                >
                  $75K+
                </p>
                <p
                  className="text-sm leading-relaxed flex-1 mb-8"
                  style={{ color: 'var(--color-ink-secondary)' }}
                >
                  Structured multi-omics sessions producing prioritized targets, testable therapeutic
                  directions, and a published synthesis.
                </p>
                <Link
                  href="/roundtable"
                  className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium rounded-md transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'var(--color-ink)',
                    color: 'var(--color-bg)',
                  }}
                >
                  Request a roundtable
                </Link>
              </div>
            </ScrollReveal>

            {/* Speaking */}
            <ScrollReveal animation="slide-up" delay={200}>
              <div
                className="venture-card p-8 md:p-10 flex flex-col h-full"
              >
                <p
                  className="text-xs font-semibold uppercase tracking-[0.15em] mb-5"
                  style={{ color: 'var(--color-ink-muted)' }}
                >
                  Speaking
                </p>
                <p
                  className="text-2xl md:text-3xl font-medium mb-5"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                >
                  Inquiry
                </p>
                <p
                  className="text-sm leading-relaxed flex-1 mb-8"
                  style={{ color: 'var(--color-ink-secondary)' }}
                >
                  Conferences, panels, and podcasts. Six topics from microbial metallomics to certification
                  systems to trend forecasting.
                </p>
                <Link
                  href="/speaking"
                  className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium rounded-md transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-ink)',
                  }}
                >
                  View speaking topics
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: SIX VENTURES — Table layout
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32" style={{ borderTop: '1px solid var(--color-border-light)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal animation="fade-in">
            <h2
              className="text-3xl md:text-4xl font-medium mb-3 max-w-3xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              Six categories I created before they had a market
            </h2>
            <p
              className="text-lg leading-relaxed max-w-3xl mb-14"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              Every project connects back to translating complex systems science into frameworks people can
              actually use.
            </p>
          </ScrollReveal>

          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {ventureRows.map((row, i) => (
              <ScrollReveal key={row.name} animation="slide-up" delay={i * 60}>
                <a
                  href={row.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-6 py-5 no-underline transition-colors duration-200 -mx-2 px-2 rounded-sm"
                  style={{ borderBottom: '1px solid var(--color-border-light)' }}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.15em] shrink-0 w-20 text-right hidden sm:block"
                      style={{ color: 'var(--color-ink-muted)' }}
                    >
                      {row.tag}
                    </span>
                    <span
                      className="font-medium transition-colors duration-200 group-hover:text-amber-700"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                    >
                      {row.name}
                    </span>
                    <span
                      className="text-sm hidden md:inline"
                      style={{ color: 'var(--color-ink-muted)' }}
                    >
                      — {row.description}
                    </span>
                  </div>
                  <span
                    className="text-lg shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: 'var(--color-ink-muted)' }}
                    aria-hidden
                  >
                    ↗
                  </span>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5: CURRENT THINKING — Articles
          ═══════════════════════════════════════════ */}
      <section
        className="relative py-24 md:py-32"
        style={{ backgroundColor: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border-light)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal animation="fade-in">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-12">
              <h2
                className="text-3xl md:text-4xl font-medium m-0"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
              >
                Current thinking
              </h2>
              <Link
                href="/writing"
                className="text-sm font-medium link-animate shrink-0"
                style={{ color: 'var(--color-accent)' }}
              >
                All writing →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentArticles.map((article, i) => (
              <ScrollReveal key={article.slug} animation="slide-up" delay={i * 80}>
                <Link
                  href={`/writing/${article.slug}`}
                  className="group block no-underline venture-card p-6 md:p-8 h-full"
                >
                  <span
                    className="block font-medium text-lg md:text-xl mb-3 transition-colors duration-200 group-hover:text-amber-700"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                  >
                    {article.title}
                  </span>
                  <span
                    className="block text-xs md:text-sm"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    {article.meta}
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6: ORIGIN STORY — Dark panel
          ═══════════════════════════════════════════ */}
      <section
        className="relative w-full"
        style={{ backgroundColor: 'var(--color-ink)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="max-w-3xl">
            <ScrollReveal animation="fade-in">
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-10"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                The origin story
              </p>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={100}>
              <p
                className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug mb-8"
                style={{ fontFamily: 'var(--font-display)', color: '#fff' }}
              >
                After years of misdiagnoses, I became the first known person to undergo FMT for Celiac
                Disease.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={200}>
              <p
                className="text-base md:text-lg leading-relaxed max-w-2xl mb-12"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                DIY, because no GI would do it. Four years later, the published case study called it a
                breakthrough. That experience changed the trajectory of everything you see here.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={300}>
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-md transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: '#fff',
                  color: 'var(--color-ink)',
                }}
              >
                Read the full story
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
