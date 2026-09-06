// dbridge.js — Drawbridge find / open / close / destroy.
// C ref: dbridge.c is_drawbridge_wall / find_drawbridge /
//        get_wall_for_db / open_drawbridge / close_drawbridge /
//        destroy_drawbridge; invent.c delallobj (open/close).
// Envelope (D-0959/D-0977): terrain + messages + wake + trap/engr
// clear + vision/stronghold flags; dig furniture_handled / dighole;
// music passtune open/close.
// Entity family: e_at / m_to_e / u_to_e / set_entity / is_u /
// e_canseemon / e_nam / E_phrase live (C order; callers in do_entity
// unwired until that port).
// Named omit: do_entity crush/jump/relocate (e_jumps/e_survives_at/e_died);
// revive_nasty; scatter iron-chain debris rn2 loop; flooreffects body
// (boulder → delobj in liquid); nokiller; Blind/Unaware You_see polish.

import { game } from './gstate.js';
import { pline, newsym, canseemon } from './display.js';
import { cansee, recalc_block_point, vision_recalc } from './vision.js';
import { obj_extract_self, delobj, objects_at } from './mkobj.js';
import { m_at } from './mon.js';
import { mons } from './monsters.js';
import { t_at, deltrap } from './trap.js';
import { del_engr_at } from './engrave.js';
import { hliquid, mon_nam, Monnam } from './do_name.js';
import { vtense } from './objnam.js';
import { objectNames } from './generated/objects_data.js';
import { PM_LONG_WORM_TAIL } from './generated/monsters_data.js';
import { dist2 } from './hacklib.js';
import { unpunish } from './read.js';
import {
    isok, u_at, ENTITIES, IS_DRAWBRIDGE, DRAWBRIDGE_UP, DRAWBRIDGE_DOWN,
    DB_NORTH, DB_SOUTH, DB_EAST, DB_WEST, DB_DIR, DB_MOAT, DB_LAVA, DB_ICE,
    DB_UNDER, W_NONDIGGABLE,
    DOOR, D_NODOOR, DBWALL, MOAT, LAVAPOOL, ROOM, ICE, ICED_MOAT,
    Is_stronghold,
} from './const.js';

const BOULDER = objectNames.indexOf('BOULDER');

/** C ref: pline.c You_hear — acoustics/Deaf; Unaware/Underwater deferred. */
async function You_hear(line) {
    const u = game.u || {};
    if (u.Deaf || game.flags?.acoustics === false) return;
    await pline(`You hear ${line}`);
}

/**
 * C ref: pline.c You_see — "You see " prefix; Blind→sense / Unaware deferred.
 */
async function You_see(line) {
    const u = game.u || {};
    const blind = !!((u.HBlinded | 0) || (u.EBlinded | 0) || u.Blind);
    if (blind) await pline(`You sense ${line}`);
    else await pline(`You see ${line}`);
}

/** C ref: distu — squared distance from hero. */
function distu(x, y) {
    const u = game.u || {};
    return dist2(u.ux | 0, u.uy | 0, x | 0, y | 0);
}

/**
 * C ref: invent.c delallobj — destroy floor pile at (x,y) for drawbridge.
 * Named omit: none beyond delobj invocation-item resist path.
 */
function delallobj(x, y) {
    const u = game.u || {};
    let otmp = objects_at(x, y);
    while (otmp) {
        if (otmp === u.uball) unpunish();
        // after unpunish(), or might get deallocated chain
        const otmp2 = otmp.nexthere;
        if (otmp === u.uchain) {
            otmp = otmp2;
            continue;
        }
        delobj(otmp);
        otmp = otmp2;
    }
}

/** C ref: mon.c wake_nearto — clear sleep/wait within dist2 (no RNG). */
function wake_nearto(x, y, distance) {
    for (const mtmp of game.fmon || []) {
        if (!mtmp || mtmp.mx == null) continue;
        const dx = (mtmp.mx | 0) - (x | 0);
        const dy = (mtmp.my | 0) - (y | 0);
        if (distance === 0 || dx * dx + dy * dy < distance) {
            mtmp.msleeping = 0;
            if (mtmp.mstrategy != null) mtmp.mstrategy &= ~0x01;
        }
    }
}

/** C ref: mkobj.c sobj_at — first floor object of otyp at (x,y). */
function sobj_at(otyp, x, y) {
    for (let o = objects_at(x, y); o; o = o.nexthere) {
        if ((o.otyp | 0) === (otyp | 0)) return o;
    }
    return null;
}

/**
 * C ref: dbridge.c is_drawbridge_wall — DB dir if (x,y) is portcullis
 * DOOR/DBWALL adjacent to a drawbridge, else -1.
 */
export function is_drawbridge_wall(x, y) {
    if (!isok(x, y)) return -1;
    const lev = game.level?.at(x, y);
    if (!lev) return -1;
    if (lev.typ !== DOOR && lev.typ !== DBWALL) return -1;

    const e = game.level.at(x + 1, y);
    if (e && IS_DRAWBRIDGE(e.typ)
        && ((e.drawbridgemask | 0) & DB_DIR) === DB_WEST) {
        return DB_WEST;
    }
    const w = game.level.at(x - 1, y);
    if (w && IS_DRAWBRIDGE(w.typ)
        && ((w.drawbridgemask | 0) & DB_DIR) === DB_EAST) {
        return DB_EAST;
    }
    const n = game.level.at(x, y - 1);
    if (n && IS_DRAWBRIDGE(n.typ)
        && ((n.drawbridgemask | 0) & DB_DIR) === DB_SOUTH) {
        return DB_SOUTH;
    }
    const s = game.level.at(x, y + 1);
    if (s && IS_DRAWBRIDGE(s.typ)
        && ((s.drawbridgemask | 0) & DB_DIR) === DB_NORTH) {
        return DB_NORTH;
    }
    return -1;
}

/**
 * C ref: dbridge.c is_db_wall :169–173 — closed portcullis (typ == DBWALL).
 * Callers: zap.c zap_updown WAN_OPENING / WAN_STRIKING / WAN_LOCKING;
 * lock/hack/dig named.
 */
export function is_db_wall(x, y) {
    return (game.level?.at(x, y)?.typ | 0) === DBWALL;
}

/**
 * C ref: dbridge.c find_drawbridge — if (xy) is bridge or wall, set to
 * bridge coords and return true.
 * @param {{x:number,y:number}} xy mutable
 */
export function find_drawbridge(xy) {
    const lev = game.level?.at(xy.x, xy.y);
    if (lev && IS_DRAWBRIDGE(lev.typ)) return true;
    const dir = is_drawbridge_wall(xy.x, xy.y);
    if (dir >= 0) {
        switch (dir) {
        case DB_NORTH: xy.y++; break;
        case DB_SOUTH: xy.y--; break;
        case DB_EAST: xy.x--; break;
        case DB_WEST: xy.x++; break;
        }
        return true;
    }
    return false;
}

/**
 * C ref: dbridge.c get_wall_for_db — move (xy) from bridge to wall cell.
 * @param {{x:number,y:number}} xy mutable
 */
export function get_wall_for_db(xy) {
    const lev = game.level?.at(xy.x, xy.y);
    const dir = (lev?.drawbridgemask | 0) & DB_DIR;
    switch (dir) {
    case DB_NORTH: xy.y--; break;
    case DB_SOUTH: xy.y++; break;
    case DB_EAST: xy.x++; break;
    case DB_WEST: xy.x--; break;
    }
}

/**
 * C ref: decl.c occupants zero-init — C `go.occupants` (instance_globals_o
 * `struct entity occupants[ENTITIES]`, `{ { 0 } }`) lives on `game` here,
 * lazily zeroed to ENTITIES records.
 */
function occupants() {
    let occ = game.occupants;
    if (!Array.isArray(occ) || occ.length !== ENTITIES) {
        occ = [];
        for (let i = 0; i < ENTITIES; i++) {
            occ.push({ emon: null, edata: null, ex: 0, ey: 0 });
        }
        game.occupants = occ;
    }
    return occ;
}

/**
 * C ref: dbridge.c e_at `:286–301` — first valid occupant record at
 * (x,y), else null. C `debugpline1` is D_DEBUG-only, omitted.
 */
export function e_at(x, y) {
    const occ = occupants();
    for (let entitycnt = 0; entitycnt < ENTITIES; entitycnt++) {
        if (occ[entitycnt].edata
            && (occ[entitycnt].ex | 0) === (x | 0)
            && (occ[entitycnt].ey | 0) === (y | 0)) {
            return occ[entitycnt];
        }
    }
    return null;
}

/**
 * C ref: dbridge.c m_to_e `:304–319` — fill etmp from the monster at
 * (x,y), or clear it when mtmp is null. Worm-tail edata when the
 * recorded square differs from the worm head (C `&mons[PM_LONG_WORM_TAIL]`).
 */
export function m_to_e(mtmp, x, y, etmp) {
    etmp.emon = mtmp;
    if (mtmp) {
        etmp.ex = x | 0;
        etmp.ey = y | 0;
        if (mtmp.wormno && ((x | 0) !== (mtmp.mx | 0) || (y | 0) !== (mtmp.my | 0))) {
            etmp.edata = mons(PM_LONG_WORM_TAIL);
        } else {
            etmp.edata = mtmp.data;
        }
    } else {
        etmp.edata = null;
        etmp.ex = etmp.ey = 0;
    }
}

/**
 * C ref: dbridge.c u_to_e `:321–328` — fill etmp from the hero
 * (C `&gy.youmonst`, `u.ux/u.uy`, `gy.youmonst.data`).
 */
export function u_to_e(etmp) {
    const u = game.u || {};
    etmp.emon = game.youmonst;
    etmp.ex = u.ux | 0;
    etmp.ey = u.uy | 0;
    etmp.edata = game.youmonst ? game.youmonst.data : null;
}

/**
 * C ref: dbridge.c set_entity `:330–339` — record whoever is at the
 * span/portcullis square into etmp. C notes `m_at()` may yield null
 * and that is fine (m_to_e clears the record then).
 */
export function set_entity(x, y, etmp) {
    if (u_at(x, y)) {
        u_to_e(etmp);
    } else {
        m_to_e(m_at(x, y), x, y, etmp);
    }
}

/**
 * C ref: dbridge.c is_u macro `:341` — the occupant is the hero
 * (C `etmp->emon == &gy.youmonst`, pointer identity).
 */
export function is_u(etmp) {
    return etmp.emon === game.youmonst;
}

/**
 * C ref: dbridge.c e_canseemon macro `:342` — hero always, else
 * C `canseemon(etmp->emon)`.
 */
export function e_canseemon(etmp) {
    return is_u(etmp) || canseemon(etmp.emon);
}

/**
 * C ref: dbridge.c e_nam `:351–355` — "you" for the hero, else
 * C `mon_nam(etmp->emon)`.
 */
export function e_nam(etmp) {
    return is_u(etmp) ? 'you' : mon_nam(etmp.emon);
}

/**
 * C ref: dbridge.c E_phrase `:361–377` — capitalized entity name plus an
 * optional verb, 2nd→3rd person converted for monsters (C `vtense` with a
 * null subject). C writes a static 80-char buffer; JS returns the string
 * (callers consume it immediately in pline args).
 */
export function E_phrase(etmp, verb) {
    let s = is_u(etmp) ? 'You' : Monnam(etmp.emon);
    if (!verb || !verb[0]) return s;
    s += ' ';
    s += is_u(etmp) ? verb : vtense(null, verb);
    return s;
}

/**
 * C ref: dbridge.c close_drawbridge — raise bridge at (x,y).
 * Terrain + messages + delallobj + traps/engr + vision. Crush/entity
 * and revive_nasty deferred (named omit).
 */
export async function close_drawbridge(x, y) {
    const lev1 = game.level?.at(x, y);
    if (!lev1 || lev1.typ !== DRAWBRIDGE_DOWN) return;

    const wall = { x: x | 0, y: y | 0 };
    get_wall_for_db(wall);
    const x2 = wall.x | 0;
    const y2 = wall.y | 0;
    const lev2 = game.level?.at(x2, y2);
    if (!lev2) return;

    const u = game.u || {};
    if (cansee(x, y) || cansee(x2, y2)) {
        const coming = (((u.ux | 0) === (x | 0) || (u.uy | 0) === (y | 0))
                && !u.Underwater)
            || distu(x2, y2) < distu(x, y);
        await You_see(`a drawbridge ${coming ? 'coming' : 'going'} up!`);
    } else {
        await You_hear('chains rattling and gears turning.');
    }

    lev1.typ = DRAWBRIDGE_UP;
    lev2.typ = DBWALL;
    switch ((lev1.drawbridgemask | 0) & DB_DIR) {
    case DB_NORTH:
    case DB_SOUTH:
        lev2.horizontal = true;
        break;
    case DB_WEST:
    case DB_EAST:
        lev2.horizontal = false;
        break;
    }
    lev2.wall_info = (lev2.wall_info | 0) | W_NONDIGGABLE;
    // set_entity / do_entity deferred

    if (objects_at(x, y) && !(u.Deaf || game.flags?.acoustics === false)) {
        await You_hear('smashing and crushing.');
    }
    // revive_nasty deferred
    delallobj(x, y);
    delallobj(x2, y2);
    {
        const t = t_at(x, y);
        if (t) deltrap(t);
    }
    {
        const t = t_at(x2, y2);
        if (t) deltrap(t);
    }
    del_engr_at(x, y);
    del_engr_at(x2, y2);
    newsym(x, y);
    newsym(x2, y2);
    recalc_block_point(x2, y2); // C block_point
    vision_recalc(0);
    // nokiller deferred
}

/**
 * C ref: dbridge.c open_drawbridge — lower bridge at (x,y).
 * Terrain + messages + delallobj + traps/engr + vision + stronghold
 * uopened_dbridge. Crush/entity and revive_nasty deferred.
 */
export async function open_drawbridge(x, y) {
    const lev1 = game.level?.at(x, y);
    if (!lev1 || lev1.typ !== DRAWBRIDGE_UP) return;

    const wall = { x: x | 0, y: y | 0 };
    get_wall_for_db(wall);
    const x2 = wall.x | 0;
    const y2 = wall.y | 0;
    const lev2 = game.level?.at(x2, y2);
    if (!lev2) return;

    if (cansee(x, y) || cansee(x2, y2)) {
        const going = distu(x2, y2) < distu(x, y);
        await You_see(`a drawbridge ${going ? 'going' : 'coming'} down!`);
    } else {
        await You_hear('gears turning and chains rattling.');
    }

    lev1.typ = DRAWBRIDGE_DOWN;
    lev2.typ = DOOR;
    lev2.doormask = D_NODOOR;
    // set_entity / do_entity deferred

    // revive_nasty deferred
    delallobj(x, y);
    {
        const t = t_at(x, y);
        if (t) deltrap(t);
    }
    {
        const t = t_at(x2, y2);
        if (t) deltrap(t);
    }
    del_engr_at(x, y);
    del_engr_at(x2, y2);
    newsym(x, y);
    newsym(x2, y2);
    recalc_block_point(x2, y2); // C unblock_point — JS rebuilds
    vision_recalc(0);
    if (Is_stronghold(game.u?.uz)) {
        const uu = game.u || {};
        if (!uu.uevent) uu.uevent = {};
        uu.uevent.uopened_dbridge = true;
    }
    // nokiller deferred
}

/**
 * C ref: dbridge.c destroy_drawbridge — collapse bridge at (x,y).
 * Terrain + messages + wake + clear traps/engr + vision + stronghold
 * flags. Crush/entity and iron-chain scatter deferred (named omit).
 */
export async function destroy_drawbridge(x, y) {
    const lev1 = game.level?.at(x, y);
    if (!lev1 || !IS_DRAWBRIDGE(lev1.typ)) return;

    const wall = { x: x | 0, y: y | 0 };
    get_wall_for_db(wall);
    const x2 = wall.x | 0;
    const y2 = wall.y | 0;
    const lev2 = game.level?.at(x2, y2);
    if (!lev2) return;

    // C: (mask & DB_UNDER) == DB_MOAT || == DB_LAVA (DB_MOAT is 0).
    const underBits = (lev1.drawbridgemask | 0) & DB_UNDER;
    const isMoatOrLava = underBits === DB_MOAT || underBits === DB_LAVA;

    if (isMoatOrLava) {
        const lava = underBits === DB_LAVA;
        if (lev1.typ === DRAWBRIDGE_UP) {
            if (cansee(x2, y2) || u_at(x2, y2)) {
                await pline(
                    `The portcullis of the drawbridge falls into the ${
                        lava ? hliquid('lava') : 'moat'
                    }!`,
                );
            } else {
                await You_hear('a loud *SPLASH*!');
            }
        } else {
            if (cansee(x, y) || u_at(x, y)) {
                await pline(
                    `The drawbridge collapses into the ${
                        lava ? hliquid('lava') : 'moat'
                    }!`,
                );
            } else {
                await You_hear('a loud *SPLASH*!');
            }
        }
        lev1.typ = lava ? LAVAPOOL : MOAT;
        lev1.drawbridgemask = 0;
        const otmp2 = sobj_at(BOULDER, x, y);
        if (otmp2) {
            // flooreffects deferred — dunk boulder into liquid
            obj_extract_self(otmp2);
            delobj(otmp2);
        }
    } else {
        if (cansee(x, y) || u_at(x, y)) {
            await pline('The drawbridge disintegrates!');
        } else {
            await You_hear('a loud *CRASH*!');
        }
        const iceUnder = ((lev1.drawbridgemask | 0) & DB_ICE) !== 0;
        lev1.typ = iceUnder ? ICE : ROOM;
        lev1.icedpool = iceUnder ? ICED_MOAT : 0;
    }

    wake_nearto(x, y, 500);
    lev2.typ = DOOR;
    lev2.doormask = D_NODOOR;

    {
        const t = t_at(x, y);
        if (t) deltrap(t);
    }
    {
        const t = t_at(x2, y2);
        if (t) deltrap(t);
    }
    del_engr_at(x, y);
    del_engr_at(x2, y2);
    // scatter IRON_CHAIN debris rn2(6) loop deferred (no partial RNG)

    newsym(x, y);
    newsym(x2, y2);
    recalc_block_point(x2, y2);
    vision_recalc(0);

    if (Is_stronghold(game.u?.uz)) {
        const u = game.u || {};
        if (!u.uevent) u.uevent = {};
        u.uevent.uopened_dbridge = true;
        u.uevent.uheard_tune = 3;
    }
    // set_entity / do_entity / e_died crush deferred
}
