import type { Entity, Player } from "@minecraft/server";
import { DEBUG_OVERLAY_MAX_DISTANCE } from "./DebugConfig";

export function getDebugTarget(player: Player): Entity | undefined {
    if (!player.isValid) return undefined;

    const hitResults = player.getEntitiesFromViewDirection({ maxDistance: DEBUG_OVERLAY_MAX_DISTANCE });
    const hit = hitResults.find(r => r.entity?.isValid);
    return hit?.entity;
}
