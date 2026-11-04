import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so the site can live on GitHub Pages, like the current one.
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
