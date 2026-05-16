import { system } from "@minecraft/server";

export interface DebugCooldownPulse {
    readonly id: string;
    readonly label: string;
    readonly intervalTicks: number;
}

const initialTick = system.currentTick;

export const DEBUG_COOLDOWN_PULSES: readonly DebugCooldownPulse[] = [
    { id: "oracle", label: "support", intervalTicks: 400 },
    { id: "bane", label: "shock", intervalTicks: 600 },
    { id: "bastion", label: "heal", intervalTicks: 600 },
    { id: "boss", label: "boss", intervalTicks: 600 },
    { id: "tide", label: "regen", intervalTicks: 1200 }
];

export const DEBUG_COOLDOWN_LAST_PULSE_TICK_BY_ID: Map<string, number> = new Map(
    DEBUG_COOLDOWN_PULSES.map(pulse => [pulse.id, initialTick])
);
