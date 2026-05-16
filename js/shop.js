// shop.js — Shopkeeper and shop-adjacent hooks.
// C ref: shk.c fix_shop_damage(), repair_damage(), repairable_damage(), shk_impaired(), next_shkp();
//        find_objowner(), stolen_value()/stolen_container() subset for dig.c bury_objs; adisturb(), costly_spot(), add_damage();
//        invent.c useupf() billing; hack.c in_rooms() for **`SHOPBASE`**.

import { game } from './gstate.js';
import { pline, newsym } from './display.js';
import { unlinkFloorObject, floorObjKey } from './floorobj.js';
import { cansee, vision_recalc } from './vision.js';
import { delEngrAt } from './engrave.js';
import { raceptr, passesWalls, stubPermonstForCorpsenm, MR_FIRE, MR_SLEEP, noncorporeal, S_ELEMENTAL } from './mondata.js';
import { heroPassesWalls } from './walkable.js';
import { dist2 } from './hacklib.js';
import { rn2 } from './rng.js';
import { nhgetch } from './input.js';
import { changeLuck, acurr } from './attrib.js';
import {
    NH5_COIN_CLASS,
    NH5_FOOD_CLASS,
    NH5_GEM_CLASS,
    NH5_ARMOR_CLASS,
    NH5_WEAPON_CLASS,
    NH5_TOOL_CLASS,
    NH5_POTION_CLASS,
    NH5_WAND_CLASS,
    NH5_SCROLL_CLASS,
    NH5_RING_CLASS,
    NH5_AMULET_CLASS,
    NH5_SPBOOK_CLASS,
    NH5_RANDOM_CLASS,
    NH5_BALL_CLASS,
} from './nh5_objclass.js';
import {
    A_CHA,
    MAXULEV,
    NON_PM,
    ismnum,
    FIRE_RES,
    SLEEP_RES,
    COLD_RES,
    DISINT_RES,
    SHOCK_RES,
    POISON_RES,
    ACID_RES,
    STONE_RES,
    TELEPORT,
    TELEPORT_CONTROL,
    TELEPAT,
} from './const.js';
import { UHS } from './hunger.js';
import { objectOcCost } from './obj_oc_cost_data.js';
import { containedGold } from './u_init_hidden_gold.js';
import {
    OROOM,
    NO_ROOM,
    SHARED,
    SHARED_PLUS,
    ROOMOFFSET,
    SHOPBASE,
    UNIQUESHOP,
    IS_DOOR,
    IS_ROOM,
    SVALL,
    SHOP_DOOR_COST,
    ESHK,
    COLNO,
    ROWNO,
    REPAIR_DELAY,
    D_BROKEN,
    D_CLOSED,
    Has_contents,
    OBJ_ONBILL,
    OBJ_FLOOR,
    OBJ_FREE,
    OBJ_CONTAINED,
} from './const.js';

/**
 * C: hack.c **`in_rooms`** **`goodtype`** for **`SHOPBASE`** (shop + specialized shops).
 * @param {number} rt
 */
function rtypeIsShopClassForInRooms(rt) {
    const t = rt | 0;
    return t === SHOPBASE || (t > SHOPBASE && t <= UNIQUESHOP);
}

/** C: `svr.rooms[rno - ROOMOFFSET].rtype` — **JS** **`g.level.rooms`** index. */
function roomRtypeForLevlRoomno(g, roomno) {
    const idx = (roomno | 0) - ROOMOFFSET;
    if (idx < 0) return OROOM;
    const room = g.level?.rooms?.[idx];
    if (!room || (room.hx | 0) < 0) return OROOM;
    return room.rtype ?? OROOM;
}

/** C: hack.c **`in_rooms`** **`goodtype`** for **`SHOPBASE`** (matches **`rtype`** test). */
function roomnoIsShopbaseForInRooms(g, roomno) {
    const rt = roomRtypeForLevlRoomno(g, roomno);
    return rtypeIsShopClassForInRooms(rt);
}

/**
 * C: hack.c **`in_rooms`** **`SHOPBASE`** branch — append **`roomno`** if **`>= ROOMOFFSET`**,
 * **`goodtype`**, and not already listed (C **`strchr(ptr, rno)`**).
 * @param {import('./gstate.js').game} g
 * @param {number[]} acc
 * @param {number} roomno
 */
function pushShopbaseRoomnoUnique(g, acc, roomno) {
    const rn = roomno | 0;
    if (rn < ROOMOFFSET) return;
    if (!roomnoIsShopbaseForInRooms(g, rn)) return;
    if (acc.includes(rn)) return;
    acc.push(rn);
}

/**
 * C: hack.c **`in_rooms(x, y, SHOPBASE)`** — **`SHARED`** / **`SHARED_PLUS`** neighbor scan
 * (**`step`** 2 vs 1, same **`min_x`/`max_x`/`min_y`/`max_y_offset`** edge rules).
 * @param {import('./gstate.js').game} g
 * @param {number} cx
 * @param {number} cy
 * @param {number} step
 * @returns {number[]}
 */
function inRoomsShopbaseSharedNeighborScan(g, cx, cy, step) {
    let min_x = cx - 1;
    let max_x = cx + 1;
    if (cx < 1) min_x += step;
    else if (cx >= COLNO) max_x -= step;

    let min_y = cy - 1;
    let max_y_offset = 2;
    if (min_y < 0) {
        min_y += step;
        max_y_offset -= step;
    } else if (min_y + max_y_offset >= ROWNO) max_y_offset -= step;

    const out = [];
    for (let xx = min_x; xx <= max_x; xx += step) {
        let yOff = 0;
        let loc = g.level?.at(xx, min_y + yOff);
        if (loc) pushShopbaseRoomnoUnique(g, out, loc.roomno | 0);
        yOff += step;
        if (yOff > max_y_offset) continue;
        loc = g.level?.at(xx, min_y + yOff);
        if (loc) pushShopbaseRoomnoUnique(g, out, loc.roomno | 0);
        yOff += step;
        if (yOff > max_y_offset) continue;
        loc = g.level?.at(xx, min_y + yOff);
        if (loc) pushShopbaseRoomnoUnique(g, out, loc.roomno | 0);
    }
    return out;
}

/**
 * C: hack.c **`in_rooms(x, y, SHOPBASE)`** — full **`SHARED`** and **`SHARED_PLUS`** handling.
 * @param {import('./gstate.js').game} g
 * @param {number} x
 * @param {number} y
 * @returns {number[]} `levl.roomno` values (C stores as **`char`** IDs).
 */
export function inRoomsShopbaseRoomnos(g, x, y) {
    const loc = g.level?.at(x | 0, y | 0);
    if (!loc) return [];
    const rno = loc.roomno | 0;
    if (rno === NO_ROOM || rno === 0) return [];
    if (rno === SHARED) return inRoomsShopbaseSharedNeighborScan(g, x | 0, y | 0, 2);
    if (rno === SHARED_PLUS) return inRoomsShopbaseSharedNeighborScan(g, x | 0, y | 0, 1);
    const rt = roomRtypeForLevlRoomno(g, rno);
    if (!rtypeIsShopClassForInRooms(rt)) return [];
    return [rno];
}

/**
 * C: shk.c **`inside_shop(x, y)`** — strictly inside shop (**`roomno`**, not boundary **`edge`**, **`IS_SHOP`**).
 * @returns {number} **`levl.roomno`** or **`NO_ROOM`**
 */
export function insideShopLevlRoomno(g, x, y) {
    const loc = g.level?.at(x | 0, y | 0);
    if (!loc) return NO_ROOM;
    const rno = loc.roomno | 0;
    if (rno < ROOMOFFSET || loc.edge || !roomnoIsShopbaseForInRooms(g, rno)) return NO_ROOM;
    return rno;
}

/**
 * C: **`mextra.h`** **`eshk.shoproom`** is **`(sroom - svr.rooms) + ROOMOFFSET`** (**`shknam.c`**), i.e. **`levl.roomno`** form.
 * Accept legacy **`0..n-1`** index if **`shoproom < ROOMOFFSET`**.
 * @param {*} [eshk]
 */
function eshkShoproomAsLevlRno(eshk) {
    const s = eshk?.shoproom | 0;
    if (s >= ROOMOFFSET) return s;
    return s + ROOMOFFSET;
}

/** C: shk.c **`shop_keeper(rmno)`** — find resident shk for **`levl.roomno`** **`rmno`**. */
function shopKeeperForLevlRoomno(g, roomno) {
    const target = roomno | 0;
    if (target < ROOMOFFSET) return null;
    for (const m of g.level?.monsters ?? []) {
        if (!(m.isshk | 0)) continue;
        const e = ESHK(m);
        if (!e) continue;
        if (eshkShoproomAsLevlRno(e) === target) return m;
    }
    return null;
}

/** C: dungeon.c **`on_level(&eshk->shoplevel, &u.uz)`** — stub **`dnum`** when missing. */
function onLevelWithHero(g, shoplevel) {
    const uz = g.u?.uz;
    if (!uz) return true;
    if (!shoplevel || shoplevel.dlevel == null) return true;
    const dnum = shoplevel.dnum != null ? shoplevel.dnum | 0 : uz.dnum | 0;
    return (shoplevel.dlevel | 0) === (uz.dlevel | 0) && dnum === (uz.dnum | 0);
}

/** C: shk.c **`inhishop(shkp)`** */
function inHishop(g, shkp) {
    const e = ESHK(shkp);
    if (!shkp || !(shkp.isshk | 0) || !e) return false;
    if (!onLevelWithHero(g, e.shoplevel)) return false;
    const rnos = inRoomsShopbaseRoomnos(g, shkp.mx | 0, shkp.my | 0);
    return rnos.includes(eshkShoproomAsLevlRno(e));
}

/** C: mon.c **`helpless`** subset (**`mfrozen`/`mcanmove`**). */
function helplessShk(mtmp) {
    if (!mtmp) return false;
    if ((mtmp.mfrozen | 0) > 0) return true;
    return (mtmp.mcanmove | 0) === 0;
}

/** C: shk.c **`shk_impaired`** */
function shkImpaired(g, shkp) {
    if (!shkp || !(shkp.isshk | 0)) return true;
    if (!inHishop(g, shkp)) return true;
    const e = ESHK(shkp);
    if (helplessShk(shkp) || (e?.following | 0)) return true;
    return false;
}

/** C: trap.c **`t_at`** using **`g.level.traps`**. */
function trapAtIn(g, x, y) {
    const traps = g.level?.traps;
    if (!traps?.length) return null;
    return traps.find((t) => (t.tx | 0) === (x | 0) && (t.ty | 0) === (y | 0)) ?? null;
}

function delTrapIn(g, trap) {
    const traps = g.level?.traps;
    if (!traps) return;
    const i = traps.indexOf(trap);
    if (i >= 0) traps.splice(i, 1);
}

/** C: mon.c **`m_at`** on **`g.level.monsters`**. */
function monAtG(g, x, y) {
    return g.level?.monsters?.find((m) => (m.mx | 0) === (x | 0) && (m.my | 0) === (y | 0)) ?? null;
}

/** C: shk.c **`repairable_damage`** */
function repairableDamage(g, shkp, dam) {
    if (!dam || shkImpaired(g, shkp)) return false;
    const x = dam.x | 0;
    const y = dam.y | 0;
    const e = ESHK(shkp);
    if (!e) return false;
    if ((g.moves | 0) - (dam.when | 0) < REPAIR_DELAY) return false;

    const loc = g.level?.at(x, y);
    if (!loc) return false;

    const savedTyp = dam.typ | 0;
    if (!IS_ROOM(savedTyp)) {
        const ux = g.u?.ux | 0;
        const uy = g.u?.uy | 0;
        if (ux === x && uy === y && !heroPassesWalls(g)) return false;
        if ((shkp.mx | 0) === x && (shkp.my | 0) === y) return false;
        const mtmp = monAtG(g, x, y);
        if (mtmp && !passesWalls(raceptr(mtmp))) return false;
    }
    const ttmp = trapAtIn(g, x, y);
    if (ttmp) {
        const ux = g.u?.ux | 0;
        const uy = g.u?.uy | 0;
        if (ux === x && uy === y) return false;
        const mtmp2 = monAtG(g, x, y);
        if (mtmp2 && (mtmp2.mtrapped | 0)) return false;
    }
    const shopR = eshkShoproomAsLevlRno(e);
    if (!inRoomsShopbaseRoomnos(g, x, y).includes(shopR)) return false;
    return true;
}

/**
 * C: shk.c **`repair_damage(shkp, tmp_dam, TRUE)`** subset for **`fix_shop_damage`** catch-up:
 * trap removal (**`deltrap`** without **`mksobj`/`mpickobj`** yet), wall/door terrain restore.
 * Omits **`litter_scatter`/`block_point`/`picking_at`**; defers if floor objects at **`(x,y)`**.
 * @returns {boolean} whether damage entry should be discarded (**C non-zero **`repair_damage`**).
 */
function repairDamageCatchup(g, shkp, dam) {
    if (!repairableDamage(g, shkp, dam)) return false;
    const x = dam.x | 0;
    const y = dam.y | 0;
    const loc = g.level?.at(x, y);
    if (!loc) return false;

    const heads = g.level?.floorObjHeads;
    if (heads?.get(floorObjKey(x, y))) return false;

    let disposition = 1;
    const ttmp = trapAtIn(g, x, y);
    if (ttmp) {
        delTrapIn(g, ttmp);
        delEngrAt(x, y);
        if (cansee(x, y)) newsym(x, y);
        disposition = 3;
    }

    const savedTyp = dam.typ | 0;
    const curTyp = loc.typ | 0;
    const curMask = loc.doormask | 0;
    if (IS_ROOM(savedTyp) || (savedTyp === curTyp && (!IS_DOOR(savedTyp) || curMask > D_BROKEN))) {
        return disposition !== 0;
    }

    loc.typ = savedTyp;
    if (IS_DOOR(savedTyp)) loc.doormask = D_CLOSED;
    else loc.flags = dam.flags | 0;

    delEngrAt(x, y);
    if (cansee(x, y)) newsym(x, y);
    vision_recalc(1);

    return disposition !== 0;
}

/**
 * C: shk.c add_damage(x, y, cost) — door entrance check; **`damagelist`** merge; **`seenv`** if **`cansee`**.
 * @param {import('./gstate.js').game} g
 * @param {number} x
 * @param {number} y
 * @param {number} cost
 */
export function addDamageAt(g, x, y, cost) {
    const loc = g.level?.at(x | 0, y | 0);
    if (!loc) return;
    if (IS_DOOR(loc.typ)) {
        const rnos = inRoomsShopbaseRoomnos(g, x, y);
        let matched = false;
        for (let i = 0; i < rnos.length; i++) {
            const roomno = rnos[i];
            const mtmp = shopKeeperForLevlRoomno(g, roomno);
            const e = ESHK(mtmp);
            const sx = e?.shd?.x;
            const sy = e?.shd?.y;
            if (mtmp && e && (sx | 0) === (x | 0) && (sy | 0) === (y | 0)) {
                matched = true;
                break;
            }
        }
        if (!matched) return;
    }
    const lvl = g.level;
    if (!lvl) return;
    if (!lvl.damagelist) lvl.damagelist = [];
    const list = lvl.damagelist;
    const when = g.moves ?? 0;
    const ex = list.find((d) => (d.x | 0) === (x | 0) && (d.y | 0) === (y | 0));
    if (ex) {
        ex.cost = (ex.cost | 0) + (cost | 0);
        ex.when = when;
    } else {
        list.push({
            x: x | 0,
            y: y | 0,
            cost: cost | 0,
            when,
            typ: loc.typ | 0,
            flags: loc.flags | 0,
        });
    }
    if (cansee(x | 0, y | 0)) loc.seenv = SVALL;
}

/**
 * C: zap.c zap_over_floor — **`if (*in_rooms(…,SHOPBASE))`** **`add_damage`** before **`lev->doormask`**.
 * @param {import('./gstate.js').game} g
 * @param {number} x
 * @param {number} y
 * @param {number} type
 * @param {{ value?: boolean }|null} shopdamage
 */
export function applyZapShopDoorDamage(g, x, y, type, shopdamage) {
    const rnos = inRoomsShopbaseRoomnos(g, x, y);
    if (rnos.length === 0) return;
    if ((type | 0) >= 0) {
        addDamageAt(g, x, y, SHOP_DOOR_COST);
        if (shopdamage) shopdamage.value = true;
    } else {
        addDamageAt(g, x, y, 0);
    }
}

/**
 * C: shk.c **`fix_shop_damage()`** — on restore, each unimpaired in-shop shk **`repair_damage(..., TRUE)`**
 * on **`level.damagelist`** entries (**`discard_damage_struct`**).
 * @param {import('./gstate.js').game} [g]
 */
export function fixShopDamage(g = game) {
    const list = g.level?.damagelist;
    if (!list?.length) return;

    const monsters = g.level?.monsters ?? [];
    for (const shkp of monsters) {
        if (!(shkp.isshk | 0)) continue;
        if (shkImpaired(g, shkp)) continue;
        for (let i = list.length - 1; i >= 0; i--) {
            const damg = list[i];
            if (repairDamageCatchup(g, shkp, damg)) list.splice(i, 1);
        }
    }
}

/** C: **`hack.h`** **`PL_NSIZ`** — customer string cap. */
const PL_NSIZ_PAY = 36;
/** C: **`monflag.h`** **`MS_ANIMAL`**. */
const MS_ANIMAL_SHK = 17;

/** C: **`apply.c`** **`um_dist(x, y, n)`** — hero farther than **`n`** on x or y axis. */
function umDistHero(g, x, y, n) {
    const ux = g.u?.ux | 0;
    const uy = g.u?.uy | 0;
    return Math.abs(ux - (x | 0)) > n || Math.abs(uy - (y | 0)) > n;
}

export function shknamDisplay(shkp) {
    return shkp?.monnam || shkp?.data?.mname || 'The shopkeeper';
}

function muteshkShk(shkp) {
    if (helplessShk(shkp)) return true;
    const ms = shkp?.data?.msound ?? 0;
    return (ms | 0) <= MS_ANIMAL_SHK;
}

/** C: **`shk.c`** **`rile_shk`** — angry + surcharge flag (**`bill`** price loop not ported). */
function rileShkMinimal(shkp) {
    shkp.mpeaceful = 0;
    const e = ESHK(shkp);
    if (e) e.surcharge = 1;
}

/**
 * C: **`shk.c`** **`hot_pursuit`** — **`rile_shk`**, customer, **`following`**;
 * omits **`clear_no_charge`** / **`clear_no_charge_pets`**.
 * @param {import('./gstate.js').game} g
 */
async function hotPursuitShk(g, shkp) {
    if (!(shkp?.isshk | 0)) return;
    rileShkMinimal(shkp);
    const e = ESHK(shkp);
    const pn = g.plname ? String(g.plname) : 'Player';
    if (e) {
        e.customer = pn.slice(0, PL_NSIZ_PAY);
        e.following = 1;
    }
}

/** C: **`shk.c`** **`pacify_shk(shkp, FALSE)`** subset — peaceful; **`surcharge`** cleared (**`bill`** undo skipped). */
function pacifyShkMinimal(shkp) {
    shkp.mpeaceful = 1;
    const m = /** @type {Record<string, unknown>} */ (shkp);
    m.mAngry = 0;
    const e = ESHK(shkp);
    if (e) {
        e.following = 0;
        e.surcharge = 0;
    }
}

/** C: **`shk.c`** **`money_cnt(gi.invent)`** subset — **`g._goldCount`** + **`u.umoney`**. */
function moneyCntInvent(g) {
    return (g._goldCount | 0) + (g.u?.umoney | 0);
}

/** C: **`shk.c`** **`money2mon`** subset — deduct hero gold. */
function money2monShk(g, _shkp, amt) {
    let n = amt | 0;
    if (n <= 0) return;
    let gc = g._goldCount | 0;
    if (gc >= n) {
        g._goldCount = gc - n;
        return;
    }
    n -= gc;
    g._goldCount = 0;
    if (g.u) g.u.umoney = Math.max(0, (g.u.umoney | 0) - n);
}

/**
 * C: **`shk.c`** **`check_credit`** — **`pline_The`** → **`pline`**.
 * @returns {number} remaining zorkmids owed after credit applied
 */
async function checkCreditShk(g, tmp, shkp) {
    const e = ESHK(shkp);
    let credit = e?.credit | 0;
    let t = tmp | 0;
    if (credit === 0) return t;
    if (credit >= t) {
        await pline('The price is deducted from your credit.');
        if (e) e.credit = credit - t;
        return 0;
    }
    await pline('The price is partially covered by your credit.');
    if (e) e.credit = 0;
    return t - credit;
}

/** C: **`shk.c`** **`home_shk(shkp, FALSE)`** — move shk to **`eshk.shk`** (**`mnearto`** stub). */
function homeShkMinimal(g, shkp) {
    const e = ESHK(shkp);
    if (!e) return;
    const hx = e.shk?.x;
    const hy = e.shk?.y;
    if (hx == null || hy == null) return;
    shkp.mx = hx | 0;
    shkp.my = hy | 0;
    if (g.level?.flags) g.level.flags.has_shop = 1;
}

/**
 * C: **`shk.c`** **`getcad`** + **`hot_pursuit`** tail — no **`SetVoice`/`Deaf`** split beyond **`muteshk`**;
 * **`ROLL_FROM(angrytexts)`** → fixed **`furious`**.
 * @param {import('./gstate.js').game} g
 */
async function getCadShop(g, shkp, dmgstr, x, y, uinshp, animal, pursue) {
    const dugwall = dmgstr === 'dig into' || dmgstr === 'damage';
    const what = dugwall ? 'shop' : 'door';
    if (muteshkShk(shkp)) {
        if (animal && !helplessShk(shkp)) await pline(`${shknamDisplay(shkp)} yelps!`);
    } else if (pursue || uinshp || !umDistHero(g, x, y, 1)) {
        await pline(`${shknamDisplay(shkp)} howls angrily: \"How dare you ${dmgstr} my ${what}!\"`);
    } else {
        await pline(`${shknamDisplay(shkp)} shouts: \"Who dared ${dmgstr} my ${what}!\"`);
    }
    await hotPursuitShk(g, shkp);
}

/**
 * C: **`shk.c`** **`pay_for_damage`** — damagelist scan (**`when == moves`** && **`cost`**), nearest shk tie-break;
 * **`getcad`/`hot_pursuit`**, **`y_n`** pay path (**`check_credit`/`money2mon`/`pacify_shk`/`home_shk`** subset).
 * Omits **`mnexto`/`mnearto`** movement (**`homeShkMinimal`** teleport), **`Invis`** cad honorific, **`adjalign`** precision,
 * **`canspotmon`/`canseemon`** full parity, **`sleep`/`wait_synch`**, **`body_part`/`mbodypart`** deaf branch.
 * @param {import('./gstate.js').game} [g]
 * @param {string} dmgstr — C verb phrase (**`"dig into"`** / **`"damage"`** / door strings from callers).
 * @param {boolean} [cantMollify]
 */
export async function payForDamage(g = game, dmgstr, cantMollify = false) {
    const str = dmgstr != null ? String(dmgstr) : 'damage';
    const list = g.level?.damagelist;
    if (!list?.length) return;

    const moves = g.moves | 0;
    /** @type {{ x: number, y: number, cost?: number, when?: number, typ?: number, flags?: number } | null} */
    let appearHere = null;
    let shkp = null;
    let costOfDamage = 0;
    const nearestShkCap = ROWNO * ROWNO + COLNO * COLNO;
    let nearestShk = nearestShkCap;
    let nearestDamage = nearestShkCap;
    let picks = 0;

    for (let di = 0; di < list.length; di++) {
        const tmpDam = list[di];
        if ((tmpDam.when | 0) !== moves || !(tmpDam.cost | 0)) continue;
        costOfDamage += tmpDam.cost | 0;
        const dx = tmpDam.x | 0;
        const dy = tmpDam.y | 0;
        const shopsAffected = inRoomsShopbaseRoomnos(g, dx, dy);
        for (let si = 0; si < shopsAffected.length; si++) {
            const roomChar = shopsAffected[si];
            const tmpShk = shopKeeperForLevlRoomno(g, roomChar);
            if (!tmpShk) continue;
            if (tmpShk === shkp) {
                const damageDistance = dist2(dx, dy, g.u?.ux | 0, g.u?.uy | 0);
                if (damageDistance < nearestDamage) {
                    nearestDamage = damageDistance;
                    appearHere = tmpDam;
                }
                continue;
            }
            if (!inHishop(g, tmpShk)) continue;
            const shkDistance = dist2(tmpShk.mx | 0, tmpShk.my | 0, g.u?.ux | 0, g.u?.uy | 0);
            if (shkDistance > nearestShk) continue;
            if (shkDistance === nearestShk && picks) {
                if (rn2(++picks)) continue;
            } else picks = 1;
            shkp = tmpShk;
            nearestShk = shkDistance;
            appearHere = tmpDam;
            nearestDamage = dist2(dx, dy, g.u?.ux | 0, g.u?.uy | 0);
        }
    }

    if (!costOfDamage || !shkp || !appearHere) return;

    const e = ESHK(shkp);
    const pn = g.plname ? String(g.plname) : 'Player';
    if (e) e.customer = pn.slice(0, PL_NSIZ_PAY);

    if (!(shkp.mpeaceful | 0) || (e?.following | 0)) {
        await hotPursuitShk(g, shkp);
        return;
    }

    const animal = (shkp.data?.msound ?? 0) <= MS_ANIMAL_SHK;
    const uinshp = inRoomsShopbaseRoomnos(g, g.u?.ux | 0, g.u?.uy | 0).length > 0;
    const x = appearHere.x | 0;
    const y = appearHere.y | 0;

    const shkInShop = inRoomsShopbaseRoomnos(g, shkp.mx | 0, shkp.my | 0).length > 0;
    if (!shkInShop) {
        if (!cansee(shkp.mx | 0, shkp.my | 0)) return;
        await getCadShop(g, shkp, str, x, y, uinshp, animal, true);
        return;
    }

    let pursue = false;

    if (uinshp) {
        if (!umDistHero(g, shkp.mx | 0, shkp.my | 0, 1) && umDistHero(g, shkp.mx | 0, shkp.my | 0, 3)) {
            await pline(`${shknamDisplay(shkp)} leaps towards you!`);
            /* C: **`mnexto(shkp, RLOC_NOMSG)`** — not ported */
        }
        pursue = umDistHero(g, shkp.mx | 0, shkp.my | 0, 1);
        if (pursue) {
            await getCadShop(g, shkp, str, x, y, uinshp, animal, pursue);
            return;
        }
    } else {
        if (monAtG(g, x, y)) {
            if (!animal) {
                await pline('You hear an angry voice: \"Out of my way, scum!\"');
            } else {
                await pline(`${shknamDisplay(shkp)} growls.`);
            }
        }
        /* C: **`mnearto(shkp, x, y, TRUE, RLOC_MSG)`** — not ported */
    }

    const heroInvis = !!(g.u?.HInvis | 0) || !!(g.u?.EInvis | 0);
    const brokeOrAngry =
        (umDistHero(g, x, y, 1) && !uinshp)
        || cantMollify
        || moneyCntInvent(g) + (e?.credit | 0) < costOfDamage
        || !rn2(50);
    if (brokeOrAngry) {
        await getCadShop(g, shkp, str, x, y, uinshp, animal, pursue);
        return;
    }

    if (heroInvis) await pline(`Your invisibility does not fool ${shknamDisplay(shkp)}!`);
    const cadPre = !animal ? 'Cad!  ' : '';
    const cadPost = !animal ? '"' : '';
    const qbuf = `${cadPre}You did ${costOfDamage} zorkmids worth of damage!${cadPost}  Pay?`;
    await pline(qbuf);
    const code = await nhgetch();
    const ch = typeof code === 'number' ? String.fromCharCode(code) : String(code);
    if (ch.toLowerCase() !== 'n') {
        const wasSeen = cansee(shkp.mx | 0, shkp.my | 0);
        const wasOutside = !inHishop(g, shkp);
        const sx = shkp.mx | 0;
        const sy = shkp.my | 0;
        let payAmt = costOfDamage;
        payAmt = await checkCreditShk(g, payAmt, shkp);
        if (payAmt > 0) {
            money2monShk(g, shkp, payAmt);
            g.disp = g.disp || {};
            g.disp.botl = true;
        }
        await pline(`Mollified, ${shknamDisplay(shkp)} accepts your restitution.`);
        homeShkMinimal(g, shkp);
        pacifyShkMinimal(shkp);
        if ((shkp.mx | 0) !== sx || (shkp.my | 0) !== sy) {
            if (wasOutside && cansee(shkp.mx | 0, shkp.my | 0)) {
                await pline(`${shknamDisplay(shkp)} returns to his shop.`);
            } else if (cansee(shkp.mx | 0, shkp.my | 0) || wasSeen) {
                const msg = !wasSeen ? 'appears' : cansee(shkp.mx | 0, shkp.my | 0) ? 'shifts location' : 'disappears';
                await pline(`${shknamDisplay(shkp)} ${msg}.`);
            }
        }
    } else {
        if (!animal) {
            await pline(`${shknamDisplay(shkp)} snarls: \"Oh, yes!  You'll pay!\"`);
        } else {
            await pline(`${shknamDisplay(shkp)} growls.`);
        }
        await hotPursuitShk(g, shkp);
        changeLuck(-1);
    }
}

/**
 * C: shk.c costly_spot(x,y) — strictly inside shop (**`inside_shop`**) but not **`eshk.shk`** service square.
 * @param {object} [g]
 * @param {number} x
 * @param {number} y
 */
export function costlySpot(g = game, x, y) {
    const xh = x | 0;
    const yh = y | 0;
    if (!(g.level?.flags?.has_shop | 0)) return false;
    const rnos = inRoomsShopbaseRoomnos(g, xh, yh);
    if (!rnos.length) return false;
    const shkp = shopKeeperForLevlRoomno(g, rnos[0]);
    if (!shkp || !inHishop(g, shkp)) return false;
    const eshkp = ESHK(shkp);
    if (!eshkp) return false;
    if (insideShopLevlRoomno(g, xh, yh) === NO_ROOM) return false;
    const sx = eshkp.shk?.x != null ? eshkp.shk.x | 0 : shkp.mx | 0;
    const sy = eshkp.shk?.y != null ? eshkp.shk.y | 0 : shkp.my | 0;
    return !(xh === sx && yh === sy);
}

/** C: shk.c **`ANGRY(mon)`** — **`!mpeaceful`**. */
function shkpAngry(shkp) {
    return !(shkp?.mpeaceful | 0);
}

/** C: monflag.h `MR_*` — `mconveys` bits (eat.c **`intrinsic_possible`**). */
const MR_COLD = 0x02;
const MR_DISINT = 0x08;
const MR_ELEC = 0x10;
const MR_POISON = 0x20;
const MR_ACID = 0x40;
const MR_STONE = 0x80;
/** C: monflag.h `G_UNIQ` — **`unique_corpstat`** (mondata.h). */
const G_UNIQ = 0x1000;
/** C: monflag.h `M1_TPORT` / `M1_TPORT_CNTRL` — mondata.h **`can_teleport`** / **`control_teleport`**. */
const M1_TPORT = 0x02000000;
const M1_TPORT_CNTRL = 0x04000000;

/** C: objects.h — `objects_nums` / cpp OBJECTS_INIT (clang `POTION_CLASS`/`ARMOR_CLASS` walks). */
const OTYP_CORPSE = 265;
const OTYP_EGG = 266;
const OTYP_TIN = 295;
const OTYP_POT_WATER = 322;
const OTYP_DUNCE_CAP = 94;
const OTYP_HAWAIIAN_SHIRT = 136;
const OTYP_TALLOW_CANDLE = 225;
const OTYP_WAX_CANDLE = 226;
const OTYP_BRASS_LANTERN = 227;
const OTYP_OIL_LAMP = 228;
const OTYP_MAGIC_LAMP = 229;
const OTYP_POT_OIL = 321;
/** C: shknam.c **`#define VEGETARIAN_CLASS (MAXOCLASSES + 1)`** — NH5 **`MAXOCLASSES`** = 18 (**`VENOM_CLASS`**). */
const NH5_VEGETARIAN_PSEUDO_CLASS = 19;
/** C: objects.h `FIRST_REAL_GEM` / `FIRST_GLASS_GEM` — gem **`otyp`** ranges. */
const OTYP_FIRST_REAL_GEM = 439;
const OTYP_LAST_REAL_GEM = 460;
const OTYP_FIRST_GLASS_GEM = 461;
const OTYP_LAST_GLASS_GEM = 469;
const OTYP_FLINT = 473;
/** C: monsters.h **`PM_*`** via **`MONS_ENUM`** cpp token order (0-based **`mnum`**). */
const PM_STALKER = 153;
const PM_BLACK_PUDDING = 209;
const PM_LEATHER_GOLEM = 253;
const PM_FLESH_GOLEM = 255;
/** C: defsym.h **`MONSYM`** indices (`S_*`). */
const S_BLOB = 2;
const S_JELLY = 10;
const S_FUNGUS = 32;
const S_VORTEX = 22;
const S_LIGHT = 25;
const S_GOLEM = 55;
const S_PUDDING = 42;
/** C: objclass.h **`VEGGY`** material. */
const OC_MATERIAL_VEGGY = 3;
/** C: shknam.c **`shtypes[]`** — only **`symb`/`iprobs`** used by **`saleable`** ( **`shkgeneral`** fn ptr omitted). */
const SHK_SHTYPES_FOR_SALEABLE = [
    { symb: NH5_RANDOM_CLASS, iprobs: [[NH5_RANDOM_CLASS, 100], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] },
    { symb: NH5_ARMOR_CLASS, iprobs: [[NH5_ARMOR_CLASS, 90], [NH5_WEAPON_CLASS, 10], [0, 0], [0, 0], [0, 0], [0, 0]] },
    { symb: NH5_SCROLL_CLASS, iprobs: [[NH5_SCROLL_CLASS, 90], [NH5_SPBOOK_CLASS, 10], [0, 0], [0, 0], [0, 0], [0, 0]] },
    { symb: NH5_POTION_CLASS, iprobs: [[NH5_POTION_CLASS, 100], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] },
    { symb: NH5_WEAPON_CLASS, iprobs: [[NH5_WEAPON_CLASS, 90], [NH5_ARMOR_CLASS, 10], [0, 0], [0, 0], [0, 0], [0, 0]] },
    {
        symb: NH5_FOOD_CLASS,
        iprobs: [
            [NH5_FOOD_CLASS, 83],
            [-319, 5],
            [-317, 4],
            [-322, 5],
            [-216, 3],
            [0, 0],
        ],
    },
    { symb: NH5_RING_CLASS, iprobs: [[NH5_RING_CLASS, 85], [NH5_GEM_CLASS, 10], [NH5_AMULET_CLASS, 5], [0, 0], [0, 0], [0, 0]] },
    { symb: NH5_WAND_CLASS, iprobs: [[NH5_WAND_CLASS, 90], [-144, 5], [-90, 5], [0, 0], [0, 0], [0, 0]] },
    { symb: NH5_TOOL_CLASS, iprobs: [[NH5_TOOL_CLASS, 100], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]] },
    { symb: NH5_SPBOOK_CLASS, iprobs: [[NH5_SPBOOK_CLASS, 90], [NH5_SCROLL_CLASS, 10], [0, 0], [0, 0], [0, 0], [0, 0]] },
    {
        symb: NH5_FOOD_CLASS,
        iprobs: [
            [NH5_VEGETARIAN_PSEUDO_CLASS, 70],
            [-319, 20],
            [-307, 4],
            [-315, 3],
            [-335, 2],
            [-285, 1],
        ],
    },
    {
        symb: NH5_TOOL_CLASS,
        iprobs: [
            [-226, 30],
            [-225, 44],
            [-227, 5],
            [-228, 9],
            [-229, 3],
            [-321, 5],
            [-409, 2],
            [-332, 1],
            [-372, 1],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
    },
];

/** C: **`mextra.h`** **`eshk.shoptype`** or room **`rtype`** (**`mkroom.h`** **`SHOPBASE`**…). */
function eshkShoptypeLikeC(g, shkp) {
    const e = ESHK(shkp);
    if (!e) return SHOPBASE;
    if (e.shoptype != null) return e.shoptype | 0;
    return roomRtypeForLevlRoomno(g, eshkShoproomAsLevlRno(e));
}

/** C: mondata.h **`vegan`** / **`vegetarian`**. */
function veganMonsterLikeC(ptr) {
    if (!ptr) return false;
    const ml = ptr.mlet | 0;
    const mn = ptr.mnum | 0;
    if (
        ml === S_BLOB
        || ml === S_JELLY
        || ml === S_FUNGUS
        || ml === S_VORTEX
        || ml === S_LIGHT
        || (ml === S_ELEMENTAL && mn !== PM_STALKER)
        || (ml === S_GOLEM && mn !== PM_FLESH_GOLEM && mn !== PM_LEATHER_GOLEM)
        || noncorporeal(ptr)
    ) {
        return true;
    }
    return false;
}

/** C: mondata.h **`vegetarian`**. */
function vegetarianMonsterLikeC(ptr) {
    if (!ptr) return false;
    if (veganMonsterLikeC(ptr)) return true;
    const ml = ptr.mlet | 0;
    const mn = ptr.mnum | 0;
    return ml === S_PUDDING && mn !== PM_BLACK_PUDDING;
}

/**
 * C: shknam.c **`veggy_item`**
 * @param {object|null} obj
 */
function veggyItemLikeC(obj) {
    if (!obj) return false;
    const otyp = obj.otyp | 0;
    const oclass = obj.oclass | 0;
    const corpsenm = obj.corpsenm | 0;
    if (oclass !== NH5_FOOD_CLASS) return false;
    const mat = obj.oc_material != null ? obj.oc_material | 0 : 0;
    if (mat === OC_MATERIAL_VEGGY || otyp === OTYP_EGG) return true;
    if (otyp === OTYP_TIN && corpsenm === NON_PM) return (obj.spe | 0) === 1;
    if (otyp === OTYP_TIN || otyp === OTYP_CORPSE) {
        return ismnum(corpsenm) && vegetarianMonsterLikeC(stubPermonstForCorpsenm(corpsenm));
    }
    return false;
}

/**
 * C: shknam.c **`saleable`**
 * @param {import('./gstate.js').game} g
 */
function saleableLikeC(g, shkp, obj) {
    const e = ESHK(shkp);
    if (!e) return true;
    const shpIndx = (eshkShoptypeLikeC(g, shkp) | 0) - SHOPBASE;
    if (shpIndx < 0 || shpIndx >= SHK_SHTYPES_FOR_SALEABLE.length) return true;
    const shp = SHK_SHTYPES_FOR_SALEABLE[shpIndx];
    if (shp.symb === NH5_RANDOM_CLASS) return true;
    for (let i = 0; i < shp.iprobs.length; i++) {
        const itype = shp.iprobs[i][0] | 0;
        const iprob = shp.iprobs[i][1] | 0;
        if (!iprob) break;
        if (itype === NH5_VEGETARIAN_PSEUDO_CLASS) {
            if (veggyItemLikeC(obj)) return true;
        } else if (itype < 0) {
            if (itype === -(obj.otyp | 0)) return true;
        } else if (itype === (obj.oclass | 0)) {
            return true;
        }
    }
    return false;
}

/**
 * C: shk.c **`set_cost`**
 * @param {import('./gstate.js').game} g
 */
function setCostLikeC(g, obj, shkp) {
    let tmp = getPricingUnitsStolenBury(obj) * getpriceLikeC(g, obj, true);
    let multiplier = 1;
    let divisor = 1;
    const u = g.u;
    const uarmh = u?.uarmh;
    if (uarmh && (uarmh.otyp | 0) === OTYP_DUNCE_CAP) divisor *= 3;
    else if (
        (u?.urole?.abbr === 'Tou' && (u?.ulevel | 0) < Math.trunc(MAXULEV / 2))
        || (u?.uarmu && !u?.uarm && !u?.uarmc && (u.uarmu.otyp | 0) === OTYP_HAWAIIAN_SHIRT)
    ) {
        divisor *= 3;
    } else {
        divisor *= 2;
    }

    const otyp = obj.otyp | 0;
    const oclass = obj.oclass | 0;
    if (!(obj.dknown | 0) || !objectOcNameKnownForShop(otyp, oclass)) {
        if (oclass === NH5_GEM_CLASS) {
            if (
                (otyp >= OTYP_FIRST_REAL_GEM && otyp <= OTYP_LAST_REAL_GEM)
                || (otyp >= OTYP_FIRST_GLASS_GEM && otyp <= OTYP_LAST_GLASS_GEM)
            ) {
                const mid = (shkp?.m_id ?? shkp?.mid ?? 0) | 0;
                tmp = ((otyp - OTYP_FIRST_REAL_GEM) % (6 - (mid % 3)));
                tmp = (tmp + 3) * Math.max(1, obj.quan | 0);
                divisor = 1;
            }
        } else if (tmp > 1 && !((shkp?.m_id ?? shkp?.mid ?? 0) % 4)) {
            multiplier *= 3;
            divisor *= 4;
        }
    }

    if (tmp >= 1) {
        tmp *= multiplier;
        if (divisor > 1) {
            tmp *= 10;
            tmp = Math.trunc(tmp / divisor);
            tmp += 5;
            tmp = Math.trunc(tmp / 10);
        }
        if (tmp < 1) tmp = 1;
    }

    return tmp | 0;
}

/** C: mondata.h **`can_teleport`** / **`control_teleport`**. */
function canTeleportMon(ptr) {
    return ((ptr?.mflags1 ?? 0) & M1_TPORT) !== 0;
}
function controlTeleportMon(ptr) {
    return ((ptr?.mflags1 ?? 0) & M1_TPORT_CNTRL) !== 0;
}

/** C: mondata.h **`telepathic`** — `mons[]` identity (**`PM_*`** from **`monsters.h`** MON order). */
function telepathicMon(ptr) {
    const m = ptr?.mnum | 0;
    return m === 29 || m === 50 || m === 51;
}

/** C: mondata.h **`unique_corpstat`** */
function uniqueCorpstat(ptr) {
    return ((ptr?.geno ?? 0) & G_UNIQ) !== 0;
}

/**
 * C: shk.c **`oid_price_adjustment`**
 * @param {object} obj
 * @param {number} oid — unsigned **`o_id`**
 */
function oidPriceAdjustmentLikeC(obj, oid) {
    const otyp = obj.otyp | 0;
    const oclass = obj.oclass | 0;
    if ((obj.dknown | 0) && objectOcNameKnownForShop(otyp, oclass)) return 0;
    if (oclass === NH5_GEM_CLASS && objectMaterialIsGlassLikeC(otyp, oclass)) return 0;
    return (oid >>> 0) % 4 === 0 ? 1 : 0;
}

/** C: `objects[otyp].oc_material == GLASS` — worthless glass **`otyp`** range matches NH5 table. */
function objectMaterialIsGlassLikeC(otyp, oclass) {
    const t = otyp | 0;
    if ((oclass | 0) !== NH5_GEM_CLASS) return false;
    return t >= OTYP_FIRST_GLASS_GEM && t <= OTYP_LAST_GLASS_GEM;
}

/**
 * C: `objects[otyp].oc_name_known` — JS: non-gems known; gems unknown until a fuller discovery port.
 * @param {number} otyp
 * @param {number} oclass
 */
function objectOcNameKnownForShop(otyp, oclass) {
    void otyp;
    return (oclass | 0) !== NH5_GEM_CLASS;
}

/** C: eat.c **`intrinsic_possible`** — uses **`ptr->mconveys`**. */
function intrinsicPossibleEatC(type, ptr) {
    const cv = (ptr?.mconveys ?? ptr?.mresists ?? 0) | 0;
    switch (type) {
        case FIRE_RES:
            return (cv & MR_FIRE) !== 0;
        case SLEEP_RES:
            return (cv & MR_SLEEP) !== 0;
        case COLD_RES:
            return (cv & MR_COLD) !== 0;
        case DISINT_RES:
            return (cv & MR_DISINT) !== 0;
        case SHOCK_RES:
            return (cv & MR_ELEC) !== 0;
        case POISON_RES:
            return (cv & MR_POISON) !== 0;
        case ACID_RES:
            return (cv & MR_ACID) !== 0;
        case STONE_RES:
            return (cv & MR_STONE) !== 0;
        case TELEPORT:
            return canTeleportMon(ptr);
        case TELEPORT_CONTROL:
            return controlTeleportMon(ptr);
        case TELEPAT:
            return telepathicMon(ptr);
        default:
            return false;
    }
}

/** C: shk.c **`corpsenm_price_adj`** */
function corpsenmPriceAdjLikeC(obj) {
    const t = obj.otyp | 0;
    const cm = obj.corpsenm | 0;
    if ((t !== OTYP_TIN && t !== OTYP_EGG && t !== OTYP_CORPSE) || !ismnum(cm)) return 0;
    const ptr = stubPermonstForCorpsenm(cm);
    const icost = [
        [FIRE_RES, 2],
        [SLEEP_RES, 3],
        [COLD_RES, 2],
        [DISINT_RES, 5],
        [SHOCK_RES, 4],
        [POISON_RES, 2],
        [ACID_RES, 1],
        [STONE_RES, 3],
        [TELEPORT, 2],
        [TELEPORT_CONTROL, 3],
        [TELEPAT, 5],
    ];
    let tmp = 1;
    for (let i = 0; i < icost.length; i++) {
        if (intrinsicPossibleEatC(icost[i][0], ptr)) tmp += icost[i][1];
    }
    if (uniqueCorpstat(ptr)) tmp += 50;
    const mlevel = Math.max(0, (ptr.mlevel ?? 1) | 0);
    let val = Math.max(1, (mlevel - 1) * 2);
    if (t === OTYP_CORPSE) {
        const nut = ptr.cnutrit | 0;
        val += Math.max(1, Math.trunc(nut / 30));
    }
    val *= tmp;
    return val;
}

/** C: artifact.c **`arti_cost`** — no **`artilist`** in JS yet: explicit **`cost`** or **`100 * oc_cost`**. */
function artiCostLikeC(g, obj) {
    const ax = obj.oartifact | 0;
    if (!ax) return objectOcCost(obj.otyp | 0);
    const row = g?.artilist?.[ax];
    const c = row?.cost | 0;
    if (c) return c;
    return 100 * (objectOcCost(obj.otyp | 0) | 0);
}

/** C: obj.h **`Is_candle`** — tallow / wax candle **`otyp`**s. */
function isCandleOtyp(otyp) {
    const t = otyp | 0;
    return t === OTYP_TALLOW_CANDLE || t === OTYP_WAX_CANDLE;
}

/**
 * C: shk.c **`getprice`**
 * @param {import('./gstate.js').game} g
 * @param {object} obj
 * @param {boolean} shkBuying
 */
function getpriceLikeC(g, obj, shkBuying) {
    let tmp = objectOcCost(obj.otyp | 0);
    if (obj.oartifact | 0) {
        tmp = artiCostLikeC(g, obj);
        if (shkBuying) tmp = Math.trunc(tmp / 4);
    }
    const oc = obj.oclass | 0;
    switch (oc) {
        case NH5_FOOD_CLASS: {
            tmp += corpsenmPriceAdjLikeC(obj);
            const uhs = g.u?.uhs | 0;
            if (uhs >= UHS.HUNGRY && !shkBuying) tmp *= uhs;
            if (obj.oeaten | 0) tmp = 0;
            break;
        }
        case NH5_WAND_CLASS:
            if ((obj.spe | 0) === -1) tmp = 0;
            break;
        case NH5_POTION_CLASS:
            if ((obj.otyp | 0) === OTYP_POT_WATER && !(obj.blessed | 0) && !(obj.cursed | 0)) tmp = 0;
            break;
        case NH5_ARMOR_CLASS:
        case NH5_WEAPON_CLASS:
            if ((obj.spe | 0) > 0) tmp += 10 * (obj.spe | 0);
            break;
        case NH5_TOOL_CLASS:
            if (isCandleOtyp(obj.otyp | 0)) {
                const base = objectOcCost(obj.otyp | 0);
                if ((obj.age | 0) < 20 * base) tmp = Math.trunc(tmp / 2);
            }
            break;
        default:
            break;
    }
    return tmp;
}

/**
 * C: shk.c **`get_cost`** — shop charge to hero (**`getprice(..., FALSE)`** + adjustments + angry surcharge).
 * @param {import('./gstate.js').game} g
 * @param {object} obj
 * @param {object|null} shkp
 */
function getCostStolenBuryUnit(g, obj, shkp) {
    let tmp = getpriceLikeC(g, obj, false);
    if (!tmp) tmp = 5;
    let multiplier = 1;
    let divisor = 1;
    const otyp = obj.otyp | 0;
    const oclass = obj.oclass | 0;
    const oid = (obj.o_id ?? 0) >>> 0;
    if (!(obj.dknown | 0) || !objectOcNameKnownForShop(otyp, oclass)) {
        if (oclass === NH5_GEM_CLASS && objectMaterialIsGlassLikeC(otyp, oclass)) {
            const u = g.u;
            const birthday = (u?.ubirthday != null ? u.ubirthday >>> 0 : 0x9e3779b9) >>> 0;
            const pseudorand = (birthday % otyp) >= otyp / 2;
            const sw = [
                [440, 452],
                [443, 448],
                [441, 456],
                [449, 450],
                [442, 459],
                [447, 453],
                [444, 451],
                [445, 460],
                [455, 457],
            ];
            const idx = otyp - OTYP_FIRST_GLASS_GEM;
            let repl = 440;
            if (idx >= 0 && idx < sw.length) {
                const [a, b] = sw[idx];
                repl = pseudorand ? a : b;
            }
            tmp = objectOcCost(repl);
        } else if (oidPriceAdjustmentLikeC(obj, oid) > 0) {
            multiplier *= 4;
            divisor *= 3;
        }
    }
    const u = g.u;
    const uarmh = u?.uarmh;
    if (uarmh && (uarmh.otyp | 0) === OTYP_DUNCE_CAP) {
        multiplier *= 4;
        divisor *= 3;
    } else if (
        (u?.urole?.abbr === 'Tou' && (u?.ulevel | 0) < Math.trunc(MAXULEV / 2))
        || (u?.uarmu && !u?.uarm && !u?.uarmc && (u.uarmu.otyp | 0) === OTYP_HAWAIIAN_SHIRT)
    ) {
        multiplier *= 4;
        divisor *= 3;
    }
    const cha = acurr(A_CHA);
    if (cha > 18) divisor *= 2;
    else if (cha === 18) {
        multiplier *= 2;
        divisor *= 3;
    } else if (cha >= 16) {
        multiplier *= 3;
        divisor *= 4;
    } else if (cha <= 5) multiplier *= 2;
    else if (cha <= 7) {
        multiplier *= 3;
        divisor *= 2;
    } else if (cha <= 10) {
        multiplier *= 4;
        divisor *= 3;
    }
    tmp *= multiplier;
    if (divisor > 1) {
        tmp *= 10;
        tmp = Math.trunc(tmp / divisor);
        tmp += 5;
        tmp = Math.trunc(tmp / 10);
    }
    if (tmp <= 0) tmp = 1;
    if (obj.oartifact | 0) tmp *= 4;
    const e = shkp ? ESHK(shkp) : null;
    if (shkp && e && (e.surcharge | 0)) tmp += Math.trunc((tmp + 2) / 3);
    return tmp | 0;
}

/** C: shk.c **`get_pricing_units`** — **`quan`**; **`globby`** weight pricing not ported. */
function getPricingUnitsStolenBury(obj) {
    return Math.max(1, obj.quan | 0);
}

/**
 * C: shk.c **`picked_container`** — clear **`no_charge`** on nested contents (subset, no **`dropped_container`**).
 * @param {object} obj
 */
function pickedContainerNoChargeClear(obj) {
    for (let otmp = obj?.cobj; otmp; otmp = otmp.nobj) {
        if ((otmp.oclass | 0) === NH5_COIN_CLASS) continue;
        if (otmp.no_charge | 0) otmp.no_charge = 0;
        if (Has_contents(otmp)) pickedContainerNoChargeClear(otmp);
    }
}

/** C: shk.c **`count_contents`** unpaid branch subset — recursive unpaid **`cobj`**. */
function countUnpaidContentsCobj(obj) {
    let n = 0;
    for (let o = obj?.cobj; o; o = o.nobj) {
        if ((o.oclass | 0) === NH5_COIN_CLASS) continue;
        if (o.unpaid | 0) n++;
        if (Has_contents(o)) n += countUnpaidContentsCobj(o);
    }
    return n;
}

/**
 * C: **`shk.c`** **`contained_cost`** top container walk (**`OBJ_CONTAINED`** / **`ocontainer`** not in JS yet).
 * @param {object} obj
 */
function containerTopForContainedCost(obj) {
    let top = obj;
    while (top && (top.where | 0) === OBJ_CONTAINED && top.ocontainer) {
        top = top.ocontainer;
    }
    return top || obj;
}

/**
 * C: **`shk.c`** **`contained_cost`** — floor buy (**`usell` FALSE**) uses **`getCostStolenBuryUnit`**;
 * **`usell` TRUE** uses **`saleableLikeC`** + **`setCostLikeC`** ( **`shknam.c`** / **`set_cost`** ).
 * @param {import('./gstate.js').game} g
 * @param {boolean} usell — C **`usell`**
 * @param {boolean} unpaidOnly — C **`unpaid_only`**
 */
function containedCostStolenBury(g, obj, shkp, price, usell, unpaidOnly) {
    let out = price | 0;
    if (!shkp || !Has_contents(obj)) return out;
    const top = containerTopForContainedCost(obj);
    const tw = top.where != null ? (top.where | 0) : OBJ_FLOOR;
    const onFloor = tw === OBJ_FLOOR || tw === OBJ_FREE;
    let x = top.ox ?? 0;
    let y = top.oy ?? 0;
    if (tw === OBJ_FREE || top.ox == null || top.oy == null) {
        x = g.u?.ux | 0;
        y = g.u?.uy | 0;
    }
    const e = ESHK(shkp);
    const sx = e?.shk?.x != null ? e.shk.x | 0 : shkp.mx | 0;
    const sy = e?.shk?.y != null ? e.shk.y | 0 : shkp.my | 0;
    const freespot = onFloor && (x | 0) === (sx | 0) && (y | 0) === (sy | 0);

    for (let otmp = obj.cobj; otmp; otmp = otmp.nobj) {
        if ((otmp.oclass | 0) === NH5_COIN_CLASS) continue;
        if (usell) {
            if (saleableLikeC(g, shkp, otmp) && !(otmp.unpaid | 0)
                && (otmp.oclass | 0) !== NH5_BALL_CLASS
                && !((otmp.oclass | 0) === NH5_FOOD_CLASS && (otmp.oeaten | 0))
                && !(isCandleOtyp(otmp.otyp | 0)
                    && (otmp.age | 0) < 20 * (objectOcCost(otmp.otyp | 0) | 0))) {
                out += setCostLikeC(g, otmp, shkp);
            }
        } else if (onFloor
            ? (!(otmp.no_charge | 0) && !freespot)
            : ((otmp.unpaid | 0) || !unpaidOnly)) {
            out += getPricingUnitsStolenBury(otmp) * getCostStolenBuryUnit(g, otmp, shkp);
        }
        if (Has_contents(otmp)) {
            out = containedCostStolenBury(g, otmp, shkp, out, usell, unpaidOnly);
        }
    }
    return out;
}

/**
 * Ensure **`eshk.bill_p`** exists (C **`bill_p`** / **`billct`**; JS keeps **`billct`** in sync when present).
 * @param {*} eshk
 */
function ensureEshopBillP(eshk) {
    if (!eshk) return;
    if (!eshk.bill_p) eshk.bill_p = [];
}

/**
 * C: shk.c **`onbill(obj, shkp, silent)`** — match **`bo_id`** or live **`obj`** ref on **`bill_p`**.
 * @returns {{ bp: { bquan: number, price: number, bo_id?: number, obj?: object, useup?: boolean }, idx: number } | null}
 */
function onBillSlot(obj, shkp) {
    if (!shkp || !(obj.unpaid | 0)) return null;
    const eshk = ESHK(shkp);
    if (!eshk) return null;
    ensureEshopBillP(eshk);
    const arr = eshk.bill_p;
    const oid = obj.o_id;
    for (let i = 0; i < arr.length; i++) {
        const bp = arr[i];
        if (bp.obj === obj || (oid != null && bp.bo_id === oid)) return { bp, idx: i };
    }
    return null;
}

/** C: **`next_shkp`** bill filter — **`ESHK`->`billct`** or **`bill_p`** length. */
function eshkBillCountForNextShkp(e) {
    if (!e) return 0;
    const ct = e.billct | 0;
    if (ct > 0) return ct;
    return e.bill_p?.length ?? 0;
}

/**
 * C: **`shk.c`** **`next_shkp`** tail before return — angry + **`!surcharge`** → **`rile_shk`**
 * (bill **`price`** bump loop; **`NOTANGRY`** already false when angry).
 */
function nextShkpRileIfAngryLikeC(shkp) {
    if (!shkpAngry(shkp)) return;
    const e = ESHK(shkp);
    if (!e || (e.surcharge | 0)) return;
    shkp.mpeaceful = 0;
    e.surcharge = 1;
    ensureEshopBillP(e);
    for (const bp of e.bill_p) {
        const p = bp.price | 0;
        bp.price = p + Math.trunc((p + 2) / 3);
    }
}

/**
 * C: **`shk.c`** **`next_shkp(fmon, withbill)`** order (**`g.level.monsters`** vs C **`nmon`**).
 * @param {boolean} withbill — C TRUE: require non-empty bill.
 */
function* iterateNextShkpLikeC(g, withbill) {
    for (const shkp of g.level?.monsters ?? []) {
        if ((shkp.mhp | 0) <= 0) continue;
        if (!(shkp.isshk | 0)) continue;
        const e = ESHK(shkp);
        if (!e) continue;
        if (withbill && !eshkBillCountForNextShkp(e)) continue;
        nextShkpRileIfAngryLikeC(shkp);
        yield shkp;
    }
}

/** C: **`shk.c`** **`onshopbill`** — silent bill lookup. */
function onShopBillObj(obj, shkp) {
    return onBillSlot(obj, shkp) != null;
}

/**
 * C: **`shk.c`** **`find_objowner(obj, x, y)`** — shared shop walls; **`OBJ_ONBILL`** scans bill-holding shks.
 * @param {import('./gstate.js').game} g
 * @returns {object | null}
 */
export function findObjowner(g, obj, x, y) {
    const xh = x | 0;
    const yh = y | 0;
    if ((obj?.where | 0) === OBJ_ONBILL) {
        for (const shkp of iterateNextShkpLikeC(g, true)) {
            if (onShopBillObj(obj, shkp)) return shkp;
        }
        return null;
    }
    const rnos = inRoomsShopbaseRoomnos(g, xh, yh);
    let deflt = null;
    for (const roomno of rnos) {
        const shkp = shopKeeperForLevlRoomno(g, roomno | 0);
        if (!shkp) continue;
        if (onShopBillObj(obj, shkp)) return shkp;
        if (!deflt) deflt = shkp;
    }
    return deflt;
}

/**
 * C: shk.c **`sub_one_frombill`** — remove or shrink bill line; clear **`unpaid`**.
 * Omits C **`newobj`** phantom bill row when **`bquan > obj.quan`** (shrinks **`bquan`** only).
 * @param {object} obj
 * @param {object} shkp
 */
function subOneFromBill(obj, shkp) {
    const eshk = ESHK(shkp);
    const slot = onBillSlot(obj, shkp);
    if (!slot || !eshk?.bill_p) {
        if (obj.unpaid | 0) obj.unpaid = 0;
        return;
    }
    const { bp, idx } = slot;
    obj.unpaid = 0;
    const oq = Math.max(1, obj.quan | 0);
    const bq = Math.max(0, bp.bquan | 0);
    if (bq > oq) {
        bp.bquan = bq - oq;
        return;
    }
    eshk.bill_p.splice(idx, 1);
    if (typeof eshk.billct === 'number') eshk.billct = Math.max(0, (eshk.billct | 0) - 1);
}

/**
 * C: shk.c **`billable`** subset for **`stolen_value`** / bury (**`roomno`** = shop **`levl.roomno`** id).
 * @param {{ shkp: object | null }} shkRef in/out — C **`struct monst **shkpp`**
 */
function billableStolenValue(g, shkRef, obj, roomno, resetNocharge) {
    let shkp = shkRef.shkp;
    if (!shkp) {
        if (!roomno) return false;
        shkp = shopKeeperForLevlRoomno(g, roomno | 0);
        if (!shkp || !inHishop(g, shkp)) return false;
        shkRef.shkp = shkp;
    }
    if (onBillSlot(obj, shkp)) return false;
    const oc = obj.oclass | 0;
    if (oc === NH5_FOOD_CLASS && (obj.oeaten | 0)) return false;
    if (obj.no_charge | 0) {
        if (!Has_contents(obj)
            || (containedGold(obj, true) === 0
                && containedCostStolenBury(g, obj, shkp, 0, false, !resetNocharge) === 0)) {
            shkRef.shkp = null;
        }
        if (resetNocharge && !shkRef.shkp && oc !== NH5_COIN_CLASS) {
            obj.no_charge = 0;
            if (Has_contents(obj)) pickedContainerNoChargeClear(obj);
        }
    }
    return !!shkRef.shkp;
}

/**
 * C: shk.c **`stolen_container`** — nested **`cobj`** / **`nobj`**; floor bury uses **`!no_charge`** (**`ininv` FALSE**).
 * **`billable`/`onbill`/`sub_one_frombill`** when **`eshk.bill_p`** rows exist ( **`bo_id`** or **`obj`** ref).
 */
function stolenContainerMerchBurySilent(g, obj, shkp, ininv) {
    if (!Has_contents(obj)) return 0;
    const eshk = ESHK(shkp);
    const roomno = eshk ? eshkShoproomAsLevlRno(eshk) : 0;
    let price = 0;
    for (let otmp = obj.cobj; otmp; otmp = otmp.nobj) {
        if ((otmp.oclass | 0) === NH5_COIN_CLASS) continue;
        let billamt = 0;
        const shkRef = { shkp };
        if (!billableStolenValue(g, shkRef, otmp, roomno, true)) {
            const shk2 = shkRef.shkp;
            const slot = onBillSlot(otmp, shk2);
            if (slot) {
                billamt = (slot.bp.bquan | 0) * (slot.bp.price | 0);
                subOneFromBill(otmp, shk2);
            }
        }
        if (billamt) {
            price += billamt;
        } else if (ininv ? !!(otmp.unpaid | 0) : !(otmp.no_charge | 0)) {
            price += getPricingUnitsStolenBury(otmp) * getCostStolenBuryUnit(g, otmp, shkp);
        }
        if (Has_contents(otmp)) price += stolenContainerMerchBurySilent(g, otmp, shkp, ininv);
    }
    return price;
}

/**
 * C: shk.c **`stolen_value`** subset for **`dig.c`** **`bury_objs`** (**`silent` TRUE**):
 * **`find_objowner`** → **`roomno`** (else first **`in_rooms`** shop room); coin **`quan`**;
 * **`billable`/`onbill`/`sub_one_frombill`** then **`get_pricing_units * get_cost`** (**`obj_oc_cost_data.js`** **`oc_cost`**, **`shk.c`** **`getprice`** + **`get_cost`** including angry **`surcharge`**);
 * **`Has_contents`** → **`stolen_container`** + **`contained_gold(obj, TRUE)`** (floor **`ininv` FALSE**).
 * Still TODO: real **`mons[]`** + **`cnutrit`** for **`corpsenm_price_adj`**, C phantom bill row, **`addtobill`**.
 * @param {object | null} shkpFallback — C bury path has tile shk; used when **`billable`** leaves **`shkp` unset**.
 * @param {boolean} silent — C **`silent`** (suppresses per-object **`You`** / thief **`Norep`**; **`check_credit`** still plines like C)
 */
export async function stolenValueMerchBurySilent(g, obj, x, y, shkpFallback, silent) {
    const xh = x | 0;
    const yh = y | 0;
    const owner = findObjowner(g, obj, xh, yh);
    let roomno;
    if (owner) {
        const eo = ESHK(owner);
        roomno = eo ? eshkShoproomAsLevlRno(eo) : 0;
    } else {
        const rnos = inRoomsShopbaseRoomnos(g, xh, yh);
        roomno = rnos[0] | 0;
    }
    const uCount = Has_contents(obj) ? countUnpaidContentsCobj(obj) : 0;
    const shkRef = { shkp: /** @type {object | null} */ (null) };
    let billamt = 0;
    if (!billableStolenValue(g, shkRef, obj, roomno, true)) {
        const shk2 = shkRef.shkp;
        const slot = onBillSlot(obj, shk2);
        if (slot) {
            billamt = (slot.bp.bquan | 0) * (slot.bp.price | 0);
            subOneFromBill(obj, shk2);
        }
        if (!slot && !uCount) return 0;
    }
    const shkActive = shkRef.shkp || shkpFallback;
    if (!shkActive) return 0;
    const e = ESHK(shkActive);
    if (!e) return 0;

    const peaceful = !!(shkActive.mpeaceful | 0);
    let value = 0;
    let gvalue = 0;
    const oc = obj.oclass | 0;
    if (oc === NH5_COIN_CLASS) {
        gvalue += Math.max(0, obj.quan | 0);
    } else {
        if (billamt) {
            value += billamt;
        } else if (!(obj.no_charge | 0)) {
            value += getPricingUnitsStolenBury(obj) * getCostStolenBuryUnit(g, obj, shkActive);
        }
        if (Has_contents(obj)) {
            value += stolenContainerMerchBurySilent(g, obj, shkActive, false);
            gvalue += containedGold(obj, true);
        }
    }
    if (gvalue + value === 0) return 0;
    value += gvalue;

    if (peaceful) {
        value = await checkCreditShk(g, value, shkActive);
        if (shkpAngry(shkActive)) e.robbed = (e.robbed | 0) + value;
        else e.debit = (e.debit | 0) + value;
        void silent;
        return value;
    }
    e.robbed = (e.robbed | 0) + value;
    if (!silent) {
        /* C: canseemon / Deaf thief **`Norep`** — not ported */
    }
    await hotPursuitShk(g, shkActive);
    return value;
}

/**
 * C: dig.c **`bury_objs`** shop pass — walk floor **`nexthere`** at **`(x,y)`** before chain is buried.
 * @returns {{ loss: number, costly: boolean, shkp: object | null }}
 */
export async function applyBuryObjsShopCreditAndDebt(g, x, y) {
    const xh = x | 0;
    const yh = y | 0;
    const monMoving = !!(g.svc?.context?.mon_moving);
    const k = floorObjKey(xh, yh);
    const head = g.level?.floorObjHeads?.get(k);
    const rnos = inRoomsShopbaseRoomnos(g, xh, yh);
    const shkp = rnos.length ? shopKeeperForLevlRoomno(g, rnos[0]) : null;
    const costly = !!(shkp && costlySpot(g, xh, yh));
    let loss = 0;
    if (costly && !monMoving && head) {
        for (let o = head; o; o = o.nexthere) {
            loss += await stolenValueMerchBurySilent(g, o, xh, yh, shkp, true);
            if ((o.oclass | 0) !== NH5_COIN_CLASS) o.no_charge = 1;
        }
    }
    return { loss, costly, shkp };
}

/**
 * C: shk.c addtobill(otmp, …) — unpaid hero destruction in shop.
 * @param {object} _g
 * @param {object} _otmp
 * @param {number} _n
 */
function addtobillFloorStub(_g, _otmp, _n) {
    void _g;
    void _otmp;
    void _n;
}

function removeFloorObjFromLevel(g, otmp) {
    unlinkFloorObject(otmp);
    const arr = g.level?.objects;
    if (arr) {
        const i = arr.indexOf(otmp);
        if (i >= 0) arr.splice(i, 1);
    }
}

/**
 * C: invent.c useupf(obj, numused) — floor stack: **`costly_spot`** billing then **`delobj`** /
 * decrement **`quan`**. Omits **`splitobj`** (mutate stack in place), **`hideunder`**, **`mon_moving`**.
 * @param {typeof game} [g]
 * @param {{ ox?: number, oy?: number, quan?: number }} obj
 * @param {number} numused
 */
export function useupfFloor(g = game, obj, numused) {
    const scrquan = obj.quan ?? 1;
    const n = Math.min(Math.max(0, numused | 0), scrquan);
    if (n <= 0) return;

    /* C: !svc.context.mon_moving — not ported; hero burn_floor_objects is always hero. */
    if (costlySpot(g, obj.ox | 0, obj.oy | 0)) {
        /* C: strchr(u.urooms, *in_rooms(...)) ? addtobill : stolen_value — **`addtobill`** still stub. */
        addtobillFloorStub(g, obj, n);
    }

    if (n >= scrquan) removeFloorObjFromLevel(g, obj);
    else obj.quan = scrquan - n;
}

/**
 * C: shk.c adisturb (subset) — peaceful shopkeeper / temple priest / vault guard
 * becomes hostile when struck. No-op if not those roles or already hostile.
 * @param {{ mpeaceful?: number, isshk?: number, ispriest?: number, isgd?: number, mAngry?: number }} mtmp
 */
export async function adisturb(mtmp) {
    if (!mtmp) return;
    const m = /** @type {Record<string, unknown>} */ (mtmp);
    if (!(m.isshk || m.ispriest || m.isgd)) return;
    if (!(mtmp.mpeaceful | 0)) return;
    mtmp.mpeaceful = 0;
    m.mAngry = 1;
    if (m.isshk) await pline('The shopkeeper gets angry!');
    else if (m.ispriest) await pline('The priest gets angry!');
    else await pline('The guard gets angry!');
}
