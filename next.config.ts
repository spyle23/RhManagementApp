import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        protocol: "https",
        port: "7093",
      },
    ],
  },
};

export default nextConfig;
