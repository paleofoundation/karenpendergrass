import Link from 'next/link';

const footerSections = [
  {
    title: 'Navigate',
    links: [
      { href: '/about', label: 'About' },
      { href: '/ventures', label: 'Ventures' },
      { href: '/frameworks', label: 'Frameworks' },
      { href: '/writing', label: 'Writing' },
      { href: '/publications', label: 'Publications' },
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
    <footer className="relative bg-[#111110] text-white overflow-hidden">
      {/* Decorative grid accent — subtle but visible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20 lg:py-24">
        {/* Header */}
        <div className="mb-16 lg:mb-20 pb-12 border-b border-white/10">
          <h2
            className="text-4xl lg:text-5xl font-medium tracking-tight text-white"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            Karen Pendergrass
          </h2>
          <p className="text-sm text-white/50 leading-relaxed mt-4 max-w-2xl">
            Standards developer, microbiome signatures researcher, and founder.
            Based in Cyprus. Available for board and advisory roles.
          </p>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-16 lg:mb-20">
          {/* Navigate Column */}
          <div>
            <h3 className="text-[11px] font-semibold text-white/40 uppercase mb-6 tracking-[0.15em]">
              Navigate
            </h3>
            <ul className="space-y-3">
              {footerSections[0].links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-[11px] font-semibold text-white/40 uppercase mb-6 tracking-[0.15em]">
              Projects
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {footerSections[1].links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200 inline-flex items-center group"
                  >
                    {link.label}
                    <span className="text-white/30 ml-2 text-xs group-hover:text-white/60 transition-colors duration-200">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-[11px] font-semibold text-white/40 uppercase mb-6 tracking-[0.15em]">
              Connect
            </h3>
            <ul className="space-y-3">
              {footerSections[2].links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Karen Pendergrass. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Parekklisia, Cyprus
          </p>
        </div>
      </div>
    </footer>
  );
}
