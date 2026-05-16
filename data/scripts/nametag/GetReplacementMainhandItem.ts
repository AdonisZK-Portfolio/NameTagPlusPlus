import { ItemStack } from "@minecraft/server";
import type { NametagConfig, ReplacementState } from "./NameTagTypes";

const GILDED_NAME = "gilded";
const GILDED_MAINHAND_ITEM = "minecraft:golden_sword";

export function getReplacementMainhandItem(config: NametagConfig, state: ReplacementState): ItemStack | undefined {
    if (config.name === GILDED_NAME) return new ItemStack(GILDED_MAINHAND_ITEM);

    return state.mainhandItem;
}
