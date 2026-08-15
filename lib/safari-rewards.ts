export const SAFARI_RUN_STORAGE_KEY = "kp-swovee-safari-run";

export type SafariLinkReward = {
  id: string;
  label: string;
  points: number;
};

type SafariRunSnapshot = {
  score?: number;
  catPenalty?: number;
  multiplier?: number;
  linkRewards?: string[];
  [key: string]: unknown;
};

const DOMAIN_REWARDS: Record<string, SafariLinkReward> = {
  "heavymetalcertified.com": { id: "site-heavy-metal-certified", label: "Heavy Metal Certified opened", points: 250 },
  "www.heavymetalcertified.com": { id: "site-heavy-metal-certified", label: "Heavy Metal Certified opened", points: 250 },
  "heavymetalindex.com": { id: "site-heavy-metal-index", label: "Heavy Metal Index opened", points: 150 },
  "www.heavymetalindex.com": { id: "site-heavy-metal-index", label: "Heavy Metal Index opened", points: 150 },
  "microbiomemedicine.com": { id: "site-microbiome-medicine", label: "Microbiome Medicine opened", points: 150 },
  "www.microbiomemedicine.com": { id: "site-microbiome-medicine", label: "Microbiome Medicine opened", points: 150 },
  "phagecocktails.com": { id: "site-phage-cocktails", label: "Phage Cocktails opened", points: 150 },
  "www.phagecocktails.com": { id: "site-phage-cocktails", label: "Phage Cocktails opened", points: 150 },
  "wikibiome.com": { id: "site-wikibiome", label: "WikiBiome opened", points: 150 },
  "www.wikibiome.com": { id: "site-wikibiome", label: "WikiBiome opened", points: 150 },
  "swovee.com": { id: "site-swovee", label: "Swovee opened", points: 150 },
  "www.swovee.com": { id: "site-swovee", label: "Swovee opened", points: 150 },
  "tinies.app": { id: "site-tinies", label: "Tinies opened", points: 150 },
  "www.tinies.app": { id: "site-tinies", label: "Tinies opened", points: 150 },
  "gardensofstgertrude.org": { id: "site-gardens", label: "Gardens of St. Gertrude opened", points: 150 },
  "www.gardensofstgertrude.org": { id: "site-gardens", label: "Gardens of St. Gertrude opened", points: 150 },
  "gutsies.com": { id: "site-gutsies", label: "Gutsies opened", points: 150 },
  "www.gutsies.com": { id: "site-gutsies", label: "Gutsies opened", points: 150 },
  "paleofoundation.com": { id: "site-paleo-foundation", label: "Paleo Foundation opened", points: 150 },
  "www.paleofoundation.com": { id: "site-paleo-foundation", label: "Paleo Foundation opened", points: 150 },
  "microbialmetallomics.com": { id: "site-microbial-metallomics", label: "Microbial Metallomics opened", points: 150 },
  "www.microbialmetallomics.com": { id: "site-microbial-metallomics", label: "Microbial Metallomics opened", points: 150 },
  "orcid.org": { id: "social-orcid", label: "Karen's ORCID opened", points: 100 },
};

const INTERNAL_REWARDS: Record<string, SafariLinkReward> = {
  "/advisory": { id: "site-advisory", label: "Karen's advisory work opened", points: 250 },
  "/contact": { id: "social-email", label: "Karen's contact page opened", points: 100 },
  "/receipts": { id: "site-receipts", label: "Karen's receipts opened", points: 100 },
};

function normalizeUrl(href: string) {
  if (href.startsWith("mailto:")) return null;
  try {
    const base = typeof window === "undefined" ? "https://karenpendergrass.com" : window.location.origin;
    return new URL(href, base);
  } catch {
    return null;
  }
}

export function getSafariLinkReward(href: string): SafariLinkReward | null {
  if (href.startsWith("mailto:")) return { id: "social-email", label: "Karen's email opened", points: 100 };
  const url = normalizeUrl(href);
  if (!url) return null;

  if (url.hostname === "karenpendergrass.com" || url.hostname === "www.karenpendergrass.com" || (typeof window !== "undefined" && url.origin === window.location.origin)) {
    return INTERNAL_REWARDS[url.pathname.replace(/\/$/, "") || "/"] ?? null;
  }

  if (url.hostname === "tinies.app" || url.hostname === "www.tinies.app") {
    if (url.pathname.includes("she-built-a-tech-company-to-feed-92-cats")) {
      return { id: "article-tinies-story", label: "Tinies founder story opened", points: 250 };
    }
  }

  if (url.hostname === "microbiomemedicine.com" || url.hostname === "www.microbiomemedicine.com") {
    if (url.pathname.replace(/\/$/, "") === "/conditions/endometriosis") {
      return { id: "site-microbiome-endometriosis", label: "Endometriosis research opened", points: 150 };
    }
    if (url.pathname.replace(/\/$/, "") === "/definition/microbiome-medicine") {
      return { id: "site-microbiome-definition", label: "Microbiome Medicine definition opened", points: 150 };
    }
  }

  if (url.hostname === "www.linkedin.com" && url.pathname.startsWith("/in/karenpendergras")) {
    return { id: "social-linkedin", label: "Karen's LinkedIn opened", points: 100 };
  }
  if ((url.hostname === "facebook.com" || url.hostname === "www.facebook.com") && url.pathname.startsWith("/karen.pendergrass")) {
    return { id: "social-facebook", label: "Karen's Facebook opened", points: 100 };
  }
  if ((url.hostname === "instagram.com" || url.hostname === "www.instagram.com") && url.pathname.startsWith("/micrometallomics")) {
    return { id: "social-instagram", label: "Karen's Instagram opened", points: 100 };
  }
  if (url.hostname === "x.com" && url.pathname.startsWith("/micrometalomics")) {
    return { id: "social-x", label: "Karen's X profile opened", points: 100 };
  }

  return DOMAIN_REWARDS[url.hostname] ?? null;
}

function publishReward(reward: SafariLinkReward) {
  const at = Date.now();
  const detail = { ...reward, id: `${reward.id}-${at}`, at };
  window.localStorage.setItem("kp-safari-return-reward", JSON.stringify(detail));
  window.dispatchEvent(new CustomEvent("kp-safari-reward", { detail }));
}

export function awardSafariOutboundLink(href: string): (SafariLinkReward & { awarded: boolean; totalScore: number }) | null {
  if (typeof window === "undefined") return null;
  const reward = getSafariLinkReward(href);
  if (!reward) return null;

  let run: SafariRunSnapshot = {};
  try {
    run = JSON.parse(window.localStorage.getItem(SAFARI_RUN_STORAGE_KEY) || "{}") as SafariRunSnapshot;
  } catch { /* A malformed run is safely replaced with a minimal snapshot. */ }

  const linkRewards = Array.isArray(run.linkRewards) ? run.linkRewards : [];
  const currentScore = Math.max(0, Number(run.score) || 0);
  const catPenalty = Math.max(0, Number(run.catPenalty) || 0);
  const multiplier = Number(run.multiplier) === 10 ? 10 : 1;
  const alreadyAwarded = linkRewards.includes(reward.id);
  const nextScore = alreadyAwarded ? currentScore : currentScore + reward.points;
  const totalScore = Math.max(0, nextScore - catPenalty) * multiplier;

  if (!alreadyAwarded) {
    window.localStorage.setItem(SAFARI_RUN_STORAGE_KEY, JSON.stringify({
      ...run,
      score: nextScore,
      linkRewards: [...linkRewards, reward.id],
      totalScore,
    }));
    window.localStorage.setItem("kp-safari-score", String(totalScore));
    window.dispatchEvent(new CustomEvent("kp-safari-score-change", { detail: { score: totalScore } }));
    publishReward(reward);
  }

  return { ...reward, awarded: !alreadyAwarded, totalScore };
}
