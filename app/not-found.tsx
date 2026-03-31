import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-20 text-center">
      <p
        className="text-6xl font-light text-ink-muted mb-4"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        404
      </p>
      <h1
        className="text-2xl font-medium text-ink mb-4"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Page not found
      </h1>
      <p className="text-ink-light mb-8">
        This page doesn't exist. If you followed a link from the old WordPress
        site, it may have been restructured during the migration.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center px-5 py-2.5 bg-ink text-paper text-sm font-medium rounded-md hover:bg-ink-light transition-colors"
        >
          Go home
        </Link>
        <Link
          href="/writing"
          className="inline-flex items-center px-5 py-2.5 border border-ink/15 text-ink text-sm font-medium rounded-md hover:bg-ink/5 transition-colors"
        >
          Browse writing
        </Link>
      </div>
    </div>
  );
}
