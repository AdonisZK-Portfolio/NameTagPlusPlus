import type { NametagConfig } from "./NameTagTypes";
import { CONFIG_BY_NAME } from "./NameTagConfigs";
import { normalizeNametagName } from "./NormalizeNametagName";

export function findNametagConfigByTier(nametagName: string, tier: number): NametagConfig | undefined {
    const config = CONFIG_BY_NAME.get(normalizeNametagName(nametagName));
    if (!config) return undefined;
    if (config.tier > tier) return undefined;

    return config;
}
