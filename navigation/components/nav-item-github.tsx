import React from "react";

import { Button } from "@/components/ui/button";

import { Icons } from "./icons";
import { SOURCE_CODE_GITHUB_URL } from "../data/main-nav";

export function NavItemGitHub() {
  return (
    <Button variant="outline" className="rounded-full" size="icon" asChild>
      <a href={SOURCE_CODE_GITHUB_URL} target="_blank" rel="noopener">
        <Icons.github />
        <span className="sr-only">GitHub</span>
      </a>
    </Button>
  );
}