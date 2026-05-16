import type { Player } from "@minecraft/server";
import { giveStarterKit } from "./GiveStarterKit";
import { GUIDEBOOK_STARTER_KIT_TAG, GUIDEBOOK_TUTORIAL_COMPLETE_TAG, GUIDEBOOK_TUTORIAL_STARTED_TAG, GUIDEBOOK_TUTORIAL_WOLF_READY_TAG } from "./GuidebookTutorialTags";
import { setGuidebookTutorialActionBar } from "./GuidebookTutorialActionBar";
import { sendGuidebookPrompt } from "./SendGuidebookPrompt";

const GUIDEBOOK_TUTORIAL_STEP_ONE = "Step 1: Rename the Name Tag to Brave using the Anvil.";

export function startGuidebookTutorial(player: Player): void {
    if (!player.isValid) return;

    player.removeTag(GUIDEBOOK_STARTER_KIT_TAG);
    player.removeTag(GUIDEBOOK_TUTORIAL_COMPLETE_TAG);
    player.removeTag(GUIDEBOOK_TUTORIAL_WOLF_READY_TAG);
    player.addTag(GUIDEBOOK_STARTER_KIT_TAG);
    player.addTag(GUIDEBOOK_TUTORIAL_STARTED_TAG);
    giveStarterKit(player);
    sendGuidebookPrompt(player);
    setGuidebookTutorialActionBar(player, GUIDEBOOK_TUTORIAL_STEP_ONE);
}
