import type { Player } from "@minecraft/server";
import { DEBUG_NO_TARGET_TEXT } from "./DebugConfig";
import { getDebugTarget } from "./GetDebugTarget";
import { getDebugEntityLabel } from "./GetDebugEntityLabel";
import { getDebugEntityHealthText } from "./GetDebugEntityHealthText";
import { getDebugCooldownTextForEntity } from "./GetDebugCooldownTextForEntity";

export function formatDebugOverlay(player: Player): string {
    const target = getDebugTarget(player);
    if (!target) return DEBUG_NO_TARGET_TEXT;

    const label = getDebugEntityLabel(target);
    const healthText = getDebugEntityHealthText(target);
    const cooldownText = getDebugCooldownTextForEntity(target);

    if (cooldownText) {
        return `DBG ${label} | ${healthText} | ${cooldownText}`;
    }

    return `DBG ${label} | ${healthText}`;
}
