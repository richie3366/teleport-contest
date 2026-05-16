// melt_ice.js — Ice terrain melts to water (fire trap, zaps, etc.).
// C ref: zap.c melt_ice(), trap.c trap_ice_effects() / cnv_trap_obj(),
//        do.c boulder_hits_pool(), mkobj.c obj_ice_effects(), dig.c unearth_objs(),
//        mon.c minliquid() (subset).
//
// Still TODO vs C: corpse **`ROT_ORGANIC`** start on all bury paths; **`bury_objs`** full **`stolen_value`**;
// **`dig.c`/`read.c`** **`buried_ball`/`punish`** (**`floorobj.js`**) — **`placebc`** blind glyphs / **`uswallow`**; beam/breath vectors; fuller **`boulder_hits_pool`** / **`minliquid`** / **`spoteffects`**.

import { pline, newsym } from './display.js';
import { vision_recalc, cansee } from './vision.js';
import { tAt, delTrap } from './search.js';
import { maybeHeroPoolEnter } from './drown.js';
import { rnd, rn1, rn2 } from './rng.js';
import {
    floorObjKey, placeFloorObject, unlinkFloorObject, buryFloorChainAt, unearthBuriedChainAt,
} from './floorobj.js';
import { delEngrAt } from './engrave.js';
import { waterDamageChain } from './water_damage.js';
import { raceptr, isFlyer, isFloater, amphibious, breathless, swims, monsterLeavesCorpse } from './mondata.js';
import { CORPSE_OTYP, placeCorpseForMonster } from './mkobj_corpse.js';
import { dist2 } from './hacklib.js';
import { heroPassesWalls } from './walkable.js';
import { spotStopTimersMeltIceAway, startMeltIceAwayTimer, refirmMeltIceTimerAt } from './level_timers.js';
import { fixWallSpinesRect } from './wall_spine.js';
import { applyBuryObjsShopCreditAndDebt, shknamDisplay } from './shop.js';
import { objTimerChecksMkobj, ROT_ICE_ADJUSTMENT } from './obj_rot_timer.js';
import {
    ICE,
    POOL,
    MOAT,
    ICED_POOL,
    ICED_MOAT,
    DB_ICE,
    DB_UNDER,
    IS_DRAWBRIDGE,
    IS_POOL,
    IS_LAVA,
    IS_WATERWALL,
    LAVAWALL,
    DRAWBRIDGE_UP,
    TT_LAVA,
    TT_INFLOOR,
    u_at,
    LANDMINE,
    BEAR_TRAP,
    MAGIC_PORTAL,
    VIBRATING_SQUARE,
    isok,
    ROOM,
    OTYP_BOULDER,
    COLNO,
    ROWNO,
    VWALL,
    HWALL,
    IS_WALL,
} from './const.js';

/** C: objects.h — LAND_MINE / BEARTRAP (`objects_nums` / obj_oc_skill_data.js). */
const OTYP_LAND_MINE = 244;
const OTYP_BEARTRAP = 245;

/**
 * C: mkobj.c **`obj_ice_effects`** — corpses **`on_ice`** coming off ice: **`obj_timer_checks`** when **`timed`**,
 * else manual age tail (**`ROT_ICE_ADJUSTMENT`**) matching C off-ice branch when **`tleft==0`** path skipped.
 * @param {'floor'|'buried'} where
 */
function objIceCorpsesOffIceChain(g, chainHead, x, y, where) {
    void x;
    void y;
    void where;
    const moves = g.moves ?? 0;
    for (let o = /** @type {any} */ (chainHead); o; o = o.nexthere) {
        if ((o.otyp | 0) !== CORPSE_OTYP || !o.on_ice) continue;
        o.on_ice = 0;
        const age = moves - (o.age | 0);
        o.age = (o.age | 0) + Math.trunc((age * (ROT_ICE_ADJUSTMENT - 1)) / ROT_ICE_ADJUSTMENT);
    }
}

/** C: mkobj.c **`obj_ice_effects(x, y, FALSE)`** — **`timed`** objects: **`obj_timer_checks`**; then corpse **`on_ice`** tail. */
function objIceEffectsAt(g, x, y) {
    const head = g.level?.floorObjHeads?.get(floorObjKey(x, y));
    for (let o = head; o; o = o.nexthere) {
        if (o.timed) objTimerChecksMkobj(g, o, x, y, 0, 'floor', isIceAt);
    }
    objIceCorpsesOffIceChain(g, head, x, y, 'floor');
}

/** C: mkobj.c **`obj_ice_effects`** buried pass — same order before **`unearth_objs`**. */
function objIceEffectsOffIceBuriedAt(g, x, y) {
    const head = g.level?.buriedObjHeads?.get(floorObjKey(x, y));
    for (let o = head; o; o = o.nexthere) {
        if (o.timed) objTimerChecksMkobj(g, o, x, y, 0, 'buried', isIceAt);
    }
    objIceCorpsesOffIceChain(g, head, x, y, 'buried');
}

/** C: dig.c **`unearth_objs(x, y)`** — **`del_engr_at`**, **`newsym`**. */
function unearthObjsAt(g, x, y) {
    unearthBuriedChainAt(g, x, y);
    delEngrAt(x, y);
    newsym(x, y);
}

/**
 * C: dig.c **`bury_objs(x, y)`** — per-object **`stolen_value`** (**`silent` TRUE**) + **`no_charge`**,
 * then **`bury_an_obj`** chain (**`buryFloorChainAt`**), **`del_engr_at`**, **`newsym`**.
 */
async function buryObjsAt(g, x, y) {
    const { loss, costly, shkp } = await applyBuryObjsShopCreditAndDebt(g, x, y);
    buryFloorChainAt(g, x, y);
    delEngrAt(x, y);
    newsym(x, y);
    if (costly && loss && shkp) {
        await pline(`You owe ${shknamDisplay(shkp)} ${loss} zorkmids for burying merchandise.`);
    }
}

/**
 * C: mkobj.c **`obj_ice_effects(x, y, TRUE)`** — floor + buried: **`obj_timer_checks`** for **`timed`** corpses
 * on new ice (**`on_ice`** set inside **`obj_timer_checks`** when rot timer exists).
 * @param {import('./gstate.js').game} g
 */
function objIceEffectsFreezeAt(g, x, y) {
    const k = floorObjKey(x, y);
    const floorH = g.level?.floorObjHeads?.get(k);
    const buriedH = g.level?.buriedObjHeads?.get(k);
    for (let o = floorH; o; o = o.nexthere) {
        if (o.timed) objTimerChecksMkobj(g, o, x, y, 0, 'floor', isIceAt);
    }
    for (let o = buriedH; o; o = o.nexthere) {
        if (o.timed) objTimerChecksMkobj(g, o, x, y, 0, 'buried', isIceAt);
    }
}

/** C: trap.c undestroyable_trap — subset for trap_ice_effects deltrap branch. */
function undestroyableTrapTtyp(ttyp) {
    return ttyp === MAGIC_PORTAL || ttyp === VIBRATING_SQUARE;
}

/** C: mkobj.c mksobj(otyp, init, FALSE) — next_ident + minimal otmp (mklev.js parity). */
function mksobjLikeMelt(otyp, init) {
    const otmp = {
        otyp,
        ox: -1,
        oy: -1,
        quan: 1,
        owt: 1,
        cursed: false,
        blessed: false,
        olocked: false,
        spe: 0,
        opoisoned: 0,
    };
    rnd(2); /* C: next_ident */
    if (init && otmp) {
        if (otyp >= 270 && otyp < 300) {
            const r = rn2(4);
            otmp.cursed = r === 0;
            otmp.blessed = false;
        } else if (otyp >= 230 && otyp < 270) {
            const r = rn2(4);
            otmp.cursed = r === 0;
            otmp.blessed = false;
        }
    }
    return otmp;
}

/**
 * C: trap.c cnv_trap_obj(otyp, 1, ttmp, TRUE) — bury_it uses bury_an_obj in C;
 * JS has no buried floor layer: place on floor like !bury_it minus stackobj/sellobj.
 * @param {import('./gstate.js').game} g
 */
function cnvTrapObjFromIceMelt(g, ttmp, otyp) {
    const otmp = mksobjLikeMelt(otyp, true);
    otmp.quan = 1;
    otmp.owt = Math.max(1, otmp.owt | 0);
    otmp.opoisoned = 0; /* C: cnv_trap_obj — only dart traps keep poison */
    placeFloorObject(otmp, ttmp.tx, ttmp.ty);
    /* C: bury_an_obj when bury_it — skipped (no buriedobjlist). */
    newsym(ttmp.tx, ttmp.ty);
    const u = g.u;
    if (u && (u.utrap | 0) !== 0 && u_at(ttmp.tx, ttmp.ty)) {
        u.utrap = 0;
        u.utraptype = 0;
    }
    const mtmp = g.level?.monsters?.find((m) => m.mx === ttmp.tx && m.my === ttmp.ty);
    if (mtmp && (mtmp.mtrapped | 0)) mtmp.mtrapped = 0;
    delTrap(ttmp);
}

/**
 * C: is_ice(x,y) — ICE terrain, or drawbridge span with DB_ICE underneath.
 * @param {import('./gstate.js').game} g
 */
export function isIceAt(g, x, y) {
    const loc = g.level?.at(x, y);
    if (!loc) return false;
    if (loc.typ === ICE) return true;
    if (IS_DRAWBRIDGE(loc.typ) && (loc.flags & DB_UNDER) === DB_ICE) return true;
    return false;
}

/**
 * C: trap.c trap_ice_effects(x, y, ice_is_melting) when ice_is_melting TRUE.
 * @param {import('./gstate.js').game} g
 */
function trapIceEffectsOnMelt(g, x, y) {
    const ttmp = tAt(x, y);
    if (!ttmp) return;

    const mtmp = g.level?.monsters?.find((m) => m.mx === x && m.my === y);
    if (mtmp && (mtmp.mtrapped | 0)) mtmp.mtrapped = 0;

    if (ttmp.ttyp === LANDMINE || ttmp.ttyp === BEAR_TRAP) {
        const otyp = ttmp.ttyp === LANDMINE ? OTYP_LAND_MINE : OTYP_BEARTRAP;
        cnvTrapObjFromIceMelt(g, ttmp, otyp);
    } else if (!undestroyableTrapTtyp(ttmp.ttyp)) {
        delTrap(ttmp);
    }
}

/** C: mkobj.c sobj_at(BOULDER, x, y) — first boulder in floor chain. */
function sobjAtBoulder(g, x, y) {
    const head = g.level?.floorObjHeads?.get(floorObjKey(x, y)) ?? null;
    for (let o = head; o; o = o.nexthere) {
        if ((o.otyp | 0) === OTYP_BOULDER) return o;
    }
    return null;
}

function removeObjFromLevelObjects(g, otmp) {
    const arr = g.level?.objects;
    if (!arr) return;
    const i = arr.indexOf(otmp);
    if (i >= 0) arr.splice(i, 1);
}

function killMonsterOnPoolFill(g, mtmp) {
    if (!mtmp || (mtmp.mhp | 0) <= 0) return;
    const x = mtmp.mx | 0;
    const y = mtmp.my | 0;
    mtmp.mhp = 0;
    if (g.level && isok(x, y) && monsterLeavesCorpse(mtmp, g, 0)) placeCorpseForMonster(mtmp, x, y);
    const arr = g.level?.monsters;
    if (arr) {
        const i = arr.indexOf(mtmp);
        if (i >= 0) arr.splice(i, 1);
    }
}

/**
 * C: do.c boulder_hits_pool(otmp, rx, ry, pushing) — subset: normal water/lava typ,
 * no plane/waterwall/drawbridge span, no u.uinwater / next2u lava damage / wake_nearto / bury_objs.
 * @param {import('./gstate.js').game} g
 * @returns {Promise<boolean>} false when not pool/lava (C would impossible from melt_ice)
 */
async function boulderHitsPool(g, otmp, rx, ry, pushing) {
    if (!otmp || (otmp.otyp | 0) !== OTYP_BOULDER) return false;
    const loc = g.level?.at(rx, ry);
    if (!loc) return false;
    const typ = loc.typ | 0;
    const lava = IS_LAVA(typ);
    const poolOrLava = IS_POOL(typ) || lava;
    if (!poolOrLava) return false;

    const chance = rn2(10); /* C: before fills_up branch — water 90%, lava 10% */
    const fillsUp = lava ? chance === 0 : chance !== 0;

    if (fillsUp) {
        const ttmp = tAt(rx, ry);
        if (ttmp) delTrap(ttmp);
        const mtmp = g.level?.monsters?.find((m) => m.mx === rx && m.my === ry);
        if (mtmp && (mtmp.mhp | 0) > 0) killMonsterOnPoolFill(g, mtmp);
        loc.typ = ROOM;
        loc.flags = 0;
        newsym(rx, ry);
    }

    const what = lava ? 'lava' : 'water';
    const u = g.u;
    const verbose = !!(g.flags?.verbose);
    if (!fillsUp || !pushing) {
        const seeSplash = pushing ? !(u?.ublind) && !(u?.timed?.blind) : cansee(rx, ry) || u_at(rx, ry);
        if (seeSplash) {
            const verb = fillsUp ? 'fills' : 'falls into';
            await pline(`There is a large splash as the boulder ${verb} the ${what}.`);
        }
        if (!fillsUp && verbose && (pushing ? !(u?.ublind) : cansee(rx, ry))) {
            await pline('It sinks without a trace!');
        }
    }

    removeObjFromLevelObjects(g, otmp);
    return true;
}

/**
 * C: mon.c minliquid(mtmp) — tiny subset: pool wetting for non-airborne body + inventory chain.
 * @param {import('./gstate.js').game} g
 */
async function minliquidMonsterAfterMelt(g, mtmp) {
    if (!mtmp) return;
    const loc = g.level?.at(mtmp.mx, mtmp.my);
    if (!loc || !IS_POOL(loc.typ)) return;
    const ptr = raceptr(mtmp);
    const inpool = !(isFlyer(ptr) || isFloater(ptr));
    if (!inpool) return;
    if (amphibious(ptr) || breathless(ptr) || swims(ptr)) return;
    const visMon = cansee(mtmp.mx, mtmp.my) && !(mtmp.minvis | 0);
    if (mtmp.minvent) await waterDamageChain(mtmp.minvent, false, g, { mtmp, visMon });
}

/**
 * C: zap.c zap_over_floor() — **`ZT_COLD`** on pool / moat / lava / drawbridge / waterwall / existing ice (subset).
 * Schedules **`start_melt_ice_timeout`** when non-lava water becomes **`ICE`** or drawbridge span gains **`DB_ICE`**.
 * @param {import('./gstate.js').game} g
 * @param {boolean} seeIt — C **`see_it`**
 * @returns {Promise<number>} C **`zap_over_floor`** **`rangemod`** contribution for this tile
 */
export async function coldZapHitsWaterAt(g, x, y, seeIt) {
    if (isIceAt(g, x, y)) {
        refirmMeltIceTimerAt(g, x, y);
        return 0;
    }
    const loc = g.level?.at(x, y);
    if (!loc) return 0;
    const typ = loc.typ | 0;
    const lavawall = typ === LAVAWALL;

    if (IS_WATERWALL(typ)) {
        if (seeIt) await pline('The water freezes for a moment.');
        else if (g.u && dist2(x, y, g.u.ux | 0, g.u.uy | 0) <= 9) await pline('You hear a soft crackling.');
        return -1000;
    }

    /* C: zap.c zap_over_floor ZT_COLD — lavawall + temperature vs full solidify */
    if (lavawall) {
        const temp = (g.level?.flags?.temperature ?? 0) | 0;
        const chance = Math.max(2, 5 + temp * 10);
        if (rn2(chance)) {
            if (seeIt) await pline('The lava freezes for a moment.');
            else if (g.u && dist2(x, y, g.u.ux | 0, g.u.uy | 0) <= 9) await pline('You hear a soft crackling.');
            return -1000;
        }
    }

    if (IS_LAVA(typ)) {
        await buryObjsAt(g, x, y);
        let spineX1 = x;
        let spineY1 = y;
        let spineX2 = x;
        let spineY2 = y;
        if (lavawall) {
            const nWall = isok(x, y - 1) && IS_WALL(g.level?.at(x, y - 1)?.typ | 0);
            const sWall = isok(x, y + 1) && IS_WALL(g.level?.at(x, y + 1)?.typ | 0);
            loc.typ = (nWall || sWall) ? VWALL : HWALL;
            loc.horizontal = loc.typ === HWALL;
            loc.flags = 0;
            spineX1 = Math.max(0, x - 1);
            spineY1 = Math.max(0, y - 1);
            spineX2 = Math.min(COLNO - 1, x + 1);
            spineY2 = Math.min(ROWNO - 1, y + 1);
            fixWallSpinesRect(g, spineX1, spineY1, spineX2, spineY2);
            g.vision_full_recalc = 1;
        } else {
            loc.typ = ROOM;
            loc.flags = 0;
        }
        if (seeIt) await pline('The lava cools and solidifies.');
        if (lavawall) {
            for (let xi = spineX1; xi <= spineX2; xi++) {
                for (let yi = spineY1; yi <= spineY2; yi++) {
                    newsym(xi, yi);
                }
            }
        } else {
            newsym(x, y);
        }

        const u = g.u;
        if (u && u_at(x, y) && (u.utrap | 0) !== 0 && (u.utraptype | 0) === TT_LAVA) {
            if (heroPassesWalls(g)) {
                await pline('You pass through the now-solid rock.');
                u.utrap = 0;
                u.utraptype = 0;
            } else {
                u.utrap = rn1(50, 20);
                u.utraptype = TT_INFLOOR;
                await pline('You are firmly stuck in the cooling rock.');
            }
            g.disp = g.disp || {};
            g.disp.botl = true;
        }
        return -3;
    }

    if (typ === DRAWBRIDGE_UP) {
        await buryObjsAt(g, x, y);
        loc.flags = (loc.flags & ~DB_UNDER) | DB_ICE;
        if (seeIt) await pline('The water under the drawbridge freezes solid.');
        else if (g.u && dist2(x, y, g.u.ux | 0, g.u.uy | 0) <= 9) await pline('You hear a crackling sound.');
        newsym(x, y);
        startMeltIceAwayTimer(g, x, y, 0);
        objIceEffectsFreezeAt(g, x, y);
        return -3;
    }

    if (typ === POOL || typ === MOAT) {
        await buryObjsAt(g, x, y);
        const moat = typ === MOAT;
        loc.flags = (loc.flags & ~(ICED_POOL | ICED_MOAT)) | (typ === POOL ? ICED_POOL : ICED_MOAT);
        loc.typ = ICE;
        if (seeIt) {
            if (moat) await pline('The moat is bridged with ice!');
            else await pline('The water freezes.');
        } else if (g.u && dist2(x, y, g.u.ux | 0, g.u.uy | 0) <= 9) {
            await pline('You hear a crackling sound.');
        }
        newsym(x, y);

        const u = g.u;
        if (u && u_at(x, y) && (u.underwater | 0)) {
            u.underwater = 0;
            g.vision_full_recalc = 1;
        }
        const mtmp = g.level?.monsters?.find((m) => m.mx === x && m.my === y);
        if (mtmp && (mtmp.mundetected | 0) && swims(raceptr(mtmp))) mtmp.mundetected = 0;

        startMeltIceAwayTimer(g, x, y, 0);
        objIceEffectsFreezeAt(g, x, y);
        return -3;
    }
    return 0;
}

/**
 * C: zap.c melt_ice(x, y, msg) — order matched; some helpers still stubs (see file header).
 * @param {import('./gstate.js').game} g
 * @param {string|null|undefined} msg — null/undefined → default Norep string
 */
export async function meltIceAt(g, x, y, msg) {
    if (!isIceAt(g, x, y)) return;

    const text = msg ?? 'The ice crackles and melts.';
    const loc = g.level?.at(x, y);
    if (!loc) return;

    if (IS_DRAWBRIDGE(loc.typ)) {
        loc.flags &= ~DB_ICE;
    } else if (loc.typ === ICE) {
        const moatIce = (loc.flags & ICED_MOAT) !== 0;
        const poolIce = (loc.flags & ICED_POOL) !== 0;
        loc.typ = !moatIce && poolIce ? POOL : MOAT;
        loc.flags &= ~(ICED_POOL | ICED_MOAT);
    }

    spotStopTimersMeltIceAway(g, x, y);
    if (tAt(x, y)) trapIceEffectsOnMelt(g, x, y);
    objIceEffectsAt(g, x, y);
    /* C **`melt_ice`** only **`obj_ice_effects(FALSE)`** (floor); buried corpses **`on_ice`** from freeze need the same off-ice age fix before **`unearth_objs`**. */
    objIceEffectsOffIceBuriedAt(g, x, y);
    unearthObjsAt(g, x, y);

    const u = g.u;
    if ((u?.underwater | 0) !== 0) vision_recalc(1);

    newsym(x, y);

    if (cansee(x, y) || u_at(x, y)) await pline(text);

    const poolStill = () => {
        const l = g.level?.at(x, y);
        return !!(l && IS_POOL(l.typ | 0));
    };
    if (sobjAtBoulder(g, x, y)) {
        if (cansee(x, y) || u_at(x, y)) await pline('A boulder settles...');
        let otmp;
        do {
            otmp = sobjAtBoulder(g, x, y);
            if (!otmp) break;
            unlinkFloorObject(otmp);
            if (!(await boulderHitsPool(g, otmp, x, y, false))) break;
        } while (poolStill() && sobjAtBoulder(g, x, y));
        newsym(x, y);
    }

    if (u_at(x, y) && u) {
        await maybeHeroPoolEnter(g, { fromDx: u.dx | 0, fromDy: u.dy | 0 });
    } else if (IS_POOL(g.level?.at(x, y)?.typ | 0)) {
        const mtmp = g.level?.monsters?.find((m) => m.mx === x && m.my === y);
        if (mtmp) await minliquidMonsterAfterMelt(g, mtmp);
    }
}
