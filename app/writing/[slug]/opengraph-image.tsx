import { ImageResponse } from 'next/og';
import { getAllPosts, getPostBySlug } from '@/lib/content';

// Per-article Open Graph card. Reads the post title/category from the filesystem
// via getPostBySlug, so this MUST run on the Node runtime (default) — not edge.
// Pre-generated at build for every article via generateStaticParams.
export const alt = 'Article by Karen Pendergrass';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.meta.slug }));
}

const NAME = 'Karen Pendergrass';
const DOMAIN = 'karenpendergrass.com';

function prettifyCategory(category: string): string {
  const cleaned = (category || 'Writing').replace(/-/g, ' ').trim();
  return cleaned.toUpperCase();
}

export default function ArticleOpengraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  const rawTitle = post?.meta.title || NAME;
  const title = rawTitle.length > 120 ? `${rawTitle.slice(0, 117)}…` : rawTitle;
  const label = prettifyCategory(post?.meta.category || 'Writing');

  // Scale the headline down as titles get longer so they always fit the card.
  const titleFontSize =
    title.length > 90 ? 46 : title.length > 60 ? 54 : title.length > 38 ? 62 : 70;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#111110',
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: '44px',
              height: '4px',
              backgroundColor: '#d4845f',
              marginRight: '18px',
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: '22px',
              letterSpacing: '0.18em',
              color: '#d4845f',
            }}
          >
            {label}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: `${titleFontSize}px`,
            lineHeight: 1.12,
            color: '#ffffff',
            fontWeight: 500,
            maxWidth: '1040px',
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                fontSize: '30px',
                color: '#ffffff',
                letterSpacing: '0.06em',
                marginRight: '12px',
              }}
            >
              {NAME}
            </div>
            <div
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '9999px',
                backgroundColor: '#d4845f',
              }}
            />
          </div>
          <div style={{ display: 'flex', fontSize: '22px', color: 'rgba(255,255,255,0.5)' }}>
            {DOMAIN}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
