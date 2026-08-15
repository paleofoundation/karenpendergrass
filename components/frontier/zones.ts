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
  copy?: string;
  cta?: string;
  articleHref?: string;
  articleCta?: string;
  founder?: string;
  details?: string[];
  image?: string;
  logoImage?: string;
  points?: number;
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
 * Four coherent districts carry the Safari: heavy metals, microbes, Swovee,
 * and Tinies. Individual sites appear as sculptures inside those districts;
 * articles do not become freestanding world objects.
 */
export const expeditionZones: ExpeditionZone[] = [
  {
    id: "heavy-metal-certified",
    index: "01",
    kind: "foundry",
    title: "Heavy Metal Certification Foundry",
    label: "HEAVY METALS",
    kicker: "Karen's commercial engine: evidence turned into a standard people can use.",
    description:
      "Karen founded Heavy Metal Certified to turn heavy-metal toxicology, real food categories, serving size, surveillance, and ALARA principles into practical certification standards. Its evidence layer lives at Heavy Metal Index—and this work has quietly helped fund the care of her sanctuary cats for years.",
    x: -40,
    z: -18,
    radius: 14,
    color: "#e23d36",
    href: "https://heavymetalcertified.com",
    cta: "CERTIFY A PRODUCT · VISIT HEAVY METAL CERTIFIED",
    secondaryHref: "https://heavymetalindex.com",
    secondaryCta: "EXPLORE THE HEAVY METAL INDEX",
    founder: "FOUNDED BY KAREN PENDERGRASS",
    logo: "/images/hmtc-mark-red.svg",
  },
  {
    id: "microbiome-medicine",
    index: "02",
    kind: "wetlands",
    title: "The Microbes",
    label: "MICROBIOME MEDICINE",
    kicker: "Study the ecosystem under the diagnosis.",
    description:
      "Karen founded MicrobiomeMedicine.com, PhageCocktails.com, and WikiBiome.com to make microbiome research more useful. Her work connects disease-associated microbial patterns with metal availability, virulence, environmental pressure, and host response.",
    x: -20,
    z: -48,
    radius: 10,
    color: "#38cfc5",
    href: "https://microbiomemedicine.com/conditions/endometriosis",
    cta: "EXPLORE THE ENDOMETRIOSIS RESEARCH",
    secondaryHref: "https://phagecocktails.com",
    secondaryCta: "VISIT PHAGE COCKTAILS",
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
    title: "Tinies + The Gardens",
    label: "OUR ANIMALS · 90+ CATS",
    kicker: "The animal-welfare work is not a metaphor.",
    description:
      "Karen cares for more than 90 cats at her real-life sanctuary in Cyprus and founded Tinies to build more durable infrastructure for animal care. The cats in this terrain—and on Tinies—stand for the animals she feeds, houses, and takes to the veterinarian every day.",
    x: 34,
    z: 38,
    radius: 11,
    color: "#ff9cae",
    href: "https://tinies.app",
    cta: "VISIT TINIES.APP",
    secondaryHref: "https://gardensofstgertrude.org",
    secondaryCta: "MEET THE GARDENS OF ST. GERTRUDE",
    founder: "SANCTUARY + PLATFORM FOUNDED BY KAREN PENDERGRASS",
    support: {
      title: "Ten-times the good.",
      description:
        "A verified $10 gift supports Gardens of St. Gertrude, the 501(c)(3) caring for Karen's 90+ sanctuary cats—and multiplies your final Safari score by ten.",
      href: "/api/donations/checkout",
      cta: "DONATE $10 · 10× YOUR SCORE",
      bonus: 10,
    },
  },
];

export const oracleBlocks: OracleBlock[] = [
  { id: "oracle", x: 0, z: 4, rotation: -0.12 },
];

/** Social Plaza stays compact: three sculptural identity marks, not text boxes. */
export const socialLinks: FieldLink[] = [
  { id: "social-linkedin", label: "LINKEDIN", eyebrow: "KAREN PENDERGRASS", href: "https://www.linkedin.com/in/karenpendergras/", icon: "linkedin", color: "#0a66c2", x: -16, z: 33, rotation: Math.PI + 0.08, points: 100 },
  { id: "social-email", label: "EMAIL KAREN", eyebrow: "CONTACT", href: "/contact", icon: "email", color: "#ffad4f", x: -8, z: 35, rotation: Math.PI, points: 100 },
  { id: "social-orcid", label: "ORCID 0000-0002-2348-7259", eyebrow: "PAPERS + PUBLICATIONS", href: "https://orcid.org/0000-0002-2348-7259", icon: "orcid", color: "#a6ce39", x: 0, z: 33, rotation: Math.PI - 0.08, points: 100 },
];

/** Sculptural project marks placed inside the three research/life districts. */
export const supportLinks: FieldLink[] = [
  {
    id: "project-hmc", label: "HEAVY METAL CERTIFIED", eyebrow: "KAREN'S COMMERCIAL ENGINE", href: "https://heavymetalcertified.com", icon: "heavy-metal", color: "#e23d36", x: -47, z: -11, rotation: 0.08, points: 250, cta: "CERTIFY A PRODUCT · +250", founder: "FOUNDED BY KAREN PENDERGRASS",
    copy: "Heavy Metal Certified translates toxicology, serving-size reality, food categories, surveillance, and ALARA principles into certification standards people can actually use.",
    details: ["Independent certification standards", "Human-grade thinking for food and pet food", "The work that has helped Karen feed the sanctuary cats"],
  },
  {
    id: "project-hmi", label: "HEAVY METAL INDEX", eyebrow: "EVIDENCE LIBRARY", href: "https://heavymetalindex.com", icon: "heavy-metal-index", color: "#f18a52", x: -36, z: -10, rotation: -0.08, points: 150, cta: "EXPLORE THE HEAVY METAL INDEX · +150", founder: "FOUNDED BY KAREN PENDERGRASS",
    copy: "A public evidence layer for understanding heavy metals in foods, products, exposures, and standards—built to make a confusing risk landscape legible.",
    details: ["Evidence before alarm", "Food-category and serving-size context", "Research designed for real decisions"],
  },
  {
    id: "project-microbiome", label: "MICROBIOME MEDICINE", eyebrow: "OPEN RESEARCH", href: "https://microbiomemedicine.com/conditions/endometriosis", icon: "microbiome", color: "#38cfc5", x: -27, z: -41, rotation: 0.08, points: 150, cta: "EXPLORE THE ENDOMETRIOSIS RESEARCH · +150", founder: "FOUNDED BY KAREN PENDERGRASS",
    copy: "MicrobiomeMedicine.com organizes condition-associated microbial signatures and explains what changes in the microbial ecosystem may mean for diagnosis, mechanism, and treatment.",
    details: ["Condition-specific microbial signatures", "Bacteria, fungi, viruses, and host context", "Free research infrastructure"],
  },
  {
    id: "project-phage", label: "PHAGE COCKTAILS", eyebrow: "PRECISION ANTIBIOTICS", href: "https://phagecocktails.com", icon: "phage", color: "#8ce0be", x: -18, z: -39, rotation: 0, points: 150, cta: "ENTER PHAGECOCKTAILS.COM · +150", founder: "FOUNDED BY KAREN PENDERGRASS",
    copy: "A scientific platform about bacteriophage therapy: strain-targeted viruses that can kill pathogenic bacteria while preserving the surrounding microbiome.",
    details: ["Phage Therapy 101 and landmark cases", "A Build-a-Cocktail Lab", "50 open-source, CC0 grant proposals"],
  },
  {
    id: "project-wikibiome", label: "WIKIBIOME", eyebrow: "FREE KNOWLEDGE", href: "https://wikibiome.com", icon: "wikibiome", color: "#b997e8", x: -9, z: -41, rotation: -0.08, points: 150, cta: "OPEN WIKIBIOME · +150", founder: "FOUNDED BY KAREN PENDERGRASS",
    copy: "WikiBiome is open microbiome infrastructure: a public, browsable knowledge project for making microbial evidence easier to find and connect.",
    details: ["Free to use", "Built for cross-condition discovery", "Part of Karen's open microbiome work"],
  },
  {
    id: "project-tinies", label: "TINIES", eyebrow: "OUR ANIMALS", href: "https://tinies.app", icon: "tinies", color: "#ff9cae", x: 27, z: 31, rotation: 0.1, points: 150, cta: "OPEN TINIES.APP · +150", founder: "FOUNDED BY KAREN PENDERGRASS",
    copy: "Tinies is a pet-services marketplace and international animal-adoption platform created from Karen's daily experience caring for more than 90 sanctuary cats.",
    details: ["Verified pet care", "Rescue adoption", "A business model intended to help fund animal welfare"],
  },
  {
    id: "project-gardens", label: "THE GARDENS", eyebrow: "GARDENS OF ST. GERTRUDE", href: "https://gardensofstgertrude.org", icon: "gardens", color: "#f4c56c", x: 39, z: 27, rotation: -0.08, points: 150, cta: "MEET THE SANCTUARY · +150", founder: "FOUNDED BY KAREN PENDERGRASS",
    copy: "Gardens of St. Gertrude is Karen's real 501(c)(3) cat sanctuary in Cyprus. The work is daily, physical, expensive, and currently supports more than 90 cats.",
    details: ["Rescue and long-term sanctuary care", "Food, veterinary care, shelter, and sterilization", "A real place—not a brand metaphor"],
  },
];

/** Real advertising boards: large, photographic landmarks rather than boxes. */
export const billboards: FieldLink[] = [
  {
    id: "billboard-tinies", label: "TINIES.APP", eyebrow: "NO MATTER THE SIZE", href: "https://tinies.app/blog/she-built-a-tech-company-to-feed-92-cats", cta: "READ THE STORY BEHIND TINIES · +250", color: "#ff9cae", x: 54, z: 35, rotation: -Math.PI * 0.5, points: 250,
    founder: "FOUNDED BY KAREN PENDERGRASS", image: "https://raw.githubusercontent.com/paleofoundation/Cats/main/assets/hero_cats_v2.jpg",
    copy: "Book trusted pet care. Find a rescue animal. Meet the platform built from the reality of caring for 92 cats.",
    details: ["Pet services marketplace", "International animal adoption", "Read why Karen built a tech company to feed 92 cats"],
  },
  {
    id: "billboard-gutsies", label: "GUTSIES.COM", eyebrow: "HAPPY GUTS FOR KIDS", href: "https://gutsies.com/#products", cta: "OPEN GUTSIES.COM · +150", color: "#36bbb6", x: 17, z: -13, rotation: 0.22, points: 150,
    founder: "FOUNDED BY KAREN PENDERGRASS", image: "https://gutsies.com/assets/gutsies-tiny-tummies-strawberry-probiotic-gummies-bottle.png", logoImage: "https://gutsies.com/assets/gutsies-logo-happy-guts-for-kids.png",
    copy: "Pediatric gut health without the daily battle: probiotic and prebiotic products for children, with clinically studied strains, no synthetic dyes, and heavy-metal testing with public certificates of analysis.",
    details: ["Probiotic + prebiotic gummies", "Products for infants and children", "Every batch tested for lead, arsenic, cadmium, and mercury"],
  },
  {
    id: "billboard-swovee", label: "SWOVEE.COM", eyebrow: "EARTH · MOON · MARS", href: "https://swovee.com/real-world", cta: "OPEN THE REAL-WORLD ROVALIZER · +150", color: "#63aef8", x: 51, z: -22, rotation: -0.72, points: 150,
    founder: "A PROJECT FOUNDED BY KAREN PENDERGRASS · 2017", image: "https://swovee.com/swovee-simulator-first-shelter.png",
    copy: "Swovee explores mobile additive construction and autonomous surface industrialization across Earth, Moon, and Mars simulations. The A02 Rovalizer scans terrain, plans within constraints, mixes material onboard, and prints while moving.",
    details: ["Robotics + laser scanning + AI", "Mobile large-format 3D printing", "Playable Earth, Moon, and Mars simulations"],
  },
  {
    id: "billboard-consulting", label: "KAREN PENDERGRASS", eyebrow: "AVAILABLE FOR CONSULTING", href: "/advisory", cta: "VIEW KAREN'S ADVISORY WORK · +250", color: "#d5ff50", x: 8, z: 49, rotation: Math.PI - 0.08, points: 250,
    founder: "HEAVY METALS · MICROBIOME · METALLOMICS · AI", image: "/images/Karen_Pendergrass.png",
    copy: "Karen advises organizations working across heavy-metal regulations, certification systems, microbiome science, microbial metallomics, AI-first operations, and animal-welfare governance.",
    details: ["Heavy-metal regulation + certification", "Microbiome science + microbial metallomics", "Board, scientific advisory, consulting, and speaking engagements"],
  },
];

/** Short roadside questions. Their answers live in dashboard briefings. */
export const knowledgeSigns: FieldLink[] = [
  {
    id: "definition-phage",
    label: "WHAT IS A PHAGE COCKTAIL?",
    eyebrow: "MICROBIOME MEDICINE × PRECISION ANTIBIOTICS",
    href: "https://phagecocktails.com/101",
    cta: "OPEN PHAGE THERAPY 101",
    copy: "A phage cocktail is a deliberately selected combination of bacteriophages—viruses that infect bacteria—designed to target a pathogenic bacterial strain or a broader group of related strains. Because an individual phage usually has a narrow host range, combining complementary phages broadens coverage and makes it harder for bacteria to escape through resistance. Unlike broad-spectrum antibiotics, a well-matched cocktail can remove the target organism while leaving much of the surrounding microbiome intact.",
    color: "#8ce0be",
    x: -17,
    z: -29,
    rotation: 0.08,
    points: 150,
  },
  {
    id: "definition-tinies",
    label: "WHAT ARE TINIES?",
    eyebrow: "ROADSIDE QUESTION",
    href: "https://tinies.app",
    cta: "VISIT TINIES.APP",
    articleHref: "https://tinies.app/blog/she-built-a-tech-company-to-feed-92-cats",
    articleCta: "READ: SHE BUILT A TECH COMPANY TO FEED 92 CATS · +250",
    copy: "Tinies — named for what Karen has always called animals, all animals, regardless of size (\"An elephant is a tiny. A bug is a tiny. A Great Dane is a tiny too.\") — is a pet services marketplace and international animal adoption platform. \"All tinies is tinies.\"",
    color: "#ff9cae",
    x: 17,
    z: 28,
    rotation: -0.18,
    points: 150,
  },
  {
    id: "definition-microbiome",
    label: "WHAT IS MICROBIOME MEDICINE?",
    eyebrow: "ROADSIDE QUESTION",
    href: "https://microbiomemedicine.com/definition/microbiome-medicine",
    cta: "READ THE FULL MICROBIOME MEDICINE DEFINITION · +150",
    copy: "Microbiome Medicine is an emerging medical field focused on understanding and treating health conditions by analyzing and modifying the trillions of microbes—including bacteria, fungi, and viruses—that live in and on the human body. It treats this microbial ecosystem as a vital functional organ that influences digestion, immunity, metabolism, and brain health.",
    color: "#38cfc5",
    x: -7,
    z: -31,
    rotation: 0.15,
    points: 150,
  },
  {
    id: "definition-metallomics",
    label: "WHAT IS MICROBIAL METALLOMICS?",
    eyebrow: "HEAVY METALS × MICROBES",
    href: "/frameworks/microbial-metallomics",
    cta: "EXPLORE THE FRAMEWORK",
    copy: "Microbial metallomics is the study of how metal ions interact with microbial systems, specifically focusing on how heavy metals transform, bind, and drive disease processes within the human gut microbiome.\n\nKey Concepts\nMetal Homeostasis: How gut microbes balance essential and toxic metal levels.\nMetallo-speciation: The chemical forms and changes of metals in gut environments.\nHost-Microbe Interactions: How metals affect competition between good and bad bacteria.\nPathogenesis: How heavy metal exposure triggers disease-causing traits in pathogens.\n\nGut Impact\nToxicity Shifts: Heavy metals alter the balance of normal gut bacteria.\nVirulence Activation: Metals signal pathogens to cause inflammation or damage.\nResistance Spread: Microbes share genes to survive metal stress.",
    color: "#d5ff50",
    x: -31,
    z: -32,
    rotation: -0.12,
    points: 150,
  },
  {
    id: "definition-pet-food",
    label: "PET FOOD, HUMAN-GRADE STANDARDS",
    eyebrow: "HEAVY METALS × TINIES",
    href: "https://heavymetalcertified.com",
    cta: "SEE THE HEAVY METAL CERTIFICATION PROGRAM",
    copy: "We certify pet foods using human-grade standards through the Heavy Metal Certification program—because animals deserve the same serious evidence and safety thinking.",
    color: "#f4c56c",
    x: -13,
    z: 12,
    rotation: -0.5,
    points: 150,
  },
];
export const articleSignals: FieldLink[] = [];
export const fieldOperations: FieldOperation[] = [];

export const mapExtent = 74;
export const markedZones = expeditionZones;
