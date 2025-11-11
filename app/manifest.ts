
import type { MetadataRoute } from "next";
import { getMyInfo } from "@/config/site/server";
import { META_THEME_COLORS } from "@/config/site/static";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { u } = await getMyInfo();

  return {
    name: `${u.displayName} Portfolio`,
    short_name: u.displayName,
    description: u.bio,
    start_url: "/",
    display: "standalone",
    background_color: META_THEME_COLORS.dark,
    theme_color: META_THEME_COLORS.light,
    orientation: "portrait",
    id: "/?utm_source=pwa",
    scope: "/",
    icons: [
      { src: "/icon0.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
    screenshots: [
      { src: "/narrow-dark.webp", type: "image/webp", sizes: "440x956", form_factor: "narrow" },
      { src: "/wide-dark.webp", type: "image/webp", sizes: "1920x1080", form_factor: "wide" },
    ],
  };
}
