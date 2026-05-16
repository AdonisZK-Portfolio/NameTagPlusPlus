import { Entity } from "@minecraft/server";
import { applyDelayedHit, isDelayedHitScheduled } from "./DelayedHit";

const TRIPLE_HIT_DELAY_TICKS = 8;
const TRIPLE_HIT_COUNT = 2;
const TRIPLE_HIT_SCHEDULE_ID = "tripleHit";

export function applyTripleHit(victim: Entity, attacker: Entity, damage: number): void {
    applyDelayedHit(victim, attacker, damage, TRIPLE_HIT_DELAY_TICKS, TRIPLE_HIT_COUNT, TRIPLE_HIT_SCHEDULE_ID);
}

export function isScheduledTripleHit(attackerId: string): boolean {
    return isDelayedHitScheduled(attackerId, TRIPLE_HIT_SCHEDULE_ID);
}
