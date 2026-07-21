import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    return {
      // beforeFiles runs ahead of the filesystem and app routes, so "/"
      // resolves to the static island page in public/ instead of 404ing.
      // The previous React homepage now lives at /classic.
      beforeFiles: [{ source: "/", destination: "/island/index.html" }],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
