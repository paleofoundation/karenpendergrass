import Stripe from 'stripe';

let stripeSingleton: Stripe | null | undefined;

/**
 * Lazy Stripe client. Missing STRIPE_SECRET_KEY must not throw at import
 * time — that 500s every donation route (and can fail `next build`).
 */
export function getStripe(): Stripe | null {
  if (stripeSingleton !== undefined) return stripeSingleton;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    stripeSingleton = null;
    return null;
  }
  stripeSingleton = new Stripe(key, { typescript: true });
  return stripeSingleton;
}
