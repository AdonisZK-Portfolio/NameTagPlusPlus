import { Entity, EntityDamageCause } from "@minecraft/server";
import { getHorizontalKnockback } from "../../utils/GetHorizontalKnockback";
import { spawnParticleRing } from "../SpawnParticleRing";

const CHAOS_EXPLOSIVE_RADIUS = 14;
const CHAOS_EXPLOSIVE_DAMAGE = 8;
const CHAOS_EXPLOSIVE_KNOCKBACK_FORCE = 2.4;
const CHAOS_EXPLOSIVE_VERTICAL_FORCE = 0.7;
const CHAOS_EXPLOSIVE_PARTICLE = "minecraft:large_explosion";
const CHAOS_EXPLOSIVE_PARTICLE_STEPS = 16;

function spawnChaosExplosionParticles(chaos: Entity): void {
    spawnParticleRing({
        entity: chaos,
        particleId: CHAOS_EXPLOSIVE_PARTICLE,
        radii: [CHAOS_EXPLOSIVE_RADIUS, CHAOS_EXPLOSIVE_RADIUS * 0.5],
        steps: CHAOS_EXPLOSIVE_PARTICLE_STEPS,
        yOffset: 0.4,
        includeCenter: true,
        centerFirst: true
    });
}

export function applyChaosExplosiveAttack(chaos: Entity): void {
    if (!chaos?.isValid) return;

    spawnChaosExplosionParticles(chaos);

    const nearby = chaos.dimension.getEntities({
        location: chaos.location,
        maxDistance: CHAOS_EXPLOSIVE_RADIUS
    });

    for (const entity of nearby) {
        if (!chaos?.isValid) return;
        if (!entity?.isValid) continue;
        if (entity.id === chaos.id) continue;

        entity.applyDamage(CHAOS_EXPLOSIVE_DAMAGE, {
            damagingEntity: chaos,
            cause: EntityDamageCause.entityExplosion
        });

        if (!entity?.isValid) continue;

        entity.applyImpulse(getHorizontalKnockback(chaos.location, entity.location, CHAOS_EXPLOSIVE_KNOCKBACK_FORCE, CHAOS_EXPLOSIVE_VERTICAL_FORCE));
    }
}
