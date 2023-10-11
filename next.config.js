/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["cdn.shopify.com"],
  },
  async redirects() {
    return [
      {
        source: "/password",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
