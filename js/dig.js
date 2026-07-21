// dig.js — Monster tunneling / terrain dig / wand dig.
// C ref: dig.c mdig_tunnel / zap_dig / draft_message / watch_dig /
//        dig_check / fillholetyp / digactualhole / liquid_flow;
//        trap.c fill_pit; apply.c maybe_dunk_boulders;
//        hack.c may_dig. (D-0941 watch_dig + angry_guards wire;
//        D-0950 break-wand dig helpers)

import { game } from './gstate.js';
import { rn1, rn2, rnd } from './rng.js';
import {
    newsym, pline, You_feel, tmp_at, nh_delay_output, verbalize,
} from './display.js';
import { cansee, recalc_block_point } from './vision.js';
import { cvt_sdoor_to_door } from './detect.js';
import { mksobj_at, objects_at, obj_extract_self, delobj } from './mkobj.js';
import {
    in_rooms, in_town, stop_occupation, is_pool, is_lava,
} from './hack.js';
import { objectNames } from './generated/objects_data.js';
import { CLR_WHITE } from './terminal.js';
import { is_watch, is_flyer, is_floater } from './monsters.js';
import { m_canseeu } from './mondata.js';
import { an, An } from './objnam.js';
import { hliquid, Monnam } from './do_name.js';
import { stairway_at } from './mklev.js';
import {
    t_at, maketrap, seetrap, feeltrap, set_utrap, reset_utrap, deltrap,
    trapname, mintrap,
} from './trap.js';
import {
    IS_STWALL, IS_TREE, IS_WALL, IS_OBSTRUCTED, IS_DOOR, IS_FOUNTAIN,
    IS_THRONE, IS_ALTAR, IS_ROOM,
    W_NONDIGGABLE, SDOOR, SCORR, CORR, ROOM, DOOR, TREE, STONE,
    D_NODOOR, D_BROKEN, D_TRAPPED, D_CLOSED, D_LOCKED,
    SHOPBASE, SHOP_DOOR_COST, SHOP_PIT_COST, TT_PIT, isok,
    Is_earthlevel, Is_airlevel, Is_waterlevel, Is_juiblex_level,
    Can_dig_down, DISP_BEAM, DISP_END,
    DIGCHECK_PASSED_PITONLY, DIGCHECK_PASSED_DESTROY_TRAP,
    DIGCHECK_FAIL_ONLADDER, DIGCHECK_FAIL_ONSTAIRS,
    DIGCHECK_FAIL_THRONE, DIGCHECK_FAIL_ALTAR, DIGCHECK_FAIL_AIRLEVEL,
    DIGCHECK_FAIL_WATERLEVEL, DIGCHECK_FAIL_TOOHARD,
    DIGCHECK_FAIL_UNDESTROYABLETRAP, DIGCHECK_FAIL_CANTDIG,
    DIGCHECK_FAIL_BOULDER, DIGCHECK_FAIL_OBJ_POOL_OR_TRAP,
    PIT, HOLE, MAGIC_PORTAL, VIBRATING_SQUARE, AM_SANCTUM,
    MOAT, POOL, LAVAPOOL, COLNO, ROWNO, is_pit, is_hole, u_at,
} from './const.js';

const BOULDER = objectNames.indexOf('BOULDER');
const ROCK = objectNames.indexOf('ROCK');
const TREEFRUITS = [
    objectNames.indexOf('APPLE'),
    objectNames.indexOf('ORANGE'),
    objectNames.indexOf('PEAR'),
    objectNames.indexOf('BANANA'),
    objectNames.indexOf('EUCALYPTUS_LEAF'),
].filter((i) => i >= 0);

function dist2(x0, y0, x1, y1) {
    const dx = x0 - x1;
    const dy = y0 - y1;
    return dx * dx + dy * dy;
}

/**
 * C: `#define wall_info flags` — one field. JS sometimes writes W_* bits to
 * `flags` while WM_MASK orientation lives on `wall_info` (D-0865). OR both
 * for dig/passwall checks so nondiggable maze walls are honored.
 */
function rm_wall_info(lev) {
    return ((lev.wall_info | 0) | (lev.flags | 0));
}

/** C ref: hack.c may_dig — diggable unless STWALL/TREE + W_NONDIGGABLE. */
export function may_dig(x, y) {
    const lev = game.level?.at(x, y);
    if (!lev) return false;
    const typ = lev.typ;
    return !((IS_STWALL(typ) || IS_TREE(typ))
        && (rm_wall_info(lev) & W_NONDIGGABLE));
}

function closed_door(x, y) {
    const loc = game.level?.at(x, y);
    if (!loc || !IS_DOOR(loc.typ)) return false;
    return !!((loc.doormask || 0) & (D_CLOSED | D_LOCKED));
}

function sobj_at(otyp, x, y) {
    for (let o = objects_at(x, y); o; o = o.nexthere) {
        if (o.otyp === otyp) return o;
    }
    return null;
}

function canseemon(mtmp) {
    if (!mtmp?.mx) return false;
    if (!cansee(mtmp.mx, mtmp.my)) return false;
    return !mtmp.minvis;
}

function Unaware() {
    return ((game.u?.multi | 0) < 0) && !!game.u?.usleep;
}

function Blind() {
    return !!(game.u?.Blind || game.u?.ublind);
}

/** Local m_at — avoid dig.js ↔ mon.js cycle (mon imports may_dig). */
function m_at(x, y) {
    for (const m of game.fmon || []) {
        if (m && (m.mx | 0) === (x | 0) && (m.my | 0) === (y | 0)
            && (m.mhp | 0) > 0) {
            return m;
        }
    }
    return null;
}

/** C: cmap_to_glyph(S_digbeam) — defsym '*' CLR_WHITE. */
function digbeam_glyph() {
    return { ch: '*', color: CLR_WHITE, dec: false };
}

/** C ref: dig.c draft_message — Hallucination branches deferred. */
async function draft_message(unexpected) {
    if (game.u?.Hallucination) return;
    if (unexpected) await You_feel('an unexpected draft.');
    else await You_feel('a draft.');
}

/**
 * C ref: dig.c is_digging — occupation == dig.
 * dig occupation body still absent → always false until pickaxe dig ports.
 */
export function is_digging() {
    // C: go.occupation == dig — dig fn not yet an occupation export
    return false;
}

/** C: BY_OBJECT ((struct monst *) 0) — wand break / object dig. */
const BY_OBJECT = null;

/** C ref: trap.h undestroyable_trap — portal / vibrating square. */
function undestroyable_trap(ttyp) {
    return ttyp === MAGIC_PORTAL || ttyp === VIBRATING_SQUARE;
}

/** C ref: dbridge.c is_pool_or_lava — drawbridge-under deferred. */
function is_pool_or_lava(x, y) {
    return is_pool(x, y) || is_lava(x, y);
}

/** C ref: dbridge.c is_moat — juiblex swamp not moat; drawbridge deferred. */
function is_moat(x, y) {
    if (!isok(x, y)) return false;
    if (Is_juiblex_level(game.u?.uz)) return false;
    return game.level?.at(x, y)?.typ === MOAT;
}

/** C ref: dungeon.c surface — enough for dig messages. */
function surface(x, y) {
    const loc = game.level?.at(x, y);
    const typ = loc?.typ ?? 0;
    if (IS_FOUNTAIN(typ)) return 'fountain';
    if (IS_ALTAR(typ)) return 'altar';
    if (IS_WALL(typ) || IS_STWALL(typ)) return 'wall';
    if (IS_DOOR(typ)) return 'doorway';
    if (IS_ROOM(typ) && !Is_earthlevel(game.u?.uz)) return 'floor';
    return 'ground';
}

/**
 * C ref: dig.c dig_check — may a digger create PIT/HOLE here?
 * @param {object|null} madeby BY_YOU / monster / BY_OBJECT(null)
 * @returns {number} DIGCHECK_*
 */
export function dig_check(madeby, x, y) {
    const ttmp = t_at(x, y);
    const lev = game.level?.at(x, y);
    if (!lev) return DIGCHECK_FAIL_TOOHARD;

    const stway = stairway_at(x, y);
    if (stway) {
        return stway.isladder
            ? DIGCHECK_FAIL_ONLADDER
            : DIGCHECK_FAIL_ONSTAIRS;
    }
    if (IS_THRONE(lev.typ) && madeby !== BY_OBJECT) {
        return DIGCHECK_FAIL_THRONE;
    }
    if (IS_ALTAR(lev.typ)
        && (madeby !== BY_OBJECT
            || ((lev.altarmask | 0) & AM_SANCTUM) !== 0)) {
        return DIGCHECK_FAIL_ALTAR;
    }
    if (Is_airlevel(game.u?.uz)) return DIGCHECK_FAIL_AIRLEVEL;
    if (Is_waterlevel(game.u?.uz)) return DIGCHECK_FAIL_WATERLEVEL;
    if (IS_OBSTRUCTED(lev.typ) && lev.typ !== SDOOR
        && (rm_wall_info(lev) & W_NONDIGGABLE) !== 0) {
        return DIGCHECK_FAIL_TOOHARD;
    }
    if (ttmp && undestroyable_trap(ttmp.ttyp)) {
        return DIGCHECK_FAIL_UNDESTROYABLETRAP;
    }
    if (!Can_dig_down(game.u?.uz) && !lev.candig) {
        if (ttmp) {
            if (!is_hole(ttmp.ttyp) && !is_pit(ttmp.ttyp)) {
                return DIGCHECK_PASSED_DESTROY_TRAP;
            }
            return DIGCHECK_FAIL_CANTDIG;
        }
        return DIGCHECK_PASSED_PITONLY;
    }
    if (sobj_at(BOULDER, x, y)) return DIGCHECK_FAIL_BOULDER;
    if (madeby === BY_OBJECT && (ttmp || is_pool_or_lava(x, y))) {
        return DIGCHECK_FAIL_OBJ_POOL_OR_TRAP;
    }
    return DIGCHECK_PASSED;
}

/**
 * C ref: dig.c fillholetyp — adjacent liquid to fill a new hole, else ROOM.
 */
export function fillholetyp(x, y, fill_if_any) {
    const lo_x = Math.max(1, x - 1);
    const hi_x = Math.min(x + 1, COLNO - 1);
    const lo_y = Math.max(0, y - 1);
    const hi_y = Math.min(y + 1, ROWNO - 1);
    let pool_cnt = 0;
    let moat_cnt = 0;
    let lava_cnt = 0;

    for (let x1 = lo_x; x1 <= hi_x; x1++) {
        for (let y1 = lo_y; y1 <= hi_y; y1++) {
            if (is_moat(x1, y1)) moat_cnt++;
            else if (is_pool(x1, y1)) pool_cnt++;
            else if (is_lava(x1, y1)) lava_cnt++;
        }
    }

    if (!fill_if_any) pool_cnt = (pool_cnt / 3) | 0;

    if ((lava_cnt > moat_cnt + pool_cnt && rn2(lava_cnt + 1))
        || (lava_cnt && fill_if_any)) {
        return LAVAPOOL;
    }
    if ((moat_cnt > 0 && rn2(moat_cnt + 1)) || (moat_cnt && fill_if_any)) {
        return MOAT;
    }
    if ((pool_cnt > 0 && rn2(pool_cnt + 1)) || (pool_cnt && fill_if_any)) {
        return POOL;
    }
    return ROOM;
}

/**
 * C ref: dig.c liquid_flow — after terrain set to pool/moat/lava.
 * Branch envelope: delfloortrap; fillmsg; hero pooleffects / mon minliquid
 * deferred thin; obj fire/water damage deferred.
 */
export async function liquid_flow(x, y, typ, ttmp, fillmsg) {
    if (!is_pool_or_lava(x, y)) return;
    if (ttmp) deltrap(ttmp);
    // obj_ice_effects / unearth_objs / damage chains deferred
    if (fillmsg) {
        const liq = hliquid(typ === LAVAPOOL ? 'lava' : 'water');
        await pline(String(fillmsg).replace('%s', liq));
    }
    if (u_at(x, y)) {
        // pooleffects deferred
    } else {
        const mon = m_at(x, y);
        if (mon) {
            const { minliquid } = await import('./mon.js');
            await minliquid(mon);
        }
    }
}

/**
 * C ref: dig.c digactualhole — create PIT or HOLE trap + side effects.
 * Branch envelope (D-0950): maketrap; BY_OBJECT/cansee messages; shop
 * add_damage / pay ruin; PIT at_u set_utrap; adjacent mon mintrap.
 * Named omit: furniture_handled (fountain/sink/drawbridge); altar
 * desecrate; HOLE hero fall goto_level / shopdig / impact_drop;
 * mon teleport_pet migrate; switch_terrain; pickup unearthed;
 * wake_nearby.
 */
export async function digactualhole(x, y, madeby, ttyp) {
    const lev = game.level?.at(x, y);
    if (!lev) return;
    const u = game.u || {};
    const madeby_u = madeby === game.youmonst;
    const madeby_obj = madeby === BY_OBJECT;
    const heros_fault = madeby_u || madeby_obj;
    const atHero = u_at(x, y);
    let wont_fall = !!(u.Levitation || u.Flying);

    // furniture_handled deferred — fountain/sink/drawbridge dig skip

    if (ttyp !== PIT && !Can_dig_down(u.uz) && !lev.candig) {
        ttyp = PIT;
    }

    const old_typ = lev.typ;
    const surface_type = surface(x, y);
    const shopdoor = IS_DOOR(lev.typ) && !!in_rooms(x, y, SHOPBASE);

    const ttmp = maketrap(x, y, ttyp);
    if (!ttmp) return;
    ttmp.madeby_u = heros_fault;
    ttmp.tseen = 0;
    if (cansee(x, y)) seetrap(ttmp);
    else if (madeby_u) feeltrap(ttmp);

    const tname = trapname(ttyp, true);
    const in_thru = ttyp === HOLE ? 'through' : 'in';
    if (madeby_u) {
        if (x !== (u.ux | 0) || y !== (u.uy | 0)) {
            await pline(`You dig an adjacent ${tname}.`);
        } else {
            await pline(`You dig ${an(tname)} ${in_thru} the ${surface_type}.`);
        }
    } else if (!madeby_obj && madeby && canseemon(madeby)) {
        await pline(
            `${Monnam(madeby)} digs ${an(tname)} ${in_thru} the ${surface_type}.`,
        );
    } else if (cansee(x, y) && game.flags?.verbose !== false) {
        if (IS_STWALL(old_typ)) {
            await pline(
                `The ${surface_type} crumbles into ${an(tname)}.`,
            );
        } else {
            await pline(`${An(tname)} appears in the ${surface_type}.`);
        }
    }

    if (ttyp === PIT) {
        if (shopdoor && heros_fault) {
            const { pay_for_damage } = await import('./shk.js');
            await pay_for_damage('ruin', false);
        } else {
            const { add_damage } = await import('./shk.js');
            add_damage(x, y, heros_fault ? SHOP_PIT_COST : 0);
        }
        if (atHero) {
            if (u.Levitation || u.Flying) wont_fall = true;
            if (!wont_fall) {
                set_utrap(rn1(4, 2), TT_PIT);
                if (game.vision) game.vision.full_recalc = 1;
            } else {
                reset_utrap(true);
            }
            // pickup unearthed deferred
        } else {
            const mtmp = m_at(x, y);
            if (mtmp) {
                if (is_flyer(mtmp.data) || is_floater(mtmp.data)) {
                    if (canseemon(mtmp)) {
                        await pline(
                            `${Monnam(mtmp)} ${
                                is_flyer(mtmp.data) ? 'flies' : 'floats'
                            } over the pit.`,
                        );
                    }
                } else if (mtmp !== madeby) {
                    await mintrap(mtmp, 0);
                }
            }
        }
    } else {
        // HOLE — hero fall / mon migrate named omit; shop door ruin
        if (shopdoor && heros_fault) {
            const { pay_for_damage } = await import('./shk.js');
            await pay_for_damage('ruin', false);
        }
        if (atHero && (u.ustuck || wont_fall || u.Levitation || u.Flying)) {
            // impact_drop / pickup deferred
        } else if (atHero) {
            // goto_level fall deferred — HOLE remains under hero
        } else {
            const mtmp = m_at(x, y);
            if (mtmp) {
                // teleport_pet / migrate_to_level deferred
            }
        }
    }
    newsym(x, y);
}

/**
 * C ref: trap.c fill_pit — boulder settles into pit/hole.
 * flooreffects body thin: extract + deltrap + delobj boulder.
 */
export function fill_pit(x, y) {
    const t = t_at(x, y);
    if (!t || !(is_pit(t.ttyp) || is_hole(t.ttyp))) return;
    const otmp = sobj_at(BOULDER, x, y);
    if (!otmp) return;
    obj_extract_self(otmp);
    deltrap(t);
    delobj(otmp);
    newsym(x, y);
}

/**
 * C ref: apply.c maybe_dunk_boulders — dunk boulders into pool/lava.
 * boulder_hits_pool deferred → extract+delobj while liquid present.
 */
export function maybe_dunk_boulders(x, y) {
    while (is_pool_or_lava(x, y)) {
        const otmp = sobj_at(BOULDER, x, y);
        if (!otmp) break;
        obj_extract_self(otmp);
        delobj(otmp);
    }
}

/**
 * C ref: dig.c watchman_canseeu — peaceful watch who can see the hero.
 */
function watchman_canseeu(mtmp) {
    return !!(is_watch(mtmp?.data) && mtmp.mcansee && m_canseeu(mtmp)
        && mtmp.mpeaceful);
}

/**
 * C ref: mon.c get_iter_mons — first living on-map mon where bfunc is true.
 */
function get_iter_mons(bfunc) {
    for (const mtmp of game.fmon || []) {
        if (!mtmp || (mtmp.mhp | 0) <= 0) continue;
        if ((mtmp.mx | 0) <= 0) continue;
        if (bfunc(mtmp)) return mtmp;
    }
    return null;
}

/**
 * C ref: dig.c watch_dig — town watch warns / arrests on wall/door damage.
 * Branch envelope: in_town + closed_door/SDOOR/WALL/FOUNTAIN/TREE;
 * find peaceful watching watchman; warn once then angry_guards on zap
 * or second offense; stop_occupation when digging.
 * Named omit: SetVoice.
 */
export async function watch_dig(mtmp, x, y, zap) {
    const lev = game.level?.at(x, y);
    if (!lev) return;
    if (!in_town(x, y)) return;
    if (!(closed_door(x, y) || lev.typ === SDOOR || IS_WALL(lev.typ)
        || IS_FOUNTAIN(lev.typ) || IS_TREE(lev.typ))) {
        return;
    }
    let watch = mtmp;
    if (!watch) watch = get_iter_mons(watchman_canseeu);
    if (!watch) return;

    if (!game.context) game.context = {};
    if (!game.context.digging) game.context.digging = {};
    const digging = game.context.digging;

    if (zap || digging.warned) {
        await verbalize("Halt, vandal!  You're under arrest!");
        // Lazy: mon.js imports dig.js statically.
        const { angry_guards } = await import('./mon.js');
        const Deaf = !!((game.u?.HDeaf | 0) || (game.u?.EDeaf | 0)
            || game.u?.uroleplay?.deaf || game.u?.Deaf);
        await angry_guards(!!Deaf);
    } else {
        let str;
        if (IS_DOOR(lev.typ)) str = 'door';
        else if (IS_TREE(lev.typ)) str = 'tree';
        else if (IS_OBSTRUCTED(lev.typ)) str = 'wall';
        else str = 'fountain';
        await verbalize(`Hey, stop damaging that ${str}!`);
        digging.warned = true;
    }
    if (is_digging()) await stop_occupation();
}

/**
 * C ref: mkobj.c rnd_treefruit_at — ROLL_FROM(treefruits) mksobj_at.
 */
function rnd_treefruit_at(x, y) {
    if (!TREEFRUITS.length) return null;
    return mksobj_at(TREEFRUITS[rn2(TREEFRUITS.length)], x, y, true, false);
}

/**
 * C ref: monmove.c mb_trapped subset — door trap after digger eats door.
 * wake_nearto / mon_learns_traps / full mondead deferred.
 */
async function mb_trapped(mtmp, canseeit) {
    if (game.flags?.verbose !== false) {
        if (canseeit && !Unaware()) {
            await pline('KABOOM!!  You see a door explode.');
        } else if (!game.u?.Deaf) {
            const far = dist2(mtmp.mx, mtmp.my, game.u.ux, game.u.uy) > 7 * 7;
            await pline(`You hear a ${far ? 'distant' : 'nearby'} explosion.`);
        }
    }
    mtmp.mstun = 1;
    mtmp.mhp -= rnd(15);
    if ((mtmp.mhp | 0) < 1) {
        mtmp.mhp = 0;
        mtmp.mx = 0;
        mtmp.my = 0;
        return true;
    }
    return false;
}

/**
 * C ref: dig.c mdig_tunnel — return true if monster died.
 * Branch envelope: SDOOR convert; closed-door eat (+trap); SCORR open;
 * open-floor early return (still burns pile=rnd(12)); WALL/TREE/STONE dig;
 * maze→ROOM / cavernous→CORR / else DOOR; pile&lt;5 boulder/rock or fruit.
 * Named omissions: Hallucination draft; Soundeffect; full mondead on
 * trap death; pay_for_damage.
 */
export async function mdig_tunnel(mtmp) {
    const pile = rnd(12);
    const here = game.level?.at(mtmp.mx, mtmp.my);
    if (!here) return false;

    if (here.typ === SDOOR) cvt_sdoor_to_door(here);

    if (closed_door(mtmp.mx, mtmp.my)) {
        if (in_rooms(mtmp.mx, mtmp.my, SHOPBASE)) {
            const { add_damage } = await import('./shk.js');
            add_damage(mtmp.mx, mtmp.my, 0);
        }
        const sawit = canseemon(mtmp);
        const trapped = !!((here.doormask || 0) & D_TRAPPED);
        here.doormask = trapped ? D_NODOOR : D_BROKEN;
        if (here.flags !== undefined) here.flags = here.doormask;
        recalc_block_point(mtmp.mx, mtmp.my);
        newsym(mtmp.mx, mtmp.my);
        if (trapped) {
            const seeit = canseemon(mtmp);
            if (await mb_trapped(mtmp, sawit || seeit)) {
                if (mtmp.mx) newsym(mtmp.mx, mtmp.my);
                return true;
            }
        } else if (game.flags?.verbose !== false) {
            if (!Unaware() && !rn2(3)) await draft_message(true);
        }
        return false;
    }

    if (here.typ === SCORR) {
        here.typ = CORR;
        here.flags = 0;
        recalc_block_point(mtmp.mx, mtmp.my);
        newsym(mtmp.mx, mtmp.my);
        await draft_message(false);
        return false;
    }

    if (!IS_OBSTRUCTED(here.typ) && !IS_TREE(here.typ)) {
        return false;
    }

    if ((rm_wall_info(here) & W_NONDIGGABLE) !== 0) {
        return false;
    }

    const lf = game.level?.flags || {};
    if (IS_WALL(here.typ)) {
        if (game.flags?.verbose !== false && !rn2(5)) {
            if (!game.u?.Deaf) await pline('You hear crashing rock.');
        }
        if (in_rooms(mtmp.mx, mtmp.my, SHOPBASE)) {
            const { add_damage } = await import('./shk.js');
            add_damage(mtmp.mx, mtmp.my, 0);
        }
        if (lf.is_maze_lev) {
            here.typ = ROOM;
            here.flags = 0;
        } else if (lf.is_cavernous_lev && !in_town(mtmp.mx, mtmp.my)) {
            here.typ = CORR;
            here.flags = 0;
        } else {
            here.typ = DOOR;
            here.doormask = D_NODOOR;
            if (here.flags !== undefined) here.flags = D_NODOOR;
        }
    } else if (IS_TREE(here.typ) || here.typ === TREE) {
        here.typ = ROOM;
        here.flags = 0;
        if (pile && pile < 5) rnd_treefruit_at(mtmp.mx, mtmp.my);
    } else {
        // stone / other obstructed
        here.typ = CORR;
        here.flags = 0;
        if (pile && pile < 5) {
            mksobj_at(
                (pile === 1) ? BOULDER : ROCK,
                mtmp.mx, mtmp.my, true, false,
            );
        }
    }
    newsym(mtmp.mx, mtmp.my);
    if (!sobj_at(BOULDER, mtmp.mx, mtmp.my)) {
        recalc_block_point(mtmp.mx, mtmp.my);
    }
    return false;
}

/**
 * C ref: dig.c zap_dig — wand/spell dig beam across the level.
 * Branch envelope: horizontal digdepth=rn1(18,8) + door/SDOOR + maze_dig
 * wall/tree/stone + ordinary IS_OBSTRUCTED dig; DISP_BEAM trail.
 * watch_dig + shop add_damage wired (D-0941); pay_for_damage (D-0942).
 * Named omissions: swallowed pierce; u.dz falling-rock / dighole;
 * pitdig conjoined / adj_pit_checks / pit_flow.
 */
export async function zap_dig() {
    const u = game.u;
    if (!u) return;

    if (u.uswallow) {
        // pierce / expels deferred
        return;
    }

    if (u.dz) {
        // ceiling rock / dighole deferred
        return;
    }

    let shopdoor = false;
    let shopwall = false;
    const maze_dig = !!(game.level?.flags?.is_maze_lev) && !Is_earthlevel(u.uz);
    let zx = (u.ux | 0) + (u.dx | 0);
    let zy = (u.uy | 0) + (u.dy | 0);
    const pitdig = !!(u.utrap && u.utraptype === TT_PIT);
    // trap_with_u / xytodir used only by deferred pitdig body

    let digdepth = rn1(18, 8);
    tmp_at(DISP_BEAM, digbeam_glyph());
    try {
        while (--digdepth >= 0) {
            if (!isok(zx, zy)) break;
            const room = game.level?.at(zx, zy);
            if (!room) break;
            tmp_at(zx, zy);
            await nh_delay_output();

            if (pitdig) {
                // conjoined pits / dighole deferred — one adjacent only
                break;
            } else if (closed_door(zx, zy) || room.typ === SDOOR) {
                if (in_rooms(zx, zy, SHOPBASE)) {
                    const { add_damage } = await import('./shk.js');
                    add_damage(zx, zy, SHOP_DOOR_COST);
                    shopdoor = true;
                }
                if (room.typ === SDOOR) {
                    room.typ = DOOR;
                } else if (cansee(zx, zy)) {
                    await pline('The door is razed!');
                }
                await watch_dig(null, zx, zy, true);
                room.doormask = D_NODOOR;
                if (room.flags !== undefined) room.flags = D_NODOOR;
                recalc_block_point(zx, zy);
                digdepth -= 2;
                if (maze_dig) break;
            } else if (maze_dig) {
                if (IS_WALL(room.typ)) {
                    if (!(rm_wall_info(room) & W_NONDIGGABLE)) {
                        if (in_rooms(zx, zy, SHOPBASE)) {
                            shopwall = true;
                        }
                        await watch_dig(null, zx, zy, true);
                        room.typ = ROOM;
                        room.flags = 0;
                        recalc_block_point(zx, zy);
                    } else if (!Blind()) {
                        await pline('The wall glows then fades.');
                    }
                    break;
                } else if (IS_TREE(room.typ)) {
                    if (!(rm_wall_info(room) & W_NONDIGGABLE)) {
                        room.typ = ROOM;
                        room.flags = 0;
                        recalc_block_point(zx, zy);
                    } else if (!Blind()) {
                        await pline('The tree shudders but is unharmed.');
                    }
                    break;
                } else if (room.typ === STONE || room.typ === SCORR) {
                    if (!(rm_wall_info(room) & W_NONDIGGABLE)) {
                        room.typ = CORR;
                        room.flags = 0;
                        recalc_block_point(zx, zy);
                    } else if (!Blind()) {
                        await pline('The rock glows then fades.');
                    }
                    break;
                }
            } else if (IS_OBSTRUCTED(room.typ)) {
                if (!may_dig(zx, zy)) break;
                if (IS_WALL(room.typ) || room.typ === SDOOR) {
                    if (in_rooms(zx, zy, SHOPBASE)) {
                        shopwall = true;
                    }
                    await watch_dig(null, zx, zy, true);
                    if (game.level?.flags?.is_cavernous_lev
                        && !in_town(zx, zy)) {
                        room.typ = CORR;
                        room.flags = 0;
                    } else {
                        room.typ = DOOR;
                        room.doormask = D_NODOOR;
                        if (room.flags !== undefined) room.flags = D_NODOOR;
                    }
                    digdepth -= 2;
                } else if (IS_TREE(room.typ)) {
                    room.typ = ROOM;
                    room.flags = 0;
                    digdepth -= 2;
                } else {
                    room.typ = CORR;
                    room.flags = 0;
                    digdepth--;
                }
                recalc_block_point(zx, zy);
            }
            zx += u.dx | 0;
            zy += u.dy | 0;
        }
    } finally {
        tmp_at(DISP_END, 0);
    }

    // pit_flow deferred
    if (shopdoor || shopwall) {
        const { pay_for_damage } = await import('./shk.js');
        await pay_for_damage(shopdoor ? 'destroy' : 'dig into', false);
    }
}
