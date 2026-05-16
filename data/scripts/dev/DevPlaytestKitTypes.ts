import type { ItemStack } from "@minecraft/server";

export type DevPlaytestKitType = "companion" | "enemy";

export interface DevPlaytestKitItem {
    readonly itemStack: ItemStack;
}

export interface DevPlaytestKit {
    readonly tier: number;
    readonly type: DevPlaytestKitType;
    readonly items: readonly DevPlaytestKitItem[];
}
