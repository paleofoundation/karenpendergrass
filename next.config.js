/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'karenpendergrass.com',
      },
    ],
  },
  // Redirect old WordPress slugs that had mismatched URLs
  async redirects() {
    return [
      {
        source: '/2025/02/22/:slug*',
        destination: '/writing/:slug*',
        permanent: true,
      },
      {
        source: '/2025/09/22/:slug*',
        destination: '/writing/:slug*',
        permanent: true,
      },
      {
        source: '/2025/11/:day/:slug*',
        destination: '/writing/:slug*',
        permanent: true,
      },
      {
        source: '/2026/02/:day/:slug*',
        destination: '/writing/:slug*',
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
        source: '/writing/how-to-save-a-rocket-spacexs-plan-for-rocket-recovery-hits-a-few-bumps',
        destination: '/writing/zinc-dyshomeostasis-multiple-sclerosis-pathogenesis',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
