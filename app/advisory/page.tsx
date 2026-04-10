import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import IntakeForm from '@/components/IntakeForm';
import { AdvisorySchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Advisory & Board Services',
  description:
    'Karen Pendergrass provides board advisory services, expert consultation, and strategic guidance in microbiome science, food safety certification, heavy metal risk assessment, microbial metallomics, and AI-first operations design.',
  alternates: {
    canonical: '/advisory',
  },
  openGraph: {
    title: 'Advisory & Board Services',
    description:
      'Board advisory, expert consultation, and strategic guidance in microbiome science, food safety certification, and heavy metal risk assessment.',
  },
};

const boardDomains: { title: string; description: ReactNode; keywords: string }[] = [
  {
    title: 'Food Safety & Certification Governance',
    description: (
      <>
        Over 15 years designing certification standards (Paleo, Keto, Grain-Free,{' '}
        <Link href="/frameworks/hmtc" className="text-accent">
          HMTc
        </Link>
        ) used globally by food manufacturers. Deep expertise in ALARA-based
        contaminant limits, statistical risk matrices, lot testing protocols, and
        anti-circumvention language for certification marks. Relevant for food
        companies, supplement brands, testing laboratories, and certification
        bodies.
      </>
    ),
    keywords: 'HMTc, ALARA, certification standards, food safety, contaminant testing',
  },
  {
    title: 'Microbiome Science Translation',
    description: (
      <>
        Creator of the Foundational{' '}
        <Link href="/frameworks/mbti-validation-criteria" className="text-accent">
          MBTI Validation Criteria
        </Link>{' '}
        and the{' '}
        <Link href="/publications" className="text-accent">
          Microbiome Signatures Database
        </Link>
        . Expertise in formalizing disease-associated microbiome patterns (
        <Link href="/frameworks/major-microbial-associations" className="text-accent">
          Major Microbial Associations
        </Link>
        ), validating microbiome-targeted interventions, and bridging the gap between
        discovery and clinical application. Relevant for biotech companies, probiotic
        manufacturers, clinical research organizations, and precision nutrition
        platforms.
      </>
    ),
    keywords: 'MBTI, microbiome signatures, MMA, microbiome-targeted interventions, clinical translation',
  },
  {
    title: 'Heavy Metal Risk Assessment & Metallomics',
    description: (
      <>
        Pioneering work in{' '}
        <Link href="/frameworks/microbial-metallomics" className="text-accent">
          microbial metallomics
        </Link>{' '}
        examining how trace metals (nickel, zinc, iron, cadmium, lead, aluminum)
        shape pathogenic bacteria and drive antibiotic resistance. Authored the
        definitive framework connecting environmental heavy metal contamination to
        pathogenic selection pressure. Relevant for environmental health
        organizations, testing laboratories, regulatory bodies, and companies
        addressing contamination in food, water, and consumer products.
      </>
    ),
    keywords: 'microbial metallomics, heavy metal contamination, nickel pathogenesis, trace metal analysis',
  },
  {
    title: 'AI-First Operations Design',
    description: (
      <>
        Foundational operating principle applied across six organizations: if a job
        can be done by AI, it should be done by AI, with humans shifting to
        oversight. Built{' '}
        <Link href="/ventures" className="text-accent">
          Tinies
        </Link>{' '}
        (
        <a
          href="https://tinies.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent"
        >
          tinies.app
        </a>
        ; a full-stack platform) from scratch using AI coding tools with no prior
        coding experience. Designed and deployed an AI-managed Operations Command
        Center replacing traditional COO functions. Relevant for companies
        undergoing AI transformation, startups designing AI-native workflows, and
        organizations restructuring around AI capabilities.
      </>
    ),
    keywords: 'AI operations, AI-first design, operational AI, AI-native workflows',
  },
  {
    title: 'Animal Welfare Nonprofit Governance',
    description: (
      <>
        Founder and operator of{' '}
        <Link href="/ventures" className="text-accent">
          Gardens of St. Gertrude
        </Link>{' '}
        (
        <a
          href="https://gardensofstgertrude.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent"
        >
          gardensofstgertrude.com
        </a>
        ; 92-cat sanctuary in Cyprus) and{' '}
        <Link href="/ventures" className="text-accent">
          Tinies
        </Link>{' '}
        (
        <a
          href="https://tinies.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent"
        >
          tinies.app
        </a>
        ; sanctuary-to-sponsor platform). Direct operational experience with
        sanctuary management, fundraising, veterinary care logistics, and
        international animal welfare advocacy. Relevant for animal welfare
        nonprofits, pet industry companies, and foundations supporting animal rescue.
      </>
    ),
    keywords: 'animal welfare, sanctuary operations, nonprofit governance',
  },
];

const engagementTypes: { title: string; details: ReactNode }[] = [
  {
    title: 'Board of Directors / Advisory Board',
    details: 'Ongoing strategic advisory with quarterly meetings, committee participation, and governance oversight. Particularly suited for organizations in food safety, microbiome science, environmental health, and AI-native operations.',
  },
  {
    title: 'Scientific Advisory Board',
    details: (
      <>
        Research direction, methodology review, publication strategy, and
        translational roadmap development. Specializing in{' '}
        <Link href="/frameworks/mbti-validation-criteria" className="text-accent">
          microbiome-targeted interventions
        </Link>
        , metallomics, and systems-level approaches to chronic disease.
      </>
    ),
  },
  {
    title: 'Expert Consultation',
    details: (
      <>
        Project-based or retainer engagements for certification program design,{' '}
        <Link href="/frameworks/hmtc" className="text-accent">
          HMTc
        </Link>{' '}
        implementation, microbiome data interpretation, regulatory strategy, and AI
        operations architecture.
      </>
    ),
  },
  {
    title: 'Speaking & Keynote',
    details: (
      <>
        Conference presentations, panel participation, and keynote addresses on microbiome science, food safety,{' '}
        <Link href="/frameworks/hmtc" className="text-accent">
          heavy metal certification
        </Link>
        , and building with AI.
      </>
    ),
  },
];

const credentials: { label: string; value: ReactNode }[] = [
  {
    label: 'Organizations Founded',
    value: (
      <>
        6 (
        <Link href="/ventures" className="text-accent">
          Paleo Foundation
        </Link>{' '}
        (
        <a
          href="https://paleofoundation.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent"
        >
          paleofoundation.com
        </a>
        ),{' '}
        <Link href="/ventures" className="text-accent">
          Microbiome Medicine
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
        ),{' '}
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
        ),{' '}
        <Link href="/ventures" className="text-accent">
          WikiBiome
        </Link>{' '}
        (
        <a
          href="https://wikibiome.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent"
        >
          wikibiome.com
        </a>
        ),{' '}
        <Link href="/ventures" className="text-accent">
          Tinies
        </Link>{' '}
        (
        <a
          href="https://tinies.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent"
        >
          tinies.app
        </a>
        ),{' '}
        <Link href="/ventures" className="text-accent">
          Gardens of St. Gertrude
        </Link>{' '}
        (
        <a
          href="https://gardensofstgertrude.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent"
        >
          gardensofstgertrude.com
        </a>
        )
      </>
    ),
  },
  { label: 'Years in Food Certification', value: '15+' },
  {
    label: 'Certification Standards Developed',
    value: (
      <>
        Paleo Certified, Keto Certified, Grain-Free Certified, Heavy Metal Tested & Certified (
        <Link href="/frameworks/hmtc" className="text-accent">
          HMTc
        </Link>
        )
      </>
    ),
  },
  {
    label: 'Research Frameworks Created',
    value: (
      <>
        Foundational{' '}
        <Link href="/frameworks/mbti-validation-criteria" className="text-accent">
          MBTI Validation Criteria
        </Link>
        ,{' '}
        <Link href="/frameworks/stop" className="text-accent">
          STOP (Suggested Termination Of Practice)
        </Link>
        ,{' '}
        <Link href="/frameworks/major-microbial-associations" className="text-accent">
          Major Microbial Associations (MMA)
        </Link>
        ,{' '}
        <Link href="/frameworks/microbial-metallomics" className="text-accent">
          Microbial Metallomics
        </Link>{' '}
        framework
      </>
    ),
  },
  { label: 'HMTc Per-Metal Standards', value: '8 (Lead, Arsenic, Mercury, Cadmium, Chromium, Nickel, Tin, Aluminum)' },
  { label: 'Product Categories Covered by HMTc', value: 'Infant foods, supplements, cosmetics, cleaning products, pet foods, toys' },
  { label: 'Conference Presentations', value: '11th Beneficial Microbes Conference (2025)' },
  { label: 'Base of Operations', value: 'Parekklisia, Cyprus' },
];

export default function AdvisoryPage() {
  return (
    <div className="page-enter">
      <AdvisorySchema />

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-12">
        <p
          className="text-xs font-semibold uppercase tracking-widest text-accent mb-4"
          style={{ letterSpacing: '0.15em' }}
        >
          Advisory & Board
        </p>
        <h1
          className="text-3xl md:text-4xl font-medium text-ink leading-tight mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Strategic expertise for organizations navigating microbiome science, food safety, and regulatory innovation
        </h1>
        <p className="text-lg text-ink-light leading-relaxed max-w-2xl">
          I bring 15+ years of standards development, original research in{' '}
          <Link href="/frameworks/microbial-metallomics" className="text-accent">
            microbial metallomics
          </Link>{' '}
          and{' '}
          <Link href="/frameworks/mbti-validation-criteria" className="text-accent">
            microbiome-targeted interventions
          </Link>
          , and operational experience running five{' '}
          <Link href="/ventures" className="text-accent">
            organizations
          </Link>{' '}
          to board and advisory roles. My work sits at intersections that most experts
          never bridge: bench science and regulatory policy, food safety and
          microbiome medicine, AI systems and human oversight.
        </p>
      </section>

      {/* Board domains */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <h2
          className="text-xl font-medium text-ink mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Domains of board-level expertise
        </h2>
        <div className="flex flex-col gap-8">
          {boardDomains.map((domain) => (
            <article key={domain.title} className="border-b border-ink/5 pb-7 last:border-b-0">
              <h3
                className="text-lg font-medium text-ink mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {domain.title}
              </h3>
              <p className="text-ink-light leading-relaxed mb-3">{domain.description}</p>
              <p className="text-xs text-ink-muted">
                <span className="font-medium">Keywords:</span> {domain.keywords}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Engagement types */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <h2
          className="text-xl font-medium text-ink mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Engagement types
        </h2>
        <div className="flex flex-col gap-6">
          {engagementTypes.map((type) => (
            <div key={type.title} className="border-b border-ink/5 pb-5 last:border-b-0">
              <h3 className="font-medium text-ink mb-1">{type.title}</h3>
              <p className="text-sm text-ink-light leading-relaxed">{type.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Domains of applied work */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <h2
          className="text-xl font-medium text-ink mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Domains of applied work
        </h2>
        <p className="text-sm text-ink-light leading-relaxed">
          Applied the{' '}
          <Link href="/frameworks/triangulation-method" className="text-accent">
            Microbiome Signature Triangulation Method
          </Link>{' '}
          and site-specific prebiotic fiber interventions across oncology (drug repurposing for metastasized bone cancer, pancreatic cancer, basal cell carcinoma, melanoma), nephrology (chronic kidney disease, NAFLD remission), gastroenterology, and veterinary medicine, in collaboration with clinicians and veterinarians managing complex cases.
        </p>
      </section>

      {/* Credentials */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <h2
          className="text-xl font-medium text-ink mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Credentials at a glance
        </h2>
        <div className="bg-paper-warm rounded-lg border border-ink/5 p-6">
          <div className="flex flex-col gap-4">
            {credentials.map((item) => (
              <div key={item.label} className="flex flex-col sm:flex-row sm:gap-4">
                <p className="text-sm font-medium text-ink sm:w-64 shrink-0">{item.label}</p>
                <p className="text-sm text-ink-light">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement rates */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <h2
          className="text-xl font-medium text-ink mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Engagement structure
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-ink/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3" style={{ letterSpacing: '0.1em' }}>Expert Consultation</p>
            <p className="text-3xl font-medium text-ink mb-1" style={{ fontFamily: 'var(--font-display)' }}>$1,500<span className="text-lg text-ink-muted font-normal">/hour</span></p>
            <p className="text-sm text-ink-light leading-relaxed mt-3">
              Direct access for microbiome signature analysis,{' '}
              <Link href="/frameworks/hmtc" className="text-accent">
                HMTc
              </Link>{' '}
              certification strategy, intervention validation, regulatory guidance, or AI operations architecture. Minimum 2-hour engagement.
            </p>
          </div>
          <div className="bg-white rounded-lg border border-ink/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3" style={{ letterSpacing: '0.1em' }}>Advisory Retainer</p>
            <p className="text-3xl font-medium text-ink mb-1" style={{ fontFamily: 'var(--font-display)' }}>Custom</p>
            <p className="text-sm text-ink-light leading-relaxed mt-3">Board of Directors, Scientific Advisory Board, and ongoing strategic advisory. Structured as monthly or quarterly retainers with defined deliverables. Equity arrangements considered for early-stage companies.</p>
          </div>
        </div>
        <p className="text-xs text-ink-muted mt-4">All engagements begin with a 30-minute scoping call at no charge to determine fit and define deliverables.</p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-20">
        <IntakeForm />
      </section>
    </div>
  );
}
