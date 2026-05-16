import type { Entity } from "@minecraft/server";

export function getDebugEntityLabel(entity: Entity | undefined): string {
    if (!entity?.isValid) return "invalid";

    return entity.typeId;
}
