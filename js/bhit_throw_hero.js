// bhit_throw_hero.js — zap.c bhit(THROWN_WEAPON) ray + dothrow.c throwit landing tail (hero).
// C ref: zap.c bhit() (THROWN_WEAPON branch); dothrow.c throwit() after bhit().

import { isok } from './hacklib.js';
import {
    ZAP_POS,
    IS_WATERWALL,
    LAVAWALL,
    IRONBARS,
    SINK,
    IS_SOFT,
    OTYP_HEAVY_IRON_BALL,
    TT_WEB,
    A_STR,
    BOLT_LIM,
    P_CROSSBOW,
    Is_airlevel,
    NO_ROOM,
} from './const.js';
import { isAmmo, ammoAndLauncherLikeC, weaponType, isPickLikeC } from './weapon_kind.js';
import { isPoolCellLikeC } from './fillholetyp.js';
import { OBJ_ROCK } from './mthrowu.js';
import { rnd, rn2 } from './rng.js';
import { raceptr, cantDrown, S_EEL } from './mondata.js';
import { pSkillDisplayName } from './skill_display_name.js';
import { an } from './decor.js';
import { nh5HeroObjectClass } from './water_damage.js';
import { NH5_GEM_CLASS } from './nh5_objclass.js';
import { pline, newsym } from './display.js';
import { cansee } from './vision.js';
import { doname } from './objnam.js';
import { NH5_WEAPON_CLASS } from './nh5_objclass.js';
import { breaktestLikeC, heroBreaksObjLikeC, BRK_FROM_INV } from './obj_break_dothrow.js';
import { flooreffectsObjAtLikeC } from './flooreffects_hero.js';
import { placeFloorObjectInLevel, stackObjOnFloorInLevel } from './floorobj.js';
import { checkShopObjAfterHeroPlaceLikeC, insideShopLevlRoomno, shkcatchThrownPickHeroLikeC } from './shop.js';
import { isClosedDoorLoc } from './walkable.js';

/** C: objects_nums — venom otyps for breakobj-style landing (dothrow.c throwit). */
const OTYP_BLINDING_VENOM = 478;
const OTYP_ACID_VENOM = 479;

/** C: dothrow.c throwing_weapon() subset — WEAPON_CLASS until is_missile / is_blade port. */
export function throwingWeaponHeroThrowitLikeC(obj) {
    return (obj?.oclass | 0) === NH5_WEAPON_CLASS;
}

/**
 * C: dothrow.c throwit urange/range before bhit (uball cap, boulder, Mjollnir, aklys, tether omitted).
 * @param {import('./gstate.js').game} g
 */
export async function thrownWeaponRangeHeroLikeC(g, obj) {
    const u = g.u;
    if (!u || !obj) return 1;
    const uwep = u.uwep ?? null;
    const str = (u.acurr?.a?.[A_STR] ?? 10) | 0;
    const crossbowing =
        ammoAndLauncherLikeC(obj, uwep) && weaponType(uwep) === P_CROSSBOW;
    let urange = crossbowing ? 9 : Math.trunc(str / 2);
    let range = urange - Math.trunc((obj.owt | 0) / 40);
    if ((obj.otyp | 0) === OTYP_HEAVY_IRON_BALL) {
        range = urange - Math.trunc((obj.owt | 0) / 100);
    }
    if (range < 1) range = 1;

    if (isAmmo(obj)) {
        if (ammoAndLauncherLikeC(obj, uwep)) {
            if (crossbowing) range = BOLT_LIM;
            else range++;
        } else if ((nh5HeroObjectClass(obj) | 0) !== NH5_GEM_CLASS) {
            range = Math.trunc(range / 2);
            const sk = weaponType(obj);
            await pline(
                `You aren't wielding ${an(pSkillDisplayName(sk, g))}, so you throw ${doname(obj, g)} by hand.`,
            );
        }
    }

    if (Is_airlevel(u.uz) || (u.Levitation | 0)) {
        urange -= range;
        if (urange < 1) urange = 1;
        range -= urange;
        if (range < 1) range = 1;
    }

    if ((u.underwater | 0) !== 0) range = 1;
    return range;
}

function trapAtG(g, x, y) {
    return g.level?.traps?.find((t) => (t.tx | 0) === (x | 0) && (t.ty | 0) === (y | 0)) ?? null;
}

function monAtCellG(g, x, y) {
    return g.level?.monsters?.find((m) => (m.mx | 0) === (x | 0) && (m.my | 0) === (y | 0)) ?? null;
}

/** C: zap.c skiprange() — thrown ROCK skip band (rnd order matches C). */
function skiprangeThrownRockLikeC(range) {
    const r = range | 0;
    const tr = Math.trunc(r / 4);
    const tmp = r - (tr > 0 ? rnd(tr) : 0);
    let skipend = tmp - Math.trunc((tmp / 4) * rnd(3));
    if (skipend >= tmp) skipend = tmp - 1;
    return { skipstart: tmp, skipend };
}

function heroBlindThrow(g) {
    const u = g.u;
    return !!(u?.ublind || (u?.timed?.blind ?? 0) > 0);
}

/** C: zap.c bhit-local M_IN_WATER(ptr) — eel or cant_drown. */
function monInWaterZapThrownRockLikeC(ptr) {
    if (!ptr) return false;
    return (ptr.mlet | 0) === S_EEL || cantDrown(ptr);
}

function canspotMonThrownRockSkipLikeC(g, mtmp) {
    const u = g.u;
    if (!mtmp || !u) return false;
    if ((u.usteed | 0) && u.usteed === mtmp) return true;
    if ((mtmp.minvis | 0) && !(u.See_invisible | 0)) return false;
    return cansee(mtmp.mx | 0, mtmp.my | 0);
}

/**
 * C: zap.c bhit — THROWN_WEAPON, fhitm/fhito null (subset: hits_bars, shade/mimic, tmp_at omitted; **`shkcatch`** wired for thrown **`is_pick`**).
 * @returns {Promise<{ x: number, y: number, mon: object|null, stuckWeb: boolean, shkCaught?: boolean }>}
 */
export async function walkThrownWeaponBhitRayHeroLikeC(g, dx, dy, range0, obj) {
    const u = g.u;
    if (!u || !g.level) return { x: u?.ux | 0, y: u?.uy | 0, mon: null, stuckWeb: false };

    const ddx = dx | 0;
    const ddy = dy | 0;
    let bx = u.ux | 0;
    let by = u.uy | 0;
    let range = range0 | 0;
    let stuckWeb = false;
    let hitMon = null;

    let skiprangeStart = 0;
    let skiprangeEnd = 0;
    let skipCount = 0;
    let allowSkip = false;
    let inSkip = false;
    if (obj && (obj.otyp | 0) === OBJ_ROCK) {
        const sr = skiprangeThrownRockLikeC(range);
        skiprangeStart = sr.skipstart;
        skiprangeEnd = sr.skipend;
        allowSkip = !rn2(3);
    }

    while (range > 0) {
        range--;
        bx += ddx;
        by += ddy;
        if (!isok(bx, by)) {
            bx -= ddx;
            by -= ddy;
            break;
        }
        const loc = g.level.at(bx, by);
        if (!loc) {
            bx -= ddx;
            by -= ddy;
            break;
        }
        if (obj && isPickLikeC(obj) && insideShopLevlRoomno(g, bx, by) !== NO_ROOM) {
            const caught = await shkcatchThrownPickHeroLikeC(g, obj, bx, by);
            if (caught) {
                return { x: bx, y: by, mon: null, stuckWeb: false, shkCaught: true };
            }
        }
        const typ = loc.typ | 0;

        if (IS_WATERWALL(typ) || typ === LAVAWALL) {
            break;
        }
        if (typ === IRONBARS) {
            bx -= ddx;
            by -= ddy;
            break;
        }

        let mtmp = monAtCellG(g, bx, by);

        const ttmp = trapAtG(g, bx, by);
        if (!mtmp && ttmp && (ttmp.ttyp | 0) === TT_WEB && !rn2(3)) {
            stuckWeb = true;
            if (!ttmp.tseen) ttmp.tseen = 1;
            if (cansee(bx, by)) {
                const raw = doname(obj, g);
                const cap = raw.charAt(0).toUpperCase() + raw.slice(1);
                await pline(`${cap} gets stuck in a web!`);
            }
            await newsym(bx, by);
            break;
        }

        if (skiprangeStart && range === skiprangeStart && allowSkip) {
            if (isPoolCellLikeC(g, bx, by) && !mtmp) {
                inSkip = true;
                const blind = heroBlindThrow(g);
                if (!blind) {
                    const raw = doname(obj, g);
                    const cap = raw.charAt(0).toUpperCase() + raw.slice(1);
                    await pline(`${cap} skips${skipCount ? ' again' : ''}.`);
                } else {
                    await pline('You hear something skip.');
                }
                skipCount++;
            } else if (skiprangeStart > skiprangeEnd + 1) {
                skiprangeStart--;
            }
        }
        if (inSkip) {
            if (range <= skiprangeEnd) {
                inSkip = false;
                if (range > 3) {
                    const sr2 = skiprangeThrownRockLikeC(range);
                    skiprangeStart = sr2.skipstart;
                    skiprangeEnd = sr2.skipend;
                }
            } else if (mtmp && monInWaterZapThrownRockLikeC(raceptr(mtmp))) {
                if (!heroBlindThrow(g) && canspotMonThrownRockSkipLikeC(g, mtmp)) {
                    const on = mtmp.monnam || mtmp.data?.mname || 'it';
                    const raw = doname(obj, g);
                    const cap = raw.charAt(0).toUpperCase() + raw.slice(1);
                    await pline(`${cap} passes over ${on}.`);
                }
                mtmp = null;
            }
        }

        if (mtmp) {
            hitMon = mtmp;
            break;
        }

        if (!ZAP_POS(typ) || isClosedDoorLoc(loc)) {
            bx -= ddx;
            by -= ddy;
            break;
        }
        if (typ === SINK) {
            break;
        }
    }

    return { x: bx, y: by, mon: hitMon, stuckWeb };
}

async function shipObjectThrownStubLikeC(_g, _obj, _x, _y) {
    return false;
}

/**
 * C: dothrow.c throwit tail — breakobj, flooreffects, ship_object, place_object, stackobj, newsym (subset: splash sound, container_impact, drop_ball omitted).
 * @returns {Promise<boolean>} true if obj consumed
 */
export async function throwitPlaceAfterBhitHeroLikeC(g, obj, tx, ty) {
    const xi = tx | 0;
    const yi = ty | 0;
    const gb = g.gb || (g.gb = {});
    const saveGb = gb.bhitpos;
    const ctx0 = g.context || (g.context = {});
    const saveCtx = ctx0.bhitpos;
    gb.bhitpos = { x: xi, y: yi };
    ctx0.bhitpos = { x: xi, y: yi };
    try {
        const loc = g.level?.at(xi, yi);
        const ltyp = loc?.typ | 0;
        const soft = IS_SOFT(ltyp);
        const otyp = obj?.otyp | 0;
        const venom = otyp === OTYP_BLINDING_VENOM || otyp === OTYP_ACID_VENOM;
        if ((!soft && breaktestLikeC(g, obj)) || venom) {
            if (await heroBreaksObjLikeC(g, obj, xi, yi, BRK_FROM_INV)) return true;
        }
        if (await flooreffectsObjAtLikeC(g, obj, xi, yi, 'fall')) return true;
        if (await shipObjectThrownStubLikeC(g, obj, xi, yi)) return true;
        placeFloorObjectInLevel(g, obj, xi, yi);
        await checkShopObjAfterHeroPlaceLikeC(g, obj, xi, yi);
        stackObjOnFloorInLevel(g, obj);
        await newsym(xi, yi);
        return false;
    } finally {
        gb.bhitpos = saveGb;
        ctx0.bhitpos = saveCtx;
    }
}
