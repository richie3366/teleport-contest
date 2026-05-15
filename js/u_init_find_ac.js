// u_init_find_ac.js — Naked hero armor class (worn gear stubbed).
// C ref: do_wear.c find_ac()

import { game } from './gstate.js';
import { permonstHuman } from './mondata.js';

const AC_MAX = 99;

export function findAc() {
    const u = game.u;
    if (!u) return;
    const pm = game.urace?.permonst ?? game.youmonst?.data ?? permonstHuman;
    let uac = /** @type {{ ac?: number }} */ (pm).ac ?? 10;
    /* C: uarm / uarmc / … — not ported; u.ublessed / uspellprot / HProtection — stub */
    if (Math.abs(uac) > AC_MAX) uac = Math.sign(uac) * AC_MAX;
    u.uac = uac;
}
