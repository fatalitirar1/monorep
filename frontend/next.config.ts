/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  transpilePackages: ['antd', '@ant-design/icons'],
};

module.exports = nextConfig;
