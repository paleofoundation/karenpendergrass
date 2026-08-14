import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const origin = new URL(request.url).origin;
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      submit_type: 'donate',
      customer_creation: 'always',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'eur',
            unit_amount: 100,
            product_data: {
              name: 'Gardens of St. Gertrude Cat Food Mission',
              description: 'A €1 contribution toward food and care for the 90+ sanctuary cats behind Tinies.',
            },
          },
        },
      ],
      metadata: {
        project: 'Tinies',
        sanctuary: 'Gardens of St. Gertrude',
        expedition: 'KP-01',
      },
      success_url: `${origin}/donation/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?donation=cancelled`,
    });

    if (!session.url) throw new Error('Stripe did not return a checkout URL.');
    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error('Unable to create the Tinies donation checkout', error);
    return NextResponse.json({ error: 'The Tinies checkout is temporarily unavailable.' }, { status: 503 });
  }
}
