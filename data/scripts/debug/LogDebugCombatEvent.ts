import type { EntityHurtAfterEvent } from "@minecraft/server";
import { hasDebugPlayers } from "./HasDebugPlayers";
import { getDebugPlayers } from "./GetDebugPlayers";
import { recordDebugCombatEvent } from "./RecordDebugCombatEvent";
import { formatDebugCombatEvent } from "./FormatDebugCombatEvent";

export function logDebugCombatEvent(event: EntityHurtAfterEvent): void {
    if (!hasDebugPlayers()) return;

    const snapshot = recordDebugCombatEvent(event);
    if (!snapshot) return;

    const line = formatDebugCombatEvent(snapshot);

    const players = getDebugPlayers();
    for (const player of players) {
        if (!player.isValid) continue;
        player.sendMessage(line);
    }
}
