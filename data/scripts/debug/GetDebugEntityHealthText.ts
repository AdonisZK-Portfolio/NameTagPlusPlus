import type { Entity } from "@minecraft/server";
import { formatDebugNumber } from "./FormatDebugNumber";

export function getDebugEntityHealthText(entity: Entity | undefined): string {
    if (!entity?.isValid) return "HP n/a";

    const health = entity.getComponent("health");
    if (!health) return "HP n/a";

    const current = formatDebugNumber(health.currentValue);
    const max = formatDebugNumber(health.effectiveMax);

    return `HP ${current}/${max}`;
}
