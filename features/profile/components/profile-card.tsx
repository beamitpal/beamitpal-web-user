"use client";

import React, { useState } from "react";
import { GlobeIcon, MapPinIcon, MarsIcon, VenusIcon } from "lucide-react";
import { User } from "@/features/profile/types/types";
import { FlipSentences } from "@/components/ui/flip-sentences";
import { PronounceMyName } from "@/features/profile/pronounce/pronounce-my-name";
import { VerifiedIcon } from "@/features/profile/icons/verified-icon";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { EmailItem } from "@/features/profile/overview/email-item";
import { PhoneItem } from "@/features/profile/overview/phone-item";
import { JobItem } from "@/features/profile/overview/job-item";
import { IntroItem } from "@/features/profile/overview/intro-item";
import { urlToName } from "@/utils/url";
import { QRCode } from "@/components/pal-ui/qr-code";

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't flip if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (
      target.closest("a") ||
      target.closest("button") ||
      target.closest("[role='button']") ||
      target.closest("[data-no-flip]")
    ) {
      return;
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-2xl mx-auto perspective-[1000px]">
      <div
        className="relative cursor-pointer h-[300px] sm:h-[340px] md:h-[360px] transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        onClick={handleCardClick}
      >
        {/* Front of Card - Credit Card Style */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border border-edge shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="h-full bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 relative">
            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, var(--color-edge) 0, var(--color-edge) 1px, transparent 0, transparent 50%)",
                backgroundSize: "10px 10px",
              }}
            />

            {/* Content */}
            <div className="relative h-full p-5 sm:p-6 md:p-8 flex justify-between gap-4 sm:gap-6">
              {/* Left side - Main content */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                {/* Top section - Chip and ID */}
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Avatar as chip */}
                  <div className="relative shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="size-14 sm:size-16 md:size-20 rounded-xl ring-2 ring-border shadow-md object-cover"
                      alt={user.displayName}
                      src={user.avatar}
                      fetchPriority="high"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider">
                      Professional ID
                    </div>
                    <div className="text-xs sm:text-sm font-mono text-muted-foreground truncate">
                      #{user.username}
                    </div>
                  </div>
                </div>

                {/* Middle section - Name and Title */}
                <div className="space-y-1.5 sm:space-y-2 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide truncate">
                      {user.displayName}
                    </h2>
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <SimpleTooltip content="Verified">
                        <VerifiedIcon className="size-5 sm:size-6 text-info" />
                      </SimpleTooltip>
                      {user.namePronunciationUrl && (
                        <div data-no-flip>
                          <PronounceMyName
                            className="translate-y-px [&_svg]:size-5 [&_svg]:sm:size-6"
                            namePronunciationUrl={user.namePronunciationUrl}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="h-7 sm:h-9 overflow-hidden">
                    <FlipSentences sentences={user.flipSentences} />
                  </div>
                </div>

                {/* Bottom section - Footer */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                  <span className="truncate">{user.pronouns}</span>
                  <span className="font-mono shrink-0 ml-2">TAP TO FLIP</span>
                </div>
              </div>

              {/* Right side - QR Code */}
              <div className="shrink-0 flex items-center">
                <div className="rounded-xl border-5 border-edge p-2 sm:p-2.5 bg-transparent">
                  <QRCode
                    data="https://x.com/beamitpal"
                    className="size-28 sm:size-32 md:size-40"
                  />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 size-32 sm:size-40 bg-linear-to-br from-primary/5 to-transparent rounded-full blur-2xl" />
          </div>
        </div>

        {/* Back of Card */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border border-edge shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="h-full bg-linear-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 flex flex-col">
            {/* Magnetic stripe effect */}
            <div className="h-10 sm:h-12 bg-linear-to-r from-zinc-300 to-zinc-400 dark:from-zinc-800 dark:to-zinc-700 shrink-0" />

            <div className="flex-1 flex flex-col bg-background">
              <div className="border-b border-edge px-4 sm:px-6 py-2 sm:py-2.5 shrink-0">
                <h3 className="text-sm sm:text-base font-semibold">Overview</h3>
              </div>

              <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 space-y-2.5 sm:space-y-3">
                {user.jobs.map((job, index) => (
                  <JobItem
                    key={index}
                    title={job.title}
                    company={job.company}
                    website={job.website}
                  />
                ))}

                <IntroItem icon={MapPinIcon} content={user.address} />
                <PhoneItem phoneNumber={user.phoneNumber} />
                <EmailItem email={user.email} />
                <IntroItem
                  icon={GlobeIcon}
                  content={urlToName(user.website)}
                  href={user.website}
                />
                <IntroItem
                  icon={user.gender === "male" ? MarsIcon : VenusIcon}
                  content={user.pronouns}
                />
              </div>

              <div className="border-t border-edge px-4 sm:px-6 py-2 sm:py-2.5 text-center shrink-0">
                <p className="text-xs sm:text-sm text-muted-foreground font-mono">
                  TAP TO FLIP BACK
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
