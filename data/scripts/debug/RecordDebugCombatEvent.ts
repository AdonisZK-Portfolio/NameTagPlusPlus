import type { EntityHurtAfterEvent } from "@minecraft/server";
import { getDebugEntityLabel } from "./GetDebugEntityLabel";
import { getDebugEntityHealthText } from "./GetDebugEntityHealthText";
import type { DebugCombatSnapshot } from "./DebugCombatState";

export function recordDebugCombatEvent(event: EntityHurtAfterEvent): DebugCombatSnapshot | undefined {
    const victim = event.hurtEntity;
    if (!victim?.isValid) {
        return undefined;
    }

    const damageSource = event.damageSource;
    if (!damageSource) {
        return undefined;
    }

    const cause = damageSource.cause;
    const rawAttacker = damageSource.damagingEntity;
    const attacker = rawAttacker?.isValid ? rawAttacker : undefined;
    const damage = event.damage;

    const attackerLabel = attacker ? getDebugEntityLabel(attacker) : "none";
    const victimLabel = getDebugEntityLabel(victim);
    const victimHealthText = getDebugEntityHealthText(victim);

    return {
        cause,
        damage,
        attacker,
        victim,
        attackerLabel,
        victimLabel,
        victimHealthText,
    };
}
