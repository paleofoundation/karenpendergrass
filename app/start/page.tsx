/* eslint-disable @next/next/no-img-element -- these are real sanctuary cats served by their project */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SocialLinks from '@/components/SocialLinks';

export const metadata: Metadata = {
  title: 'Karen Pendergrass — Standards Developer & Microbiome Researcher',
  description:
    'Meet Karen Pendergrass: standards developer, microbiome researcher, founder of Heavy Metal Certified and Swovee, and caretaker of 90+ sanctuary cats.',
  alternates: { canonical: '/start' },
};

const NAVY = 'var(--color-ink-deep)';
const PAPER = '#f6f8fa';

const disciplines = [
  {
    number: '01',
    title: 'Heavy metals',
    body: 'Karen founded Heavy Metal Certified and built Heavy Metal Index to connect toxicology, food categories, regulations, testing, and source evidence. The goal is not fear. It is standards that can survive scrutiny.',
    href: 'https://heavymetalcertified.com',
    cta: 'Heavy Metal Certified',
  },
  {
    number: '02',
    title: 'Microbes',
    body: 'Her work in microbiome medicine and microbial metallomics examines how metals alter microbial ecosystems, virulence, host response, and the interventions that might change the course of disease.',
    href: '/frameworks/microbial-metallomics',
    cta: 'Microbial metallomics',
  },
  {
    number: '03',
    title: 'Machines',
    body: 'Swovee is Karen’s 2017 robotics project: AI, laser scanning, autonomous movement, and large-format 3D printing combined into a terrain-aware construction system called the Rovalizer.',
    href: 'https://swovee.com',
    cta: 'Swovee.com',
  },
];

export default function StartHerePage() {
  return (
    <div className="page-enter">
      <section className="relative overflow-hidden" style={{ background: NAVY, color: PAPER }}>
        <div className="cc-ghost absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[30%] select-none pointer-events-none" aria-hidden="true" style={{ color: 'rgba(255,255,255,.035)' }}>
          PENDERGRASS
        </div>

        <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 pt-14 pb-20 md:pt-20 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <p className="cc-eyebrow text-[11px] mb-6" style={{ color: 'rgba(255,255,255,.62)' }}>
                Standards Developer · Microbiome Researcher · Founder · Cyprus
              </p>
              <h1 className="cc-hero-title">
                Always
                <br />
                <span style={{ color: 'var(--color-accent)' }}>ahead of</span>
                <br />
                the market.
              </h1>
              <p className="text-base md:text-lg leading-relaxed mt-8 max-w-2xl" style={{ color: 'rgba(255,255,255,.83)' }}>
                Karen Pendergrass works where heavy metals meet the microbiome—and where research becomes standards. She founded Heavy Metal Certified, developed microbial metallomics, built Microbiome Medicine, and imagined Swovee before robotics, AI, laser scanning, and large-format 3D printing began converging in the field.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-9">
                <Link href="/about" className="px-7 py-3.5 text-[11px] tracking-[.12em] uppercase" style={{ background: 'var(--color-accent)', color: NAVY, fontFamily: 'var(--font-mono)' }}>
                  Meet Karen
                </Link>
                <Link href="/" className="px-7 py-3.5 text-[11px] tracking-[.12em] uppercase" style={{ border: '1px solid rgba(255,255,255,.42)', color: PAPER, fontFamily: 'var(--font-mono)' }}>
                  Drive the Swovee
                </Link>
              </div>
              <div className="mt-8">
                <SocialLinks linkClassName="text-white/55 hover:text-[var(--color-accent)]" />
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="kp-static-scan mx-auto w-full max-w-[450px] aspect-[2/3]">
                <div className="cc-sunburst" aria-hidden="true" />
                <Image src="/images/Karen_Pendergrass.png" alt="Karen Pendergrass" fill sizes="(max-width:1024px) 340px,450px" className="object-contain object-bottom relative z-[2]" priority />
                <span className="kp-static-scan-line" aria-hidden="true" />
                <div className="kp-static-readout"><span>SUBJECT IDENTIFIED</span><b>KAREN PENDERGRASS</b></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: PAPER, color: NAVY }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-4xl mb-14">
            <p className="cc-eyebrow text-[11px] mb-5" style={{ color: 'var(--color-accent-dark)' }}>The work</p>
            <h2 className="cc-feature-title" style={{ fontSize: 'clamp(2.25rem,5vw,4.7rem)', color: NAVY }}>
              Heavy metals. Microbes. Machines.
            </h2>
            <p className="text-lg leading-relaxed mt-6 max-w-3xl" style={{ color: 'var(--color-ink-secondary)' }}>
              Three disciplines, one habit: recognize the system early, follow the evidence all the way through, then build the thing the field will eventually need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(29,56,79,.16)' }}>
            {disciplines.map((item) => (
              <article key={item.title} className="p-8 md:p-10" style={{ background: PAPER }}>
                <span className="cc-eyebrow text-[10px]" style={{ color: 'var(--color-accent-dark)' }}>{item.number}</span>
                <h3 className="cc-feature-title mt-5" style={{ color: NAVY, fontSize: 'clamp(1.8rem,3vw,2.8rem)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed mt-5" style={{ color: 'var(--color-ink-secondary)' }}>{item.body}</p>
                <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined} className="inline-block mt-7 cc-eyebrow text-[10px] underline underline-offset-4" style={{ color: NAVY }}>
                  {item.cta} {item.href.startsWith('http') ? '↗' : '→'}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: NAVY, color: PAPER }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 flex justify-center">
            <div className="bg-white p-7 md:p-10 w-full max-w-[330px] aspect-square grid place-items-center">
              <Image src="/images/hmtc-mark-red.svg" alt="Heavy Metal Certified mark" width={260} height={300} className="w-full h-auto" />
            </div>
          </div>
          <div className="lg:col-span-8">
            <p className="cc-eyebrow text-[11px] mb-5" style={{ color: 'var(--color-accent)' }}>A standard—and the work behind the sanctuary</p>
            <h2 className="cc-feature-title" style={{ fontSize: 'clamp(2.3rem,5vw,4.8rem)', color: PAPER }}>
              Heavy Metal Certified.
            </h2>
            <p className="text-lg leading-relaxed mt-6 max-w-3xl" style={{ color: 'rgba(255,255,255,.76)' }}>
              The certification program translates a complicated evidence base into category-specific operating standards. It has also been the work helping Karen feed and care for the Gardens of St. Gertrude cats year after year.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="https://heavymetalcertified.com" target="_blank" rel="noreferrer" className="px-7 py-3.5 text-[11px] tracking-[.12em] uppercase" style={{ background: 'var(--color-accent)', color: NAVY, fontFamily: 'var(--font-mono)' }}>Visit the certification ↗</a>
              <a href="https://heavymetalindex.com" target="_blank" rel="noreferrer" className="px-7 py-3.5 text-[11px] tracking-[.12em] uppercase" style={{ border: '1px solid rgba(255,255,255,.38)', color: PAPER, fontFamily: 'var(--font-mono)' }}>See the evidence index ↗</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" style={{ background: '#f7e9ec', color: NAVY }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="cc-eyebrow text-[11px] mb-5" style={{ color: '#a53652' }}>Gardens of St. Gertrude · 501(c)(3)</p>
            <h2 className="cc-feature-title" style={{ fontSize: 'clamp(2.4rem,5vw,4.8rem)', color: NAVY }}>
              And 90+ cats.
            </h2>
            <p className="text-lg leading-relaxed mt-6" style={{ color: 'var(--color-ink-secondary)' }}>
              Karen runs a real cat sanctuary in Cyprus. Tinies grew from the daily reality of feeding, housing, treating, and advocating for those animals. A dollar is not symbolic here. It helps buy the next bag of food.
            </p>
            <form action="/api/donations/checkout" method="post" className="mt-8">
              <input type="hidden" name="purpose" value="tinies" />
              <button type="submit" className="px-8 py-4 text-[11px] tracking-[.12em] uppercase" style={{ background: NAVY, color: PAPER, fontFamily: 'var(--font-mono)' }}>
                Donate $1 toward cat food →
              </button>
            </form>
          </div>
          <div className="grid grid-cols-2 gap-2 aspect-square overflow-hidden">
            <img src="https://raw.githubusercontent.com/paleofoundation/Cats/main/assets/profile_ziggy.jpg" alt="Ziggy at Gardens of St. Gertrude" className="w-full h-full object-cover" />
            <img src="https://nwjuktwclfdkfxrjhwhq.supabase.co/storage/v1/object/public/site-images/adoption/adoption-toshiba-1.jpg" alt="Toshiba at Gardens of St. Gertrude" className="w-full h-full object-cover" />
            <img src="https://nwjuktwclfdkfxrjhwhq.supabase.co/storage/v1/object/public/site-images/adoption/adoption-splotch-1.jpg" alt="Splotch at Gardens of St. Gertrude" className="w-full h-full object-cover" />
            <img src="https://nwjuktwclfdkfxrjhwhq.supabase.co/storage/v1/object/public/site-images/adoption/adoption-ziggy-1.jpg" alt="A sanctuary cat at Gardens of St. Gertrude" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24" style={{ background: PAPER, color: NAVY }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
          <p className="cc-eyebrow text-[11px] mb-6" style={{ color: 'var(--color-accent-dark)' }}>The record</p>
          <h2 className="cc-feature-title" style={{ fontSize: 'clamp(2.2rem,5vw,4.5rem)', color: NAVY }}>Serious work leaves receipts.</h2>
          <p className="text-lg leading-relaxed mt-6 max-w-2xl mx-auto" style={{ color: 'var(--color-ink-secondary)' }}>
            Browse Karen’s publications, documented forecasts, research frameworks, and professional record directly.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-9">
            <a href="https://orcid.org/0000-0002-2348-7259" target="_blank" rel="noreferrer" className="px-7 py-3.5 text-[11px] tracking-[.12em] uppercase" style={{ background: NAVY, color: PAPER, fontFamily: 'var(--font-mono)' }}>ORCID ↗</a>
            <Link href="/receipts" className="px-7 py-3.5 text-[11px] tracking-[.12em] uppercase" style={{ border: '1px solid rgba(29,56,79,.35)', color: NAVY, fontFamily: 'var(--font-mono)' }}>Receipts →</Link>
            <Link href="/contact" className="px-7 py-3.5 text-[11px] tracking-[.12em] uppercase" style={{ border: '1px solid rgba(29,56,79,.35)', color: NAVY, fontFamily: 'var(--font-mono)' }}>Contact →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
