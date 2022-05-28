/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.themealdb.com",
      "emojipedia-us.s3.dualstack.us-west-1.amazonaws.com",
      "www.supercook.com",
    ],
  },
};

module.exports = nextConfig;
