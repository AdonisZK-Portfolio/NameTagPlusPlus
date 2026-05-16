import type { Player } from "@minecraft/server";

export function sendGuidebookPrompt(player: Player): void {
    if (!player.isValid) return;

    player.sendMessage("Name Tag++ Tutorial: Step 1, rename the Name Tag to Brave using the Anvil.");
}
