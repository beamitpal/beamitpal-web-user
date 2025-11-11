"use client";

import * as React from "react";
import { DownloadIcon, TriangleDashedIcon, TypeIcon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { AmitPalMark, getMarkSVG } from "./amitpal-mark";
import { getWordmarkSVG } from "./amitpal-word-mark";
import { copyText } from "@/utils/copy";


function ensureSingleElement(child: React.ReactNode) {
  if (React.isValidElement(child)) return child;

  return <div>{child}</div>;
}

export function BrandContextMenu({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const triggerChild = ensureSingleElement(children);

  const color = mounted
    ? resolvedTheme === "light"
      ? "#000"
      : "#fff"
    : "#000";

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {triggerChild}
      </ContextMenuTrigger>

      <ContextMenuContent className="w-64">
        <ContextMenuItem
          onClick={() => {
            const svg = getMarkSVG(color);
            copyText(svg);
            toast.success("Copied Mark as SVG");
          }}
        >

          <AmitPalMark  />
          Copy Mark as SVG
        </ContextMenuItem>

        <ContextMenuItem
          onClick={() => {
            const svg = getWordmarkSVG(color);
            copyText(svg);
            toast.success("Copied Logotype as SVG");
          }}
        >
          <TypeIcon />
          Copy Logotype as SVG
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
