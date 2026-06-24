'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { SOCIAL_LINKS } from './SocialLinks';

interface Heading {
  id: string;
  text: string;
  level: number;
}

/** Mirror the slug logic used by the inline TOC so anchors line up. */
function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  for (const line of markdown.split('\n')) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;
    const level = match[1].length;
    const text = match[2].replace(/\*\*/g, '').replace(/\*/g, '').trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    headings.push({ id, text, level });
  }
  return headings;
}

// Short, monochrome text labels — the "[ln] [tw] [ig]" treatment.
const SOCIAL_TAGS: Record<string, string> = {
  LinkedIn: 'Ln',
  Facebook: 'Fb',
  Instagram: 'Ig',
  X: 'X',
};

// Hyper-curated, hand-picked flagship work — deliberately NOT auto "recent posts".
const SELECTED_WORK = [
  {
    href: '/frameworks/microbial-metallomics',
    kicker: 'Framework',
    label: 'Microbial Metallomics',
  },
  {
    href: '/writing/certification-framework-infant-foods-heavy-metals',
    kicker: 'Analysis',
    label: 'A Certification Framework for Safer Infant Foods',
  },
  {
    href: '/writing/nickel-necrotizing-enterocolitis',
    kicker: 'Research',
    label: 'Nickel & Necrotizing Enterocolitis',
  },
];

export default function ArticleSidebar({
  content,
  currentSlug,
}: {
  content: string;
  currentSlug: string;
}) {
  const headings = useMemo(() => extractHeadings(content), [content]);
  const showToc = headings.length >= 3;
  const [activeId, setActiveId] = useState<string>('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!showToc) return;
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -68% 0px', threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings, showToc]);

  const visibleHeadings = showAll ? headings : headings.slice(0, 7);
  const work = SELECTED_WORK.filter((w) => !w.href.endsWith(`/${currentSlug}`)).slice(0, 3);

  return (
    <div
      className="flex flex-col text-[var(--color-ink)]"
      style={{ fontFamily: 'var(--font-sans, inherit)' }}
    >
      {/* ─── Placard: portrait + thesis ─── */}
      <div className="flex items-start gap-4">
        <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden rounded-full ring-1 ring-[var(--color-border-light)]">
          <Image
            src="/images/Karen_Pendergrass.png"
            alt="Karen Pendergrass"
            fill
            className="object-cover object-top transition-[filter] duration-300 ease-out hover:grayscale-0"
            style={{ filter: 'grayscale(100%) contrast(1.03)' }}
            sizes="56px"
          />
        </div>
        <div className="min-w-0 pt-0.5">
          <p
            className="text-[0.95rem] leading-tight font-medium"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
          >
            Karen Pendergrass
          </p>
          <p
            className="text-[0.7rem] mt-1 tracking-wide"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            Standards architect · Microbial metallomics
          </p>
        </div>
      </div>

      <p
        className="mt-5 text-[1.02rem] leading-snug"
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          color: 'var(--color-ink-light)',
        }}
      >
        “I work years ahead of the field, then wait for it to catch up.”
      </p>

      {/* ─── Table of contents (scroll-spy) ─── */}
      {showToc && (
        <nav className="mt-9 pt-7" style={{ borderTop: '1px solid var(--color-border-light)' }}>
          <p className="cc-eyebrow text-[10px] mb-4" style={{ color: 'var(--color-accent-dark)' }}>
            In this piece
          </p>
          <ul className="flex flex-col">
            {visibleHeadings.map((h, i) => {
              const active = activeId === h.id;
              return (
                <li key={`${h.id}-${i}`}>
                  <a
                    href={`#${h.id}`}
                    className="group flex items-start gap-2.5 py-[5px] transition-colors duration-150"
                    style={{
                      paddingLeft: h.level === 3 ? '0.9rem' : 0,
                      color: active ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] h-px flex-shrink-0 transition-all duration-150"
                      style={{
                        width: active ? '14px' : '7px',
                        background: active ? 'var(--color-accent)' : 'var(--color-border)',
                      }}
                    />
                    <span
                      className="text-[0.8rem] leading-snug transition-colors duration-150 group-hover:text-[var(--color-ink)]"
                      style={{ fontWeight: active ? 500 : 400 }}
                    >
                      {h.text}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          {headings.length > 7 && (
            <button
              onClick={() => setShowAll((v) => !v)}
              className="text-[0.7rem] mt-3 tracking-wide transition-colors duration-150 hover:text-[var(--color-accent-dark)]"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              {showAll ? 'Show less' : `All ${headings.length} sections`}
            </button>
          )}
        </nav>
      )}

      {/* ─── Selected work ─── */}
      {work.length > 0 && (
        <div className="mt-9 pt-7" style={{ borderTop: '1px solid var(--color-border-light)' }}>
          <p className="cc-eyebrow text-[10px] mb-4" style={{ color: 'var(--color-accent-dark)' }}>
            Selected work
          </p>
          <ul className="flex flex-col gap-4">
            {work.map((w) => (
              <li key={w.href}>
                <Link href={w.href} className="group block">
                  <span
                    className="block text-[0.62rem] uppercase tracking-[0.18em] mb-1"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    {w.kicker}
                  </span>
                  <span
                    className="block text-[0.86rem] leading-snug transition-colors duration-150 group-hover:text-[var(--color-accent-dark)]"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                  >
                    {w.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ─── Single boutique CTA ─── */}
      <div className="mt-9 pt-7" style={{ borderTop: '1px solid var(--color-border-light)' }}>
        <p
          className="text-[0.92rem] leading-snug mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink-light)' }}
        >
          Now booking a limited number of board &amp; advisory engagements.
        </p>
        <Link
          href="/advisory"
          className="group inline-flex items-center gap-2 text-[0.8rem] font-medium tracking-wide transition-colors duration-150"
          style={{ color: 'var(--color-accent-dark)' }}
        >
          Request an introduction
          <span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
        </Link>
      </div>

      {/* ─── Monochrome social anchors ─── */}
      <div
        className="mt-9 pt-7 flex items-center gap-4"
        style={{ borderTop: '1px solid var(--color-border-light)' }}
      >
        {SOCIAL_LINKS.filter((s) => s.href && s.href !== '#').map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Karen Pendergrass on ${s.label}`}
            className="text-[0.72rem] tracking-[0.12em] uppercase transition-colors duration-150 hover:text-[var(--color-ink)]"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            {SOCIAL_TAGS[s.label] ?? s.label}
          </a>
        ))}
      </div>
    </div>
  );
}
