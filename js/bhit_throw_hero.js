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
} from './const.js';
import { rn2 } from './rng.js';
import { pline, newsym } from './display.js';
import { cansee } from './vision.js';
import { doname } from './objnam.js';
import { NH5_WEAPON_CLASS } from './nh5_objclass.js';
import { breaktestLikeC, heroBreaksObjLikeC, BRK_FROM_INV } from './obj_break_dothrow.js';
import { flooreffectsObjAtLikeC } from './flooreffects_hero.js';
import { placeFloorObjectInLevel, stackObjOnFloorInLevel } from './floorobj.js';
import { checkShopObjAfterHeroPlaceLikeC } from './shop.js';
import { isClosedDoorLoc } from './walkable.js';

/** C: objects_nums — venom otyps for breakobj-style landing (dothrow.c throwit). */
const OTYP_BLINDING_VENOM = 478;
const OTYP_ACID_VENOM = 479;

/** C: dothrow.c throwing_weapon() subset — WEAPON_CLASS until is_missile / is_blade port. */
export function throwingWeaponHeroThrowitLikeC(obj) {
    return (obj?.oclass | 0) === NH5_WEAPON_CLASS;
}

/**
 * C: dothrow.c throwit urange/range before bhit (crossbow, is_ammo, uball, boulder, air, Levitation, Mjollnir, aklys omitted).
 * @param {import('./gstate.js').game} g
 */
export function thrownWeaponRangeHeroLikeC(g, obj) {
    const u = g.u;
    const str = (u?.acurr?.a?.[A_STR] ?? 10) | 0;
    let urange = Math.trunc(str / 2);
    let range = urange - Math.trunc((obj?.owt | 0) / 40);
    if ((obj?.otyp | 0) === OTYP_HEAVY_IRON_BALL) {
        range = urange - Math.trunc((obj?.owt | 0) / 100);
    }
    if (range < 1) range = 1;
    if ((u?.underwater | 0) !== 0) range = 1;
    return range;
}

function trapAtG(g, x, y) {
    return g.level?.traps?.find((t) => (t.tx | 0) === (x | 0) && (t.ty | 0) === (y | 0)) ?? null;
}

function monAtCellG(g, x, y) {
    return g.level?.monsters?.find((m) => (m.mx | 0) === (x | 0) && (m.my | 0) === (y | 0)) ?? null;
}

/**
 * C: zap.c bhit — THROWN_WEAPON, fhitm/fhito null (subset: shkcatch, hits_bars, rock skip, shade/mimic, tmp_at omitted).
 * @returns {Promise<{ x: number, y: number, mon: object|null, stuckWeb: boolean }>}
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
        const typ = loc.typ | 0;

        if (IS_WATERWALL(typ) || typ === LAVAWALL) {
            break;
        }
        if (typ === IRONBARS) {
            bx -= ddx;
            by -= ddy;
            break;
        }

        const mtmp = monAtCellG(g, bx, by);
        if (mtmp) {
            hitMon = mtmp;
            break;
        }

        const ttmp = trapAtG(g, bx, by);
        if (ttmp && (ttmp.ttyp | 0) === TT_WEB && !rn2(3)) {
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
