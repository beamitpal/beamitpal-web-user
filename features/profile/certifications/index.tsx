import { CollapsibleList } from "@/components/ui/collapsible-list";
import { CERTIFICATIONS } from "../data/certifications";
import { Panel, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { CertificationItem } from "./certificate-item";

export function Certifications() {
  const sortedCerts = [...CERTIFICATIONS].sort(
    (a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
  );

  return (
    <Panel id="certs">
      <PanelHeader>
        <PanelTitle>
          Certifications
          <sup className="ml-1 font-mono text-sm font-medium text-muted-foreground select-none">
            ({sortedCerts.length})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={sortedCerts}
        max={8}
        renderItem={(item) => <CertificationItem certification={item} />}
      />
    </Panel>
  );
}
