const SITE_URL = 'https://karenpendergrass.com';

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  // Middleware owns trailing-slash + legacy remaps so dated permalinks
  // collapse to a single 308 instead of slash-strip then slug rewrite.
  skipTrailingSlashRedirect: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'karenpendergrass.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.karenpendergrass.com' }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contacts',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/science',
        destination: '/research',
        permanent: true,
      },
      {
        source: '/writing/how-to-save-a-rocket-spacexs-plan-for-rocket-recovery-hits-a-few-bumps',
        destination: '/writing/zinc-dyshomeostasis-multiple-sclerosis-pathogenesis',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/donation/success',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

module.exports = nextConfig;
