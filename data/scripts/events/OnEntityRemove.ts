import { world } from "@minecraft/server";
import { removeEntityEffects } from "../effectsHandler";

export function registerOnEntityRemove(): void {
    world.beforeEvents.entityRemove.subscribe((event) => {
        const entity = event.removedEntity;
        if (!entity?.isValid) return;
        removeEntityEffects(entity.id);
    });
}
