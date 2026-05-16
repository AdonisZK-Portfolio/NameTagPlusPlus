import type { Player } from "@minecraft/server";
import { GUIDEBOOK_TUTORIAL_COMPLETE_TAG, GUIDEBOOK_TUTORIAL_STARTED_TAG, GUIDEBOOK_TUTORIAL_WOLF_READY_TAG } from "./GuidebookTutorialTags";
import { setGuidebookTutorialActionBar } from "./GuidebookTutorialActionBar";

const GUIDEBOOK_TUTORIAL_COMPLETE_MESSAGE = "Tutorial complete.";

export function completeGuidebookTutorial(player: Player): void {
    if (!player.isValid) return;

    player.removeTag(GUIDEBOOK_TUTORIAL_STARTED_TAG);
    player.removeTag(GUIDEBOOK_TUTORIAL_WOLF_READY_TAG);
    player.addTag(GUIDEBOOK_TUTORIAL_COMPLETE_TAG);
    setGuidebookTutorialActionBar(player, GUIDEBOOK_TUTORIAL_COMPLETE_MESSAGE);
    player.sendMessage("Name Tag++ tutorial complete.");
}
