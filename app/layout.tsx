import type { Metadata } from 'next';
import './globals.css';
import SidebarNav from '@/components/SidebarNav';
import Footer from '@/components/Footer';
import { PersonSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: {
    default: 'Karen Pendergrass — Standards Developer & Microbiome Researcher',
    template: '%s | Karen Pendergrass',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  description:
    'Standards developer, microbiome signatures researcher, and founder at the intersection of microbiome science, translational medicine, and regulatory innovation.',
  keywords: [
    'Karen Pendergrass',
    'microbiome researcher Cyprus',
    'food certification standards',
    'HMTc certification',
    'heavy metal testing food',
    'microbial metallomics',
    'microbiome signatures database',
    'Paleo Foundation',
    'food safety researcher',
    'Limassol Cyprus',
  ],
  metadataBase: new URL('https://karenpendergrass.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Karen Pendergrass',
    description:
      'Standards developer, microbiome signatures researcher, and founder at the intersection of microbiome science, translational medicine, and regulatory innovation.',
    url: 'https://karenpendergrass.com',
    siteName: 'Karen Pendergrass',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/Karen_Pendergrass.png',
        width: 1200,
        height: 630,
        alt: 'Karen Pendergrass',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karen Pendergrass',
    description:
      'Standards developer, microbiome signatures researcher, and founder at the intersection of microbiome science, translational medicine, and regulatory innovation.',
    images: ['/images/Karen_Pendergrass.png'],
  },
  authors: [{ name: 'Karen Pendergrass', url: 'https://karenpendergrass.com' }],
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded focus:shadow-lg"
        >
          Skip to content
        </a>
        <PersonSchema />
        <header>
          <SidebarNav />
        </header>
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
