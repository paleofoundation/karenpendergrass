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
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-amber-50/80 backdrop-blur-md border-b border-neutral-900/10'
            : 'bg-transparent border-b border-neutral-900/5'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-baseline gap-2">
            <span
              className="font-display text-2xl font-light text-neutral-950 tracking-[0.15em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              KP
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-xs font-light tracking-[0.12em] uppercase transition-all duration-300 relative pb-1 ${
                    isActive(link.href)
                      ? 'text-amber-700'
                      : 'text-neutral-900/70 hover:text-amber-600'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-px bg-amber-600 transition-all duration-300" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 transition-opacity"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-6 h-px bg-neutral-950 transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-neutral-950 transition-opacity duration-300 ${
                mobileOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-6 h-px bg-neutral-950 transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu - Full Screen Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-amber-50/95 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
          style={{ top: '100%' }}
        >
          <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
            <ul className="w-full max-w-sm space-y-8">
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'both',
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-2xl font-light tracking-[0.08em] uppercase transition-all duration-300 pb-1 ${
                      isActive(link.href)
                        ? 'text-amber-700'
                        : 'text-neutral-900/80 hover:text-amber-600'
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="block h-px bg-amber-600 mt-2" />
                    )}
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
