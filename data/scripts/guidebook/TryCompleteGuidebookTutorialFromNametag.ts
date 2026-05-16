import type { Player } from "@minecraft/server";
import { normalizeNametagName } from "../nametag/NormalizeNametagName";
import { completeGuidebookTutorial } from "./CompleteGuidebookTutorial";
import { GUIDEBOOK_TUTORIAL_COMPLETE_TAG, GUIDEBOOK_TUTORIAL_STARTED_TAG, GUIDEBOOK_TUTORIAL_WOLF_READY_TAG } from "./GuidebookTutorialTags";

const BRAVE_NAMETAG_NAME = "brave";
const WOLF_TYPE_ID = "minecraft:wolf";

export function tryCompleteGuidebookTutorialFromNametag(player: Player, nametagName: string, targetTypeId: string): void {
    if (!player.isValid) return;
    if (player.hasTag(GUIDEBOOK_TUTORIAL_COMPLETE_TAG)) return;
    if (!player.hasTag(GUIDEBOOK_TUTORIAL_STARTED_TAG) && !player.hasTag(GUIDEBOOK_TUTORIAL_WOLF_READY_TAG)) return;
    if (targetTypeId !== WOLF_TYPE_ID) return;
    if (normalizeNametagName(nametagName) !== BRAVE_NAMETAG_NAME) return;

    completeGuidebookTutorial(player);
}
