"use client";

import { PhoneIcon } from "lucide-react";
import { IntroItem } from "./intro-item";
import { useIsClient } from "@/hooks/use-is-client";

function decodePhoneNumber(encoded: string): string {
  return atob(encoded);
}

function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{1,3})(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  }
  return phoneNumber;
}

export function PhoneItem({ phoneNumber }: { phoneNumber: string }) {
  const isClient = useIsClient();
  const phoneNumberDecoded = decodePhoneNumber(phoneNumber);

  return (
    <IntroItem
      icon={PhoneIcon}
      content={
        isClient ? formatPhoneNumber(phoneNumberDecoded) : "[Phone protected]"
      }
      href={isClient ? `tel:${phoneNumberDecoded}` : "#"}
    />
  );
}
