import React from "react";

import { Panel } from "@/components/ui/panel";
import { SocialLinkItem } from "./social-link-items";
import { getSocialLinks } from "../data/social-links";

export const dynamic = "force-dynamic";

export async function SocialLinks() {
  const SOCIAL_LINKS = await getSocialLinks();

  return (
    <Panel>
      <h2 className="sr-only">Social Links</h2>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SOCIAL_LINKS.map((link, index) => {
            return <SocialLinkItem key={index} {...link} />;
          })}
        </div>
      </div>
    </Panel>
  );
}