import { system } from "@minecraft/server";
import type { Entity } from "@minecraft/server";
import { formatDebugNumber } from "./FormatDebugNumber";
import { DEBUG_COOLDOWN_LAST_PULSE_TICK_BY_ID } from "./DebugCooldownState";
import { getDebugCooldownPulseForEntity } from "./GetDebugCooldownPulseForEntity";

export function getDebugCooldownTextForEntity(entity: Entity | undefined): string | undefined {
    if (!entity?.isValid) return undefined;

    const pulse = getDebugCooldownPulseForEntity(entity);
    if (!pulse) return undefined;

    const lastPulseTick = DEBUG_COOLDOWN_LAST_PULSE_TICK_BY_ID.get(pulse.id) ?? system.currentTick;
    const elapsedTicks = system.currentTick - lastPulseTick;
    const remainingTicks = Math.max(0, pulse.intervalTicks - elapsedTicks);
    const remainingSeconds = formatDebugNumber(remainingTicks / 20);

    return `cooldown ${pulse.label} ${remainingSeconds}s`;
}
