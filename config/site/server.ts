
import "server-only";

import type { Metadata } from "next";
import { cache } from "react";
import { decodeEmail } from "@/utils/string";
import { USERS } from "@/features/profile/data/user";
import { META_THEME_COLORS } from "./static";



export const getMyInfo = cache(async () => {
  const u = await USERS();
  const email = decodeEmail(u.email);
  const url = String(process.env.NEXT_PUBLIC_APP_URL || u.website || "https://beamitpal.com");
  const ogImage = u.ogImage ?? "/og-beamitpal.png";
  const keywords =
    u.keywords?.length
      ? u.keywords
      : [
          "full stack developer",
          "web developer",
          "android developer",
          "react",
          "nextjs",
          "typescript",
          "mobile development",
          "javascript",
        ];

  return { u, email, url, ogImage, keywords };
});


export async function buildMetadata(): Promise<Metadata> {
  const { u, email, url, ogImage, keywords } = await getMyInfo();

  return {
    metadataBase: new URL(url),
    alternates: { canonical: "/" },
    title: { template: `%s | ${u.displayName}`, default: `${u.displayName} – ${u.jobTitle}` },
    description: u.bio,
    keywords,
    authors: [{ name: u.displayName, url }],
    creator: u.displayName,
    manifest: `${url}/manifest.webmanifest`,
    icons: {
      icon: `${url}/favicon.ico`,
      apple: `${url}/apple-icon.png`,
      shortcut: `${url}/favicon-16x16.png`,
      other: [{ rel: "mask-icon", url: `${url}/icon0.svg`, color: META_THEME_COLORS.dark }],
    },
    openGraph: {
      siteName: u.displayName,
      url,
      type: "profile",
      firstName: u.firstName,
      lastName: u.lastName,
      username: u.username,
      gender: u.gender,
      images: [{ url: ogImage, width: 1200, height: 630, alt: u.displayName }],
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", creator: "@beamitpal", images: [ogImage] },
  };
}


export const SITE_INFO = await getMyInfo();