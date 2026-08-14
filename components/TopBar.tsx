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
        background: scrolled ? 'rgba(6,17,14,0.92)' : 'var(--color-ink-deep)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(238,247,233,0.14)',
      }}
    >
      {/* pl clears the floating hamburger (SidebarNav) at top-left */}
      <div className="max-w-[1400px] mx-auto h-16 flex items-center justify-between pl-[5.25rem] pr-6 md:pr-12">
        {/* Brand wordmark → home */}
        <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="Karen Pendergrass — home">
          <strong className="grid place-items-center w-9 h-9 text-[13px] tracking-[-0.08em]" style={{ background: 'var(--color-accent)', color: 'var(--color-ink-deep)', fontFamily: 'var(--font-mono)' }}>KP</strong>
          <span className="text-[10px] font-semibold leading-[1.05] tracking-[0.14em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-bg)' }}>KAREN<br />PENDERGRASS</span>
        </Link>

        {/* Desktop primary nav + CTA */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[12px] uppercase tracking-[0.12em] transition-colors duration-200 relative py-1"
              style={{ color: isActive(link.href) ? 'var(--color-accent)' : 'rgba(238,247,233,0.58)', fontFamily: 'var(--font-mono)' }}
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
            className="inline-flex items-center px-4 py-2 text-[11px] font-semibold tracking-[0.1em] transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-ink-deep)', fontFamily: 'var(--font-mono)' }}
          >
            Contact
          </Link>
        </nav>
      </div>
    </div>
  );
}
