import type { Metadata } from 'next';
import SectionHeader from '@/components/SectionHeader';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Karen Pendergrass for speaking, advisory, research collaboration, or consulting inquiries.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="page-enter max-w-3xl mx-auto px-6 pt-16 pb-20">
      <SectionHeader
        label="Contact"
        title="Get in touch"
        description="For speaking inquiries, advisory board positions, research collaboration, or consulting on food safety certification."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact info */}
        <div>
          <div className="mb-8">
            <h3
              className="text-sm font-semibold uppercase tracking-widest text-ink-muted mb-3"
              style={{ letterSpacing: '0.1em' }}
            >
              Email
            </h3>
            <a
              href="mailto:karen@paleofoundation.com"
              className="text-accent link-animate"
            >
              karen@paleofoundation.com
            </a>
          </div>

          <div className="mb-8">
            <h3
              className="text-sm font-semibold uppercase tracking-widest text-ink-muted mb-3"
              style={{ letterSpacing: '0.1em' }}
            >
              Location
            </h3>
            <p className="text-ink-light">Parekklisia, Cyprus</p>
          </div>

          <div className="mb-8">
            <h3
              className="text-sm font-semibold uppercase tracking-widest text-ink-muted mb-3"
              style={{ letterSpacing: '0.1em' }}
            >
              Organizations
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { name: 'Paleo Foundation', url: 'https://paleofoundation.com' },
                { name: 'Microbiome Medicine', url: 'https://microbiomemedicine.com' },
                { name: 'Journal of Food Metallomics', url: 'https://microbialmetallomics.com' },
                { name: 'WikiBiome', url: 'https://wikibiome.com' },
                { name: 'Tinies', url: 'https://tinies.app' },
                { name: 'Gardens of St. Gertrude', url: 'https://gardensofstgertrude.com' },
              ].map((org) => (
                <a
                  key={org.name}
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-light hover:text-accent transition-colors"
                >
                  {org.name} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* I'm available for */}
        <div className="bg-paper-warm rounded-lg border border-ink/5 p-6">
          <h3
            className="text-sm font-semibold uppercase tracking-widest text-ink-muted mb-4"
            style={{ letterSpacing: '0.1em' }}
          >
            Available for
          </h3>
          <div className="flex flex-col gap-4 text-sm text-ink-light leading-relaxed">
            <div>
              <p className="font-medium text-ink">Advisory Boards</p>
              <p>Microbiome science, food safety, regulatory strategy, and AI-first operations.</p>
            </div>
            <div>
              <p className="font-medium text-ink">Speaking</p>
              <p>Conferences, podcasts, and panels on microbiome-targeted interventions, metallomics, and certification design.</p>
            </div>
            <div>
              <p className="font-medium text-ink">Research Collaboration</p>
              <p>Microbiome signatures, microbial metallomics, and translational medicine frameworks.</p>
            </div>
            <div>
              <p className="font-medium text-ink">Consulting</p>
              <p>Food safety certification program design and ALARA-based standards development.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
