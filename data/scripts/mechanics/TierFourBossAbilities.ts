import { forEachTaggedEntity } from "../utils/forEachTaggedEntity";
import { runChaosAbilities } from "./bosses/RunChaosAbilities";
import { runDoomAbilities } from "./bosses/RunDoomAbilities";

export function applyTierFourBossAbilities(): void {
    forEachTaggedEntity("ntpp:doom", runDoomAbilities);
    forEachTaggedEntity("ntpp:chaos", runChaosAbilities);
}
