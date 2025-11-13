import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/ui/panel";
import { WorkExperience } from "@/components/work-experience";
import { getWorkExperience } from "../data/experience";

export const dynamic = "force-dynamic";

export default async function Experience() {
    const WORK_EXPERIENCE = await getWorkExperience();

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