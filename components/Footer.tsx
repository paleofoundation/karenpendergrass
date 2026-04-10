import Link from 'next/link';

const footerSections = [
  {
    title: 'Navigate',
    links: [
      { href: '/about', label: 'About' },
      { href: '/ventures', label: 'Ventures' },
      { href: '/frameworks', label: 'Frameworks' },
      { href: '/writing', label: 'Writing' },
      { href: '/research', label: 'Research' },
      { href: '/advisory', label: 'Advisory & Board' },
    ],
  },
  {
    title: 'Projects',
    links: [
      { href: 'https://paleofoundation.com', label: 'Paleo Foundation', external: true },
      { href: 'https://microbiomemedicine.com', label: 'Microbiome Medicine', external: true },
      { href: 'https://microbialmetallomics.com', label: 'Journal of Food Metallomics', external: true },
      { href: 'https://heavymetaltested.com', label: 'Heavy Metal Tested', external: true },
      { href: 'https://wikibiome.com', label: 'WikiBiome', external: true },
      { href: 'https://tinies.app', label: 'Tinies', external: true },
      { href: 'https://gardensofstgertrude.com', label: 'Gardens of St. Gertrude', external: true },
    ],
  },
  {
    title: 'Connect',
    links: [
      { href: '/contact', label: 'Contact' },
      { href: '/advisory', label: 'Board & Advisory' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="graph-paper-bg border-t border-gray-300/40 bg-stone-50 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
        {/* Header with Name */}
        <div className="mb-16 lg:mb-20 pb-12 border-b border-gray-300/40">
          <h2
            className="text-4xl lg:text-5xl font-bold text-gray-950 tracking-tight"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            Karen Pendergrass
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mt-4 max-w-2xl">
            Standards developer, microbiome signatures researcher, and founder.
            Based in Cyprus. Available for board and advisory roles.
          </p>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-16 lg:mb-20">
          {/* Navigate Column */}
          <div>
            <h3 className="text-xs font-semibold text-gray-700 uppercase mb-6 tracking-wider">
              Navigate
            </h3>
            <ul className="space-y-3">
              {footerSections[0].links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-700 hover:text-amber-700 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-xs font-semibold text-gray-700 uppercase mb-6 tracking-wider">
              Projects
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {footerSections[1].links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-700 hover:text-amber-700 transition-colors duration-200 inline-flex items-center group"
                  >
                    {link.label}
                    <span className="text-gray-400 ml-2 text-xs group-hover:text-amber-700 transition-colors duration-200">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-xs font-semibold text-gray-700 uppercase mb-6 tracking-wider">
              Connect
            </h3>
            <ul className="space-y-3">
              {footerSections[2].links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-700 hover:text-amber-700 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-300/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Karen Pendergrass. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Parekklisia, Cyprus
          </p>
        </div>
      </div>
    </footer>
  );
}
