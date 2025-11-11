import { SOCIAL_LINKS } from "@/features/profile/data/social-links";
import { TECH_STACK } from "@/features/profile/data/tech-stack";
import { USERS } from "@/features/profile/data/user";

export const dynamic = "force-static";

export async function GET() {
  const user = await USERS();

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