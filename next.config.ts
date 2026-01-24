import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'motion'],
  },
  // Enable compression
  compress: true,
  // Reduce JavaScript bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
};

export default nextConfig;
