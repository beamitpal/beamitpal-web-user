import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.simpleicons.org" }
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/about.md', destination: '/about-md' },
        { source: '/awards.md', destination: '/awards-md' },
        { source: '/blog.mdx/:slug.mdx', destination: '/blog-mdx/:slug' },
        { source: '/blog.mdx/:path*', destination: '/blog-mdx/:path*' },
        { source: '/certifications.md', destination: '/certifications-md' },
        { source: '/experience.md', destination: '/experience-md' },
        { source: '/llms-full.txt', destination: '/llms-full-txt' },
        { source: '/llms.txt', destination: '/llms-txt' },
        { source: '/projects.md', destination: '/projects-md' },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
