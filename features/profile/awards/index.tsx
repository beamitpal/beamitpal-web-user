import dayjs from "dayjs";
import { CollapsibleList } from "@/components/ui/collapsible-list";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/ui/panel";
import { AwardItem } from "./award-item";
import { AWARDS } from "../data/awards";

const SORTED_AWARDS = [...AWARDS].sort((a, b) => {
  const aDate = dayjs(a.date);
  const bDate = dayjs(b.date);
  return bDate.isAfter(aDate) ? 1 : bDate.isBefore(aDate) ? -1 : 0;
});

export function Awards() {
  return (
    <Panel id="awards">
      <PanelHeader>
        <PanelTitle>
          Honors & Awards
          <sup className="ml-1 font-mono text-sm font-medium text-muted-foreground select-none">
            ({SORTED_AWARDS.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <PanelContent>
        <CollapsibleList
          items={SORTED_AWARDS}
          max={8}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <AwardItem award={item} />}
        />
      </PanelContent>
    </Panel>
  );
}
