// Single source of truth for Karen's six ventures.
//
// Pure data — NO `fs` import — so it is safe to consume from both server
// components (app/ventures, app/page) and the JSON-LD module. Previously this
// data was hand-duplicated across lib/content.ts (getVentures), app/page.tsx
// (ventureRows), and components/JsonLd.tsx (founder[]), which had drifted.

export interface VentureSubLink {
  name: string;
  url: string;
  note: string;
}

export interface Venture {
  name: string;
  slug: string;
  url: string;
  /** Short uppercase label for the homepage ventures table */
  tag: string;
  /** One-line description for the homepage ventures table */
  homeDescription: string;
  /** Karen's role — shown on /ventures */
  role: string;
  /** Tagline — shown on /ventures */
  tagline: string;
  /** Full description — shown on /ventures */
  description: string;
  /** Terse description used in JSON-LD founder[] structured data */
  schemaDescription: string;
  status: 'active' | 'building' | 'research';
  /** Sub-properties surfaced under this venture (e.g. the Paleo Foundation heavy-metal stack) */
  subLinks?: VentureSubLink[];
}

export const ventures: Venture[] = [
  {
    name: 'Paleo Foundation',
    slug: 'paleo-foundation',
    url: 'https://paleofoundation.com',
    tag: 'Standards',
    homeDescription: 'Certification standards for Paleo, Keto, Grain-Free, HMTc',
    role: 'Founder & CEO',
    tagline: 'Certification standards for Paleo, Keto, Grain-Free, and Heavy Metal Tested products',
    description:
      'For over 15 years, the Paleo Foundation has designed and implemented food certification standards used globally by manufacturers and brands. The Heavy Metal Tested and Certified (HMTc) program establishes category-specific contaminant limits using ALARA-based principles and statistical risk matrices for food, supplements, and personal care products.',
    schemaDescription:
      'Food certification standards organization for Paleo, Keto, Grain-Free, and Heavy Metal Tested & Certified (HMTc) programs.',
    status: 'active',
    subLinks: [
      {
        name: 'Heavy Metal Tested',
        url: 'https://heavymetaltested.com',
        note: 'HMTc certification & certified-product directory',
      },
      {
        name: 'Heavy Metal Index',
        url: 'https://heavymetalindex.com',
        note: 'Public heavy-metal evidence database',
      },
    ],
  },
  {
    name: 'Microbiome Medicine',
    slug: 'microbiome-medicine',
    url: 'https://microbiomemedicine.com',
    tag: 'Research',
    homeDescription: 'Disease-associated microbiome patterns for clinical translation',
    role: 'Founder & Lead Researcher',
    tagline: 'Formalizing disease-associated microbiome patterns for clinical translation',
    description:
      'A clinician- and researcher-facing database designed to formalize disease-associated microbiome patterns through Major Microbial Associations (MMAs) and facilitate intervention development using a structured Microbial Shift and Realignment Process (MSRP). The validation framework requires interventions to both restore altered taxa and yield clinical improvement, co-validating the intervention and the underlying microbial signature.',
    schemaDescription:
      'Clinician-facing database formalizing disease-associated microbiome patterns through Major Microbial Associations (MMAs).',
    status: 'active',
  },
  {
    name: 'Journal of Food Metallomics',
    slug: 'journal-of-food-metallomics',
    url: 'https://microbialmetallomics.com',
    tag: 'Publication',
    homeDescription: 'Trace metal analysis meets microbiome and food safety',
    role: 'Founder & Editor',
    tagline: 'Integrating trace metal analysis into microbiome and food safety research',
    description:
      'Foundational work introducing microbial metallomics as a critical lens to interpret pathogen virulence, microbial selection pressure, and nutrient-immune interactions in chronic diseases. Research focuses on the differential acquisition, utilization, and detoxification of trace elements among taxa enriched in disease states.',
    schemaDescription:
      'Research publication integrating trace metal analysis into microbiome and food safety research.',
    status: 'research',
  },
  {
    name: 'WikiBiome',
    slug: 'wikibiome',
    url: 'https://wikibiome.com',
    tag: 'Platform',
    homeDescription: 'Open microbiome knowledge platform for researchers and clinicians',
    role: 'Founder',
    tagline: 'Open microbiome knowledge platform',
    description:
      'A comprehensive open-access platform for microbiome research, making disease-associated microbiome signatures and microbial data accessible to researchers, clinicians, and the public.',
    schemaDescription:
      'Open microbiome knowledge platform making disease-associated microbiome signatures and microbial data accessible to researchers, clinicians, and the public.',
    status: 'building',
  },
  {
    name: 'Tinies',
    slug: 'tinies',
    url: 'https://tinies.app',
    tag: 'Social Impact',
    homeDescription: 'Connecting animal sanctuaries with sponsors worldwide',
    role: 'Founder',
    tagline: 'Connecting animal sanctuaries with sponsors and supporters worldwide',
    description:
      'A platform built from the ground up to connect animal sanctuaries with sponsors and supporters. Born from running Gardens of St. Gertrude, a cat sanctuary in Cyprus caring for 92 cats, Tinies addresses the operational and fundraising challenges that sanctuaries face globally.',
    schemaDescription:
      'Platform connecting animal sanctuaries with sponsors and supporters worldwide.',
    status: 'building',
  },
  {
    name: 'Gardens of St. Gertrude',
    slug: 'gardens-of-st-gertrude',
    url: 'https://gardensofstgertrude.com',
    tag: 'Sanctuary',
    homeDescription: 'Cat sanctuary in Parekklisia, Cyprus. 92 cats.',
    role: 'Founder',
    tagline: 'A cat sanctuary in Parekklisia, Cyprus',
    description:
      'A cat sanctuary in Parekklisia, Cyprus, caring for 92 cats. Gardens of St. Gertrude provides permanent shelter, veterinary care, and adoption services for stray and abandoned cats in the Limassol district.',
    schemaDescription: 'Cat sanctuary in Parekklisia, Cyprus, caring for 92 cats.',
    status: 'active',
  },
];
