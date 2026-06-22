import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ventures } from '@/lib/ventures';

// Standalone design study — full, SEO-rich homepage in the oversized
// duotone style. Not linked from nav; noindex. For review on /concept.
export const metadata: Metadata = {
  title: 'Concept — Design Study',
  robots: { index: false, follow: false },
};

const NAVY = 'var(--color-ink-deep)';
const PAPER = '#f6f8fa';

const pillars = [
  {
    title: 'Microbial Metallomics',
    img: '/images/wp-migrated/Microbial-Metallomics.jpg',
    body: 'Heavy metals don’t just poison you directly — they reshape the gut microbiome, selecting for metal-resistant, virulence-enabled pathobionts while suppressing beneficial commensals. It is the lens that reframes food safety and chronic disease.',
  },
  {
    title: 'Heavy-Metal Standards',
    img: '/images/wp-migrated/Karen-Pendergrass-Microbiome-Medicine-.jpg',
    body: 'HMTc is the heavy-metal certification infrastructure the food system does not have yet — built before the demand wave hits, so the standard exists when the market finally asks for it.',
  },
  {
    title: 'Microbiome Signatures',
    img: '/images/wp-migrated/Evolutionary-Microbial-and-Functional-Case-for-Complex-Carbohydrates.jpg',
    body: 'Condition-specific microbial patterns, formalized through the Triangulation Method into a database of signatures that turns correlation into testable, targeted intervention.',
  },
];

const receipts = [
  { year: '2009', text: 'Founded the Paleo Foundation. A Harvard professor said there was no market. The market arrived.' },
  { year: '2012', text: 'First documented FMT for Celiac Disease — four years before the first published case study.' },
  { year: '2020', text: 'Told Fred Hart that Pepsi would put prebiotics on their cans. Pepsi confirmed it in 2026.' },
  { year: '2025', text: 'Only non-PhD among 150 researchers invited to the Beneficial Microbes Conference.' },
  { year: '2026', text: 'Published the Microbiome Medicine Journal, Volume I — five original papers on Parkinson’s disease.' },
  { year: 'Next', text: 'Heavy metals as the defining consumer-health issue. Phage therapy replacing antibiotics. Passive biomonitoring everywhere.' },
];

const articles = [
  { slug: 'microbial-metallomics-and-heavy-metal-contamination', title: 'Microbial Metallomics: The Missing Link in Heavy Metal Contamination', meta: 'Microbiome Research' },
  { slug: 'obesity-heavy-metals-sugar-scapegoat', title: 'The Obesity Scapegoat: Why Sugar Isn’t the Whole Story', meta: 'Analysis' },
  { slug: 'heavy-metal-index-tracing-food-contamination-to-source', title: 'The Heavy Metal Index: Tracing Food Contamination to the Evidence', meta: 'Analysis' },
  { slug: '2030-trends', title: '2030 Trends: A Forecast From Someone Who Called the Last Decade', meta: 'Forecasting' },
];

export default function ConceptPage() {
  return (
    <div className="page-enter">
      {/* Concept ribbon */}
      <div
        className="cc-eyebrow text-[10px] py-2 px-6 flex items-center justify-between"
        style={{ background: 'var(--color-accent)', color: NAVY }}
      >
        <span>Concept · Design Study · Not Live</span>
        <Link href="/" className="underline underline-offset-2">Back to site →</Link>
      </div>

      {/* ───────────── HERO (navy) ───────────── */}
      <section className="relative overflow-hidden" style={{ background: NAVY, color: PAPER }}>
        <div
          className="cc-ghost absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 select-none"
          aria-hidden="true"
          style={{ color: 'rgba(255,255,255,0.06)' }}
        >
          PENDERGRASS
        </div>

        <div className="relative z-10 pt-10 text-center">
          <span className="cc-eyebrow text-[11px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Research · Standards · Frameworks · Advisory
          </span>
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 pt-12 pb-24 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <p className="cc-eyebrow text-[11px] mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Standards Developer · Microbiome Researcher · Cyprus
              </p>
              <h1 className="cc-hero-title">
                The standard
                <br />
                before the
                <br />
                <span style={{ color: 'var(--color-accent)' }}>market.</span>
              </h1>
              <p className="text-base md:text-lg leading-relaxed mt-8 max-w-xl" style={{ color: 'rgba(255,255,255,0.82)' }}>
                Karen Pendergrass builds the frameworks that become the standard before there is a
                market — in microbial metallomics, heavy-metal certification, and microbiome signatures.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-10">
                <Link href="/writing" className="px-7 py-3.5 text-[12px] tracking-[0.12em] uppercase" style={{ background: 'var(--color-accent)', color: NAVY, fontFamily: 'var(--font-mono)' }}>
                  Read the work
                </Link>
                <Link href="/start" className="px-7 py-3.5 text-[12px] tracking-[0.12em] uppercase" style={{ border: '1px solid rgba(255,255,255,0.4)', color: PAPER, fontFamily: 'var(--font-mono)' }}>
                  Start here
                </Link>
              </div>
              <p className="cc-eyebrow cc-caret text-[10px] mt-10" style={{ color: 'rgba(255,255,255,0.5)' }}>
                &gt; based in parekklisia, cyprus
              </p>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 relative">
              <div className="relative mx-auto w-full max-w-[440px] aspect-[2/3]">
                <div className="cc-sunburst" aria-hidden="true" />
                <Image src="/images/Karen_Pendergrass.png" alt="Karen Pendergrass" fill sizes="(max-width: 1024px) 320px, 440px" className="object-contain object-bottom cc-figure relative z-[1]" priority />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 pb-8 flex items-center justify-between">
          <span className="cc-eyebrow text-[9px]" style={{ color: 'rgba(255,255,255,0.45)' }}>Karen Pendergrass · Est. 2009</span>
          <span className="cc-eyebrow text-[9px]" style={{ color: 'rgba(255,255,255,0.45)' }}>34.68°N 33.14°E · Paleo Foundation</span>
        </div>
      </section>

      {/* ───────────── POSITIONING + PILLARS (paper) ───────────── */}
      <section style={{ background: PAPER, color: NAVY }} className="py-20 md:py-28">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16">
            <p className="cc-eyebrow text-[11px] mb-5" style={{ color: 'var(--color-accent-dark)' }}>What I do</p>
            <h2 className="cc-feature-title mb-6" style={{ fontSize: 'clamp(1.9rem, 4vw, 3.25rem)', color: NAVY }}>
              I translate complex systems science into standards people can use.
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--color-ink)' }}>
              I&rsquo;m a standards developer and microbiome signatures researcher, and the founder of six
              organizations at the intersection of microbiome science, translational medicine, and
              regulatory innovation. My work spans microbial metallomics, heavy-metal certification, food
              safety standards, and microbiome-targeted interventions. In 2012 I became the first
              documented case of fecal microbiota transplantation for Celiac Disease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {pillars.map((p, i) => (
              <div key={p.title}>
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="cc-eyebrow text-[10px]" style={{ color: 'var(--color-accent-dark)' }}>0{i + 1}</span>
                  <h3 className="cc-feature-title" style={{ color: NAVY }}>{p.title}</h3>
                </div>
                <div className="cc-duo relative aspect-[4/5] mb-5">
                  <Image src={p.img} alt="" fill sizes="(max-width: 768px) 100vw, 460px" className="object-cover" />
                  <div className="cc-duo-tint" />
                  <div className="cc-duo-accent" />
                  <div className="cc-halftone" />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── THE RECEIPTS (navy) ───────────── */}
      <section style={{ background: NAVY, color: PAPER }} className="py-20 md:py-28">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <p className="cc-eyebrow text-[11px] mb-10" style={{ color: 'var(--color-accent)' }}>The receipts · a documented track record</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
            {receipts.map((r) => (
              <div key={r.year} className="border-l pl-6" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
                <p className="cc-feature-title mb-3" style={{ color: 'var(--color-accent)' }}>{r.year}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── VENTURES (paper, oversized rows) ───────────── */}
      <section style={{ background: PAPER, color: NAVY }} className="py-20 md:py-28">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <p className="cc-eyebrow text-[11px] mb-10" style={{ color: 'var(--color-accent-dark)' }}>Ventures · six categories created before they had a market</p>
          <div style={{ borderTop: '1px solid rgba(29,56,79,0.18)' }}>
            {ventures.map((v) => (
              <a
                key={v.name}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-6 no-underline"
                style={{ borderBottom: '1px solid rgba(29,56,79,0.12)' }}
              >
                <span className="cc-eyebrow text-[10px] shrink-0 w-24 pt-1" style={{ color: 'var(--color-accent-dark)' }}>{v.tag}</span>
                <span className="cc-feature-title flex-1 transition-colors" style={{ color: NAVY }}>{v.name}</span>
                <span className="text-sm flex-[2] hidden md:block" style={{ color: 'var(--color-ink-secondary)' }}>{v.homeDescription}</span>
                <span className="text-xl shrink-0 transition-transform duration-200 group-hover:translate-x-1" style={{ color: 'var(--color-accent-dark)' }}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── WRITING (navy) ───────────── */}
      <section style={{ background: NAVY, color: PAPER }} className="py-20 md:py-28">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <p className="cc-eyebrow text-[11px]" style={{ color: 'var(--color-accent)' }}>Current thinking</p>
            <Link href="/writing" className="cc-eyebrow text-[11px] underline underline-offset-4" style={{ color: PAPER }}>All writing →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.12)' }}>
            {articles.map((a) => (
              <Link key={a.slug} href={`/writing/${a.slug}`} className="group block p-8 no-underline" style={{ background: NAVY }}>
                <span className="cc-eyebrow text-[10px]" style={{ color: 'var(--color-accent)' }}>{a.meta}</span>
                <span className="block cc-feature-title mt-4" style={{ color: PAPER }}>{a.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── ORIGIN (paper) ───────────── */}
      <section style={{ background: PAPER, color: NAVY }} className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <p className="cc-eyebrow text-[11px] mb-6" style={{ color: 'var(--color-accent-dark)' }}>Origin</p>
          <h2 className="cc-feature-title mb-6" style={{ fontSize: 'clamp(1.9rem, 4vw, 3.25rem)', color: NAVY }}>
            After years of misdiagnoses, I became the first known person to undergo FMT for Celiac Disease.
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: 'var(--color-ink)' }}>
            DIY, because no gastroenterologist would do it. Four years later, the published case study
            called it a breakthrough. That experience changed the trajectory of everything you see here:
            the certification frameworks, the microbiome signatures research, and the conviction that the
            most important standards have to exist before the market knows it needs them.
          </p>
          <Link href="/about" className="inline-block mt-2 px-7 py-3.5 text-[12px] tracking-[0.12em] uppercase" style={{ background: NAVY, color: PAPER, fontFamily: 'var(--font-mono)' }}>
            Read the full story
          </Link>
        </div>
      </section>

      {/* ───────────── CLOSING BAND (navy) ───────────── */}
      <section style={{ background: NAVY, color: PAPER }} className="py-24 md:py-32 relative overflow-hidden">
        <div className="aurora aurora-dark" aria-hidden="true" />
        <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 text-center">
          <p className="cc-eyebrow text-[11px] mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>A documented track record</p>
          <h2 className="cc-hero-title" style={{ fontSize: 'clamp(2.25rem, 6vw, 5.5rem)' }}>
            Called the last decade.
            <br />
            <span style={{ color: 'var(--color-accent)' }}>Calling the next one.</span>
          </h2>
          <div className="mt-12">
            <Link href="/advisory" className="inline-block px-8 py-4 text-[12px] tracking-[0.12em] uppercase" style={{ background: 'var(--color-accent)', color: NAVY, fontFamily: 'var(--font-mono)' }}>
              See the receipts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
