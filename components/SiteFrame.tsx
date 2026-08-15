'use client';

import { usePathname } from 'next/navigation';
import AnnouncementBar from '@/components/AnnouncementBar';
import Footer from '@/components/Footer';
import SidebarNav from '@/components/SidebarNav';
import TopBar from '@/components/TopBar';
import SafariScoreBadge from '@/components/frontier/SafariScoreBadge';

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/') return <><SafariScoreBadge safariActive />{children}</>;

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded focus:shadow-lg"
      >
        Skip to content
      </a>
      <header>
        <SidebarNav />
        <TopBar />
      </header>
      <AnnouncementBar />
      <SafariScoreBadge />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
