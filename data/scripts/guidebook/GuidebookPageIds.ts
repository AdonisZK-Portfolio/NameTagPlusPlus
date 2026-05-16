import type { GuidebookPageId } from "./GuidebookTypes";

export interface GuidebookMenuPage {
    readonly id: GuidebookPageId;
    readonly title: string;
    readonly iconPath: string;
}

export const GUIDEBOOK_MENU_PAGES: readonly GuidebookMenuPage[] = [
    { id: "recipes", title: "Recipes And Progression", iconPath: "textures/items/book_written" },
    { id: "tier-1", title: "Basic Names", iconPath: "textures/items/name_tag" },
    { id: "tier-2", title: "Rare Names", iconPath: "textures/items/spawn_eggs/spawn_egg_wolf" },
    { id: "tier-3", title: "Epic Names", iconPath: "textures/items/diamond_sword" },
    { id: "tier-4", title: "Legendary Names", iconPath: "textures/items/nether_star" },
    { id: "tier-5", title: "Mythic Names", iconPath: "textures/items/spawn_eggs/spawn_egg_wither" }
] as const;
