'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Primary links surfaced in the top bar (desktop). The full list lives in the
// slide-out SidebarNav, opened via the floating hamburger at top-left.
const primaryLinks = [
  { href: '/about', label: 'About' },
  { href: '/ventures', label: 'Ventures' },
  { href: '/frameworks', label: 'Frameworks' },
  { href: '/writing', label: 'Writing' },
  { href: '/receipts', label: 'Receipts' },
  { href: '/advisory', label: 'Advisory' },
];

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div
      className="sticky top-0 z-[40] transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(var(--color-bg-rgb), 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled
          ? '1px solid var(--color-border-light)'
          : '1px solid transparent',
      }}
    >
      {/* pl clears the floating hamburger (SidebarNav) at top-left */}
      <div className="max-w-[1400px] mx-auto h-16 flex items-center justify-between pl-[5.25rem] pr-6 md:pr-12">
        {/* Brand wordmark → home */}
        <Link href="/" className="group inline-flex items-baseline gap-1.5" aria-label="Karen Pendergrass — home">
          <span
            className="text-base md:text-lg font-medium tracking-[0.02em]"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
          >
            Karen Pendergrass
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-125"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
        </Link>

        {/* Desktop primary nav + CTA */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[12px] uppercase tracking-[0.12em] transition-colors duration-200 relative py-1"
              style={{ color: isActive(link.href) ? 'var(--color-ink)' : 'var(--color-ink-muted)' }}
            >
              {link.label}
              {isActive(link.href) && (
                <span
                  className="absolute left-0 right-0 bottom-0 h-[2px] rounded-sm"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                />
              )}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-2 text-[12px] font-medium tracking-wide rounded-md transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: 'var(--color-ink)', color: '#fff' }}
          >
            Contact
          </Link>
        </nav>
      </div>
    </div>
  );
}
