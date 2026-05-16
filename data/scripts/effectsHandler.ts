import { world, Entity } from "@minecraft/server";

interface EntityEffects {
    damageBoost: number;
    healthBoost: number;
    speedMultiplier: number;
    regenPerSeconds: number;
    resistanceAmplifier: number;
    fireImmune: boolean;
    lootingLevel: number;
    poisonOnHit: boolean;
    blindnessOnHit: boolean;
    doubleHit: boolean;
    tripleHit: boolean;
    lifestealPercent: number;
    lightningOnHit: boolean;
    witherOnHit: boolean;
    witherAmplifier: number;
}

const ENTITY_EFFECTS = new Map<string, EntityEffects>();

export function removeEntityEffects(entityId: string): void {
    ENTITY_EFFECTS.delete(entityId);
}

export function setEntityEffects(entity: Entity, effects: Partial<EntityEffects>): void {
    if (!entity?.isValid) return;

    const currentEffects: EntityEffects = ENTITY_EFFECTS.get(entity.id) ?? {
        damageBoost: 0,
        healthBoost: 0,
        speedMultiplier: 0,
        regenPerSeconds: 0,
        resistanceAmplifier: -1,
        fireImmune: false,
        lootingLevel: 0,
        poisonOnHit: false,
        blindnessOnHit: false,
        doubleHit: false,
        tripleHit: false,
        lifestealPercent: 0,
        lightningOnHit: false,
        witherOnHit: false,
        witherAmplifier: 0
    };

    const updatedEffects = { ...currentEffects, ...effects };
    ENTITY_EFFECTS.set(entity.id, updatedEffects);

    applyHealthBoost(entity, updatedEffects.healthBoost);
    applySpeedMultiplier(entity, updatedEffects.speedMultiplier);
}

export function getEntityEffects(entity: Entity): EntityEffects | undefined {
    if (!entity?.isValid) return undefined;
    return ENTITY_EFFECTS.get(entity.id);
}

function applyHealthBoost(entity: Entity, healthBoost: number): void {
    if (healthBoost <= 0) return;

    const health = entity.getComponent("health");
    if (!health) return;

    if (entity.typeId.startsWith("ntpp:")) {
        health.resetToMaxValue();
        return;
    }

    entity.addEffect("health_boost", 999999, {
        amplifier: Math.floor(healthBoost / 4),
        showParticles: false
    });
    health.setCurrentValue(health.effectiveMax);
}

function applySpeedMultiplier(entity: Entity, speedMultiplier: number): void {
    if (speedMultiplier <= 0) return;

    const movement = entity.getComponent("movement");
    if (movement) {
        movement.setCurrentValue(movement.defaultValue * speedMultiplier);
    }

    const lavaMovement = entity.getComponent("lava_movement");
    if (lavaMovement) {
        lavaMovement.setCurrentValue(lavaMovement.defaultValue * speedMultiplier);
    }
}

export function updateTransformedMobEffects(): void {
    for (const [entityId, effects] of ENTITY_EFFECTS) {
        if (
            effects.regenPerSeconds <= 0 &&
            !effects.fireImmune &&
            effects.healthBoost <= 0 &&
            effects.resistanceAmplifier < 0
        ) continue;

        const entity = world.getEntity(entityId);

        if (!entity?.isValid) {
            ENTITY_EFFECTS.delete(entityId);
            continue;
        }

        if (effects.healthBoost > 0 && !entity.typeId.startsWith("ntpp:")) {
            if (!entity.getEffect("health_boost")) {
                entity.addEffect("health_boost", 999999, {
                    amplifier: Math.floor(effects.healthBoost / 4),
                    showParticles: false
                });
            }
        }

        if (effects.regenPerSeconds > 0) {
            const health = entity.getComponent("health");
            if (health) {
                const newHealth = Math.min(
                    health.effectiveMax,
                    health.currentValue + effects.regenPerSeconds
                );
                health.setCurrentValue(newHealth);
            }
        }

        if (effects.fireImmune) {
            entity.extinguishFire(false);
        }

        if (effects.resistanceAmplifier >= 0) {
            entity.addEffect("resistance", 200, {
                amplifier: effects.resistanceAmplifier,
                showParticles: false
            });
        }
    }
}
