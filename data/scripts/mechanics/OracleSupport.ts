import { Entity } from "@minecraft/server";
import { forEachTaggedEntity } from "../utils/forEachTaggedEntity";
import { addValidTargets } from "../utils/AddValidTargets";
import { spawnParticleRing } from "./SpawnParticleRing";

const ORACLE_HEAL_RADIUS = 10;
const ORACLE_HEAL_AMOUNT = 8;
const ORACLE_ABSORPTION_DURATION = 500;
const ORACLE_ABSORPTION_AMPLIFIER = 0;
const ORACLE_NEGATIVE_EFFECTS = ["poison", "wither", "slowness", "weakness"] as const;
const CHERRY_PARTICLE_ID = "minecraft:cherry_leaves_particle";
const CHERRY_PARTICLE_STEPS = 10;
const CHERRY_PARTICLE_RADIUS = 1.2;

function healEntity(entity: Entity): boolean {
    const health = entity.getComponent("health");
    if (!health) return false;

    const previous = health.currentValue;
    const next = Math.min(health.effectiveMax, previous + ORACLE_HEAL_AMOUNT);
    if (next <= previous) return false;

    health.setCurrentValue(next);

    for (const effect of ORACLE_NEGATIVE_EFFECTS) {
        if (entity.getEffect(effect)) {
            entity.removeEffect(effect);
            break;
        }
    }

    return true;
}

function spawnHealingParticles(entity: Entity): void {
    spawnParticleRing({
        entity,
        particleId: CHERRY_PARTICLE_ID,
        radii: [CHERRY_PARTICLE_RADIUS],
        steps: CHERRY_PARTICLE_STEPS,
        yOffset: 0.6
    });
}

function processHealableTarget(entity: Entity): boolean {
    if (!entity?.isValid) return false;

    const healed = healEntity(entity);
    if (!healed) return false;

    spawnHealingParticles(entity);
    return true;
}

function applyOraclePulse(oracle: Entity): void {
    let healedAny = false;
    const targetsById = new Map<string, Entity>();

    const nearbyPlayers = oracle.dimension.getPlayers({
        location: oracle.location,
        maxDistance: ORACLE_HEAL_RADIUS
    });

    for (const player of nearbyPlayers) {
        if (!player?.isValid) continue;
        player.addEffect("absorption", ORACLE_ABSORPTION_DURATION, {
            amplifier: ORACLE_ABSORPTION_AMPLIFIER,
            showParticles: false
        });
    }

    addValidTargets(targetsById, nearbyPlayers);
    addValidTargets(targetsById, oracle.dimension.getEntities({
        location: oracle.location,
        maxDistance: ORACLE_HEAL_RADIUS,
        tags: ["ntpp:companion"]
    }));

    for (const entity of targetsById.values()) {
        if (!entity?.isValid) continue;
        if (entity.id === oracle.id) continue;
        healedAny = processHealableTarget(entity) || healedAny;
    }

    if (healedAny) {
        spawnHealingParticles(oracle);
    }
}

export function applyOracleSupportPulse(): void {
    forEachTaggedEntity("ntpp:oracle", applyOraclePulse);
}
