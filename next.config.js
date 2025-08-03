/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'vimeo.com', 'example.com'],
    unoptimized: true,
  },
  // GitHub Pages用の設定
  // output: 'export' は本番ビルド時のみ有効
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
  basePath: process.env.NODE_ENV === 'production' ? '/henkaku-ai-archive' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/henkaku-ai-archive' : '',
}

module.exports = nextConfig
