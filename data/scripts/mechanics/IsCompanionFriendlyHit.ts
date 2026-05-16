import type { Entity } from "@minecraft/server";

export function isCompanionFriendlyHit(attacker: Entity, victim: Entity): boolean {
    if (!attacker?.isValid || !victim?.isValid) return false;

    return attacker.hasTag("ntpp:companion") && victim.hasTag("ntpp:companion");
}
