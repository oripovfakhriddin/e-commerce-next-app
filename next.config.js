/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "www.junglescout.com",
      },
      {
        protocol: "https",
        hostname: "c8.alamy.com",
      },
    ],
  },
};

module.exports = nextConfig;
