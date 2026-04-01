import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-home-rowborder/80 bg-home-cream mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-home-ink/70 font-dm">
        <p>
          © {new Date().getFullYear()} Karen Pendergrass · Parekklisia, Cyprus ·{' '}
          <span className="whitespace-nowrap">
            ORCID:{' '}
            <a
              href="https://orcid.org/0000-0002-2348-7259"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-red font-mono text-[11px] no-underline hover:underline"
            >
              0000-0002-2348-7259
            </a>
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a
            href="https://www.linkedin.com/in/karenpendergrass"
            target="_blank"
            rel="noopener noreferrer"
            className="text-home-ink no-underline font-medium hover:underline hover:text-brand-red"
          >
            LinkedIn
          </a>
          <span className="text-home-ink/30 hidden sm:inline" aria-hidden>
            ·
          </span>
          <Link
            href="/publications"
            className="text-home-ink no-underline font-medium hover:underline hover:text-brand-red"
          >
            Publications
          </Link>
          <span className="text-home-ink/30 hidden sm:inline" aria-hidden>
            ·
          </span>
          <Link
            href="/contact"
            className="text-home-ink no-underline font-medium hover:underline hover:text-brand-red"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
