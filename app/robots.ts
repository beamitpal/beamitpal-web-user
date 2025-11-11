import { ROBOTS } from "@/config/site/static";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots { return ROBOTS.robots; }