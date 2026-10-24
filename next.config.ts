import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Myweb",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
