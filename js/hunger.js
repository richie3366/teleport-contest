// hunger.js — Hero hunger state for UI / enlightenment.
// C ref: hack.h (hunger_state_types), eat.c hu_stat, cmd.c enlightenment.

/** C: hunger_state_types (hack.h) */
export const UHS = {
    SATIATED: 0,
    NOT_HUNGRY: 1,
    HUNGRY: 2,
    WEAK: 3,
    FAINTING: 4,
    FAINTED: 5,
    STARVED: 6,
};

/**
 * C: eat.c newuhs — map u.uhunger to u.uhs (thresholds only; no faint / pline).
 * @param {number} uh
 * @returns {number} UHS.*
 */
export function uhsFromUhunger(uh) {
    const h = uh | 0;
    if (h > 1000) return UHS.SATIATED;
    if (h > 150) return UHS.NOT_HUNGRY;
    if (h > 50) return UHS.HUNGRY;
    if (h > 0) return UHS.WEAK;
    return UHS.FAINTING;
}

/** @param {number | undefined} uhs */
export function enlightHungerLine(uhs) {
    const h = uhs ?? UHS.NOT_HUNGRY;
    switch (h) {
        case UHS.SATIATED:
            return '  You are satiated.';
        case UHS.NOT_HUNGRY:
            return "  You aren't hungry.";
        case UHS.HUNGRY:
            return '  You are hungry.';
        case UHS.WEAK:
            return '  You are weak from hunger.';
        case UHS.FAINTING:
            return '  You are faint from lack of food.';
        case UHS.FAINTED:
            return '  You have fainted from lack of food.';
        case UHS.STARVED:
            return '  You are starving.';
        default:
            return "  You aren't hungry.";
    }
}
