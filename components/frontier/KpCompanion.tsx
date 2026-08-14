"use client";

import Link from "next/link";

export default function KpCompanion() {
  return (
    <Link className="kp-companion" href="/start" aria-label="Enter the static KarenPendergrass.com website">
      <span className="kp-companion-bubble">
        <strong>EXPLORE THE STATIC SITE</strong>
        <small>Articles, projects, receipts, and Karen’s full field guide</small>
      </span>
      <span className="kp-companion-avatar" aria-hidden="true">
        <i className="kp-companion-hair" />
        <i className="kp-companion-face"><b /><b /></i>
        <i className="kp-companion-body">KP</i>
      </span>
      <span className="kp-companion-label">KARENPENDERGRASS.COM&nbsp; ↗</span>
    </Link>
  );
}
