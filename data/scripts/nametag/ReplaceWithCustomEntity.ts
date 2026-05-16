import { system } from "@minecraft/server";
import type { Entity, Player } from "@minecraft/server";
import { applyCompanionTaming } from "./ApplyCompanionTaming";
import { applyReplacementState } from "./ApplyReplacementState";
import { finalizeTransformation } from "./FinalizeTransformation";
import type { NametagConfig, ReplacementState } from "./NameTagTypes";

export function replaceWithCustomEntity(entity: Entity, player: Player, config: NametagConfig, newName: string, tier: number, resolvedEntityId: string, state: ReplacementState): void {
    system.run(() => {
        if (!entity?.isValid) return;
        entity.remove();

        const customEntity = state.dimension.spawnEntity(resolvedEntityId, state.location);
        applyReplacementState(customEntity, config, state);

        if (config.type === "companion") {
            customEntity.triggerEvent("ntpp:spawn_as_tamed");
            applyCompanionTaming(customEntity, player);
        }

        finalizeTransformation(customEntity, config, newName, tier);
    });
}
