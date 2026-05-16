// eat_hunger.js — eat.c / hack.c hunger helpers not tied to the moveloop gethungry tail.
// C ref: eat.c morehungry, lesshungry; hack.c overexertion, overexert_hp.

import { game } from './gstate.js';
import { gethungry } from './moveloop_aux.js';
import { nearCapacity, ENC } from './encumbr.js';
import { exercise } from './attrib.js';
import { fallAsleep } from './timeout.js';
import { A_CON } from './const.js';
import { collectNewuhsPlines } from './hunger.js';

/** C: hack.c overexert_hp(void) — HP drain or pass out + sleep. @returns {string[]} plines */
function overexertHpPlines() {
    const u = game.u;
    if (!u) return [];
    const poly = u.Upolyd | 0;
    if (!poly) {
        const hp = u.uhp | 0;
        if (hp > 1) {
            u.uhp = hp - 1;
            return [];
        }
    } else {
        if (u.mh == null) return []; /* poly HP not wired — skip until u.mh tracks monster form */
        const mh = u.mh | 0;
        if (mh > 1) {
            u.mh = mh - 1;
            return [];
        }
    }
    const plines = ['You pass out from exertion!'];
    exercise(A_CON, false);
    fallAsleep(-10, false);
    return plines;
}

/**
 * C: hack.c overexertion(void) — extra gethungry from combat exertion; then maybe overexert_hp.
 * Call from do_attack / uhitm when melee is ported (not on every domove / moveloop tick).
 * @returns {{ plines: string[], multiNegative: boolean }}
 */
export function overexertion() {
    gethungry();
    const plines = [];
    const g = game;
    const moves = g.moves | 0;
    if ((moves % 3) !== 0 && nearCapacity() >= ENC.HVY_ENCUMBER) plines.push(...overexertHpPlines());
    return { plines, multiNegative: (g.multi | 0) < 0 };
}

/** C: eat.c morehungry(int num) — @returns {string[]} newuhs(TRUE) plines */
export function applyMorehungry(num) {
    const u = game.u;
    if (!u || typeof u.uhunger !== 'number') return [];
    u.uhunger -= num | 0;
    return collectNewuhsPlines(true);
}

/**
 * C: eat.c lesshungry(int num) — choke / fullwarn paths TODO; newuhs(FALSE).
 * @returns {string[]}
 */
export function applyLesshungry(num) {
    const u = game.u;
    if (!u || typeof u.uhunger !== 'number') return [];
    u.uhunger += num | 0;
    /* C: uhunger >= 2000 choke, >= 1500 fullwarn — not ported */
    return collectNewuhsPlines(false);
}
