import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { WorkExperience } from "@/components/work-experience";
import { WORK_EXPERIENCE } from "../data/experience";

export default function Experience() {
    return (
        <>
            <Panel id="experience">
                <PanelHeader>
                    <PanelTitle>Experience</PanelTitle>
                </PanelHeader>

                <PanelContent>
                    <WorkExperience experiences={WORK_EXPERIENCE} />
                </PanelContent>
            </Panel>

        </>
    );
}