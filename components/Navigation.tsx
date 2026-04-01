'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/ventures', label: 'Ventures' },
  { href: '/frameworks', label: 'Frameworks' },
  { href: '/publications', label: 'Publications' },
  { href: '/writing', label: 'Writing' },
  { href: '/roundtable', label: 'Roundtable' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/advisory', label: 'Advisory' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-ink/5">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="group flex items-baseline gap-2">
          <span
            className="font-display text-xl font-medium tracking-tight text-ink"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Karen Pendergrass
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="link-animate text-[12.5px] font-medium text-ink-light hover:text-ink transition-colors tracking-wide uppercase"
                style={{ letterSpacing: '0.07em', fontFamily: 'var(--font-body)' }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-ink transition-transform ${mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-ink transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-ink transition-transform ${mobileOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t border-ink/5 bg-paper">
          <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-ink-light hover:text-ink py-1 tracking-wide uppercase"
                  style={{ letterSpacing: '0.08em' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
