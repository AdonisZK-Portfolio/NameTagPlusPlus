import { world } from "@minecraft/server";
import type { Player } from "@minecraft/server";
import { giveGuidebookItem } from "../guidebook/GiveGuidebookItem";
import { GUIDEBOOK_STARTER_KIT_TAG, GUIDEBOOK_TUTORIAL_COMPLETE_TAG, GUIDEBOOK_TUTORIAL_STARTED_TAG } from "../guidebook/GuidebookTutorialTags";
import { hasGuidebookItem } from "../guidebook/HasGuidebookItem";
import { startGuidebookTutorial } from "../guidebook/StartGuidebookTutorial";

function handleInitialSpawn(player: Player): void {
    if (player.hasTag(GUIDEBOOK_STARTER_KIT_TAG)) return;
    if (player.hasTag(GUIDEBOOK_TUTORIAL_STARTED_TAG)) return;
    if (player.hasTag(GUIDEBOOK_TUTORIAL_COMPLETE_TAG)) return;

    startGuidebookTutorial(player);
}

function handleRespawn(player: Player): void {
    if (hasGuidebookItem(player)) return;

    giveGuidebookItem(player);
}

export function registerGuidebookOnboarding(): void {
    world.afterEvents.playerSpawn.subscribe((event) => {
        const { player } = event;
        if (!player?.isValid) return;

        if (event.initialSpawn) {
            handleInitialSpawn(player);
            return;
        }

        handleRespawn(player);
    });
}
