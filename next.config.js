/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: process.env.NODE_ENV === "production" ? "export" : undefined,
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  distDir: "dist",
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
