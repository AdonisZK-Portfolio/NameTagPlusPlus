import type { NametagConfig } from "./NameTagTypes";
import { CONFIG_BY_NAME } from "./NameTagConfigs";
import { normalizeNametagName } from "./NormalizeNametagName";

export function findNametagConfig(nametagName: string): NametagConfig | undefined {
    return CONFIG_BY_NAME.get(normalizeNametagName(nametagName));
}
