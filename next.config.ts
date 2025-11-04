/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jcxbd.com",
        port: "",          
        pathname: "/**",    // allow all paths
      },
    ],
  },
};

module.exports = nextConfig;
