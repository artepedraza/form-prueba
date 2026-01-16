import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Force Vercel redeploy - updated 2026-01-16
};

export default nextConfig;
