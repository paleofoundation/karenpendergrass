"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { awardSafariOutboundLink } from "@/lib/safari-rewards";

type ReturnReward = {
  id: string;
  label: string;
  points: number;
  at: number;
};

export default function SafariScoreBadge({ safariActive = false }: { safariActive?: boolean }) {
  const [score, setScore] = useState(0);
  const [reward, setReward] = useState<ReturnReward | null>(null);

  useEffect(() => {
    let rewardTimer = 0;
    const readScore = () => setScore(Math.max(0, Number(window.localStorage.getItem("kp-safari-score") || 0)));
    const showReward = (next: ReturnReward) => {
      window.clearTimeout(rewardTimer);
      setReward(next);
      rewardTimer = window.setTimeout(() => setReward(null), 6500);
    };
    const readPendingReward = () => {
      const raw = window.localStorage.getItem("kp-safari-return-reward");
      if (!raw) return;
      try {
        const pending = JSON.parse(raw) as ReturnReward;
        if (pending.points > 0 && Date.now() - pending.at < 30 * 60 * 1000) showReward(pending);
      } catch { /* Ignore malformed local Safari state. */ }
      window.localStorage.removeItem("kp-safari-return-reward");
    };
    const onScoreChange = (event: Event) => {
      const nextScore = Number((event as CustomEvent<{ score?: number }>).detail?.score);
      if (Number.isFinite(nextScore)) setScore(Math.max(0, nextScore));
      else readScore();
    };
    const onReward = (event: Event) => {
      const next = (event as CustomEvent<ReturnReward>).detail;
      if (next?.points > 0) showReward(next);
    };
    const onReturn = () => {
      readScore();
      readPendingReward();
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === "kp-safari-score") readScore();
      if (event.key === "kp-safari-return-reward" && event.newValue) {
        try { showReward(JSON.parse(event.newValue) as ReturnReward); } catch { /* Ignore malformed cross-tab state. */ }
      }
    };
    const onVisibility = () => { if (document.visibilityState === "visible") onReturn(); };
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.dataset.safariReward === "off") return;
      awardSafariOutboundLink(anchor.href);
    };

    readScore();
    readPendingReward();
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onReturn);
    window.addEventListener("kp-safari-score-change", onScoreChange);
    window.addEventListener("kp-safari-reward", onReward);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("click", onDocumentClick);
    return () => {
      window.clearTimeout(rewardTimer);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onReturn);
      window.removeEventListener("kp-safari-score-change", onScoreChange);
      window.removeEventListener("kp-safari-reward", onReward);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  return (
    <aside className={`safari-return-dock ${safariActive ? "is-safari" : ""}`} aria-label="Swovee Safari score and return controls">
      {reward && <div className="safari-reward-toast" role="status" aria-live="polite"><span>POINTS RECEIVED</span><strong>+{reward.points.toLocaleString()}</strong><small>{reward.label}</small></div>}
      <Link href="/" className="safari-return-icon" aria-label="Return to the Swovee Safari"><span>↙</span><b>SWOVEE</b></Link>
      <div className="safari-score-badge">
        <Link href="/">{safariActive ? "SWOVEE SAFARI ACTIVE" : "RETURN TO THE SAFARI"}</Link>
        <strong>{score.toLocaleString()} PTS</strong>
        <Link href="/leaderboard">SEE LEADERBOARD →</Link>
      </div>
    </aside>
  );
}
