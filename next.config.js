/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // distDir: "dist",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "ae01.alicdn.com",
      },
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/password",
  //       destination: "/",
  //       permanent: true,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
