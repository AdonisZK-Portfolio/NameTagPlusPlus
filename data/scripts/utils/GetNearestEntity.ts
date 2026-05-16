import { Entity, Vector3 } from "@minecraft/server";

function getDistanceSquared(source: Vector3, target: Vector3): number {
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const dz = target.z - source.z;

    return dx * dx + dy * dy + dz * dz;
}

export function getNearestEntity(source: Vector3, entities: readonly Entity[]): Entity | undefined {
    let nearest: Entity | undefined;
    let nearestDistanceSq = Number.POSITIVE_INFINITY;

    for (const entity of entities) {
        if (!entity?.isValid) continue;

        const distanceSq = getDistanceSquared(source, entity.location);
        if (distanceSq >= nearestDistanceSq) continue;

        nearest = entity;
        nearestDistanceSq = distanceSq;
    }

    return nearest;
}
