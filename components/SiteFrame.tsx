'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AnnouncementBar from '@/components/AnnouncementBar';
import Footer from '@/components/Footer';
import SidebarNav from '@/components/SidebarNav';
import TopBar from '@/components/TopBar';

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/') return <>{children}</>;

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
      <Link className="return-to-expedition" href="/" aria-label="Return to the Drive the Frontier expedition">
        <span>RETURN TO</span>
        <strong>EXPEDITION KP–01</strong>
        <b aria-hidden="true">↙</b>
      </Link>
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
