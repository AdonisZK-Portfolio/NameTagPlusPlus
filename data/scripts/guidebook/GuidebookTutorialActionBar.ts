import type { Player } from "@minecraft/server";

const ACTION_BAR_DURATION_SECONDS = 30;

interface GuidebookTutorialActionBarState {
    readonly message: string;
    remainingSeconds: number;
}

const actionBarStates = new Map<string, GuidebookTutorialActionBarState>();

export function setGuidebookTutorialActionBar(player: Player, message: string): void {
    if (!player.isValid) return;

    actionBarStates.set(player.id, {
        message,
        remainingSeconds: ACTION_BAR_DURATION_SECONDS
    });

    player.onScreenDisplay.setActionBar(message);
}

export function updateGuidebookTutorialActionBar(player: Player): void {
    if (!player.isValid) return;

    const state = actionBarStates.get(player.id);
    if (!state) return;

    player.onScreenDisplay.setActionBar(state.message);
    state.remainingSeconds -= 1;

    if (state.remainingSeconds > 0) return;

    actionBarStates.delete(player.id);
}
