import { Entity, system } from "@minecraft/server";
import { applyDoomGroundSlam } from "./ApplyDoomGroundSlam";
import { applyDoomSonicBoom } from "./ApplyDoomSonicBoom";

const DOOM_PHASE_TWO_SECOND_SONIC_DELAY = 40;

export function runDoomAbilities(doom: Entity): void {
    if (!doom?.isValid) return;

    applyDoomGroundSlam(doom);
    if (!doom?.isValid) return;

    applyDoomSonicBoom(doom);
    if (!doom?.isValid) return;
    if (!doom.hasTag("ntpp:phase2")) return;

    system.runTimeout(() => {
        if (!doom?.isValid) return;
        applyDoomSonicBoom(doom);
    }, DOOM_PHASE_TWO_SECOND_SONIC_DELAY);
}
