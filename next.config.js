/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'karenpendergrass.com',
      },
      {
        protocol: 'https',
        hostname: 'www.karenpendergrass.com',
      },
    ],
  },
  // Redirect legacy WordPress URLs to their new homes. These only execute when
  // a request is served by this Next.js app, i.e. once the apex DNS points at
  // Vercel (until then the old WordPress host answers and these are inert).
  async redirects() {
    return [
      // Dated permalinks (/YYYY/MM/DD/post-slug/) → /writing/:slug
      // Regex-constrained so only real date paths match, never app routes.
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug*',
        destination: '/writing/:slug*',
        permanent: true,
      },
      // Older permalinks without the day segment (/YYYY/MM/post-slug/)
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:slug+',
        destination: '/writing/:slug+',
        permanent: true,
      },
      // WordPress taxonomy archives → the writing index
      {
        source: '/category/:slug*',
        destination: '/writing',
        permanent: true,
      },
      {
        source: '/tag/:slug*',
        destination: '/writing',
        permanent: true,
      },
      // Author archives → about
      {
        source: '/author/:slug*',
        destination: '/about',
        permanent: true,
      },
      // Old static WordPress pages → closest equivalents
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
        source: '/faq',
        destination: '/',
        permanent: true,
      },
      {
        source: '/science',
        destination: '/research',
        permanent: true,
      },
      // One-off slug that changed during migration
      {
        source: '/writing/how-to-save-a-rocket-spacexs-plan-for-rocket-recovery-hits-a-few-bumps',
        destination: '/writing/zinc-dyshomeostasis-multiple-sclerosis-pathogenesis',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
