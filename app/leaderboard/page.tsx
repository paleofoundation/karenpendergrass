import type { Metadata } from 'next';
import Link from 'next/link';
import { Redis } from '@upstash/redis';

export const metadata: Metadata = {
  title: 'Expedition Leaderboard',
  description:
    'Public scores from Expedition KP–01 on karenpendergrass.com: discoveries, briefings, and field time from Drive the Frontier.',
  alternates: { canonical: '/leaderboard' },
};

export const dynamic = 'force-dynamic';

type StoredRun = {
  id: string;
  userId: string;
  playerName: string;
  callsign?: string;
  score: number;
  discoveries: number;
  articles: number;
  timeSeconds: number;
  createdAt: string;
};

type Row = {
  playerName: string;
  score: number;
  discoveries: number;
  articles: number;
  timeSeconds: number;
};

async function getRows(): Promise<Row[]> {
  try {
    const redis = Redis.fromEnv();
    const candidates = await redis.zrange<StoredRun[]>('kp-frontier:leaderboard:v1', 0, 49, {
      rev: true,
    });
    const seen = new Set<string>();
    return candidates
      .flatMap((run) => {
        const identity = run.userId || run.id;
        if (seen.has(identity)) return [];
        seen.add(identity);
        return [
          {
            playerName: run.playerName || run.callsign || 'EXPEDITION PILOT',
            score: run.score,
            discoveries: run.discoveries,
            articles: run.articles,
            timeSeconds: run.timeSeconds,
          },
        ];
      })
      .slice(0, 10);
  } catch {
    return [];
  }
}

function formatFieldTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export default async function LeaderboardPage() {
  const rows = await getRows();

  return (
    <div className="page-enter">
      <section
        className="relative py-20 md:py-28"
        style={{ borderBottom: '1px solid var(--color-border-light)' }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--color-accent-dark)' }}
          >
            Expedition KP–01
          </p>
          <h1
            className="text-4xl md:text-5xl font-normal leading-[1.1] tracking-tight max-w-4xl"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
          >
            Leaderboard
          </h1>
          <p
            className="mt-6 max-w-2xl text-lg"
            style={{ color: 'var(--color-ink-secondary)' }}
          >
            Public scores from Drive the Frontier. Sign in on the expedition to log a run.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-20">
        {rows.length === 0 ? (
          <p style={{ color: 'var(--color-ink-secondary)' }}>
            No public scores yet.{' '}
            <Link href="/" className="text-accent">
              Drive the Frontier
            </Link>{' '}
            to post the first one.
          </p>
        ) : (
          <ol className="space-y-0">
            {rows.map((row, index) => (
              <li
                key={`${row.playerName}-${index}`}
                className="grid grid-cols-[2.5rem_1fr_auto] gap-4 py-5"
                style={{ borderBottom: '1px solid var(--color-border-light)' }}
              >
                <span
                  className="text-sm font-semibold tabular-nums"
                  style={{ color: 'var(--color-ink-muted)' }}
                >
                  {index + 1}
                </span>
                <div>
                  <p
                    className="font-medium"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                  >
                    {row.playerName}
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--color-ink-muted)' }}>
                    {row.discoveries} discoveries · {row.articles} briefings ·{' '}
                    {formatFieldTime(row.timeSeconds)} field time
                  </p>
                </div>
                <span
                  className="text-xl tabular-nums font-bold"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {row.score}
                </span>
              </li>
            ))}
          </ol>
        )}
        <p className="mt-12">
          <Link href="/" className="text-accent">
            Return to the expedition
          </Link>
        </p>
      </section>
    </div>
  );
}
