import { world, system, EntityDamageCause } from "@minecraft/server";
import type { EntityHurtAfterEvent } from "@minecraft/server";
import { getEntityEffects } from "../effectsHandler";
import { applyDoubleHit, isScheduledSecondHit } from "../mechanics/DoubleHit";
import { applyTripleHit, isScheduledTripleHit } from "../mechanics/TripleHit";
import { checkGildedEnrage } from "../mechanics/GildedEnrage";
import { applyGildedGoldArmorDamage } from "../mechanics/ApplyGildedGoldArmorDamage";
import { isCompanionFriendlyHit } from "../mechanics/IsCompanionFriendlyHit";
import { restoreCompanionFriendlyMeleeDamage } from "../mechanics/RestoreCompanionFriendlyMeleeDamage";
import { handleTierFourBossPhaseTransition } from "../mechanics/TierFourBossPhases";
import { logDebugCombatEvent } from "../debug/LogDebugCombatEvent";

const applyingDamageBoost = new Set<string>();

function applyPlayerOnHitDebuffs(attackerEffects: ReturnType<typeof getEntityEffects>, victimTypeId: string, victim: import("@minecraft/server").Entity): void {
    if (!attackerEffects) return;
    if (victimTypeId !== "minecraft:player") return;

    if (attackerEffects.poisonOnHit) {
        victim.addEffect("poison", 100, { amplifier: 0, showParticles: true });
    }

    if (attackerEffects.blindnessOnHit) {
        victim.addEffect("blindness", 60, { amplifier: 0, showParticles: true });
    }
}

export function registerOnEntityHurt(): void {
    world.afterEvents.projectileHitEntity.subscribe((event) => {
        const shooter = event.source;
        const victim = event.getEntityHit().entity;

        if (!shooter?.isValid || !victim?.isValid) return;
        if (isCompanionFriendlyHit(shooter, victim)) return;

        const shooterEffects = getEntityEffects(shooter);
        if (!shooterEffects?.witherOnHit) return;

        victim.addEffect("wither", 200, { amplifier: shooterEffects.witherAmplifier, showParticles: true });
    });

    world.afterEvents.entityHurt.subscribe((event: EntityHurtAfterEvent) => {
        logDebugCombatEvent(event);

        const attacker = event.damageSource.damagingEntity;
        const victim = event.hurtEntity;

        if (!attacker?.isValid || !victim?.isValid) return;
        if (restoreCompanionFriendlyMeleeDamage(event)) return;
        if (isScheduledSecondHit(attacker.id)) return;
        if (isScheduledTripleHit(attacker.id)) return;
        if (applyingDamageBoost.has(`${attacker.id}:${victim.id}`)) return;

        if (victim.hasTag("ntpp:gilded")) {
            checkGildedEnrage(victim);
        }

        handleTierFourBossPhaseTransition(victim);
        applyGildedGoldArmorDamage(attacker, victim);

        const attackerEffects = getEntityEffects(attacker);
        if (!attackerEffects) return;

        if (attackerEffects.damageBoost > 0) {
            const boostKey = `${attacker.id}:${victim.id}`;
            applyingDamageBoost.add(boostKey);
            victim.applyDamage(attackerEffects.damageBoost, { damagingEntity: attacker, cause: EntityDamageCause.entityAttack });
            system.run(() => applyingDamageBoost.delete(boostKey));
        }

        if (attackerEffects.doubleHit) {
            applyDoubleHit(victim, attacker, event.damage);
        }

        if (attackerEffects.tripleHit) {
            applyTripleHit(victim, attacker, event.damage);
        }

        if (attackerEffects.witherOnHit) {
            victim.addEffect("wither", 200, { amplifier: attackerEffects.witherAmplifier, showParticles: true });
        }

        if (attackerEffects.lightningOnHit) {
            attacker.dimension.spawnEntity("minecraft:lightning_bolt", victim.location);
        }

        if (attackerEffects.lifestealPercent > 0) {
            const attackerHealth = attacker.getComponent("health");
            if (attackerHealth) {
                const healed = event.damage * attackerEffects.lifestealPercent;
                const newHealth = Math.min(attackerHealth.effectiveMax, attackerHealth.currentValue + healed);
                attackerHealth.setCurrentValue(newHealth);
            }
        }

        applyPlayerOnHitDebuffs(attackerEffects, victim.typeId, victim);
    });
}
