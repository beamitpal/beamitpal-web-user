import { SimpleTooltip } from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";
import { FlipSentences } from "@/components/ui/flip-sentences";

import { PronounceMyName } from "./pronounce/pronounce-my-name";
import { VerifiedIcon } from "./icons/verified-icon";
import { USERS } from "./data/user";

export async function ProfileHeader() {
    return (
        <div className="screen-line-after flex border-x border-edge">
            <div className="shrink-0 border-r border-edge">
                <div className="mx-0.5 my-[3px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        className="size-32 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40"
                        alt={`${(await USERS()).displayName}'s avatar`}
                        src={(await USERS()).avatar}
                        fetchPriority="high"
                    />
                </div>

                <SimpleTooltip content="I'm from India">
                    <svg
                        className="absolute top-0 -left-px h-8 sm:h-9"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="-45 -30 90 60"
                        fill="#07038D"
                    >
                        <title>Flag of India</title>
                        <path fill="#FFF" d="m-45-30h90v60h-90z" />
                        <path fill="#FF6820" d="m-45-30h90v20h-90z" />
                        <path fill="#046A38" d="m-45 10h90v20h-90z" />
                        <circle r="9.25" />
                        <circle fill="#FFF" r="8" />
                        <circle r="1.6" />
                        <g id="d">
                            <g id="c">
                                <g id="b">
                                    <g id="a">
                                        <path d="m0-8 .3 4.81409L0-.80235-.3-3.18591z" />
                                        <circle transform="rotate(7.5)" r="0.35" cy="-8" />
                                    </g>
                                    <use xlinkHref="#a" transform="scale(-1)" />
                                </g>
                                <use xlinkHref="#b" transform="rotate(15)" />
                            </g>
                            <use xlinkHref="#c" transform="rotate(30)" />
                        </g>
                        <use xlinkHref="#d" transform="rotate(60)" />
                        <use xlinkHref="#d" transform="rotate(120)" />
                    </svg>
                </SimpleTooltip>
            </div>

            <div className="flex flex-1 flex-col">
                <div
                    className={cn(
                        "flex grow items-end pb-1 pl-4",
                        "bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56"
                    )}
                >
                    <div className="line-clamp-1 font-mono text-xs text-zinc-300 select-none max-sm:hidden dark:text-zinc-800">
                        {"text-3xl "}
                        <span className="inline dark:hidden">text-zinc-950</span>
                        <span className="hidden dark:inline">text-zinc-50</span>
                        {" font-medium"}
                    </div>
                </div>

                <div className="border-t border-edge">
                    <h1 className="flex items-center pl-4 text-3xl font-semibold">
                        {(await USERS()).displayName}
                        &nbsp;
                        <SimpleTooltip content="Verified">
                            <VerifiedIcon className="size-[0.6em] translate-y-px text-info select-none" />
                        </SimpleTooltip>
                        {(await USERS()).namePronunciationUrl && (
                            <>
                                &nbsp;
                                <PronounceMyName
                                    className="translate-y-px"
                                    namePronunciationUrl={(await USERS()).namePronunciationUrl}
                                />
                            </>
                        )}
                    </h1>

                    <div className="h-12 border-t border-edge py-1 pl-4 sm:h-auto">
                        <FlipSentences sentences={(await USERS()).flipSentences} />
                    </div>
                </div>
            </div>
        </div>
    );
}