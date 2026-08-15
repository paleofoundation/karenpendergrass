'use client';

import dynamic from 'next/dynamic';

const SwoveeGame = dynamic(() => import('./SwoveeGame'), {
  ssr: false,
  loading: () => (
    <div className="frontier-boot" role="status" aria-live="polite">
      <div>
        <span>KAREN PENDERGRASS · SWOVEE</span>
        <strong>ENTER THE SWOVEE SAFARI</strong>
        <small>Heavy metals · microbiome · robotics · 90+ cats</small>
        <i />
      </div>
    </div>
  ),
});

export default function FrontierShell() {
  return <SwoveeGame />;
}
