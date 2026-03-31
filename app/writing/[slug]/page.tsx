import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, formatDate, readingTime } from '@/lib/content';

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

  return {
    title: post.meta.title,
    description:
      post.meta.excerpt ||
      post.content
        .replace(/[#*_\[\]()]/g, '')
        .replace(/\n+/g, ' ')
        .slice(0, 160),
    openGraph: {
      title: post.meta.title,
      description:
        post.meta.excerpt ||
        post.content
          .replace(/[#*_\[\]()]/g, '')
          .replace(/\n+/g, ' ')
          .slice(0, 160),
      type: 'article',
      publishedTime: post.meta.date,
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

  // Simple markdown-to-HTML for the content
  // In production you'd use next-mdx-remote or remark here
  const htmlContent = simpleMarkdownToHtml(post.content);

  return (
    <div className="page-enter">
      {/* Article header */}
      <header className="max-w-3xl mx-auto px-6 pt-16 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/writing"
            className="text-xs text-ink-muted hover:text-accent transition-colors"
          >
            &larr; Writing
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

        <div className="flex items-center gap-3 text-sm text-ink-muted">
          <time>{formatDate(post.meta.date)}</time>
          <span>&middot;</span>
          <span>{readingTime(post.content)}</span>
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

      {/* Article body */}
      <article
        className="max-w-3xl mx-auto px-6 pb-16 prose"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Prev / Next navigation */}
      <nav className="max-w-3xl mx-auto px-6 pb-20 border-t border-ink/5 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {prevPost && (
            <Link
              href={`/writing/${prevPost.meta.slug}`}
              className="group"
            >
              <p className="text-xs text-ink-muted mb-1">&larr; Previous</p>
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
              <p className="text-xs text-ink-muted mb-1">Next &rarr;</p>
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

/**
 * Simple markdown-to-HTML converter for basic rendering.
 * Replace with next-mdx-remote for full MDX support in production.
 */
function simpleMarkdownToHtml(md: string): string {
  let html = md;

  // Headings
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr />');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>');

  // List items (simple)
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Paragraphs: wrap lines that aren't already HTML
  const lines = html.split('\n');
  const result: string[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      continue;
    }

    if (line.startsWith('<li>')) {
      if (!inList) {
        result.push('<ul>');
        inList = true;
      }
      result.push(line);
      continue;
    }

    if (inList) {
      result.push('</ul>');
      inList = false;
    }

    if (
      line.startsWith('<h') ||
      line.startsWith('<blockquote') ||
      line.startsWith('<hr') ||
      line.startsWith('<ul') ||
      line.startsWith('</ul') ||
      line.startsWith('<img')
    ) {
      result.push(line);
    } else {
      result.push(`<p>${line}</p>`);
    }
  }

  if (inList) result.push('</ul>');

  return result.join('\n');
}
