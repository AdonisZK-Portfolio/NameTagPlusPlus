import { system, Player } from "@minecraft/server";
import { DEBUG_PLAYER_TAG } from "../debug/DebugConfig";
import { findCommandById } from "../dev/DevPlaytestCommands";
import { giveDevPlaytestKit } from "../dev/GiveDevPlaytestKit";

export function registerDevScriptEvent(): void {
    system.afterEvents.scriptEventReceive.subscribe((event) => {
        if (event.id !== "ntpp:dev") return;

        const command = findCommandById(event.message);
        if (!command) return;

        const sourceEntity = event.sourceEntity;
        if (!sourceEntity?.isValid) return;
        if (!(sourceEntity instanceof Player)) return;

        if (!sourceEntity.hasTag(DEBUG_PLAYER_TAG)) {
            sourceEntity.sendMessage("Dev command requires ntpp:debug.");
            return;
        }

        const success = giveDevPlaytestKit(sourceEntity, command.tier, command.type);
        const message = success ? command.successMessage : command.emptyMessage;
        sourceEntity.sendMessage(message);
    });
}
