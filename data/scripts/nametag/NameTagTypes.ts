import type { Dimension, ItemStack, Vector2, Vector3 } from "@minecraft/server";

export interface NametagEffects {
    damageBoost?: number;
    healthBoost?: number;
    speedMultiplier?: number;
    regenPerSeconds?: number;
    resistanceAmplifier?: number;
    fireImmune?: boolean;
    lootingLevel?: number;
    poisonOnHit?: boolean;
    blindnessOnHit?: boolean;
    doubleHit?: boolean;
    tripleHit?: boolean;
    lifestealPercent?: number;
    lightningOnHit?: boolean;
    witherOnHit?: boolean;
    witherAmplifier?: number;
}

export interface NametagConfig {
    name: string;
    type: "companion" | "enemy";
    description: string;
    targets: string[];
    tier: number;
    effects: NametagEffects;
    customEntityId?: string;
    customEntityMap?: Record<string, string>;
    requireTamed?: boolean;
    preserveVariant?: boolean;
    preserveMarkVariant?: boolean;
    preserveEquipment?: boolean;
}

export interface ReplacementState {
    readonly location: Vector3;
    readonly dimension: Dimension;
    readonly rotation: Vector2;
    readonly variant: number;
    readonly markVariant: number;
    readonly mainhandItem?: ItemStack;
}
