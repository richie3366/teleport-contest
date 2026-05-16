// impact_drop.js — dokick.c impact_drop / down_gate / drop_to / obj_delivery subset.
// C ref: dokick.c impact_drop(), down_gate(), drop_to(), obj_delivery();
//        mkobj.c add_to_migration() (queue semantics only).

import { rn2, rnd } from './rng.js';
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
    isok,
    OTYP_BOULDER,
    ESHK,
} from './const.js';
import { NH5_COIN_CLASS } from './nh5_objclass.js';
import { floorObjKey, unlinkFloorObjectInLevel, placeFloorObjectInLevel, stackObjOnFloorInLevel } from './floorobj.js';
import { goodposHero } from './walkable.js';
import {
    costlySpot,
    inRoomsShopbaseRoomnos,
    stolenValueMerchBurySilent,
    shknamDisplay,
    hotPursuitShk,
    pickedContainerNoChargeClear,
    shopKeeperForLevlRoomno,
} from './shop.js';
import { OBJ_ROCK } from './mthrowu.js';

/** C: `gg.gate_str` during **`down_gate`/`impact_drop`**. */
let gateStrImpactDrop = /** @type {string|null} */ (null);

/**
 * C: dokick.c **`down_gate(x,y)`** — subset (**`stairway_at`** omitted; **`qstart_level`** omitted).
 * @returns {{ toloc: number, gateStr: string|null }}
 */
export function downGateAtLikeC(g, x, y) {
    gateStrImpactDrop = null;
    const xi = x | 0;
    const yi = y | 0;
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

function rndScatterSpotLikeC(g) {
    const u = g.u;
    if (!u) return { x: 1, y: 1 };
    for (let t = 0; t < 120; t++) {
        const x = rn2(Math.max(1, COLNO - 2)) + 1;
        const y = rn2(Math.max(1, ROWNO - 2)) + 1;
        if (!isok(x, y)) continue;
        if (goodposHero(x, y, g)) return { x, y };
    }
    return { x: u.ux | 0, y: u.uy | 0 };
}

/**
 * C: dokick.c **`obj_delivery(near_hero)`** — subset (**`breaktest`/`scatter`/`stairway_find_from`** omitted).
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
        const { obj, targetDnum, targetDlevel, toloc } = e;
        if (!obj) continue;
        if ((targetDnum | 0) !== dnu || (targetDlevel | 0) !== dlu) {
            remain.push(e);
            continue;
        }
        let where = toloc | 0;
        if ((where & MIGR_TO_SPECIES) !== 0) {
            remain.push(e);
            continue;
        }
        const noscatter = (where & MIGR_WITH_HERO) !== 0;
        where &= ~(1024 | 2048); /* MIGR_NOBREAK | MIGR_NOSCATTER */
        if ((!!nearHero) === (where === MIGR_WITH_HERO)) {
            remain.push(e);
            continue;
        }

        let nx = 0;
        let ny = 0;
        if (where === MIGR_WITH_HERO) {
            nx = u.ux | 0;
            ny = u.uy | 0;
        } else if (where === MIGR_RANDOM) {
            const p = rndScatterSpotLikeC(g);
            nx = p.x;
            ny = p.y;
        } else {
            nx = u.ux | 0;
            ny = u.uy | 0;
        }

        if (nx > 0 && ny > 0) {
            placeFloorObjectInLevel(g, obj, nx, ny);
            stackObjOnFloorInLevel(g, obj);
            if (!noscatter) {
                void rnd(2);
            }
            newsym(nx, ny);
        } else {
            remain.push(e);
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

        g.migratingObjs.unshift({
            obj,
            targetDnum: destDnum,
            targetDlevel: destDlevel,
            toloc,
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
            await pline(`You removed ${price} zorkmids worth of goods!`);
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
            return;
        }
        const debit2 = e?.debit | 0;
        if (debit2 > debit) {
            const amt = debit2 - debit;
            await pline(
                `You owe ${shknamDisplay(shkp)} ${amt} zorkmids for goods lost.`,
            );
        }
    }
}
