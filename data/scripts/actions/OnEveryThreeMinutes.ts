import { ItemStack } from "@minecraft/server";
import { forEachTaggedEntity } from "../utils/forEachTaggedEntity";

const WOOL_COLORS = [
    "white", "orange", "magenta", "light_blue", "yellow", "lime",
    "pink", "gray", "light_gray", "cyan", "purple", "blue",
    "brown", "green", "red", "black"
] as const;

const FARM_DROPS: Record<string, readonly string[]> = {
    "minecraft:cow": ["minecraft:leather", "minecraft:beef"],
    "minecraft:pig": ["minecraft:porkchop"],
    "minecraft:chicken": ["minecraft:feather", "minecraft:chicken", "minecraft:egg"]
};

export function onEveryThreeMinutes(): void {
    forEachTaggedEntity("ntpp:farm", (farm) => {
        const drops = FARM_DROPS[farm.typeId];
        if (drops) {
            for (const drop of drops) {
                farm.dimension.spawnItem(new ItemStack(drop, 1), farm.location);
            }
            return;
        }

        if (farm.typeId === "minecraft:sheep") {
            const variant = (farm.getComponent("minecraft:variant") as { value: number } | undefined)?.value ?? 0;
            const colorIndex = Math.min(variant, WOOL_COLORS.length - 1);
            farm.dimension.spawnItem(new ItemStack(`minecraft:${WOOL_COLORS[colorIndex]}_wool`, 1), farm.location);
        }
    });
}
