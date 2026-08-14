import type { Metadata } from 'next';
import FrontierShell from '@/components/frontier/FrontierShell';
import { WebSiteSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: { absolute: 'Drive the Frontier — Karen Pendergrass' },
  description:
    'Drive Karen Pendergrass’s Swovee through a focused world of heavy-metal standards, microbiome research, robotics, and sanctuary cats.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Drive the Frontier — Karen Pendergrass',
    description: 'A focused 3D introduction to Karen Pendergrass: heavy metals, microbes, machines, and 90+ sanctuary cats.',
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
