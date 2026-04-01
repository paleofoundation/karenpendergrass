const testimonials = [
  {
    quote:
      'Karen is one of the most multi-talented and intelligent people I have ever met. Her passion for solving difficult problems in fields of medicine, agriculture, and nutrition are what makes her a one-of-a-kind human and an absolute force in any industry she takes interest in.',
    name: 'Via LinkedIn',
  },
  {
    quote:
      'Trying to articulate exactly how I feel about Karen is difficult. Mainly because she is one of the smartest people I know. And because when I talk with her at times I feel out of my league, and have to Google half the shit she tells me. To say that Karen is one of my favorite people on the planet would be an understatement.',
    name: 'Via LinkedIn',
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <p
        className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-8"
        style={{ letterSpacing: '0.12em' }}
      >
        What people say
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-paper-warm rounded-lg border border-ink/5 p-6"
          >
            <p
              className="text-ink-light leading-relaxed mb-4"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.95rem' }}
            >
              "{t.quote}"
            </p>
            <p className="text-xs text-ink-muted">{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
