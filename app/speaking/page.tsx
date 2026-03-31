import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Speaking & Advisory',
  description:
    'Karen Pendergrass is available for speaking engagements, advisory board positions, and research collaboration in microbiome science, metallomics, and food safety.',
};

const topics = [
  {
    title: 'Microbiome-Targeted Interventions',
    description:
      'The validation framework for MBTIs, Major Microbial Associations, and what it takes to translate microbiome research into clinical guidance.',
  },
  {
    title: 'Microbial Metallomics',
    description:
      'How trace metals shape pathogenic bacteria, the role of nickel in virulence, and why heavy metal contamination is a microbiome problem.',
  },
  {
    title: 'Heavy Metal Certification & Food Safety',
    description:
      'The HMTc program, ALARA-based standards, and designing certification frameworks that drive continuous improvement without punishing normal variability.',
  },
  {
    title: 'Systems Thinking in Translational Medicine',
    description:
      'Why causal reductionism fails in microbiome research, the Bradford Hill criteria for clinical translation, and the case for STOP recommendations.',
  },
  {
    title: 'Building with AI',
    description:
      'Building Tinies from scratch with no coding experience using Cursor and Claude. The operating principle that if a job can be done by AI, it should be.',
  },
];

const appearances = [
  {
    event: '11th Beneficial Microbes Conference',
    talk: 'Beyond Protocols: The Case for Systems Thinking in Microbiome Research',
    year: '2025',
    articleSlug: 'systems-thinking-in-microbiome-research',
  },
];

export default function SpeakingPage() {
  return (
    <div className="page-enter max-w-3xl mx-auto px-6 pt-16 pb-20">
      <SectionHeader
        label="Speaking & Advisory"
        title="Available for talks, boards, and collaboration"
        description="I speak on microbiome science, metallomics, food safety certification, and building with AI. I am also available for advisory board positions and research collaboration."
      />

      {/* Topics */}
      <section className="mb-16">
        <h2
          className="text-xl font-medium text-ink mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Talk topics
        </h2>
        <div className="flex flex-col gap-6">
          {topics.map((topic) => (
            <div key={topic.title} className="border-b border-ink/5 pb-5 last:border-b-0">
              <h3 className="font-medium text-ink mb-1">{topic.title}</h3>
              <p className="text-sm text-ink-light leading-relaxed">{topic.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Past appearances */}
      <section className="mb-16">
        <h2
          className="text-xl font-medium text-ink mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Past appearances
        </h2>
        <div className="flex flex-col gap-4">
          {appearances.map((item) => (
            <div key={item.event} className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-ink">{item.event}</p>
                <p className="text-sm text-ink-light">{item.talk}</p>
                {item.articleSlug && (
                  <Link
                    href={`/writing/${item.articleSlug}`}
                    className="text-xs text-accent link-animate mt-1 inline-block"
                  >
                    Read the article
                  </Link>
                )}
              </div>
              <span className="text-sm text-ink-muted shrink-0">{item.year}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-paper-warm rounded-lg border border-ink/5 p-8 text-center">
        <p
          className="text-xl font-medium text-ink mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Interested in working together?
        </p>
        <p className="text-sm text-ink-light mb-5 max-w-lg mx-auto">
          I am available for speaking engagements, advisory board positions, research
          collaboration, and consulting on food safety certification program design.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-5 py-2.5 bg-ink text-paper text-sm font-medium rounded-md hover:bg-ink-light transition-colors"
        >
          Get in touch
        </Link>
      </section>
    </div>
  );
}
