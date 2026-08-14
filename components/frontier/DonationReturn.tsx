"use client";

import Link from "next/link";
import { useEffect } from "react";
import { DONATION_PROGRAMS, type DonationPurpose } from "@/lib/donations";

export default function DonationReturn({ verified, purpose }: { verified: boolean; purpose: DonationPurpose }) {
  const program = DONATION_PROGRAMS[purpose];

  useEffect(() => {
    if (!verified) return;
    if (purpose === "tinies") {
      window.localStorage.setItem("kp-tinies-donation-verified", String(Date.now()));
      window.opener?.postMessage({ type: "kp-tinies-donation-verified" }, window.location.origin);
      return;
    }
    window.localStorage.setItem(`kp-coffee-${purpose}-verified`, String(Date.now()));
    window.opener?.postMessage({ type: "kp-coffee-donation-verified", purpose }, window.location.origin);
  }, [purpose, verified]);

  return (
    <main className="donation-return-page">
      <section className={verified ? "donation-return-card is-verified" : "donation-return-card"}>
        <span>{verified ? program.successEyebrow : "PAYMENT NOT VERIFIED"}</span>
        <h1>{verified ? program.successTitle : "WE COULD NOT CONFIRM THAT GIFT."}</h1>
        <p>{verified ? program.successCopy : `No completed ${program.amountLabel} Stripe payment was found. You can return to the expedition and try the support mission again.`}</p>
        <Link href="/">RETURN TO EXPEDITION KP–01 →</Link>
      </section>
    </main>
  );
}
