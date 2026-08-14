import type { Metadata } from 'next';
import DonationReturn from '@/components/frontier/DonationReturn';
import { stripe } from '@/lib/stripe';
import { DONATION_PROGRAMS, resolveDonationPurpose, type DonationPurpose } from '@/lib/donations';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Expedition Support Mission',
  robots: { index: false, follow: false },
};

export default async function DonationSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;
  let verified = false;
  let purpose: DonationPurpose = 'tinies';

  if (sessionId?.startsWith('cs_')) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      purpose = resolveDonationPurpose(session.metadata?.purpose);
      const program = DONATION_PROGRAMS[purpose];
      verified = session.payment_status === 'paid' && session.amount_total === program.amountCents && session.currency === 'usd';
    } catch (error) {
      console.error('Unable to verify the expedition support payment', error);
    }
  }

  return <DonationReturn verified={verified} purpose={purpose} />;
}
