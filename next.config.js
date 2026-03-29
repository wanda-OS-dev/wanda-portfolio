/** @type {import('next').NextConfig} */
const isVercel = process.env.VERCEL === '1';

const path = require('path');

const nextConfig = {
  output: 'export',
  basePath: isVercel ? '' : '/wanda-portfolio',
  assetPrefix: isVercel ? undefined : '/wanda-portfolio/',
  trailingSlash: true,
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'framer-motion'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    turbopack: {
      root: __dirname,
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    };
    return config;
  },
  images: {
    unoptimized: true,
    formats: ['image/webp'],
    domains: [],
  },
};

module.exports = nextConfig;