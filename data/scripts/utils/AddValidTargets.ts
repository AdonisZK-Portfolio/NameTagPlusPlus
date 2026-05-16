import { Entity } from "@minecraft/server";

export function addValidTargets(targetsById: Map<string, Entity>, entities: readonly Entity[]): void {
    for (const entity of entities) {
        if (!entity?.isValid) continue;
        targetsById.set(entity.id, entity);
    }
}
