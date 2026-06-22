import Link from 'next/link';

// Thin orange utility bar: a scrolling "receipts" ticker of trends called
// early + a persistent advisory CTA. Sits below the nav, scrolls away.
const items = [
  'Called Paleo in 2009',
  'Keto',
  'Tiny houses',
  'Grain-free',
  'Microbiome medicine',
  'Phage therapy for antimicrobial resistance',
  'The field of microbial metallomics',
  'Nickel in the food supply',
];

export default function AnnouncementBar() {
  // Duplicate the set so the marquee can loop seamlessly (translateX -50%).
  const ticker = [...items, ...items];
  return (
    <div
      className="relative flex items-stretch overflow-hidden"
      style={{ background: 'var(--color-accent)', color: 'var(--color-ink-deep)' }}
    >
      <div className="flex-1 overflow-hidden">
        <div className="cc-ticker-track py-2.5">
          {ticker.map((t, i) => (
            <span key={i} className="cc-eyebrow text-[10px] inline-flex items-center">
              <span className="opacity-40 mx-5" aria-hidden="true">/</span>
              {t}
            </span>
          ))}
        </div>
      </div>
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
