/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "replicate.delivery" },
      { protocol: "https", hostname: "cdn.fashn.ai" },
      { protocol: "https", hostname: "**.fashn.ai" },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
