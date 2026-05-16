import type { NametagConfig } from "./NameTagTypes";

export const NAMETAG_CONFIGS: NametagConfig[] = [
    {
        name: "swift",
        type: "companion",
        description: "Fast mount with bonus health.",
        targets: ["minecraft:horse", "minecraft:donkey", "minecraft:mule"],
        tier: 1,
        effects: { healthBoost: 5, speedMultiplier: 1.25 }
    },
    {
        name: "guard",
        type: "companion",
        description: "Durable farm companion that slowly regenerates.",
        targets: ["minecraft:cow", "minecraft:pig", "minecraft:sheep", "minecraft:chicken", "minecraft:rabbit"],
        tier: 1,
        effects: { healthBoost: 10, regenPerSeconds: 0.2 }
    },
    {
        name: "brave",
        type: "companion",
        description: "Wolf companion with bonus health and damage.",
        targets: ["minecraft:wolf"],
        tier: 1,
        effects: { healthBoost: 5, damageBoost: 3 }
    },
    {
        name: "wrath",
        type: "enemy",
        description: "Stronger zombie enemy for early combat.",
        targets: ["minecraft:zombie"],
        tier: 1,
        effects: {},
        customEntityId: "ntpp:wrath_zombie"
    },
    {
        name: "hollow",
        type: "enemy",
        description: "Custom skeleton enemy with archer pressure.",
        targets: ["minecraft:skeleton"],
        tier: 1,
        effects: {},
        customEntityId: "ntpp:hollow_skeleton"
    },
    {
        name: "edge",
        type: "companion",
        description: "Fast wolf companion that regenerates and stays near you.",
        targets: ["minecraft:wolf"],
        tier: 2,
        effects: { regenPerSeconds: 0.2, speedMultiplier: 1.25 },
        customEntityId: "ntpp:edge_wolf"
    },
    {
        name: "lucky",
        type: "companion",
        description: "Cat companion that regenerates and improves drops.",
        targets: ["minecraft:cat"],
        tier: 2,
        effects: { regenPerSeconds: 0.2, lootingLevel: 2 },
        customEntityId: "ntpp:lucky_cat"
    },
    {
        name: "gale",
        type: "companion",
        description: "Very fast mount that keeps its original look.",
        targets: ["minecraft:horse", "minecraft:donkey", "minecraft:mule"],
        tier: 2,
        effects: { speedMultiplier: 1.5 },
        preserveVariant: true,
        preserveMarkVariant: true,
        customEntityMap: {
            "minecraft:horse": "ntpp:gale_horse",
            "minecraft:donkey": "ntpp:gale_donkey",
            "minecraft:mule": "ntpp:gale_mule"
        }
    },
    {
        name: "typhoon",
        type: "companion",
        description: "Fireproof mount with extreme speed and preserved look.",
        targets: ["minecraft:horse", "minecraft:donkey", "minecraft:mule"],
        tier: 3,
        effects: { speedMultiplier: 1.75, fireImmune: true },
        preserveVariant: true,
        preserveMarkVariant: true,
        customEntityMap: {
            "minecraft:horse": "ntpp:typhoon_horse",
            "minecraft:donkey": "ntpp:typhoon_donkey",
            "minecraft:mule": "ntpp:typhoon_mule"
        }
    },
    {
        name: "tide",
        type: "companion",
        description: "Axolotl companion that keeps its original variant.",
        targets: ["minecraft:axolotl"],
        tier: 2,
        effects: {},
        preserveVariant: true,
        customEntityId: "ntpp:tide_axolotl"
    },
    {
        name: "farm",
        type: "companion",
        description: "Simple farm animal companion for early utility.",
        targets: ["minecraft:cow", "minecraft:sheep", "minecraft:pig", "minecraft:chicken"],
        tier: 2,
        effects: {}
    },
    {
        name: "ember",
        type: "companion",
        description: "Fast strider companion for Nether travel.",
        targets: ["minecraft:strider"],
        tier: 2,
        effects: { speedMultiplier: 1.5 },
        customEntityId: "ntpp:ember_strider"
    },
    {
        name: "flare",
        type: "companion",
        description: "Regenerating blaze companion with ranged pressure.",
        targets: ["minecraft:blaze"],
        tier: 2,
        effects: { regenPerSeconds: 0.2 },
        customEntityId: "ntpp:flare_blaze"
    },
    {
        name: "risen",
        type: "enemy",
        description: "Tougher undead enemy variant.",
        targets: ["minecraft:zombie", "minecraft:husk"],
        tier: 2,
        effects: {},
        customEntityMap: {
            "minecraft:zombie": "ntpp:risen_zombie",
            "minecraft:husk": "ntpp:risen_husk"
        }
    },
    {
        name: "crawl",
        type: "enemy",
        description: "Spider enemy that poisons targets on hit.",
        targets: ["minecraft:spider", "minecraft:cave_spider"],
        tier: 2,
        effects: { poisonOnHit: true },
        customEntityMap: {
            "minecraft:spider": "ntpp:crawl_spider",
            "minecraft:cave_spider": "ntpp:crawl_cave_spider"
        }
    },
    {
        name: "dusk",
        type: "enemy",
        description: "Fireproof bat enemy that blinds targets.",
        targets: ["minecraft:bat"],
        tier: 2,
        effects: { fireImmune: true, blindnessOnHit: true },
        customEntityId: "ntpp:dusk_bat"
    },
    {
        name: "feral",
        type: "enemy",
        description: "Fireproof predator enemy for animal mobs.",
        targets: ["minecraft:wolf", "minecraft:cat", "minecraft:fox"],
        tier: 2,
        effects: { fireImmune: true },
        customEntityMap: {
            "minecraft:wolf": "ntpp:feral_wolf",
            "minecraft:cat": "ntpp:feral_cat",
            "minecraft:fox": "ntpp:feral_fox"
        }
    },
    {
        name: "azoth",
        type: "companion",
        description: "Regenerating wolf companion with double hit.",
        targets: ["minecraft:wolf"],
        tier: 3,
        effects: { regenPerSeconds: 0.4, doubleHit: true },
        customEntityId: "ntpp:azoth_wolf"
    },
    {
        name: "umbra",
        type: "companion",
        description: "Fireproof skeleton companion that inflicts wither.",
        targets: ["minecraft:skeleton"],
        tier: 3,
        effects: { regenPerSeconds: 0.4, witherOnHit: true, witherAmplifier: 1, fireImmune: true },
        customEntityId: "ntpp:umbra_skeleton"
    },
    {
        name: "pearl",
        type: "companion",
        description: "Axolotl companion that keeps its original variant.",
        targets: ["minecraft:axolotl"],
        tier: 3,
        effects: {},
        preserveVariant: true,
        customEntityId: "ntpp:pearl_axolotl"
    },
    {
        name: "solace",
        type: "companion",
        description: "Frontline zombie companion with custom undead body.",
        targets: ["minecraft:zombie"],
        tier: 3,
        effects: {},
        customEntityId: "ntpp:solace_zombie"
    },
    {
        name: "fury",
        type: "enemy",
        description: "Aggressive vindicator enemy with custom body.",
        targets: ["minecraft:vindicator"],
        tier: 3,
        effects: {},
        customEntityMap: {
            "minecraft:vindicator": "ntpp:fury_vindicator"
        }
    },
    {
        name: "veil",
        type: "enemy",
        description: "Fireproof ranged enemy with bonus damage.",
        targets: ["minecraft:skeleton", "minecraft:stray"],
        tier: 3,
        effects: { fireImmune: true, damageBoost: 3 },
        customEntityMap: {
            "minecraft:skeleton": "ntpp:veil_skeleton",
            "minecraft:stray": "ntpp:veil_stray"
        }
    },
    {
        name: "bane",
        type: "enemy",
        description: "Iron golem enemy with shockwave pressure.",
        targets: ["minecraft:iron_golem"],
        tier: 3,
        effects: {},
        customEntityId: "ntpp:bane_golem"
    },
    {
        name: "gilded",
        type: "enemy",
        description: "Piglin enemy that keeps gear and enrages below half health.",
        targets: ["minecraft:piglin"],
        tier: 3,
        effects: {},
        customEntityId: "ntpp:gilded_piglin",
        preserveEquipment: true
    },
    {
        name: "grim",
        type: "enemy",
        description: "Wither skeleton enemy with stronger wither hits.",
        targets: ["minecraft:wither_skeleton"],
        tier: 3,
        effects: { witherOnHit: true, witherAmplifier: 2 },
        customEntityId: "ntpp:grim_wither_skeleton"
    },
    {
        name: "durandal",
        type: "companion",
        description: "Fireproof wolf companion with regen, resistance, double hit, and lifesteal.",
        targets: ["minecraft:wolf"],
        tier: 4,
        effects: {
            regenPerSeconds: 0.6,
            resistanceAmplifier: 0,
            fireImmune: true,
            doubleHit: true,
            lifestealPercent: 0.3
        },
        customEntityId: "ntpp:durandal_wolf"
    },
    {
        name: "bastion",
        type: "companion",
        description: "Massive golem companion with high health, damage, taunt, and self heal.",
        targets: ["minecraft:iron_golem"],
        tier: 4,
        effects: {
            healthBoost: 120,
            damageBoost: 6,
            fireImmune: true
        },
        customEntityId: "ntpp:bastion_golem"
    },
    {
        name: "oracle",
        type: "companion",
        description: "Flying allay support with bonus health and ally healing.",
        targets: ["minecraft:allay"],
        tier: 4,
        effects: {
            healthBoost: 40
        },
        customEntityId: "ntpp:oracle_allay"
    },
    {
        name: "storm",
        type: "companion",
        description: "Tame wither companion with huge health, regen, resistance, and lightning hits.",
        targets: ["minecraft:wither"],
        tier: 5,
        effects: {
            healthBoost: 220,
            damageBoost: 8,
            regenPerSeconds: 0.8,
            resistanceAmplifier: 1,
            fireImmune: true,
            lightningOnHit: true
        },
        customEntityId: "ntpp:storm_wither"
    },
    {
        name: "tempest",
        type: "companion",
        description: "Fastest fireproof mount that keeps its original look.",
        targets: ["minecraft:horse", "minecraft:donkey", "minecraft:mule"],
        tier: 4,
        effects: {
            speedMultiplier: 2,
            fireImmune: true
        },
        preserveVariant: true,
        preserveMarkVariant: true,
        customEntityMap: {
            "minecraft:horse": "ntpp:tempest_horse",
            "minecraft:donkey": "ntpp:tempest_donkey",
            "minecraft:mule": "ntpp:tempest_mule"
        }
    },
    {
        name: "doom",
        type: "enemy",
        description: "Warden boss enemy with huge damage and phase attacks.",
        targets: ["minecraft:warden"],
        tier: 4,
        effects: {
            damageBoost: 15,
            fireImmune: true
        },
        customEntityId: "ntpp:doom_warden"
    },
    {
        name: "chaos",
        type: "enemy",
        description: "Wither boss enemy with aura, explosions, summons, and phase attacks.",
        targets: ["minecraft:wither"],
        tier: 4,
        effects: {
            fireImmune: true
        },
        customEntityId: "ntpp:chaos_wither"
    },
    {
        name: "hymn",
        type: "companion",
        description: "Resistant fireproof warden companion.",
        targets: ["minecraft:warden"],
        tier: 5,
        effects: {
            fireImmune: true,
            resistanceAmplifier: 1
        },
        customEntityId: "ntpp:hymn_warden"
    },
    {
        name: "excalibur",
        type: "companion",
        description: "Ultimate wolf companion with triple hit, lifesteal, regen, resistance, and bonus damage.",
        targets: ["minecraft:wolf"],
        tier: 5,
        effects: {
            damageBoost: 12,
            regenPerSeconds: 1,
            resistanceAmplifier: 1,
            fireImmune: true,
            tripleHit: true,
            lifestealPercent: 0.4
        },
        customEntityId: "ntpp:excalibur_wolf"
    }
];

export const CONFIG_BY_NAME = new Map<string, NametagConfig>(
    NAMETAG_CONFIGS.map(config => [config.name, config])
);
