import { hasDebugPlayers } from "./HasDebugPlayers";
import { getDebugPlayers } from "./GetDebugPlayers";
import { formatDebugOverlay } from "./FormatDebugOverlay";

export function showDebugOverlay(): void {
    if (!hasDebugPlayers()) return;

    for (const player of getDebugPlayers()) {
        if (!player.isValid) continue;
        player.onScreenDisplay.setActionBar(formatDebugOverlay(player));
    }
}
