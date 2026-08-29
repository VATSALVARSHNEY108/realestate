/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Optimize package bundling for heavy 3D and icon libraries
  experimental: {
    optimizePackageImports: ['lucide-react', 'three', '@react-three/fiber', '@react-three/drei'],
  },
};

module.exports = nextConfig;
