import { EquipmentSlot, system } from "@minecraft/server";
import type { Entity } from "@minecraft/server";
import type { NametagConfig, ReplacementState } from "./NameTagTypes";
import { getReplacementMainhandItem } from "./GetReplacementMainhandItem";

export function applyReplacementState(customEntity: Entity, config: NametagConfig, state: ReplacementState): void {
    customEntity.setRotation(state.rotation);

    system.run(() => {
        if (!customEntity?.isValid) return;

        const mainhandItem = getReplacementMainhandItem(config, state);
        const newEquippable = customEntity.getComponent("equippable");

        if (mainhandItem) {
            newEquippable?.setEquipment(EquipmentSlot.Mainhand, mainhandItem);
        }

        if (config.name === "gilded") {
            newEquippable?.setEquipment(EquipmentSlot.Offhand, undefined);
        }

        if (config.preserveEquipment) {
            const isRanged = mainhandItem?.typeId === "minecraft:crossbow";
            customEntity.triggerEvent(isRanged ? "ntpp:set_ranged" : "ntpp:set_melee");
        }
    });

    if (config.preserveVariant) {
        customEntity.triggerEvent(`ntpp:set_variant_${state.variant}`);
        if (config.preserveMarkVariant) {
            customEntity.triggerEvent(`ntpp:set_mark_variant_${state.markVariant}`);
        }
    }
}
