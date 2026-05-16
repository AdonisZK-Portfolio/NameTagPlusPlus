import { Entity } from "@minecraft/server";
import { applyDelayedHit, isDelayedHitScheduled } from "./DelayedHit";

const DOUBLE_HIT_DELAY_TICKS = 10;
const DOUBLE_HIT_COUNT = 1;
const DOUBLE_HIT_SCHEDULE_ID = "doubleHit";

export function applyDoubleHit(victim: Entity, attacker: Entity, damage: number): void {
    applyDelayedHit(victim, attacker, damage, DOUBLE_HIT_DELAY_TICKS, DOUBLE_HIT_COUNT, DOUBLE_HIT_SCHEDULE_ID);
}

export function isScheduledSecondHit(attackerId: string): boolean {
    return isDelayedHitScheduled(attackerId, DOUBLE_HIT_SCHEDULE_ID);
}
