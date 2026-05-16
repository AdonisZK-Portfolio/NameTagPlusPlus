import { world } from "@minecraft/server";
import type { ExplosionBeforeEvent } from "@minecraft/server";

const STORM_WITHER_ID = "ntpp:storm_wither";

function isStormWitherExplosion(event: ExplosionBeforeEvent): boolean {
    const source = event.source;
    if (!source?.isValid) return false;
    if (source.typeId === STORM_WITHER_ID) return true;

    const projectileComp = source.getComponent("minecraft:projectile");
    if (!projectileComp) return false;

    const owner = projectileComp.owner;
    return owner?.isValid === true && owner.typeId === STORM_WITHER_ID;
}

export function registerOnExplosion(): void {
    world.beforeEvents.explosion.subscribe((event) => {
        if (!isStormWitherExplosion(event)) return;
        event.setImpactedBlocks([]);
    });
}
