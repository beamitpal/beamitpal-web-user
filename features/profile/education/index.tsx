import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/ui/panel";
import {  WorkExperience } from "@/components/work-experience";
import { EDUCATION } from "../data/education";

export default function Education() {
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