// burn_floor_objects.js — Floor scrolls / books / slime glob burn + ignite (zap.c subset).
// C ref: zap.c burn_floor_objects(); trap.c dofiretrap() tail (see_it, u_caused TRUE).

import { game } from './gstate.js';
import { rn2 } from './rng.js';
import { pline } from './display.js';
import { floorObjKey, unlinkFloorObject } from './floorobj.js';
import { igniteItemsChain } from './ignite_items.js';
import { nh5HeroObjectClass } from './water_damage.js';
import { NH5_FOOD_CLASS, NH5_SCROLL_CLASS, NH5_SPBOOK_CLASS } from './nh5_objclass.js';
import { OC_SKILL_ROW_BY_OTYP } from './obj_oc_skill_data.js';

const OTYP_SCR_FIRE = 338;
const OTYP_SPE_FIREBALL = 368;
/** NH5 `include/objects.h` enum order — `GLOB_OF_GREEN_SLIME`. */
const OTYP_GLOB_OF_GREEN_SLIME = 263;

function phraseTyp(obj) {
    const row = OC_SKILL_ROW_BY_OTYP.get(obj.otyp | 0);
    if (row) return row.name.toLowerCase().replace(/_/g, ' ');
    return 'item';
}

/** C: xname-ish label for burn plines (floor at hero). */
function burnPhrase(obj) {
    const oc = nh5HeroObjectClass(obj);
    if (oc === NH5_SCROLL_CLASS) return 'scroll';
    if (oc === NH5_SPBOOK_CLASS) return 'spellbook';
    if ((obj.otyp | 0) === OTYP_GLOB_OF_GREEN_SLIME) return 'glob of green slime';
    return phraseTyp(obj);
}

/** C: obj.c obj_resists — stub false until full port. */
function objResistsFireStub(_obj, _ac, _pct) {
    void _obj;
    void _ac;
    void _pct;
    return false;
}

/**
 * @param {{ oclass?: number, otyp?: number }} obj
 * @returns {boolean}
 */
function burnableFloorObj(obj) {
    const t = obj.otyp | 0;
    if (t === OTYP_SCR_FIRE || t === OTYP_SPE_FIREBALL) return false;
    if (objResistsFireStub(obj, 2, 100)) return false;
    const oc = nh5HeroObjectClass(obj);
    if (oc === NH5_SCROLL_CLASS || oc === NH5_SPBOOK_CLASS) return true;
    if (oc === NH5_FOOD_CLASS && t === OTYP_GLOB_OF_GREEN_SLIME) return true;
    return false;
}

/**
 * @param {typeof game} g
 * @param {object} otmp
 */
function removeFloorObjFromLevel(g, otmp) {
    unlinkFloorObject(otmp);
    const arr = g.level?.objects;
    if (arr) {
        const i = arr.indexOf(otmp);
        if (i >= 0) arr.splice(i, 1);
    }
}

/**
 * C: zap.c burn_floor_objects(x, y, give_feedback, u_caused) — **`useupf`** approximated as
 * stack shrink / **`delobj`** (no shop billing).
 * @param {typeof game} [g]
 * @param {number} x
 * @param {number} y
 * @param {boolean} giveFeedback
 * @param {boolean} uCaused
 * @returns {Promise<number>} count burned (C return; **`ignite_items`** does not add)
 */
export async function burnFloorObjects(g = game, x, y, giveFeedback, uCaused) {
    void uCaused;
    const lvl = g.level;
    if (!lvl?.floorObjHeads) return 0;
    const k = floorObjKey(x, y);
    let cnt = 0;

    for (let obj = lvl.floorObjHeads.get(k) ?? null; obj; ) {
        const obj2 = obj.nexthere ?? null;
        if (burnableFloorObj(obj)) {
            const scrquan = obj.quan ?? 1;
            let delquan = 0;
            for (let i = scrquan; i > 0; i--) {
                if (!rn2(3)) delquan++;
            }
            if (delquan) {
                if (giveFeedback) {
                    const base = burnPhrase(obj);
                    if (delquan > 1) {
                        if ((obj.otyp | 0) === OTYP_GLOB_OF_GREEN_SLIME)
                            await pline(`${delquan} globs of green slime burn.`);
                        else await pline(`${delquan} ${base}s burn.`);
                    } else await pline(`Your ${base} burns.`);
                }
                if (delquan >= scrquan) {
                    removeFloorObjFromLevel(g, obj);
                } else {
                    obj.quan = scrquan - delquan;
                }
                cnt += delquan;
            }
        }
        obj = obj2;
    }

    const head = lvl.floorObjHeads.get(k) ?? null;
    await igniteItemsChain(g, head, { here: true });
    return cnt;
}
