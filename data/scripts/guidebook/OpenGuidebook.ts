import type { Player } from "@minecraft/server";
import { showGuidebookMenu } from "./ShowGuidebookMenu";

export function openGuidebook(player: Player): void {
    showGuidebookMenu(player);
}
