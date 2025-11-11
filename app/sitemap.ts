import { SITEMAP } from "@/config/site/static";
import type { MetadataRoute } from "next";


export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP.sitemap;
}
