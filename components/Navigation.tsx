'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
  { href: '/frameworks', label: 'Frameworks' },
  { href: '/speaking', label: 'Speaking' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-home-rowborder/80 bg-home-cream">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-playfair text-lg md:text-xl font-semibold text-home-ink tracking-tight no-underline hover:opacity-90"
        >
          Karen Pendergrass
        </Link>

        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[13px] font-medium text-home-ink no-underline hover:underline underline-offset-4 decoration-brand-red/80 font-dm"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/advisory"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 bg-brand-red text-white text-xs font-semibold font-dm tracking-wide rounded-sm no-underline hover:opacity-95 transition-opacity"
          >
            Work with me
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-home-ink transition-transform ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`}
            />
            <span className={`block w-5 h-0.5 bg-home-ink transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span
              className={`block w-5 h-0.5 bg-home-ink transition-transform ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}
            />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-home-rowborder/80 bg-home-cream">
          <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3 font-dm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-home-ink py-1 no-underline hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/advisory"
                onClick={() => setMobileOpen(false)}
                className="inline-flex mt-2 items-center justify-center px-4 py-2.5 bg-brand-red text-white text-xs font-semibold tracking-wide rounded-sm no-underline"
              >
                Work with me
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
