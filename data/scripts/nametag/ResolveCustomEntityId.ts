import type { Entity } from "@minecraft/server";
import type { NametagConfig } from "./NameTagTypes";

export function resolveCustomEntityId(entity: Entity, config: NametagConfig): string | undefined {
    return config.customEntityMap?.[entity.typeId] ?? config.customEntityId;
}
