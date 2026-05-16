import { EquipmentSlot } from "@minecraft/server";
import type { Entity } from "@minecraft/server";
import type { NametagConfig, ReplacementState } from "./NameTagTypes";

export function captureReplacementState(entity: Entity, config: NametagConfig): ReplacementState {
    const equippable = entity.getComponent("equippable");
    const mainhandItem = config.preserveEquipment
        ? equippable?.getEquipment(EquipmentSlot.Mainhand)
        : undefined;

    return {
        location: entity.location,
        dimension: entity.dimension,
        rotation: entity.getRotation(),
        variant: entity.getComponent("minecraft:variant")?.value ?? 0,
        markVariant: entity.getComponent("minecraft:mark_variant")?.value ?? 0,
        mainhandItem
    };
}
