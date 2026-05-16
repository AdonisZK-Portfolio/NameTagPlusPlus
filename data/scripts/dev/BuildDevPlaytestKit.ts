import { ItemStack } from "@minecraft/server";
import { NAMETAG_CONFIGS } from "../nametag/NameTagConfigs";
import { formatNametagDisplayName } from "../nametag/FormatNametagDisplayName";
import { TIER_NAMETAG_ITEM_BY_TIER } from "./TierNameTagItemByTier";
import { SPAWN_EGG_BY_ENTITY_TYPE } from "./SpawnEggByEntityType";
import { createNamedTag } from "./CreateNamedTag";
import type { DevPlaytestKit, DevPlaytestKitType, DevPlaytestKitItem } from "./DevPlaytestKitTypes";

function buildDevPlaytestKit(tier: number, type: DevPlaytestKitType): DevPlaytestKit {
    const matchingConfigs = NAMETAG_CONFIGS.filter(
        config => config.tier === tier && config.type === type
    );

    const items: DevPlaytestKitItem[] = [];

    for (const config of matchingConfigs) {
        const representativeTarget = config.targets[0];
        if (!representativeTarget) continue;

        const spawnEggId = SPAWN_EGG_BY_ENTITY_TYPE[representativeTarget];
        if (spawnEggId) {
            items.push({
                itemStack: new ItemStack(spawnEggId, 1)
            });
        }

        const tierItemId = TIER_NAMETAG_ITEM_BY_TIER[tier];
        if (tierItemId) {
            items.push({
                itemStack: createNamedTag(formatNametagDisplayName(config.name), tierItemId)
            });
        }
    }

    return {
        tier,
        type,
        items
    };
}

export { buildDevPlaytestKit };
