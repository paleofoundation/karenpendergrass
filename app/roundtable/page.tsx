import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Microbiome Medicine Roundtable | Karen Pendergrass',
  description:
    'The Microbiome Medicine Roundtable is a structured, mechanism-first synthesis service that converts fragmented biomedical observations into coherent disease models, risk stratification frameworks, and novel intervention candidates. Each Roundtable produces a published journal issue.',
  keywords: [
    'Microbiome Medicine Roundtable',
    'microbiome consulting',
    'disease model development',
    'intervention discovery',
    'translational medicine',
    'microbial metallomics',
    'Karen Pendergrass',
  ],
};

const deliverables = [
  {
    title: 'Unified mechanistic framework',
    description: 'A published paper positioning the upstream drivers of the target condition, integrating metallomics, microbiology, immunology, and clinical data into a single falsifiable model.',
  },
  {
    title: 'Risk stratification model',
    description: 'A mechanistic risk stratification framework identifying which patient subpopulations are most vulnerable and why, with testable biomarker predictions.',
  },
  {
    title: 'Novel intervention candidates',
    description: 'One or more intervention hypotheses generated directly from the mechanistic framework, with defined translational endpoints for preclinical and clinical evaluation.',
  },
  {
    title: 'Roundtable methodology paper',
    description: 'A published commentary documenting the reasoning process, making the intellectual chain of custody transparent and reproducible.',
  },
  {
    title: 'Published journal issue',
    description: 'All outputs compiled into a print-ready edition of the Microbiome Medicine Journal with DOIs registered through Zenodo, suitable for citation and institutional use.',
  },
];

export default function RoundtablePage() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12">
        <p
          className="text-xs font-semibold uppercase tracking-widest text-accent mb-4"
          style={{ letterSpacing: '0.15em' }}
        >
          Service
        </p>
        <h1
          className="text-3xl md:text-4xl font-medium text-ink leading-tight mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          The Microbiome Medicine Roundtable
        </h1>
        <p className="text-lg text-ink-light leading-relaxed max-w-2xl mb-4">
          A structured, mechanism-first synthesis process that takes a disease
          area and produces a unified framework, risk stratification model, and
          novel intervention candidates, published as a peer-reviewable journal
          issue with DOIs.
        </p>
        <p className="text-ink-light leading-relaxed max-w-2xl">
          The Roundtable is not a literature review, a consensus panel, or a
          brainstorming session. It is a formalized reasoning process that
          enforces mechanistic discipline, cross-domain integration, and
          explicit causal sequencing. Every conceptual advance must generate
          testable predictions. Speculative ideas are allowed only insofar as
          they remain biologically constrained and falsifiable.
        </p>
      </section>

      {/* Proof: Parkinson's Edition */}
      <section className="max-w-3xl mx-auto px-6 pb-14">
        <div className="bg-paper-warm rounded-lg border border-ink/5 p-6 md:p-8">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-accent mb-3"
            style={{ letterSpacing: '0.1em' }}
          >
            Case study: Volume I, Issue I
          </p>
          <h2
            className="text-xl font-medium text-ink mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Parkinson's Disease Edition
          </h2>
          <p className="text-sm text-ink-light leading-relaxed mb-4">
            The inaugural Microbiome Medicine Roundtable focused on Parkinson's
            disease. Two participants (Karen Pendergrass and Kimberly Eyer)
            worked through a series of structured discussions that produced
            five interlinked papers, a novel unifying framework, and a
            therapeutic hypothesis that had never been proposed before.
          </p>
          <div className="flex flex-col gap-3 mb-5">
            <div className="flex gap-3">
              <span className="text-xs text-ink-muted shrink-0 w-24 pt-0.5">Framework</span>
              <p className="text-sm text-ink-light">A unified metal-driven model linking ferroptosis, dysbiosis, and α-synuclein pathology, positioning heavy metal dyshomeostasis as the initiating event.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-xs text-ink-muted shrink-0 w-24 pt-0.5">Risk model</span>
              <p className="text-sm text-ink-light">A pigmentation-based susceptibility hypothesis connecting MC1R genetics, neuromelanin composition, and iron sequestration capacity to differential PD risk.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-xs text-ink-muted shrink-0 w-24 pt-0.5">Intervention</span>
              <p className="text-sm text-ink-light">Melanotan peptides as MC1R agonists to bias neuromelanin toward eumelanin, enhance metal sequestration, and reduce ferroptosis susceptibility. First time proposed in literature.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-xs text-ink-muted shrink-0 w-24 pt-0.5">Output</span>
              <p className="text-sm text-ink-light">Five papers with DOIs published in the Microbiome Medicine Journal, Volume I, Issue I. Print-ready journal edition produced.</p>
            </div>
          </div>
          <Link
            href="/publications"
            className="text-sm text-accent font-medium link-animate"
          >
            View all publications from this Roundtable
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-3xl mx-auto px-6 pb-14">
        <h2
          className="text-xl font-medium text-ink mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          How the Roundtable works
        </h2>
        <div className="prose">
          <p>
            A Roundtable engagement begins with a target condition or disease
            area selected by the commissioning organization. The Roundtable
            team (led by Karen Pendergrass, with domain-specific collaborators
            drawn from the Microbiome Medicine network) executes a structured
            reasoning process over a defined period.
          </p>
          <p>
            The process follows the{' '}
            <Link href="/frameworks/triangulation-method">
              Microbiome Signature Triangulation Method
            </Link>
            : metallomic analysis first, then microbial functional profiling,
            ecosystem reconstruction, vulnerability mapping, intervention
            hypothesis generation, and evidence triangulation. Every step
            produces a documented output. Contradictions trigger model revision,
            not dismissal.
          </p>
          <p>
            The final deliverable is not a slide deck or a consulting report.
            It is a set of published, citable papers with DOIs, compiled into a
            journal edition. This means the commissioning organization receives
            not just strategic insight but publishable intellectual property
            that their scientific advisory board, investors, and regulatory
            teams can reference.
          </p>
        </div>
      </section>

      {/* Deliverables */}
      <section className="max-w-3xl mx-auto px-6 pb-14">
        <h2
          className="text-xl font-medium text-ink mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          What you receive
        </h2>
        <div className="flex flex-col gap-6">
          {deliverables.map((d) => (
            <div key={d.title} className="border-b border-ink/5 pb-5 last:border-b-0">
              <h3 className="font-medium text-ink mb-1">{d.title}</h3>
              <p className="text-sm text-ink-light leading-relaxed">{d.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who this is for */}
      <section className="max-w-3xl mx-auto px-6 pb-14">
        <h2
          className="text-xl font-medium text-ink mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Who commissions a Roundtable
        </h2>
        <div className="prose">
          <p>
            <strong>Pharmaceutical and biotech companies</strong> seeking to
            understand the microbiome dimension of their therapeutic area, identify
            novel targets, or evaluate pipeline candidates against ecological models.
          </p>
          <p>
            <strong>Clinical research organizations</strong> designing
            microbiome-informed trial protocols or needing mechanistic frameworks
            to guide biomarker selection and endpoint design.
          </p>
          <p>
            <strong>Foundations and nonprofits</strong> funding disease research
            who want a unified framework to guide grant allocation and identify
            the highest-leverage research gaps.
          </p>
          <p>
            <strong>Investor groups</strong> evaluating microbiome-adjacent
            companies who need independent mechanistic analysis of whether a
            company's approach is ecologically coherent.
          </p>
        </div>
      </section>

      {/* Pricing signal */}
      <section className="max-w-3xl mx-auto px-6 pb-14">
        <div className="bg-white rounded-lg border border-ink/5 p-6 md:p-8">
          <h2
            className="text-xl font-medium text-ink mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Engagement structure
          </h2>
          <p className="text-sm text-ink-light leading-relaxed mb-4">
            Each Roundtable is scoped to a single condition or disease area.
            Engagement duration is typically 8 to 12 weeks. Pricing is based on
            scope, complexity, and the number of collaborators required.
            Roundtable engagements start at $75,000.
          </p>
          <p className="text-sm text-ink-light leading-relaxed mb-5">
            All engagements begin with a complimentary 30-minute scoping call to
            determine fit, define the condition focus, and establish deliverable
            expectations.
          </p>
          <Link
            href="/advisory#intake"
            className="inline-flex items-center px-5 py-2.5 bg-ink text-paper text-sm font-medium rounded-md hover:bg-ink-light transition-colors"
          >
            Schedule a scoping call
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="bg-ink rounded-lg p-8 text-center">
          <p
            className="text-xl font-medium text-paper mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ready to commission a Roundtable?
          </p>
          <p className="text-sm text-paper/70 mb-5 max-w-lg mx-auto">
            The next available Roundtable slot opens on a rolling basis.
            If your organization works at the intersection of microbiome
            science, metallomics, or translational medicine, I want to hear
            from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/advisory#intake"
              className="inline-flex items-center justify-center px-6 py-3 bg-paper text-ink text-sm font-medium rounded-md hover:bg-paper-warm transition-colors"
            >
              Start the conversation
            </Link>
            <Link
              href="/publications"
              className="inline-flex items-center justify-center px-6 py-3 border border-paper/20 text-paper text-sm font-medium rounded-md hover:bg-paper/10 transition-colors"
            >
              See the Parkinson's edition
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
