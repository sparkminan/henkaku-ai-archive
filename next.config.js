/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'vimeo.com', 'example.com'],
    unoptimized: true,
  },
  // GitHub Pages用の設定
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/henkaku-ai-archive' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/henkaku-ai-archive' : '',
}

module.exports = nextConfig
