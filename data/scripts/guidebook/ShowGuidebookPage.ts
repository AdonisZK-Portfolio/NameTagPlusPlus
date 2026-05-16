import { ActionFormData } from "@minecraft/server-ui";
import type { Player } from "@minecraft/server";
import { getGuidebookPage } from "./GetGuidebookPage";
import { showGuidebookMenu } from "./ShowGuidebookMenu";
import type { GuidebookPageId } from "./GuidebookTypes";

export function showGuidebookPage(player: Player, pageId: GuidebookPageId): void {
    const guidebookPage = getGuidebookPage(pageId);
    if (!guidebookPage) return;

    const form = new ActionFormData().title(guidebookPage.title).body(guidebookPage.lines.join("\n\n")).button("Back To Menu");

    form.show(player).then(result => {
        if (result.canceled) return;

        const selection = result.selection;
        if (selection === undefined) return;

        if (selection === 0) {
            showGuidebookMenu(player);
        }
    }, () => {
        if (!player.isValid) return;

        player.sendMessage("Guidebook unavailable.");
    });
}
