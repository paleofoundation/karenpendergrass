import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Barlow_Condensed, Source_Sans_3, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import './frontier-game.css';
import { PersonSchema } from '@/components/JsonLd';
import SiteFrame from '@/components/SiteFrame';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display-src',
});
const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-body-src',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-src',
});

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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karen Pendergrass',
    description:
      'Standards developer, microbiome signatures researcher, and founder at the intersection of microbiome science, translational medicine, and regulatory innovation.',
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
    <ClerkProvider>
      <html lang="en" className={`${barlowCondensed.variable} ${sourceSans.variable} ${jetbrainsMono.variable}`}>
        <body className="min-h-screen flex flex-col">
          <PersonSchema />
          <SiteFrame>{children}</SiteFrame>
        </body>
      </html>
    </ClerkProvider>
  );
}
