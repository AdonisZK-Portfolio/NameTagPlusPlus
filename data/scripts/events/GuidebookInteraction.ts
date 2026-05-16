import { world } from "@minecraft/server";
import { openGuidebook } from "../guidebook/OpenGuidebook";

export function registerGuidebookInteraction(): void {
    world.afterEvents.itemUse.subscribe((event) => {
        const { source: player, itemStack } = event;
        if (!player?.isValid) return;
        if (!itemStack) return;
        if (itemStack.typeId !== "ntpp:guidebook") return;

        openGuidebook(player);
    });
}
