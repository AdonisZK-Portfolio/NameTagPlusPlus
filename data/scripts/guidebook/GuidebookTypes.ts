export const GUIDEBOOK_PAGE_IDS = [
    "tier-1",
    "tier-2",
    "tier-3",
    "tier-4",
    "tier-5",
    "recipes"
] as const;

export type GuidebookPageId = typeof GUIDEBOOK_PAGE_IDS[number];

export interface GuidebookPage {
    readonly id: GuidebookPageId;
    readonly title: string;
    readonly lines: readonly string[];
}

export interface GuidebookTierRecord {
    readonly name: string;
    readonly description: string;
    readonly targets: readonly string[];
    readonly type: "companion" | "enemy";
}

export interface GuidebookTierPageData {
    readonly id: GuidebookPageId;
    readonly title: string;
    readonly tier: number;
    readonly rarity: string;
    readonly color: string;
    readonly requiredTag: string;
}
