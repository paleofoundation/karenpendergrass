import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import remarkSlug from 'remark-slug';
import { getAllPosts, getPostBySlug, formatDate, readingTime, deriveHashtags } from '@/lib/content';
import { ArticleSchema } from '@/components/JsonLd';
import ShareButtons from '@/components/ShareButtons';
import AuthorBio from '@/components/AuthorBio';
import TableOfContents from '@/components/TableOfContents';
import ReadingProgress from '@/components/ReadingProgress';
import CitationBlock from '@/components/CitationBlock';
import NewsletterSignup from '@/components/NewsletterSignup';
import RelatedArticles from '@/components/RelatedArticles';
import ArticleSidebar from '@/components/ArticleSidebar';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.meta.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const fallbackDesc =
    post.meta.excerpt ||
    post.content
      .replace(/[#*_\[\]()]/g, '')
      .replace(/\n+/g, ' ')
      .slice(0, 160);

  const description = (post.meta.description || fallbackDesc).slice(0, 150);
  const canonical =
    post.meta.canonicalUrl ||
    `https://karenpendergrass.com/writing/${post.meta.slug}`;
  const og = post.meta.openGraph;
  const ogTitle = og?.title || post.meta.title;
  const ogDescription = (og?.description || description).slice(0, 150);
  const ogType = (og?.type || 'article') as 'article' | 'website';
  const ogUrl = og?.url || canonical;
  const authorName = post.meta.author || 'Karen Pendergrass';

  const kw = post.meta.keywords;
  const keywords =
    typeof kw === 'string'
      ? kw
          .split(',')
          .map((k) => k.trim())
          .filter(Boolean)
      : Array.isArray(kw)
        ? kw
        : undefined;

  return {
    title: post.meta.title,
    description,
    keywords: keywords?.length ? keywords : undefined,
    authors: [{ name: authorName }],
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: ogType,
      url: ogUrl,
      publishedTime: post.meta.date,
      authors: [authorName],
      // When there's no cover image, fall through to the dynamic
      // app/writing/[slug]/opengraph-image.tsx card (correct 1200x630).
      ...(post.meta.coverImage
        ? {
            images: [
              {
                url: `https://karenpendergrass.com${post.meta.coverImage}`,
                width: 1200,
                height: 630,
                alt: post.meta.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description,
      ...(post.meta.coverImage
        ? { images: [`https://karenpendergrass.com${post.meta.coverImage}`] }
        : {}),
    },
  };
}

const categoryLabels: Record<string, string> = {
  'microbiome-research': 'Microbiome Research',
  analysis: 'Analysis',
  essays: 'Essays',
  'essays-by-claude': 'Essays by Claude',
  'brass-tacks': 'Brass Tacks',
};

export default function ArticlePage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  // Essays in the "Essays by Claude" section are authored by Claude, written
  // at Karen's direction. Karen remains the site owner / publisher.
  const byClaude = post.meta.category === 'essays-by-claude';

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.meta.slug === params.slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  // Related: same category, excluding current, max 3
  const related = allPosts
    .filter(
      (p) =>
        p.meta.slug !== params.slug &&
        p.meta.category === post.meta.category
    )
    .slice(0, 3);

  // If not enough in same category, fill from other posts
  if (related.length < 3) {
    const others = allPosts
      .filter(
        (p) =>
          p.meta.slug !== params.slug &&
          !related.find((r) => r.meta.slug === p.meta.slug)
      )
      .slice(0, 3 - related.length);
    related.push(...others);
  }

  // remark-slug ships nested unified/mdast types; runtime pipeline is valid.
  const renderMarkdown = (md: string) =>
    unified()
      .use(remarkParse)
      // @ts-expect-error — remark-slug@7 vs unified@11 duplicate type trees
      .use(remarkSlug)
      .use(remarkHtml, { sanitize: false })
      .processSync(md)
      .toString();

  // Split off a trailing references/sources section so a "Share this" block
  // can sit right before it. Falls back to the whole body when absent.
  const refMatch = post.content.match(
    /^#{2,3}\s+(sources|references|citations|bibliography|further reading)\b/im
  );
  const splitAt = refMatch?.index ?? -1;
  const bodyMarkdown = splitAt >= 0 ? post.content.slice(0, splitAt) : post.content;
  const referencesMarkdown = splitAt >= 0 ? post.content.slice(splitAt) : '';
  const htmlContent = renderMarkdown(bodyMarkdown);
  const referencesHtml = referencesMarkdown ? renderMarkdown(referencesMarkdown) : '';

  // Auto-hashtags for the X share intent: curated frontmatter `hashtags` if
  // present, otherwise derived automatically from the article's own tags.
  const shareHashtags =
    post.meta.hashtags && post.meta.hashtags.length
      ? post.meta.hashtags
      : deriveHashtags(post.meta.tags || []);

  return (
    <div className="page-enter">
      <ReadingProgress />

      <ArticleSchema
        title={post.meta.title}
        slug={post.meta.slug}
        date={post.meta.date}
        excerpt={
          post.meta.description ||
          post.meta.excerpt ||
          post.content
            .replace(/[#*_\[\]()]/g, '')
            .replace(/\n+/g, ' ')
            .slice(0, 160)
        }
        coverImage={post.meta.coverImage}
        author={byClaude ? { name: 'Claude (Anthropic)' } : undefined}
      />

      {/* Article header — wide editorial */}
      <header
        className="relative py-16 md:py-24"
        style={{ borderBottom: '1px solid var(--color-border-light)' }}
      >
        <div className="absolute inset-0 graph-paper-overlay" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/writing"
              className="text-xs hover:text-[var(--color-accent-dark)] transition-colors"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              ← Writing
            </Link>
            <span style={{ color: 'var(--color-ink-muted)' }} className="text-xs">/</span>
            <span
              className="text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ color: 'var(--color-accent-dark)' }}
            >
              {categoryLabels[post.meta.category] || post.meta.category}
            </span>
          </div>

          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
          >
            {post.meta.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div
              className="flex items-center gap-3 text-sm"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              <time>{formatDate(post.meta.date)}</time>
              <span>·</span>
              <span>{readingTime(post.content)}</span>
            </div>
            <ShareButtons
              url={`/writing/${post.meta.slug}`}
              title={post.meta.title}
              hashtags={shareHashtags}
            />
          </div>
        </div>
      </header>

      {/* Cover image */}
      {post.meta.coverImage && (
        <div className="max-w-3xl mx-auto px-6 mt-10 mb-8">
          <div className="relative overflow-hidden rounded-lg aspect-[16/9]">
            <Image
              src={post.meta.coverImage}
              alt={post.meta.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        </div>
      )}

      {/* Table of contents — mobile/tablet only; large screens use the sidebar */}
      {post.content.split(/\s+/).length > 1500 && (
        <div className="lg:hidden max-w-3xl mx-auto px-6">
          <TableOfContents content={post.content} />
        </div>
      )}

      {/* Two-column reading layout: prose + sticky editorial sidebar */}
      <div className="mx-auto max-w-6xl px-6 lg:flex lg:gap-14 lg:items-start">
        {/* Main reading column */}
        <div className="min-w-0 lg:flex-1 lg:max-w-[44rem]">
          {/* Article body */}
          <article
            className="py-10 prose"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Share this — sits right before the references/sources */}
          <div
            className="rounded-lg px-6 py-7 text-center"
            style={{ background: 'var(--color-bg-alt)', border: '1px solid var(--color-border-light)' }}
          >
            <p className="cc-eyebrow text-[11px] mb-4" style={{ color: 'var(--color-accent-dark)' }}>
              Share this
            </p>
            <div className="flex justify-center">
              <ShareButtons url={`/writing/${post.meta.slug}`} title={post.meta.title} hashtags={shareHashtags} />
            </div>
          </div>

          {/* References / sources (rendered after the share block) */}
          {referencesHtml && (
            <article
              className="pt-12 prose"
              dangerouslySetInnerHTML={{ __html: referencesHtml }}
            />
          )}

          {/* Bottom share buttons */}
          <div className="pb-8">
            <div
              className="flex items-center justify-between pt-6 mt-12"
              style={{ borderTop: '1px solid var(--color-border-light)' }}
            >
              <p className="text-xs" style={{ color: 'var(--color-ink-muted)' }}>
                If this was useful, share it with someone who needs to see it.
              </p>
              <ShareButtons
                url={`/writing/${post.meta.slug}`}
                title={post.meta.title}
                hashtags={shareHashtags}
                compact
              />
            </div>
          </div>

          {/* Citation block */}
          <div className="pb-8">
            <CitationBlock
              title={post.meta.title}
              date={post.meta.date}
              slug={post.meta.slug}
              author={byClaude ? 'Claude (Anthropic)' : undefined}
              directedBy={byClaude ? 'K. Pendergrass' : undefined}
            />
          </div>

          {/* Newsletter signup */}
          <div className="pb-10">
            <NewsletterSignup />
          </div>

          {/* Author bio */}
          <div className="pb-10">
            <AuthorBio variant={byClaude ? 'claude' : 'karen'} />
          </div>

          {/* Related articles */}
          <div className="pb-10">
            <RelatedArticles articles={related} />
          </div>

          {/* Prev / Next navigation */}
          <nav
            className="pb-20 pt-8"
            style={{ borderTop: '1px solid var(--color-border-light)' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {prevPost && (
                <Link href={`/writing/${prevPost.meta.slug}`} className="group">
                  <p className="text-xs mb-1" style={{ color: 'var(--color-ink-muted)' }}>← Previous</p>
                  <p
                    className="text-sm font-medium transition-colors duration-200 group-hover:text-[var(--color-accent-dark)] line-clamp-2"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                  >
                    {prevPost.meta.title}
                  </p>
                </Link>
              )}
              {nextPost && (
                <Link
                  href={`/writing/${nextPost.meta.slug}`}
                  className="group text-right sm:col-start-2"
                >
                  <p className="text-xs mb-1" style={{ color: 'var(--color-ink-muted)' }}>Next →</p>
                  <p
                    className="text-sm font-medium transition-colors duration-200 group-hover:text-[var(--color-accent-dark)] line-clamp-2"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
                  >
                    {nextPost.meta.title}
                  </p>
                </Link>
              )}
            </div>
          </nav>
        </div>

        {/* Editorial sidebar — large screens only */}
        <aside className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0">
          <div className="sticky top-28 pt-10 pb-20">
            <ArticleSidebar content={post.content} currentSlug={post.meta.slug} />
          </div>
        </aside>
      </div>
    </div>
  );
}
