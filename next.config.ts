import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 eslint: {
  ignoreDuringBuilds: true,
 },
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during the build process
  },
};

export default nextConfig;
