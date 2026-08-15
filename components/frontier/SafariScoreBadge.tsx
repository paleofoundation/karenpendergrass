"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SafariScoreBadge() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const read = () => setScore(Math.max(0, Number(window.localStorage.getItem("kp-safari-score") || 0)));
    read();
    window.addEventListener("storage", read);
    window.addEventListener("focus", read);
    return () => {
      window.removeEventListener("storage", read);
      window.removeEventListener("focus", read);
    };
  }, []);

  return (
    <aside className="safari-return-dock" aria-label="Swovee Safari score and return controls">
      <Link href="/" className="safari-return-icon" aria-label="Return to the Swovee Safari"><span>↙</span><b>SWOVEE</b></Link>
      <div className="safari-score-badge">
        <Link href="/">RETURN TO THE SAFARI</Link>
        <strong>{score.toLocaleString()} PTS</strong>
        <Link href="/leaderboard">SEE LEADERBOARD →</Link>
      </div>
    </aside>
  );
}
