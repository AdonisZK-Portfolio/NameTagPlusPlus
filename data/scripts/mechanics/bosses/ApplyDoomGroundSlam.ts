import { Entity, EntityDamageCause } from "@minecraft/server";
import { getHorizontalKnockback } from "../../utils/GetHorizontalKnockback";

const DOOM_SLAM_RADIUS = 10;
const DOOM_SLAM_DAMAGE = 4;
const DOOM_SLAM_KNOCKBACK_FORCE = 1.5;
const DOOM_SLAM_VERTICAL_FORCE = 0.45;

export function applyDoomGroundSlam(doom: Entity): void {
    if (!doom?.isValid) return;

    const nearby = doom.dimension.getEntities({
        location: doom.location,
        maxDistance: DOOM_SLAM_RADIUS
    });

    for (const entity of nearby) {
        if (!doom?.isValid) return;
        if (!entity?.isValid) continue;
        if (entity.id === doom.id) continue;

        entity.applyDamage(DOOM_SLAM_DAMAGE, {
            damagingEntity: doom,
            cause: EntityDamageCause.entityAttack
        });

        if (!entity?.isValid) continue;

        entity.applyImpulse(getHorizontalKnockback(doom.location, entity.location, DOOM_SLAM_KNOCKBACK_FORCE, DOOM_SLAM_VERTICAL_FORCE));
    }
}
