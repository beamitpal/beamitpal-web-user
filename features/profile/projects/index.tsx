import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { ProjectItem } from "./project-item";
import { PROJECTS } from "../data/projects";
import { CollapsibleList } from "@/components/ui/collapsible-list";

export function Projects() {

  const sortedProjects = [...PROJECTS].sort((a, b) => {
    const aId = parseInt(a.id ?? "0", 10);
    const bId = parseInt(b.id ?? "0", 10);
    if (!isNaN(aId) && !isNaN(bId)) return bId - aId;
    return String(b.id ?? "").localeCompare(String(a.id ?? ""));
  });

  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          Projects
          <sup className="ml-1 font-mono text-sm text-muted-foreground select-none">
            ({sortedProjects.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={sortedProjects}
        max={4}
        renderItem={(item) => <ProjectItem project={item} />}
      />
    </Panel>
  );
}
