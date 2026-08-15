export const DONATION_PROGRAMS = {
  tinies: {
    amountCents: 100,
    amountLabel: '$1',
    project: 'Tinies',
    productName: 'Gardens of St. Gertrude Cat Food Mission',
    description: 'A $1 contribution toward food and care for the 90+ sanctuary cats behind Tinies.',
    successEyebrow: 'PAYMENT VERIFIED · GARDENS OF ST. GERTRUDE',
    successTitle: 'THE CATS THANK YOU.',
    successCopy: 'Your $1 contribution was confirmed. Return to the expedition tab: cat-safety penalties will be restored and the 1,000-point sanctuary bonus will be added automatically.',
    rewardPoints: 1000,
  },
  'tinies-safari': {
    amountCents: 1000,
    amountLabel: '$10',
    project: 'Tinies',
    productName: 'Swovee Safari · Gardens of St. Gertrude Support',
    description: 'A $10 contribution toward food, veterinary care, and daily care for the 90+ sanctuary cats behind Tinies.',
    successEyebrow: 'PAYMENT VERIFIED · GARDENS OF ST. GERTRUDE',
    successTitle: 'TEN TIMES THE POINTS. REAL HELP FOR THE CATS.',
    successCopy: 'Your $10 contribution was confirmed. Return to the Safari tab: your score will be multiplied by ten and cat-safety penalties will be restored automatically.',
    rewardPoints: 10,
  },
  'microbiome-medicine': {
    amountCents: 500,
    amountLabel: '$5',
    project: 'Microbiome Medicine',
    productName: 'Coffee for Microbiome Medicine',
    description: 'Help keep MicrobiomeMedicine.com freely available while its research library continues to grow.',
    successEyebrow: 'PAYMENT VERIFIED · OPEN KNOWLEDGE CAFE',
    successTitle: 'COFFEE RECEIVED.',
    successCopy: 'Your $5 coffee for Microbiome Medicine was confirmed. Return to the expedition tab to collect the 750-point Open Knowledge bonus.',
    rewardPoints: 750,
  },
  wikibiome: {
    amountCents: 500,
    amountLabel: '$5',
    project: 'WikiBiome',
    productName: 'Coffee for WikiBiome',
    description: 'Help keep WikiBiome.com open and free while the public microbiome knowledge platform continues to grow.',
    successEyebrow: 'PAYMENT VERIFIED · OPEN KNOWLEDGE CAFE',
    successTitle: 'COFFEE RECEIVED.',
    successCopy: 'Your $5 coffee for WikiBiome was confirmed. Return to the expedition tab to collect the 750-point Open Knowledge bonus.',
    rewardPoints: 750,
  },
} as const;

export type DonationPurpose = keyof typeof DONATION_PROGRAMS;

export function resolveDonationPurpose(value: unknown): DonationPurpose {
  return typeof value === 'string' && value in DONATION_PROGRAMS
    ? value as DonationPurpose
    : 'tinies';
}
