import type { DonationPurpose } from "@/lib/donations";
import type { FieldIcon } from "./types";

export type ZoneKind =
  | "foundry"
  | "wetlands"
  | "brain"
  | "observatory"
  | "sanctuary"
  | "harbor"
  | "lab"
  | "finish";

export type FieldBriefing = {
  title: string;
  readingTime: string;
  intro: string;
  points: string[];
  receipt?: string;
  timeline?: Array<{ year: string; event: string }>;
};

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
  support?: {
    title: string;
    description: string;
    href: string;
    cta: string;
    bonus: number;
  };
  briefing?: FieldBriefing;
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

export const expeditionZones: ExpeditionZone[] = [
  {
    id: "heavy-metal-index",
    index: "01",
    kind: "foundry",
    title: "Heavy Metal Index",
    label: "PUBLIC EVIDENCE INFRASTRUCTURE",
    kicker: "Every claim should resolve to its source",
    description:
      "A public reference system for tracing heavy metals through foods, ingredients, product categories, regulations, and the literature behind them.",
    x: -43,
    z: -12,
    radius: 9,
    color: "#ffad4f",
    href: "https://heavymetalindex.com",
    cta: "OPEN HEAVYMETALINDEX.COM",
    founder: "FOUNDED BY KAREN PENDERGRASS",
    briefing: {
      title: "Trace the claim, not just the conclusion",
      readingTime: "4 MIN BRIEF",
      intro:
        "Heavy Metal Index is built as evidence infrastructure rather than a list of scary numbers. Metals, commodities, consumer categories, agency limits, and source documents are connected so a reader can move backward from a claim to the document and methods that produced it.",
      points: [
        "36 metal profiles cover toxicology, exposure routes, and regulatory reference values.",
        "257 ingredient profiles and 416 product categories show where contamination begins and where consumers encounter it.",
        "173 regulation pages separate binding limits, action levels, guidance, and health-based intake values.",
        "More than 3,000 source records preserve methods, extracted values, citations, and document hashes.",
      ],
      receipt: "The system publishes its own coverage gaps, audit trail, correction record, and revision history.",
    },
  },
  {
    id: "microbiome-medicine",
    index: "02",
    kind: "wetlands",
    title: "Microbiome Medicine",
    label: "DISEASE ECOSYSTEMS",
    kicker: "The microbial system under the diagnosis",
    description:
      "A research platform connecting conditions, microbes, metals, interventions, and testable microbiome signatures instead of reducing disease to a single organism.",
    x: -22,
    z: -45,
    radius: 9,
    color: "#5de5d6",
    href: "https://microbiomemedicine.com",
    cta: "OPEN MICROBIOMEMEDICINE.COM",
    founder: "FOUNDED BY KAREN PENDERGRASS",
    briefing: {
      title: "Map the ecosystem before choosing the intervention",
      readingTime: "5 MIN BRIEF",
      intro:
        "Microbiome Medicine organizes research around condition-specific ecological patterns: which organisms expand or disappear, what virulence functions they carry, which environmental pressures select for them, and which interventions might change the system.",
      points: [
        "Condition hubs connect women’s health, autoimmune disease, brain health, cardiometabolic disease, and more.",
        "Microbiome signatures turn recurring microbial patterns into hypotheses that can be triangulated and tested.",
        "Microbial metallomics examines how nickel, iron, zinc, cadmium, and other metals reshape community structure and virulence.",
        "Intervention records distinguish mechanisms, evidence strength, and unresolved questions.",
      ],
      receipt: "The platform grew from Karen’s 2012 self-experiment with FMT for Celiac Disease—years before the first published case report.",
    },
  },
  {
    id: "heavy-metal-certified",
    index: "03",
    kind: "observatory",
    title: "Heavy Metal Certified",
    label: "CATEGORY-SPECIFIC STANDARDS",
    kicker: "Evidence becomes a standard people can use",
    description:
      "Certification infrastructure for a food system that needs limits grounded in category, exposure, surveillance, testing, and continuous improvement—not one universal cutoff. The work behind Heavy Metal Certified has also funded and fed Karen’s sanctuary cats for years.",
    x: 15,
    z: -35,
    radius: 9,
    color: "#ffd45d",
    href: "https://heavymetalcertified.com",
    cta: "OPEN HEAVYMETALCERTIFIED.COM",
    founder: "FOUNDED BY KAREN PENDERGRASS",
    briefing: {
      title: "The limit has to fit the category",
      readingTime: "4 MIN BRIEF",
      intro:
        "Heavy Metal Certified translates a messy regulatory and toxicological landscape into a certification system. The core idea is that limits should reflect the actual category, serving size, consumption pattern, background contamination, and what is technically achievable.",
      points: [
        "Category-specific thresholds avoid pretending every food and supplement creates the same exposure.",
        "ALARA—As Low As Reasonably Achievable—turns certification into a ratchet for improvement rather than a permanent permission slip.",
        "Testing protocols, surveillance, corrective action, and public standards make the mark more than a one-time laboratory result.",
        "The Index supplies the evidence layer; certification translates that evidence into operating rules.",
      ],
      receipt: "Karen began constructing the framework before heavy-metal certification became a mainstream market demand. Heavy Metal Certified has quietly been the work funding the food and care of the Gardens of St. Gertrude cats all these years.",
    },
  },
  {
    id: "karens-brain",
    index: "04",
    kind: "brain",
    title: "Karen’s Brain",
    label: "REASONING ENGINE",
    kicker: "A method designed to argue with itself",
    description:
      "A codified discovery engine that reconstructs disease ecosystems, maps vulnerabilities, predicts interventions, triangulates the evidence, and revises itself when contradictions survive.",
    x: 47,
    z: -43,
    radius: 9,
    color: "#b98cff",
    href: "/karens-brain",
    cta: "OPEN KAREN’S BRAIN",
    briefing: {
      title: "Triangulation before certainty",
      readingTime: "5 MIN BRIEF",
      intro:
        "Karen’s Brain is the method underneath the projects: collect the signal, reconstruct the system that could produce it, search for disconfirming evidence, and promote a conclusion only when different evidence routes converge.",
      points: [
        "Start with a pattern that conventional explanations leave unresolved.",
        "Map organisms, functions, environmental pressures, host response, and plausible causal paths.",
        "Use contradictions as revision instructions rather than inconveniences.",
        "Translate the surviving model into testable interventions, standards, or research programs.",
      ],
      receipt: "The method is built to preserve the chain from observation to claim—and to show where the chain is still weak.",
    },
  },
  {
    id: "swovee",
    index: "05",
    kind: "lab",
    title: "Swovee Rovalizer",
    label: "SCAN · REASON · PRINT",
    kicker: "Terrain becomes intelligence; intelligence becomes structure",
    description:
      "Swovee began in 2017 as an idea: robotics, 3D printing, laser scanning, and AI would someday have a baby—built for terraforming, or the more immediate work of construction here on Earth.",
    x: 43,
    z: 0,
    radius: 10,
    color: "#5ba9ff",
    href: "https://swovee.com",
    cta: "OPEN SWOVEE.COM",
    founder: "FOUNDED BY KAREN PENDERGRASS · 2017",
    briefing: {
      title: "A machine that reads a place and then builds for it",
      readingTime: "4 MIN BRIEF",
      intro:
        "The Rovalizer is the Swovee machine at the center of this expedition. It scans unfamiliar terrain, turns geometry and constraints into a model, reasons about what the site needs, and additively manufactures structures directly into the environment.",
      points: [
        "Robotics provides movement, positioning, tool control, and autonomous field operation.",
        "Laser scanning turns terrain and existing structures into precise, navigable geometry.",
        "AI interprets the site, plans the intervention, and adapts the build as conditions change.",
        "Large-format 3D printing converts that plan into shelters, infrastructure, reinforcement, or extraterrestrial habitats.",
      ],
      receipt: "The idea predates today’s convergence of autonomous construction, embodied AI, and large-format additive manufacturing.",
    },
  },
  {
    id: "tinies",
    index: "06",
    kind: "sanctuary",
    title: "Tinies",
    label: "SANCTUARY INFRASTRUCTURE",
    kicker: "Repair the system, not the fundraising loop",
    description:
      "Karen founded Tinies after building a real-life sanctuary first. Gardens of St. Gertrude in Cyprus cares for 90+ cats; the cats pictured by Tinies are the actual animals that made the platform necessary. Heavy Metal Certified has been the work funding and feeding them behind the scenes.",
    x: 48,
    z: 34,
    radius: 9,
    color: "#ff9cae",
    href: "https://tinies.app",
    cta: "OPEN TINIES.APP",
    founder: "FOUNDED BY KAREN PENDERGRASS",
    support: {
      title: "Would you give about a dollar toward a bag of cat food?",
      description:
        "A verified $1 gift supports the real cats at Gardens of St. Gertrude. Every small contribution helps with food, litter, housing, and veterinary care.",
      href: "/api/donations/checkout",
      cta: "HELP BUY A BAG OF CAT FOOD",
      bonus: 1000,
    },
    briefing: {
      title: "Make care visible, specific, and sustainable",
      readingTime: "3 MIN BRIEF",
      intro:
        "Tinies starts with a practical question: what if the recurring costs of sanctuary care could be connected to recurring, emotionally legible sponsorship instead of endless crisis fundraising?",
      points: [
        "Individual animal stories make care concrete without hiding the operating system behind them.",
        "Recurring sponsorship gives sanctuaries a more predictable base for food, medicine, and housing.",
        "The platform is shaped by Gardens of St. Gertrude and the daily reality of feeding, housing, and treating more than 90 cats.",
      ],
      receipt: "Karen founded both the sanctuary and Tinies: she ran the rescue system first, then built the tool that system was missing.",
    },
  },
  {
    id: "phage-cocktails",
    index: "07",
    kind: "harbor",
    title: "Phage Cocktails",
    label: "PRECISION ANTIBACTERIALS",
    kicker: "Beyond broad-spectrum collateral damage",
    description:
      "A research and education platform exploring bacteriophages as precision antibacterials, from strain matching and biofilms to clinical translation and fundable study designs.",
    x: 20,
    z: 44,
    radius: 9,
    color: "#d5ff50",
    href: "https://phagecocktails.com",
    cta: "OPEN PHAGECOCKTAILS.COM",
    founder: "FOUNDED BY KAREN PENDERGRASS",
    briefing: {
      title: "Target the pathogen, preserve the ecosystem",
      readingTime: "5 MIN BRIEF",
      intro:
        "Bacteriophages infect bacteria with extraordinary specificity. Cocktails combine multiple phages to broaden strain coverage, attack biofilms, and make resistance harder—without treating the entire microbiome as collateral damage.",
      points: [
        "Application dossiers map where phages may fit: chronic wounds, cystic fibrosis, food safety, transplant preparation, and more.",
        "The Steal This Grant library turns promising mechanisms into concrete, auditable research programs.",
        "Phage–antibiotic combinations can exploit different killing mechanisms and sometimes steer resistance toward reduced virulence or renewed drug sensitivity.",
        "The project is scientific and educational; clinical use belongs in regulated trials and physician-led pathways.",
      ],
      receipt: "The platform is designed to make an underfunded therapeutic field legible enough to investigate, challenge, and fund.",
    },
  },
  {
    id: "receipts",
    index: "08",
    kind: "observatory",
    title: "The Receipts",
    label: "DOCUMENTED TRACK RECORD",
    kicker: "Early only counts if it is on the record",
    description:
      "A field archive of forecasts, experiments, projects, and published work that existed before the market—or the literature—caught up.",
    x: -24,
    z: 42,
    radius: 10,
    color: "#ff765e",
    href: "/receipts",
    cta: "VIEW THE RECEIPTS DOSSIER",
    briefing: {
      title: "Called the last decade. Calling the next one.",
      readingTime: "6 MIN BRIEF",
      intro:
        "The receipts are not a claim of being early. They are dated points on a trail: ideas, decisions, projects, and predictions that can be compared with what happened later.",
      points: [
        "The record matters because memory is generous and hindsight is cheap.",
        "A forecast becomes useful when its date, specificity, and eventual outcome are visible together.",
        "The same pattern repeats across diet, microbiome science, food standards, heavy metals, and product trends: identify the signal, then build before consensus arrives.",
      ],
      timeline: [
        { year: "2009", event: "Founded the Paleo Foundation after being told there was no market. The market arrived." },
        { year: "2012", event: "First documented FMT for Celiac Disease—four years before the first published case report." },
        { year: "2020", event: "Told Fred Hart that Pepsi would put prebiotics on its cans. Pepsi confirmed the direction in 2026." },
        { year: "2025", event: "Only non-PhD among 150 researchers invited to the Beneficial Microbes Conference." },
        { year: "2026", event: "Published Microbiome Medicine Journal, Volume I, with five original Parkinson’s disease papers." },
      ],
      receipt: "Receipts turn intuition into an inspectable track record—and give the next forecast a standard it has to meet.",
    },
  },
  {
    id: "finish",
    index: "END",
    kind: "finish",
    title: "Signal Gate",
    label: "EXPEDITION CONTROL",
    kicker: "Return the field record",
    description:
      "Log your callsign, publish the run to the expedition board, and compare how much of Karen’s frontier each driver mapped.",
    x: 0,
    z: 61,
    radius: 8,
    color: "#f0f7e8",
    href: "/contact",
    cta: "CONTACT KAREN",
  },
];

export const oracleBlocks: OracleBlock[] = [
  { id: "oracle-a", x: -29, z: 3, rotation: 0.22 },
  { id: "oracle-b", x: 2, z: -23, rotation: -0.18 },
  { id: "oracle-c", x: 30, z: 18, rotation: 0.12 },
];

export const socialLinks: FieldLink[] = [
  { id: "social-linkedin", label: "LINKEDIN", eyebrow: "KAREN ON", href: "https://www.linkedin.com/in/karenpendergras/", icon: "linkedin", color: "#0a66c2", x: -83, z: -43, rotation: Math.PI + 0.19 },
  { id: "social-instagram", label: "INSTAGRAM", eyebrow: "MICROMETALLOMICS", href: "https://www.instagram.com/micrometallomics", icon: "instagram", color: "#e55292", x: -77, z: -46, rotation: Math.PI + 0.1 },
  { id: "social-x", label: "X / TWITTER", eyebrow: "@MICROMETALOMICS", href: "https://x.com/micrometalomics", icon: "x", color: "#eef7e9", x: -71, z: -47, rotation: Math.PI },
  { id: "social-facebook", label: "FACEBOOK", eyebrow: "KAREN PENDERGRASS", href: "https://www.facebook.com/karen.pendergrass/", icon: "facebook", color: "#1877f2", x: -65, z: -46, rotation: Math.PI - 0.1 },
  { id: "social-email", label: "EMAIL KAREN", eyebrow: "FIELD CONTACT", href: "/contact", icon: "email", color: "#ffad4f", x: -59, z: -43, rotation: Math.PI - 0.19 },
  { id: "social-orcid", label: "ORCID 0000-0002-2348-7259", eyebrow: "PAPERS · PUBLICATIONS · RECORD", href: "https://orcid.org/0000-0002-2348-7259", icon: "orcid", color: "#a6ce39", x: -71, z: -36, rotation: Math.PI },
];

export const supportLinks: FieldLink[] = [
  { id: "support-microbiome", label: "MICROBIOME MEDICINE", eyebrow: "FREE RESEARCH PLATFORM · COFFEE OPTIONAL", href: "https://microbiomemedicine.com", icon: "microbiome", supportPurpose: "microbiome-medicine", color: "#5de5d6", x: -62, z: 56, rotation: Math.PI + 0.1 },
  { id: "support-wikibiome", label: "WIKIBIOME", eyebrow: "FREE KNOWLEDGE PLATFORM · COFFEE OPTIONAL", href: "https://wikibiome.com", icon: "wikibiome", supportPurpose: "wikibiome", color: "#b98cff", x: -52, z: 58, rotation: Math.PI - 0.1 },
];

export const articleSignals: FieldLink[] = [
  { id: "article-metallomics", label: "MICROBIAL METALLOMICS", eyebrow: "FIELD ARTICLE 01", href: "/writing/microbial-metallomics-and-heavy-metal-contamination", color: "#5de5d6", x: -83, z: 27, rotation: 0.13 },
  { id: "article-index", label: "TRACE IT TO SOURCE", eyebrow: "FIELD ARTICLE 02", href: "/writing/heavy-metal-index-tracing-food-contamination-to-source", color: "#ffad4f", x: -77, z: 29, rotation: 0.04 },
  { id: "article-future", label: "2030 TRENDS", eyebrow: "FIELD ARTICLE 03", href: "/writing/2030-trends", color: "#b98cff", x: -71, z: 29, rotation: -0.04 },
  { id: "article-phage", label: "THE UNFUNDED ANSWER", eyebrow: "FIELD ARTICLE 04", href: "/writing/phage-therapy-the-answer-no-one-is-funding", color: "#d5ff50", x: -65, z: 27, rotation: -0.13 },
  { id: "article-flattening", label: "THE FLATTENING", eyebrow: "FIELD ARTICLE 05", href: "/writing/the-flattening", color: "#ff765e", x: -80, z: 37, rotation: 0.08 },
  { id: "article-tinies", label: "WHY I BUILT TINIES", eyebrow: "FIELD ARTICLE 06", href: "/writing/why-i-built-tinies", color: "#ff9cae", x: -68, z: 37, rotation: -0.08 },
];

export const fieldOperations: FieldOperation[] = [
  {
    id: "metals-survey",
    zoneId: "heavy-metal-index",
    code: "OP–01",
    title: "Trace the Contamination",
    color: "#ffad4f",
    reward: 700,
    intro: "A commodity lot has returned three conflicting metal readings. Survey the actual field samples, decide which evidence rule survives, then print a permanent sampling station.",
    scanInstruction: "Drive through the three amber sample beacons around the foundry.",
    checkpoints: [
      { id: "ore-a", label: "SOURCE ORE", x: -50, z: -17 },
      { id: "ore-b", label: "PROCESS LOT", x: -37, z: -19 },
      { id: "ore-c", label: "FINISHED SAMPLE", x: -35, z: -7 },
    ],
    question: "Which rule produces the most defensible certification threshold?",
    options: [
      "Use one universal number for every product so the label stays simple.",
      "Combine category, serving size, consumption pattern, exposure evidence, surveillance, and what is technically achievable.",
      "Use whichever laboratory result is lowest and discard the rest as noise.",
    ],
    answer: 1,
    receipt: "Category-specific thresholds preserve both toxicological meaning and the reality of how products are actually consumed.",
    printInstruction: "Return to the amber construction pad east of the foundry and press SPACE to print the sampling station.",
    buildSite: { x: -34, z: -13, radius: 5.4 },
  },
  {
    id: "ecosystem-triangulation",
    zoneId: "microbiome-medicine",
    code: "OP–02",
    title: "Reconstruct the Ecosystem",
    color: "#5de5d6",
    reward: 750,
    intro: "Three microbial signals recur across the wetland. Collect them as a system, reject the seductive single-organism explanation, and print a field triangulation lab.",
    scanInstruction: "Drive through all three cyan ecology beacons in the wetland.",
    checkpoints: [
      { id: "guild-a", label: "COMMUNITY SHIFT", x: -29, z: -49 },
      { id: "guild-b", label: "METAL PRESSURE", x: -17, z: -51 },
      { id: "guild-c", label: "HOST RESPONSE", x: -17, z: -39 },
    ],
    question: "What should the field model privilege before selecting an intervention?",
    options: [
      "The most famous organism in the dataset.",
      "The intervention with the strongest marketing claim.",
      "Converging patterns across community structure, function, environmental pressure, and host response.",
    ],
    answer: 2,
    receipt: "A disease ecosystem is more than a passenger list. Functions, pressures, interactions, and host response determine what the organisms are doing there.",
    printInstruction: "Move onto the cyan construction pad north-east of the wetland and press SPACE to print the triangulation lab.",
    buildSite: { x: -12, z: -42, radius: 5.4 },
  },
  {
    id: "terrain-print",
    zoneId: "swovee",
    code: "OP–03",
    title: "Print for the Place",
    color: "#5ba9ff",
    reward: 800,
    intro: "The site needs a stable field structure. Scan its slope, load path, and access corridor; choose the intervention that belongs to the terrain; then manufacture it in place.",
    scanInstruction: "Survey the three blue terrain stakes surrounding the Swovee test yard.",
    checkpoints: [
      { id: "slope", label: "SLOPE MODEL", x: 35, z: -5 },
      { id: "load", label: "LOAD PATH", x: 49, z: -6 },
      { id: "access", label: "ACCESS CORRIDOR", x: 49, z: 6 },
    ],
    question: "What makes a Rovalizer intervention intelligent rather than merely automated?",
    options: [
      "It prints the same structure everywhere as quickly as possible.",
      "It scans local geometry and constraints, reasons about what the site needs, and adapts the manufactured structure to those conditions.",
      "It replaces every human decision with a larger machine.",
    ],
    answer: 1,
    receipt: "The machine is not the idea. The closed loop between terrain, reasoning, tool control, and a site-specific build is the idea.",
    printInstruction: "Align the Rovalizer inside the blue fabrication pad south-east of the yard and press SPACE to manufacture the structure.",
    buildSite: { x: 38, z: 8, radius: 5.8 },
  },
];

export const mapExtent = 104;

export const markedZones = expeditionZones.filter((zone) => !zone.secret && zone.id !== "finish");
