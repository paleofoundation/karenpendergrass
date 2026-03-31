import type { Metadata } from 'next';
import Link from 'next/link';
import { FrameworkSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Major Microbial Associations (MMA) | Karen Pendergrass',
  description:
    'Major Microbial Associations (MMAs) are formalized, disease-associated microbiome patterns documenting which taxa are consistently elevated or reduced in specific conditions. MMAs form the evidence base for the Microbiome Signatures Database and targeted intervention design. Developed by Karen Pendergrass.',
  keywords: [
    'Major Microbial Associations',
    'MMA',
    'microbiome signatures',
    'disease-associated microbiome',
    'microbiome patterns',
    'taxa associations',
    'Karen Pendergrass',
  ],
};

export default function MMAPage() {
  return (
    <div className="page-enter">
      <FrameworkSchema
        name="Major Microbial Associations (MMA)"
        slug="major-microbial-associations"
        description="Formalized disease-associated microbiome patterns documenting which microbial taxa are consistently elevated or reduced in specific conditions, forming the evidence base for targeted intervention design."
        alternateName="MMA"
      />

      <article className="max-w-3xl mx-auto px-6 pt-16 pb-20">
        <div className="mb-4 flex items-center gap-3">
          <Link href="/frameworks" className="text-xs text-ink-muted hover:text-accent transition-colors">&larr; Frameworks</Link>
          <span className="text-ink-muted text-xs">/</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent" style={{ letterSpacing: '0.1em' }}>Microbiome Medicine</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-medium text-ink leading-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Major Microbial Associations (MMA)
        </h1>
        <p className="text-lg text-ink-light mb-8" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
          Formalized disease-associated microbiome patterns
        </p>

        <div className="prose">
          <h2>Definition</h2>

          <p>
            A Major Microbial Association (MMA) is a documented, reproducible pattern of microbial taxa that are consistently elevated or reduced in a specific disease state compared to healthy controls. MMAs are derived from primary research literature and represent the consensus microbiome signature for a given condition. They are the foundational data layer of the{' '}
            <Link href="/publications" className="text-accent">
              Microbiome Signatures Database
            </Link>
            .
          </p>

          <h2>Why MMAs Are Necessary</h2>

          <p>
            Microbiome research generates an overwhelming volume of association data. Individual studies report dozens of taxa changes, often with conflicting results across cohorts, sequencing methods, and geographic populations. Without a formalization system, clinicians and researchers face an interpretive burden that effectively blocks translation. MMAs solve this by extracting the signal from the noise: which taxa are most consistently and significantly associated with each condition across the literature.
          </p>

          <h2>Structure</h2>

          <p>
            Each MMA entry documents the condition, the body site (gut, vaginal, oral, skin, etc.), the specific taxa (at the most precise taxonomic level supported by the evidence), the direction of change (elevated or reduced relative to healthy controls), the strength of the association (number of supporting studies, effect sizes where available), and the primary literature sources. MMAs are presented in a standardized two-column format showing body site and taxa, accompanied by paragraph-form interpretation.
          </p>

          <h2>Clinical Application</h2>

          <p>
            MMAs serve as the evidence base for designing microbiome-targeted interventions. If a condition's MMA shows reduced Lactobacillaceae and elevated Prevotellaceae, an intervention should be evaluated on its ability to reverse those specific patterns. This specificity is what the <Link href="/frameworks/mbti-validation-criteria">MBTI Validation Criteria</Link> requires: an intervention must align with the condition's MMA (Criterion 1: Microbiome Signature Alignment) and produce clinical improvement (Criterion 2: Clinical Efficacy) to be validated.
          </p>

          <h2>Relationship to Microbial Metallomics</h2>

          <p>
            MMAs gain additional explanatory power when combined with <Link href="/frameworks/microbial-metallomics">microbial metallomics</Link>. When a condition's MMA shows enrichment of taxa that are known nickel-dependent pathogens (for example, Helicobacter in gastric conditions), metallomics provides the mechanistic explanation for why those taxa are enriched and suggests metal-targeted therapeutic strategies that complement microbiome-targeted approaches.
          </p>

          <p>
            The full Microbiome Signatures Database, with MMAs for dozens of conditions, is available at <a href="https://microbiomemedicine.com" target="_blank" rel="noopener noreferrer">microbiomemedicine.com</a>.
          </p>
        </div>
      </article>
    </div>
  );
}
