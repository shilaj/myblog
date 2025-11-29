/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true, // recommended so relative paths work
  assetPrefix: process.env.GITHUB_PAGES ? 'https://shilaj.github.io/myblog/' : undefined,
};

export default nextConfig;