import { getDebugPlayers } from "./GetDebugPlayers";

export function hasDebugPlayers(): boolean {
    return getDebugPlayers().length > 0;
}
