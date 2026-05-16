import { Entity } from "@minecraft/server";

const CHAOS_AURA_RADIUS = 10;
const CHAOS_AURA_DURATION = 200;
const CHAOS_AURA_AMPLIFIER = 1;

export function applyChaosAura(chaos: Entity): void {
    if (!chaos?.isValid) return;

    const nearby = chaos.dimension.getEntities({
        location: chaos.location,
        maxDistance: CHAOS_AURA_RADIUS
    });

    for (const entity of nearby) {
        if (!chaos?.isValid) return;
        if (!entity?.isValid) continue;
        if (entity.id === chaos.id) continue;

        entity.addEffect("wither", CHAOS_AURA_DURATION, {
            amplifier: CHAOS_AURA_AMPLIFIER,
            showParticles: true
        });
    }
}
