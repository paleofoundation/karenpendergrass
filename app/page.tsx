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

const ventureRows: { name: string; url: string; description: string; tag: string }[] = [
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
];

const currentArticles = [
  {
    slug: 'microbial-metallomics-and-heavy-metal-contamination',
    title: 'Microbial Metallomics: The Missing Link in Heavy Metal Contamination',
    meta: 'Microbiome Research · 13 min',
  },
  {
    slug: 'obesity-heavy-metals-sugar-scapegoat',
    title: "The Obesity Scapegoat: Why Sugar Isn't the Whole Story",
    meta: 'Analysis · 6 min',
  },
  {
    slug: '2030-trends',
    title: '2030 Trends: What the Next Five Years Look Like',
    meta: 'Forecasting · 10 min',
  },
  {
    slug: 'range',
    title: 'Range: How a Dropped-Out, Self-Taught Polymath Ended Up Here',
    meta: 'Personal · 15 min',
  },
];

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
          HERO — Full viewport, architectural grid, portrait
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        {/* VISIBLE graph paper grid */}
        <div className="graph-paper-overlay absolute inset-0" />

        {/* Decorative crosshair marks */}
        <div className="absolute top-20 right-[20%] w-0 h-0 hidden lg:block">
          <div className="relative">
            <span className="absolute -translate-x-1/2 -translate-y-1/2 text-[10px] text-amber-700/30 select-none">+</span>
          </div>
        </div>
        <div className="absolute bottom-32 left-[15%] w-0 h-0 hidden lg:block">
          <div className="relative">
            <span className="absolute -translate-x-1/2 -translate-y-1/2 text-[10px] text-amber-700/30 select-none">+</span>
          </div>
        </div>

        {/* Vertical accent line */}
        <div
          className="absolute top-0 bottom-0 hidden lg:block"
          style={{ left: 'calc(50% + 80px)', width: '1px', background: 'linear-gradient(to bottom, transparent, var(--color-accent), transparent)', opacity: 0.15 }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center py-24 lg:py-0">
            {/* Left: Text — takes 7 cols */}
            <div className="order-2 lg:order-1 lg:col-span-7 max-w-2xl">
              {/* Decorative index number */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[11px] font-mono text-amber-700/50 tracking-wider">01</span>
                <span className="block w-12 h-px bg-amber-700/30" />
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Standards · Research · Frameworks
                </span>
              </div>

              <h1
                className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] font-medium leading-[1.05] tracking-[-0.02em] mb-10"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
              >
                I build the frameworks
                <br className="hidden md:block" />{' '}
                that become the standard
                <br className="hidden md:block" />{' '}
                <span style={{ color: 'var(--color-accent)' }}>before there&apos;s a market.</span>
              </h1>

              <blockquote
                className="border-l-2 pl-5 md:pl-6 mb-6 max-w-lg"
                style={{ borderColor: 'var(--color-accent)' }}
              >
                <p
                  className="text-base md:text-lg italic leading-relaxed"
                  style={{ color: 'var(--color-ink-secondary)' }}
                >
                  &ldquo;Well if it isn&apos;t the oracle herself! Too bad we don&apos;t have a recording of
                  that call.&rdquo;
                </p>
              </blockquote>
              <p
                className="text-xs mb-12 pl-5 md:pl-6 tracking-wider uppercase"
                style={{ color: 'var(--color-ink-muted)' }}
              >
                Fred Hart · Partner, Interact
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-7 py-3.5 text-sm font-medium tracking-wide rounded transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--color-ink)',
                    color: '#fff',
                  }}
                >
                  Start a conversation
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center px-7 py-3.5 text-sm font-medium tracking-wide rounded transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-ink)',
                  }}
                >
                  Read the full story
                </Link>
              </div>
            </div>

            {/* Right: Portrait — takes 5 cols */}
            <div className="order-1 lg:order-2 lg:col-span-5 relative">
              <div className="relative w-full max-w-sm mx-auto lg:max-w-none lg:ml-auto">
                {/* Geometric frame accent */}
                <div className="absolute -top-4 -right-4 w-full h-full rounded border border-amber-700/15 hidden lg:block" />
                <div className="absolute -top-8 -right-8 w-24 h-24 border border-amber-700/10 rounded-sm hidden lg:block" />

                {/* Coordinate label */}
                <div className="absolute -top-6 left-0 hidden lg:flex items-center gap-2">
                  <span className="text-[9px] font-mono text-amber-700/40 tracking-wider">34.6847°N, 33.1442°E</span>
                </div>

                <div className="relative aspect-[3/4] overflow-hidden rounded">
                  <Image
                    src="/images/Karen_Pendergrass.png"
                    alt="Karen Pendergrass"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    quality={100}
                    className="object-cover object-top"
                    priority
                  />
                </div>

                {/* Caption below image */}
                <p className="mt-3 text-[10px] font-mono tracking-wider text-right" style={{ color: 'var(--color-ink-muted)' }}>
                  Parekklisia, Cyprus
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-12 flex items-center gap-3 opacity-40 hidden lg:flex">
          <div className="w-px h-10" style={{ backgroundColor: 'var(--color-ink-muted)' }} />
          <span className="text-[9px] uppercase tracking-[0.25em] font-mono" style={{ color: 'var(--color-ink-muted)' }}>
            Scroll
          </span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          THE RECEIPTS — Dark panel, timeline grid
          ═══════════════════════════════════════════ */}
      <section className="relative bg-[#111110] text-white py-24 md:py-32 overflow-hidden">
        {/* Grid pattern on dark */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal animation="fade-in">
            <div className="flex items-center gap-4 mb-14">
              <span className="text-[11px] font-mono text-white/30 tracking-wider">02</span>
              <span className="block w-12 h-px bg-white/20" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-500/80">
                The Receipts
              </span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
            {receipts.map((item, i) => (
              <ScrollReveal key={item.year} animation="slide-up" delay={i * 80}>
                <div className="group relative pl-6 border-l border-white/10">
                  {/* Dot accent on timeline */}
                  <div
                    className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full -translate-x-[3.5px]"
                    style={{ backgroundColor: item.isFuture ? 'var(--color-accent-light)' : 'var(--color-accent)' }}
                  />
                  <p
                    className="text-3xl md:text-4xl font-medium mb-3 tracking-tight"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: item.isFuture ? 'rgba(212, 132, 95, 0.6)' : '#d4845f',
                    }}
                  >
                    {item.year}
                  </p>
                  <p
                    className={`text-sm leading-relaxed ${item.isFuture ? 'italic text-white/40' : 'text-white/60'}`}
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
          WORK WITH ME — Service tiers on light with grid
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="graph-paper-overlay absolute inset-0" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal animation="fade-in">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[11px] font-mono tracking-wider" style={{ color: 'var(--color-ink-muted)' }}>03</span>
              <span className="block w-12 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: 'var(--color-accent)' }}
              >
                Work with me
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              Three ways in.
            </h2>
            <p
              className="text-lg leading-relaxed max-w-2xl mb-16"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              Depending on what you need and how fast you need it.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Advisory */}
            <ScrollReveal animation="slide-up" delay={0}>
              <div className="venture-card p-8 md:p-10 flex flex-col h-full">
                <p className="text-[11px] font-mono tracking-wider mb-5" style={{ color: 'var(--color-ink-muted)' }}>
                  01 / Advisory
                </p>
                <p
                  className="text-3xl md:text-4xl font-medium mb-5 tracking-tight"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                >
                  $1,500<span className="text-lg font-normal" style={{ color: 'var(--color-ink-muted)' }}>/hr</span>
                </p>
                <p className="text-sm leading-relaxed flex-1 mb-8" style={{ color: 'var(--color-ink-secondary)' }}>
                  For founders, executives, and product teams who need a specific question answered by
                  someone who&apos;s already solved it.
                </p>
                <Link
                  href="/advisory"
                  className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium rounded transition-all duration-300 hover:-translate-y-0.5"
                  style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink)' }}
                >
                  Book advisory
                </Link>
              </div>
            </ScrollReveal>

            {/* Roundtable — Featured */}
            <ScrollReveal animation="slide-up" delay={100}>
              <div
                className="venture-card p-8 md:p-10 flex flex-col h-full relative overflow-hidden"
                style={{ borderColor: 'var(--color-accent)', background: 'var(--color-ink)' }}
              >
                {/* Grid accent on dark card */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                <div className="relative z-10 flex flex-col h-full">
                  <p className="text-[11px] font-mono tracking-wider mb-5 text-amber-500/70">
                    02 / Roundtable
                  </p>
                  <p
                    className="text-3xl md:text-4xl font-medium mb-5 tracking-tight text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    $75K<span className="text-lg font-normal text-white/40">+</span>
                  </p>
                  <p className="text-sm leading-relaxed flex-1 mb-8 text-white/60">
                    Structured multi-omics sessions producing prioritized targets, testable therapeutic
                    directions, and a published synthesis.
                  </p>
                  <Link
                    href="/roundtable"
                    className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium rounded transition-all duration-300 hover:-translate-y-0.5"
                    style={{ backgroundColor: '#fff', color: 'var(--color-ink)' }}
                  >
                    Request a roundtable
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Speaking */}
            <ScrollReveal animation="slide-up" delay={200}>
              <div className="venture-card p-8 md:p-10 flex flex-col h-full">
                <p className="text-[11px] font-mono tracking-wider mb-5" style={{ color: 'var(--color-ink-muted)' }}>
                  03 / Speaking
                </p>
                <p
                  className="text-3xl md:text-4xl font-medium mb-5 tracking-tight"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                >
                  Inquiry
                </p>
                <p className="text-sm leading-relaxed flex-1 mb-8" style={{ color: 'var(--color-ink-secondary)' }}>
                  Conferences, panels, and podcasts. Six topics from microbial metallomics to certification
                  systems to trend forecasting.
                </p>
                <Link
                  href="/speaking"
                  className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium rounded transition-all duration-300 hover:-translate-y-0.5"
                  style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink)' }}
                >
                  View speaking topics
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SIX VENTURES — Table layout, warm bg
          ═══════════════════════════════════════════ */}
      <section
        className="relative py-24 md:py-32"
        style={{ backgroundColor: 'var(--color-bg-alt)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal animation="fade-in">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[11px] font-mono tracking-wider" style={{ color: 'var(--color-ink-muted)' }}>04</span>
              <span className="block w-12 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: 'var(--color-accent)' }}
              >
                Ventures
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 tracking-tight max-w-3xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              Six categories I created before they had a market.
            </h2>
            <p
              className="text-lg leading-relaxed max-w-3xl mb-14"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              Every project connects back to translating complex systems science into frameworks people can actually use.
            </p>
          </ScrollReveal>

          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {ventureRows.map((row, i) => (
              <ScrollReveal key={row.name} animation="slide-up" delay={i * 60}>
                <a
                  href={row.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-5 no-underline transition-colors duration-200"
                  style={{ borderBottom: '1px solid var(--color-border-light)' }}
                >
                  <span
                    className="text-[10px] font-mono uppercase tracking-[0.15em] shrink-0 w-20 hidden sm:block"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    {row.tag}
                  </span>
                  <span
                    className="font-medium text-lg transition-colors duration-200 group-hover:text-amber-700"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                  >
                    {row.name}
                  </span>
                  <span className="text-sm flex-1 hidden md:block" style={{ color: 'var(--color-ink-muted)' }}>
                    {row.description}
                  </span>
                  <span
                    className="text-lg shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: 'var(--color-ink-muted)' }}
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
          CURRENT THINKING — Articles
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="graph-paper-overlay absolute inset-0" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal animation="fade-in">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[11px] font-mono tracking-wider" style={{ color: 'var(--color-ink-muted)' }}>05</span>
              <span className="block w-12 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: 'var(--color-accent)' }}
              >
                Current thinking
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight m-0"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
              >
                Writing
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
                  className="group block no-underline venture-card p-7 md:p-9 h-full"
                >
                  <span
                    className="block text-[10px] font-mono tracking-wider mb-4"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    {article.meta}
                  </span>
                  <span
                    className="block font-medium text-xl md:text-2xl leading-snug transition-colors duration-200 group-hover:text-amber-700"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                  >
                    {article.title}
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ORIGIN STORY — Dark cinematic panel
          ═══════════════════════════════════════════ */}
      <section className="relative bg-[#111110] overflow-hidden">
        {/* Grid on dark */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Accent line */}
        <div className="absolute top-0 left-12 w-px h-20 bg-gradient-to-b from-amber-700/40 to-transparent hidden lg:block" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-3xl">
            <ScrollReveal animation="fade-in">
              <div className="flex items-center gap-4 mb-14">
                <span className="text-[11px] font-mono text-white/30 tracking-wider">06</span>
                <span className="block w-12 h-px bg-white/20" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-500/80">
                  Origin
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={100}>
              <p
                className="text-3xl md:text-4xl lg:text-[2.75rem] font-medium leading-snug mb-8 text-white tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                After years of misdiagnoses, I became the first known person to undergo FMT for Celiac Disease.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={200}>
              <p className="text-base md:text-lg leading-relaxed max-w-2xl mb-12 text-white/50">
                DIY, because no GI would do it. Four years later, the published case study called it a
                breakthrough. That experience changed the trajectory of everything you see here.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={300}>
              <Link
                href="/about"
                className="inline-flex items-center px-7 py-3.5 text-sm font-medium tracking-wide rounded transition-all duration-300 hover:-translate-y-0.5"
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
