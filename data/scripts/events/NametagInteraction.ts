import { world, system, Player, ItemStack, Entity } from "@minecraft/server";
import { handleNametagApplication, findNametagConfigByTier } from "../nametagHandler";
import { normalizeNametagName } from "../nametag/NormalizeNametagName";
import { tryCompleteGuidebookTutorialFromNametag } from "../guidebook/TryCompleteGuidebookTutorialFromNametag";

const NAMETAG_ITEMS = new Map<string, number>([
    ["minecraft:name_tag", 1],
    ["ntpp:rare_nametag", 2],
    ["ntpp:epic_nametag", 3],
    ["ntpp:legendary_nametag", 4],
    ["ntpp:mythic_nametag", 5]
]);

function getItemTier(itemTypeId: string): number | undefined {
    return NAMETAG_ITEMS.get(itemTypeId);
}

function getItemName(item: ItemStack): string | undefined {
    const nameTag = item.nameTag;
    if (nameTag) return nameTag;

    const lore = item.getLore();
    if (lore.length > 0) return lore[0];

    return undefined;
}

function consumeItem(player: Player): void {
    const container = player.getComponent("inventory")?.container;
    if (!container) return;

    const selectedSlot = player.selectedSlotIndex;
    const slotItem = container.getItem(selectedSlot);
    if (!slotItem) return;

    if (slotItem.amount > 1) {
        slotItem.amount -= 1;
        container.setItem(selectedSlot, slotItem);
    } else {
        container.setItem(selectedSlot, undefined);
    }
}

interface TransformationEligibility {
    readonly nametagName: string;
    readonly tier: number;
}

function checkTransformationEligibility(target: Entity, item: ItemStack, tier: number): TransformationEligibility | undefined {
    const nametagName = getItemName(item);
    if (!nametagName) return undefined;

    if (target.hasTag("ntpp:transformed")) return undefined;
    if (target.getComponent("minecraft:is_baby")) return undefined;

    const config = findNametagConfigByTier(nametagName, tier);
    if (!config) return undefined;

    if (!config.targets.includes(target.typeId)) return undefined;

    if (config.requireTamed) {
        const tameable = target.getComponent("tameable");
        if (!tameable?.isTamed) return undefined;
    }

    return { nametagName, tier };
}

export function registerNametagInteraction(): void {
    world.beforeEvents.playerInteractWithEntity.subscribe((event) => {
        const { player, target, itemStack } = event;

        if (!player?.isValid || !target?.isValid || !itemStack) return;

        const tier = getItemTier(itemStack.typeId);
        if (tier === undefined) return;

        const eligibility = checkTransformationEligibility(target, itemStack, tier);
        if (!eligibility) return;

        event.cancel = true;

        const selectedSlot = player.selectedSlotIndex;
        const itemTypeId = itemStack.typeId;
        const targetTypeId = target.typeId;
        const { nametagName } = eligibility;

        system.run(() => {
            if (!player?.isValid || !target?.isValid) return;

            const container = player.getComponent("inventory")?.container;
            if (!container) return;

            const slotItem = container.getItem(selectedSlot);
            if (!slotItem) return;
            if (slotItem.typeId !== itemTypeId) return;

            const slotItemName = getItemName(slotItem);
            if (slotItemName !== nametagName) return;

            const slotTier = getItemTier(slotItem.typeId);
            if (slotTier === undefined) return;

            if (!checkTransformationEligibility(target, slotItem, slotTier)) return;

            const { dimension, location } = target;

            handleNametagApplication(target, nametagName, slotTier, player);

            system.run(() => {
                if (!player?.isValid) return;

                const transformed = dimension.getEntities({
                    location,
                    maxDistance: 3,
                    tags: ["ntpp:transformed", `ntpp:${normalizeNametagName(nametagName)}`]
                });

                if (transformed.length > 0) {
                    consumeItem(player);
                    tryCompleteGuidebookTutorialFromNametag(player, nametagName, targetTypeId);
                }
            });
        });
    });
}
