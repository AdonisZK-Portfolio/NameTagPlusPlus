import { ItemStack } from "@minecraft/server";
import type { Player } from "@minecraft/server";

export function giveGuidebookItem(player: Player): void {
    if (!player.isValid) return;

    const itemStack = new ItemStack("ntpp:guidebook", 1);
    const container = player.getComponent("inventory")?.container;
    if (!container?.isValid) {
        player.dimension.spawnItem(itemStack, player.location);
        return;
    }

    const slot = container.firstEmptySlot();
    if (slot === undefined) {
        player.dimension.spawnItem(itemStack, player.location);
        return;
    }

    container.setItem(slot, itemStack);
}
