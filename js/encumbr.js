// encumbr.js — Carry capacity tier for botl / enlightenment.
// C ref: hack.h encumbrance_types, hack.c near_capacity(), botl.c enc_stat[],
// cmd.c (encumbrance enlight).

import { game } from './gstate.js';

export const ENC = {
    UNENCUMBERED: 0,
    SLT_ENCUMBER: 1,
    MOD_ENCUMBER: 2,
    HVY_ENCUMBER: 3,
    EXT_ENCUMBER: 4,
    OVERLOADED: 5,
};

/** C: botl.c enc_stat[] — index matches ENC (0 unused). */
const ENC_WORD = ['', 'burdened', 'stressed', 'strained', 'overtaxed', 'overloaded'];

/**
 * C: hack.c near_capacity(void) — full weight/invent port TODO; reads stub u field.
 * @returns {number}
 */
export function nearCapacity() {
    return game.u?.near_capacity ?? 0;
}

/**
 * @param {number} [cap] — u.near_capacity result (0 = unencumbered)
 * @param {boolean} [final] — past tense like C enlightenment `final`
 */
export function enlightEncumbranceLine(cap, final = false) {
    const c = cap == null || cap <= 0 ? ENC.UNENCUMBERED : Math.min(cap, ENC.OVERLOADED);
    if (c === ENC.UNENCUMBERED) return '  You are unencumbered.';
    const word = ENC_WORD[c] || 'burdened';
    const adj = c === ENC.SLT_ENCUMBER ? 'slightly'
        : c === ENC.MOD_ENCUMBER ? 'moderately'
            : c === ENC.HVY_ENCUMBER ? 'very'
                : c === ENC.EXT_ENCUMBER ? 'extremely'
                    : 'not possible';
    const verb = final ? 'was' : 'is';
    const slow = c < ENC.OVERLOADED ? ' slowed' : '';
    return `  You are ${word}; movement ${verb} ${adj}${slow}.`;
}
