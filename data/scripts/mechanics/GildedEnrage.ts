import { Entity } from "@minecraft/server";
import { setEntityEffects } from "../effectsHandler";

export function checkGildedEnrage(entity: Entity): void {
    if (!entity?.isValid) return;
    if (entity.hasTag("ntpp:gilded_enraged")) return;

    const health = entity.getComponent("health");
    if (!health) return;
    if (health.currentValue / health.effectiveMax > 0.5) return;

    entity.addTag("ntpp:gilded_enraged");
    entity.addEffect("resistance", 20000000, { amplifier: 2, showParticles: false });
    setEntityEffects(entity, { damageBoost: 6, speedMultiplier: 1.25 });
}
