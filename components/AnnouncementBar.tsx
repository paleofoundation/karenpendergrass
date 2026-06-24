import Link from 'next/link';
import { tickerReceipts } from '@/lib/receipts';

// Thin orange utility bar: a scrolling "receipts" ticker of trends called
// early (links to the full track record) + a persistent advisory CTA.
export default function AnnouncementBar() {
  // Duplicate the set so the marquee can loop seamlessly (translateX -50%).
  const ticker = [...tickerReceipts, ...tickerReceipts];
  return (
    <div
      className="relative flex items-stretch overflow-hidden"
      style={{ background: 'var(--color-accent)', color: 'var(--color-ink-deep)' }}
    >
      <Link
        href="/receipts"
        aria-label="See the full track record of trends called early"
        className="flex-1 overflow-hidden"
      >
        <div className="cc-ticker-track py-2.5">
          {ticker.map((t, i) => (
            <span key={i} className="cc-eyebrow text-[10px] inline-flex items-center">
              <span className="opacity-40 mx-5" aria-hidden="true">/</span>
              {t}
            </span>
          ))}
        </div>
      </Link>
      <Link
        href="/advisory"
        className="hidden sm:inline-flex items-center px-5 py-2.5 cc-eyebrow text-[10px] font-semibold whitespace-nowrap transition-colors duration-200 hover:bg-[var(--color-ink-deep)] hover:text-[var(--color-accent)]"
        style={{ borderLeft: '1px solid rgba(18,37,54,0.2)' }}
      >
        Now booking board &amp; advisory →
      </Link>
    </div>
  );
}
