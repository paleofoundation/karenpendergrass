'use client';

import { useState } from 'react';

interface TOCProps {
  content: string;
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(markdown: string): TOCItem[] {
  const headings: TOCItem[] = [];
  const lines = markdown.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
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
  }

  return headings;
}

export default function TableOfContents({ content }: TOCProps) {
  const [expanded, setExpanded] = useState(false);
  const headings = extractHeadings(content);

  if (headings.length < 3) return null;

  const displayHeadings = expanded ? headings : headings.slice(0, 6);
  const hasMore = headings.length > 6;

  return (
    <nav className="bg-paper-warm rounded-lg border border-ink/5 p-5 mb-8">
      <p
        className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-3"
        style={{ letterSpacing: '0.1em' }}
      >
        In this article
      </p>
      <ol className="flex flex-col gap-1.5">
        {displayHeadings.map((heading, i) => (
          <li key={`${heading.id}-${i}`}>
            <a
              href={`#${heading.id}`}
              className={`text-sm hover:text-accent transition-colors block ${
                heading.level === 3
                  ? 'pl-4 text-ink-muted'
                  : 'text-ink-light font-medium'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
      {hasMore && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="text-xs text-accent font-medium mt-2 hover:underline"
        >
          Show all {headings.length} sections
        </button>
      )}
    </nav>
  );
}
