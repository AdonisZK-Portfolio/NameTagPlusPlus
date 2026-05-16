import { system, Player } from "@minecraft/server";
import { startGuidebookTutorial } from "../guidebook/StartGuidebookTutorial";

const GUIDEBOOK_TUTORIAL_SCRIPT_EVENT_ID = "ntpp:tutorial";

export function registerGuidebookTutorialScriptEvent(): void {
    system.afterEvents.scriptEventReceive.subscribe((event) => {
        if (event.id !== GUIDEBOOK_TUTORIAL_SCRIPT_EVENT_ID) return;

        const sourceEntity = event.sourceEntity;
        if (!sourceEntity?.isValid) return;
        if (!(sourceEntity instanceof Player)) return;

        startGuidebookTutorial(sourceEntity);
    });
}
