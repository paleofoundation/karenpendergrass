import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Karen Pendergrass',
  description:
    'Founder of five organizations. Frameworks in microbiome science, food safety, and translational medicine.',
};

const ventureRows = [
  {
    name: 'Paleo Foundation',
    description: 'Certification standards for Paleo, Keto, Grain-Free, HMTc',
  },
  {
    name: 'Microbiome Medicine',
    description: 'Disease-associated microbiome patterns for clinical translation',
  },
  {
    name: 'Journal of Food Metallomics',
    description: 'Trace metal analysis meets microbiome and food safety',
  },
  {
    name: 'Tinies',
    description: 'Connecting animal sanctuaries with sponsors worldwide',
  },
  {
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

export default function HomePage() {
  return (
    <div className="page-enter">
      {/* Section 1: Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20 overflow-x-clip">
        <div className="grid grid-cols-1 md:grid-cols-[45fr_55fr] md:items-stretch gap-8 md:gap-x-8 md:gap-y-0">
          <div className="order-1 md:order-2 max-w-3xl">
            <p className="text-sm md:text-base italic text-ink-muted mb-6 leading-relaxed">
              Founder of 5 organizations. 15 years in microbiome research. Consistently early.
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.1] tracking-tight mb-8"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              I build the frameworks that become the standard before there&apos;s a market for them.
            </h1>
            <blockquote className="border-l-[3px] border-accent pl-5 md:pl-6 mb-4 max-w-2xl">
              <p className="text-base md:text-lg italic text-ink-light leading-relaxed">
                &ldquo;Well if it isn&apos;t the oracle herself! Too bad we don&apos;t have a recording of
                that call. And now you need to put out a 2030 trends prediction piece.&rdquo;
              </p>
            </blockquote>
            <p className="text-sm text-ink-muted mb-8 pl-5 md:pl-6">Fred Hart · Partner at Interact</p>
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 bg-accent text-paper text-sm font-medium rounded-md hover:bg-accent-dark transition-colors"
            >
              Start a conversation
            </Link>
          </div>
          <div className="order-2 md:order-1 relative w-full min-h-[500px] h-[min(90vw,620px)] md:min-h-0 md:h-full md:-ml-6 md:w-[calc(100%+1.5rem)]">
            <Image
              src="/images/Karen_Pendergrass.png"
              alt="Karen Pendergrass"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              quality={100}
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </section>

      {/* Section 2: The receipts */}
      <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-20 border-t border-ink/5 pt-16 md:pt-20">
        <p
          className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-10 md:mb-12"
          style={{ letterSpacing: '0.2em' }}
        >
          — THE RECEIPTS
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <ul className="space-y-8 list-none p-0 m-0">
            <li className="text-sm md:text-base text-ink-light leading-relaxed">
              <span className="font-bold text-accent">2009</span>
              <span className="text-ink-muted"> — </span>
              Founded Paleo Foundation. Professor said there was no market. The market arrived.
            </li>
            <li className="text-sm md:text-base text-ink-light leading-relaxed">
              <span className="font-bold text-accent">2020</span>
              <span className="text-ink-muted"> — </span>
              Told Fred Hart that Pepsi would put prebiotics on their cans. Pepsi confirmed 2026.
            </li>
            <li className="text-sm md:text-base text-ink-light leading-relaxed">
              <span className="font-bold text-accent">2026</span>
              <span className="text-ink-muted"> — </span>
              Published Microbiome Medicine Journal, Volume I. 5 original papers on Parkinson&apos;s
              disease.
            </li>
          </ul>
          <ul className="space-y-8 list-none p-0 m-0">
            <li className="text-sm md:text-base text-ink-light leading-relaxed">
              <span className="font-bold text-accent">2012</span>
              <span className="text-ink-muted"> — </span>
              First documented FMT for Celiac Disease. 4 years before the first published case study.
            </li>
            <li className="text-sm md:text-base text-ink-light leading-relaxed">
              <span className="font-bold text-accent">2025</span>
              <span className="text-ink-muted"> — </span>
              Only non-PhD among 150 researchers. Invited guest at Beneficial Microbes Conference.
            </li>
            <li className="text-sm md:text-base text-ink-light leading-relaxed italic text-ink-muted">
              <span className="font-bold text-accent not-italic">Soon</span>
              <span className="text-ink-muted not-italic"> — </span>
              Heavy metals as the next major consumer health issue. Smart toilets for biomonitoring.
              Phage therapy replacing antibiotics.
            </li>
          </ul>
        </div>
      </section>

      {/* Section 3: Work with me */}
      <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-20 border-t border-ink/5 pt-16 md:pt-20">
        <h2
          className="text-2xl md:text-3xl font-medium text-ink mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Work with me
        </h2>
        <p className="text-lg text-ink-light leading-relaxed max-w-2xl mb-10 md:mb-12">
          Three ways, depending on what you need and how fast you need it.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="border border-ink/5 rounded-lg bg-paper-warm p-6 md:p-8 flex flex-col">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-4"
              style={{ letterSpacing: '0.12em' }}
            >
              Advisory
            </p>
            <p
              className="text-xl md:text-2xl font-medium text-ink mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              $1,500/hr
            </p>
            <p className="text-sm text-ink-light leading-relaxed flex-1 mb-6">
              For founders, executives, and product teams who need a specific question answered by
              someone who&apos;s already solved it.
            </p>
            <Link
              href="/advisory"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-ink/15 text-ink text-sm font-medium rounded-md hover:bg-ink/5 transition-colors mt-auto"
            >
              Book advisory
            </Link>
          </div>
          <div className="border border-ink/5 rounded-lg bg-paper-warm p-6 md:p-8 flex flex-col">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-4"
              style={{ letterSpacing: '0.12em' }}
            >
              Roundtable
            </p>
            <p
              className="text-xl md:text-2xl font-medium text-ink mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              $75K+
            </p>
            <p className="text-sm text-ink-light leading-relaxed flex-1 mb-6">
              Structured multi-omics sessions producing prioritized targets, testable therapeutic
              directions, and a published synthesis.
            </p>
            <Link
              href="/roundtable"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-ink text-paper text-sm font-medium rounded-md hover:bg-ink-light transition-colors mt-auto"
            >
              Request a roundtable
            </Link>
          </div>
          <div className="border border-ink/5 rounded-lg bg-paper-warm p-6 md:p-8 flex flex-col">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-4"
              style={{ letterSpacing: '0.12em' }}
            >
              Speaking
            </p>
            <p
              className="text-xl md:text-2xl font-medium text-ink mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Inquiry
            </p>
            <p className="text-sm text-ink-light leading-relaxed flex-1 mb-6">
              Conferences, panels, and podcasts. Six topics from microbial metallomics to certification
              systems to trend forecasting.
            </p>
            <Link
              href="/speaking"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-ink/15 text-ink text-sm font-medium rounded-md hover:bg-ink/5 transition-colors mt-auto"
            >
              View speaking topics
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Five categories */}
      <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-20 border-t border-ink/5 pt-16 md:pt-20">
        <h2
          className="text-2xl md:text-3xl font-medium text-ink mb-3 max-w-3xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Five categories I created before they had a market
        </h2>
        <p className="text-lg text-ink-light leading-relaxed max-w-3xl mb-10">
          Every project connects back to translating complex systems science into frameworks people can
          actually use.
        </p>
        <ul className="border-t border-ink/10 list-none p-0 m-0">
          {ventureRows.map((row) => (
            <li key={row.name} className="border-b border-ink/10">
              <Link
                href="/ventures"
                className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 py-5 no-underline hover:bg-ink/5 transition-colors -mx-1 px-1 rounded-sm"
              >
                <p className="m-0 text-sm md:text-base leading-relaxed pr-4">
                  <span className="font-bold text-ink group-hover:text-accent transition-colors">
                    {row.name}
                  </span>
                  <span className="font-normal text-ink-muted"> — {row.description}</span>
                </p>
                <span
                  className="text-ink-muted shrink-0 text-lg group-hover:text-accent transition-colors"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 5: Current thinking */}
      <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-20 border-t border-ink/5 pt-16 md:pt-20">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-8">
          <h2
            className="text-2xl md:text-3xl font-medium text-ink m-0"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Current thinking
          </h2>
          <Link href="/writing" className="text-sm text-accent font-medium link-animate shrink-0">
            All writing →
          </Link>
        </div>
        <ul className="divide-y divide-ink/10 list-none p-0 m-0">
          {currentArticles.map((article) => (
            <li key={article.slug} className="py-6 first:pt-0">
              <Link href={`/writing/${article.slug}`} className="group block no-underline">
                <span
                  className="block font-bold text-ink text-base md:text-lg group-hover:text-accent transition-colors"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {article.title}
                </span>
                <span className="block text-xs md:text-sm text-ink-muted mt-2">{article.meta}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 6: Origin story */}
      <section className="w-full bg-ink text-paper mt-0">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-paper/50 mb-8"
            style={{ letterSpacing: '0.12em' }}
          >
            The origin story
          </p>
          <p
            className="text-2xl md:text-3xl font-medium text-paper leading-snug max-w-3xl mb-8"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            After years of misdiagnoses, I became the first known person to undergo FMT for Celiac
            Disease.
          </p>
          <p className="text-base md:text-lg text-paper/75 leading-relaxed max-w-2xl mb-10">
            DIY, because no GI would do it. Four years later, the published case study called it a
            breakthrough. That experience changed the trajectory of everything you see here.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center px-5 py-2.5 bg-paper text-ink text-sm font-medium rounded-md hover:bg-paper-warm transition-colors"
          >
            Read the full story
          </Link>
        </div>
      </section>
    </div>
  );
}
