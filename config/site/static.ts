
import type { Viewport, MetadataRoute } from "next";

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: META_THEME_COLORS.light,
};

export const FALLBACKS = {
  displayName: "Amit Pal",
  jobTitle: "Full Stack Web & Android Developer",
  bio: "Senior Web Developer. Building seamless digital experiences.",
  ogImage: "/og-beamitpal.png",
  url: "https://beamitpal.com",
  twitterUsername: "@beamitpal",
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
};

export const SITE_URL =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_APP_URL) ||
  FALLBACKS.url;


export const ROBOTS: { robots: MetadataRoute.Robots } = {
  robots: {
    rules: [
      { userAgent: "*", allow: ["/"] },
      { userAgent: "Googlebot", allow: ["/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  },
};


export const SITEMAP: { sitemap: MetadataRoute.Sitemap } = {
  sitemap: [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ],
};
export const UTM_PARAMS = {
  utm_source: "beamitpal.com",
  utm_medium: "portfolio_website",
  utm_campaign: "referral",
};
