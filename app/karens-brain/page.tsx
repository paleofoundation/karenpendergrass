import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Karen's Brain: Microbiome Signature Analysis System | Karen Pendergrass",
  description:
    "Karen's Brain is a codified reasoning system for discovering and validating interventions for human disease through microbiome and metallomic signature analysis. It encodes 15 years of methodology into an executable specification for research, clinical, and enterprise applications.",
  keywords: [
    "Karen's Brain",
    'microbiome signature analysis',
    'intervention discovery system',
    'microbiome AI',
    'microbiome reasoning engine',
    'metallomic analysis',
    'Karen Pendergrass',
  ],
  alternates: {
    canonical: '/karens-brain',
  },
};

export default function KarensBrainPage() {
  return (
    <div className="page-enter">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: "Karen's Brain",
            description:
              'A codified reasoning system for discovering and validating interventions for human disease through microbiome and metallomic signature analysis.',
            applicationCategory: 'HealthApplication',
            creator: {
              '@type': 'Person',
              name: 'Karen Pendergrass',
              url: 'https://karenpendergrass.com',
            },
            url: 'https://karenpendergrass.com/karens-brain',
          }),
        }}
      />

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-12">
        <p
          className="text-xs font-semibold uppercase tracking-widest text-accent mb-4"
          style={{ letterSpacing: '0.15em' }}
        >
          System
        </p>
        <h1
          className="text-3xl md:text-4xl font-medium text-ink leading-tight mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Karen's Brain
        </h1>
        <p className="text-lg text-ink-light leading-relaxed max-w-2xl mb-4">
          A codified reasoning system for discovering and validating interventions
          for human disease through microbiome and metallomic signature analysis.
        </p>
        <p className="text-ink-light leading-relaxed max-w-2xl">
          Karen's Brain is not a chatbot, a search engine, or a recommendation
          tool. It is the complete functional specification of a specific method
          for intervention discovery that has been developed and refined over 15
          years of practice. The system takes a microbiome signature as input,
          reasons through it using codified logic, generates intervention
          hypotheses, walks through validation, flags contradictions, and
          produces outputs structured for clinical or research use.
        </p>
      </section>

      {/* What it does */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <h2
          className="text-xl font-medium text-ink mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          What the system does
        </h2>
        <div className="flex flex-col gap-6">
          <div className="border-b border-ink/5 pb-5">
            <h3 className="font-medium text-ink mb-1">Ecosystem reconstruction</h3>
            <p className="text-sm text-ink-light leading-relaxed">
              Takes a disease condition's metallomic and microbiome signature as
              input and reconstructs the full causal ecology: which metals are
              selecting for which organisms, which virulence systems are active,
              what host defenses are engaged, and what functions have been lost.
            </p>
          </div>
          <div className="border-b border-ink/5 pb-5">
            <h3 className="font-medium text-ink mb-1">Vulnerability mapping</h3>
            <p className="text-sm text-ink-light leading-relaxed">
              Identifies the Achilles' heels of pathogenic taxa: metal
              dependencies, oxygen sensitivity, biofilm requirements, substrate
              needs, and ecological co-dependencies. These become intervention
              leverage points.
            </p>
          </div>
          <div className="border-b border-ink/5 pb-5">
            <h3 className="font-medium text-ink mb-1">Intervention prediction</h3>
            <p className="text-sm text-ink-light leading-relaxed">
              Generates specific, testable intervention hypotheses (dietary
              changes, probiotics, metabolic inhibitors, oxygenation strategies,
              metal restriction) before formal clinical trials exist. Predictions
              are then validated through literature triangulation.
            </p>
          </div>
          <div className="border-b border-ink/5 pb-5">
            <h3 className="font-medium text-ink mb-1">Triangulated validation</h3>
            <p className="text-sm text-ink-light leading-relaxed">
              Validates interventions through three independent checks: target
              validation (does it shift the right taxa?), clinical validation
              (does it improve outcomes?), and system coherence (does the
              mechanism explain both?). Any failure triggers model revision.
            </p>
          </div>
          <div className="border-b border-ink/5 pb-5">
            <h3 className="font-medium text-ink mb-1">STOP generation</h3>
            <p className="text-sm text-ink-light leading-relaxed">
              Identifies current clinical practices that are likely
              counterproductive based on the signature analysis and generates
              formal Suggested Termination Of Practice (STOP) recommendations.
            </p>
          </div>
          <div className="pb-5">
            <h3 className="font-medium text-ink mb-1">Self-falsification</h3>
            <p className="text-sm text-ink-light leading-relaxed">
              The system treats contradictions as evidence of model failure, not
              noise. Any prediction that fails forces revision of the underlying
              signature or intervention hypothesis. The system gets stronger with
              every contradiction it encounters.
            </p>
          </div>
        </div>
      </section>

      {/* The specification */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <h2
          className="text-xl font-medium text-ink mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          The specification
        </h2>
        <div className="prose">
          <p>
            The Karen's Brain Master Reference Specification (Version 1.0, March
            2026) is organized into seven parts: purpose and scope, foundational
            mindset and epistemic commitments, knowledge primitives (the
            reusable building blocks the system depends on), the reasoning
            pipeline as an executable sequence, validation logic including
            acceptance criteria and rejection rules, application architecture for
            the software system, and mapping to the existing
            microbiomemedicine.com platform.
          </p>
          <p>
            The specification serves two simultaneous purposes: guiding the
            ongoing development of microbiomemedicine.com as a structured
            knowledge platform, and providing the complete functional
            specification for an AI system that can execute the same reasoning
            process on new inputs.
          </p>
        </div>
      </section>

      {/* Underlying methodology */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <h2
          className="text-xl font-medium text-ink mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Underlying methodology
        </h2>
        <div className="flex flex-col gap-3">
          <Link href="/frameworks/triangulation-method" className="text-sm text-accent font-medium link-animate">
            Microbiome Signature Triangulation Method
          </Link>
          <Link href="/frameworks/mbti-validation-criteria" className="text-sm text-accent font-medium link-animate">
            Foundational MBTI Validation Criteria
          </Link>
          <Link href="/frameworks/microbial-metallomics" className="text-sm text-accent font-medium link-animate">
            Microbial Metallomics
          </Link>
          <Link href="/frameworks/major-microbial-associations" className="text-sm text-accent font-medium link-animate">
            Major Microbial Associations (MMA)
          </Link>
          <Link href="/frameworks/stop" className="text-sm text-accent font-medium link-animate">
            STOP (Suggested Termination Of Practice)
          </Link>
          <Link href="/frameworks/hmtc" className="text-sm text-accent font-medium link-animate">
            Heavy Metal Tested &amp; Certified (HMTc)
          </Link>
        </div>
      </section>

      {/* Applications and licensing */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <h2
          className="text-xl font-medium text-ink mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Applications
        </h2>
        <div className="flex flex-col gap-6">
          <div className="border-b border-ink/5 pb-5">
            <h3 className="font-medium text-ink mb-1">Pharmaceutical and biotech R&D</h3>
            <p className="text-sm text-ink-light leading-relaxed">
              Accelerate microbiome-targeted drug discovery by generating
              mechanistically grounded intervention hypotheses from existing
              signature data. Identify novel targets that conventional pipelines
              miss.
            </p>
          </div>
          <div className="border-b border-ink/5 pb-5">
            <h3 className="font-medium text-ink mb-1">Probiotic and supplement development</h3>
            <p className="text-sm text-ink-light leading-relaxed">
              Validate probiotic strain selection against disease-specific
              microbiome signatures. Identify which strains address which
              conditions through mechanistic alignment rather than generic
              claims.
            </p>
          </div>
          <div className="border-b border-ink/5 pb-5">
            <h3 className="font-medium text-ink mb-1">Clinical research organizations</h3>
            <p className="text-sm text-ink-light leading-relaxed">
              Design clinical trials informed by ecosystem-level analysis.
              Generate specific, testable hypotheses with defined validation
              criteria and built-in falsification checkpoints.
            </p>
          </div>
          <div className="pb-5">
            <h3 className="font-medium text-ink mb-1">Precision nutrition platforms</h3>
            <p className="text-sm text-ink-light leading-relaxed">
              Generate condition-specific dietary recommendations grounded in
              metallomic and microbiome signature analysis rather than generic
              nutritional guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="bg-ink rounded-lg p-8 text-center">
          <p
            className="text-xl font-medium text-paper mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Interested in Karen's Brain for your organization?
          </p>
          <p className="text-sm text-paper/70 mb-5 max-w-lg mx-auto">
            For licensing inquiries, research collaboration, or to discuss how
            the reasoning system can be applied to your specific domain, please
            get in touch.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-5 py-2.5 bg-paper text-ink text-sm font-medium rounded-md hover:bg-paper-warm transition-colors"
          >
            Inquire about licensing
          </Link>
        </div>
      </section>
    </div>
  );
}
