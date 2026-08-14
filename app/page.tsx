import type { Metadata } from 'next';
import FrontierShell from '@/components/frontier/FrontierShell';
import { WebSiteSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: { absolute: 'Drive the Frontier — Karen Pendergrass' },
  description:
    'Pilot the Swovee Rovalizer through Karen Pendergrass’s projects, research, forecasts, articles, receipts, and sanctuary work.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Drive the Frontier — Karen Pendergrass',
    description: 'A real-time 3D expedition through Karen Pendergrass’s body of work.',
    url: 'https://karenpendergrass.com',
  },
};

export default function HomePage() {
  return (
    <>
      <WebSiteSchema />
      <FrontierShell />
    </>
  );
}
