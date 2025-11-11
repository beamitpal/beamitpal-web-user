import "server-only";
import { GlobeIcon, MapPinIcon, MarsIcon, VenusIcon } from "lucide-react";

import type { User as UserType } from "@/features/profile/types/types";
import { USERS } from "@/features/profile/data/user"; 
import { urlToName } from "@/utils/url";

import { Panel, PanelContent } from "@/components/ui/panel";
import { EmailItem } from "./email-item";
import { IntroItem } from "./intro-item";
import { JobItem } from "./job-item";
import { PhoneItem } from "./phone-item";

export async function Overview() {
  const user = await USERS(); 

  return (
    <Panel>
      <h2 className="sr-only">Overview</h2>

      <PanelContent className="space-y-2">
        {user.jobs.map((job: UserType["jobs"][number], index: number) => {
          return (
            <JobItem
              key={index}
              title={job.title}
              company={job.company}
              website={job.website}
            />
          );
        })}

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
      </PanelContent>
    </Panel>
  );
}
