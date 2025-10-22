/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jcxbd.com",
        port: "",           // optional, leave empty if default
        pathname: "/**",    // allow all paths
      },
    ],
  },
};

module.exports = nextConfig;
