import { ItemStack } from "@minecraft/server";
import type { Player } from "@minecraft/server";

function giveOrDropItem(player: Player, itemStack: ItemStack): void {
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

export function giveStarterKit(player: Player): void {
    giveOrDropItem(player, new ItemStack("ntpp:guidebook", 1));
    giveOrDropItem(player, new ItemStack("minecraft:name_tag", 1));
    giveOrDropItem(player, new ItemStack("minecraft:anvil", 1));

    if (!player.isValid) return;
    player.addLevels(1);
}
