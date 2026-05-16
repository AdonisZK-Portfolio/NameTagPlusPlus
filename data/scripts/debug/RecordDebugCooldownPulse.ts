import { system } from "@minecraft/server";
import { DEBUG_COOLDOWN_LAST_PULSE_TICK_BY_ID } from "./DebugCooldownState";

export function recordDebugCooldownPulse(pulseId: string): void {
    DEBUG_COOLDOWN_LAST_PULSE_TICK_BY_ID.set(pulseId, system.currentTick);
}
