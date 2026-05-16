import type { Player } from "@minecraft/server";
import { GUIDEBOOK_TUTORIAL_WOLF_READY_TAG } from "./GuidebookTutorialTags";
import { setGuidebookTutorialActionBar } from "./GuidebookTutorialActionBar";
import { spawnGuidebookWolf } from "./SpawnGuidebookWolf";

const GUIDEBOOK_TUTORIAL_STEP_TWO = "Step 2: Use the Brave Name Tag on the wolf.";

export function prepareGuidebookTutorialWolf(player: Player): void {
    if (!player.isValid) return;
    if (player.hasTag(GUIDEBOOK_TUTORIAL_WOLF_READY_TAG)) return;

    spawnGuidebookWolf(player);
    if (!player.isValid) return;

    player.addTag(GUIDEBOOK_TUTORIAL_WOLF_READY_TAG);
    setGuidebookTutorialActionBar(player, GUIDEBOOK_TUTORIAL_STEP_TWO);
    player.sendMessage("Name Tag++ Tutorial: Step 2, use the Brave Name Tag on the wolf.");
}
