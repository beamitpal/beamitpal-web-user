import { getCertifications } from "@/features/profile/data/certifications";

export const dynamic = "force-dynamic";

export async function GET() {
  const CERTIFICATIONS = await getCertifications();

  const content = `# Certifications

${CERTIFICATIONS.map((item) => `- [${item.title}](${item.credentialURL})`).join("\n")}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}