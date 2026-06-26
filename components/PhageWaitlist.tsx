'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'done' | 'error';

const ROLES = [
  'Clinician',
  'Patient / caregiver',
  'Researcher',
  'Investor',
  'Industry / partner',
  'Other',
];

// Interest-capture for phagecocktails.com. Mirrors the live site's role-based
// waitlist and routes to the working contact API (Resend → karen@paleofoundation.com).
export default function PhageWaitlist() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(ROLES[0]);
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Phage waitlist — ${role}`,
          email,
          subject: 'Phage Cocktails waitlist signup',
          message: `Phage Cocktails interest registration.\nRole: ${role}\nEmail: ${email}\n\nThis is interest registration only — not a request for treatment.`,
          company: '',
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
      <div className="rounded-lg border border-ink/10 bg-surface p-6 text-center">
        <p
          className="text-base font-medium text-ink"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          You&rsquo;re on the list.
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          I&rsquo;ll route you updates as this gets built. Interest registration only &mdash; not a request for treatment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-ink/10 bg-surface p-6">
      <p
        className="text-sm font-medium text-ink mb-1"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Join the phage cocktails waitlist
      </p>
      <p className="text-xs text-ink-muted mb-4">
        Tell me who you are and I&rsquo;ll send the right updates as this is built. No spam.
      </p>

      <span className="block text-[11px] font-semibold uppercase tracking-widest text-ink-muted mb-2">
        I am a&hellip;
      </span>
      <div className="flex flex-wrap gap-2 mb-4">
        {ROLES.map((r) => {
          const selected = role === r;
          return (
            <button
              type="button"
              key={r}
              onClick={() => setRole(r)}
              aria-pressed={selected}
              className="text-xs px-3 py-1.5 rounded-full border transition-colors"
              style={
                selected
                  ? {
                      borderColor: 'var(--color-accent)',
                      background: 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
                      color: 'var(--color-accent-dark)',
                    }
                  : { borderColor: 'var(--color-border)', color: 'var(--color-ink-muted)' }
              }
            >
              {r}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading'}
          className="flex-1 px-3 py-2 text-sm border border-ink/10 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent placeholder:text-ink-muted/50 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-5 py-2 bg-ink text-paper text-xs font-medium rounded-md hover:opacity-90 transition-opacity shrink-0 disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending…' : 'Join the waitlist'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-xs text-ink-muted mt-2">
          Something went wrong. Please try again in a moment.
        </p>
      )}
    </form>
  );
}
