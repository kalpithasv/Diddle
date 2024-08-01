/** @type {import('next').NextConfig} */

const BACKEND_URI = process.env.BACKEND_URI || 'http://localhost:8000';

const nextConfig = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: `${BACKEND_URI}/:path*/`, 
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;