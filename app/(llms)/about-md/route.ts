import { getSocialLinks } from "@/features/profile/data/social-links";
import { getTechStack } from "@/features/profile/data/tech-stack";
import { USERS } from "@/features/profile/data/user";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await USERS();
  const SOCIAL_LINKS = await getSocialLinks();
  const TECH_STACK = await getTechStack();

  const content = `# About

${(user.about || "").trim()}

## Personal Information

- First Name: ${user.firstName}
- Last Name: ${user.lastName}
- Display Name: ${user.displayName}
- Location: ${user.address}
- Website: ${user.website}

## Social Links

${SOCIAL_LINKS.map((item) => `- [${item.title}](${item.href})`).join("\n")}

## Tech Stack

${TECH_STACK.map((item) => `- [${item.title}](${item.href})`).join("\n")}\n`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}