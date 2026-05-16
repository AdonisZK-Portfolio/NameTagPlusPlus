import type { Entity } from "@minecraft/server";
import { setEntityEffects } from "../effectsHandler";
import { applyAuraForEntity } from "../mechanics/AuraEffects";
import { applyEntityTags } from "./ApplyEntityTags";
import type { NametagConfig } from "./NameTagTypes";

export function finalizeTransformation(entity: Entity, config: NametagConfig, newName: string, tier: number): void {
    entity.nameTag = newName;
    applyEntityTags(entity, config, tier);
    setEntityEffects(entity, config.effects);
    applyAuraForEntity(entity);
}
