import type { Dimension, Player, Vector3 } from "@minecraft/server";

const WOLF_SPAWN_OFFSETS: readonly Vector3[] = [
    { x: 2, y: 0, z: 2 },
    { x: 2, y: 0, z: 0 },
    { x: 0, y: 0, z: 2 },
    { x: -2, y: 0, z: 2 },
    { x: 2, y: 0, z: -2 },
    { x: -2, y: 0, z: 0 },
    { x: 0, y: 0, z: -2 },
    { x: -2, y: 0, z: -2 },
    { x: 2, y: 1, z: 2 },
    { x: -2, y: 1, z: 2 },
    { x: 2, y: 1, z: -2 },
    { x: -2, y: 1, z: -2 },
    { x: 0, y: 0, z: 0 }
];

function getBlockLocation(location: Vector3): Vector3 {
    return {
        x: Math.floor(location.x),
        y: Math.floor(location.y),
        z: Math.floor(location.z)
    };
}

function isWithinHeightRange(dimension: Dimension, y: number): boolean {
    const { min, max } = dimension.heightRange;
    return y > min && y + 1 < max;
}

function isSafeWolfSpawnLocation(dimension: Dimension, location: Vector3): boolean {
    if (!isWithinHeightRange(dimension, location.y)) return false;

    const feetBlock = dimension.getBlock(location);
    if (!feetBlock?.isAir) return false;

    const headBlock = dimension.getBlock({ x: location.x, y: location.y + 1, z: location.z });
    if (!headBlock?.isAir) return false;

    const floorBlock = dimension.getBlock({ x: location.x, y: location.y - 1, z: location.z });
    if (!floorBlock) return false;
    if (floorBlock.isAir || floorBlock.isLiquid) return false;

    return true;
}

function getWolfSpawnLocation(player: Player): Vector3 {
    const { dimension, location } = player;
    const blockLocation = getBlockLocation(location);

    for (const offset of WOLF_SPAWN_OFFSETS) {
        const spawnBlockLocation = {
            x: blockLocation.x + offset.x,
            y: blockLocation.y + offset.y,
            z: blockLocation.z + offset.z
        };

        if (!isSafeWolfSpawnLocation(dimension, spawnBlockLocation)) continue;

        return {
            x: spawnBlockLocation.x + 0.5,
            y: spawnBlockLocation.y,
            z: spawnBlockLocation.z + 0.5
        };
    }

    return location;
}

export function spawnGuidebookWolf(player: Player): void {
    if (!player.isValid) return;

    player.dimension.spawnEntity("minecraft:wolf", getWolfSpawnLocation(player));
}
