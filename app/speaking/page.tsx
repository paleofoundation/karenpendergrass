import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Speaking',
  description:
    'Book Karen Pendergrass for keynotes, conference presentations, podcasts, and panels on microbiome medicine, microbial metallomics, food safety certification, trend forecasting, and unconventional career paths.',
  alternates: {
    canonical: '/speaking',
  },
};

const topics = [
  {
    title: 'Microbial Metallomics: The Field Nobody Knows About Yet',
    audience: 'Research conferences, scientific advisory boards, pharma R&D',
    description: 'How heavy metals reshape the gut microbiome by selecting for virulence-enabled pathobionts, and why this changes everything about how we think about food safety, chronic disease, and therapeutic intervention. Includes live demonstration of the Microbiome Signature Triangulation Method.',
  },
  {
    title: 'The Oracle Talk: What I Called, What I See Coming, and How I Do It',
    audience: 'Business conferences, CPG summits, investor groups',
    description: 'A documented track record of calling trends 4-15 years early (Paleo, keto, prebiotics on Pepsi cans) and the mechanistic forecasting method behind it. Covers the next decade of food, health, and consumer science. Fred Hart, founder of Interact, called me "the oracle" after the Pepsi prediction came true.',
  },
  {
    title: 'Heavy Metals in Your Food: What Consumers Don\'t Know and Brands Can\'t Ignore',
    audience: 'Food industry events, regulatory conferences, consumer advocacy',
    description: 'The case for third-party heavy metal certification beyond lead and arsenic. Covers nickel in infant formula, cadmium in chocolate, the fertilizer contamination timeline, and why HMTc certification is the next frontier in food safety.',
  },
  {
    title: 'Range: What Selling Rocks at Six Taught Me About Presenting to 150 PhDs',
    audience: 'Entrepreneurship events, career development, podcast interviews',
    description: 'The full story of an unconventional career spanning door-to-door rock sales, operating rooms at 13, roofing at 16, color theory, food certification, fecal transplants, and presenting original research at an international microbiome conference as the only non-PhD in the room.',
  },
  {
    title: 'Why I Built a Tech Platform Instead of Asking for Donations',
    audience: 'Social enterprise events, animal welfare conferences, impact investing',
    description: 'How the donation model for animal welfare is a structural design flaw, not a funding gap, and why I built Tinies as a pet services marketplace where 90% of booking commissions fund sanctuaries. Includes the Cause Hotel concept and the \u20AC100M Cyprus cat tourism thesis.',
  },
  {
    title: 'The Microbiome Medicine Roundtable: From Mechanism to Published Journal Issue',
    audience: 'Pharma, biotech, clinical research organizations, disease foundations',
    description: 'How two people produced five papers, a novel therapeutic hypothesis (melanotan for Parkinson\'s), and a published journal issue using a structured mechanism-first synthesis process. A live walkthrough of the Roundtable method and its applicability to any disease where microbiome biology, metallomics, and immunity intersect.',
  },
];

const pastSpeaking = [
  {
    event: '11th Beneficial Microbes Conference',
    location: 'Amsterdam, Netherlands',
    year: '2025',
    topic: 'The Microbiome Signature of Endometriosis: From Dysbiosis to Metallomics to Targeted Interventions',
    note: 'Only non-PhD presenter among 150 researchers. Invited guest.',
    videoUrl: 'https://www.youtube.com/watch?v=8bZUpnxd92U',
  },
  {
    event: 'SCD Lifestyle Podcast with Jordan Reasoner',
    location: 'Remote',
    year: '2012',
    topic: 'First documented case of FMT for Celiac Disease',
    note: 'First public discussion of DIY fecal microbiota transplant for celiac disease, four years before the first published case study.',
  },
];

export default function SpeakingPage() {
  return (
    <div className="page-enter max-w-3xl mx-auto px-6 pt-16 pb-20">
      <SectionHeader
        label="Speaking"
        title="Book Karen"
        description="Keynotes, conference presentations, podcasts, panels, and private briefings on microbiome medicine, microbial metallomics, food safety, trend forecasting, and unconventional career paths."
      />

      {/* Video embed */}
      <section className="mb-14">
        <div className="aspect-video rounded-lg overflow-hidden bg-ink/5">
          <iframe
            src="https://www.youtube.com/embed/8bZUpnxd92U"
            title="Karen Pendergrass - Beneficial Microbes Conference 2025"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <p className="text-xs text-ink-muted mt-2">
          11th Beneficial Microbes Conference, Amsterdam 2025. The Microbiome Signature of Endometriosis.
        </p>
      </section>

      {/* Topics */}
      <section className="mb-14">
        <h2
          className="text-xl font-medium text-ink mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Talk topics
        </h2>
        <div className="flex flex-col gap-8">
          {topics.map((topic) => (
            <div key={topic.title} className="border-b border-ink/5 pb-6 last:border-b-0">
              <h3
                className="text-lg font-medium text-ink mb-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {topic.title}
              </h3>
              <p
                className="text-xs font-semibold uppercase tracking-widest text-accent mb-2"
                style={{ letterSpacing: '0.1em' }}
              >
                {topic.audience}
              </p>
              <p className="text-sm text-ink-light leading-relaxed">{topic.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Past speaking */}
      <section className="mb-14">
        <h2
          className="text-xl font-medium text-ink mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Past appearances
        </h2>
        <div className="flex flex-col gap-6">
          {pastSpeaking.map((event) => (
            <div key={event.event} className="border-b border-ink/5 pb-5 last:border-b-0">
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="font-medium text-ink">{event.event}</h3>
                <span className="text-xs text-ink-muted shrink-0">{event.year}</span>
              </div>
              <p className="text-sm text-ink-light mb-1">{event.topic}</p>
              {event.note && (
                <p className="text-xs text-ink-muted italic">{event.note}</p>
              )}
              {event.videoUrl && (
                <a
                  href={event.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent font-medium link-animate mt-1 inline-block"
                >
                  Watch ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section className="mb-14">
        <div className="bg-paper-warm rounded-lg border border-ink/5 p-6">
          <p
            className="text-ink-light leading-relaxed mb-3"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.95rem' }}
          >
            "Well if it isn't the oracle herself! Too bad we don't have a recording of that call. And now you need to put out a 2030 trends prediction piece."
          </p>
          <p className="text-sm font-medium text-ink">Fred Hart</p>
          <p className="text-xs text-ink-muted">Founder, Interact (CPG Brand & Packaging Design)</p>
        </div>
      </section>

      {/* Booking CTA */}
      <section>
        <div className="bg-ink rounded-lg p-8 text-center">
          <p
            className="text-xl font-medium text-paper mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Book Karen for your event
          </p>
          <p className="text-sm text-paper/70 mb-5 max-w-lg mx-auto">
            Available for keynotes, conference presentations, podcast interviews,
            panel discussions, and private briefings. All inquiries begin with a
            complimentary 15-minute call to determine fit.
          </p>
          <Link
            href="/advisory#intake"
            className="inline-flex items-center justify-center px-6 py-3 bg-paper text-ink text-sm font-medium rounded-md hover:bg-paper-warm transition-colors"
          >
            Send a speaking inquiry
          </Link>
        </div>
      </section>
    </div>
  );
}
