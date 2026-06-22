import { NextResponse } from 'next/server';

/**
 * Contact form API route.
 *
 * Accepts form submissions (no email address is shown publicly on the site)
 * but delivers messages to the actual inbox: karen@paleofoundation.com
 *
 * Uses Resend (https://resend.com) for delivery. Set RESEND_API_KEY in
 * your Vercel environment variables.
 *
 * If Resend isn't configured yet, this falls back to a simple JSON log
 * so the form still "works" during development.
 *
 * Abuse protection (this is an unauthenticated public endpoint):
 *  - honeypot field ("company") silently drops bots
 *  - per-IP sliding-window rate limit
 *  - field length caps to reject oversized payloads
 */

export const runtime = 'nodejs';

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string; // honeypot — real users never fill this
}

const DESTINATION_EMAIL = 'karen@paleofoundation.com';
const FROM_ADDRESS = 'Karen Pendergrass Website <noreply@karenpendergrass.com>';

// ─── Simple in-memory per-IP rate limiter ───
// Note: on serverless this is per-warm-instance, not globally shared. It blunts
// burst abuse from a single source; pair with a Redis/KV limiter for hard global
// guarantees if traffic grows.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

const MAX_FIELD = 1000;
const MAX_MESSAGE = 5000;

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body: ContactPayload = await request.json();
    const { name, email, subject, message, company } = body;

    // Honeypot: a filled "company" field means a bot. Pretend success, send nothing.
    if (company) {
      return NextResponse.json({ success: true });
    }

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Length caps
    if (
      name.length > MAX_FIELD ||
      email.length > MAX_FIELD ||
      subject.length > MAX_FIELD ||
      message.length > MAX_MESSAGE
    ) {
      return NextResponse.json(
        { error: 'Submission too large' },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      // ─── Production: send via Resend ───
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: FROM_ADDRESS,
          to: DESTINATION_EMAIL,
          reply_to: email,
          subject: `[KP Contact] ${subject} — from ${name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px;">
              <h2 style="color: #1d384f; margin-bottom: 4px;">New message from karenpendergrass.com</h2>
              <hr style="border: none; border-top: 1px solid #e5ddd5; margin: 16px 0;" />
              <p><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
              <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
              <hr style="border: none; border-top: 1px solid #e5ddd5; margin: 16px 0;" />
              <div style="white-space: pre-wrap; color: #4a4a4a; line-height: 1.7;">
                ${escapeHtml(message)}
              </div>
            </div>
          `,
        }),
      });

      if (!res.ok) {
        console.error('Resend API error:', await res.text());
        return NextResponse.json(
          { error: 'Failed to send message' },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });
    } else {
      // ─── Development fallback: log to console ───
      console.log('─── Contact form submission (no RESEND_API_KEY set) ───');
      console.log(`Name: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log(`Would deliver to: ${DESTINATION_EMAIL}`);
      console.log('─────────────────────────────────────────────────────');

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
