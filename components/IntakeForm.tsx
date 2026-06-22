'use client';

import { useState } from 'react';

const engagementTypes = [
  'Board of Directors / Advisory Board',
  'Scientific Advisory Board',
  'Microbiome Medicine Roundtable',
  'Expert Consultation ($1,500/hr)',
  'Speaking / Keynote',
  'Research Collaboration',
  'HMTc Certification Inquiry',
  'Other',
];

export default function IntakeForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    engagementType: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.organization,
          subject: `${formData.engagementType || 'Engagement'} inquiry — ${formData.organization || formData.name}`,
          message:
            `Role: ${formData.role || '—'}\n` +
            `Engagement type: ${formData.engagementType || '—'}\n\n` +
            `${formData.message || '(no additional details provided)'}`,
        }),
      });
      if (!res.ok) throw new Error('send failed');
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-sage/5 border border-sage/20 rounded-lg p-8 text-center">
        <p
          className="text-lg font-medium text-ink mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Thank you
        </p>
        <p className="text-sm text-ink-light">
          Your inquiry is on its way. I&apos;ll be in touch shortly to find a time for your
          complimentary scoping call.
        </p>
      </div>
    );
  }

  return (
    <div id="intake" className="scroll-mt-24">
      <p
        className="text-xs font-semibold uppercase tracking-widest text-accent mb-4"
        style={{ letterSpacing: '0.1em' }}
      >
        Start the conversation
      </p>
      <p
        className="text-xl font-medium text-ink mb-2"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Schedule a complimentary scoping call
      </p>
      <p className="text-sm text-ink-light mb-6">
        Tell me about your organization and what you're looking for.
        All engagements begin with a 30-minute call at no charge to
        determine fit and define deliverables.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="intake-name" className="block text-xs font-medium text-ink-muted mb-1.5">
              Your name *
            </label>
            <input
              type="text"
              id="intake-name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm border border-ink/10 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="intake-email" className="block text-xs font-medium text-ink-muted mb-1.5">
              Email *
            </label>
            <input
              type="email"
              id="intake-email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm border border-ink/10 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="intake-organization" className="block text-xs font-medium text-ink-muted mb-1.5">
              Organization *
            </label>
            <input
              type="text"
              id="intake-organization"
              name="organization"
              required
              value={formData.organization}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm border border-ink/10 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="intake-role" className="block text-xs font-medium text-ink-muted mb-1.5">
              Your role
            </label>
            <input
              type="text"
              id="intake-role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm border border-ink/10 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="intake-engagement-type" className="block text-xs font-medium text-ink-muted mb-1.5">
            What are you interested in? *
          </label>
          <select
            id="intake-engagement-type"
            name="engagementType"
            required
            value={formData.engagementType}
            onChange={handleChange}
            className="w-full px-3 py-2.5 text-sm border border-ink/10 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
          >
            <option value="">Select engagement type</option>
            {engagementTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="intake-message" className="block text-xs font-medium text-ink-muted mb-1.5">
            Tell me more about what you need
          </label>
          <textarea
            id="intake-message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="What condition or problem are you focused on? What outcome would make this engagement successful?"
            className="w-full px-3 py-2.5 text-sm border border-ink/10 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent placeholder:text-ink-muted/50 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="self-start px-6 py-2.5 bg-ink text-paper text-sm font-medium rounded-md hover:bg-ink-light transition-colors disabled:opacity-60"
        >
          {sending ? 'Sending…' : 'Send inquiry'}
        </button>
        {error && (
          <p className="text-sm text-red-600">
            Something went wrong sending your inquiry. Please try again in a moment.
          </p>
        )}
      </form>
    </div>
  );
}
