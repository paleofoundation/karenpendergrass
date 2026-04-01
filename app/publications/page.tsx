import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Publications | Karen Pendergrass',
  description:
    'Published research by Karen Pendergrass in microbiome medicine, microbial metallomics, food safety certification, and translational medicine. Includes journal articles, conference presentations, frameworks, and the Microbiome Medicine Journal.',
  keywords: [
    'Karen Pendergrass publications',
    'microbiome medicine journal',
    'microbial metallomics research',
    'microbiome signatures',
    'Parkinson disease metallomics',
    'endometriosis microbiome',
    'HMTc standards',
  ],
};

interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  doi?: string;
  url?: string;
  type: 'journal' | 'editorial' | 'roundtable' | 'conference' | 'framework' | 'database';
  description: string;
}

const publications: Publication[] = [
  {
    title:
      'Beyond \'Just Eat Real Food\': The Case for Prebiotic Fiber and Hydrocolloid Fortification in Modern Diets',
    authors: 'Pendergrass, K.',
    venue: 'Microbiome Diet Research, The Paleo Foundation',
    year: '2019',
    type: 'journal',
    description:
      'Research paper arguing that achieving recommended prebiotic fiber intake through whole foods alone is impractical for most Americans, and that hydrocolloid-fortified packaged foods offer a viable, evidence-based solution. Documented the nephroprotective, bifidogenic, and anti-diabetic properties of gum arabic, resistant maltodextrin, and other high-molecular-weight prebiotic fibers across 81 references.',
  },
  {
    title: 'From Dysbiosis to Dyshomeostasis: Why Parkinson\'s Requires a Metallomic-Microbiome Lens',
    authors: 'Pendergrass, K.',
    venue: 'Microbiome Medicine Journal, Volume I, Issue I',
    year: '2025',
    doi: '10.5281/zenodo.18068369',
    type: 'editorial',
    description: 'Editorial premise advancing a metallomic-microbiome framework in which metal dyshomeostasis, particularly iron mismanagement, initiates neuronal vulnerability and selects for pathogenic microbial ecologies in Parkinson\'s disease.',
  },
  {
    title: 'Microbial Metallomics and Parkinson\'s Disease: A Unified Metal-Driven Framework Linking Ferroptosis, Dysbiosis, and \u03B1-Synuclein Pathology',
    authors: 'Pendergrass, K.',
    venue: 'Microbiome Medicine Journal, Volume I, Issue I',
    year: '2025',
    doi: '10.5281/zenodo.17830083',
    type: 'journal',
    description: 'Unifying framework positioning heavy metal dyshomeostasis as the initiating event connecting ferroptosis, microbial virulence, neuroinflammation, and \u03B1-synuclein pathology in Parkinson\'s disease. Introduces environmental metal exposure as the upstream driver that selects for Gram-negative, metal-resistant gut pathobionts.',
  },
  {
    title: 'Pheomelanin, Eumelanin, and Neuromelanin: A Metal-Linked Hypothesis for Parkinson\'s Risk in Redheads',
    authors: 'Eyer, K., Pendergrass, K.',
    venue: 'Microbiome Medicine Roundtable, Volume I, Issue I',
    year: '2025',
    doi: '10.5281/zenodo.17976306',
    type: 'roundtable',
    description: 'Novel hypothesis proposing that MC1R loss-of-function variants alter neuromelanin composition toward pheomelanin dominance, reducing iron sequestration capacity and increasing ferroptosis susceptibility in dopaminergic neurons. Integrates pigmentation genetics with neural metallome regulation.',
  },
  {
    title: 'Melanotan Peptides as Potential Therapeutics in Parkinson\'s Disease',
    authors: 'Pendergrass, K., Eyer, K.',
    venue: 'Microbiome Medicine Roundtable, Volume I, Issue I',
    year: '2025',
    doi: '10.5281/zenodo.17996461',
    type: 'roundtable',
    description: 'Evaluates MC1R agonism (melanotan I/afamelanotide and melanotan II) as a metallomics-informed therapeutic strategy. Proposes that MC1R activation biases pigment chemistry toward eumelanin, expanding metal sequestration capacity and reducing iron-driven ferroptosis in dopaminergic neurons.',
  },
  {
    title: 'The Microbiome Medicine Roundtable Method: From Mechanism to Testable Intervention',
    authors: 'Pendergrass, K.',
    venue: 'Microbiome Medicine Journal, Volume I, Issue I',
    year: '2025',
    doi: '10.5281/zenodo.18069485',
    type: 'journal',
    description: 'Formal description of the Microbiome Medicine Roundtable as a structured, mechanism-first synthesis method for converting fragmented biomedical observations into coherent disease models and translational hypotheses.',
  },
  {
    title: 'The Microbiome Signature of Endometriosis: From Dysbiosis to Metallomics to Targeted Interventions',
    authors: 'Pendergrass, K.',
    venue: '11th Beneficial Microbes Conference, Amsterdam',
    year: '2025',
    type: 'conference',
    description: 'Live demonstration of the Microbiome Signature Triangulation Method applied to endometriosis. Walked through metallomic signature analysis, microbial functional profiling, intervention prediction, and a STOP analysis challenging routine iron and zinc supplementation.',
  },
  {
    title: 'Microbial Metallomics: The Missing Link in Understanding Heavy Metal Contamination and Pathogenic Selection',
    authors: 'Pendergrass, K.',
    venue: 'karenpendergrass.com',
    year: '2026',
    url: '/writing/microbial-metallomics-and-heavy-metal-contamination',
    type: 'journal',
    description: 'Comprehensive review introducing microbial metallomics as a framework connecting environmental heavy metal contamination to pathogenic selection pressure, examining how bacteria acquire, transport, and utilize trace metals to drive virulence and antibiotic resistance.',
  },
];

const databases: { name: string; url: string; description: string }[] = [
  {
    name: 'Microbiome Signatures Database',
    url: 'https://microbiomemedicine.com',
    description: 'Clinician-facing database formalizing disease-associated microbiome patterns through Major Microbial Associations (MMAs). Condition pages include validated interventions, promising candidates, STOP recommendations, and research gaps for endometriosis, Parkinson\'s disease, chronic kidney disease, and additional conditions in development.',
  },
  {
    name: 'Heavy Metal Tested & Certified (HMTc) Standards Library',
    url: 'https://heavymetaltested.com',
    description: 'Eight per-metal standards documents (Pb, As, Hg, Cd, Cr, Ni, Sn, Al) with category-specific contaminant limits, ALARA-based principles, lot testing schedules, governance policies, and anti-circumvention language for food, supplements, cosmetics, and consumer products.',
  },
];

const typeLabels: Record<string, string> = {
  journal: 'Journal Article',
  editorial: 'Editorial',
  roundtable: 'Roundtable Paper',
  conference: 'Conference Presentation',
  framework: 'Framework',
  database: 'Database',
};

const typeColors: Record<string, string> = {
  journal: 'text-accent',
  editorial: 'text-sage-dark',
  roundtable: 'text-ink-light',
  conference: 'text-accent-dark',
  framework: 'text-sage',
  database: 'text-ink-muted',
};

export default function PublicationsPage() {
  return (
    <div className="page-enter max-w-3xl mx-auto px-6 pt-16 pb-20">
      <SectionHeader
        label="Publications"
        title="Published research"
        description="Journal articles, conference presentations, roundtable papers, and structured databases in microbiome medicine, microbial metallomics, and food safety certification."
      />
      <p className="text-sm text-ink-muted mb-8">
        ORCID:{' '}
        <a
          href="https://orcid.org/0000-0002-2348-7259"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent font-mono text-xs link-animate"
        >
          0000-0002-2348-7259 ↗
        </a>
      </p>

      {/* Publications list */}
      <section className="mb-16">
        <div className="flex flex-col gap-10">
          {publications.map((pub) => (
            <article key={pub.title} className="border-b border-ink/5 pb-8 last:border-b-0">
              <p
                className={`text-xs font-semibold uppercase tracking-widest mb-2 ${typeColors[pub.type]}`}
                style={{ letterSpacing: '0.1em' }}
              >
                {typeLabels[pub.type]} &middot; {pub.year}
              </p>
              <h3
                className="text-lg font-medium text-ink mb-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {pub.title}
              </h3>
              <p className="text-sm text-ink-muted mb-2">{pub.authors}. <em>{pub.venue}</em>.</p>
              <p className="text-sm text-ink-light leading-relaxed mb-3">{pub.description}</p>
              <div className="flex flex-wrap gap-4">
                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent font-medium link-animate"
                  >
                    doi:{pub.doi} ↗
                  </a>
                )}
                {pub.url && (
                  <Link href={pub.url} className="text-xs text-accent font-medium link-animate">
                    Read on this site
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Databases & Standards */}
      <section className="mb-16">
        <h2
          className="text-xl font-medium text-ink mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Databases &amp; standards
        </h2>
        <div className="flex flex-col gap-8">
          {databases.map((db) => (
            <div key={db.name} className="border-b border-ink/5 pb-6 last:border-b-0">
              <h3
                className="text-lg font-medium text-ink mb-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {db.name}
              </h3>
              <p className="text-sm text-ink-light leading-relaxed mb-2">{db.description}</p>
              <a
                href={db.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent font-medium link-animate"
              >
                {db.url.replace('https://', '')} ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Frameworks link */}
      <section className="bg-paper-warm rounded-lg border border-ink/5 p-6">
        <h3
          className="font-medium text-ink mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Research frameworks
        </h3>
        <p className="text-sm text-ink-light leading-relaxed mb-3">
          For detailed descriptions of the methodologies behind this research,
          including the Microbiome Signature Triangulation Method, MBTI Validation
          Criteria, Microbial Metallomics, Major Microbial Associations, STOP
          recommendations, and HMTc certification standards, see the dedicated
          frameworks section.
        </p>
        <Link href="/frameworks" className="text-sm text-accent font-medium link-animate">
          View all frameworks
        </Link>
      </section>
    </div>
  );
}
