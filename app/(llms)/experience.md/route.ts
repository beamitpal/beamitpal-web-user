
import { NextResponse } from "next/server";
import { WORK_EXPERIENCE as EXPERIENCES } from "@/features/profile/data/experience";

function formatEmploymentPeriod(period: unknown): string {
  if (typeof period === "string") return period;
  if (period && typeof period === "object" && "start" in period) {
    const { start, end } = period as { start?: string; end?: string };
    const from = start ?? "N/A";
    const to = end && end.trim() ? end : "Present";
    return `${from} - ${to}`;
  }
  return "N/A";
}

function formatSkills(skills: unknown): string {
  if (Array.isArray(skills)) return skills.filter(Boolean).join(", ") || "N/A";
  return "N/A";
}

const content = `# Experience

${(EXPERIENCES ?? [])
  .map((item: any) => {
    const company =
      item?.companyName ?? item?.company ?? item?.org ?? "Unknown Company";

    const positions: any[] = Array.isArray(item?.positions)
      ? item.positions
      : [];

    const blocks = positions.map((position) => {
      const title = position?.title ?? "Untitled";
      const period = formatEmploymentPeriod(position?.employmentPeriod);
      const skills = formatSkills(position?.skills);
      const description = (position?.description ?? "").toString().trim();

      return `## ${title} | ${company}

Duration: ${period}

Skills: ${skills}

${description}`;
    });

    return blocks.join("\n\n");
  })
  .filter(Boolean)
  .join("\n\n")}
`;

export const dynamic = "force-static";

export async function GET() {
  return new NextResponse(content, {
    status: 200,
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
