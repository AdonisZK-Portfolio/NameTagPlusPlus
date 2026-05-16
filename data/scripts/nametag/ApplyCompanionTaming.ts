import { system } from "@minecraft/server";
import type { Entity, Player } from "@minecraft/server";

export function applyCompanionTaming(entity: Entity, player: Player): void {
    system.run(() => {
        if (!entity?.isValid) return;
        if (!player?.isValid) return;

        const tameable = entity.getComponent("tameable");
        if (tameable) {
            tameable.tame(player);
            return;
        }

        const tameMount = entity.getComponent("tamemount");
        if (!tameMount) return;

        tameMount.tameToPlayer(true, player);

        system.run(() => {
            if (!entity?.isValid || !player?.isValid) return;
            entity.getComponent("rideable")?.ejectRider(player);
        });
    });
}
