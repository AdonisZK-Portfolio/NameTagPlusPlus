import { world, system, ItemStack } from "@minecraft/server";
import { getEntityEffects } from "../effectsHandler";

export function registerOnLootingKill(): void {
    world.afterEvents.entityDie.subscribe((event) => {
        const killer = event.damageSource.damagingEntity;
        if (!killer?.isValid) return;

        const killerEffects = getEntityEffects(killer);
        if (!killerEffects || killerEffects.lootingLevel <= 0) return;

        const { location, dimension } = event.deadEntity;
        const lootingLevel = killerEffects.lootingLevel;

        system.runTimeout(() => {
            const nearbyItems = dimension.getEntities({
                location,
                maxDistance: 4,
                type: "minecraft:item"
            });

            for (const itemEntity of nearbyItems) {
                const itemComp = itemEntity.getComponent("item");
                if (!itemComp) continue;

                for (let i = 0; i < lootingLevel; i++) {
                    dimension.spawnItem(new ItemStack(itemComp.itemStack.typeId, 1), location);
                }
            }
        }, 3);
    });
}
