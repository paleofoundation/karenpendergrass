import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a conversation with Karen Pendergrass. Reach out for advisory, speaking, research collaboration, or general inquiries.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="page-enter min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-medium tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            Start a <span className="text-accent">conversation</span>
          </h1>
          <p className="text-ink-secondary text-lg leading-relaxed max-w-lg">
            Whether it&rsquo;s advisory work, a speaking engagement, research
            collaboration, or something else entirely &mdash; I&rsquo;d like to
            hear from you.
          </p>
        </div>

        {/* Form */}
        <ContactForm />

        {/* Direct email fallback */}
        <div className="mt-10 pt-7 border-t border-border">
          <p className="text-sm text-ink-muted">
            Prefer email? Reach me directly at{' '}
            <a
              href="mailto:hola@karenpendergrass.com"
              className="text-accent hover:text-accent-dark transition-colors"
            >
              hola@karenpendergrass.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
