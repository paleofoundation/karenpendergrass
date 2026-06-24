'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

export interface SearchItem {
  title: string;
  slug: string;
  rawDate: string;
  dateLabel: string;
  category: string;
  categoryLabel: string;
  excerpt: string;
  tags: string[];
  author: string;
  readingTime: string;
}

function ResultCard({ item }: { item: SearchItem }) {
  return (
    <article className="group py-6 border-b border-ink/5 last:border-b-0">
      <Link href={`/writing/${item.slug}`} className="block">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span
            className="text-xs font-semibold uppercase tracking-widest text-accent"
            style={{ letterSpacing: '0.1em' }}
          >
            {item.categoryLabel}
          </span>
          <span className="text-ink-muted text-xs">&middot;</span>
          <time className="text-xs text-ink-muted">{item.dateLabel}</time>
          <span className="text-ink-muted text-xs">&middot;</span>
          <span className="text-xs text-ink-muted">{item.readingTime}</span>
        </div>
        <h3
          className="text-lg font-medium text-ink group-hover:text-accent transition-colors mb-1.5"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {item.title}
        </h3>
        <p className="text-sm text-ink-light leading-relaxed line-clamp-2">{item.excerpt}</p>
      </Link>
    </article>
  );
}

export default function WritingSearch({
  items,
  categories,
}: {
  items: SearchItem[];
  categories: { name: string; label: string; count: number }[];
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // "/" focuses the search box, like a proper editorial archive.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !e.metaKey &&
        !e.ctrlKey &&
        !(document.activeElement instanceof HTMLInputElement) &&
        !(document.activeElement instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const q = query.trim().toLowerCase();
  const terms = q ? q.split(/\s+/) : [];

  const results = useMemo(() => {
    if (!terms.length) return items;
    return items.filter((item) => {
      const haystack = [
        item.title,
        item.excerpt,
        item.categoryLabel,
        item.author,
        ...item.tags,
      ]
        .join(' ')
        .toLowerCase();
      return terms.every((t) => haystack.includes(t));
    });
  }, [items, terms]);

  // Default (no query): grouped by category, preserving newest-first order.
  const grouped = useMemo(() => {
    const map = new Map<string, SearchItem[]>();
    for (const item of items) {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category)!.push(item);
    }
    return map;
  }, [items]);

  const searching = terms.length > 0;

  return (
    <div>
      {/* Search field */}
      <div className="relative mb-10">
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles by title, topic, or tag…"
          aria-label="Search articles"
          className="w-full rounded-xl border border-ink/10 bg-[var(--color-bg-alt)] pl-11 pr-24 py-3.5 text-sm text-ink placeholder:text-ink-muted outline-none transition-colors focus:border-accent/40 focus-visible:border-accent/40"
          style={{ fontFamily: 'var(--font-display)' }}
        />
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="text-xs text-ink-muted hover:text-accent-dark transition-colors"
              aria-label="Clear search"
            >
              Clear
            </button>
          ) : (
            <kbd
              className="hidden sm:inline-block rounded border border-ink/15 px-1.5 py-0.5 text-[10px] font-medium text-ink-muted"
              aria-hidden="true"
            >
              /
            </kbd>
          )}
        </div>
      </div>

      {searching ? (
        <section>
          <p className="text-sm text-ink-muted mb-4">
            {results.length === 0
              ? 'No matches'
              : `${results.length} result${results.length !== 1 ? 's' : ''}`}{' '}
            for &ldquo;{query.trim()}&rdquo;
          </p>
          {results.length === 0 ? (
            <p className="text-ink-light py-8">
              Nothing matched that. Try a broader term, a tag, or{' '}
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-accent-dark underline underline-offset-2 hover:text-accent"
              >
                browse everything
              </button>
              .
            </p>
          ) : (
            <div>
              {results.map((item) => (
                <ResultCard key={item.slug} item={item} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Category overview */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href={`#${cat.name}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ink/10 text-xs font-medium text-ink-light hover:border-accent/30 hover:text-accent transition-colors"
              >
                <span>{cat.label}</span>
                <span className="text-ink-muted">{cat.count}</span>
              </a>
            ))}
          </div>

          {/* All posts, grouped by category */}
          {Array.from(grouped.entries()).map(([category, catItems]) => (
            <section key={category} id={category} className="mb-14">
              <h3
                className="text-lg font-medium text-ink mb-1 scroll-mt-24"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {catItems[0]?.categoryLabel || category}
              </h3>
              <p className="text-sm text-ink-muted mb-4">
                {catItems.length} article{catItems.length !== 1 ? 's' : ''}
              </p>
              <div>
                {catItems.map((item) => (
                  <ResultCard key={item.slug} item={item} />
                ))}
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
}
