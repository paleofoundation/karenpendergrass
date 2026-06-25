'use client';

import { useState } from 'react';

interface CitationBlockProps {
  title: string;
  date: string;
  slug: string;
  /** Citation author segment (defaults to "Pendergrass, K."). */
  author?: string;
  /** Optional "Directed by" attribution appended after the title. */
  directedBy?: string;
}

export default function CitationBlock({
  title,
  date,
  slug,
  author = 'Pendergrass, K.',
  directedBy,
}: CitationBlockProps) {
  const [copied, setCopied] = useState(false);
  const year = new Date(date).getFullYear();
  const url = `https://karenpendergrass.com/writing/${slug}`;

  const direction = directedBy ? ` Directed by ${directedBy}.` : '';
  const citation = `${author} (${year}). ${title}.${direction} karenpendergrass.com. ${url}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="bg-paper-warm rounded-lg border border-ink/5 p-5">
      <div className="flex items-center justify-between mb-2">
        <p
          className="text-xs font-semibold uppercase tracking-widest text-ink-muted"
          style={{ letterSpacing: '0.1em' }}
        >
          Cite this article
        </p>
        <button
          onClick={handleCopy}
          className="text-xs text-accent font-medium hover:underline"
        >
          {copied ? 'Copied!' : 'Copy citation'}
        </button>
      </div>
      <p className="text-xs text-ink-light leading-relaxed font-mono">
        {citation}
      </p>
    </div>
  );
}
