import { world } from "@minecraft/server";
import { GUIDEBOOK_TUTORIAL_COMPLETE_TAG, GUIDEBOOK_TUTORIAL_STARTED_TAG, GUIDEBOOK_TUTORIAL_WOLF_READY_TAG } from "./GuidebookTutorialTags";
import { prepareGuidebookTutorialWolf } from "./PrepareGuidebookTutorialWolf";
import { hasBraveNameTag } from "./HasBraveNameTag";
import { updateGuidebookTutorialActionBar } from "./GuidebookTutorialActionBar";

export function advanceGuidebookTutorial(): void {
    for (const player of world.getPlayers()) {
        if (!player.isValid) continue;

        updateGuidebookTutorialActionBar(player);

        if (!player.hasTag(GUIDEBOOK_TUTORIAL_STARTED_TAG)) continue;
        if (player.hasTag(GUIDEBOOK_TUTORIAL_COMPLETE_TAG)) continue;
        if (player.hasTag(GUIDEBOOK_TUTORIAL_WOLF_READY_TAG)) continue;
        if (!hasBraveNameTag(player)) continue;

        prepareGuidebookTutorialWolf(player);
    }
}
