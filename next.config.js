/** @type {import('next').NextConfig} */
const isVercel = process.env.VERCEL === '1';

const nextConfig = {
  output: 'export',
  basePath: isVercel ? '' : '/wanda-portfolio',
  assetPrefix: isVercel ? undefined : '/wanda-portfolio/',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ['image/webp'],
    domains: [],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
