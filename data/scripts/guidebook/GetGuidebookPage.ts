import { GUIDEBOOK_PAGES } from "./GuidebookPages";
import { formatGuideEntry } from "./FormatGuideEntry";
import { getTierGuideEntries } from "./GetTierGuideEntries";
import type { GuidebookPage, GuidebookPageId, GuidebookTierPageData } from "./GuidebookTypes";

const TIER_PAGES: readonly GuidebookTierPageData[] = [
    { id: "tier-1", title: "Basic Names", tier: 1, rarity: "Basic/Common", color: "§f", requiredTag: "Name Tag or higher" },
    { id: "tier-2", title: "Rare Names", tier: 2, rarity: "Rare", color: "§b", requiredTag: "Rare Name Tag or higher" },
    { id: "tier-3", title: "Epic Names", tier: 3, rarity: "Epic", color: "§5", requiredTag: "Epic Name Tag or higher" },
    { id: "tier-4", title: "Legendary Names", tier: 4, rarity: "Legendary", color: "§6", requiredTag: "Legendary Name Tag or higher" },
    { id: "tier-5", title: "Mythic Names", tier: 5, rarity: "Mythic", color: "§c", requiredTag: "Mythic Name Tag" }
];

function getStaticGuidebookPage(pageId: GuidebookPageId): GuidebookPage | undefined {
    return GUIDEBOOK_PAGES.find(page => page.id === pageId);
}

function getTierGuidebookPage(pageId: GuidebookPageId): GuidebookPage | undefined {
    const tierPage = TIER_PAGES.find(page => page.id === pageId);
    if (!tierPage) return undefined;

    return {
        id: tierPage.id,
        title: tierPage.title,
        lines: [
            `${tierPage.color}§l${tierPage.rarity} Tier§r`,
            `§eRequired tag: §f${tierPage.requiredTag}§r`,
            ...getTierGuideEntries(tierPage.tier).map(entry => formatGuideEntry(entry, tierPage.color))
        ]
    };
}

export function getGuidebookPage(pageId: GuidebookPageId): GuidebookPage | undefined {
    return getStaticGuidebookPage(pageId) ?? getTierGuidebookPage(pageId);
}
