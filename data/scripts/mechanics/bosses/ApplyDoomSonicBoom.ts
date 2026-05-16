import { Entity, EntityDamageCause } from "@minecraft/server";
import { getNearestEntity } from "../../utils/GetNearestEntity";
import { getHorizontalKnockback } from "../../utils/GetHorizontalKnockback";

const DOOM_SONIC_DAMAGE = 8;
const DOOM_SONIC_RANGE = 24;
const DOOM_SONIC_TARGET_COUNT = 5;
const DOOM_SONIC_KNOCKBACK_FORCE = 1.2;
const DOOM_SONIC_VERTICAL_FORCE = 0.2;

function getDoomSonicTargets(doom: Entity): Entity[] {
    const candidatesById = new Map<string, Entity>();
    const targets: Entity[] = [];
    const nearby = doom.dimension.getEntities({
        location: doom.location,
        maxDistance: DOOM_SONIC_RANGE
    });

    for (const entity of nearby) {
        if (!entity?.isValid) continue;
        if (entity.id === doom.id) continue;
        candidatesById.set(entity.id, entity);
    }

    while (targets.length < DOOM_SONIC_TARGET_COUNT && candidatesById.size > 0) {
        const nearest = getNearestEntity(doom.location, [...candidatesById.values()]);
        if (!nearest?.isValid) return targets;

        targets.push(nearest);
        candidatesById.delete(nearest.id);
    }

    return targets;
}

export function applyDoomSonicBoom(doom: Entity): void {
    if (!doom?.isValid) return;

    const candidates = getDoomSonicTargets(doom);

    for (const target of candidates) {
        if (!doom?.isValid) return;
        if (!target?.isValid) continue;

        target.applyDamage(DOOM_SONIC_DAMAGE, {
            damagingEntity: doom,
            cause: EntityDamageCause.sonicBoom
        });

        if (!target?.isValid) continue;

        target.applyImpulse(getHorizontalKnockback(doom.location, target.location, DOOM_SONIC_KNOCKBACK_FORCE, DOOM_SONIC_VERTICAL_FORCE));
    }
}
