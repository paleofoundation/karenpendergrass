"use client";

import Link from "next/link";
import SwoveeMascot from "./SwoveeMascot";

export default function KpCompanion() {
  return (
    <Link className="kp-companion" href="/start" aria-label="Enter the static KarenPendergrass.com website">
      <span className="kp-companion-bubble">
        <strong>EXPLORE THE STATIC SITE</strong>
        <small>Karen, the work, the receipts, and the full project index</small>
      </span>
      <SwoveeMascot />
      <span className="kp-companion-label">KARENPENDERGRASS.COM&nbsp; ↗</span>
    </Link>
  );
}
