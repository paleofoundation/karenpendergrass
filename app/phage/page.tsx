import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import PhageWaitlist from '@/components/PhageWaitlist';
import PhageSniperDiagram from '@/components/PhageSniperDiagram';

export const metadata: Metadata = {
  title: 'Phage Cocktails',
  description:
    'The most precise antibiotic ever discovered is a virus. Why bacteriophage cocktails — built from microbiome signatures — are the precision answer to antimicrobial resistance, and what is being built at phagecocktails.com.',
  keywords: [
    'phage cocktails',
    'bacteriophage therapy',
    'phage therapy',
    'antimicrobial resistance',
    'AMR',
    'precision antibiotics',
    'necrotizing enterocolitis',
    'microbiome signatures',
    'phagecocktails.com',
    'Karen Pendergrass',
  ],
  alternates: { canonical: '/phage' },
  openGraph: {
    title: 'Phage Cocktails — the precision answer to antibiotic resistance',
    description:
      'Antibiotics carpet-bomb. Phages are snipers. The case for bacteriophage cocktails built from microbiome signatures — and what is being built at phagecocktails.com.',
    url: 'https://karenpendergrass.com/phage',
    type: 'website',
  },
};

const SITE = 'https://phagecocktails.com';

const stats: { n: string; label: string; href: string }[] = [
  {
    n: '10 million',
    label: 'projected deaths a year from antimicrobial resistance by 2050',
    href: 'https://amr-review.org/',
  },
  {
    n: '1.27 million',
    label: 'deaths directly attributable to bacterial AMR in 2019, more than HIV and malaria combined',
    href: 'https://doi.org/10.1016/S0140-6736(21)02724-0',
  },
  {
    n: 'about 10³¹',
    label: 'bacteriophages on Earth, more than every other organism combined',
    href: `${SITE}/science`,
  },
  {
    n: 'one strain',
    label: 'is all a phage targets, leaving the rest of the microbiome standing',
    href: `${SITE}/101`,
  },
];

const steps: { k: string; t: string; b: string }[] = [
  {
    k: '01',
    t: 'Read the signature',
    b: 'A microbiome signature shows exactly which organisms are elevated and which are depleted in a given disease. That is the targeting data.',
  },
  {
    k: '02',
    t: 'Select the phages',
    b: 'For each disease-driving strain in the signature, choose the phages that lyse it and nothing else.',
  },
  {
    k: '03',
    t: 'Assemble the cocktail',
    b: 'Combine them into one preparation that removes the organisms making the patient sick and leaves the ecosystem intact.',
  },
];

const siteCards: { t: string; b: string; href: string }[] = [
  { t: 'Phage Therapy 101', b: 'The science, from the ground up.', href: `${SITE}/101` },
  { t: 'Build-a-Cocktail Lab', b: 'An interactive tool for assembling a cocktail.', href: `${SITE}/lab` },
  { t: 'Landmark Cases', b: 'The compassionate-use rescues that prove it works.', href: `${SITE}/cases` },
  { t: 'Steal This Grant', b: '50 open-source, CC0 grant proposals to fork and run.', href: `${SITE}/grant/steal` },
  { t: 'Find a Phage', b: 'Match a pathogen to a phage.', href: `${SITE}/find` },
  { t: 'For Investors', b: 'Why this is a trillion-dollar category that no one has priced yet.', href: `${SITE}/invest` },
];

const faqs: { q: string; a: string }[] = [
  {
    q: 'What is a phage cocktail?',
    a: 'A bacteriophage is a virus that infects bacteria and nothing else. A phage cocktail is a tailored combination of phages assembled to target a specific infection, removing the pathogen while leaving the rest of the microbiome intact.',
  },
  {
    q: 'How is this different from antibiotics?',
    a: 'A broad-spectrum antibiotic kills across the entire bacterial community, including the beneficial organisms a body depends on. A phage targets a single strain. Antibiotics carpet-bomb; phages snipe.',
  },
  {
    q: 'Is phage therapy actually proven?',
    a: 'It has a century of clinical use. The Eliava Institute in Tbilisi, Georgia has treated patients with phage preparations since 1923, and Western compassionate-use cases, including the 2017 Patterson rescue at UC San Diego and the 2019 Mycobacterium abscessus case published in Nature Medicine, recovered patients after every antibiotic had failed.',
  },
  {
    q: 'Why the focus on premature infants?',
    a: 'The neonatal intensive care unit is where the stakes are sharpest. Multidrug-resistant Klebsiella and related organisms drive necrotizing enterocolitis, and a broad-spectrum antibiotic given to a newborn incinerates the founding microbiome at the moment it is being established. A phage removes the organism that is killing the infant and leaves the developing ecosystem intact.',
  },
  {
    q: 'How do microbiome signatures fit in?',
    a: 'A microbiome signature identifies exactly which organisms are driving a disease, which makes it the targeting system for a cocktail. The signature tells you which phages to load. That is what turns phage therapy into precision medicine.',
  },
  {
    q: 'Can I get treatment now?',
    a: 'No. phagecocktails.com is a scientific education and research platform, not a treatment provider, and the waitlist is interest registration only. If you need access to phage therapy today, start with the access resources on the site.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Phage Cocktails — precision antibiotics for the age of resistance',
  url: 'https://karenpendergrass.com/phage',
  description:
    'The case for bacteriophage cocktails, built from microbiome signatures, as the precision answer to antimicrobial resistance.',
  about: { '@type': 'MedicalTherapy', name: 'Bacteriophage therapy' },
  author: { '@type': 'Person', name: 'Karen Pendergrass', url: 'https://karenpendergrass.com' },
  significantLink: SITE,
};

export default function PhagePage() {
  return (
    <div className="page-enter">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section
        className="relative py-20 md:py-28"
        style={{ borderBottom: '1px solid var(--color-border-light)' }}
      >
        <div className="absolute inset-0 graph-paper-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--color-accent-dark)' }}
          >
            Now live &middot; phagecocktails.com
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.08] tracking-tight max-w-4xl"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
          >
            The most precise antibiotic ever discovered is a virus.
          </h1>
          <p
            className="mt-6 text-lg md:text-xl leading-relaxed max-w-2xl"
            style={{ color: 'var(--color-ink-secondary)' }}
          >
            Antimicrobial resistance is on track to kill ten million people a year by 2050, and the
            therapy with the right mechanism to answer it has been sitting in plain sight for a
            century. I bought phagecocktails.com years before most people had heard the word. It is
            built now. Here is the case, and the door in.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-paper text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ background: 'var(--color-ink)' }}
            >
              Explore phagecocktails.com <span aria-hidden>&#8599;</span>
            </a>
            <a
              href="#waitlist"
              className="inline-flex items-center text-sm font-medium link-animate"
              style={{ color: 'var(--color-accent-dark)' }}
            >
              Join the waitlist &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Thesis + diagram */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
          <ScrollReveal animation="fade-in">
            <h2
              className="text-3xl md:text-4xl font-medium tracking-tight max-w-3xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              Antibiotics carpet-bomb. Phages are snipers.
            </h2>
            <p
              className="mt-5 text-lg leading-relaxed max-w-2xl"
              style={{ color: 'var(--color-ink-secondary)' }}
            >
              A broad-spectrum antibiotic kills across the whole community, including the beneficial
              organisms a body is built on. A phage targets one strain, replicates only where its
              host is present, and disappears when the host is gone. That specificity is the entire
              point.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="slide-up" delay={80}>
            <div className="mt-12">
              <PhageSniperDiagram />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stakes */}
      <section className="relative py-16 md:py-24" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal animation="fade-in">
            <h2
              className="text-3xl md:text-4xl font-medium mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              The stakes
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mb-12" style={{ color: 'var(--color-ink-secondary)' }}>
              The number everyone has agreed to ignore, set next to the mechanism that could answer it.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <ScrollReveal key={s.n} animation="slide-up" delay={i * 70}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="venture-card block p-7 h-full"
                >
                  <p
                    className="text-3xl md:text-4xl font-medium tracking-tight mb-3"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                  >
                    {s.n}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
                    {s.label}
                  </p>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship: NEC */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="graph-paper-overlay absolute inset-0" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
          <ScrollReveal animation="fade-in">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: 'var(--color-accent-dark)' }}
            >
              The flagship program
            </p>
            <h2
              className="text-3xl md:text-4xl font-medium tracking-tight max-w-3xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              Where it should be used first: the NICU
            </h2>
            <p className="mt-5 text-lg leading-relaxed max-w-3xl" style={{ color: 'var(--color-ink-secondary)' }}>
              Premature infants die from infections that should be survivable, increasingly driven by
              multidrug-resistant Klebsiella and related organisms in necrotizing enterocolitis. An
              antibiotic given to a newborn incinerates the founding microbiome at the exact moment it
              is being set for life. A phage removes the one organism killing the infant and leaves
              the rest intact. That is lethal precision in the patients who can least afford collateral
              damage.
            </p>
            <p className="mt-6">
              <a
                href={`${SITE}/grant/steal/nec`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium link-animate"
                style={{ color: 'var(--color-accent-dark)' }}
              >
                Read the flagship NEC grant proposal <span aria-hidden>&#8599;</span>
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Signature -> cocktail */}
      <section className="relative py-16 md:py-24" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal animation="fade-in">
            <h2
              className="text-3xl md:text-4xl font-medium mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              From signature to cocktail
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mb-12" style={{ color: 'var(--color-ink-secondary)' }}>
              The synthesis almost no one is building: a decade of microbiome-signature work becomes
              the targeting system for the cocktail.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <ScrollReveal key={s.k} animation="slide-up" delay={i * 80}>
                <div className="venture-card p-8 h-full">
                  <p className="text-[11px] font-mono tracking-wider mb-4" style={{ color: 'var(--color-ink-muted)' }}>
                    {s.k}
                  </p>
                  <p
                    className="text-xl font-medium mb-3 tracking-tight"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                  >
                    {s.t}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
                    {s.b}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="mt-8 text-sm" style={{ color: 'var(--color-ink-secondary)' }}>
            <Link href="/frameworks/mbti-validation-criteria" className="link-animate" style={{ color: 'var(--color-accent-dark)' }}>
              How the signatures are validated &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Inside the site */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal animation="fade-in">
            <h2
              className="text-3xl md:text-4xl font-medium mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              Inside phagecocktails.com
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mb-12" style={{ color: 'var(--color-ink-secondary)' }}>
              The platform goes deep. A few doors in.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteCards.map((c, i) => (
              <ScrollReveal key={c.t} animation="slide-up" delay={i * 60}>
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="venture-card block p-6 h-full">
                  <h3 className="text-lg font-medium text-ink" style={{ fontFamily: 'var(--font-display)' }}>
                    {c.t}
                  </h3>
                  <p className="mt-2 text-sm text-ink-light leading-relaxed">{c.b}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--color-accent-dark)' }}>
                    {c.href.replace('https://', '')} <span aria-hidden>&#8599;</span>
                  </span>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 md:py-24" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <ScrollReveal animation="fade-in">
            <h2
              className="text-3xl md:text-4xl font-medium mb-10 tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              Questions
            </h2>
          </ScrollReveal>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <ScrollReveal key={f.q} animation="fade-in" delay={i * 40}>
                <div className="pb-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                  >
                    {f.q}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--color-ink-secondary)' }}>
                    {f.a}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="relative py-16 md:py-24 overflow-hidden scroll-mt-24">
        <div className="graph-paper-overlay absolute inset-0" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-10">
          <ScrollReveal animation="fade-in">
            <h2
              className="text-2xl md:text-3xl font-medium mb-3 tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              Be early on this one too
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-ink-secondary)' }}>
              When push comes to shove, phages are what the cabinet has with the right mechanism. The
              people who keep the knowledge alive will look prescient. Get on the list and I will route
              you what matters as this gets built.
            </p>
          </ScrollReveal>
          <PhageWaitlist />
          <p className="mt-6 text-sm" style={{ color: 'var(--color-ink-muted)' }}>
            Need access today?{' '}
            <a
              href={`${SITE}/access`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-animate"
              style={{ color: 'var(--color-accent-dark)' }}
            >
              Compassionate-use resources &#8599;
            </a>
          </p>
          <p className="mt-10 text-sm" style={{ color: 'var(--color-ink-secondary)' }}>
            Read more:{' '}
            <Link href="/writing/phagecocktails-com-is-live" className="link-animate" style={{ color: 'var(--color-accent-dark)' }}>
              I built phagecocktails.com
            </Link>{' '}
            &middot;{' '}
            <Link href="/writing/phage-therapy-the-answer-no-one-is-funding" className="link-animate" style={{ color: 'var(--color-accent-dark)' }}>
              the original case
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
