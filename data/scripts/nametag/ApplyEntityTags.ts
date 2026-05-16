import type { Entity } from "@minecraft/server";
import type { NametagConfig } from "./NameTagTypes";

export function applyEntityTags(entity: Entity, config: NametagConfig, tier: number): void {
    entity.addTag("ntpp:transformed");
    entity.addTag("ntpp:" + config.name);
    entity.addTag("ntpp:tier" + tier);
    entity.addTag("ntpp:" + config.type);
}
