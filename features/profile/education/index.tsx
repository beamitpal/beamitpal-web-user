import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/ui/panel";
import {  WorkExperience } from "@/components/work-experience";
import { getEducation } from "../data/education";

export const dynamic = "force-dynamic";

export default async function Education() {
    const EDUCATION = await getEducation();

    return (
        <>
            <Panel id="education">
                <PanelHeader>
                    <PanelTitle>Education</PanelTitle>
                </PanelHeader>

                <PanelContent>
                    <WorkExperience experiences={EDUCATION} />
                </PanelContent>
            </Panel>

        </>
    );
}