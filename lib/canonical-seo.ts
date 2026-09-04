import { NextRequest, NextResponse } from 'next/server';
import { CANONICAL_HOST, SITE_URL } from '@/lib/site';
import { PUBLISHED_WRITING_SLUGS } from '@/lib/published-slugs';

/** Retired WordPress / alias URLs. 410, not a homepage redirect. */
const GONE_PATHS = new Set([
  '/faq',
  '/feed',
  '/comments/feed',
  '/rss',
  '/rss.xml',
  '/sitemap',
  '/sitemap_index.xml',
  '/wp-sitemap.xml',
  '/home',
  '/index.php',
  '/wp-login.php',
  '/wp-admin',
  '/wp-json',
]);

const GONE_PREFIXES = ['/wp-content/', '/wp-includes/', '/wp-json/'];

export function applyCanonicalSeo(request: NextRequest): NextResponse | null {
  const url = request.nextUrl;
  const host = (request.headers.get('host') || '').split(':')[0].toLowerCase();

  if (host === `www.${CANONICAL_HOST}`) {
    return NextResponse.redirect(`${SITE_URL}${url.pathname}${url.search}`, 308);
  }

  const pathname = normalizePath(url.pathname);

  if (GONE_PATHS.has(pathname) || GONE_PREFIXES.some((p) => pathname.startsWith(p))) {
    return goneResponse();
  }

  const dated = matchDatedPermalink(pathname);
  if (dated) {
    if (PUBLISHED_WRITING_SLUGS.has(dated.slug)) {
      return redirectTo(request, `/writing/${dated.slug}`);
    }
    return rewriteNotFound(request);
  }

  const rootSlug = matchSingleSegment(pathname);
  if (rootSlug && PUBLISHED_WRITING_SLUGS.has(rootSlug)) {
    return redirectTo(request, `/writing/${rootSlug}`);
  }

  const aliases: Record<string, string> = {
    '/about-us': '/about',
    '/contacts': '/contact',
    '/science': '/research',
    '/blog': '/writing',
    '/writing/how-to-save-a-rocket-spacexs-plan-for-rocket-recovery-hits-a-few-bumps':
      '/writing/zinc-dyshomeostasis-multiple-sclerosis-pathogenesis',
  };
  if (aliases[pathname]) {
    return redirectTo(request, aliases[pathname]);
  }

  if (/^\/page\/\d+$/.test(pathname)) {
    return redirectTo(request, '/writing');
  }

  if (pathname.startsWith('/category/') || pathname === '/category') {
    return redirectTo(request, '/writing');
  }
  if (pathname.startsWith('/tag/') || pathname === '/tag') {
    return redirectTo(request, '/writing');
  }
  if (pathname.startsWith('/author/') || pathname === '/author') {
    return redirectTo(request, '/about');
  }

  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    return redirectTo(request, pathname);
  }

  return null;
}

function normalizePath(pathname: string): string {
  if (pathname === '/') return pathname;
  return pathname.replace(/\/+$/, '') || '/';
}

function matchDatedPermalink(
  pathname: string
): { slug: string } | null {
  const withDay = pathname.match(/^\/(\d{4})\/(\d{2})\/(\d{2})\/([^/]+)$/);
  if (withDay?.[4]) return { slug: withDay[4] };
  const withMonth = pathname.match(/^\/(\d{4})\/(\d{2})\/([^/]+)$/);
  if (withMonth?.[3]) return { slug: withMonth[3] };
  return null;
}

function matchSingleSegment(pathname: string): string | null {
  const match = pathname.match(/^\/([^/]+)$/);
  return match?.[1] ?? null;
}

function redirectTo(request: NextRequest, pathname: string): NextResponse {
  const dest = new URL(pathname, request.nextUrl.origin);
  dest.search = request.nextUrl.search;
  return NextResponse.redirect(dest, 308);
}

function rewriteNotFound(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = '/__not-found__';
  return NextResponse.rewrite(url);
}

function goneResponse(): NextResponse {
  return new NextResponse(
    `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Gone</title>
<meta name="robots" content="noindex, follow">
</head>
<body>
<p>This URL is gone.</p>
</body>
</html>`,
    {
      status: 410,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'x-robots-tag': 'noindex, follow',
      },
    }
  );
}
