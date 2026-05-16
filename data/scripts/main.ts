import { system } from "@minecraft/server";
import { onEverySecond } from "./actions/OnEverySecond";
import { onEveryMinute } from "./actions/OnEveryMinute";
import { onEveryThirtySeconds } from "./actions/OnEveryThirtySeconds";
import { onEveryThreeMinutes } from "./actions/OnEveryThreeMinutes";
import { onEveryTwentySeconds } from "./actions/OnEveryTwentySeconds";
import { registerOnEntityHurt } from "./events/OnEntityHurt";
import { registerOnEntityRemove } from "./events/OnEntityRemove";
import { registerOnLootingKill } from "./events/OnLootingKill";
import { registerOnEntitySpawn } from "./events/OnEntitySpawn";
import { registerOnEnemyDeath } from "./events/OnEnemyDeath";
import { registerNametagInteraction } from "./events/NametagInteraction";
import { registerDevScriptEvent } from "./events/DevScriptEvent";
import { registerGuidebookInteraction } from "./events/GuidebookInteraction";
import { registerGuidebookOnboarding } from "./events/GuidebookOnboarding";
import { registerOnExplosion } from "./events/OnExplosion";
import { registerGuidebookTutorialScriptEvent } from "./events/GuidebookTutorialScriptEvent";

system.runInterval(() => {
    onEverySecond();
}, 20);

system.runInterval(() => {
    onEveryMinute();
}, 1200);

system.runInterval(() => {
    onEveryThirtySeconds();
}, 600);

system.runInterval(() => {
    onEveryTwentySeconds();
}, 400);

system.runInterval(() => {
    onEveryThreeMinutes();
}, 3600);

registerOnEntityHurt();
registerOnEntityRemove();
registerOnLootingKill();
registerOnEntitySpawn();
registerOnEnemyDeath();
registerNametagInteraction();
registerDevScriptEvent();
registerGuidebookInteraction();
registerGuidebookOnboarding();
registerOnExplosion();
registerGuidebookTutorialScriptEvent();
