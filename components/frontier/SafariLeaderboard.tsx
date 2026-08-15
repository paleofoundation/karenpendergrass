"use client";

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { FormEvent, useCallback, useEffect, useState } from "react";

type ScoreRecord = {
  id: string;
  playerName: string;
  score: number;
  discoveries: number;
  articles: number;
  challenges: number;
  comment: string;
  website?: string;
  timeSeconds: number;
  createdAt: string;
};

type LocalRun = {
  totalScore?: number;
  score?: number;
  catPenalty?: number;
  multiplier?: number;
  elapsedSeconds?: number;
  discovered?: string[];
  knockedDown?: string[];
  linkRewards?: string[];
  knowledgeOpened?: string[];
  articleRewards?: string[];
  completedChallenges?: string[];
};

function formatTime(value: number) {
  const minutes = Math.floor(value / 60).toString().padStart(2, "0");
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function SafariLeaderboard() {
  const { user } = useUser();
  const [scores, setScores] = useState<ScoreRecord[]>([]);
  const [run, setRun] = useState<LocalRun>({});
  const [playerName, setPlayerName] = useState("");
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const loadScores = useCallback(async () => {
    try {
      const response = await fetch("/api/scores", { cache: "no-store" });
      const payload = await response.json() as { scores?: ScoreRecord[]; error?: string };
      if (!response.ok) throw new Error(payload.error || "The leaderboard is unavailable.");
      setScores(payload.scores ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The leaderboard is unavailable.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadScores();
    try {
      setRun(JSON.parse(window.localStorage.getItem("kp-swovee-safari-run") || "{}") as LocalRun);
    } catch { setRun({}); }
  }, [loadScores]);

  useEffect(() => {
    if (!playerName && user) setPlayerName(user.fullName || user.firstName || "");
  }, [playerName, user]);

  const rawScore = Math.max(0, Number(run.score || 0) - Number(run.catPenalty || 0));
  const safariScore = Number(run.totalScore ?? rawScore * (Number(run.multiplier) === 10 ? 10 : 1));
  const discoveries = run.discovered?.length ?? 0;
  const insights = (run.knowledgeOpened?.length ?? 0) + (run.articleRewards?.length ?? 0);
  const researchFinds = run.linkRewards?.filter((id) => id.startsWith("project-") || id.startsWith("billboard-") || (id.startsWith("site-") && id !== "site-advisory" && id !== "site-receipts")).length ?? 0;
  const socialFinds = run.linkRewards?.some((id) => id.startsWith("social-")) ?? false;
  const calculatedChallenges = [discoveries >= 4, (run.knowledgeOpened?.length ?? 0) >= 5, researchFinds >= 3, socialFinds, Number(run.catPenalty || 0) === 0 && discoveries >= 2].filter(Boolean).length;
  const challenges = Math.max(run.completedChallenges?.length ?? 0, calculatedChallenges);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/scores", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ playerName, comment, website, score: safariScore, discoveries, articles: insights, challenges, timeSeconds: Number(run.elapsedSeconds || 0) }),
      });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Your field note could not be posted.");
      setComment("");
      setWebsite("");
      setMessage("Your score and field note are live.");
      await loadScores();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Your field note could not be posted.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="leaderboard-page">
      <section className="leaderboard-hero">
        <span>SWOVEE SAFARI · PUBLIC SIGNAL BOARD</span>
        <h1>THE LEADERBOARD<br /><em>IS ALSO A GUESTBOOK.</em></h1>
        <p>Finish a Safari run, post your score, leave Karen a note, and—if you want—link your own corner of the internet.</p>
        <div><a href="/">ENTER THE SAFARI →</a><a href="/start">MEET KAREN →</a></div>
      </section>

      <section className="leaderboard-grid">
        <div className="score-board">
          <header><span>RANK</span><span>SAFARI VISITOR</span><span>POINTS</span></header>
          {loading && <p className="board-status">TUNING THE SIGNAL…</p>}
          {!loading && scores.length === 0 && <p className="board-status">No field notes yet. The first Safari record can be yours.</p>}
          {scores.map((entry, index) => (
            <article key={entry.id} className={index < 3 ? "podium" : ""}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <div><h2>{entry.website ? <a href={entry.website} target="_blank" rel="nofollow ugc noreferrer">{entry.playerName} ↗</a> : entry.playerName}</h2>{entry.comment && <blockquote>“{entry.comment}”</blockquote>}<small>{entry.discoveries} DISTRICTS · {entry.challenges || 0} CHALLENGES · {formatTime(entry.timeSeconds)}</small></div>
              <strong>{entry.score.toLocaleString()}</strong>
            </article>
          ))}
        </div>

        <aside className="guestbook-form">
          <span>YOUR CURRENT LOCAL RUN</span>
          <strong>{safariScore.toLocaleString()}</strong>
          <small>{discoveries} DISTRICTS · {challenges}/5 CHALLENGES · {formatTime(Number(run.elapsedSeconds || 0))}</small>
          <SignedOut>
            <div className="sign-in-gate"><h2>Sign in to leave your mark.</h2><p>An email sign-in keeps names attached to real visitors and limits spam. Browsing the board is always public.</p><SignInButton mode="modal"><button>SIGN IN WITH EMAIL →</button></SignInButton></div>
          </SignedOut>
          <SignedIn>
            <form onSubmit={submit}>
              <div className="signed-in-row"><span>IDENTITY VERIFIED</span><UserButton /></div>
              <label>NAME ON THE BOARD<input value={playerName} onChange={(event) => setPlayerName(event.target.value)} minLength={2} maxLength={40} required /></label>
              <label>YOUR NOTE<textarea value={comment} onChange={(event) => setComment(event.target.value)} maxLength={320} rows={5} placeholder="What did you find—or what should Karen build next?" required /></label>
              <label>YOUR WEBSITE · OPTIONAL<input value={website} onChange={(event) => setWebsite(event.target.value)} maxLength={180} inputMode="url" placeholder="your-site.com" /></label>
              <button type="submit" disabled={submitting}>{submitting ? "TRANSMITTING…" : "POST SCORE + FIELD NOTE →"}</button>
            </form>
          </SignedIn>
          {message && <p className="form-message" role="status">{message}</p>}
          <p className="guestbook-note">Your score stays in this browser as you move through KarenPendergrass.com. Posting it makes the record public.</p>
        </aside>
      </section>
    </div>
  );
}
