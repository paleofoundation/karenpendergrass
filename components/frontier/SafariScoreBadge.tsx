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

  return <Link href="/leaderboard" className="safari-score-badge"><span>YOUR SAFARI SCORE</span><strong>{score.toLocaleString()} PTS</strong><b>SEE LEADERBOARD →</b></Link>;
}
