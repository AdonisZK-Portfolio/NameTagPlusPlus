import { world, system } from "@minecraft/server";
import { handleNametagApplication, VALID_TARGETS } from "../nametagHandler";

export function registerOnEntitySpawn(): void {
    world.afterEvents.entitySpawn.subscribe((event) => {
        const entity = event.entity;
        if (!entity?.isValid) return;
        if (!VALID_TARGETS.has(entity.typeId)) return;

        system.runTimeout(() => {
            if (!entity?.isValid) return;
            const nameTag = entity.nameTag;
            if (!nameTag) return;

            handleNametagApplication(entity, nameTag);
        }, 5);
    });
}
