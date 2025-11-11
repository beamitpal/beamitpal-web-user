"use client";

import { CodeXmlIcon, EyeIcon, RepeatIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useState } from "react"; // Removed useMemo

import { cn } from "@/lib/utils";

import { CodeCollapsibleWrapper } from "./code-collapsible-wrapper";
import { OpenInV0Button } from "./open-in-v0";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { SimpleTooltip } from "./ui/tooltip";

type ComponentPreviewProps = React.ComponentProps<"div"> & {
  openInV0Url?: string;
  canReplay?: boolean;
  notProse?: boolean;
  codeCollapsible?: boolean;
};

export function ComponentPreview({
  className,
  openInV0Url,
  canReplay = false,
  notProse = true,
  codeCollapsible = false,
  children,
  ...props
}: ComponentPreviewProps) {

  const { resolvedTheme } = useTheme();

  const [replay, setReplay] = useState(0);


  const [Preview, Code] = React.Children.toArray(
    children
  ) as React.ReactElement[];



  return (
    <div className={cn("my-6", notProse && "not-prose", className)} {...props}>
      <Tabs defaultValue="preview" className="gap-4">
        <TabsList>
          <TabsTrigger className="px-2.5" value="preview">
            <EyeIcon />
            Preview
          </TabsTrigger>
          <TabsTrigger className="px-2.5" value="code">
            <CodeXmlIcon />
            Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <div
            data-slot="preview"
            className="rounded-lg border border-edge bg-zinc-950/0.75 bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center p-4 [--pattern-foreground:var(--color-zinc-950)]/5 dark:bg-white/0.75 dark:[--pattern-foreground:var(--color-white)]/5"
          >
            {(canReplay || openInV0Url) && (
              <div data-slot="buttons" className="mb-4 flex justify-end gap-2">
                {canReplay && (
                  <SimpleTooltip content="Replay">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setReplay((v) => v + 1)}
                    >
                      <RepeatIcon />
                    </Button>
                  </SimpleTooltip>
                )}

                {openInV0Url && <OpenInV0Button url={openInV0Url} />}
              </div>
            )}

            <div
              key={`${replay}-${resolvedTheme}`}
              className="flex min-h-80 items-center justify-center font-sans"
            >
              <React.Suspense
                fallback={
                  <div className="flex items-center justify-center text-sm text-muted-foreground">
                    Loading...
                  </div>
                }
              >
                {Preview}
              </React.Suspense>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="[&>figure]:m-0">
          {codeCollapsible ? (
            <CodeCollapsibleWrapper className="my-0">
              {Code}
            </CodeCollapsibleWrapper>
          ) : (
            Code
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}