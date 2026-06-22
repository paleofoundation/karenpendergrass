import type { Metadata } from 'next';
import { Newsreader, Source_Sans_3, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SidebarNav from '@/components/SidebarNav';
import TopBar from '@/components/TopBar';
import AnnouncementBar from '@/components/AnnouncementBar';
import Footer from '@/components/Footer';
import { PersonSchema } from '@/components/JsonLd';

const newsreader = Newsreader({
  subsets: ['latin'],
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
  metadataBase: new URL('https://www.karenpendergrass.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Karen Pendergrass',
    description:
      'Standards developer, microbiome signatures researcher, and founder at the intersection of microbiome science, translational medicine, and regulatory innovation.',
    url: 'https://www.karenpendergrass.com',
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
  authors: [{ name: 'Karen Pendergrass', url: 'https://www.karenpendergrass.com' }],
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
    <html lang="en" className={`${newsreader.variable} ${sourceSans.variable} ${jetbrainsMono.variable}`}>
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
          <TopBar />
        </header>
        <AnnouncementBar />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
