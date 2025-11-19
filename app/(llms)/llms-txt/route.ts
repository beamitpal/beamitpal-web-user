
import { NextResponse } from "next/server";

import { SITE_INFO } from "@/config/site/server";

import { getAllPosts } from "@/features/blog/data/post";

function ensureText(v: unknown, fallback = ""): string {
  return (v ?? fallback).toString();
}

async function getContent() {
  const posts = await getAllPosts();

  const blogList = (posts ?? [])
    .map((item: any) => {

      const title = ensureText(item?.metadata?.title || item?.title || item?.slug || "Untitled");
      const description = ensureText(item?.metadata?.description, "");
      const slug = ensureText(item?.slug, "");
      return `- [${title}](${SITE_INFO.url}/blog.mdx/${slug}.mdx): ${description}`;
    })
    .join("\n");

  return `# chanhdai.com

> A minimal, pixel-perfect dev portfolio, component registry, and blog to showcase my work as a Design Engineer.

- [About](${SITE_INFO.url}/about.md): A quick intro to me, my tech stack, and how to connect.
- [Experience](${SITE_INFO.url}/experience.md): Highlights from my career and key roles I've taken on.
- [Projects](${SITE_INFO.url}/projects.md): Selected projects that show my skills and creativity.
- [Awards](${SITE_INFO.url}/awards.md): My key awards and honors.
- [Certifications](${SITE_INFO.url}/certifications.md): Certifications and credentials I've earned.

## Blog

${blogList}
`;
}

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getContent();
  return new NextResponse(content, {
    status: 200,
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
