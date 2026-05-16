import { world, Entity } from "@minecraft/server";

const DIMENSIONS = ["overworld", "nether", "the_end"] as const;

export function forEachTaggedEntity(tag: string, callback: (entity: Entity) => void): void {
    for (const id of DIMENSIONS) {
        const dim = world.getDimension(id);
        for (const entity of dim.getEntities({ tags: [tag] })) {
            if (!entity?.isValid) continue;
            callback(entity);
        }
    }
}
