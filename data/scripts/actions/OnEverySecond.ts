import { updateTransformedMobEffects } from '../effectsHandler';
import { applyExcaliburLeapStrikePulse } from "../mechanics/ExcaliburLeapStrike";
import { showDebugOverlay } from "../debug/ShowDebugOverlay";
import { advanceGuidebookTutorial } from "../guidebook/AdvanceGuidebookTutorial";

export function onEverySecond(): void {
    updateTransformedMobEffects();
    applyExcaliburLeapStrikePulse();
    showDebugOverlay();
    advanceGuidebookTutorial();
}
