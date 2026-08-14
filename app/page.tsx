import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SocialLinks from '@/components/SocialLinks';
import { WebSiteSchema } from '@/components/JsonLd';
import './home-expedition.css';

export const metadata: Metadata = {
  title: 'Karen Pendergrass — Systems Thinker, Researcher & Founder',
  description:
    'Karen Pendergrass builds the evidence, standards, and platforms complex fields need before the market knows to ask for them.',
  alternates: { canonical: '/' },
};

const projects = [
  { name: 'Heavy Metal Index', url: 'https://heavymetalindex.com', note: 'Evidence infrastructure', color: '#ffad4f' },
  { name: 'Microbiome Medicine', url: 'https://microbiomemedicine.com', note: 'Disease ecosystems', color: '#64f4e8' },
  { name: 'Heavy Metal Certified', url: 'https://heavymetalcertified.com', note: 'Category-specific standards', color: '#ffd45d' },
  { name: 'Swovee', url: 'https://swovee.com', note: 'Scan · reason · print', color: '#6bb6ff' },
  { name: 'Phage Cocktails', url: 'https://phagecocktails.com', note: 'Precision antibacterials', color: '#d5ff50' },
  { name: 'Tinies', url: 'https://tinies.com', note: 'Sanctuary infrastructure', color: '#ff9cae' },
];

const pillars = [
  {
    field: '01 / MICROBIAL METALLOMICS',
    title: 'Find the interaction everyone else is measuring separately.',
    body: 'Metals reshape microbial communities, microbial communities transform metals, and both alter health. The useful signal lives in the system—not one isolated variable.',
    image: '/images/wp-migrated/Microbial-Metallomics.jpg',
    color: '#64f4e8',
    href: '/frameworks/microbial-metallomics',
  },
  {
    field: '02 / HEAVY-METAL STANDARDS',
    title: 'Turn fragmented evidence into standards people can actually use.',
    body: 'Category-specific limits, ALARA principles, transparent sourcing, and testing protocols designed to make safer decisions possible.',
    image: '/images/wp-migrated/Karen-Pendergrass-Microbiome-Medicine-.jpg',
    color: '#d5ff50',
    href: '/frameworks/hmtc',
  },
  {
    field: '03 / MICROBIOME SIGNATURES',
    title: 'Map disease ecosystems without pretending one microbe explains them.',
    body: 'Condition-specific patterns, evidence triangulation, and research frameworks for a field where context changes the meaning of every result.',
    image: '/images/wp-migrated/Evolutionary-Microbial-and-Functional-Case-for-Complex-Carbohydrates.jpg',
    color: '#b98cff',
    href: '/frameworks/major-microbial-associations',
  },
];

const receipts = [
  ['2009', 'Founded the Paleo Foundation before there was a market to certify.'],
  ['2012', 'Documented FMT for celiac disease four years before the first case report.'],
  ['2020', 'Forecast prebiotics at Pepsi; the direction was publicly confirmed in 2026.'],
  ['2025', 'Only non-PhD among 150 attendees at the Beneficial Microbes Conference.'],
  ['2026', 'Published Microbiome Medicine Journal, Volume I, with five Parkinson’s papers.'],
];

const articles = [
  { id: 'A–031', type: 'MICROBIOME RESEARCH', title: 'Microbial Metallomics: The Missing Link in Heavy Metal Contamination', time: '11 MIN', slug: 'microbial-metallomics-and-heavy-metal-contamination', color: '#64f4e8' },
  { id: 'A–034', type: 'ANALYSIS', title: 'The Heavy Metal Index: Tracing Food Contamination to the Evidence', time: '9 MIN', slug: 'heavy-metal-index-tracing-food-contamination-to-source', color: '#ffad4f' },
  { id: 'A–037', type: 'FORECASTING', title: '2030 Trends: A Forecast From Someone Who Called the Last Decade', time: '9 MIN', slug: '2030-trends', color: '#b98cff' },
  { id: 'A–040', type: 'PHAGE THERAPY', title: 'The Trillion-Dollar Answer No One Is Funding', time: '12 MIN', slug: 'phage-therapy-the-answer-no-one-is-funding', color: '#d5ff50' },
  { id: 'A–042', type: 'AI + CULTURE', title: 'The Flattening', time: '10 MIN', slug: 'the-flattening', color: '#ff765e' },
];

export default function HomePage() {
  return (
    <div className="kp-live page-enter">
      <WebSiteSchema />

      <section className="kp-hero" id="top">
        <div className="kp-grid" aria-hidden="true" />
        <div className="kp-hero-copy">
          <p className="kp-coordinate">34.7071° N · 33.0226° E / FIELD NODE 001</p>
          <p className="kp-eyebrow"><span /> SYSTEMS THINKER · RESEARCHER · FOUNDER</p>
          <h1>ALWAYS<br />AHEAD OF<br /><em>THE MARKET.</em></h1>
          <p className="kp-intro">I build the maps, standards, and evidence infrastructure that complex fields need <strong>before the market knows to ask for them.</strong></p>
          <div className="kp-hero-actions">
            <a className="kp-primary" href="#work">ENTER THE FIELD <b>↓</b></a>
            <Link className="kp-text-link" href="/start">START WITH THE STORY <b>↗</b></Link>
          </div>
          <SocialLinks className="kp-socials" linkClassName="text-white/55 hover:text-[var(--color-accent)]" />
        </div>

        <div className="kp-portrait" aria-label="Portrait of Karen Pendergrass">
          <div className="kp-orbit kp-orbit-one" /><div className="kp-orbit kp-orbit-two" /><div className="kp-orbit kp-orbit-three" />
          <div className="kp-portrait-label"><span>SUBJECT</span><strong>K. PENDERGRASS</strong><small>FOUNDER / FIELD ARCHITECT</small></div>
          <Image src="/images/Karen_Pendergrass.png" alt="Karen Pendergrass" fill sizes="(max-width: 1000px) 90vw, 42vw" className="kp-portrait-image" priority />
          <div className="kp-scan" aria-hidden="true" />
        </div>

        <dl className="kp-hero-stats">
          <div><dt>FIELD</dt><dd>MICROBIOME × METALS</dd></div>
          <div><dt>MODE</dt><dd>FIRST PRINCIPLES</dd></div>
          <div><dt>BASE</dt><dd>CYPRUS / GLOBAL</dd></div>
          <div><dt>RECORD</dt><dd>17+ YEARS AHEAD</dd></div>
        </dl>
      </section>

      <section className="kp-projects" id="ventures">
        <header className="kp-section-head"><span>00 / FOUNDER SIGNALS</span><h2>SIX PLATFORMS.<br />ONE SYSTEMS-LEVEL METHOD.</h2><p>Each is an operating thesis: identify missing infrastructure, assemble the evidence, and build it.</p></header>
        <div className="kp-project-grid">
          {projects.map((project, index) => (
            <a className="kp-project" href={project.url} target="_blank" rel="noopener noreferrer" style={{ '--project-color': project.color } as CSSProperties} key={project.name}>
              <small>0{index + 1}</small><span>FOUNDED BY KAREN PENDERGRASS</span><h3>{project.name}</h3><p>{project.note}</p><b>TRANSMIT ↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="kp-work" id="work">
        <header className="kp-section-head kp-section-head-dark"><span>01 / THE WORK</span><h2>I TURN COMPLEX SYSTEMS<br />INTO USABLE SIGNALS.</h2><p>My work sits where emerging science, standards, public understanding, and institution-building overlap.</p></header>
        <div className="kp-pillars">
          {pillars.map((pillar) => (
            <article className="kp-pillar" style={{ '--pillar-color': pillar.color } as CSSProperties} key={pillar.field}>
              <div className="kp-pillar-image"><Image src={pillar.image} alt="" fill sizes="(max-width: 1000px) 100vw, 33vw" /><span /></div>
              <div className="kp-pillar-copy"><small>{pillar.field}</small><h3>{pillar.title}</h3><p>{pillar.body}</p><Link href={pillar.href}>OPEN DOSSIER →</Link></div>
            </article>
          ))}
        </div>
      </section>

      <section className="kp-receipts" id="receipts">
        <div className="kp-receipts-intro"><span>02 / DOCUMENTED TRACK RECORD</span><h2>THE<br /><em>RECEIPTS.</em></h2><div className="kp-oracle"><small>CALLSIGN / THE ORACLE</small><p>Fred Hart called her <strong>“The Oracle.”</strong></p><span>Not for guessing. For seeing the connected system early—and leaving a timestamp.</span></div></div>
        <ol className="kp-timeline">
          {receipts.map(([year, receipt], index) => <li key={year}><span>R–00{index + 1}</span><strong>{year}</strong><p>{receipt}</p></li>)}
        </ol>
        <Link className="kp-receipts-link" href="/receipts">VIEW THE COMPLETE RECORD →</Link>
      </section>

      <section className="kp-writing" id="writing">
        <header className="kp-section-head"><span>03 / FIELD ARCHIVE</span><h2>READ THE WORK.</h2><p>Research, analysis, and forecasts—presented as a navigable evidence archive.</p></header>
        <div className="kp-article-list">
          {articles.map((article) => (
            <Link href={`/writing/${article.slug}`} key={article.id} style={{ '--article-color': article.color } as CSSProperties}>
              <span>{article.id}</span><small>{article.type}</small><h3>{article.title}</h3><time>{article.time}</time><b>→</b>
            </Link>
          ))}
        </div>
        <div className="kp-writing-actions"><Link className="kp-primary kp-primary-dark" href="/writing">VIEW ALL WRITING →</Link><Link className="kp-text-link kp-text-dark" href="/publications">OPEN PUBLICATIONS →</Link></div>
      </section>

      <section className="kp-origin">
        <span>04 / ORIGIN — WHY THE SYSTEM EXISTS</span>
        <blockquote>“THE MOST IMPORTANT INFRASTRUCTURE HAS TO EXIST <em>BEFORE</em> THE MARKET ASKS FOR IT.”</blockquote>
        <p>In 2012, a desperate search for an answer led to an at-home fecal microbiota transplant for celiac disease—four years before the first comparable case report. The result was not a victory lap. It was a lifelong question: what other crucial connections are visible, but not yet organized?</p>
        <div><Link href="/about">READ THE STARTING STORY →</Link><Link href="/ventures">MAP THE VENTURES →</Link></div>
      </section>
    </div>
  );
}
