'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'done' | 'error';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');

    try {
      // Reuse the working contact route (Resend → karen@paleofoundation.com,
      // with a dev-log fallback when RESEND_API_KEY is unset). This delivers the
      // signup to a real inbox instead of silently discarding it.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter subscriber',
          email,
          subject: 'Newsletter signup',
          message: `Newsletter subscription request from ${email}.`,
        }),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div className="border border-sage/20 bg-sage/5 rounded-lg p-5 text-center">
        <p className="text-sm font-medium text-sage-dark">Thanks for subscribing.</p>
        <p className="text-xs text-ink-muted mt-1">
          New research and frameworks delivered as published.
        </p>
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
          disabled={status === 'loading'}
          className="flex-1 px-3 py-2 text-sm border border-ink/10 rounded-md bg-white focus:outline-none focus:border-accent/40 placeholder:text-ink-muted/50 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 bg-ink text-paper text-xs font-medium rounded-md hover:bg-ink-light transition-colors shrink-0 disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending…' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-xs text-ink-muted mt-2">
          Something went wrong. Email{' '}
          <a href="mailto:hola@karenpendergrass.com" className="underline">
            hola@karenpendergrass.com
          </a>{' '}
          and I&apos;ll add you.
        </p>
      )}
    </div>
  );
}
