export interface DevPlaytestCommand {
    readonly id: string;
    readonly tier: number;
    readonly type: "companion" | "enemy";
    readonly successMessage: string;
    readonly emptyMessage: string;
}

export const DEV_PLAYTEST_COMMANDS: readonly DevPlaytestCommand[] = [
    {
        id: "tier1_companions",
        tier: 1,
        type: "companion",
        successMessage: "Tier 1 companion playtest kit given.",
        emptyMessage: "No Tier 1 companion configs are currently available."
    },
    {
        id: "tier1_enemies",
        tier: 1,
        type: "enemy",
        successMessage: "Tier 1 enemy playtest kit given.",
        emptyMessage: "No Tier 1 enemy configs are currently available."
    },
    {
        id: "tier2_companions",
        tier: 2,
        type: "companion",
        successMessage: "Tier 2 companion playtest kit given.",
        emptyMessage: "No Tier 2 companion configs are currently available."
    },
    {
        id: "tier2_enemies",
        tier: 2,
        type: "enemy",
        successMessage: "Tier 2 enemy playtest kit given.",
        emptyMessage: "No Tier 2 enemy configs are currently available."
    },
    {
        id: "tier3_companions",
        tier: 3,
        type: "companion",
        successMessage: "Tier 3 companion playtest kit given.",
        emptyMessage: "No Tier 3 companion configs are currently available."
    },
    {
        id: "tier3_enemies",
        tier: 3,
        type: "enemy",
        successMessage: "Tier 3 enemy playtest kit given.",
        emptyMessage: "No Tier 3 enemy configs are currently available."
    },
    {
        id: "tier4_companions",
        tier: 4,
        type: "companion",
        successMessage: "Tier 4 companion playtest kit given.",
        emptyMessage: "No Tier 4 companion configs are currently available."
    },
    {
        id: "tier4_enemies",
        tier: 4,
        type: "enemy",
        successMessage: "Tier 4 enemy playtest kit given.",
        emptyMessage: "No Tier 4 enemy configs are currently available."
    },
    {
        id: "tier5_companions",
        tier: 5,
        type: "companion",
        successMessage: "Tier 5 companion playtest kit given.",
        emptyMessage: "No Tier 5 companion configs are currently available."
    },
    {
        id: "tier5_enemies",
        tier: 5,
        type: "enemy",
        successMessage: "Tier 5 enemy playtest kit given.",
        emptyMessage: "No Tier 5 enemy configs are currently available."
    }
];

export function findCommandById(id: string): DevPlaytestCommand | undefined {
    return DEV_PLAYTEST_COMMANDS.find(cmd => cmd.id === id);
}
