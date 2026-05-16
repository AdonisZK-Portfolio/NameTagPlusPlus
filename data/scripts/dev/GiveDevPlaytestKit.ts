import type { Player } from "@minecraft/server";
import { buildDevPlaytestKit } from "./BuildDevPlaytestKit";
import { giveOrDropItem } from "./GiveOrDropItem";
import type { DevPlaytestKitType } from "./DevPlaytestKitTypes";

export function giveDevPlaytestKit(player: Player, tier: number, type: DevPlaytestKitType): boolean {
    if (!player.isValid) return false;

    const kit = buildDevPlaytestKit(tier, type);

    if (kit.items.length === 0) return false;

    for (const item of kit.items) {
        giveOrDropItem(player, item.itemStack);
    }

    return true;
}
