import { applyBaneShockwaves } from "../mechanics/Shockwave";
import { applyTierFourBossAbilities } from "../mechanics/TierFourBossAbilities";
import { applyBastionSelfHealPulse } from "../mechanics/BastionTaunt";
import { recordDebugCooldownPulse } from "../debug/RecordDebugCooldownPulse";

export function onEveryThirtySeconds(): void {
    recordDebugCooldownPulse("bane");
    recordDebugCooldownPulse("boss");
    recordDebugCooldownPulse("bastion");
    applyBaneShockwaves();
    applyTierFourBossAbilities();
    applyBastionSelfHealPulse();
}
