import { Entity, EntityDamageCause } from "@minecraft/server";
import { forEachTaggedEntity } from "../utils/forEachTaggedEntity";
import { getHorizontalKnockback } from "../utils/GetHorizontalKnockback";
import { spawnParticleRing } from "./SpawnParticleRing";

const SHOCKWAVE_RADIUS = 10;
const SHOCKWAVE_DAMAGE = 5;
const RING_PARTICLE = "minecraft:large_explosion";
const RING_STEPS = 12;

function spawnShockwaveRing(entity: Entity): void {
    spawnParticleRing({
        entity,
        particleId: RING_PARTICLE,
        radii: [SHOCKWAVE_RADIUS, SHOCKWAVE_RADIUS * 0.5],
        steps: RING_STEPS,
        yOffset: 0.1,
        includeCenter: true
    });
}

export function fireShockwave(bane: Entity): void {
    spawnShockwaveRing(bane);

    const nearbyEntities = bane.dimension.getEntities({
        location: bane.location,
        maxDistance: SHOCKWAVE_RADIUS
    });

    for (const entity of nearbyEntities) {
        if (!entity?.isValid) continue;
        if (entity.id === bane.id) continue;

        entity.applyDamage(SHOCKWAVE_DAMAGE, {
            damagingEntity: bane,
            cause: EntityDamageCause.entityAttack
        });

        if (!entity.isValid) continue;

        entity.applyImpulse(getHorizontalKnockback(bane.location, entity.location, 2.0, 0.5));
    }
}

export function applyBaneShockwaves(): void {
    forEachTaggedEntity("ntpp:bane", fireShockwave);
}
