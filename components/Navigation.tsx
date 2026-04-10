'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#fafaf8]/90 backdrop-blur-xl shadow-sm'
            : 'bg-transparent'
        }`}
        style={{ borderBottom: isScrolled ? '1px solid var(--color-border-light)' : '1px solid transparent' }}
      >
        <nav className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-baseline gap-1.5">
            <span
              className="text-xl font-medium tracking-[0.18em]"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
            >
              KP
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-[11px] tracking-[0.12em] uppercase transition-all duration-300 relative pb-1 ${
                    isActive(link.href)
                      ? 'text-amber-700 font-medium'
                      : 'text-neutral-500 hover:text-neutral-900 font-normal'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-600" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-5 h-[1px] bg-neutral-900 transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-[4px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1px] bg-neutral-900 transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-[3px]' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#fafaf8] lg:hidden">
          <div className="flex flex-col justify-center min-h-screen px-8 py-20">
            <ul className="space-y-6">
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  style={{
                    animationDelay: `${index * 40}ms`,
                    animationFillMode: 'both',
                  }}
                  className="animate-slide-up"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-2xl font-light tracking-[0.06em] uppercase transition-all duration-300 ${
                      isActive(link.href)
                        ? 'text-amber-700'
                        : 'text-neutral-800 hover:text-amber-600'
                    }`}
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    <span className="text-xs font-mono text-neutral-400 mr-4">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
