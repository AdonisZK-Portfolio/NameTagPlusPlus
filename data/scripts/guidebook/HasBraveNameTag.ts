import type { Player } from "@minecraft/server";
import { normalizeNametagName } from "../nametag/NormalizeNametagName";

const BRAVE_NAMETAG_NAME = "brave";

export function hasBraveNameTag(player: Player): boolean {
    if (!player.isValid) return false;

    const container = player.getComponent("inventory")?.container;
    if (!container?.isValid) return false;

    for (let slot = 0; slot < container.size; slot++) {
        const itemStack = container.getItem(slot);
        if (!itemStack) continue;
        if (itemStack.typeId !== "minecraft:name_tag") continue;

        const nameTag = itemStack.nameTag;
        if (!nameTag) continue;
        if (normalizeNametagName(nameTag) === BRAVE_NAMETAG_NAME) return true;
    }

    return false;
}
