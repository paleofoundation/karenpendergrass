'use client';

import dynamic from 'next/dynamic';

const SwoveeGame = dynamic(() => import('./SwoveeGame'), {
  ssr: false,
  loading: () => (
    <div className="frontier-boot" role="status" aria-live="polite">
      <div>
        <span>EXPEDITION KP–01 · WORLD BUILD 02</span>
        <strong>WAKE THE ROVALIZER</strong>
        <small>LiDAR terrain · field operations · mobile fabrication</small>
        <i />
      </div>
    </div>
  ),
});

export default function FrontierShell() {
  return <SwoveeGame />;
}
