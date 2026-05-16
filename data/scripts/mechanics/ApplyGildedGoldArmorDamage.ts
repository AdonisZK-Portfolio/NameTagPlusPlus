import { EquipmentSlot } from "@minecraft/server";
import type { Entity } from "@minecraft/server";

interface GoldArmorSlot {
    readonly slot: EquipmentSlot;
    readonly itemTypeId: string;
}

const GOLD_ARMOR_DAMAGE_PER_PIECE = 3;
const GOLD_ARMOR_SLOTS: readonly GoldArmorSlot[] = [
    { slot: EquipmentSlot.Head, itemTypeId: "minecraft:golden_helmet" },
    { slot: EquipmentSlot.Chest, itemTypeId: "minecraft:golden_chestplate" },
    { slot: EquipmentSlot.Legs, itemTypeId: "minecraft:golden_leggings" },
    { slot: EquipmentSlot.Feet, itemTypeId: "minecraft:golden_boots" }
];

export function applyGildedGoldArmorDamage(attacker: Entity, victim: Entity): void {
    if (!attacker?.isValid || !victim?.isValid) return;
    if (!attacker.hasTag("ntpp:gilded")) return;
    if (victim.typeId !== "minecraft:player") return;

    const equippable = victim.getComponent("equippable");
    if (!equippable) return;

    const health = victim.getComponent("health");
    if (!health) return;

    let goldArmorPieceCount = 0;

    for (const goldArmorSlot of GOLD_ARMOR_SLOTS) {
        const item = equippable.getEquipment(goldArmorSlot.slot);
        if (item?.typeId === goldArmorSlot.itemTypeId) {
            goldArmorPieceCount += 1;
        }
    }

    if (goldArmorPieceCount <= 0) return;

    health.setCurrentValue(Math.max(0, health.currentValue - goldArmorPieceCount * GOLD_ARMOR_DAMAGE_PER_PIECE));
}
