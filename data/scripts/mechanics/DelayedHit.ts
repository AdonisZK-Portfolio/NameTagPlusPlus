import { Entity, EntityDamageCause, system } from "@minecraft/server";

const scheduledHits = new Map<string, Set<string>>();

function getScheduledHitSet(scheduleId: string): Set<string> {
    const scheduledHitSet = scheduledHits.get(scheduleId);
    if (scheduledHitSet) return scheduledHitSet;

    const newScheduledHitSet = new Set<string>();
    scheduledHits.set(scheduleId, newScheduledHitSet);

    return newScheduledHitSet;
}

export function applyDelayedHit(victim: Entity, attacker: Entity, damage: number, delayTicks: number, hitCount: number, scheduleId: string): void {
    if (!victim?.isValid) return;
    if (!attacker?.isValid) return;

    const scheduledHitSet = getScheduledHitSet(scheduleId);
    if (scheduledHitSet.has(attacker.id)) return;

    scheduledHitSet.add(attacker.id);

    for (let hitIndex = 1; hitIndex <= hitCount; hitIndex++) {
        system.runTimeout(() => {
            if (!victim?.isValid || !attacker?.isValid) {
                scheduledHitSet.delete(attacker.id);
                return;
            }

            victim.applyDamage(damage, { damagingEntity: attacker, cause: EntityDamageCause.entityAttack });

            if (hitIndex === hitCount) {
                system.run(() => scheduledHitSet.delete(attacker.id));
            }
        }, delayTicks * hitIndex);
    }
}

export function isDelayedHitScheduled(attackerId: string, scheduleId: string): boolean {
    const scheduledHitSet = scheduledHits.get(scheduleId);
    if (!scheduledHitSet) return false;

    return scheduledHitSet.has(attackerId);
}
