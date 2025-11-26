import { Panel, PanelContent } from "@/components/ui/panel";

import { USERS } from "./data/user";
import { ProfileCard } from "./components/profile-card";

async function NewProfileHeader() {
  const user = await USERS();

  return (
    <Panel id="profile">
      <PanelContent className="py-2 px-3 sm:py-3 sm:px-4">
        <ProfileCard user={user} />
      </PanelContent>
    </Panel>
  );
}

export default NewProfileHeader;
