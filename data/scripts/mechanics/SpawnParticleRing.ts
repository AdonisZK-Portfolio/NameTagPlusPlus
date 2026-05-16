import { Entity } from "@minecraft/server";

export interface ParticleRingOptions {
    readonly entity: Entity;
    readonly particleId: string;
    readonly radii: readonly number[];
    readonly steps: number;
    readonly yOffset: number;
    readonly includeCenter?: boolean;
    readonly centerFirst?: boolean;
}

function spawnCenterParticle(entity: Entity, particleId: string, y: number): void {
    const { dimension, location } = entity;
    dimension.spawnParticle(particleId, { x: location.x, y, z: location.z });
}

export function spawnParticleRing(options: ParticleRingOptions): void {
    const { entity, particleId, radii, steps, yOffset, includeCenter, centerFirst } = options;
    if (!entity?.isValid) return;

    const { dimension, location } = entity;
    const y = location.y + yOffset;

    if (includeCenter && centerFirst) {
        spawnCenterParticle(entity, particleId, y);
    }

    for (let i = 0; i < steps; i++) {
        const angle = (i / steps) * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        for (const radius of radii) {
            dimension.spawnParticle(particleId, {
                x: location.x + cos * radius,
                y,
                z: location.z + sin * radius
            });
        }
    }

    if (includeCenter && !centerFirst) {
        spawnCenterParticle(entity, particleId, y);
    }
}
