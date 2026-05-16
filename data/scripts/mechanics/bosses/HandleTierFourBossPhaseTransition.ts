import { Entity } from "@minecraft/server";
import { spawnEntitiesAroundTarget } from "./SpawnEntitiesAroundTarget";

const PHASE_TWO_EFFECT_DURATION = 20000000;

function triggerDoomPhaseTwo(doom: Entity): void {
    if (!doom?.isValid) return;
    if (doom.hasTag("ntpp:phase2")) return;

    const health = doom.getComponent("health");
    if (!health) return;
    if (health.currentValue > 1) return;

    doom.addTag("ntpp:phase2");
    health.setCurrentValue(health.effectiveMax);
    doom.addEffect("speed", PHASE_TWO_EFFECT_DURATION, { amplifier: 1, showParticles: false });
    doom.addEffect("resistance", PHASE_TWO_EFFECT_DURATION, { amplifier: 1, showParticles: false });

    spawnEntitiesAroundTarget(doom, "ntpp:risen_zombie", 4, 4);
}

function triggerChaosPhaseTwo(chaos: Entity): void {
    if (!chaos?.isValid) return;
    if (chaos.hasTag("ntpp:phase2")) return;

    const health = chaos.getComponent("health");
    if (!health) return;
    if (health.currentValue > 1) return;

    chaos.addTag("ntpp:phase2");
    health.setCurrentValue(health.effectiveMax);
    chaos.addEffect("resistance", PHASE_TWO_EFFECT_DURATION, { amplifier: 1, showParticles: false });

    spawnEntitiesAroundTarget(chaos, "ntpp:grim_wither_skeleton", 2, 3);
}

export function handleTierFourBossPhaseTransition(entity: Entity): void {
    if (!entity?.isValid) return;

    if (entity.hasTag("ntpp:doom")) {
        triggerDoomPhaseTwo(entity);
        return;
    }

    if (entity.hasTag("ntpp:chaos")) {
        triggerChaosPhaseTwo(entity);
    }
}
