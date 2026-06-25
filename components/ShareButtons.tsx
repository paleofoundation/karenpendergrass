'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
  compact?: boolean;
  /** Raw tags/hashtags; sanitized and attached to the X (Twitter) share intent. */
  hashtags?: string[];
}

export default function ShareButtons({ url, title, compact = false, hashtags = [] }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = `https://karenpendergrass.com${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  // X (Twitter) intent supports &hashtags=a,b,c. Sanitize to alphanumerics,
  // drop the unusably long, de-dupe, and cap so the composer stays clean.
  const cleanHashtags = Array.from(
    new Set(
      hashtags
        .map((t) => t.replace(/[^a-zA-Z0-9]/g, ''))
        .filter((t) => t.length >= 2 && t.length <= 24)
    )
  ).slice(0, 3);
  const hashtagParam = cleanHashtags.length
    ? `&hashtags=${encodeURIComponent(cleanHashtags.join(','))}`
    : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = fullUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const buttonClass = compact
    ? 'inline-flex items-center justify-center w-8 h-8 rounded-full border border-ink/10 text-ink-muted hover:text-accent hover:border-accent/30 transition-colors'
    : 'inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ink/10 text-xs font-medium text-ink-muted hover:text-accent hover:border-accent/30 transition-colors';

  return (
    <div className="flex items-center gap-2">
      {!compact && (
        <span className="text-xs text-ink-muted mr-1">Share</span>
      )}

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        title="Share on LinkedIn"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        {!compact && <span>LinkedIn</span>}
      </a>

      {/* X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${hashtagParam}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        title="Share on X"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        {!compact && <span>X</span>}
      </a>

      {/* Reddit */}
      <a
        href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        title="Share on Reddit"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 18.627 0 12 0zm5.01 13.205c.022.156.033.315.033.476 0 2.432-2.832 4.405-6.327 4.405-3.494 0-6.326-1.973-6.326-4.405 0-.164.012-.325.034-.483a1.387 1.387 0 1 1 1.52-2.243 6.84 6.84 0 0 1 3.71-1.175l.7-3.292a.29.29 0 0 1 .342-.224l2.317.492a.969.969 0 1 1-.094.452l-2.075-.441-.624 2.939a6.83 6.83 0 0 1 3.66 1.18 1.387 1.387 0 1 1 1.524 2.246zM8.16 12.794a.97.97 0 1 0 1.94 0 .97.97 0 0 0-1.94 0zm5.59 2.66c-.532.532-1.555.576-1.855.576-.3 0-1.323-.044-1.854-.576a.203.203 0 0 1 .287-.287c.335.335 1.052.454 1.567.454.516 0 1.233-.119 1.568-.454a.203.203 0 1 1 .287.287zm-.134-1.69a.97.97 0 1 1 0-1.94.97.97 0 0 1 0 1.94z"/>
        </svg>
        {!compact && <span>Reddit</span>}
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        title="Share on Facebook"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        {!compact && <span>Facebook</span>}
      </a>

      {/* Copy link */}
      <button
        onClick={handleCopy}
        className={buttonClass}
        title={copied ? 'Copied!' : 'Copy link'}
      >
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        )}
        {!compact && <span>{copied ? 'Copied!' : 'Copy link'}</span>}
      </button>
    </div>
  );
}
