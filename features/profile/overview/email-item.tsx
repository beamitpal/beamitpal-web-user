"use client";

import { MailIcon } from "lucide-react";
import { IntroItem } from "./intro-item";
import { useIsClient } from "@/hooks/use-is-client";

function decodeEmail(encoded: string): string {
  return atob(encoded);
}

export function EmailItem({ email }: { email: string }) {
  const isClient = useIsClient();
  const emailDecoded = decodeEmail(email);

  return (
    <IntroItem
      icon={MailIcon}
      content={isClient ? emailDecoded : "[Email protected]"}
      href={isClient ? `mailto:${emailDecoded}` : "#"}
    />
  );
}
