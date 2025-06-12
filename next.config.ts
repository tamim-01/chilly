import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001/api"
        : "idk yet",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chilly.s3.ir-thr-at1.arvanstorage.ir",
      },
    ],
  },
};

export default nextConfig;
