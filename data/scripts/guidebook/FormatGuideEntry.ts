import type { GuidebookTierRecord } from "./GuidebookTypes";

const GUIDEBOOK_ROLE_COLORS: Record<GuidebookTierRecord["type"], string> = {
    companion: "§a",
    enemy: "§c"
};

const GUIDEBOOK_ROLE_LABELS: Record<GuidebookTierRecord["type"], string> = {
    companion: "Companion",
    enemy: "Enemy"
};

function formatGuideEntryName(name: string): string {
    return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

function formatTargetName(target: string): string {
    const cleanTarget = target.replace("minecraft:", "");
    return cleanTarget
        .split("_")
        .map(part => formatGuideEntryName(part))
        .join(" ");
}

function formatGuideEntryType(type: GuidebookTierRecord["type"]): string {
    return `${GUIDEBOOK_ROLE_COLORS[type]}§l[${GUIDEBOOK_ROLE_LABELS[type]}]§r`;
}

export function formatGuideEntry(entry: GuidebookTierRecord, nameColor: string): string {
    return `${nameColor}§l${formatGuideEntryName(entry.name)}§r ${formatGuideEntryType(entry.type)}\n§f${entry.description}§r\n§eMobs: §f${entry.targets.map(formatTargetName).join(", ")}§r`;
}
