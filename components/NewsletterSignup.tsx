'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire to newsletter provider (ConvertKit, Buttondown, etc.)
    // For now, just show success state
    if (email) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="border border-sage/20 bg-sage/5 rounded-lg p-5 text-center">
        <p className="text-sm font-medium text-sage-dark">Thanks for subscribing.</p>
        <p className="text-xs text-ink-muted mt-1">New research and frameworks delivered as published.</p>
      </div>
    );
  }

  return (
    <div className="border border-ink/5 rounded-lg p-5">
      <p
        className="text-sm font-medium text-ink mb-1"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Get new research as I publish it
      </p>
      <p className="text-xs text-ink-muted mb-3">
        Frameworks, case studies, and STOP recommendations. No spam.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-3 py-2 text-sm border border-ink/10 rounded-md bg-white focus:outline-none focus:border-accent/40 placeholder:text-ink-muted/50"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-ink text-paper text-xs font-medium rounded-md hover:bg-ink-light transition-colors shrink-0"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
