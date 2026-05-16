import { NAMETAG_CONFIGS } from "./NameTagConfigs";

export const VALID_TARGETS = new Set<string>(
    NAMETAG_CONFIGS.flatMap(config => config.targets)
);
