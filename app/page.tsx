import type { Metadata } from 'next';
import FrontierShell from '@/components/frontier/FrontierShell';
import { WebSiteSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: { absolute: "Enter Karen's Brain — Karen Pendergrass" },
  description:
    "Drive Karen's Swovee, a 2017 terrain-scanning, AI-guided 3D-printing machine through the work behind her career: Heavy Metal Certified as the commercial engine, microbial science as the research frontier, and the Gardens as the real-world impact.",
  alternates: { canonical: '/' },
  openGraph: {
    title: "Enter Karen's Brain — Karen Pendergrass",
    description: "Drive Karen's Swovee through Heavy Metal Certified, microbial science, and the Gardens of St. Gertrude.",
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
