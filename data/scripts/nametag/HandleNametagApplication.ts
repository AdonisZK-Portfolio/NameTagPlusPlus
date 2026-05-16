import type { Entity, Player } from "@minecraft/server";
import { applyCompanionTaming } from "./ApplyCompanionTaming";
import { captureReplacementState } from "./CaptureReplacementState";
import { finalizeTransformation } from "./FinalizeTransformation";
import { findNametagConfig } from "./FindNameTagConfig";
import { findNametagConfigByTier } from "./FindNameTagConfigByTier";
import { replaceWithCustomEntity } from "./ReplaceWithCustomEntity";
import { resolveCustomEntityId } from "./ResolveCustomEntityId";

export function handleNametagApplication(entity: Entity, newName: string, tier?: number, player?: Player): void {
    if (!entity?.isValid) return;
    if (entity.hasTag("ntpp:transformed")) return;
    if (entity.getComponent("minecraft:is_baby")) return;

    const config = tier !== undefined ? findNametagConfigByTier(newName, tier) : findNametagConfig(newName);
    if (!config) return;

    if (!config.targets.includes(entity.typeId)) return;

    const configTier = config.tier;
    const resolvedEntityId = resolveCustomEntityId(entity, config);

    if (resolvedEntityId && player) {
        const state = captureReplacementState(entity, config);
        replaceWithCustomEntity(entity, player, config, newName, configTier, resolvedEntityId, state);
        return;
    }

    finalizeTransformation(entity, config, newName, configTier);

    if (config.type === "companion" && player) {
        applyCompanionTaming(entity, player);
    }
}
