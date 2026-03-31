import type { Metadata } from 'next';
import Link from 'next/link';
import { FrameworkSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Microbial Metallomics | Karen Pendergrass',
  description:
    'Microbial metallomics is a research framework integrating trace metal analysis into microbiome science. It examines how bacteria acquire, transport, and utilize metals like nickel, zinc, iron, and cadmium, and how environmental contamination selects for virulent pathogens. Developed by Karen Pendergrass.',
  keywords: [
    'microbial metallomics',
    'trace metal analysis',
    'nickel pathogenesis',
    'heavy metal microbiome',
    'metal-dependent virulence',
    'nickel-dependent enzymes',
    'pathogenic selection pressure',
    'Karen Pendergrass',
  ],
};

export default function MicrobialMetallomicsPage() {
  return (
    <div className="page-enter">
      <FrameworkSchema
        name="Microbial Metallomics"
        slug="microbial-metallomics"
        description="A research framework integrating trace metal analysis into microbiome science, examining how bacteria acquire, transport, and utilize metals and how environmental contamination selects for virulent, antibiotic-resistant pathogens."
      />

      <article className="max-w-3xl mx-auto px-6 pt-16 pb-20">
        <div className="mb-4 flex items-center gap-3">
          <Link href="/frameworks" className="text-xs text-ink-muted hover:text-accent transition-colors">&larr; Frameworks</Link>
          <span className="text-ink-muted text-xs">/</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-accent" style={{ letterSpacing: '0.1em' }}>Research</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-medium text-ink leading-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Microbial Metallomics
        </h1>
        <p className="text-lg text-ink-light mb-8" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
          How trace metals shape pathogenic bacteria and drive disease
        </p>

        <div className="prose">
          <h2>Definition</h2>

          <p>
            Microbial metallomics is the study of the complete set of metal ions and their interactions with biological molecules within microbial systems. It integrates metallurgy, biochemistry, genomics, and environmental science to examine how bacteria acquire, transport, store, utilize, and detoxify trace metals. Unlike traditional toxicology, which focuses on individual metals in isolation, microbial metallomics examines dynamic, integrated networks through which organisms interact with their metallic environment.
          </p>

          <h2>The Central Insight</h2>

          <p>
            The core contribution of microbial metallomics is connecting two previously separate observations: environmental heavy metal contamination consistently selects for pathogenic, antibiotic-resistant bacteria, and pathogenic bacteria depend on specific metals for their most critical virulence factors. These are not coincidental associations. They represent a mechanistic pathway from environmental exposure to human disease.
          </p>

          <h2>Nickel as a Case Study</h2>

          <p>
            Nickel occupies a unique position in pathogenic microbiology. It is essential for some of the most important bacterial virulence factors yet is not required by human host cells. Pathogenic bacteria rely on nickel for three primary enzyme systems: urease (which enables Helicobacter pylori to survive stomach acid), [NiFe]-hydrogenase (which provides alternative energy sources in anaerobic environments), and glyoxalase I (which protects against metabolic stress). Multiple WHO priority pathogens, including Salmonella enterica, Campylobacter jejuni, and Helicobacter pylori, critically depend on nickel-dependent enzymes for virulence.
          </p>

          <p>
            This nickel dependency creates a therapeutic vulnerability that conventional antimicrobial approaches completely miss. By targeting nickel acquisition systems rather than the bacteria directly, it may be possible to disarm pathogens without the selective pressure that drives antibiotic resistance.
          </p>

          <h2>Environmental Selection Pressure</h2>

          <p>
            Environmental contamination with heavy metals fundamentally alters microbial community structure. Landfill leachate, mining sites, and industrial zones serve as evolutionary crucibles where metal-tolerant, virulence-gene-enriched bacteria are selected. The relationship between heavy metal contamination and antimicrobial resistance is particularly significant: bacteria that survive heavy metal stress by upregulating efflux pump systems simultaneously acquire resistance to antibiotics pumped out by the same transporters. This co-selection means resistance proliferates in metal-contaminated environments regardless of antibiotic use.
          </p>

          <h2>Implications for Endometriosis</h2>

          <p>
            Microbial metallomics has yielded novel hypotheses for conditions including{' '}
            <a
              href="https://microbiomemedicine.com/conditions/endometriosis/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent"
            >
              endometriosis
            </a>
            , where nickel-dependent pathogenic enzymes may interact with the disease-specific microbiome signature to contribute to disease persistence. The metallomic framework explains why certain bacteria are enriched in endometriotic tissue and how metal-mediated virulence mechanisms may drive chronic inflammation and immune evasion.
          </p>

          <h2>Connection to Other Frameworks</h2>

          <p>
            Microbial metallomics provides the mechanistic underpinning for several related frameworks. It explains why <Link href="/frameworks/hmtc">HMTc certification</Link> matters beyond simple toxicology: the metals being measured are shaping microbial communities in consumers. It informs the <Link href="/frameworks/mbti-validation-criteria">MBTI Validation Criteria</Link> by identifying metal-dependent pathways that interventions must address. And it generates <Link href="/frameworks/stop">STOP recommendations</Link> when metal supplementation practices inadvertently feed pathogenic bacteria.
          </p>

          <p>
            The{' '}
            <Link href="/ventures" className="text-accent">
              Journal of Food Metallomics
            </Link>{' '}
            (
            <a
              href="https://microbialmetallomics.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent"
            >
              microbialmetallomics.com
            </a>
            ) publishes ongoing research in this field.
          </p>
        </div>
      </article>
    </div>
  );
}
