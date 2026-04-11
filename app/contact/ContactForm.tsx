'use client';

import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-16">
        <div
          className="w-14 h-14 rounded-full border-2 flex items-center justify-center mx-auto mb-6 text-2xl"
          style={{
            borderColor: 'var(--color-accent)',
            color: 'var(--color-accent)',
            boxShadow: '0 0 24px rgba(184,101,46,0.15)',
          }}
        >
          &#10003;
        </div>
        <h2
          className="text-2xl font-medium mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Message sent
        </h2>
        <p className="text-ink-secondary">
          Thank you for reaching out. I&rsquo;ll get back to you as soon as I can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-name"
            className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Name
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            placeholder="Your name"
            className="w-full px-4 py-3.5 rounded-lg border border-border bg-surface text-ink text-sm outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(184,101,46,0.1)]"
            style={{ fontFamily: 'var(--font-body)' }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-email"
            className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Email
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3.5 rounded-lg border border-border bg-surface text-ink text-sm outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(184,101,46,0.1)]"
            style={{ fontFamily: 'var(--font-body)' }}
          />
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-subject"
          className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Subject
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          defaultValue=""
          className="w-full px-4 py-3.5 rounded-lg border border-border bg-surface text-ink text-sm outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(184,101,46,0.1)] appearance-none cursor-pointer"
          style={{
            fontFamily: 'var(--font-body)',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%237a7a7a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 16px center',
            paddingRight: '44px',
          }}
        >
          <option value="" disabled>
            What&rsquo;s this about?
          </option>
          <option value="advisory">Advisory &amp; Consulting</option>
          <option value="speaking">Speaking Engagement</option>
          <option value="research">Research Collaboration</option>
          <option value="certification">Certification Inquiry</option>
          <option value="media">Media &amp; Press</option>
          <option value="other">Something Else</option>
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell me what's on your mind..."
          className="w-full px-4 py-3.5 rounded-lg border border-border bg-surface text-ink text-sm outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(184,101,46,0.1)] resize-y min-h-[140px]"
          style={{ fontFamily: 'var(--font-body)' }}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="group self-start inline-flex items-center gap-2.5 px-7 py-4 rounded-lg text-white font-medium transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
        style={{
          background: 'linear-gradient(135deg, var(--color-accent), rgba(184,101,46,0.85))',
          fontFamily: 'var(--font-display)',
          fontSize: '0.95rem',
          letterSpacing: '0.03em',
        }}
      >
        {status === 'sending' ? 'Sending...' : 'Send message'}
        <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
          &rarr;
        </span>
      </button>

      {status === 'error' && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try emailing{' '}
          <a href="mailto:hola@karenpendergrass.com" className="underline">
            hola@karenpendergrass.com
          </a>{' '}
          directly.
        </p>
      )}
    </form>
  );
}
