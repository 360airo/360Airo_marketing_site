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
    ];
  },
};

module.exports = nextConfig;
