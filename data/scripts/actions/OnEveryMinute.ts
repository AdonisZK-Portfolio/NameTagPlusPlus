import { applyAuraPulse } from "../mechanics/AuraEffects";
import { recordDebugCooldownPulse } from "../debug/RecordDebugCooldownPulse";

export function onEveryMinute(): void {
    recordDebugCooldownPulse("tide");
    applyAuraPulse();
}
