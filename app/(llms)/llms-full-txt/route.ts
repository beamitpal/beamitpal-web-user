import dayjs from "dayjs";
import { NextResponse } from "next/server";

import { SITE_INFO } from "@/config/site/server";

import { getAllPosts } from "@/features/blog/data/post";
import { getLLMText } from "@/features/blog/lib/get-llm-text";

import { getAwards } from "@/features/profile/data/awards";
import { getCertifications } from "@/features/profile/data/certifications";
import { getWorkExperience } from "@/features/profile/data/experience";
import { getProjects } from "@/features/profile/data/projects";
import { getSocialLinks } from "@/features/profile/data/social-links";
import { getTechStack } from "@/features/profile/data/tech-stack";
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
    post?.metadata?.updatedAt ?? post?.updatedAt ?? post?.createdAt ?? new Date();
  return {
    ...post,
    metadata: {
      title: post?.metadata?.title ?? post?.title ?? post?.slug ?? "Untitled",
      description: post?.metadata?.description ?? post?.description ?? "",
      updatedAt,
    },
  };
}

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

      const source = `${SITE_INFO.url}/blog.mdx/${item.slug}.mdx`;
      const body = await getLLMText(item);

      return `---\ntitle: "${title}"\ndescription: "${description}"\nlast_updated: "${lastUpdated}"\nsource: "${source}"\n---\n\n${body}`;
    })
  );

  return chunks.join("\n\n");
}

async function getContent() {
  const u = await USERS();
  const awards = await getAwards();
  const certifications = await getCertifications();
  const experiences = await getWorkExperience();
  const projects = await getProjects();
  const socialLinks = await getSocialLinks();
  const techStack = await getTechStack();

  const aboutText = `## About\n\n${(u.about ?? "").toString().trim()}\n\n### Personal Information\n\n- First Name: ${u.firstName ?? ""}\n- Last Name: ${u.lastName ?? ""}\n- Display Name: ${u.displayName ?? ""}\n- Location: ${u.address ?? ""}\n- Website: ${u.website ?? ""}\n\n### Social Links\n\n${(socialLinks ?? [])
    .map((item: any) => `- [${item.title}](${item.href})`)
    .join("\n")}\n\n### Tech Stack\n\n${(techStack ?? [])
    .map((item: any) => `- [${item.title}](${item.href})`)
    .join("\n")}\n`;

  const experienceText = `## Experience\n\n${experiences
    .map((item: any) =>
      (Array.isArray(item?.positions) ? item.positions : [])
        .map((position: any) => {
          const skills = Array.isArray(position?.skills)
            ? position.skills.filter(Boolean).join(", ")
            : "N/A";
          const period = formatEmploymentPeriod(position?.employmentPeriod);
          const company = item?.companyName ?? "Unknown Company";
          const description = (position?.description ?? "").toString().trim();

          return `### ${position?.title ?? "Untitled"} | ${company}\n\nDuration: ${period}\n\nSkills: ${skills}\n\n${description}`;
        })
        .join("\n\n")
    )
    .join("\n\n")}\n`;

  const projectsText = `## Projects\n\n${projects
    .map((item: any) => {
      const skills = Array.isArray(item?.skills) && item.skills.length ? `\n\nSkills: ${item.skills.join(", ")}` : "";
      const description = item?.description ? `\n\n${item.description.trim()}` : "";
      return `### ${item?.title ?? "Untitled"}\n\nProject URL: ${item?.link ?? "N/A"}${skills}${description}`;
    })
    .join("\n\n")}\n`;

  const awardsText = `## Awards\n\n${awards
    .map((item: any) => `### ${item?.prize ?? ""} | ${item?.title ?? ""}\n\n${item?.description ?? ""}`)
    .join("\n\n")}\n`;

  const certificationsText = `## Certifications\n\n${certifications
    .map((item: any) => `- [${item?.title ?? "Credential"}](${item?.credentialURL ?? "#"})`)
    .join("\n")}\n`;

  return `<SYSTEM>This document contains comprehensive information about ${u.displayName}'s professional profile, portfolio, and blog content. It includes personal details, work experience, projects, achievements, certifications, and all published blog posts. This data is formatted for consumption by Large Language Models (LLMs) to provide accurate and up-to-date information about ${u.displayName}'s background, skills, and expertise as a Design Engineer.</SYSTEM>\n\n# beamitpal.com\n\n> A minimal, pixel-perfect dev portfolio, component registry, and blog to showcase my work as a Design Engineer.\n\n${aboutText}\n${experienceText}\n${projectsText}\n${awardsText}\n${certificationsText}\n\n## Blog\n\n${await getBlogContent()}`;
}

export const dynamic = "force-dynamic";

export async function GET() {
  const text = await getContent();
  return new NextResponse(text, {
    status: 200,
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

