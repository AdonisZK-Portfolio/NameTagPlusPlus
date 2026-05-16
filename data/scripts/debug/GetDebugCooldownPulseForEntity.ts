import type { Entity } from "@minecraft/server";
import { DEBUG_COOLDOWN_PULSES } from "./DebugCooldownState";

export function getDebugCooldownPulseForEntity(entity: Entity): (typeof DEBUG_COOLDOWN_PULSES)[number] | undefined {
    if (entity.hasTag("ntpp:oracle")) return DEBUG_COOLDOWN_PULSES[0];
    if (entity.hasTag("ntpp:bane")) return DEBUG_COOLDOWN_PULSES[1];
    if (entity.hasTag("ntpp:bastion")) return DEBUG_COOLDOWN_PULSES[2];
    if (entity.hasTag("ntpp:doom") || entity.hasTag("ntpp:chaos")) return DEBUG_COOLDOWN_PULSES[3];
    if (entity.hasTag("ntpp:tide")) return DEBUG_COOLDOWN_PULSES[4];

    return undefined;
}
