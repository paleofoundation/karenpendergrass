import type { DonationPurpose } from "@/lib/donations";
import type { FieldIcon } from "./types";

export type ZoneKind = "foundry" | "wetlands" | "brain" | "observatory" | "sanctuary" | "harbor" | "lab" | "finish";

export type ExpeditionZone = {
  id: string;
  index: string;
  kind: ZoneKind;
  title: string;
  label: string;
  kicker: string;
  description: string;
  x: number;
  z: number;
  radius: number;
  color: string;
  href: string;
  cta: string;
  founder?: string;
  logo?: string;
  secondaryHref?: string;
  secondaryCta?: string;
  support?: {
    title: string;
    description: string;
    href: string;
    cta: string;
    bonus: number;
  };
  secret?: boolean;
};

export type OracleBlock = {
  id: string;
  x: number;
  z: number;
  rotation: number;
};

export type FieldLink = {
  id: string;
  label: string;
  eyebrow: string;
  href: string;
  icon?: FieldIcon;
  supportPurpose?: DonationPurpose;
  color: string;
  x: number;
  z: number;
  rotation: number;
};

export type FieldOperation = {
  id: string;
  zoneId: string;
  code: string;
  title: string;
  color: string;
  reward: number;
  intro: string;
  scanInstruction: string;
  checkpoints: Array<{ id: string; label: string; x: number; z: number }>;
  question: string;
  options: string[];
  answer: number;
  receipt: string;
  printInstruction: string;
  buildSite: { x: number; z: number; radius: number };
};

/**
 * The frontier is intentionally limited to the four ideas that explain Karen's
 * work at a glance. Everything else belongs in the static site until it earns a
 * place in the world.
 */
export const expeditionZones: ExpeditionZone[] = [
  {
    id: "heavy-metal-certified",
    index: "01",
    kind: "foundry",
    title: "Heavy Metal Certified",
    label: "STANDARDS + EVIDENCE",
    kicker: "The evidence becomes a standard people can use.",
    description:
      "Karen founded Heavy Metal Certified to turn heavy-metal toxicology, real food categories, serving size, surveillance, and ALARA principles into practical certification standards. Its evidence layer lives at Heavy Metal Index—and this work has quietly helped fund the care of her sanctuary cats for years.",
    x: -40,
    z: -18,
    radius: 10,
    color: "#e23d36",
    href: "https://heavymetalcertified.com",
    cta: "VISIT HEAVY METAL CERTIFIED",
    secondaryHref: "https://heavymetalindex.com",
    secondaryCta: "EXPLORE THE HEAVY METAL INDEX",
    founder: "FOUNDED BY KAREN PENDERGRASS",
    logo: "/images/hmtc-mark-red.svg",
  },
  {
    id: "microbiome-medicine",
    index: "02",
    kind: "wetlands",
    title: "Microbiome Medicine",
    label: "MICROBIAL METALLOMICS",
    kicker: "Study the ecosystem under the diagnosis.",
    description:
      "Karen's research connects disease-associated microbial patterns with metal availability, virulence, environmental pressure, and host response. She developed microbial metallomics as a way to understand how metals reshape the microbiome—and how that changes medicine.",
    x: -20,
    z: -48,
    radius: 10,
    color: "#38cfc5",
    href: "https://microbiomemedicine.com",
    cta: "VISIT MICROBIOME MEDICINE",
    secondaryHref: "/frameworks/microbial-metallomics",
    secondaryCta: "READ THE MICROBIAL METALLOMICS FRAMEWORK",
    founder: "FOUNDED BY KAREN PENDERGRASS",
  },
  {
    id: "swovee",
    index: "03",
    kind: "lab",
    title: "Swovee",
    label: "ROBOTICS + AI",
    kicker: "A machine that reads a place, then builds for it.",
    description:
      "Swovee.com is Karen's 2017 robotics project: laser scanning, AI, autonomous movement, and large-format 3D printing combined into a terrain-aware construction machine. The Rovalizer you are driving is the idea made playable.",
    x: 38,
    z: -10,
    radius: 11,
    color: "#63aef8",
    href: "https://swovee.com",
    cta: "VISIT SWOVEE.COM",
    founder: "A PROJECT BY KAREN PENDERGRASS · EST. 2017",
  },
  {
    id: "tinies",
    index: "04",
    kind: "sanctuary",
    title: "Gardens of St. Gertrude",
    label: "90+ CATS + TINIES",
    kicker: "The animal-welfare work is not a metaphor.",
    description:
      "Karen cares for more than 90 cats at her real-life sanctuary in Cyprus and founded Tinies to build more durable infrastructure for animal care. The cats in this terrain—and on Tinies—stand for the animals she feeds, houses, and takes to the veterinarian every day.",
    x: 34,
    z: 38,
    radius: 11,
    color: "#ff9cae",
    href: "https://tinies.com",
    cta: "VISIT TINIES.COM",
    founder: "SANCTUARY + PLATFORM FOUNDED BY KAREN PENDERGRASS",
    support: {
      title: "Help feed the 90+.",
      description:
        "A verified $1 gift goes to Gardens of St. Gertrude, the 501(c)(3) caring for Karen's sanctuary cats. It helps buy food, litter, housing materials, and veterinary care.",
      href: "/api/donations/checkout",
      cta: "DONATE $1 TOWARD CAT FOOD",
      bonus: 1000,
    },
  },
];

export const oracleBlocks: OracleBlock[] = [
  { id: "oracle", x: 0, z: 4, rotation: -0.12 },
];

/** Only the three links that establish professional identity remain in-world. */
export const socialLinks: FieldLink[] = [
  { id: "social-linkedin", label: "LINKEDIN", eyebrow: "KAREN PENDERGRASS", href: "https://www.linkedin.com/in/karenpendergras/", icon: "linkedin", color: "#0a66c2", x: -16, z: 33, rotation: Math.PI + 0.08 },
  { id: "social-email", label: "EMAIL KAREN", eyebrow: "CONTACT", href: "/contact", icon: "email", color: "#ffad4f", x: -8, z: 35, rotation: Math.PI },
  { id: "social-orcid", label: "ORCID 0000-0002-2348-7259", eyebrow: "PAPERS + PUBLICATIONS", href: "https://orcid.org/0000-0002-2348-7259", icon: "orcid", color: "#a6ce39", x: 0, z: 33, rotation: Math.PI - 0.08 },
];

export const supportLinks: FieldLink[] = [];
export const articleSignals: FieldLink[] = [];
export const fieldOperations: FieldOperation[] = [];

export const mapExtent = 74;
export const markedZones = expeditionZones;
