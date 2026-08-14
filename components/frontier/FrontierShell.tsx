'use client';

import dynamic from 'next/dynamic';

const SwoveeGame = dynamic(() => import('./SwoveeGame'), {
  ssr: false,
  loading: () => (
    <div className="frontier-boot" role="status" aria-live="polite">
      <span>EXPEDITION KP–01</span>
      <strong>INITIALIZING SWOVEE FIELD SYSTEM</strong>
      <i />
    </div>
  ),
});

export default function FrontierShell() {
  return <SwoveeGame />;
}
