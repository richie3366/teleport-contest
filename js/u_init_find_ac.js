// u_init_find_ac.js — Hero armor class from form + worn gear (C find_ac / ARM_BONUS subset).
// C ref: do_wear.c find_ac(); hack.h ARM_BONUS(); obj.h greatest_erosion()

import { game } from './gstate.js';
import { permonstHuman } from './mondata.js';
import {
    OTYP_AMULET_OF_GUARDING,
    OTYP_RIN_PROTECTION,
} from './const.js';

const AC_MAX = 99;

/**
 * C `objects[].a_ac` for armor the port actually wears in JS (NH5 `objects_nums` `otyp`).
 * From objects.h `ARMOR` → OBJECT `10 - ac` in oc_oc1. Extend when new otyps are equipped.
 * @type {ReadonlyMap<number, number>}
 */
const OBJECTS_A_AC_ARMOR = new Map([
    [134, 2], /* LEATHER_ARMOR — ac 8 → a_ac 2 */
]);

/**
 * C: obj.h **`greatest_erosion(otmp)`** — max of rust/burn vs corr/rot counters.
 * @param {{ oeroded?: number, oeroded2?: number } | null | undefined} obj
 */
function greatestErosionLikeC(obj) {
    if (!obj) return 0;
    const a = obj.oeroded | 0;
    const b = obj.oeroded2 | 0;
    return a > b ? a : b;
}

/**
 * C: hack.h **`ARM_BONUS(obj)`** — `a_ac + spe - min(greatest_erosion, a_ac)`.
 * @param {{ otyp?: number, spe?: number, oeroded?: number, oeroded2?: number } | null | undefined} obj
 */
export function armBonusLikeC(obj) {
    if (!obj) return 0;
    const otyp = obj.otyp | 0;
    const aAc = OBJECTS_A_AC_ARMOR.get(otyp);
    if (aAc === undefined) {
        /* C uses objects[otyp].a_ac; unknown here — treat as 0 (non-armor / not tabulated). */
        return 0;
    }
    const spe = obj.spe | 0;
    const ge = greatestErosionLikeC(obj);
    return aAc + spe - Math.min(ge, aAc);
}

/**
 * C: do_wear.c **`find_ac`**
 * @param {import('./gstate.js').game} [g]
 */
export function findAc(g = game) {
    const u = g.u;
    if (!u) return;

    const pm = g.urace?.permonst ?? g.youmonst?.data ?? permonstHuman;
    let uac = /** @type {{ ac?: number }} */ (pm).ac ?? 10;

    const armorSlots = ['uarm', 'uarmc', 'uarmh', 'uarmf', 'uarms', 'uarmg', 'uarmu'];
    for (let i = 0; i < armorSlots.length; i++) {
        const o = u[armorSlots[i]];
        if (o) uac -= armBonusLikeC(o);
    }

    /* C find_ac — protection rings use enchantment only (not full ARM_BONUS). */
    if (u.uleft && (u.uleft.otyp | 0) === OTYP_RIN_PROTECTION) uac -= u.uleft.spe | 0;
    if (u.uright && (u.uright.otyp | 0) === OTYP_RIN_PROTECTION) uac -= u.uright.spe | 0;
    if (u.uamul && (u.uamul.otyp | 0) === OTYP_AMULET_OF_GUARDING) uac -= 2;

    /* C: if (HProtection & INTRINSIC) uac -= u.ublessed; — not modeled in JS yet */
    uac -= u.uspellprot | 0;

    if (Math.abs(uac) > AC_MAX) uac = Math.sign(uac) * AC_MAX;

    if (uac !== u.uac) {
        u.uac = uac;
        g.disp = g.disp || {};
        g.disp.botl = true;
    }
}
