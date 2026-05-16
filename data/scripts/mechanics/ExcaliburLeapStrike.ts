import { Entity, EntityDamageCause } from "@minecraft/server";
import { forEachTaggedEntity } from "../utils/forEachTaggedEntity";
import { getHorizontalKnockback } from "../utils/GetHorizontalKnockback";

const LEAP_RANGE = 8;
const LEAP_VERTICAL_THRESHOLD = 2;
const LEAP_DAMAGE = 6;

function findLeapTarget(excalibur: Entity): Entity | undefined {
    const nearby = excalibur.dimension.getEntities({
        location: excalibur.location,
        maxDistance: LEAP_RANGE,
        families: ["monster"]
    });

    let bestTarget: Entity | undefined;
    let bestVerticalDiff = LEAP_VERTICAL_THRESHOLD;

    for (const target of nearby) {
        if (!target?.isValid) continue;
        if (target.hasTag("ntpp:companion")) continue;

        const verticalDiff = target.location.y - excalibur.location.y;
        if (verticalDiff < LEAP_VERTICAL_THRESHOLD) continue;
        if (verticalDiff < bestVerticalDiff) continue;

        bestVerticalDiff = verticalDiff;
        bestTarget = target;
    }

    return bestTarget;
}

function applyLeapStrike(excalibur: Entity): void {
    if (!excalibur?.isValid) return;

    const target = findLeapTarget(excalibur);
    if (!target?.isValid) return;

    excalibur.applyImpulse(getHorizontalKnockback(excalibur.location, target.location, 0.8, 0.75));

    target.applyDamage(LEAP_DAMAGE, {
        damagingEntity: excalibur,
        cause: EntityDamageCause.entityAttack
    });
}

export function applyExcaliburLeapStrikePulse(): void {
    forEachTaggedEntity("ntpp:excalibur", applyLeapStrike);
}
