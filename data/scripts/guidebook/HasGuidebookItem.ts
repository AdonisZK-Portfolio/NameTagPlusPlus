import type { Player } from "@minecraft/server";

export function hasGuidebookItem(player: Player): boolean {
    if (!player.isValid) return false;

    const container = player.getComponent("inventory")?.container;
    if (!container?.isValid) return false;

    for (let slot = 0; slot < container.size; slot++) {
        const itemStack = container.getItem(slot);
        if (itemStack?.typeId === "ntpp:guidebook") return true;
    }

    return false;
}
