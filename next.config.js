/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.360airo.com',
          },
        ],
        destination: 'https://360airo.com/:path*',
        permanent: true,
      },
      {
        source: '/tools',
        destination: '/free-tools',
        permanent: true,
      },
      {
        source: '/tools/:path*',
        destination: '/free-tools/:path*',
        permanent: true,
      },
      {
        source: '/blog/best-ai-tools-for-outbound-prospecting-in-2026',
        destination: '/blogs/ai-prospecting-tools-2026',
        permanent: true,
      },
      {
        source: '/blogs/best-ai-tools-for-outbound-prospecting-in-2026',
        destination: '/blogs/ai-prospecting-tools-2026',
        permanent: true,
      },
      {
        source: '/blog/ai-sdr-vs-human-sdr-cost-performance-roi',
        destination: '/blogs/ai-sdr-vs-human-sdr',
        permanent: true,
      },
      {
        source: '/blogs/ai-sdr-vs-human-sdr-cost-performance-roi',
        destination: '/blogs/ai-sdr-vs-human-sdr',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/blogs/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
