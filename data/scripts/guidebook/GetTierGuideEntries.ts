import { NAMETAG_CONFIGS } from "../nametag/NameTagConfigs";
import type { GuidebookTierRecord } from "./GuidebookTypes";

export function getTierGuideEntries(tier: number): readonly GuidebookTierRecord[] {
    return NAMETAG_CONFIGS
        .filter(config => config.tier === tier)
        .map(config => ({
            name: config.name,
            description: config.description,
            targets: config.targets,
            type: config.type
        }));
}
