import {
  BriefcaseIcon,
  CodeIcon,
  RocketIcon,
  TerminalIcon,
} from "lucide-react";
import { IntroItem } from "./intro-item";
import { addQueryParams } from "@/utils/url";
import { UTM_PARAMS } from "@/config/site/static";

function getJobIcon(title: string) {
  const lowerTitle = title.toLowerCase();

  if (
    lowerTitle.includes("engineer") ||
    lowerTitle.includes("developer") ||
    lowerTitle.includes("programmer")
  ) {
    return CodeIcon;
  }

  if (lowerTitle.includes("founder") || lowerTitle.includes("ceo")) {
    return RocketIcon;
  }

  if (
    lowerTitle.includes("devops") ||
    lowerTitle.includes("sre") ||
    lowerTitle.includes("infrastructure")
  ) {
    return TerminalIcon;
  }

  return BriefcaseIcon;
}

export function JobItem({
  title,
  company,
  website,
}: {
  title: string;
  company: string;
  website: string;
}) {
  return (
    <IntroItem
      icon={getJobIcon(title)}
      content={
        <>
          {title} @
          <a
            className="ml-0.5 font-medium underline-offset-4 hover:underline"
            href={addQueryParams(website, UTM_PARAMS)}
            target="_blank"
            rel="noopener"
          >
            {company}
          </a>
        </>
      }
    />
  );
}
