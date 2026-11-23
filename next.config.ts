import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to `out/`.
  output: "export",
  // `/about/` → `out/about/index.html`, so any static host serves clean URLs.
  trailingSlash: true,
  // The default image loader needs a server; images ship as-is.
  images: { unoptimized: true },
};

export default nextConfig;
