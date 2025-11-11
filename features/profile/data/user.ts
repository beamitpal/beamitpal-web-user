import "server-only";

import type { User } from "@/features/profile/types/types";
import prisma from "@/lib/prisma";


const b64Strict = (s: string | null | undefined, fallbackB64: string) =>
  s && s.length > 0 ? Buffer.from(s, "utf8").toString("base64") : fallbackB64;

const toDateStr = (d?: Date | string | null) => {
  if (!d) return "2024-01-15";
  const date = typeof d === "string" ? new Date(d) : d;
  if (!date || Number.isNaN(date.getTime())) return "2024-01-15";
  return date.toISOString().slice(0, 10);
};


const FALLBACK_USER: User = {
  firstName: "Amit",
  lastName: "Pal",
  displayName: "Amit Pal",
  username: "beamitpal",
  gender: "male",
  pronouns: "he/him",
  bio: "Senior Web Developer. Building seamless digital experiences.",
  flipSentences: [
    "Senior Web Developer",
    "Android Developer",
    "Crafting Code for Web & Mobile",
    "Open Source Enthusiast",
  ],
  address: "Delhi, India",
  phoneNumber: "KzkxNzc1NTAwOTMyNA==",
  email: "bWVAYmVhbWl0cGFsLmNvbQ==",
  website: "https://beamitpal.com",
  jobTitle: "Full Stack Web & Android Developer",
  jobs: [
    {
      title: "Senior Full Stack Engineer",
      company: "Shailesh And Amit Pal Pvt. Ltd.",
      website: "https://beamitpal.com",
    },
    {
      title: "Founder & Lead Developer",
      company: "Shailesh And Amit Pal Pvt. Ltd.",
      website: "https://beamitpal.com",
    },
  ],
  about:
    "Hello! I'm Amit Pal, a passionate Full Stack Developer with expertise in crafting high-performance, user-centric applications for both web and mobile platforms.",
  avatar: "/images/amit-pal-avatar.webp",
  ogImage: "/og-beamitpal.png",
  namePronunciationUrl: "/audio/amit-pal.mp3",
  keywords: [
    "full stack developer",
    "web developer",
    "android developer",
    "react",
    "nextjs",
    "typescript",
    "mobile development",
    "javascript",
  ],
  dateCreated: "2024-01-15",
};


async function fetchUser(username: string): Promise<User> {
  try {
    const data = await prisma.user.findUnique({ where: { username } });
    if (!data) throw new Error("User row not found");

    return {
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
      displayName: data.displayName ?? "",
      username: data.username ?? "",
      gender: data.gender ?? "",
      pronouns: data.pronouns ?? "",
      bio: data.bio ?? "",
      address: data.address ?? "",
      website: data.website ?? "",
      jobTitle: data.jobTitle ?? "",
      about: data.about ?? "",
      avatar: data.avatar ?? "",
      ogImage: data.ogImage ?? "",
      namePronunciationUrl: data.namePronunciationUrl ?? "",
      flipSentences: data.flipSentences ?? [],
      keywords: data.keywords ?? [],
      jobs: (data.jobs as any) ?? [],
      phoneNumber: b64Strict(data.phoneNumber, FALLBACK_USER.phoneNumber),
      email: b64Strict(data.email, FALLBACK_USER.email),
      dateCreated: toDateStr(data.dateCreated),
    };
  } catch {
    return FALLBACK_USER;
  }
}


export async function USERS(username?: string): Promise<User> {
  return fetchUser(username ?? "beamitpal");
}
