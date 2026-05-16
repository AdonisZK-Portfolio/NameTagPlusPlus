import type { GuidebookPage } from "./GuidebookTypes";

export const GUIDEBOOK_PAGES: readonly GuidebookPage[] = [
    {
        id: "recipes",
        title: "Recipes And Progression",
        lines: [
            "§l§6Crafting§r",
            "§aGuidebook: §fBook + Name Tag.§r",
            "§bRare Name Tag: §f4 Rare Materials around a Name Tag.§r",
            "§5Epic Name Tag: §f4 Epic Materials around a Name Tag.§r",
            "§6Legendary Name Tag: §f4 Legendary Materials around a Name Tag.§r",
            "§cMythic Name Tag: §f4 Mythic Materials around a Name Tag.§r",
            "",
            "§l§bProgression§r",
            "§fBasic/Common §e> §bRare §e> §5Epic §e> §6Legendary §e> §cMythic§r",
            "§eDrops: §fMythic Materials come from Doom and Chaos.§r",
            "§eRule: §fhigher tier tags can use lower tier names. Lower tier tags cannot go upward.§r"
        ]
    }
];
