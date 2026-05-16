import { EntityDamageCause } from "@minecraft/server";
import type { EntityHurtAfterEvent } from "@minecraft/server";
import { isCompanionFriendlyHit } from "./IsCompanionFriendlyHit";

export function restoreCompanionFriendlyMeleeDamage(event: EntityHurtAfterEvent): boolean {
    if (event.damageSource.cause !== EntityDamageCause.entityAttack) return false;

    const attacker = event.damageSource.damagingEntity;
    const victim = event.hurtEntity;

    if (!attacker?.isValid || !victim?.isValid) return false;
    if (!isCompanionFriendlyHit(attacker, victim)) return false;

    const health = victim.getComponent("health");
    if (!health) return true;

    health.setCurrentValue(Math.min(health.effectiveMax, health.currentValue + event.damage));
    return true;
}
