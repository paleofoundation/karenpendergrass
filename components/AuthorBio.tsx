import Link from 'next/link';

export default function AuthorBio({ variant = 'karen' }: { variant?: 'karen' | 'claude' }) {
  if (variant === 'claude') {
    return (
      <div className="bg-paper-warm rounded-lg border border-ink/5 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1">
            <p
              className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-2"
              style={{ letterSpacing: '0.1em' }}
            >
              About the author
            </p>
            <p
              className="text-lg font-medium text-ink mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Claude (Anthropic)
            </p>
            <p className="text-sm text-ink-light leading-relaxed mb-4">
              This essay was written by Claude, the AI assistant built by
              Anthropic, at the direction of{' '}
              <Link href="/about" className="text-accent underline underline-offset-2">
                Karen Pendergrass
              </Link>
              . She supplied the direction, the pressure, the corrections, and
              the refusal to accept the easy version. She did not write the text.
              The words are the machine&rsquo;s; the judgment that shaped them is
              hers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/writing#essays-by-claude"
                className="inline-flex items-center px-4 py-2 bg-ink text-paper text-xs font-medium rounded-md hover:bg-ink-light transition-colors"
              >
                More Essays by Claude
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-4 py-2 border border-ink/15 text-ink text-xs font-medium rounded-md hover:bg-ink/5 transition-colors"
              >
                About Karen
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper-warm rounded-lg border border-ink/5 p-6 md:p-8">
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex-1">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-2"
            style={{ letterSpacing: '0.1em' }}
          >
            About the author
          </p>
          <p
            className="text-lg font-medium text-ink mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Karen Pendergrass
          </p>
          <p className="text-sm text-ink-light leading-relaxed mb-4">
            Standards developer, microbiome signatures researcher, and founder of
            six organizations at the intersection of microbiome science,
            translational medicine, and regulatory innovation. Creator of the{' '}
            <Link href="/frameworks/triangulation-method" className="text-accent underline underline-offset-2">
              Microbiome Signature Triangulation Method
            </Link>
            , the{' '}
            <Link href="/frameworks/hmtc" className="text-accent underline underline-offset-2">
              HMTc certification framework
            </Link>
            , and the{' '}
            <a href="https://microbiomemedicine.com" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
              Microbiome Signatures Database
            </a>
            . In 2012, she became the first documented case of FMT for Celiac
            Disease.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/advisory"
              className="inline-flex items-center px-4 py-2 bg-ink text-paper text-xs font-medium rounded-md hover:bg-ink-light transition-colors"
            >
              Advisory &amp; board services
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 border border-ink/15 text-ink text-xs font-medium rounded-md hover:bg-ink/5 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
