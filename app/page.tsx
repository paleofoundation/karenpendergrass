import Link from 'next/link';
import { getAllPosts, getVentures, formatDate, readingTime } from '@/lib/content';
import ArticleCard from '@/components/ArticleCard';
import VentureCard from '@/components/VentureCard';
import SectionHeader from '@/components/SectionHeader';

export default function HomePage() {
  const posts = getAllPosts();
  const ventures = getVentures();
  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="page-enter">
      {/* ─── Hero ─── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-3xl">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-accent mb-6"
            style={{ letterSpacing: '0.15em' }}
          >
            Standards &middot; Research &middot; Translation
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-ink leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Building the frameworks that connect
            <span className="text-accent"> microbiome science </span>
            to clinical practice
          </h1>
          <p className="text-lg text-ink-light leading-relaxed max-w-2xl mb-8">
            I develop certification standards, validate microbiome-targeted
            interventions, and research microbial metallomics to bridge the gap
            between discovery and application. Founder of five organizations
            spanning food safety, microbiome medicine, and animal welfare.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="inline-flex items-center px-5 py-2.5 bg-ink text-paper text-sm font-medium rounded-md hover:bg-ink-light transition-colors"
            >
              Read my story
            </Link>
            <Link
              href="/writing"
              className="inline-flex items-center px-5 py-2.5 border border-ink/15 text-ink text-sm font-medium rounded-md hover:bg-ink/5 transition-colors"
            >
              Browse writing
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Currently ─── */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-paper-warm rounded-lg border border-ink/5 p-6 md:p-8">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-4"
            style={{ letterSpacing: '0.12em' }}
          >
            Currently
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-ink-light leading-relaxed">
            <div>
              <p className="font-medium text-ink mb-1">Building</p>
              <p>
                Tinies platform (tinies.app) connecting sanctuaries with sponsors.
                Landing page redesign and content strategy in progress.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink mb-1">Researching</p>
              <p>
                Microbial metallomics, nickel-dependent pathogenesis, and the
                endometriosis microbiome signature. HMTc standards for new
                product categories.
              </p>
            </div>
            <div>
              <p className="font-medium text-ink mb-1">Operating</p>
              <p>
                Paleo Foundation certification programs. Gardens of St. Gertrude
                cat sanctuary in Parekklisia, Cyprus, caring for 92 cats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Ventures ─── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <SectionHeader
          label="Ventures"
          title="Five organizations, one through-line"
          description="Every project connects back to translating complex systems science into frameworks that people can actually use."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ventures.map((venture) => (
            <VentureCard key={venture.slug} venture={venture} />
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/ventures"
            className="text-sm text-accent font-medium link-animate"
          >
            View all ventures in detail
          </Link>
        </div>
      </section>

      {/* ─── Featured Writing ─── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <SectionHeader
          label="Writing"
          title="Recent work"
          description="Research articles, analysis, and essays on microbiome science, metallomics, food safety, and systems thinking."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <ArticleCard
              key={post.meta.slug}
              title={post.meta.title}
              slug={post.meta.slug}
              date={post.meta.date}
              category={post.meta.category}
              excerpt={post.meta.excerpt}
              content={post.content}
              featured
            />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/writing"
            className="text-sm text-accent font-medium link-animate"
          >
            View all {posts.length} articles
          </Link>
        </div>
      </section>

      {/* ─── Origin teaser ─── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-4"
            style={{ letterSpacing: '0.12em' }}
          >
            The story
          </p>
          <p
            className="text-2xl md:text-3xl font-light text-ink leading-snug mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            After years of misdiagnoses and failed treatments, I became the first
            known person to undergo fecal microbiota transplantation for Celiac
            Disease. That experience changed the trajectory of my career and
            led to everything you see here.
          </p>
          <Link
            href="/about"
            className="text-sm text-accent font-medium link-animate"
          >
            Read the full story
          </Link>
        </div>
      </section>
    </div>
  );
}
