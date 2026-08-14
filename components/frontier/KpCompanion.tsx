"use client";

import Link from "next/link";

export default function KpCompanion() {
  return (
    <Link className="kp-companion" href="/start" aria-label="Meet Karen Pendergrass">
      <span className="kp-companion-copy">
        <strong>MEET KAREN</strong>
        <small>Research, standards, biography, and receipts</small>
      </span>
      <span className="kp-companion-avatar">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/Karen_Pendergrass.png" alt="" />
      </span>
    </Link>
  );
}
