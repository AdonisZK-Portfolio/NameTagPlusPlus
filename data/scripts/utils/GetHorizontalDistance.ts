import { Vector3 } from "@minecraft/server";

export function getHorizontalDistance(source: Vector3, target: Vector3): number {
    const dx = target.x - source.x;
    const dz = target.z - source.z;

    return Math.sqrt(dx * dx + dz * dz) || 1;
}
