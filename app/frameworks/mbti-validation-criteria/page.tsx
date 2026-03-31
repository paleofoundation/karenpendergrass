import type { Metadata } from 'next';
import Link from 'next/link';
import { FrameworkSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Foundational MBTI Validation Criteria | Karen Pendergrass',
  description:
    'The Foundational MBTI Validation Criteria is a dual-validation framework for microbiome-targeted interventions (MBTIs) requiring microbiome signature alignment, clinical efficacy, and co-validation of both the intervention and the underlying microbial signature. Developed by Karen Pendergrass.',
  keywords: [
    'MBTI validation criteria',
    'microbiome-targeted interventions',
    'microbiome signature alignment',
    'dual validation framework',
    'microbiome medicine',
    'Karen Pendergrass',
  ],
};

export default function MBTIPage() {
  return (
    <div className="page-enter">
      <FrameworkSchema
        name="Foundational MBTI Validation Criteria"
        slug="mbti-validation-criteria"
        description="A dual-validation framework for microbiome-targeted interventions requiring microbiome signature alignment, clinical efficacy, and simultaneous co-validation of both the intervention and the underlying microbial signature."
        alternateName="MBTI Validation Framework"
      />

      <article className="max-w-3xl mx-auto px-6 pt-16 pb-20">
        <div className="mb-4 flex items-center gap-3">
          <Link
            href="/frameworks"
            className="text-xs text-ink-muted hover:text-accent transition-colors"
          >
            &larr; Frameworks
          </Link>
          <span className="text-ink-muted text-xs">/</span>
          <span
            className="text-xs font-semibold uppercase tracking-widest text-accent"
            style={{ letterSpacing: '0.1em' }}
          >
            Microbiome Medicine
          </span>
        </div>

        <h1
          className="text-3xl md:text-4xl font-medium text-ink leading-tight mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Foundational MBTI Validation Criteria
        </h1>
        <p
          className="text-lg text-ink-light mb-8"
          style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
        >
          A dual-validation framework for microbiome-targeted interventions
        </p>

        <div className="prose">
          <h2>The Problem</h2>

          <p>
            Microbiome research has generated an enormous body of literature
            documenting associations between microbial communities and disease
            states. Yet the translation of these findings into validated clinical
            interventions has been painfully slow. One reason is the absence of a
            structured validation methodology. Interventions are tested against
            clinical endpoints alone, without verifying whether they actually
            shift the microbiome in the predicted direction. Conversely,
            microbiome signatures are documented without testing whether
            correcting them produces clinical benefit. These two streams of
            evidence remain disconnected.
          </p>

          <h2>The Framework</h2>

          <p>
            The Foundational MBTI Validation Criteria addresses this gap by
            requiring that a validated Microbiome-Targeted Intervention (MBTI)
            satisfy three criteria simultaneously:
          </p>

          <p>
            <strong>1. Microbiome Signature Alignment.</strong> The intervention
            must modulate the microbiome by increasing taxa that are reduced in
            the condition's disease-specific signature and decreasing taxa that
            are elevated. This is not a generic "improves gut health" claim. It
            requires evidence that the intervention targets the specific taxa
            identified in the condition's microbiome signature.
          </p>

          <p>
            <strong>2. Clinical Efficacy.</strong> The intervention must
            demonstrate measurable improvements in clinical outcomes for the
            target condition. This can include symptom reduction, biomarker
            normalization, functional improvement, or other validated clinical
            endpoints.
          </p>

          <p>
            <strong>3. Dual Validation.</strong> When criteria 1 and 2 are both
            met, alignment simultaneously validates the intervention as a
            legitimate MBTI and confirms the accuracy and clinical relevance of
            the underlying microbiome signature. This co-validation is what
            distinguishes the framework from approaches that treat microbiome
            data as correlational curiosities.
          </p>

          <h2>Case Validation: Pomegranate Fruit Extract and Endometriosis</h2>

          <p>
            Pomegranate fruit extract (PFE) has been validated as an MBTI for{' '}
            <a
              href="https://microbiomemedicine.com/conditions/endometriosis/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent"
            >
              endometriosis
            </a>{' '}
            using this framework. PFE increases Lactobacillaceae
            and Bacteroidetes while reducing Ruminococcaceae, Prevotellaceae, and
            Burkholderiaceae, aligning with the endometriosis microbiome
            signature (Criterion 1). PFE suppresses endometriotic cell adhesion
            and migration via MMP-2/MMP-9 reduction and enhances antioxidant
            status (Criterion 2). The simultaneous satisfaction of both criteria
            confirms PFE as an MBTI and validates the endometriosis microbiome
            signature as clinically actionable (Criterion 3).
          </p>

          <h2>Why This Matters</h2>

          <p>
            Without a structured validation methodology, microbiome
            interventions will continue to be marketed on the basis of
            incomplete evidence, applied generically across conditions, and
            evaluated by clinical endpoints alone. The MBTI Validation Criteria
            provides a rigorous, reproducible standard that protects patients
            from ineffective interventions while accelerating the translation of
            genuine discoveries into clinical practice.
          </p>

          <p>
            The framework is applied across the{' '}
            <Link href="/publications" className="text-accent">
              Microbiome Signatures Database
            </Link>{' '}
            (
            <a
              href="https://microbiomemedicine.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent"
            >
              microbiomemedicine.com
            </a>
            ) and forms the methodological foundation for all intervention
            validation within Microbiome Medicine.
          </p>

          <h2>Related Work</h2>

          <p>
            The MBTI Validation Criteria is part of a broader research program
            that includes{' '}
            <Link href="/frameworks/major-microbial-associations">
              Major Microbial Associations (MMA)
            </Link>{' '}
            for formalizing disease-associated microbiome patterns,{' '}
            <Link href="/frameworks/microbial-metallomics">
              Microbial Metallomics
            </Link>{' '}
            for understanding trace metal influences on pathogenic selection, and{' '}
            <Link href="/frameworks/stop">
              STOP recommendations
            </Link>{' '}
            for identifying interventions that should be discontinued.
          </p>
        </div>
      </article>
    </div>
  );
}
