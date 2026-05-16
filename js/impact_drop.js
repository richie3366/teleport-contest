// impact_drop.js — dokick.c impact_drop / down_gate / drop_to / obj_delivery subset.
// C ref: dokick.c impact_drop(), down_gate(), drop_to(), obj_delivery();
//        mkobj.c add_to_migration() (queue semantics only).

import { rn1, rn2, rnd } from './rng.js';
import { pline, newsym } from './display.js';
import { cansee } from './vision.js';
import { tAt } from './search.js';
import {
    MIGR_RANDOM,
    MIGR_NOWHERE,
    MIGR_WITH_HERO,
    MIGR_TO_SPECIES,
    MIGR_STAIRS_UP,
    MIGR_LADDER_UP,
    MIGR_SSTAIRS,
    HOLE,
    TRAPDOOR,
    is_hole,
    In_endgame,
    Is_stronghold,
    Is_botlevel,
    Has_contents,
    COLNO,
    ROWNO,
    STONE,
    OTYP_BOULDER,
    ESHK,
    IS_SOFT,
} from './const.js';
import { onLevelLikeC } from './hacklib.js';
import { stairwayAtInGame, stairwayFindFromLikeC } from './decor.js';
import { scatterObjDeliveryScflags0LikeC } from './scatter_obj_delivery.js';
import { breaktestLikeC, breaksObjDeliveryLikeC } from './obj_break_dothrow.js';
import { NH5_COIN_CLASS } from './nh5_objclass.js';
import {
    floorObjKey,
    unlinkFloorObjectInLevel,
    placeFloorObjectInLevel,
    stackObjOnFloorInLevel,
    obliterateObjectInLevel,
} from './floorobj.js';
import { goodposNullMonLikeC } from './walkable.js';
import {
    costlySpot,
    inRoomsShopbaseRoomnos,
    stolenValueMerchBurySilent,
    shknamDisplay,
    hotPursuitShk,
    pickedContainerNoChargeClear,
    shopKeeperForLevlRoomno,
    currencyAmountLikeC,
    angryGuardsSilentLikeC,
} from './shop.js';
import { OBJ_ROCK } from './mthrowu.js';

/** C: `gg.gate_str` during **`down_gate`/`impact_drop`**. */
let gateStrImpactDrop = /** @type {string|null} */ (null);

/** C: **`ok_to_quest()`** — stub **TRUE** until quest gate is ported. */
function okToQuestLikeC(_g) {
    return true;
}

/**
 * C: dokick.c **`down_gate(x,y)`** — **`stairway_at`**, **`qstart_level`/`ok_to_quest`**, seen hole/trapdoor.
 * @returns {{ toloc: number, gateStr: string|null }}
 */
export function downGateAtLikeC(g, x, y) {
    gateStrImpactDrop = null;
    const xi = x | 0;
    const yi = y | 0;
    const u = g.u;
    const ql = g.qstartLevel;
    if (ql && u?.uz && onLevelLikeC(u.uz, ql) && !okToQuestLikeC(g)) {
        return { toloc: MIGR_NOWHERE, gateStr: null };
    }
    const stway = stairwayAtInGame(g, xi, yi);
    if (stway && !stway.up && !stway.isladder) {
        gateStrImpactDrop = 'down the stairs';
        const uz = u?.uz;
        const tv = stway.tolev;
        const toloc =
            tv && uz && (tv.dnum | 0) === (uz.dnum | 0) ? MIGR_STAIRS_UP : MIGR_SSTAIRS;
        return { toloc, gateStr: gateStrImpactDrop };
    }
    if (stway && !stway.up && stway.isladder) {
        gateStrImpactDrop = 'down the ladder';
        return { toloc: MIGR_LADDER_UP, gateStr: gateStrImpactDrop };
    }
    const ttmp = tAt(xi, yi);
    if (ttmp && ttmp.tseen && is_hole(ttmp.ttyp | 0)) {
        gateStrImpactDrop =
            (ttmp.ttyp | 0) === TRAPDOOR ? 'through the trap door' : 'through the hole';
        return { toloc: MIGR_RANDOM, gateStr: gateStrImpactDrop };
    }
    return { toloc: MIGR_NOWHERE, gateStr: null };
}

/**
 * C: dokick.c **`drop_to(cc, loc, x, y)`** — **`cc.x`/`cc.y`** hold **`dnum`/`dlevel`** destination.
 * @returns {{ dnum: number, dlevel: number } | null}
 */
export function dropToDestLikeC(g, loc, _x, _y) {
    void _x;
    void _y;
    const u = g.u;
    if (!u?.uz) return null;
    const uz = u.uz;
    if (loc === MIGR_NOWHERE) return null;
    if (loc === MIGR_RANDOM || loc === MIGR_STAIRS_UP || loc === MIGR_LADDER_UP || loc === MIGR_SSTAIRS) {
        if (Is_stronghold(uz)) {
            const vl = g.valley_level;
            if (vl && vl.dnum != null && vl.dlevel != null) {
                return { dnum: vl.dnum | 0, dlevel: vl.dlevel | 0 };
            }
        }
        if (In_endgame(uz) || Is_botlevel(uz)) return { dnum: 0, dlevel: 0 };
        return { dnum: uz.dnum | 0, dlevel: (uz.dlevel | 0) + 1 };
    }
    return null;
}

function extractObjFromFloorLikeC(g, otmp) {
    unlinkFloorObjectInLevel(g, otmp);
    const arr = g.level?.objects;
    if (arr) {
        const i = arr.indexOf(otmp);
        if (i >= 0) arr.splice(i, 1);
    }
}

/**
 * C: teleport.c **`rloco(obj)`** tail + dokick.c **`obj_delivery`** **`breaktest`** (**`flooreffects`** omitted).
 * @returns {Promise<void>}
 */
async function rlocoObjDeliverySubsetLikeC(g, obj, nobreak) {
    obj.ox = 0;
    obj.oy = 0;
    let tryLimit = 4000;
    let tx = 2;
    let ty = 0;
    do {
        tx = rn1(COLNO - 3, 2);
        ty = rn2(ROWNO);
        if (!--tryLimit) break;
    } while (!goodposNullMonLikeC(tx, ty, g));
    placeFloorObjectInLevel(g, obj, tx, ty);
    stackObjOnFloorInLevel(g, obj);
    if (!nobreak && breaktestLikeC(g, obj)) {
        obliterateObjectInLevel(g, obj);
        newsym(tx, ty);
        return;
    }
    newsym(tx, ty);
}

/**
 * C: dokick.c **`obj_delivery(near_hero)`** — **`stairway_find_from`**, **`IS_SOFT`**, **`breaktest`/`breaks`**,
 * **`scatter`** with **`rnd(2)`**, **`rloco`** (full **`potionbreathe`**, **`angry_guards`**, **`currency`** still TODO).
 * @param {import('./gstate.js').game} g
 * @param {boolean} nearHero — C **`near_hero`**
 */
export async function objDeliveryLikeC(g, nearHero) {
    const u = g.u;
    const list = g.migratingObjs;
    if (!list?.length || !u?.uz) return;

    const dnu = u.uz.dnum | 0;
    const dlu = u.uz.dlevel | 0;
    /** @type {typeof list} */
    const remain = [];

    for (const e of [...list]) {
        const { obj, targetDnum, targetDlevel, toloc, omigrFromDnum, omigrFromDlevel } = e;
        if (!obj) continue;
        if ((targetDnum | 0) !== dnu || (targetDlevel | 0) !== dlu) {
            remain.push(e);
            continue;
        }
        let whereRaw = toloc | 0;
        if ((whereRaw & MIGR_TO_SPECIES) !== 0) {
            remain.push(e);
            continue;
        }
        const nobreak = (whereRaw & 1024) !== 0;
        const noscatter = (whereRaw & MIGR_WITH_HERO) !== 0;
        let where = whereRaw & ~(1024 | 2048);
        if ((!!nearHero) === (where === MIGR_WITH_HERO)) {
            remain.push(e);
            continue;
        }

        let nx = 0;
        let ny = 0;
        let isladderFind = false;
        if (where === MIGR_LADDER_UP) isladderFind = true;
        if (where === MIGR_STAIRS_UP || where === MIGR_SSTAIRS || where === MIGR_LADDER_UP) {
            const stw = stairwayFindFromLikeC(g, {
                dnum: omigrFromDnum ?? dnu,
                dlevel: omigrFromDlevel ?? dlu,
            }, isladderFind);
            if (stw) {
                nx = stw.sx | 0;
                ny = stw.sy | 0;
            }
        } else if (where === MIGR_WITH_HERO) {
            nx = u.ux | 0;
            ny = u.uy | 0;
        } else {
            nx = 0;
            ny = 0;
        }

        if (nx > 0 && ny > 0) {
            const loc = g.level?.at(nx, ny);
            const ltyp = loc ? loc.typ | 0 : STONE;
            placeFloorObjectInLevel(g, obj, nx, ny);
            stackObjOnFloorInLevel(g, obj);
            if (!nobreak && !IS_SOFT(ltyp)) {
                if (where === MIGR_WITH_HERO) {
                    if (await breaksObjDeliveryLikeC(g, obj, nx, ny)) continue;
                } else if (breaktestLikeC(g, obj)) {
                    obliterateObjectInLevel(g, obj);
                    newsym(nx, ny);
                    continue;
                }
            }
            if (!noscatter) scatterObjDeliveryScflags0LikeC(g, nx, ny, rnd(2), obj);
            else newsym(nx, ny);
        } else {
            await rlocoObjDeliverySubsetLikeC(g, obj, nobreak);
        }
    }
    g.migratingObjs = remain;
}

/**
 * C: dokick.c **`impact_drop(missile, x, y, dlev)`**.
 * @param {import('./gstate.js').game} g
 * @param {object|null} missile
 * @param {number} x
 * @param {number} y
 * @param {number} dlev — **0** normal migration; non-zero ⇒ **`MIGR_WITH_HERO`** (**`goto_level`** falling).
 */
export async function impactDropLikeC(g, missile, x, y, dlev) {
    const xh = x | 0;
    const yh = y | 0;
    const k = floorObjKey(xh, yh);
    const head0 = g.level?.floorObjHeads?.get(k);
    if (!head0) return;

    const dg = downGateAtLikeC(g, xh, yh);
    let toloc = dg.toloc;
    const gateStr0 = dg.gateStr;
    const cc = dropToDestLikeC(g, toloc, xh, yh);
    if (!cc || (cc.dlevel | 0) === 0) return;

    let destDnum = cc.dnum | 0;
    let destDlevel = cc.dlevel | 0;
    if (dlev) {
        toloc = MIGR_WITH_HERO;
        destDlevel = dlev | 0;
    }

    const costly = costlySpot(g, xh, yh);
    let shkp = null;
    let debit = 0;
    let robbed = 0;
    let angry = false;
    if (costly) {
        const rnos = inRoomsShopbaseRoomnos(g, xh, yh);
        if (rnos.length) shkp = shopKeeperForLevlRoomno(g, rnos[0] | 0);
        if (shkp) {
            const e = ESHK(shkp);
            debit = e?.debit | 0;
            robbed = e?.robbed | 0;
            angry = !(shkp.mpeaceful | 0);
        }
    }

    const isrock = !!(missile && (missile.otyp | 0) === OBJ_ROCK);
    let oct = 0;
    let dct = 0;
    let price = 0;
    const u = g.u;
    const uball = g.uball;
    const uchain = g.uchain;

    if (!g.migratingObjs) g.migratingObjs = [];

    for (let obj = head0, obj2; obj; obj = obj2) {
        obj2 = obj.nexthere;
        if (obj === missile) continue;
        oct += obj.quan | 0;
        if (obj === uball || obj === uchain) continue;
        if ((isrock && (obj.otyp | 0) === OTYP_BOULDER) || rn2((obj.otyp | 0) === OTYP_BOULDER ? 30 : 3)) {
            continue;
        }

        extractObjFromFloorLikeC(g, obj);

        if (costly) {
            price += await stolenValueMerchBurySilent(g, obj, xh, yh, shkp, true);
            if (Has_contents(obj)) pickedContainerNoChargeClear(obj);
            if ((obj.oclass | 0) !== NH5_COIN_CLASS) obj.no_charge = 0;
        }

        const uzSrc = u.uz ? { dnum: u.uz.dnum | 0, dlevel: u.uz.dlevel | 0 } : { dnum: 0, dlevel: 0 };
        g.migratingObjs.unshift({
            obj,
            targetDnum: destDnum,
            targetDlevel: destDlevel,
            toloc,
            omigrFromDnum: uzSrc.dnum,
            omigrFromDlevel: uzSrc.dlevel,
        });
        dct += obj.quan | 0;
    }

    const gs = gateStr0 || gateStrImpactDrop;
    if (dct && cansee(xh, yh) && gs) {
        const what = dct === 1 ? 'object falls' : 'objects fall';
        if (missile) {
            const mid =
                dct === oct ? 'the ' : dct === 1 ? 'an' : '';
            await pline(`From the impact, ${mid}other ${what}.`);
        } else if (oct === dct) {
            const pref = dct === 1 ? 'The' : 'All the';
            await pline(`${pref} adjacent ${what} ${gs}.`);
        } else {
            const pref = dct === 1 ? 'One of the' : 'Some of the';
            const w2 = dct === 1 ? 'objects falls' : what;
            await pline(`${pref} adjacent ${w2} ${gs}.`);
        }
    }

    if (costly && shkp && price > 0) {
        const e = ESHK(shkp);
        const robbed2 = e?.robbed | 0;
        if (robbed2 > robbed) {
            await pline(`You removed ${price} ${currencyAmountLikeC(g, price)} worth of goods!`);
            if (cansee(shkp.mx | 0, shkp.my | 0)) {
                const cust = e?.customer ? String(e.customer) : '';
                if (!cust) {
                    const pn = g.plname ? String(g.plname) : 'Player';
                    if (e) e.customer = pn.slice(0, 36);
                }
                if (angry) await pline(`${shknamDisplay(shkp)} is infuriated!`);
                else await pline(`"${g.plname || 'Player'}, you are a thief!"`);
            } else {
                await pline('You hear a scream, "Thief!"');
            }
            await hotPursuitShk(g, shkp);
            await angryGuardsSilentLikeC(g, false);
            return;
        }
        const debit2 = e?.debit | 0;
        if (debit2 > debit) {
            const amt = debit2 - debit;
            await pline(
                `You owe ${shknamDisplay(shkp)} ${amt} ${currencyAmountLikeC(g, amt)} for goods lost.`,
            );
        }
    }
}
