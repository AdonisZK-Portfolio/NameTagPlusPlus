import { Entity, Player } from "@minecraft/server";

export function chooseRandomPlayer(entity: Entity): Player | undefined {
    if (!entity?.isValid) return undefined;

    const players = entity.dimension.getPlayers();
    if (players.length === 0) return undefined;

    const index = Math.floor(Math.random() * players.length);
    const player = players[index];
    if (!player?.isValid) return undefined;

    return player;
}
