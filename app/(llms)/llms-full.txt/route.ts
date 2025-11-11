
import dayjs from "dayjs";
import { NextResponse } from "next/server";


import { SITE_INFO } from "@/config/site/server";

import { getAllPosts } from "@/features/blog/data/post";
import { getLLMText } from "@/features/blog/lib/get-llm-text";

import { AWARDS } from "@/features/profile/data/awards";
import { CERTIFICATIONS } from "@/features/profile/data/certifications";
import { WORK_EXPERIENCE as EXPERIENCES } from "@/features/profile/data/experience";
import { PROJECTS } from "@/features/profile/data/projects";
import { SOCIAL_LINKS } from "@/features/profile/data/social-links";
import { TECH_STACK } from "@/features/profile/data/tech-stack";
import { USERS } from "@/features/profile/data/user"; 

function formatEmploymentPeriod(period: unknown): string {
  if (typeof period === "string") return period;
  if (period && typeof period === "object" && "start" in period) {
    const { start, end } = period as { start?: string; end?: string };
    return `${start ?? "N/A"} - ${end && end.trim() ? end : "Present"}`;
  }
  return "N/A";
}

function ensureMetadata(post: any) {
  const updatedAt =
    post?.metadata?.updatedAt ??
    post?.updatedAt ??
    post?.createdAt ??
    new Date();
  return {
    ...post,
    metadata: {
      title: post?.metadata?.title ?? post?.title ?? post?.slug ?? "Untitled",
      description: post?.metadata?.description ?? post?.description ?? "",
      updatedAt,
    },
  };
}

function buildAboutText(u: any) {
  return `## About

${(u.about ?? "").toString().trim()}

### Personal Information

- First Name: ${u.firstName ?? ""}
- Last Name: ${u.lastName ?? ""}
- Display Name: ${u.displayName ?? ""}
- Location: ${u.address ?? ""}
- Website: ${u.website ?? ""}

### Social Links

${(SOCIAL_LINKS ?? []).map((item) => `- [${item.title}](${item.href})`).join("\n")}

### Tech Stack

${(TECH_STACK ?? []).map((item) => `- [${item.title}](${item.href})`).join("\n")}\n`;
}

const experienceText = `## Experience

${(EXPERIENCES ?? [])
  .map((item: any) =>
    (Array.isArray(item?.positions) ? item.positions : [])
      .map((position: any) => {
        const skills = Array.isArray(position?.skills)
          ? position.skills.filter(Boolean).join(", ")
          : "N/A";
        const period = formatEmploymentPeriod(position?.employmentPeriod);
        const company = item?.companyName ?? "Unknown Company";
        const description = (position?.description ?? "").toString().trim();

        return `### ${position?.title ?? "Untitled"} | ${company}

Duration: ${period}

Skills: ${skills}

${description}`;
      })
      .join("\n\n")
  )
  .join("\n\n")}
`;

const projectsText = `## Projects

${(PROJECTS ?? [])
  .map((item: any) => {
    const skills =
      Array.isArray(item?.skills) && item.skills.length
        ? `\n\nSkills: ${item.skills.join(", ")}`
        : "";
    const description = item?.description ? `\n\n${item.description.trim()}` : "";
    return `### ${item?.title ?? "Untitled"}\n\nProject URL: ${item?.link ?? "N/A"}${skills}${description}`;
  })
  .join("\n\n")}
`;

const awardsText = `## Awards

${(AWARDS ?? [])
  .map((item: any) => `### ${item?.prize ?? ""} | ${item?.title ?? ""}\n\n${item?.description ?? ""}`)
  .join("\n\n")}
`;

const certificationsText = `## Certifications

${(CERTIFICATIONS ?? [])
  .map((item: any) => `- [${item?.title ?? "Credential"}](${item?.credentialURL ?? "#"})`)
  .join("\n")}
`;

async function getBlogContent() {
  const posts = await getAllPosts();

  const chunks = await Promise.all(
    (posts ?? []).map(async (raw) => {
      const item = ensureMetadata(raw);

      const title = String(item.metadata.title).replace(/"/g, '\\"');
      const description = String(item.metadata.description).replace(/"/g, '\\"');

      const lastUpdated = dayjs(item.metadata.updatedAt).isValid()
        ? dayjs(item.metadata.updatedAt).format("MMMM D, YYYY")
        : "Unknown";

      const source = `${SITE_INFO.url}/blog/${item.slug}`;
      const body = await getLLMText(item);

      return `---\ntitle: "${title}"\ndescription: "${description}"\nlast_updated: "${lastUpdated}"\nsource: "${source}"\n---\n\n${body}`;
    })
  );

  return chunks.join("\n\n");
}

async function getContent() {
  const u = await USERS();

  const aboutText = buildAboutText(u);

  return `<SYSTEM>This document contains comprehensive information about ${u.displayName}'s professional profile, portfolio, and blog content. It includes personal details, work experience, projects, achievements, certifications, and all published blog posts. This data is formatted for consumption by Large Language Models (LLMs) to provide accurate and up-to-date information about ${u.displayName}'s background, skills, and expertise as a Design Engineer.</SYSTEM>

# beamitpal.com

> A minimal, pixel-perfect dev portfolio, component registry, and blog to showcase my work as a Design Engineer.

${aboutText}
${experienceText}
${projectsText}
${awardsText}
${certificationsText}

## Blog

${await getBlogContent()}`;
}

export const dynamic = "force-static";

export async function GET() {
  const text = await getContent();
  return new NextResponse(text, {
    status: 200,
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
