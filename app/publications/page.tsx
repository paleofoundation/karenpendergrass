import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Complete publication list for Karen Pendergrass: 20+ papers spanning microbiome medicine, microbial metallomics, food metallomics, heavy metal certification, ketogenic diet research, and translational veterinary medicine.',
  keywords: [
    'Karen Pendergrass publications',
    'microbiome medicine journal',
    'microbial metallomics research',
    'food metallomics',
    'HMTc standards',
    'heavy metal certification',
    'ketogenic diet research',
    'microbiome signatures',
  ],
  alternates: {
    canonical: '/publications',
  },
};

interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  doi?: string;
  url?: string;
  type: 'journal' | 'editorial' | 'roundtable' | 'conference' | 'whitepaper' | 'database';
  description: string;
}

const publications: Publication[] = [
  // 2026
  {
    title: 'The Counterproductive Consequences of Public Exposé Testing: How Unstructured Disclosure Undermines Heavy Metal Contamination Reduction',
    authors: 'Pendergrass, K.',
    venue: 'Journal of Food Metallomics',
    year: '2026',
    doi: '10.5281/zenodo.19470572',
    type: 'journal',
    description: 'Argues that unstructured public exposé testing of consumer products for heavy metals is systematically counterproductive. Drawing on compliance theory, game theory, chilling-effects research, and regulatory science, demonstrates that public gotcha testing suppresses industry transparency, impedes data sharing, concentrates reputational damage on brands that may be the cleanest in their category, and provides litigation scaffolding while failing to address upstream supply chain contamination.',
  },
  {
    title: 'Certification as a Framework for Reducing Heavy Metal Exposure in Infant and Child Foods: Integrating Legal Defensibility, Scientific Rigor, and Commercial Viability',
    authors: 'Pendergrass, K.',
    venue: 'Zenodo',
    year: '2026',
    doi: '10.5281/zenodo.18905821',
    type: 'journal',
    description: 'Framework for third-party heavy metal certification in infant and child foods, integrating ALARA principles, legal defensibility under Proposition 65 and FDA Closer to Zero, and commercial viability for food manufacturers.',
  },
  {
    title: 'The Cost of Operating Without Credible Third-Party Heavy-Metal Certification',
    authors: 'Pendergrass, K.',
    venue: 'Journal of Food Metallomics',
    year: '2026',
    doi: '10.5281/zenodo.18903738',
    type: 'whitepaper',
    description: 'Analysis of the economic, regulatory, and reputational costs facing food companies that lack credible third-party heavy metal testing. Covers Proposition 65 litigation, MDL 3101, NSF/ANSI 173, recall economics, and California AB 899.',
  },
  {
    title: 'Heavy Metals in Fertilizers: A Historical Analysis of Contamination Trends (1960\u20132025)',
    authors: 'Pendergrass, K.',
    venue: 'Zenodo',
    year: '2026',
    doi: '10.5281/zenodo.18439158',
    type: 'journal',
    description: 'Historical analysis tracing heavy metal contamination in nitrogenous and phosphatic fertilizers from 1960 to 2025. Examines nickel, cadmium, and lead accumulation in agricultural soils and the implications for food safety and environmental remediation.',
  },
  {
    title: 'Heavy Metals, Microbial Metallomics, and the US Obesity Epidemic: A Mechanistic Examination of a Population-Level Metabolic Disruption',
    authors: 'Pendergrass, K.',
    venue: 'Zenodo',
    year: '2026',
    doi: '10.5281/zenodo.18434951',
    type: 'journal',
    description: 'Proposes that the US obesity epidemic traces to heavy metal contamination from agricultural fertilizers driving metabolic disruption through microbial metallomics pathways, affecting all species in proximity to the modern food system including lab rats and pets.',
  },
  {
    title: 'Age-Window Metabolic and Toxicokinetic Vulnerability in Vegetable-Based Baby Foods: Separating Developmental Readiness from Toxicant Susceptibility',
    authors: 'Pendergrass, K.',
    venue: 'Zenodo',
    year: '2026',
    doi: '10.5281/zenodo.18366816',
    type: 'journal',
    description: 'Examines age-specific metabolic and toxicokinetic vulnerabilities in infants consuming vegetable-based baby foods, distinguishing developmental readiness for solid food introduction from susceptibility to heavy metal toxicants.',
  },
  {
    title: 'Nickel as a Catalytic Driver of Necrotizing Enterocolitis: Dietary Nickel, Microbial Metallomics, and the Activation of Nickel-Dependent Virulence Pathways in the Preterm Gut',
    authors: 'Pendergrass, K.',
    venue: 'Zenodo',
    year: '2026',
    doi: '10.5281/zenodo.18200348',
    type: 'journal',
    description: 'Proposes dietary nickel as a catalytic driver of necrotizing enterocolitis in preterm infants through activation of nickel-dependent virulence factors (urease, [NiFe]-hydrogenase, glyoxalase I) in pathogenic Escherichia coli, framed through nutritional immunity and microbial metallomics.',
  },
  // 2025 - Microbiome Medicine Journal V1
  {
    title: 'From Dysbiosis to Dyshomeostasis: Why Parkinson\u2019s Requires a Metallomic\u2013Microbiome Lens',
    authors: 'Pendergrass, K.',
    venue: 'Microbiome Medicine Journal, Volume I, Issue I',
    year: '2025',
    doi: '10.5281/zenodo.18068369',
    type: 'editorial',
    description: 'Editorial premise advancing a metallomic\u2013microbiome framework in which metal dyshomeostasis, particularly iron mismanagement, initiates neuronal vulnerability and selects for pathogenic microbial ecologies in Parkinson\u2019s disease.',
  },
  {
    title: 'Microbial Metallomics and Parkinson\u2019s Disease: A Unified Metal-Driven Framework Linking Ferroptosis, Dysbiosis, and \u03B1-Synuclein Pathology',
    authors: 'Pendergrass, K.',
    venue: 'Microbiome Medicine Journal, Volume I, Issue I',
    year: '2025',
    doi: '10.5281/zenodo.17830082',
    type: 'journal',
    description: 'Unifying framework positioning heavy metal dyshomeostasis as the initiating event connecting ferroptosis, microbial virulence, neuroinflammation, and \u03B1-synuclein pathology in Parkinson\u2019s disease.',
  },
  {
    title: 'Pheomelanin, Eumelanin, and Neuromelanin: A Metal-Linked Hypothesis for Parkinson\u2019s Risk in Redheads',
    authors: 'Eyer, K., Pendergrass, K.',
    venue: 'Microbiome Medicine Roundtable, Volume I, Issue I',
    year: '2025',
    doi: '10.5281/zenodo.17976306',
    type: 'roundtable',
    description: 'Novel hypothesis proposing that MC1R loss-of-function variants alter neuromelanin composition toward pheomelanin dominance, reducing iron sequestration capacity and increasing ferroptosis susceptibility in dopaminergic neurons.',
  },
  {
    title: 'Melanotan Peptides as Potential Therapeutics in Parkinson\u2019s Disease',
    authors: 'Pendergrass, K., Eyer, K.',
    venue: 'Microbiome Medicine Roundtable, Volume I, Issue I',
    year: '2025',
    doi: '10.5281/zenodo.17996461',
    type: 'roundtable',
    description: 'Evaluates MC1R agonism (melanotan I/afamelanotide and melanotan II) as a metallomics-informed therapeutic strategy for Parkinson\u2019s disease, proposing that MC1R activation biases pigment chemistry toward eumelanin and reduces iron-driven ferroptosis.',
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
    title: 'Itraconazole and Lactoferrin for FIP-Associated Gingivitis in Cats: A Perspective',
    authors: 'Pendergrass, K.',
    venue: 'Zenodo',
    year: '2025',
    doi: '10.5281/zenodo.18085985',
    type: 'journal',
    description: 'Proposes itraconazole and lactoferrin as a combined intervention for FIP-associated gingivitis in cats, addressing polymicrobial biofilms involving Porphyromonas gingivalis and Candida albicans through drug repurposing, nutritional immunity, and microbial metallomics.',
  },
  {
    title: 'Microbiome Signature of Endometriosis',
    authors: 'Pendergrass, K., Aristotelous, G., Aleru, D., Eyer, K.',
    venue: 'Microbiome Medicine',
    year: '2025',
    type: 'database',
    description: 'Comprehensive condition page formalizing the microbiome signature of endometriosis with Major Microbial Associations, validated and promising interventions (HBOT, low-nickel diet, metronidazole), and STOP recommendations.',
    url: 'https://microbiomemedicine.com/conditions/endometriosis/',
  },
  {
    title: 'The Microbiome Signature of Chronic Kidney Disease (CKD)',
    authors: 'Pendergrass, K.',
    venue: 'Microbiome Medicine',
    year: '2025',
    type: 'database',
    description: 'Condition page documenting the microbiome signature of chronic kidney disease, including differentially abundant taxa, intervention candidates, and the role of site-specific prebiotic fibers in CKD management.',
    url: 'https://microbiomemedicine.com',
  },
  // Conference
  {
    title: 'The Microbiome Signature of Endometriosis: From Dysbiosis to Metallomics to Targeted Interventions',
    authors: 'Pendergrass, K.',
    venue: '11th Beneficial Microbes Conference, Amsterdam',
    year: '2025',
    type: 'conference',
    description: 'Live demonstration of the Microbiome Signature Triangulation Method applied to endometriosis before an audience of 150 researchers. Included metallomic signature analysis, microbial functional profiling, and a STOP analysis challenging routine iron and zinc supplementation.',
  },
  // 2021
  {
    title: 'Methods for Quantifying Net Carbohydrates in Food Products: A Critical Analysis of Glycemic Index-Based Keto Claims',
    authors: 'Pendergrass, K.',
    venue: 'Zenodo',
    year: '2021',
    doi: '10.5281/zenodo.18428893',
    type: 'journal',
    description: 'Critical analysis of methods for quantifying net carbohydrates in food products, evaluating the validity of glycemic index-based keto claims using HPAEC-PAD analytical chemistry and carbohydrate quantification methods.',
  },
  {
    title: 'High Variability in Glycemic Index Values Leads to Low Clinical and Practical Utility',
    authors: 'Pendergrass, K.',
    venue: 'Evidence-Based Keto Diet Research',
    year: '2021',
    type: 'journal',
    description: 'Demonstrates that high variability in published glycemic index values undermines their clinical and practical utility for ketogenic diet certification and consumer guidance.',
  },
  // 2020
  {
    title: 'A Review of Net Carbohydrates and Their Quantification',
    authors: 'Pendergrass, K.',
    venue: 'Ketogenic Diet Research',
    year: '2020',
    type: 'journal',
    description: 'Comprehensive review of net carbohydrate definitions, quantification methods, and regulatory implications for ketogenic diet product certification.',
  },
  {
    title: 'Ketogenic Diet Randomized Controlled Trials (RCTs): Systematic Review',
    authors: 'Pendergrass, K.',
    venue: 'Ketogenic Diet Research',
    year: '2020',
    type: 'journal',
    description: 'Systematic review of randomized controlled trials evaluating the ketogenic diet, conducted to establish the evidence base for keto certification standards at the Paleo Foundation.',
  },
  // 2019
  {
    title: "Beyond 'Just Eat Real Food': The Case for Prebiotic Fiber and Hydrocolloid Fortification in Modern Diets",
    authors: 'Pendergrass, K.',
    venue: 'Microbiome Diet Research, The Paleo Foundation',
    year: '2019',
    type: 'journal',
    description: 'Research paper with 81 references arguing that achieving recommended prebiotic fiber intake through whole foods alone is impractical, and that hydrocolloid-fortified packaged foods offer a viable, evidence-based solution. Documented the nephroprotective, bifidogenic, and anti-diabetic properties of gum arabic, resistant maltodextrin, and other high-MW prebiotic fibers.',
  },
  {
    title: 'Absorption, Metabolism, Excretion, and Health Outcomes of Various Sugar Alcohols',
    authors: 'Pendergrass, K.',
    venue: 'Ketogenic Diet Research',
    year: '2019',
    type: 'journal',
    description: 'Review of the absorption, metabolism, excretion pathways, and health outcomes of sugar alcohols used in ketogenic and low-carbohydrate food products, conducted to inform certification standards.',
  },
];

const databases: { name: string; url: string; description: string }[] = [
  {
    name: 'Microbiome Signatures Database',
    url: 'https://microbiomemedicine.com',
    description: 'Clinician-facing database formalizing disease-associated microbiome patterns through Major Microbial Associations (MMAs). Condition pages include validated interventions, promising candidates, STOP recommendations, and research gaps for endometriosis, Parkinson\u2019s disease, chronic kidney disease, and additional conditions in development.',
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
  whitepaper: 'White Paper',
  database: 'Database / Condition Page',
};

const typeColors: Record<string, string> = {
  journal: 'text-accent',
  editorial: 'text-sage-dark',
  roundtable: 'text-ink-light',
  conference: 'text-accent-dark',
  whitepaper: 'text-ink-muted',
  database: 'text-sage',
};

// Group publications by year
function groupByYear(pubs: Publication[]): Record<string, Publication[]> {
  const groups: Record<string, Publication[]> = {};
  for (const pub of pubs) {
    if (!groups[pub.year]) groups[pub.year] = [];
    groups[pub.year].push(pub);
  }
  return groups;
}

export default function PublicationsPage() {
  const grouped = groupByYear(publications);
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="page-enter max-w-3xl mx-auto px-6 pt-16 pb-20">
      <SectionHeader
        label="Publications"
        title="Published research"
        description="Journal articles, white papers, conference presentations, roundtable papers, condition pages, and structured databases spanning microbiome medicine, microbial metallomics, food metallomics, heavy metal certification, and ketogenic diet research."
      />

      <p className="text-sm text-ink-muted mb-10">
        ORCID:{' '}
        <a
          href="https://orcid.org/0000-0002-2348-7259"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent font-mono text-xs link-animate"
        >
          0000-0002-2348-7259 ↗
        </a>
        <span className="mx-2">·</span>
        {publications.length} publications
        <span className="mx-2">·</span>
        {publications.filter(p => p.doi).length} with DOIs
      </p>

      {/* Publications grouped by year */}
      {years.map((year) => (
        <section key={year} className="mb-12">
          <h2
            className="text-2xl font-medium text-ink mb-6 border-b border-ink/5 pb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {year}
          </h2>
          <div className="flex flex-col gap-8">
            {grouped[year].map((pub) => (
              <article key={pub.title} className="border-b border-ink/5 pb-6 last:border-b-0">
                <p
                  className={`text-xs font-semibold uppercase tracking-widest mb-2 ${typeColors[pub.type]}`}
                  style={{ letterSpacing: '0.1em' }}
                >
                  {typeLabels[pub.type]}
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
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent font-medium link-animate"
                    >
                      View ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

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
