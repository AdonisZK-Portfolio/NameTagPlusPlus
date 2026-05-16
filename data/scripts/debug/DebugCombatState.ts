import type { Entity } from "@minecraft/server";

export interface DebugCombatSnapshot {
    readonly cause: string;
    readonly damage: number;
    readonly attacker?: Entity;
    readonly victim: Entity;
    readonly attackerLabel: string;
    readonly victimLabel: string;
    readonly victimHealthText: string;
}
