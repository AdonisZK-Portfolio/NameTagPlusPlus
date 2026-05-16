import { Entity } from "@minecraft/server";
import { forEachTaggedEntity } from "../utils/forEachTaggedEntity";
import { spawnParticleRing } from "./SpawnParticleRing";

const BASTION_SELF_HEAL_AMOUNT = 8;
const BASTION_HEAL_PARTICLE = "minecraft:heart_particle";
const BASTION_HEAL_PARTICLE_STEPS = 8;
const BASTION_HEAL_PARTICLE_RADIUS = 0.9;

function pulseSelfHeal(bastion: Entity): void {
    if (!bastion?.isValid) return;

    const health = bastion.getComponent("health");
    if (!health) return;

    const previousHealth = health.currentValue;
    const nextHealth = Math.min(health.effectiveMax, health.currentValue + BASTION_SELF_HEAL_AMOUNT);
    if (nextHealth <= previousHealth) return;

    health.setCurrentValue(nextHealth);

    spawnParticleRing({
        entity: bastion,
        particleId: BASTION_HEAL_PARTICLE,
        radii: [BASTION_HEAL_PARTICLE_RADIUS],
        steps: BASTION_HEAL_PARTICLE_STEPS,
        yOffset: 1
    });
}

export function applyBastionSelfHealPulse(): void {
    forEachTaggedEntity("ntpp:bastion", pulseSelfHeal);
}
