import { Entity } from "@minecraft/server";
import { forEachTaggedEntity } from "../utils/forEachTaggedEntity";

interface AuraConfig {
    readonly tag: string;
    readonly affectCompanions?: boolean;
    readonly effects: ReadonlyArray<{
        readonly effect: string;
        readonly duration: number;
        readonly amplifier: number;
    }>;
}

const AURA_CONFIGS: readonly AuraConfig[] = [
    { tag: "ntpp:tide", affectCompanions: true, effects: [{ effect: "regeneration", duration: 600, amplifier: 0 }] },
    { tag: "ntpp:pearl", affectCompanions: true, effects: [{ effect: "regeneration", duration: 900, amplifier: 1 }] },
    { tag: "ntpp:solace", affectCompanions: true, effects: [{ effect: "absorption", duration: 900, amplifier: 1 }] },
    { tag: "ntpp:typhoon", affectCompanions: true, effects: [{ effect: "speed", duration: 900, amplifier: 0 }] },
    { tag: "ntpp:tempest", affectCompanions: true, effects: [{ effect: "speed", duration: 1200, amplifier: 1 }] },
    { tag: "ntpp:bastion", affectCompanions: true, effects: [{ effect: "resistance", duration: 1200, amplifier: 0 }] },
    {
        tag: "ntpp:hymn",
        affectCompanions: true,
        effects: [
            { effect: "resistance", duration: 1200, amplifier: 1 },
            { effect: "regeneration", duration: 1200, amplifier: 2 },
            { effect: "absorption", duration: 1200, amplifier: 2 }
        ]
    }
];

function applyAuraEffect(entity: Entity, aura: AuraConfig): void {
    const nearbyPlayers = entity.dimension.getPlayers({
        location: entity.location,
        maxDistance: 10
    });

    for (const player of nearbyPlayers) {
        if (!player?.isValid) continue;

        for (const effect of aura.effects) {
            player.addEffect(effect.effect, effect.duration, {
                amplifier: effect.amplifier,
                showParticles: false
            });
        }
    }

    if (!aura.affectCompanions) return;

    const nearbyCompanions = entity.dimension.getEntities({
        location: entity.location,
        maxDistance: 10,
        tags: ["ntpp:companion"]
    });

    for (const companion of nearbyCompanions) {
        if (!companion?.isValid) continue;

        for (const effect of aura.effects) {
            companion.addEffect(effect.effect, effect.duration, {
                amplifier: effect.amplifier,
                showParticles: false
            });
        }
    }
}

export function applyAuraForEntity(entity: Entity): void {
    if (!entity?.isValid) return;

    for (const aura of AURA_CONFIGS) {
        if (!entity.hasTag(aura.tag)) continue;

        applyAuraEffect(entity, aura);
        return;
    }
}

export function applyAuraPulse(): void {
    for (const aura of AURA_CONFIGS) {
        forEachTaggedEntity(aura.tag, (entity) => applyAuraEffect(entity, aura));
    }
}
