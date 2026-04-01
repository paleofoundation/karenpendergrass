import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import remarkSlug from 'remark-slug';
import { getAllPosts, getPostBySlug, formatDate, readingTime } from '@/lib/content';
import { ArticleSchema } from '@/components/JsonLd';
import ShareButtons from '@/components/ShareButtons';
import AuthorBio from '@/components/AuthorBio';
import TableOfContents from '@/components/TableOfContents';
import ReadingProgress from '@/components/ReadingProgress';
import CitationBlock from '@/components/CitationBlock';
import NewsletterSignup from '@/components/NewsletterSignup';
import RelatedArticles from '@/components/RelatedArticles';

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

  const description =
    post.meta.excerpt ||
    post.content
      .replace(/[#*_\[\]()]/g, '')
      .replace(/\n+/g, ' ')
      .slice(0, 160);

  return {
    title: post.meta.title,
    description,
    openGraph: {
      title: post.meta.title,
      description,
      type: 'article',
      publishedTime: post.meta.date,
      authors: ['Karen Pendergrass'],
      url: `https://karenpendergrass.com/writing/${post.meta.slug}`,
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
};

export default function ArticlePage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

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
  const htmlContent = unified()
    .use(remarkParse)
    // @ts-expect-error — remark-slug@7 vs unified@11 duplicate type trees
    .use(remarkSlug)
    .use(remarkHtml, { sanitize: false })
    .processSync(post.content)
    .toString();

  return (
    <div className="page-enter">
      <ReadingProgress />

      <ArticleSchema
        title={post.meta.title}
        slug={post.meta.slug}
        date={post.meta.date}
        excerpt={
          post.meta.excerpt ||
          post.content
            .replace(/[#*_\[\]()]/g, '')
            .replace(/\n+/g, ' ')
            .slice(0, 160)
        }
        coverImage={post.meta.coverImage}
      />

      {/* Article header */}
      <header className="max-w-3xl mx-auto px-6 pt-16 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/writing"
            className="text-xs text-ink-muted hover:text-accent transition-colors"
          >
            ← Writing
          </Link>
          <span className="text-ink-muted text-xs">/</span>
          <span
            className="text-xs font-semibold uppercase tracking-widest text-accent"
            style={{ letterSpacing: '0.1em' }}
          >
            {categoryLabels[post.meta.category] || post.meta.category}
          </span>
        </div>

        <h1
          className="text-3xl md:text-4xl font-medium text-ink leading-tight mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {post.meta.title}
        </h1>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3 text-sm text-ink-muted">
            <time>{formatDate(post.meta.date)}</time>
            <span>·</span>
            <span>{readingTime(post.content)}</span>
          </div>
          <ShareButtons
            url={`/writing/${post.meta.slug}`}
            title={post.meta.title}
          />
        </div>
      </header>

      {/* Cover image */}
      {post.meta.coverImage && (
        <div className="max-w-3xl mx-auto px-6 mb-8">
          <img
            src={post.meta.coverImage}
            alt={post.meta.title}
            className="w-full rounded-lg"
          />
        </div>
      )}

      {/* Table of contents (only for long articles) */}
      {post.content.split(/\s+/).length > 1500 && (
        <div className="max-w-3xl mx-auto px-6">
          <TableOfContents content={post.content} />
        </div>
      )}

      {/* Article body */}
      <article
        className="max-w-3xl mx-auto px-6 pb-10 prose"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Bottom share buttons */}
      <div className="max-w-3xl mx-auto px-6 pb-8">
        <div className="flex items-center justify-between border-t border-ink/5 pt-6">
          <p className="text-xs text-ink-muted">
            If this was useful, share it with someone who needs to see it.
          </p>
          <ShareButtons
            url={`/writing/${post.meta.slug}`}
            title={post.meta.title}
            compact
          />
        </div>
      </div>

      {/* Citation block */}
      <div className="max-w-3xl mx-auto px-6 pb-8">
        <CitationBlock
          title={post.meta.title}
          date={post.meta.date}
          slug={post.meta.slug}
        />
      </div>

      {/* Newsletter signup */}
      <div className="max-w-3xl mx-auto px-6 pb-10">
        <NewsletterSignup />
      </div>

      {/* Author bio */}
      <div className="max-w-3xl mx-auto px-6 pb-10">
        <AuthorBio />
      </div>

      {/* Related articles */}
      <div className="max-w-3xl mx-auto px-6 pb-10">
        <RelatedArticles articles={related} />
      </div>

      {/* Prev / Next navigation */}
      <nav className="max-w-3xl mx-auto px-6 pb-20 border-t border-ink/5 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {prevPost && (
            <Link href={`/writing/${prevPost.meta.slug}`} className="group">
              <p className="text-xs text-ink-muted mb-1">← Previous</p>
              <p
                className="text-sm font-medium text-ink group-hover:text-accent transition-colors line-clamp-2"
                style={{ fontFamily: 'var(--font-display)' }}
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
              <p className="text-xs text-ink-muted mb-1">Next →</p>
              <p
                className="text-sm font-medium text-ink group-hover:text-accent transition-colors line-clamp-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {nextPost.meta.title}
              </p>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
