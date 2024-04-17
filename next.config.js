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
        hostname: "pepine-app.onrender.com",
      },
      {
        protocol: "https",
        hostname: "pepine-back-ae81.onrender.com",
      },
      {
        protocol: "https",
        hostname: "pepine-back.onrender.com",
      },
    ],
  },
};

module.exports = nextConfig;
