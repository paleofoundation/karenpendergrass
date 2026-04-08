import type { Metadata } from 'next';
import Link from 'next/link';
import { FrameworkSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'STOP (Suggested Termination Of Practice)',
  description:
    'STOP is a named output class for recommending that specific medical interventions, treatments, or standard practices be discontinued based on emerging evidence that they are ineffective, harmful, or counterproductive. Developed by Karen Pendergrass.',
  keywords: [
    'STOP',
    'Suggested Termination Of Practice',
    'evidence-based discontinuation',
    'harmful interventions',
    'medical practice review',
    'Karen Pendergrass',
  ],
  alternates: {
    canonical: '/frameworks/stop',
  },
};

export default function STOPPage() {
  return (
    <div className="page-enter">
      <FrameworkSchema
        name="STOP (Suggested Termination Of Practice)"
        slug="stop"
        description="A named output class for recommending that specific medical interventions, treatments, or standard practices be discontinued based on emerging evidence that they are ineffective, harmful, or counterproductive."
        alternateName="Suggested Termination Of Practice"
      />

      <article className="max-w-3xl mx-auto px-6 pt-16 pb-20">
        <div className="mb-4 flex items-center gap-3">
          <Link href="/frameworks" className="text-xs text-ink-muted hover:text-accent transition-colors">&larr; Frameworks</Link>
          <span className="text-ink-muted text-xs">/</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent" style={{ letterSpacing: '0.1em' }}>Translational Medicine</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-medium text-ink leading-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          STOP (Suggested Termination Of Practice)
        </h1>
        <p className="text-lg text-ink-light mb-8" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
          Evidence-based recommendations to discontinue harmful interventions
        </p>

        <div className="prose">
          <h2>Definition</h2>

          <p>
            A Suggested Termination Of Practice (STOP) is a formal recommendation to discontinue a specific medical intervention, treatment, or standard practice based on emerging evidence suggesting it is ineffective, harmful, or counterproductive. STOPs are a named output class within the broader research program, providing a structured mechanism for science to say "stop doing this" when evidence warrants it.
          </p>

          <h2>Why STOPs Are Necessary</h2>

          <p>
            Medicine has a well-documented bias toward action. New interventions are adopted with enthusiasm, but ineffective or harmful ones are rarely formally retired. Practices persist through institutional inertia, commercial incentives, and the psychological difficulty of admitting that a treatment does not work or causes harm. The result is a clinical landscape where patients receive interventions that current evidence no longer supports, and where the accumulation of outdated practices crowds out better approaches.
          </p>

          <p>
            STOPs provide the opposite signal. They are not negative for the sake of being negative; they are necessary for the field to self-correct. A STOP acknowledges that evidence evolves and that what was once reasonable may no longer be defensible.
          </p>

          <h2>Criteria for Issuing a STOP</h2>

          <p>
            A STOP recommendation is issued when evidence meets one or more of the following conditions: the intervention has been shown to be ineffective for its stated purpose in well-designed studies; the intervention causes measurable harm that outweighs its benefits; the intervention is counterproductive, meaning it worsens the condition it purports to treat; or the theoretical basis for the intervention has been invalidated by subsequent research.
          </p>

          <h2>Application in Microbiome and Metallomics Research</h2>

          <p>
            STOPs are particularly relevant in microbiome science, where interventions based on incomplete understanding of microbial ecosystems can inadvertently feed pathogenic bacteria. For example,{' '}
            <Link
              href="/writing/nutritional-immunity-rethinking-iron-and-zinc-supplementation"
              className="text-accent"
            >
              nutritional immunity research
            </Link>{' '}
            demonstrates that iron and zinc supplementation during active infection may support pathogen growth rather than patient recovery, because pathogenic bacteria require these metals for virulence. A STOP on routine iron supplementation during certain infections would be based on this emerging metallomics evidence.
          </p>

          <p>
            Similarly,{' '}
            <Link href="/frameworks/microbial-metallomics" className="text-accent">
              microbial metallomics
            </Link>{' '}
            research has shown that some conventional practices inadvertently create environmental conditions that select for more dangerous pathogens. STOPs provide the formal mechanism for translating these findings into practice changes.
          </p>

          <h2>Relationship to Other Frameworks</h2>

          <p>
            STOPs complement the constructive frameworks in this research program. The{' '}
            <Link href="/frameworks/triangulation-method" className="text-accent">
              Microbiome Signature Triangulation Method
            </Link>{' '}
            structures upstream discovery;{' '}
            <Link href="/frameworks/mbti-validation-criteria" className="text-accent">
              MBTI Validation Criteria
            </Link>{' '}
            identify what to start doing;{' '}
            <Link href="/frameworks/major-microbial-associations" className="text-accent">
              Major Microbial Associations
            </Link>{' '}
            identify what the targets should be; and STOPs identify what to stop doing. Together, they form a complete translational toolkit: validate new interventions, formalize the evidence base, and retire practices that no longer serve patients.
          </p>
        </div>
      </article>
    </div>
  );
}
