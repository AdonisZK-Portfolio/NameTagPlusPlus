import { DEBUG_NUMBER_DECIMALS } from "./DebugConfig";

export function formatDebugNumber(value: number): string {
    const multiplier = 10 ** DEBUG_NUMBER_DECIMALS;
    const rounded = Math.round(value * multiplier) / multiplier;
    const formatted = rounded.toFixed(DEBUG_NUMBER_DECIMALS);
    return formatted.replace(/\.?0+$/, "");
}
