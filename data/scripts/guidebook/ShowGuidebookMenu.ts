import { ActionFormData } from "@minecraft/server-ui";
import type { Player } from "@minecraft/server";
import { GUIDEBOOK_HOME_LINES } from "./GuidebookHome";
import { GUIDEBOOK_MENU_PAGES } from "./GuidebookPageIds";
import { showGuidebookPage } from "./ShowGuidebookPage";

export function showGuidebookMenu(player: Player): void {
    const form = new ActionFormData().title("Name Tag++ Guidebook").body(GUIDEBOOK_HOME_LINES.join("\n"));

    for (const page of GUIDEBOOK_MENU_PAGES) {
        form.button(page.title, page.iconPath);
    }

    form.show(player).then(result => {
        if (result.canceled) return;

        const selection = result.selection;
        if (selection === undefined) return;

        const page = GUIDEBOOK_MENU_PAGES[selection];
        if (!page) return;

        showGuidebookPage(player, page.id);
    }, () => {
        if (!player.isValid) return;

        player.sendMessage("Guidebook unavailable.");
    });
}
