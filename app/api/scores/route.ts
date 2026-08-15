import { Redis } from '@upstash/redis';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

const SCORE_KEY = 'kp-frontier:leaderboard:v1';
const RATE_WINDOW_SECONDS = 60;
const RATE_LIMIT = 5;

type StoredRun = {
  id: string;
  userId: string;
  playerName: string;
  callsign?: string;
  score: number;
  discoveries: number;
  articles: number;
  challenges?: number;
  comment?: string;
  website?: string;
  timeSeconds: number;
  createdAt: string;
};

function getRedis() {
  return Redis.fromEnv();
}

function clientAddress(request: Request) {
  return (request.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim();
}

function cleanText(value: unknown, maxLength: number) {
  return String(value ?? '')
    .trim()
    .replace(/[\u0000-\u001f\u007f<>]/g, '')
    .replace(/\s+/g, ' ')
    .slice(0, maxLength);
}

function cleanWebsite(value: unknown) {
  const candidate = String(value ?? '').trim().slice(0, 180);
  if (!candidate) return undefined;
  try {
    const normalized = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
    const url = new URL(normalized);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return null;
    return url.toString();
  } catch {
    return null;
  }
}

async function withinRateLimit(redis: Redis, request: Request, userId: string) {
  const key = `kp-frontier:score-rate:${userId}:${clientAddress(request)}`;
  const attempts = await redis.incr(key);
  if (attempts === 1) await redis.expire(key, RATE_WINDOW_SECONDS);
  return attempts <= RATE_LIMIT;
}

export async function GET() {
  try {
    const redis = getRedis();
    const candidates = await redis.zrange<StoredRun[]>(SCORE_KEY, 0, 49, { rev: true });
    const seen = new Set<string>();
    const scores = candidates.flatMap((run) => {
      const identity = run.userId || run.id;
      if (seen.has(identity)) return [];
      seen.add(identity);
      return [{
        id: run.id,
        playerName: run.playerName || run.callsign || 'EXPEDITION PILOT',
        score: run.score,
        discoveries: run.discoveries,
        articles: run.articles,
        challenges: run.challenges ?? 0,
        comment: run.comment ?? '',
        website: run.website,
        timeSeconds: run.timeSeconds,
        createdAt: run.createdAt,
      }];
    }).slice(0, 30);
    return Response.json({ scores }, { headers: { 'cache-control': 'no-store' } });
  } catch (error) {
    console.error('Unable to read the frontier leaderboard', error);
    return Response.json({ error: 'The signal board is temporarily offline.', scores: [] }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: 'Sign in with an email address before logging a public score.' }, { status: 401 });
    }
    const redis = getRedis();
    if (!(await withinRateLimit(redis, request, userId))) {
      return Response.json({ error: 'Too many transmissions. Try again in one minute.' }, { status: 429 });
    }

    const payload = (await request.json()) as Partial<Omit<StoredRun, 'id' | 'createdAt'>>;
    const playerName = cleanText(payload.playerName, 40);
    const comment = cleanText(payload.comment, 320);
    const website = cleanWebsite(payload.website);
    const score = Math.round(Number(payload.score));
    const discoveries = Math.round(Number(payload.discoveries));
    const articles = Math.round(Number(payload.articles));
    const challenges = Math.round(Number(payload.challenges ?? 0));
    const timeSeconds = Math.round(Number(payload.timeSeconds));

    if (playerName.length < 2) return Response.json({ error: 'Player name must be at least two characters.' }, { status: 400 });
    if (!comment) return Response.json({ error: 'Leave a short note about your visit.' }, { status: 400 });
    if (website === null) return Response.json({ error: 'Website must be a valid http or https address.' }, { status: 400 });
    if (!Number.isFinite(score) || score < 0 || score > 250000) return Response.json({ error: 'Score is outside the Safari range.' }, { status: 400 });
    if (!Number.isFinite(discoveries) || discoveries < 0 || discoveries > 12) return Response.json({ error: 'Discovery count is invalid.' }, { status: 400 });
    if (!Number.isFinite(articles) || articles < 0 || articles > 12) return Response.json({ error: 'Briefing count is invalid.' }, { status: 400 });
    if (!Number.isFinite(challenges) || challenges < 0 || challenges > 5) return Response.json({ error: 'Challenge count is invalid.' }, { status: 400 });
    if (!Number.isFinite(timeSeconds) || timeSeconds < 0 || timeSeconds > 86400) return Response.json({ error: 'Field time is invalid.' }, { status: 400 });

    const record: StoredRun = {
      id: crypto.randomUUID(),
      userId,
      playerName,
      score,
      discoveries,
      articles,
      challenges,
      comment,
      website: website ?? undefined,
      timeSeconds,
      createdAt: new Date().toISOString(),
    };
    const rankingScore = score * 100_000 + (86_400 - timeSeconds);
    await redis.zadd(SCORE_KEY, { score: rankingScore, member: record });

    const total = await redis.zcard(SCORE_KEY);
    if (total > 100) await redis.zremrangebyrank(SCORE_KEY, 0, total - 101);

    return Response.json({ score: { ...record, userId: undefined } }, { status: 201 });
  } catch (error) {
    console.error('Unable to record the frontier score', error);
    return Response.json({ error: 'The signal board is temporarily offline.' }, { status: 503 });
  }
}
