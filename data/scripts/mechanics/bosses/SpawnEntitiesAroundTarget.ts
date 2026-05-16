import { Entity } from "@minecraft/server";
import { chooseRandomPlayer } from "./ChooseRandomPlayer";

export function spawnEntitiesAroundTarget(source: Entity, entityType: string, count: number, radius: number): void {
    if (!source?.isValid) return;

    const targetPlayer = chooseRandomPlayer(source);
    if (!targetPlayer?.isValid) return;

    const center = targetPlayer.location;

    for (let i = 0; i < count; i++) {
        if (!source?.isValid) return;

        const angle = (i / count) * Math.PI * 2;
        const location = {
            x: center.x + Math.cos(angle) * radius,
            y: center.y,
            z: center.z + Math.sin(angle) * radius
        };

        source.dimension.spawnEntity(entityType, location);
    }
}
