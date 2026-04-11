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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build mailto link with form data as body
    const subject = encodeURIComponent(
      `${formData.engagementType} inquiry from ${formData.name} at ${formData.organization}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nOrganization: ${formData.organization}\nRole: ${formData.role}\nEngagement type: ${formData.engagementType}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:hola@karenpendergrass.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
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
          Your email client should have opened with a pre-filled message.
          If it didn't, you can email me directly at{' '}
          <a href="mailto:hola@karenpendergrass.com" className="text-accent underline underline-offset-2">
            hola@karenpendergrass.com
          </a>
          .
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

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1.5">
              Your name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm border border-ink/10 rounded-md bg-white focus:outline-none focus:border-accent/40"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1.5">
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm border border-ink/10 rounded-md bg-white focus:outline-none focus:border-accent/40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1.5">
              Organization *
            </label>
            <input
              type="text"
              name="organization"
              required
              value={formData.organization}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm border border-ink/10 rounded-md bg-white focus:outline-none focus:border-accent/40"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1.5">
              Your role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm border border-ink/10 rounded-md bg-white focus:outline-none focus:border-accent/40"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink-muted mb-1.5">
            What are you interested in? *
          </label>
          <select
            name="engagementType"
            required
            value={formData.engagementType}
            onChange={handleChange}
            className="w-full px-3 py-2.5 text-sm border border-ink/10 rounded-md bg-white focus:outline-none focus:border-accent/40"
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
          <label className="block text-xs font-medium text-ink-muted mb-1.5">
            Tell me more about what you need
          </label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="What condition or problem are you focused on? What outcome would make this engagement successful?"
            className="w-full px-3 py-2.5 text-sm border border-ink/10 rounded-md bg-white focus:outline-none focus:border-accent/40 placeholder:text-ink-muted/50 resize-none"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="self-start px-6 py-2.5 bg-ink text-paper text-sm font-medium rounded-md hover:bg-ink-light transition-colors"
        >
          Send inquiry
        </button>
      </div>
    </div>
  );
}
