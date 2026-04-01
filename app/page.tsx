import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Karen Pendergrass',
  description:
    'Founder of five organizations. Frameworks in microbiome science, food safety certification, and translational medicine—built before the market existed.',
};

const ventureRows = [
  {
    slug: 'paleo-foundation',
    name: 'Paleo Foundation',
    description: 'Certification standards for Paleo, Keto, Grain-Free, HMTc',
  },
  {
    slug: 'microbiome-medicine',
    name: 'Microbiome Medicine',
    description: 'Disease-associated microbiome patterns for clinical translation',
  },
  {
    slug: 'journal-of-food-metallomics',
    name: 'Journal of Food Metallomics',
    description: 'Trace metal analysis meets microbiome and food safety',
  },
  {
    slug: 'tinies',
    name: 'Tinies',
    description: 'Connecting animal sanctuaries with sponsors worldwide',
  },
  {
    slug: 'gardens-of-st-gertrude',
    name: 'Gardens of St. Gertrude',
    description: 'Cat sanctuary in Parekklisia, Cyprus. 92 cats.',
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

function BtnPrimary({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-6 py-3 bg-brand-red text-white text-sm font-semibold font-dm tracking-wide rounded-sm no-underline hover:opacity-95 transition-opacity ${className}`}
    >
      {children}
    </Link>
  );
}

function BtnOutline({
  href,
  children,
  dark = false,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  const base = dark
    ? 'border-white text-white hover:bg-white hover:text-home-dark'
    : 'border-brand-red text-brand-red hover:bg-brand-red hover:text-white';
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-5 py-2.5 border text-sm font-semibold font-dm tracking-wide rounded-sm no-underline transition-colors ${base} ${className}`}
    >
      {children}
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="bg-home-surface text-home-ink font-dm antialiased">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <p className="text-sm md:text-base italic text-home-ink/60 mb-6 max-w-2xl leading-relaxed">
          Founder of 5 organizations. 15 years in microbiome research. Consistently early.
        </p>
        <h1 className="font-playfair font-bold text-home-ink text-4xl sm:text-5xl md:text-[3.25rem] lg:text-[4rem] leading-[1.08] tracking-tight max-w-4xl mb-10">
          I build the frameworks that become the standard before there&apos;s a market for them.
        </h1>
        <blockquote className="border-l-[3px] border-brand-red/50 pl-5 md:pl-6 max-w-2xl mb-4">
          <p className="text-base md:text-lg italic text-home-ink/65 leading-relaxed">
            &ldquo;Well if it isn&apos;t the oracle herself! Too bad we don&apos;t have a recording of that
            call. And now you need to put out a 2030 trends prediction piece.&rdquo;
          </p>
        </blockquote>
        <p className="text-sm text-home-ink/50 mb-10 pl-5 md:pl-6">Fred Hart · Partner at Interact</p>
        <BtnPrimary href="/contact">Start a conversation</BtnPrimary>
      </section>

      {/* The receipts */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-home-rowborder/60">
        <p
          className="text-xs font-semibold tracking-[0.2em] text-home-ink/80 uppercase mb-12 font-dm"
          style={{ fontFeatureSettings: '"smcp"' }}
        >
          <span className="text-brand-red">—</span> THE RECEIPTS
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <ul className="space-y-10 list-none p-0 m-0">
            <li>
              <p className="text-sm md:text-base leading-relaxed">
                <span className="font-bold text-brand-red">2009</span>
                <span className="text-home-ink/40"> — </span>
                Founded Paleo Foundation. Professor said there was no market. The market arrived.
              </p>
            </li>
            <li>
              <p className="text-sm md:text-base leading-relaxed">
                <span className="font-bold text-brand-red">2020</span>
                <span className="text-home-ink/40"> — </span>
                Told Fred Hart that Pepsi would put prebiotics on their cans. Pepsi confirmed 2026.
              </p>
            </li>
            <li>
              <p className="text-sm md:text-base leading-relaxed">
                <span className="font-bold text-brand-red">2026</span>
                <span className="text-home-ink/40"> — </span>
                Published Microbiome Medicine Journal, Volume I. 5 original papers on Parkinson&apos;s
                disease.
              </p>
            </li>
          </ul>
          <ul className="space-y-10 list-none p-0 m-0">
            <li>
              <p className="text-sm md:text-base leading-relaxed">
                <span className="font-bold text-brand-red">2012</span>
                <span className="text-home-ink/40"> — </span>
                First documented FMT for Celiac Disease. 4 years before the first published case study.
              </p>
            </li>
            <li>
              <p className="text-sm md:text-base leading-relaxed">
                <span className="font-bold text-brand-red">2025</span>
                <span className="text-home-ink/40"> — </span>
                Only non-PhD among 150 researchers. Invited guest at Beneficial Microbes Conference.
              </p>
            </li>
            <li>
              <p className="text-sm md:text-base leading-relaxed italic text-home-ink/55">
                <span className="font-bold text-brand-red not-italic">Soon</span>
                <span className="text-home-ink/40 not-italic"> — </span>
                Heavy metals as the next major consumer health issue. Smart toilets for biomonitoring.
                Phage therapy replacing antibiotics.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Work with me */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-home-rowborder/60">
        <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-home-ink mb-3">
          Work with me
        </h2>
        <p className="text-home-ink/65 text-base md:text-lg mb-12 max-w-2xl">
          Three ways, depending on what you need and how fast you need it.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5">
          {/* Advisory */}
          <div className="border border-home-rowborder bg-home-surface p-6 md:p-8 flex flex-col">
            <p className="text-xs font-semibold tracking-[0.18em] text-home-ink/70 uppercase mb-4">
              Advisory
            </p>
            <p className="font-playfair text-2xl font-semibold text-home-ink mb-4">$1,500/hr</p>
            <p className="text-sm text-home-ink/70 leading-relaxed flex-1 mb-8">
              For founders, executives, and product teams who need a specific question answered by
              someone who&apos;s already solved it.
            </p>
            <BtnOutline href="/advisory">Book advisory</BtnOutline>
          </div>
          {/* Roundtable featured */}
          <div className="border border-home-dark bg-home-dark text-white p-6 md:p-8 flex flex-col">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/70 uppercase mb-4">
              Roundtable
            </p>
            <p className="font-playfair text-2xl font-semibold text-white mb-4">$75K+</p>
            <p className="text-sm text-white/75 leading-relaxed flex-1 mb-8">
              Structured multi-omics sessions producing prioritized targets, testable therapeutic
              directions, and a published synthesis.
            </p>
            <BtnPrimary href="/roundtable">Request a roundtable</BtnPrimary>
          </div>
          {/* Speaking */}
          <div className="border border-home-rowborder bg-home-surface p-6 md:p-8 flex flex-col">
            <p className="text-xs font-semibold tracking-[0.18em] text-home-ink/70 uppercase mb-4">
              Speaking
            </p>
            <p className="font-playfair text-2xl font-semibold text-home-ink mb-4">Inquiry</p>
            <p className="text-sm text-home-ink/70 leading-relaxed flex-1 mb-8">
              Conferences, panels, and podcasts. Six topics from microbial metallomics to certification
              systems to trend forecasting.
            </p>
            <BtnOutline href="/speaking">View speaking topics</BtnOutline>
          </div>
        </div>
      </section>

      {/* Five categories */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-home-rowborder/60">
        <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-home-ink mb-3 max-w-3xl">
          Five categories I created before they had a market
        </h2>
        <p className="text-home-ink/65 text-base md:text-lg mb-10 max-w-3xl">
          Every project connects back to translating complex systems science into frameworks people can
          actually use.
        </p>
        <ul className="border-t border-home-rowborder list-none p-0 m-0">
          {ventureRows.map((row) => (
            <li key={row.slug} className="border-b border-home-rowborder">
              <Link
                href={`/ventures/${row.slug}`}
                className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 py-5 px-1 -mx-1 no-underline hover:bg-home-cream/60 transition-colors rounded-sm"
              >
                <p className="m-0 text-sm md:text-base leading-relaxed pr-4">
                  <span className="font-bold text-home-ink group-hover:text-brand-red transition-colors">
                    {row.name}
                  </span>
                  <span className="font-normal text-home-ink/55"> {row.description}</span>
                </p>
                <span
                  className="text-home-ink/40 shrink-0 sm:ml-auto text-lg group-hover:text-brand-red transition-colors self-start sm:self-auto"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Current thinking */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-24 border-t border-home-rowborder/60">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-home-ink">Current thinking</h2>
          <Link
            href="/writing"
            className="text-sm font-semibold text-brand-red no-underline hover:underline shrink-0 font-dm"
          >
            All writing →
          </Link>
        </div>
        <ul className="divide-y divide-home-rowborder list-none p-0 m-0">
          {currentArticles.map((article) => (
            <li key={article.slug} className="py-6 first:pt-0">
              <Link
                href={`/writing/${article.slug}`}
                className="group block no-underline"
              >
                <span className="block font-bold text-home-ink text-base md:text-lg group-hover:text-brand-red transition-colors">
                  {article.title}
                </span>
                <span className="block text-xs md:text-sm text-home-ink/50 mt-2 font-dm">{article.meta}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Origin story */}
      <section className="bg-home-dark text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <p className="text-xs font-semibold tracking-[0.15em] text-white/45 uppercase mb-8">
            The origin story
          </p>
          <p className="font-playfair text-2xl md:text-3xl lg:text-[2.25rem] leading-snug font-semibold text-white max-w-3xl mb-8">
            After years of misdiagnoses, I became the first known person to undergo FMT for Celiac
            Disease.
          </p>
          <p className="text-base md:text-lg text-white/75 leading-relaxed max-w-2xl mb-10">
            DIY, because no GI would do it. Four years later, the published case study called it a
            breakthrough. That experience changed the trajectory of everything you see here.
          </p>
          <BtnPrimary href="/about">Read the full story</BtnPrimary>
        </div>
      </section>
    </div>
  );
}
