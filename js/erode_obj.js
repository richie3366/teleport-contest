// erode_obj.js — trap.c erode_obj() subset (hero, AD_FIRE / burn) + burnarmor(&youmonst).
// C ref: trap.c erode_obj(), burnarmor(); mkobj.c is_flammable(); include/objclass.h materials.

import { game } from './gstate.js';
import { pline } from './display.js';
import { rn2, rnl } from './rng.js';
import { MAX_ERODE, FIRE_RES } from './const.js';
import { ER_NOTHING, ER_DAMAGED } from './water_damage.js';
import { updateInventory } from './invent.js';

/** @see include/objclass.h `enum obj_material_types` (subset). */
const MAT_LIQUID = 1;
const MAT_WOOD = 8;
const MAT_PLASTIC = 18;

const OTYP_TALLOW_CANDLE = 225;
const OTYP_WAX_CANDLE = 226;

/**
 * C: mkobj.c is_flammable() — no **`objects[]`** table in JS; uses **`obj.oc_material`** when set.
 * @param {{ otyp?: number, oc_material?: number, oc_oprop?: number } | null | undefined} obj
 */
export function isFlammable(obj) {
    if (!obj) return false;
    const t = obj.otyp | 0;
    if (t === OTYP_TALLOW_CANDLE || t === OTYP_WAX_CANDLE) return false;
    if ((obj.oc_oprop | 0) === FIRE_RES) return false;
    const mat = obj.oc_material | 0;
    if (!mat) return false;
    return (mat <= MAT_WOOD && mat !== MAT_LIQUID) || mat === MAT_PLASTIC;
}

/**
 * C: trap.c **`inventory_resistance_check(AD_FIRE)`** — not ported.
 * @param {typeof game} _g
 */
async function inventoryResistanceFireCheckStub(_g) {
    void _g;
    return false;
}

/**
 * C: trap.c erode_obj — primary erosion (**`oeroded`**) for **`ERODE_BURN`**.
 * @param {object} otmp
 * @param {string} ostr
 * @param {typeof game} [g]
 * @returns {Promise<number>} **`ER_*`** from **`water_damage.js`**
 */
export async function erodeObjBurnHero(otmp, ostr, g = game) {
    if (!otmp) return ER_NOTHING;
    if (await inventoryResistanceFireCheckStub(g)) return ER_NOTHING;

    const vulnerable = isFlammable(otmp);
    const erosion = otmp.oeroded | 0;
    const ostrFinal = ostr || 'item';

    if (!vulnerable || ((otmp.oerodeproof | 0) && (otmp.rknown | 0))) return ER_NOTHING;
    if ((otmp.oerodeproof | 0) || ((otmp.blessed | 0) && !rnl(4))) {
        if ((otmp.oerodeproof | 0)) {
            otmp.rknown = 1;
            updateInventory();
        }
        return ER_NOTHING;
    }
    if (erosion < MAX_ERODE) {
        const adverb = erosion + 1 === MAX_ERODE ? ' completely' : erosion ? ' further' : '';
        await pline(`Your ${ostrFinal} smoulders${adverb}!`);
        otmp.oeroded = erosion + 1;
        updateInventory();
        return ER_DAMAGED;
    }
    return ER_NOTHING;
}

/** @param {typeof game} g @param {object | null | undefined} item @param {string} ostr */
async function burnDmg(g, item, ostr) {
    const r = await erodeObjBurnHero(item, ostr, g);
    return r !== ER_NOTHING;
}

/**
 * C: trap.c burnarmor(&youmonst) — towel **`dry_a_towel`** loop not ported (no RNG when no towels).
 * Return **true** only from **`rn2(5)===1`** branch (always), matching C **`||` short-circuit** with **`rn2(3)`** in **`dofiretrap`**.
 * @param {typeof game} [g]
 * @returns {Promise<boolean>}
 */
export async function burnarmorYoumonst(g = game) {
    const u = g.u;
    if (!u) return false;

    for (;;) {
        switch (rn2(5)) {
            case 0: {
                const item = u.uarmh;
                const descr = 'helmet';
                if (!(await burnDmg(g, item, descr))) continue;
                break;
            }
            case 1: {
                let item = u.uarmc;
                if (item) {
                    await burnDmg(g, item, 'cloak');
                    return true;
                }
                item = u.uarm;
                if (item) {
                    await burnDmg(g, item, 'armor');
                    return true;
                }
                item = u.uarmu;
                if (item) await burnDmg(g, item, 'shirt');
                return true;
            }
            case 2: {
                if (!(await burnDmg(g, u.uarms, 'wooden shield'))) continue;
                break;
            }
            case 3: {
                if (!(await burnDmg(g, u.uarmg, 'gloves'))) continue;
                break;
            }
            case 4: {
                if (!(await burnDmg(g, u.uarmf, 'boots'))) continue;
                break;
            }
            default:
                break;
        }
        break;
    }
    return false;
}
