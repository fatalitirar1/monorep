import type { NextConfig } from 'next'


const nextConfig: NextConfig = {
  transpilePackages: ['antd', '@ant-design', 'rc-util', 'rc-pagination', 'rc-picker'],

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig