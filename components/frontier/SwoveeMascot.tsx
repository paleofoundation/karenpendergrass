export default function SwoveeMascot({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`swovee-mascot ${compact ? 'is-compact' : ''}`} aria-hidden="true">
      <i className="swovee-mascot-hood" />
      <i className="swovee-mascot-screen"><b /><b /></i>
      <i className="swovee-mascot-body">KP</i>
    </span>
  );
}
