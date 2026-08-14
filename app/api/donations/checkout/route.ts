import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { DONATION_PROGRAMS, resolveDonationPurpose } from '@/lib/donations';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const origin = new URL(request.url).origin;
    const formData = await request.formData();
    const purpose = resolveDonationPurpose(formData.get('purpose'));
    const program = DONATION_PROGRAMS[purpose];
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      submit_type: purpose === 'tinies' ? 'donate' : 'pay',
      customer_creation: 'always',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: program.amountCents,
            product_data: {
              name: program.productName,
              description: program.description,
            },
          },
        },
      ],
      metadata: {
        purpose,
        project: program.project,
        sanctuary: purpose === 'tinies' ? 'Gardens of St. Gertrude' : '',
        expedition: 'KP-01',
      },
      success_url: `${origin}/donation/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?donation=cancelled`,
    });

    if (!session.url) throw new Error('Stripe did not return a checkout URL.');
    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error('Unable to create the expedition support checkout', error);
    return NextResponse.json({ error: 'The support checkout is temporarily unavailable.' }, { status: 503 });
  }
}
