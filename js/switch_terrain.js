// switch_terrain.js — Terrain change effects on hero (levitation / flight / status terrain).
// C ref: hack.c switch_terrain(), classify_terrain(); trap.c float_up() (subset for unblock).

import { pline } from './display.js';
import {
    FROMOUTSIDE,
    STONE,
    TREE,
    CORR,
    ROOM,
    DOOR,
    DRAWBRIDGE_UP,
    MOAT,
    WATER,
    X_FLOOR,
    X_GROUND,
    X_OPENDOOR,
    X_SHUTDOOR,
    X_SWAMP,
    X_SUBMERGED,
    X_WATERWALL,
    IS_OBSTRUCTED,
    IS_WATERWALL,
    LAVAWALL,
    Is_earthlevel,
    Is_waterlevel,
    Is_juiblex_level,
    Is_airlevel,
    D_ISOPEN,
    D_CLOSED,
    D_LOCKED,
    D_TRAPPED,
} from './const.js';
import { isClosedDoorLoc } from './walkable.js';

/**
 * C: youprop.h **`Levitation`** — **`(H||E) && !B`** with terrain **`FROMOUTSIDE`** block.
 * @param {import('./gstate.js').game} g
 */
function levitationEffectiveLikeC(g) {
    const u = g.u;
    if (!u) return false;
    const he = ((u.HLevitation | 0) || (u.ELevitation | 0) || (u.Levitation | 0)) !== 0;
    return he && !((u.BLevitation | 0) & FROMOUTSIDE);
}

/**
 * C: youprop.h **`Flying`** — **`(HF||EF||steed)&&!BF`** subset (**`steed`** not wired).
 * @param {import('./gstate.js').game} g
 */
function flyingEffectiveLikeC(g) {
    const u = g.u;
    if (!u) return false;
    const he = ((u.HFlying | 0) || (u.EFlying | 0) || (u.Flying | 0)) !== 0;
    return he && !((u.BFlying | 0) & FROMOUTSIDE);
}

/** C: monmove.c **`closed_door(x,y)`** — hero cell. */
function closedDoorAt(g, x, y) {
    const loc = g.level?.at(x | 0, y | 0);
    return !!(loc && isClosedDoorLoc(loc));
}

/**
 * C: **`hack.c`** **`switch_terrain`** — **`blocklev`** from **`IS_OBSTRUCTED`**, **`closed_door`**,
 * **`IS_WATERWALL`**, **`LAVAWALL`**.
 * @param {import('./gstate.js').game} g
 */
function blockLevOrFlyLikeC(g) {
    const u = g.u;
    if (!u) return false;
    const x = u.ux | 0;
    const y = u.uy | 0;
    const loc = g.level?.at(x, y);
    if (!loc) return false;
    const typ = loc.typ | 0;
    return IS_OBSTRUCTED(typ)
        || closedDoorAt(g, x, y)
        || IS_WATERWALL(typ)
        || typ === LAVAWALL;
}

/**
 * C: **`trap.c`** **`float_up`** — branches for **`utrap`**, **`uinwater`**, **`uswallow`** omitted;
 * **`Hallucination`**, air level, default float message.
 * @param {import('./gstate.js').game} g
 */
async function floatUpAfterTerrainUnblockLikeC(g) {
    const u = g.u;
    if (!u) return;
    if ((u.utrap | 0) !== 0) return;
    if ((u.uinwater | 0) !== 0) return;
    if ((u.uswallow | 0) !== 0) return;
    if (u.Hallucination | 0) {
        await pline('Up, up, and awaaaay!  You\'re walking on air!');
    } else if (Is_airlevel(u.uz)) {
        await pline('You gain control over your movements.');
    } else {
        await pline('You start to float in the air!');
    }
    g.disp = g.disp || {};
    g.disp.botl = true;
}

/**
 * C: **`hack.c`** **`classify_terrain`** — uses **`levl[u.ux][u.uy]`** (JS: hero cell); omits
 * **`lastseentyp`**, Medusa sea / Juiblex swamp (**`Is_*`** stubs), **`db_under_typ`**.
 * @param {import('./gstate.js').game} g
 */
export function classifyTerrainHeroLikeC(g) {
    g.iflags = g.iflags || {};
    const u = g.u;
    if (!u) return;
    const lev = g.level?.at(u.ux | 0, u.uy | 0);
    if (!lev) return;
    let typ = lev.typ | 0;

    if ((u.underwater | 0) !== 0) {
        typ = X_SUBMERGED;
    } else {
        switch (typ) {
        case STONE:
            if (g.level?.flags?.arboreal) typ = TREE;
            break;
        case CORR:
        case ROOM:
            typ = !Is_earthlevel(u.uz) ? X_FLOOR : X_GROUND;
            break;
        case DOOR: {
            const dm = lev.doormask | 0;
            if ((dm & D_ISOPEN) !== 0) typ = X_OPENDOOR;
            else if ((dm & (D_CLOSED | D_LOCKED | D_TRAPPED)) !== 0) typ = X_SHUTDOOR;
            break;
        }
        case DRAWBRIDGE_UP:
            typ = X_GROUND;
            break;
        case MOAT:
            if (Is_juiblex_level(u.uz)) typ = X_SWAMP;
            break;
        case WATER:
            if (!Is_waterlevel(u.uz)) typ = X_WATERWALL;
            break;
        default:
            break;
        }
    }

    const prev = g.iflags.terrain_typ;
    if (typ !== prev) {
        g.iflags.terrain_typ = typ;
        if (g.flags?.terrainstatus && !(g.context?.run | 0)) {
            g.disp = g.disp || {};
            g.disp.botl = true;
        }
    }
}

/**
 * C: **`hack.c`** **`switch_terrain(void)`** — levitation / flight block vs **`float_up`** /
 * **`float_vs_flight`** (**`float_vs_flight`** omitted); ends with **`classify_terrain`** (always
 * updates **`iflags.terrain_typ`**; **`disp.botl`** only when **`flags.terrainstatus`**).
 * @param {import('./gstate.js').game} g
 */
export async function switchTerrainLikeC(g) {
    const u = g.u;
    if (!u) return;

    const blocklev = blockLevOrFlyLikeC(g);
    const wasLevitating = levitationEffectiveLikeC(g);
    const wasFlying = flyingEffectiveLikeC(g);

    if (blocklev) {
        if (levitationEffectiveLikeC(g)) {
            await pline('You can\'t levitate in here.');
            u.BLevitation = (u.BLevitation | 0) | FROMOUTSIDE;
        }
    } else if ((u.BLevitation | 0) & FROMOUTSIDE) {
        u.BLevitation = (u.BLevitation | 0) & ~FROMOUTSIDE;
        if (((u.HLevitation | 0) || (u.ELevitation | 0) || (u.Levitation | 0) || (u.BLevitation | 0)) !== 0) {
            await floatUpAfterTerrainUnblockLikeC(g);
        }
    }

    if (blocklev) {
        if (flyingEffectiveLikeC(g)) {
            await pline('You can\'t fly in here.');
            u.BFlying = (u.BFlying | 0) | FROMOUTSIDE;
        }
    } else if ((u.BFlying | 0) & FROMOUTSIDE) {
        u.BFlying = (u.BFlying | 0) & ~FROMOUTSIDE;
        if (flyingEffectiveLikeC(g)) await pline('You start flying.');
    }

    if ((!!levitationEffectiveLikeC(g) ^ wasLevitating) || (!!flyingEffectiveLikeC(g) ^ wasFlying)) {
        g.disp = g.disp || {};
        g.disp.botl = true;
    }

    classifyTerrainHeroLikeC(g);
}
