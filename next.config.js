/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
      {
        protocol: "https",
        hostname: "api.fernandoituarte.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

module.exports = nextConfig;
