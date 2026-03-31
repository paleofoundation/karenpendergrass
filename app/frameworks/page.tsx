import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Frameworks | Karen Pendergrass',
  description:
    'Original research frameworks developed by Karen Pendergrass: MBTI Validation Criteria, HMTc Certification Standards, Microbial Metallomics, Major Microbial Associations (MMA), and STOP recommendations.',
};

const frameworks: {
  slug: string;
  name: string;
  tagline: string;
  description: ReactNode;
  category: string;
}[] = [
  {
    slug: 'mbti-validation-criteria',
    name: 'Foundational MBTI Validation Criteria',
    tagline: 'A dual-validation framework for microbiome-targeted interventions',
    description:
      'The first structured methodology for validating whether a microbiome-targeted intervention actually works. Requires simultaneous microbiome signature alignment and clinical efficacy, co-validating both the intervention and the underlying microbial signature.',
    category: 'Microbiome Medicine',
  },
  {
    slug: 'hmtc',
    name: 'Heavy Metal Tested & Certified (HMTc)',
    tagline: 'Category-specific contaminant limits using ALARA principles',
    description:
      'A certification framework establishing per-metal contaminant standards for food, supplements, and consumer products. Designed to drive continuous improvement without punishing normal variability, using statistical risk matrices and defined surveillance protocols.',
    category: 'Food Safety',
  },
  {
    slug: 'microbial-metallomics',
    name: 'Microbial Metallomics',
    tagline: 'How trace metals shape pathogenic bacteria and drive disease',
    description:
      'A framework integrating trace metal analysis into microbiome research. Examines how bacteria acquire, transport, and utilize metals like nickel, zinc, iron, and cadmium, and how environmental contamination selects for virulent, antibiotic-resistant pathogens.',
    category: 'Research',
  },
  {
    slug: 'major-microbial-associations',
    name: 'Major Microbial Associations (MMA)',
    tagline: 'Formalized disease-associated microbiome patterns',
    description: (
      <>
        A structured system for documenting which microbial taxa are consistently
        elevated or reduced in specific disease states. MMAs form the foundation of
        the{' '}
        <Link href="/publications" className="text-accent">
          Microbiome Signatures Database
        </Link>{' '}
        and provide the evidence base for targeted intervention design.
      </>
    ),
    category: 'Microbiome Medicine',
  },
  {
    slug: 'triangulation-method',
    name: 'Microbiome Signature Triangulation Method',
    tagline: 'The master reasoning system for intervention discovery and validation',
    description: (
      <>
        An eight-step pipeline that takes a microbiome signature as input, layers
        metallomics, maps functional dependencies, identifies ecological
        vulnerabilities, predicts interventions, triangulates against independent
        evidence, and produces validated recommendations or{' '}
        <Link href="/frameworks/stop" className="text-accent">
          STOP
        </Link>{' '}
        analyses. The meta-framework that connects{' '}
        <Link href="/frameworks/mbti-validation-criteria" className="text-accent">
          MBTI
        </Link>
        ,{' '}
        <Link href="/frameworks/hmtc" className="text-accent">
          HMTc
        </Link>
        ,{' '}
        <Link href="/frameworks/major-microbial-associations" className="text-accent">
          MMA
        </Link>
        ,{' '}
        <Link href="/frameworks/microbial-metallomics" className="text-accent">
          Microbial Metallomics
        </Link>
        , and STOP.
      </>
    ),
    category: 'Core Method',
  },
  {
    slug: 'stop',
    name: 'STOP (Suggested Termination Of Practice)',
    tagline: 'Evidence-based recommendations to discontinue harmful interventions',
    description:
      'A named output class for recommending that specific medical interventions, treatments, or standard practices be discontinued based on emerging evidence that they are ineffective, harmful, or counterproductive. Applied across microbiome and metallomics research.',
    category: 'Translational Medicine',
  },
];

export default function FrameworksPage() {
  return (
    <div className="page-enter max-w-3xl mx-auto px-6 pt-16 pb-20">
      <SectionHeader
        label="Frameworks"
        title="Original research frameworks"
        description="Methodologies, validation criteria, and named output classes developed through my work in microbiome science, food safety, and translational medicine. Each framework addresses a specific gap in how research is translated into practice."
      />

      <div className="flex flex-col gap-10">
        {frameworks.map((fw) => (
          <article key={fw.slug} className="border-b border-ink/5 pb-8 last:border-b-0">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-accent mb-2"
              style={{ letterSpacing: '0.1em' }}
            >
              {fw.category}
            </p>
            <Link href={`/frameworks/${fw.slug}`}>
              <h2
                className="text-xl font-medium text-ink hover:text-accent transition-colors mb-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {fw.name}
              </h2>
            </Link>
            <p
              className="text-sm font-medium text-ink-light mb-3"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              {fw.tagline}
            </p>
            <p className="text-ink-light leading-relaxed mb-3">{fw.description}</p>
            <Link
              href={`/frameworks/${fw.slug}`}
              className="text-sm text-accent font-medium link-animate"
            >
              Read the full framework
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
