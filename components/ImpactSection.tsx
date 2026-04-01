import Link from 'next/link';

const stats = [
  { value: '15+', label: 'Years in food certification', link: '/frameworks/hmtc' },
  { value: '5', label: 'Organizations founded', link: '/ventures' },
  { value: '8', label: 'HMTc per-metal standards', link: '/frameworks/hmtc' },
  { value: '6', label: 'Research frameworks created', link: '/frameworks' },
  { value: '5', label: 'Papers published (Vol. I)', link: '/publications' },
  { value: '1st', label: 'Documented FMT for Celiac', link: '/about' },
];

export default function ImpactSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <p
        className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-6"
        style={{ letterSpacing: '0.12em' }}
      >
        By the numbers
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.link}
            className="group block text-center"
          >
            <p
              className="text-3xl md:text-4xl font-medium text-ink group-hover:text-accent transition-colors mb-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {stat.value}
            </p>
            <p className="text-xs text-ink-muted leading-tight">{stat.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
