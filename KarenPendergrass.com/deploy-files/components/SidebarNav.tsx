'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
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

export default function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* ─── Hamburger trigger ─── */}
      <button
        onClick={toggle}
        className="fixed top-7 left-7 z-[1000] w-12 h-12 flex flex-col items-center justify-center gap-[5px] rounded-xl border cursor-pointer transition-all duration-400"
        style={{
          borderColor: isOpen ? 'var(--color-accent)' : 'var(--color-border)',
          background: isOpen ? 'rgba(0,0,0,0.3)' : 'rgba(250,250,248,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: isOpen
            ? '0 0 30px rgba(184,101,46,0.15)'
            : '0 2px 8px rgba(0,0,0,0.04)',
        }}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
      >
        <span
          className="block w-5 transition-all duration-300"
          style={{
            height: '1.5px',
            backgroundColor: isOpen ? '#fff' : 'var(--color-ink)',
            transform: isOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
            transformOrigin: 'center',
          }}
        />
        <span
          className="block w-5 transition-all duration-300"
          style={{
            height: '1.5px',
            backgroundColor: isOpen ? '#fff' : 'var(--color-ink)',
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? 'scaleX(0)' : 'none',
          }}
        />
        <span
          className="block w-5 transition-all duration-300"
          style={{
            height: '1.5px',
            backgroundColor: isOpen ? '#fff' : 'var(--color-ink)',
            transform: isOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
            transformOrigin: 'center',
          }}
        />
      </button>

      {/* ─── Overlay ─── */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 z-[900] transition-opacity duration-500"
        style={{
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
        }}
      />

      {/* ─── Sidebar ─── */}
      <nav
        className="fixed top-0 left-0 h-dvh z-[950] flex flex-col sm:flex-row overflow-hidden"
        style={{
          width: 'min(480px, 100vw)',
          background: '#0a0a09',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* ─── Image Column ─── */}
        <div className="relative overflow-hidden flex-shrink-0 sm:w-[45%] h-[35vh] sm:h-full">
          <Image
            src="/images/Karen_Pendergrass.png"
            alt="Karen Pendergrass"
            fill
            className="object-cover object-top"
            style={{
              filter: isOpen ? 'grayscale(0%) contrast(1.05)' : 'grayscale(15%) contrast(1.05)',
              transition: 'filter 0.6s ease',
            }}
            sizes="(max-width: 640px) 100vw, 216px"
            priority
          />
          {/* Scan-line overlay */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(184,101,46,0.03) 50%, transparent 100%)',
              backgroundSize: '100% 4px',
              animation: 'sidebar-scanlines 8s linear infinite',
            }}
          />
          {/* Bottom gradient fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none z-[2] sm:block hidden"
            style={{
              background: 'linear-gradient(to top, #0a0a09 0%, transparent 100%)',
            }}
          />
          {/* Right edge fade for desktop */}
          <div
            className="absolute top-0 bottom-0 right-0 w-[30%] pointer-events-none z-[2] hidden sm:block"
            style={{
              background: 'linear-gradient(to left, #0a0a09 0%, transparent 100%)',
            }}
          />
        </div>

        {/* ─── Nav Column ─── */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-7 sm:pl-5 py-6 sm:py-12 relative overflow-y-auto">
          {/* Accent line */}
          <div
            className="absolute top-[10%] bottom-[10%] left-0 w-px hidden sm:block"
            style={{
              background: 'linear-gradient(to bottom, transparent, var(--color-accent) 30%, var(--color-accent) 70%, transparent)',
              opacity: 0.3,
            }}
          />

          {/* Corner brackets */}
          <div
            className="absolute top-5 right-5 w-4 h-4 pointer-events-none"
            style={{
              borderTop: '1px solid var(--color-accent)',
              borderRight: '1px solid var(--color-accent)',
              opacity: 0.15,
            }}
          />
          <div
            className="absolute bottom-5 left-5 w-4 h-4 pointer-events-none hidden sm:block"
            style={{
              borderBottom: '1px solid var(--color-accent)',
              borderLeft: '1px solid var(--color-accent)',
              opacity: 0.15,
            }}
          />

          {/* Nav links */}
          <ul className="flex flex-col gap-0.5">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1)`,
                  transitionDelay: isOpen ? `${0.15 + i * 0.05}s` : '0s',
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-3 py-3 px-4 rounded-lg relative overflow-hidden transition-all duration-300"
                  style={{
                    color: isActive(link.href) ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.05rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                  }}
                >
                  {/* Hover glow bar */}
                  <span
                    className="absolute left-0 top-1/2 w-0.5 rounded-sm transition-transform duration-300 group-hover:scale-y-100"
                    style={{
                      height: '60%',
                      transform: 'translateY(-50%) scaleY(0)',
                      background: 'var(--color-accent)',
                      boxShadow: '0 0 8px rgba(184,101,46,0.15)',
                    }}
                  />
                  {/* Active indicator */}
                  {isActive(link.href) && (
                    <span
                      className="absolute left-0 top-1/2 w-0.5 rounded-sm"
                      style={{
                        height: '60%',
                        transform: 'translateY(-50%)',
                        background: 'var(--color-accent)',
                        boxShadow: '0 0 8px rgba(184,101,46,0.3)',
                      }}
                    />
                  )}
                  <span
                    className="text-[0.65rem] tracking-widest min-w-[20px] transition-colors duration-300 group-hover:text-[var(--color-accent)]"
                    style={{
                      color: isActive(link.href)
                        ? 'var(--color-accent)'
                        : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="transition-colors duration-300 group-hover:text-white">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div
            className="mt-8 pt-6"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: isOpen ? '0.55s' : '0s',
            }}
          >
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-lg text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, var(--color-accent), rgba(184,101,46,0.8))',
                fontFamily: 'var(--font-display)',
                fontSize: '0.9rem',
                fontWeight: 500,
                letterSpacing: '0.03em',
              }}
            >
              Start a conversation
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>

          {/* Email */}
          <div
            style={{
              marginTop: '16px',
              opacity: isOpen ? 1 : 0,
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: isOpen ? '0.6s' : '0s',
            }}
          >
            <a
              href="mailto:hola@karenpendergrass.com"
              className="text-xs tracking-widest transition-colors duration-300 hover:text-[var(--color-accent)]"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              hola@karenpendergrass.com
            </a>
          </div>

          {/* Status dot */}
          <div
            className="absolute bottom-7 right-7 w-1.5 h-1.5 rounded-full"
            style={{
              background: 'var(--color-accent)',
              boxShadow: '0 0 8px rgba(184,101,46,0.15)',
              animation: 'sidebar-pulse 3s ease-in-out infinite',
            }}
          />
        </div>
      </nav>

      {/* Keyframe animations */}
      <style jsx global>{`
        @keyframes sidebar-scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 200%; }
        }
        @keyframes sidebar-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
}
