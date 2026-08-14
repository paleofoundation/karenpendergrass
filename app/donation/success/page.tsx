import type { Metadata } from 'next';
import DonationReturn from '@/components/frontier/DonationReturn';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tinies Donation Mission',
  robots: { index: false, follow: false },
};

export default async function DonationSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;
  let verified = false;

  if (sessionId?.startsWith('cs_')) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      verified = session.payment_status === 'paid' && session.amount_total === 100 && session.currency === 'eur';
    } catch (error) {
      console.error('Unable to verify the Tinies donation', error);
    }
  }

  return <DonationReturn verified={verified} />;
}
