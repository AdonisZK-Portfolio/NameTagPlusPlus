import { applyOracleSupportPulse } from "../mechanics/OracleSupport";
import { recordDebugCooldownPulse } from "../debug/RecordDebugCooldownPulse";

export function onEveryTwentySeconds(): void {
    recordDebugCooldownPulse("oracle");
    applyOracleSupportPulse();
}
