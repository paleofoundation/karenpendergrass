import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The story of Karen Pendergrass: from chronic illness and self-directed research to founding five organizations at the intersection of microbiome science, food safety, and regulatory innovation.',
};

export default function AboutPage() {
  return (
    <div className="page-enter">
      {/* Header */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-10">
        <p
          className="text-xs font-semibold uppercase tracking-widest text-accent mb-4"
          style={{ letterSpacing: '0.15em' }}
        >
          About
        </p>
        <h1
          className="text-3xl md:text-4xl font-medium text-ink leading-tight mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          The long version
        </h1>
      </section>

      {/* Prose body */}
      <article className="max-w-3xl mx-auto px-6 pb-20 prose">
        <p>
          I run five organizations. I live in Cyprus with 92 cats. I research how
          trace metals shape pathogenic bacteria. I build food safety certification
          standards used by manufacturers worldwide. I am building a platform to
          connect animal sanctuaries with sponsors. And I got here because
          conventional medicine failed me.
        </p>

        <h2>The health crisis that started everything</h2>

        <p>
          After receiving multiple diagnoses and finding conventional treatment
          inadequate, I started doing my own research. What I found was a body of
          literature connecting the microbiome to virtually every chronic condition
          I was dealing with, but no one was translating that research into
          actionable clinical guidance. The interventions that existed were generic
          (take a probiotic, eat more fiber) and disconnected from the specificity
          that the research actually demanded.
        </p>

        <p>
          I became the first known person to undergo{' '}
          <a
            href="https://microbiomemedicine.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent"
          >
            fecal microbiota transplantation (FMT)
          </a>{' '}
          for Celiac Disease. The result was what I consider
          98-99% recovery from a condition that conventional medicine treats as
          permanent and irreversible. That experience did two things: it validated
          that microbiome-targeted interventions could work for conditions far
          beyond the narrow indications they were approved for, and it made me
          deeply skeptical of the gap between what research shows and what
          patients actually receive.
        </p>

        <h2>From patient to researcher</h2>

        <p>
          That skepticism became my career. I founded the{' '}
          <Link href="/publications" className="text-accent">
            Microbiome Medicine Database
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
          ) to formalize disease-associated microbiome patterns through what I call{' '}
          <Link href="/frameworks/major-microbial-associations" className="text-accent">
            Major Microbial Associations (MMAs)
          </Link>
          . The database is designed for clinicians and researchers who need
          to know which taxa are elevated or reduced in specific conditions, and
          which interventions have been shown to shift those patterns back toward
          health.
        </p>

        <p>
          The validation framework I developed requires dual alignment: an
          intervention must both restore the taxa altered in a disease-specific
          microbiome signature and yield measurable clinical improvement. When
          both criteria are met, the intervention is validated as a{' '}
          <Link href="/frameworks/mbti-validation-criteria" className="text-accent">
            Microbiome-Targeted Intervention (MBTI)
          </Link>{' '}
          and the underlying microbiome signature is simultaneously confirmed. This
          co-validation approach is what distinguishes the framework from approaches
          that treat microbiome data as correlational curiosities.
        </p>

        <h2>Microbial metallomics</h2>

        <p>
          My research trajectory led me to an observation that most microbiome
          researchers were overlooking: the role of trace metals in shaping which
          bacteria survive and thrive. Pathogenic bacteria like <em>Helicobacter
          pylori</em> depend on nickel for their most critical virulence factors
          (urease, hydrogenase), yet nickel is not required by human host cells.
          This creates a therapeutic target that conventional antimicrobial
          approaches completely miss.
        </p>

        <p>
          I introduced{' '}
          <Link href="/frameworks/microbial-metallomics" className="text-accent">
            microbial metallomics
          </Link>{' '}
          as a framework integrating trace metal analysis into microbiome research.
          The work examines how bacteria acquire, transport, store, and utilize
          metals like nickel, zinc, iron, cadmium, lead, and aluminum, and how
          environmental heavy metal contamination selects for the very pathogens
          that cause chronic disease. The{' '}
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
          ) publishes this work.
        </p>

        <h2>The Paleo Foundation and HMTc</h2>

        <p>
          Before the microbiome research consumed my working life, I had already
          been building the{' '}
          <Link href="/ventures" className="text-accent">
            Paleo Foundation
          </Link>{' '}
          for over a decade. What started as a certification body for Paleo, Keto,
          and Grain-Free products evolved into something broader as I recognized
          that the food system&apos;s heavy metal contamination problem was directly
          connected to the microbial selection pressures I was studying.
        </p>

        <p>
          The{' '}
          <Link href="/frameworks/hmtc" className="text-accent">
            Heavy Metal Tested and Certified (HMTc)
          </Link>{' '}
          program establishes category-specific contaminant limits for food,
          supplements, and personal care products. It is designed to keep brands
          continuously improving without turning normal variability into a commercial
          catastrophe, while ensuring that any product bearing the mark is
          supported as evidence under a defined surveillance protocol. The
          standards use ALARA-based principles and statistical risk matrices that I
          developed specifically for this purpose.
        </p>

        <h2>Tinies and the sanctuary</h2>

        <p>
          I live in Parekklisia, Cyprus, near RAF Akrotiri, where I run{' '}
          <Link href="/ventures" className="text-accent">
            Gardens of St. Gertrude
          </Link>
          , a cat sanctuary caring for 92 cats. The operational reality of running a
          sanctuary is that fundraising tools designed for general nonprofits fail
          spectacularly when applied to the specific needs of animal rescue.
          Sanctuaries need sponsor-to-animal matching, recurring micro-donations,
          transparent care reporting, and discovery mechanisms that connect them
          with supporters globally.
        </p>

        <p>
          That gap is why I built{' '}
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
          ) from scratch using Cursor and Claude, with no prior coding experience.
          The platform connects animal sanctuaries with sponsors and supporters. It
          is built on Next.js 14, Supabase, and Vercel, and represents my belief
          that if a job can be done by AI, it should be done by AI.
        </p>

        <h2>How I work</h2>

        <p>
          My foundational operating principle, held for over a decade, is that if
          a job can be done by AI, it should be done by AI. This applies to every
          role, including my own. Humans shift to oversight of AI systems. This is
          not a philosophical position; it is the operational reality across all
          five of my organizations.
        </p>

        <p>
          I approach complex problems with systems thinking over formulas. I use the{' '}
          <Link
            href="/writing/systems-thinking-in-microbiome-research"
            className="text-accent"
          >
            Bradford Hill criteria
          </Link>{' '}
          to bridge translational gaps. I challenge causal reductionism wherever I
          find it. And I have a named output class called{' '}
          <Link href="/frameworks/stop" className="text-accent">
            STOP (Suggested Termination Of Practice)
          </Link>{' '}
          for recommending that specific medical interventions be discontinued based
          on emerging evidence that they are ineffective, harmful, or
          counterproductive.
        </p>

        <h2>The five entities</h2>

        <p>Everything I do rolls up into five organizations:</p>

        <p>
          <strong>
            <Link href="/ventures" className="text-accent">
              Paleo Foundation
            </Link>
          </strong>{' '}
          (
          <a
            href="https://paleofoundation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent"
          >
            paleofoundation.com
          </a>
          ): Food certification standards for Paleo, Keto, Grain-Free, and HMTc
          programs.{' '}
          <strong>
            <Link href="/ventures" className="text-accent">
              Microbiome Medicine
            </Link>
          </strong>{' '}
          (
          <a
            href="https://microbiomemedicine.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent"
          >
            microbiomemedicine.com
          </a>
          ): The clinician-facing database formalizing disease-associated
          microbiome patterns and intervention validation.{' '}
          <strong>
            <Link href="/ventures" className="text-accent">
              Journal of Food Metallomics
            </Link>
          </strong>{' '}
          (
          <a
            href="https://microbialmetallomics.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent"
          >
            microbialmetallomics.com
          </a>
          ): Research integrating trace metal analysis into microbiome science.{' '}
          <strong>
            <Link href="/ventures" className="text-accent">
              Tinies
            </Link>
          </strong>{' '}
          (
          <a
            href="https://tinies.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent"
          >
            tinies.app
          </a>
          ): The platform connecting animal sanctuaries with sponsors.{' '}
          <strong>
            <Link href="/ventures" className="text-accent">
              Gardens of St. Gertrude
            </Link>
          </strong>{' '}
          (
          <a
            href="https://gardensofstgertrude.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent"
          >
            gardensofstgertrude.com
          </a>
          ): The cat sanctuary in Cyprus.
        </p>

        <h2>What I am available for</h2>

        <p>
          <Link href="/advisory" className="text-accent">
            Advisory board
          </Link>{' '}
          positions. Research collaboration in microbiome science, microbial
          metallomics, and food safety. Speaking engagements on{' '}
          <Link href="/frameworks/mbti-validation-criteria" className="text-accent">
            microbiome-targeted interventions
          </Link>
          , heavy metal certification, and systems thinking in translational
          medicine. Consulting on food safety certification program design. If you
          are interested in working together, please reach out through the{' '}
          <Link href="/contact" className="text-accent">
            contact page
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
