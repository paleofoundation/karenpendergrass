import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Karen Pendergrass research portfolio: microbiome signatures, microbial metallomics, MBTI validation framework, HMTc standards, and translational medicine.',
};

interface ResearchProject {
  title: string;
  category: string;
  description: ReactNode;
  url?: string;
  internalHref?: string;
  relatedArticles?: { title: string; slug: string }[];
}

const projects: ResearchProject[] = [
  {
    title: 'Microbiome Signatures Database',
    category: 'Microbiome Medicine',
    internalHref: '/publications',
    description: (
      <>
        A clinician- and researcher-facing database formalizing disease-associated
        microbiome patterns through{' '}
        <Link href="/frameworks/major-microbial-associations" className="text-accent">
          Major Microbial Associations (MMAs)
        </Link>
        . Provides structured intervention guidance using the Microbial Shift and
        Realignment Process (MSRP) and dual-validation framework for{' '}
        <Link href="/frameworks/mbti-validation-criteria" className="text-accent">
          Microbiome-Targeted Interventions (MBTIs)
        </Link>
        .
      </>
    ),
    url: 'https://microbiomemedicine.com',
  },
  {
    title: 'Foundational MBTI Validation Criteria',
    category: 'Framework',
    internalHref: '/frameworks/mbti-validation-criteria',
    description:
      'A validated MBTI must meet three criteria: (1) Microbiome Signature Alignment, modulating the microbiome by increasing reduced taxa and decreasing elevated taxa in the condition\'s signature; (2) Clinical Efficacy, demonstrating measurable improvements in clinical outcomes; and (3) Dual Validation, whereby alignment simultaneously validates the intervention and confirms the microbiome signature\'s accuracy and clinical relevance.',
  },
  {
    title: 'Microbial Metallomics',
    category: 'Research Framework',
    internalHref: '/frameworks/microbial-metallomics',
    description:
      'Foundational work integrating trace metal analysis into microbiome research. Examines differential acquisition, utilization, and detoxification of trace elements (nickel, zinc, iron, cadmium, lead, aluminum) among taxa enriched in disease states. Introduces metallomics as a lens for pathogen virulence, microbial selection pressure, and nutrient-immune interactions.',
    url: 'https://microbialmetallomics.com',
    relatedArticles: [
      { title: 'Microbial Metallomics: The Missing Link', slug: 'microbial-metallomics-and-heavy-metal-contamination' },
    ],
  },
  {
    title: 'Heavy Metal Tested & Certified (HMTc) Standards',
    category: 'Standards Development',
    internalHref: '/frameworks/hmtc',
    description:
      'Category-specific contaminant limits for food, supplements, and personal care products using ALARA-based principles and statistical risk matrices. Eight per-metal standards documents (Pb, As, Hg, Cd, Cr, Ni, Sn, Al) with anti-circumvention language, lot testing schedules, and governance policies.',
    url: 'https://heavymetaltested.com',
  },
  {
    title: 'STOP (Suggested Termination Of Practice)',
    category: 'Output Framework',
    internalHref: '/frameworks/stop',
    description:
      'A named recommendation class for discontinuing specific medical interventions, treatments, or standard practices based on emerging evidence suggesting they are ineffective, harmful, or counterproductive. Applied across microbiome and metallomics research to address translational delays.',
  },
  {
    title: 'Nickel and Endometriosis',
    category: 'Microbial Metallomics',
    description: (
      <>
        Research into the role of nickel in microbial metallomic analyses related to{' '}
        <a
          href="https://microbiomemedicine.com/conditions/endometriosis/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent"
        >
          endometriosis
        </a>
        . Investigates how nickel-dependent pathogenic enzymes (urease, hydrogenase)
        interact with endometriosis microbiome signatures and contribute to disease
        persistence through metal-mediated virulence mechanisms.
      </>
    ),
    relatedArticles: [
      { title: 'Systems Thinking in Microbiome Research', slug: 'systems-thinking-in-microbiome-research' },
    ],
  },
];

export default function ResearchPage() {
  return (
    <div className="page-enter max-w-3xl mx-auto px-6 pt-16 pb-20">
      <SectionHeader
        label="Research"
        title="Research & frameworks"
        description="Databases, validation frameworks, standards, and research programs across microbiome science, metallomics, and translational medicine."
      />

      <div className="flex flex-col gap-10">
        {projects.map((project) => (
          <article key={project.title} className="border-b border-ink/5 pb-8 last:border-b-0">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-accent mb-2"
              style={{ letterSpacing: '0.1em' }}
            >
              {project.category}
            </p>
            <h3
              className="text-xl font-medium text-ink mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {project.internalHref ? (
                <Link href={project.internalHref} className="hover:text-accent transition-colors">
                  {project.title}
                </Link>
              ) : (
                project.title
              )}
            </h3>
            <p className="text-ink-light leading-relaxed mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-4">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent font-medium link-animate"
                >
                  {project.url.replace('https://', '')} ↗
                </a>
              )}
              {project.relatedArticles?.map((article) => (
                <Link
                  key={article.slug}
                  href={`/writing/${article.slug}`}
                  className="text-sm text-ink-light hover:text-accent transition-colors"
                >
                  Related: {article.title}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
