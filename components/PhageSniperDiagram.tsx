// "Antibiotics carpet-bomb. Phages are snipers." — a presentational SVG that
// contrasts a broad-spectrum antibiotic (kills the whole community) with a phage
// cocktail (removes only the pathogen, leaves the microbiome intact).
// All color comes from design tokens (CSS variables) so it follows the brand.

type Mode = 'antibiotic' | 'phage';

const COLS = 5;
const ROWS = 3;
const GAP = 64;
const R = 13;
const OX = 44;
const OY = 96;
const PATHOGEN = 7; // the one bug we actually want gone

function Panel({ mode, x }: { mode: Mode; x: number }) {
  const nodes = [];
  for (let i = 0; i < COLS * ROWS; i++) {
    const c = i % COLS;
    const row = Math.floor(i / COLS);
    const cx = OX + c * GAP;
    const cy = OY + row * GAP;
    const isPathogen = i === PATHOGEN;

    let fill = 'var(--color-ink)';
    let opacity = 0.85;
    if (mode === 'antibiotic') {
      // carpet bomb: the pathogen and most commensals are wiped out
      fill = isPathogen ? 'var(--color-accent)' : 'var(--color-ink)';
      opacity = isPathogen ? 0.22 : i % 5 === 0 ? 0.6 : 0.14;
    } else {
      // sniper: only the pathogen is removed; the community is untouched
      fill = isPathogen ? 'var(--color-accent)' : 'var(--color-ink)';
      opacity = isPathogen ? 0.22 : 0.85;
    }

    nodes.push(<circle key={i} cx={cx} cy={cy} r={R} fill={fill} opacity={opacity} />);

    if (isPathogen && mode === 'phage') {
      nodes.push(
        <g key={`x${i}`} stroke="var(--color-accent)" strokeWidth={2} opacity={0.95} fill="none">
          <circle cx={cx} cy={cy} r={R + 9} />
          <line x1={cx - R - 16} y1={cy} x2={cx - R - 3} y2={cy} />
          <line x1={cx + R + 3} y1={cy} x2={cx + R + 16} y2={cy} />
          <line x1={cx} y1={cy - R - 16} x2={cx} y2={cy - R - 3} />
          <line x1={cx} y1={cy + R + 3} x2={cx} y2={cy + R + 16} />
        </g>
      );
    }
  }

  return (
    <g transform={`translate(${x},0)`}>
      {mode === 'antibiotic' && (
        <rect
          x={OX - 30}
          y={OY - 34}
          width={(COLS - 1) * GAP + 60}
          height={(ROWS - 1) * GAP + 68}
          rx={14}
          fill="var(--color-accent)"
          opacity={0.06}
        />
      )}
      <text
        x={OX - 16}
        y={36}
        fill="var(--color-ink)"
        opacity={0.9}
        style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 500 }}
      >
        {mode === 'antibiotic' ? 'Broad-spectrum antibiotic' : 'Phage cocktail'}
      </text>
      <text
        x={OX - 16}
        y={58}
        fill="var(--color-ink-muted, #7a7a7a)"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}
      >
        {mode === 'antibiotic' ? 'carpet bomb' : 'sniper'}
      </text>
      {nodes}
    </g>
  );
}

export default function PhageSniperDiagram() {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 760 300"
        width="100%"
        role="img"
        aria-label="Comparison: a broad-spectrum antibiotic eliminates the entire bacterial community including beneficial microbes, while a phage cocktail removes only the targeted pathogen and leaves the microbiome intact."
        style={{ maxWidth: 760, display: 'block', margin: '0 auto' }}
      >
        <Panel mode="antibiotic" x={0} />
        <line
          x1={392}
          y1={28}
          x2={392}
          y2={272}
          stroke="var(--color-border)"
          strokeWidth={1}
          strokeDasharray="4 5"
        />
        <Panel mode="phage" x={404} />
      </svg>
      <figcaption className="mt-3 text-center text-xs text-ink-muted" style={{ fontFamily: 'var(--font-mono)' }}>
        orange = the pathogen · faded = removed · solid navy = microbiome left standing
      </figcaption>
    </figure>
  );
}
