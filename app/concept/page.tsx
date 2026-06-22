import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Standalone design study — NOT linked from nav, noindex. Adapts the
// Hermes/Nous "oversized duotone + serif-caps × monospace" language to
// Karen's brand (deep navy duotone, off-white, single orange accent).
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
    body: 'How heavy metals reshape the gut microbiome — selecting for metal-resistant, virulence-enabled pathobionts while suppressing commensals.',
  },
  {
    title: 'Heavy-Metal Standards',
    img: '/images/wp-migrated/Karen-Pendergrass-Microbiome-Medicine-.jpg',
    body: 'HMTc: the certification infrastructure for food safety that the system does not have yet. Built before the demand wave hits.',
  },
  {
    title: 'Microbiome Signatures',
    img: '/images/wp-migrated/Evolutionary-Microbial-and-Functional-Case-for-Complex-Carbohydrates.jpg',
    body: 'Condition-specific microbial patterns, formalized into a triangulation method and a database of signatures.',
  },
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
      <section
        className="relative overflow-hidden"
        style={{ background: NAVY, color: PAPER }}
      >
        {/* Giant ghost wordmark */}
        <div
          className="cc-ghost absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 select-none"
          aria-hidden="true"
          style={{ color: 'rgba(255,255,255,0.05)' }}
        >
          PENDERGRASS
        </div>

        {/* Top pill */}
        <div className="relative z-10 pt-10 text-center">
          <span className="cc-eyebrow text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Research · Standards · Frameworks · Advisory
          </span>
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 pt-12 pb-24 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left — oversized type */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <p className="cc-eyebrow text-[11px] mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Standards Developer · Microbiome Researcher · Cyprus
              </p>
              <h1 className="cc-hero-title">
                The standard
                <br />
                before the
                <br />
                <span style={{ color: 'var(--color-accent)' }}>market.</span>
              </h1>

              <p
                className="cc-eyebrow text-[11px] leading-[1.9] mt-8 max-w-xl"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                I build the frameworks that become the standard before there is a market —
                microbial metallomics, heavy-metal certification, microbiome signatures.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-10">
                <Link
                  href="/writing"
                  className="px-7 py-3.5 text-[12px] tracking-[0.12em] uppercase"
                  style={{ background: 'var(--color-accent)', color: NAVY, fontFamily: 'var(--font-mono)' }}
                >
                  Read the work
                </Link>
                <Link
                  href="/start"
                  className="px-7 py-3.5 text-[12px] tracking-[0.12em] uppercase"
                  style={{ border: '1px solid rgba(255,255,255,0.35)', color: PAPER, fontFamily: 'var(--font-mono)' }}
                >
                  Start here
                </Link>
              </div>

              <p
                className="cc-eyebrow cc-caret text-[10px] mt-10"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                &gt; based in parekklisia, cyprus
              </p>
            </div>

            {/* Right — duotone figure with sunburst */}
            <div className="lg:col-span-5 order-1 lg:order-2 relative">
              <div className="relative mx-auto w-full max-w-[440px] aspect-[2/3]">
                <div className="cc-sunburst" aria-hidden="true" />
                <Image
                  src="/images/Karen_Pendergrass.png"
                  alt="Karen Pendergrass"
                  fill
                  sizes="(max-width: 1024px) 320px, 440px"
                  className="object-contain object-bottom cc-figure relative z-[1]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* HUD corner metadata */}
        <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 pb-8 flex items-center justify-between">
          <span className="cc-eyebrow text-[9px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Karen Pendergrass · Est. 2009
          </span>
          <span className="cc-eyebrow text-[9px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
            34.68°N 33.14°E · Paleo Foundation
          </span>
        </div>
      </section>

      {/* ───────────── TRIPTYCH (paper — the flip) ───────────── */}
      <section style={{ background: PAPER, color: NAVY }} className="py-20 md:py-28">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {pillars.map((p, i) => (
              <div key={p.title}>
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="cc-eyebrow text-[10px]" style={{ color: 'var(--color-accent-dark)' }}>
                    0{i + 1}
                  </span>
                  <h2 className="cc-feature-title" style={{ color: NAVY }}>
                    {p.title}
                  </h2>
                </div>
                <div className="cc-duo relative aspect-[4/5] mb-5">
                  <Image src={p.img} alt="" fill sizes="(max-width: 768px) 100vw, 460px" className="object-cover" />
                  <div className="cc-duo-tint" />
                  <div className="cc-duo-accent" />
                  <div className="cc-halftone" />
                </div>
                <p className="cc-eyebrow text-[10px] leading-[1.9]" style={{ color: 'rgba(29,56,79,0.7)' }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CLOSING BAND (navy) ───────────── */}
      <section style={{ background: NAVY, color: PAPER }} className="py-24 md:py-32 relative overflow-hidden">
        <div className="aurora aurora-dark" aria-hidden="true" />
        <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 text-center">
          <p className="cc-eyebrow text-[11px] mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
            A documented track record
          </p>
          <h2 className="cc-hero-title" style={{ fontSize: 'clamp(2.25rem, 6vw, 5.5rem)' }}>
            Called the last decade.
            <br />
            <span style={{ color: 'var(--color-accent)' }}>Calling the next one.</span>
          </h2>
          <div className="mt-12">
            <Link
              href="/advisory"
              className="inline-block px-8 py-4 text-[12px] tracking-[0.12em] uppercase"
              style={{ background: 'var(--color-accent)', color: NAVY, fontFamily: 'var(--font-mono)' }}
            >
              See the receipts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
