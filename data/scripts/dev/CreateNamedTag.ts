import { ItemStack } from "@minecraft/server";

export function createNamedTag(name: string, typeId: string = "minecraft:name_tag"): ItemStack {
    const stack = new ItemStack(typeId, 1);
    stack.nameTag = name;
    return stack;
}
