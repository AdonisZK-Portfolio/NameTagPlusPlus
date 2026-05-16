import { Entity } from "@minecraft/server";
import { applyChaosAura } from "./ApplyChaosAura";
import { applyChaosExplosiveAttack } from "./ApplyChaosExplosiveAttack";
import { spawnEntitiesAroundTarget } from "./SpawnEntitiesAroundTarget";

export function runChaosAbilities(chaos: Entity): void {
    if (!chaos?.isValid) return;

    applyChaosAura(chaos);
    if (!chaos?.isValid) return;

    if (chaos.hasTag("ntpp:phase2")) {
        spawnEntitiesAroundTarget(chaos, "ntpp:grim_wither_skeleton", 2, 3);
        applyChaosExplosiveAttack(chaos);
        return;
    }

    spawnEntitiesAroundTarget(chaos, "ntpp:veil_skeleton", 2, 3);
}
