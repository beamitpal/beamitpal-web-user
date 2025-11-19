import { getAwards } from "@/features/profile/data/awards";

export const dynamic = "force-dynamic";

export async function GET() {
  const AWARDS = await getAwards();

  const content = `# Awards

${AWARDS.map((item) => `## ${item.prize} | ${item.title}\n\n${item.description}`).join("\n\n")}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}