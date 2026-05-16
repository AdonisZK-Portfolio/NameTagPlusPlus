import { world } from "@minecraft/server";
import type { Player } from "@minecraft/server";
import { DEBUG_PLAYER_TAG } from "./DebugConfig";

export function getDebugPlayers(): Player[] {
    return world.getAllPlayers().filter((player) => player.isValid && player.hasTag(DEBUG_PLAYER_TAG));
}
