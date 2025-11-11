import { Markdown } from "@/components/markdown";
import { Prose } from "@/components/ui/typography";


import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { USERS } from "./data/user";

export async function About() {
  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <Prose>
          <Markdown>{(await USERS()).about}</Markdown>
        </Prose>
      </PanelContent>
    </Panel>
  );
}