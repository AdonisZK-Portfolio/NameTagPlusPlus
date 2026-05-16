import type { ItemStack, Player } from "@minecraft/server";

export function giveOrDropItem(player: Player, itemStack: ItemStack): void {
    if (!player.isValid) return;

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
