import type { DebugCombatSnapshot } from "./DebugCombatState";
import { formatDebugNumber } from "./FormatDebugNumber";

export function formatDebugCombatEvent(snapshot: DebugCombatSnapshot): string {
    const damageText = formatDebugNumber(snapshot.damage);
    const healthText = snapshot.victimHealthText.replace(/^HP /, "").toLowerCase();
    const hpSegment = healthText === "n/a" ? "n/a" : healthText;

    return `DBG HIT ${snapshot.cause} ${snapshot.attackerLabel} -> ${snapshot.victimLabel} dmg ${damageText} hp ${hpSegment}`;
}
