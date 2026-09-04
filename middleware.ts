import { clerkMiddleware } from '@clerk/nextjs/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { applyCanonicalSeo } from '@/lib/canonical-seo';

const clerk = clerkMiddleware();

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  const seo = applyCanonicalSeo(request);
  if (seo) return seo;
  return clerk(request, event);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
