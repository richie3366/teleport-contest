// dighole.js — dig.c dig_check() + dighole() subset (wand/spell down at hero).
// C ref: dig.c dig_check(), digcheck_fail_message(), dighole(), decl.c zdir (callers set u.dz).
//
// Ported: BY_YOU dig_check; digcheck_fail_message tail; dighole opening guards + magical explode;
// pool/lava slosh + wake_nearto stub; **`fillholetyp`** + **`liquid_flow`** when adjacent liquid;
// ROOM/CORR + **!ttmp** + **DIGCHECK_PASSED|PASSED_PITONLY** + Can_dig_down
// → **PIT** vs **HOLE** (**`nohole`/`pit_only`/`PASSED_PITONLY`** vs hole) per C; **digactualHoleHeroUtrapSubset** before trap.
// Deferred: drawbridge, boulder KADOOM, grave, cnv_trap_obj, goto_level,
// shop billing, monsters, furniture_handled, Invocation_lev, AM_SANCTUM, **PASSED_DESTROY_TRAP** + trap on **ROOM/CORR** (**`!ttmp`** guard).

import { pline, newsym } from './display.js';
import { vision_recalc, cansee } from './vision.js';
import { d, rn1 } from './rng.js';
import { stairwayAt } from './decor.js';
import { digactualHoleHeroUtrapSubset } from './floorobj.js';
import { spotChecksLikeC } from './spot_checks.js';
import { fillholetypLikeC } from './fillholetyp.js';
import { liquidFlowHeroDigLikeC } from './liquid_flow.js';
import { maybeHalfPhys, losehp } from './mthrowu.js';
import {
    STONE,
    SDOOR,
    ROOM,
    CORR,
    IS_OBSTRUCTED,
    IS_POOL,
    IS_LAVA,
    IS_THRONE,
    IS_ALTAR,
    IS_WALL,
    IS_DOOR,
    IS_SDOOR,
    IS_ROOM,
    W_NONDIGGABLE,
    OTYP_BOULDER,
    Is_airlevel,
    Is_waterlevel,
    Is_botlevel,
    MAGIC_PORTAL,
    VIBRATING_SQUARE,
    DIGCHECK_PASSED,
    DIGCHECK_PASSED_PITONLY,
    DIGCHECK_FAILED,
    DIGCHECK_FAIL_ONLADDER,
    DIGCHECK_FAIL_ONSTAIRS,
    DIGCHECK_FAIL_THRONE,
    DIGCHECK_FAIL_ALTAR,
    DIGCHECK_FAIL_AIRLEVEL,
    DIGCHECK_FAIL_WATERLEVEL,
    DIGCHECK_FAIL_TOOHARD,
    DIGCHECK_FAIL_UNDESTROYABLETRAP,
    DIGCHECK_FAIL_CANTDIG,
    DIGCHECK_FAIL_BOULDER,
    is_pit,
    is_hole,
    is_magical_trap,
    HOLE,
    PIT,
    TT_PIT,
} from './const.js';

/** C: dungeon.c Can_dig_down(&u.uz) — Invocation_lev not ported. */
function canDigDownLikeC(g) {
    const uz = g.u?.uz;
    const lf = g.level?.flags;
    if (lf?.hardfloor) return false;
    if (uz && Is_botlevel(uz)) return false;
    return true;
}

function trapAtInLevel(g, x, y) {
    const traps = g.level?.traps;
    if (!traps?.length) return null;
    const xi = x | 0;
    const yi = y | 0;
    return traps.find((t) => (t.tx | 0) === xi && (t.ty | 0) === yi) ?? null;
}

function delTrapInLevel(g, trap) {
    const traps = g.level?.traps;
    if (!traps || !trap) return;
    const i = traps.indexOf(trap);
    if (i >= 0) traps.splice(i, 1);
}

function seetrapLikeC(trap) {
    trap.tseen = true;
    newsym(trap.tx | 0, trap.ty | 0);
}

/** C: mon.c wake_nearto — stub (matches **`trap.js`** until fmon). */
function wakeNeartoStub(_x, _y, _dist) {
    void _x;
    void _y;
    void _dist;
}

function undestroyableTrapTyp(tt) {
    const t = tt | 0;
    return t === MAGIC_PORTAL || t === VIBRATING_SQUARE;
}

function sobjAtBoulder(g, x, y) {
    const heads = g.level?.floorObjHeads;
    if (!heads) return false;
    const k = `${x | 0},${y | 0}`;
    for (let o = heads.get(k) ?? null; o; o = o.nexthere) {
        if ((o.otyp | 0) === OTYP_BOULDER) return true;
    }
    return false;
}

function surfaceHereString(g, x, y) {
    const levtyp = g.level?.at(x | 0, y | 0)?.typ ?? STONE;
    const u = g.u;
    if (IS_POOL(levtyp) && (u?.underwater | 0)) return 'bottom';
    if (IS_POOL(levtyp)) return 'water';
    if (IS_LAVA(levtyp)) return 'lava';
    if (IS_ALTAR(levtyp)) return 'altar';
    if (IS_THRONE(levtyp)) return 'throne';
    if (IS_WALL(levtyp)) return 'wall';
    if (IS_DOOR(levtyp) || IS_SDOOR(levtyp)) return 'doorway';
    if (IS_ROOM(levtyp)) return 'floor';
    return 'ground';
}

/** C: dig.c dighole first **`pline_The`** branch (**`surface`** + here/there). */
function tooHardSurfaceHereThereLikeC(g, digX, digY) {
    const u = g.u;
    const surf = surfaceHereString(g, digX, digY);
    const away = digX !== (u?.ux | 0) || digY !== (u?.uy | 0);
    return `The ${surf} ${away ? 'there' : 'here'} is too hard to dig in.`;
}

/**
 * C: dig.c dig_check(BY_YOU, x, y) — BY_OBJECT pool/trap block omitted (wand is BY_YOU).
 * @param {import('./gstate.js').game} g
 */
export function digCheckByYouAtLikeC(g, x, y) {
    const xi = x | 0;
    const yi = y | 0;
    const uz = g.u?.uz;
    const ttmp = trapAtInLevel(g, xi, yi);
    const loc = g.level?.at(xi, yi);
    const ltyp = loc ? (loc.typ | 0) : STONE;
    const candig = loc?.candig ? 1 : 0;

    if (stairwayAt(xi, yi)) {
        const st = stairwayAt(xi, yi);
        return st?.isladder ? DIGCHECK_FAIL_ONLADDER : DIGCHECK_FAIL_ONSTAIRS;
    }
    if (IS_THRONE(ltyp)) return DIGCHECK_FAIL_THRONE;
    if (IS_ALTAR(ltyp)) return DIGCHECK_FAIL_ALTAR;
    if (Is_airlevel(uz)) return DIGCHECK_FAIL_AIRLEVEL;
    if (Is_waterlevel(uz)) return DIGCHECK_FAIL_WATERLEVEL;
    if ((IS_OBSTRUCTED(ltyp) && ltyp !== SDOOR && ((loc.wall_info | 0) & W_NONDIGGABLE) !== 0)) {
        return DIGCHECK_FAIL_TOOHARD;
    }
    if (ttmp && undestroyableTrapTyp(ttmp.ttyp | 0)) return DIGCHECK_FAIL_UNDESTROYABLETRAP;
    if (!canDigDownLikeC(g) && !candig) {
        if (ttmp) {
            const tt = ttmp.ttyp | 0;
            if (!is_hole(tt) && !is_pit(tt)) return DIGCHECK_PASSED_DESTROY_TRAP;
            return DIGCHECK_FAIL_CANTDIG;
        }
        return DIGCHECK_PASSED_PITONLY;
    }
    if (sobjAtBoulder(g, xi, yi)) return DIGCHECK_FAIL_BOULDER;
    return DIGCHECK_PASSED;
}

/**
 * C: dig.c digcheck_fail_message — verb **"dig in"** for hero wand (**`madeby == BY_YOU`**).
 * @param {import('./gstate.js').game} g
 */
export async function digcheckFailMessageByYouAtLikeC(g, digresult, x, y) {
    if (digresult < DIGCHECK_FAILED) return;
    const xi = x | 0;
    const yi = y | 0;
    const surf = surfaceHereString(g, xi, yi);
    const u = g.u;
    const away = xi !== (u?.ux | 0) || yi !== (u?.uy | 0);
    switch (digresult) {
        case DIGCHECK_FAIL_AIRLEVEL:
            await pline('You cannot dig in thin air.');
            break;
        case DIGCHECK_FAIL_ALTAR:
            await pline('The altar is too hard to break apart.');
            break;
        case DIGCHECK_FAIL_BOULDER:
            await pline("There isn't enough room to dig here.");
            break;
        case DIGCHECK_FAIL_ONLADDER:
            await pline('The ladder resists your effort.');
            break;
        case DIGCHECK_FAIL_ONSTAIRS:
            await pline('The stairs are too hard to dig in.');
            break;
        case DIGCHECK_FAIL_THRONE:
            await pline('The throne is too hard to break apart.');
            break;
        case DIGCHECK_FAIL_CANTDIG:
        case DIGCHECK_FAIL_TOOHARD:
        case DIGCHECK_FAIL_UNDESTROYABLETRAP:
            await pline(`The ${surf} ${away ? 'there' : 'here'} is too hard to dig in.`);
            break;
        case DIGCHECK_FAIL_WATERLEVEL:
            await pline('The water splashes and subsides.');
            break;
        default:
            break;
    }
}

/**
 * C: dig.c dighole(FALSE, TRUE, cc) — subset (**`goto_level`** / wand+trap **`cnv_trap_obj`** still TODO).
 * @param {import('./gstate.js').game} g
 * @param {boolean} pitOnly
 * @param {boolean} byMagic
 * @param {{ x: number, y: number }|null} cc
 * @returns {Promise<boolean>}
 */
export async function digholeHeroLikeC(g, pitOnly, byMagic, cc) {
    const u = g.u;
    const lvl = g.level;
    if (!u || !lvl) return false;

    let digX = u.ux | 0;
    let digY = u.uy | 0;
    if (cc) {
        digX = cc.x | 0;
        digY = cc.y | 0;
    }

    const lev = lvl.at(digX, digY);
    if (!lev) return false;

    const oldTyp = lev.typ | 0;

    try {
        const ttmp = trapAtInLevel(g, digX, digY);

        const dc = digCheckByYouAtLikeC(g, digX, digY);
        const nohole = dc === DIGCHECK_FAIL_CANTDIG || dc === DIGCHECK_FAIL_TOOHARD;

        if (
            (ttmp && (undestroyableTrapTyp(ttmp.ttyp | 0) || nohole))
            || (IS_OBSTRUCTED(oldTyp)
                && oldTyp !== SDOOR
                && ((lev.wall_info | 0) & W_NONDIGGABLE) !== 0)
        ) {
            await pline(tooHardSurfaceHereThereLikeC(g, digX, digY));
            return false;
        }

        if (ttmp && is_magical_trap(ttmp.ttyp | 0)) {
            const dam = 20 + d(3, 6);
            losehp(maybeHalfPhys(dam), 'explosion', 0);
            delTrapInLevel(g, ttmp);
            newsym(digX, digY);
            vision_recalc(1);
            return true;
        }

        if (IS_POOL(oldTyp) || IS_LAVA(oldTyp)) {
            const liq = IS_LAVA(oldTyp) ? 'lava' : 'water';
            await pline(`The ${liq} sloshes furiously for a moment, then subsides.`);
            wakeNeartoStub(digX, digY, 400);
            return true;
        }

        if (
            !ttmp
            && (oldTyp === ROOM || oldTyp === CORR)
            && byMagic
            && (dc === DIGCHECK_PASSED || dc === DIGCHECK_PASSED_PITONLY)
        ) {
            const typFill = fillholetypLikeC(g, digX, digY, false);
            lev.flags = 0;

            if (typFill !== ROOM) {
                /* C: **`furniture_handled`** — fountain/sink/drawbridge (not **ROOM/CORR** wand fill). */
                lev.typ = typFill;
                await liquidFlowHeroDigLikeC(
                    g,
                    digX,
                    digY,
                    typFill,
                    ttmp,
                    'As you dig, the hole fills with %s!',
                );
                return true;
            }

            const wantPit = pitOnly || nohole || dc === DIGCHECK_PASSED_PITONLY;
            digactualHoleHeroUtrapSubset(g, digX, digY);
            const ttyp = wantPit ? PIT : HOLE;
            const trap = {
                ttyp,
                tx: digX,
                ty: digY,
                tseen: false,
                madeby_u: true,
                once: false,
                launch: { x: 0, y: 0 },
            };
            if (!lvl.traps) lvl.traps = [];
            lvl.traps.push(trap);
            if (cansee(digX, digY)) seetrapLikeC(trap);
            if (wantPit) {
                await pline('You dig a pit in the floor.');
                const wontFall = !!(u.Levitation || u.Flying);
                if ((digX === (u.ux | 0) && digY === (u.uy | 0)) && !wontFall) {
                    u.utrap = rn1(4, 2);
                    u.utraptype = TT_PIT;
                }
            } else {
                await pline('You dig a hole through the floor.');
            }
            wakeNeartoStub(u.ux | 0, u.uy | 0, 7 * 7);
            vision_recalc(1);
            newsym(digX, digY);
            return true;
        }

        if (dc >= DIGCHECK_FAILED) {
            await digcheckFailMessageByYouAtLikeC(g, dc, digX, digY);
            return false;
        }

        return false;
    } finally {
        spotChecksLikeC(g, digX, digY, oldTyp);
    }
}
