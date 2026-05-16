import { Vector3 } from "@minecraft/server";
import { getHorizontalDistance } from "./GetHorizontalDistance";

export function getHorizontalKnockback(source: Vector3, target: Vector3, force: number, verticalForce: number): Vector3 {
    const dx = target.x - source.x;
    const dz = target.z - source.z;
    const distance = getHorizontalDistance(source, target);

    return {
        x: (dx / distance) * force,
        y: verticalForce,
        z: (dz / distance) * force
    };
}
