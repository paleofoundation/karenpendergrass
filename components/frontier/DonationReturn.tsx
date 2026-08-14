"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function DonationReturn({ verified }: { verified: boolean }) {
  useEffect(() => {
    if (!verified) return;
    window.localStorage.setItem("kp-tinies-donation-verified", String(Date.now()));
    window.opener?.postMessage({ type: "kp-tinies-donation-verified" }, window.location.origin);
  }, [verified]);

  return (
    <main className="donation-return-page">
      <section className={verified ? "donation-return-card is-verified" : "donation-return-card"}>
        <span>{verified ? "PAYMENT VERIFIED · GARDENS OF ST. GERTRUDE" : "PAYMENT NOT VERIFIED"}</span>
        <h1>{verified ? "THE CATS THANK YOU." : "WE COULD NOT CONFIRM THAT GIFT."}</h1>
        <p>{verified ? "Your €1 contribution was confirmed. Return to the expedition tab: cat-safety penalties will be restored and the 1,000-point sanctuary bonus will be added automatically." : "No completed €1 Stripe payment was found. You can return to the expedition and try the sanctuary mission again."}</p>
        <Link href="/">RETURN TO EXPEDITION KP–01 →</Link>
      </section>
    </main>
  );
}
