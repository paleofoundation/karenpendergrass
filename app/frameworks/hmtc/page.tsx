import type { Metadata } from 'next';
import Link from 'next/link';
import { FrameworkSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Heavy Metal Tested & Certified (HMTc) | Karen Pendergrass',
  description:
    'HMTc is a certification framework establishing category-specific heavy metal contaminant limits for food, supplements, and consumer products using ALARA-based principles, statistical risk matrices, and defined surveillance protocols. Developed by Karen Pendergrass at the Paleo Foundation.',
  keywords: [
    'HMTc',
    'heavy metal testing',
    'heavy metal certification',
    'ALARA food safety',
    'contaminant limits',
    'food safety certification',
    'Karen Pendergrass',
    'Paleo Foundation',
  ],
};

export default function HMTcPage() {
  return (
    <div className="page-enter">
      <FrameworkSchema
        name="Heavy Metal Tested & Certified (HMTc)"
        slug="hmtc"
        description="A certification framework establishing category-specific heavy metal contaminant limits for food, supplements, and consumer products using ALARA-based principles, statistical risk matrices, and defined surveillance protocols."
        alternateName="HMTc Certification"
      />

      <article className="max-w-3xl mx-auto px-6 pt-16 pb-20">
        <div className="mb-4 flex items-center gap-3">
          <Link href="/frameworks" className="text-xs text-ink-muted hover:text-accent transition-colors">&larr; Frameworks</Link>
          <span className="text-ink-muted text-xs">/</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent" style={{ letterSpacing: '0.1em' }}>Food Safety</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-medium text-ink leading-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Heavy Metal Tested &amp; Certified (HMTc)
        </h1>
        <p className="text-lg text-ink-light mb-8" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
          Category-specific contaminant limits using ALARA principles
        </p>

        <div className="prose">
          <h2>The Problem</h2>

          <p>
            Heavy metal contamination in food, supplements, and consumer products is ubiquitous, yet existing regulatory frameworks are either absent, outdated, or set at thresholds too high to protect vulnerable populations. When testing does occur, results are evaluated against single pass/fail limits that ignore normal batch-to-batch variability, penalize manufacturers for statistical noise, and create no incentive for continuous improvement. The result is a market where consumers cannot distinguish genuinely low-contamination products from those that merely meet a minimum bar.
          </p>

          <h2>The Framework</h2>

          <p>
            HMTc is designed around several core principles that distinguish it from conventional heavy metal testing programs.
          </p>

          <p>
            <strong>Category-specific limits.</strong> Contaminant thresholds are set per product category (infant foods, supplements, cosmetics, cleaning products, pet foods, toys) rather than applying a single universal standard. A baby food and a pet treat have fundamentally different risk profiles and require different limits.
          </p>

          <p>
            <strong>Per-metal standards.</strong> Eight individual standards documents cover lead (Pb), arsenic (As), mercury (Hg), cadmium (Cd), chromium (Cr), nickel (Ni), tin (Sn), and aluminum (Al). Each document addresses the specific toxicology, analytical methods, speciation triggers, and category-appropriate limits for that metal.
          </p>

          <p>
            <strong>ALARA-based principles.</strong> "As Low As Reasonably Achievable" is the governing philosophy. HMTc does not just set a ceiling; it incentivizes brands to continuously reduce contamination levels below the certification threshold. The program is designed to keep brands improving without turning normal variability into a commercial catastrophe.
          </p>

          <p>
            <strong>Statistical risk matrices.</strong> Rather than binary pass/fail on individual lots, HMTc uses statistical approaches to evaluate contamination patterns over time. This distinguishes genuine contamination problems from normal manufacturing variation and focuses enforcement on trends rather than outliers.
          </p>

          <p>
            <strong>Defined surveillance protocol.</strong> Any product bearing the HMTc mark is supported as evidence under a defined surveillance protocol with lot testing schedules, governance policies, and anti-circumvention language that prevents brands from gaming the certification through selective testing or label manipulation.
          </p>

          <h2>Analytical Requirements</h2>

          <p>
            HMTc standards require ISO/IEC 17025 accredited laboratory testing. For arsenic, speciation triggers require differentiation between inorganic arsenic (iAs) and organic forms, with limits of quantification (LOQ) tightened to 1-2 ppb for iAs. Analytical methods are specified per metal rather than relying on generic multi-element screening.
          </p>

          <h2>Connection to Microbial Metallomics</h2>

          <p>
            HMTc emerged from a recognition that heavy metal contamination is not just a toxicological problem but a microbiological one. Research in{' '}
            <Link href="/frameworks/microbial-metallomics" className="text-accent">
              microbial metallomics
            </Link>{' '}
            demonstrates that environmental heavy metal exposure selects for pathogenic, antibiotic-resistant bacteria. The same metals that HMTc measures in food are shaping the microbial communities in the consumers who eat that food. This connection between food safety certification and microbiome health is unique to the HMTc framework.
          </p>

          <p>
            HMTc is developed and administered by the{' '}
            <Link href="/ventures" className="text-accent">
              Paleo Foundation
            </Link>{' '}
            (
            <a
              href="https://paleofoundation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent"
            >
              paleofoundation.com
            </a>
            ). Full program details are available at{' '}
            <a
              href="https://heavymetaltested.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent"
            >
              heavymetaltested.com
            </a>
            .
          </p>
        </div>
      </article>
    </div>
  );
}
