import { world, Entity, ItemStack } from "@minecraft/server";

const TIER_DROPS: ReadonlyArray<{ tags: readonly string[]; item: string; count: number }> = [
    { tags: ["ntpp:wrath", "ntpp:hollow"], item: "ntpp:rare_material", count: 2 },
    { tags: ["ntpp:risen", "ntpp:crawl", "ntpp:dusk", "ntpp:feral"], item: "ntpp:epic_material", count: 2 },
    { tags: ["ntpp:fury", "ntpp:veil", "ntpp:bane", "ntpp:gilded", "ntpp:grim"], item: "ntpp:legendary_material", count: 2 },
    { tags: ["ntpp:doom", "ntpp:chaos"], item: "ntpp:mythic_material", count: 2 }
];

function spawnBossRewards(entity: Entity): void {
    if (!entity.hasTag("ntpp:doom") && !entity.hasTag("ntpp:chaos")) return;

    const { dimension, location } = entity;

    for (let i = 0; i < 3; i++) {
        dimension.spawnItem(new ItemStack("minecraft:netherite_ingot", 1), location);
    }
}

function handleEnemyDeath(entity: Entity): void {
    if (!entity.hasTag("ntpp:transformed")) return;
    if (!entity.hasTag("ntpp:enemy")) return;

    const { dimension, location } = entity;

    for (const { tags, item, count } of TIER_DROPS) {
        if (!tags.some(tag => entity.hasTag(tag))) continue;

        for (let i = 0; i < count; i++) {
            dimension.spawnItem(new ItemStack(item, 1), location);
        }

        spawnBossRewards(entity);
        return;
    }
}

export function registerOnEnemyDeath(): void {
    world.afterEvents.entityDie.subscribe((event) => {
        if (!event.deadEntity?.isValid) return;
        handleEnemyDeath(event.deadEntity);
    });
}
