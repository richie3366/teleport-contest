// shop.js — Shopkeeper and shop-adjacent hooks.
// C ref: shk.c fix_shop_damage(), repair_damage(), repairable_damage(), shk_impaired(), next_shkp();
//        adisturb(), costly_spot(), add_damage(); invent.c useupf() billing;
//        hack.c in_rooms() for **`SHOPBASE`**.

import { game } from './gstate.js';
import { pline, newsym } from './display.js';
import { unlinkFloorObject, floorObjKey } from './floorobj.js';
import { cansee, vision_recalc } from './vision.js';
import { delEngrAt } from './engrave.js';
import { raceptr, passesWalls } from './mondata.js';
import { heroPassesWalls } from './walkable.js';
import { dist2 } from './hacklib.js';
import { rn2 } from './rng.js';
import { nhgetch } from './input.js';
import { changeLuck } from './attrib.js';
import { NH5_COIN_CLASS } from './nh5_objclass.js';
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

/**
 * C: shk.c **`stolen_value`** subset for **`dig.c`** **`bury_objs`** ( **`silent` TRUE** ):
 * coin **`quan`**, else **`!no_charge`** and **`price * quan`** when **`price`** set.
 * Omits **`billable`/`onbill`/`get_cost`/`stolen_container`/`find_objowner`**.
 * @param {boolean} silent — C **`silent`** (suppresses per-object **`You`** / thief **`Norep`**; **`check_credit`** still plines like C)
 */
export async function stolenValueMerchBurySilent(g, obj, x, y, shkp, silent) {
    void x;
    void y;
    if (!shkp) return 0;
    const e = ESHK(shkp);
    if (!e) return 0;
    const peaceful = !!(shkp.mpeaceful | 0);
    let value = 0;
    let gvalue = 0;
    const oc = obj.oclass | 0;
    if (oc === NH5_COIN_CLASS) {
        gvalue += Math.max(0, obj.quan | 0);
    } else if (!(obj.no_charge | 0)) {
        const quan = Math.max(1, obj.quan | 0);
        const pr = obj.price | 0;
        if (pr > 0) value += pr * quan;
    }
    if (gvalue + value === 0) return 0;
    value += gvalue;

    if (peaceful) {
        value = await checkCreditShk(g, value, shkp);
        if (shkpAngry(shkp)) e.robbed = (e.robbed | 0) + value;
        else e.debit = (e.debit | 0) + value;
        void silent;
        return value;
    }
    e.robbed = (e.robbed | 0) + value;
    if (!silent) {
        /* C: canseemon / Deaf thief **`Norep`** — not ported */
    }
    await hotPursuitShk(g, shkp);
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
        /* C: strchr(u.urooms, *in_rooms(...)) ? addtobill : stolen_value — stubs until shk/in_rooms. */
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
