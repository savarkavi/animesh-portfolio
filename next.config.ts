import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://wpyy1h42p2.ufs.sh/**")],
  },
};

export default nextConfig;
