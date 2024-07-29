/** @type {import('next').NextConfig} */

const BACKEND_URI = 'http://localhost:8000';

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: `http://localhost:8000/:path*`, 
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