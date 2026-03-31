import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { PersonSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: {
    default: 'Karen Pendergrass',
    template: '%s | Karen Pendergrass',
  },
  description:
    'Standards developer, microbiome signatures researcher, and founder at the intersection of microbiome science, translational medicine, and regulatory innovation.',
  metadataBase: new URL('https://karenpendergrass.com'),
  openGraph: {
    title: 'Karen Pendergrass',
    description:
      'Standards developer, microbiome signatures researcher, and founder at the intersection of microbiome science, translational medicine, and regulatory innovation.',
    url: 'https://karenpendergrass.com',
    siteName: 'Karen Pendergrass',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karen Pendergrass',
    description:
      'Standards developer, microbiome signatures researcher, and founder at the intersection of microbiome science, translational medicine, and regulatory innovation.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <PersonSchema />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
