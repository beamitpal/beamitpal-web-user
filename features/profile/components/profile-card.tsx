"use client";

import React, { useState, useRef } from "react";
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

  // pointer drag detection for mobile — prevents accidental flips while scrolling
  const pointerStartY = useRef<number | null>(null);
  const draggingRef = useRef(false);
  // used to avoid double-toggle (pointerUp followed by click) on touch devices
  const lastFlipTimeRef = useRef<number | null>(null);

  const handleCardPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    pointerStartY.current = e.clientY;
    draggingRef.current = false;
    // don't capture the pointer - capturing interferes with scrollable areas on mobile
  };

  const handleCardPointerMove = (e: React.PointerEvent) => {
    if (pointerStartY.current === null) return;
    if (Math.abs(e.clientY - pointerStartY.current) > 8)
      draggingRef.current = true;
  };

  const handleCardPointerUp = (e: React.PointerEvent<HTMLElement>) => {
    // if user dragged, don't flip
    if (draggingRef.current) {
      pointerStartY.current = null;
      draggingRef.current = false;
      return;
    }

    const target = e.target as HTMLElement;
    if (
      target.closest("a") ||
      target.closest("button") ||
      target.closest("[role='button']") ||
      target.closest("[data-no-flip]")
    ) {
      pointerStartY.current = null;
      return;
    }

    setIsFlipped((s) => !s);
    lastFlipTimeRef.current = Date.now();
    // we intentionally don't call releasePointerCapture because we do not capture
    pointerStartY.current = null;
  };

  // keep click handler as a fallback on non-pointer environments
  const handleCardClick = (e: React.MouseEvent) => {
    // dedupe -- ignore click immediately after pointerUp flip to avoid double toggles
    if (lastFlipTimeRef.current && Date.now() - lastFlipTimeRef.current < 500)
      return;
    const target = e.target as HTMLElement;
    if (
      target.closest("a") ||
      target.closest("button") ||
      target.closest("[role='button']") ||
      target.closest("[data-no-flip]")
    ) {
      return;
    }

    setIsFlipped((s) => !s);
  };

  return (
    <div
      className="w-full max-w-5xl mx-auto perspective-[1000px]"
      style={{ filter: "none", backdropFilter: "none" }}
    >
      <div
        className="relative cursor-pointer h-auto min-h-[500px] md:min-h-[320px] lg:h-[360px] transition-transform duration-700 touch-action-pan-y"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          filter: "none !important",
          backdropFilter: "none !important",
          WebkitBackdropFilter: "none !important",
        }}
        onPointerDown={handleCardPointerDown}
        onPointerMove={handleCardPointerMove}
        onPointerUp={handleCardPointerUp}
        onClick={handleCardClick}
      >
        {/* Front of Card - Credit Card Style ID */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl md:rounded-3xl overflow-hidden border border-edge shadow-xl bg-white dark:bg-zinc-950"
          style={{
            backfaceVisibility: "hidden",
            filter: "none !important",
            WebkitFilter: "none !important",
            backdropFilter: "none !important",
            WebkitBackdropFilter: "none !important",
          }}
        >
          <div
            className="h-full bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 relative"
            style={{
              filter: "none !important",
              backdropFilter: "none !important",
            }}
          >
            {/* MOBILE LAYOUT - Portrait orientation */}
            <div className="md:hidden relative z-10 h-full p-6 flex flex-col">
              {/* Top section - Large Avatar and QR */}
              <div className="flex items-center justify-between gap-4 mb-6">
                {/* Large Avatar */}
                <div className="relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-32 h-32 rounded-2xl ring-4 ring-border object-cover shadow-lg"
                    width={128}
                    height={128}
                    alt={user.displayName}
                    src={user.avatar}
                    fetchPriority="high"
                  />
                </div>
                {/* Large QR Code */}
                <div className="shrink-0">
                  <div className="rounded-xl border-4 border-edge p-2 bg-white dark:bg-zinc-950 flex items-center justify-center w-32 h-32 shadow-lg">
                    <QRCode
                      data="https://x.com/beamitpal"
                      className="w-28 h-28"
                    />
                  </div>
                </div>
              </div>

              {/* Middle section - Name, Title, and ID */}
              <div className="flex flex-col gap-3 mb-auto">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-3xl font-bold tracking-tight">
                    {user.displayName}
                  </h2>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <SimpleTooltip content="Verified">
                      <VerifiedIcon className="size-6 text-info" />
                    </SimpleTooltip>
                    {user.namePronunciationUrl && (
                      <div data-no-flip>
                        <PronounceMyName
                          className="translate-y-px [&_svg]:size-6"
                          namePronunciationUrl={user.namePronunciationUrl}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="h-8 overflow-hidden flex items-center">
                  <FlipSentences
                    className="truncate whitespace-nowrap text-base w-full text-muted-foreground"
                    sentences={user.flipSentences}
                  />
                </div>
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
                  Professional ID • @{user.username}
                </div>
              </div>

              {/* Bottom section - Gender and Tap to Flip */}
              <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-edge pt-4 mt-6">
                <span className="font-medium">{user.pronouns}</span>
                <span className="font-mono text-xs uppercase tracking-wider">
                  TAP TO FLIP
                </span>
              </div>
            </div>

            {/* DESKTOP LAYOUT - Landscape orientation (Credit Card ID Style) */}
            <div className="hidden md:flex relative z-10 h-full p-5 lg:p-6">
              {/* Left side - Large Avatar */}
              <div className="flex items-center justify-center pr-5 lg:pr-6 border-r border-edge/30 shrink-0 w-[140px] lg:w-[160px]">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-28 h-28 lg:w-32 lg:h-32 rounded-xl ring-2 ring-border object-cover shadow-xl"
                    width={128}
                    height={128}
                    alt={user.displayName}
                    src={user.avatar}
                    fetchPriority="high"
                  />
                </div>
              </div>

              {/* Center - Main content */}
              <div className="flex-1 flex flex-col justify-between px-5 lg:px-6 min-w-[220px]">
                {/* Top section - ID Header */}
                <div className="flex flex-col gap-0.5">
                  <div className="text-[10px] lg:text-xs font-mono text-muted-foreground uppercase tracking-wide">
                    Professional ID
                  </div>
                  <div className="text-[10px] lg:text-xs font-mono text-muted-foreground">
                    @{user.username}
                  </div>
                </div>

                {/* Middle section - Name and Title */}
                <div className="space-y-1.5 lg:space-y-2 flex-1 flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-1.5 lg:gap-2 flex-wrap">
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
                      {user.displayName}
                    </h2>
                    <div className="flex items-center gap-1 shrink-0">
                      <SimpleTooltip content="Verified">
                        <VerifiedIcon className="size-5 lg:size-6 text-info" />
                      </SimpleTooltip>
                      {user.namePronunciationUrl && (
                        <div data-no-flip>
                          <PronounceMyName
                            className="translate-y-px [&_svg]:size-5 [&_svg]:lg:size-6"
                            namePronunciationUrl={user.namePronunciationUrl}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="h-7 lg:h-8 overflow-hidden flex items-center w-full">
                    <FlipSentences
                      className="truncate whitespace-nowrap text-base lg:text-lg w-full text-muted-foreground"
                      sentences={user.flipSentences}
                    />
                  </div>
                </div>

                {/* Bottom section - Footer */}
                <div className="flex items-center justify-between text-xs lg:text-sm text-muted-foreground">
                  <span className="font-medium">{user.pronouns}</span>
                  <span className="font-mono text-[10px] lg:text-xs uppercase tracking-wider">
                    TAP TO FLIP
                  </span>
                </div>
              </div>

              {/* Right side - QR Code */}
              <div className="flex items-center justify-center pl-5 lg:pl-6 shrink-0">
                <div className="rounded-lg border-2 border-edge p-2 lg:p-2.5 bg-white dark:bg-zinc-950 flex items-center justify-center shadow-lg">
                  <QRCode
                    data="https://x.com/beamitpal"
                    className="w-24 h-24 lg:w-28 lg:h-28"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border border-edge"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            filter: "none !important",
            WebkitFilter: "none !important",
            backdropFilter: "none !important",
            WebkitBackdropFilter: "none !important",
          }}
        >
          <div
            className="h-full bg-linear-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 flex flex-col"
            style={{
              filter: "none !important",
              backdropFilter: "none !important",
            }}
          >
            {/* Magnetic stripe effect */}
            <div className="h-7 sm:h-8 md:h-10 lg:h-12 bg-linear-to-r from-zinc-300 to-zinc-400 dark:from-zinc-800 dark:to-zinc-700 shrink-0" />

            <div className="flex-1 flex flex-col bg-background">
              <div className="border-b border-edge px-2.5 sm:px-3 md:px-4 lg:px-6 py-1 sm:py-1.5 md:py-2 shrink-0">
                <h3 className="text-[11px] sm:text-xs md:text-sm lg:text-base font-semibold">
                  Overview
                </h3>
              </div>

              <div className="flex-1 px-2.5 sm:px-3 md:px-4 lg:px-5 py-1.5 sm:py-2 md:py-2.5 lg:py-3 space-y-1 sm:space-y-1.5 md:space-y-2 lg:space-y-3 overflow-auto">
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

              <div className="border-t border-edge px-2.5 sm:px-3 md:px-4 lg:px-6 py-1 sm:py-1.5 md:py-2 text-center shrink-0">
                <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-mono">
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
