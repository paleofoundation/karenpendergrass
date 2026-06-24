// The receipts: Karen's documented track record of calling trends early.
// Single source of truth for the /receipts page and the announcement ticker.

export interface Receipt {
  /** Year the call was made. */
  called: string;
  /** Short headline of the call. */
  title: string;
  /** What happened, when, and the gap. */
  detail: string;
  /** Optional short "X years early" badge. */
  gap?: string;
  /** Optional link to a fuller piece or venture. */
  href?: string;
  /** True if href is an external URL. */
  external?: boolean;
}

// Calls that have already played out — the proof.
export const provenReceipts: Receipt[] = [
  {
    called: '2009',
    title: 'Paleo',
    detail:
      'Called the Paleo diet as a coming trend four years before it broke into the mainstream, then built the certification body that now defines the category.',
    gap: '4 years early',
    href: 'https://paleofoundation.com',
    external: true,
  },
  {
    called: '2010',
    title: 'Tiny houses',
    detail:
      'Called the tiny-house movement before it had a name in the culture, years ahead of the wave of shows, builders, and zoning fights that followed.',
  },
  {
    called: '2011',
    title: 'Microbiome medicine',
    detail:
      'Called microbiome medicine as a coming field when there was no curriculum, no journal, and no name for the work I was already doing.',
    href: '/frameworks/microbial-metallomics',
  },
  {
    called: '2012',
    title: 'First recorded FMT for celiac disease',
    detail:
      'Became the first person on record to receive a fecal microbiota transplant for celiac disease, four years before an "accidental" case was reported as curative.',
    gap: '4 years early',
    href: '/writing/uncredentialed-expertise-credentialism-innovation',
  },
  {
    called: '2013',
    title: 'Keto',
    detail:
      'Called the ketogenic diet as a mainstream trend at the front of the curve, while it was still a clinical footnote to most people.',
  },
  {
    called: '2020',
    title: 'Fiber on the front of the can',
    detail:
      'Told Fred Hart that Pepsi would one day put fiber and prebiotics on the front of its cans and advertise it proudly. He thought I was crazy. It shipped in 2026.',
    gap: '6 years early',
  },
  {
    called: '2020',
    title: 'The nickel problem',
    detail:
      'Called nickel as the heavy metal regulators would be forced to confront in food, and said agencies would move on it. The EU began regulating nickel in foods in 2025.',
    gap: '5 years early',
    href: '/writing/california-prop-65-nickel-developmental-toxicity',
  },
];

// Calls already on the board, still playing out — the open positions.
export const standingReceipts: Receipt[] = [
  {
    called: 'Standing',
    title: 'Phage therapy for antimicrobial resistance',
    detail:
      'Called bacteriophage therapy as the real answer to antimicrobial resistance, and bought phagecocktails.com to back the conviction with more than words.',
    href: '/writing/phage-therapy-the-answer-no-one-is-funding',
  },
  {
    called: '2015',
    title: 'Prebiotic gummies for kids',
    detail:
      'Bought gutsies.com, now a five-figure domain, cheaply in 2015 with the idea of building prebiotic gummies for children long before "gut health for kids" became a shelf.',
  },
  {
    called: '2017',
    title: 'The Swovee Rovalizer',
    detail:
      'Dreamt up a mobile 3D-printing machine that uses AI to scan terrain and terraform, and bought the AI, robotics, and mobile-printing domains to match, years before the AI and robotics boom.',
  },
  {
    called: 'Next',
    title: 'Heavy metals as the consumer-health issue of the decade',
    detail:
      'The call I am making now: heavy metals in the food supply become the defining consumer-health story, and certification infrastructure has to exist before the wave crests.',
    href: '/frameworks/microbial-metallomics',
  },
];

export const oracleQuote = {
  text: 'Well, if it isn’t the Oracle herself.',
  author: 'Fred Hart',
  role: 'Partner & Creative Director, Interact',
};

// Short, year-stamped lines for the scrolling announcement ticker.
export const tickerReceipts: string[] = [
  'Called Paleo in 2009, four years early',
  'Called tiny houses in 2010',
  'Called microbiome medicine in 2011',
  'First recorded FMT for celiac disease, 2012',
  'Called Keto in 2013',
  'Said Pepsi would put fiber on the can in 2020. It shipped in 2026',
  'Called the nickel problem in 2020. The EU began regulating in 2025',
  'Called phage therapy for antimicrobial resistance',
];
