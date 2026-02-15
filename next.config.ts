import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/customize',
        destination: '/contact',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
