import Link from 'next/link';

const footerSections = [
  {
    title: 'Navigate',
    links: [
      { href: '/about', label: 'About' },
      { href: '/ventures', label: 'Ventures' },
      { href: '/writing', label: 'Writing' },
      { href: '/research', label: 'Research' },
    ],
  },
  {
    title: 'Projects',
    links: [
      { href: 'https://paleofoundation.com', label: 'Paleo Foundation', external: true },
      { href: 'https://microbiomemedicine.com', label: 'Microbiome Medicine', external: true },
      { href: 'https://microbialmetallomics.com', label: 'Journal of Food Metallomics', external: true },
      { href: 'https://tinies.app', label: 'Tinies', external: true },
      { href: 'https://gardensofstgertrude.com', label: 'Gardens of St. Gertrude', external: true },
    ],
  },
  {
    title: 'Connect',
    links: [
      { href: '/contact', label: 'Contact' },
      { href: '/speaking', label: 'Speaking & Advisory' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/5 bg-paper-warm mt-20">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <p
              className="text-lg font-medium text-ink mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Karen Pendergrass
            </p>
            <p className="text-sm text-ink-muted leading-relaxed">
              Standards developer, microbiome signatures researcher, and founder.
              Based in Cyprus.
            </p>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <p
                className="text-xs font-semibold text-ink-muted uppercase tracking-widest mb-4"
                style={{ letterSpacing: '0.12em' }}
              >
                {section.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {'external' in link ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-ink-light hover:text-accent transition-colors"
                      >
                        {link.label}
                        <span className="text-ink-muted ml-1 text-xs">&nearr;</span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-ink-light hover:text-accent transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-ink/5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-ink-muted">
            &copy; {new Date().getFullYear()} Karen Pendergrass. All rights reserved.
          </p>
          <p className="text-xs text-ink-muted">
            Parekklisia, Cyprus
          </p>
        </div>
      </div>
    </footer>
  );
}
