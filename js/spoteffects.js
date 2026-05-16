// spoteffects.js — Hero arrival on a map cell (hack.c spoteffects / pooleffects slice).
// C ref: hack.c spoteffects(boolean pick), pooleffects(boolean newspot); trap.c drown(),
//        lava_effects(); pickup.c pickup(); trap.c dotrap().
//
// Ported: recursion guard (inspoteffects + spotloc + spotterrain + dotrap typ), in_lava_effects
// early-out, pooleffects liquid entry (lava before pool, drown gate vs C), check_special_room stub,
// pickup(1) before/after pit vs non-pit, dotrap with same-trap re-entry suppression.
// Still TODO: switch_terrain, HLevitation timeout/float_down, sink+Levitation, Warning+ice,
// ceiling piercer / m_at surprise + mnexto, gi.in_steed_dismounting, full pooleffects leave-water.

import { game } from './gstate.js';
import { tAt } from './search.js';
import { dotrap } from './trap.js';
import { pickup } from './pickup.js';
import { maybeHeroPoolEnter } from './drown.js';
import { maybeHeroLavaEffects } from './lava.js';
import {
    IS_LAVA,
    IS_POOL,
    IS_WATERWALL,
    is_pit,
    NO_TRAP_FLAGS,
} from './const.js';
import { raceptr, breathless, swims, amphibious } from './mondata.js';

/** C: hack.c static `inspoteffects` / `spotloc` / `spotterrain` — overwritten each nested entry. */
let spDepth = 0;
let spLocX = 0;
let spLocY = 0;
let spTerr = 0;

/** C: hack.c static during `dotrap` — `spottrap` / `spottraptyp` for nested `spoteffects` guard. */
let activeDotrapTtyp = 0;

function swimmingLike(ptr) {
    return swims(ptr);
}

/**
 * C: hack.c **`pooleffects(newspot)`** — liquid entry/leave; JS subset (**`drown`/`lava_effects`** only).
 * @param {typeof game} g
 * @param {boolean} newspot
 * @param {{ fromDx?: number, fromDy?: number }} opts
 * @returns {Promise<boolean>} true ⇒ C **`goto spotdone`** (hero moved by **`drown`** etc.)
 */
async function pooleffectsBooleanNewspot(g, newspot, opts) {
    const u = g.u;
    if (!u) return false;

    /* C: leave-water / plane / lava oops — not ported (no **`set_uinwater`** yet). */

    if ((u.ustuck | 0) !== 0) return false;
    if ((u.Levitation | 0) !== 0 || (u.Flying | 0) !== 0) return false;

    const loc = g.level?.at(u.ux, u.uy);
    if (!loc) return false;
    const typ = loc.typ | 0;

    const poolOrLava = IS_POOL(typ) || IS_LAVA(typ);
    if (!poolOrLava) return false;

    /* C: usteer grounded / dismount / Upolyd ceiling_hider — not ported */
    if (IS_LAVA(typ)) {
        const lavaMoved = await maybeHeroLavaEffects(g);
        return !!lavaMoved;
    }

    const ptr = raceptr(g.youmonst);
    const wwalking = !!(u.Wwalking | 0);
    const waterwall = IS_WATERWALL(typ);
    const wadeGate = !wwalking || waterwall;
    const comfyWater = amphibious(ptr) || breathless(ptr) || swimmingLike(ptr);
    const inwater = !!(u.underwater | 0);
    if (wadeGate && (newspot || !inwater || !comfyWater)) {
        const crawled = await maybeHeroPoolEnter(g, {
            fromDx: opts.fromDx | 0,
            fromDy: opts.fromDy | 0,
        });
        return !!crawled;
    }
    return false;
}

/** C: hack.c **`check_special_room(FALSE)`** — stub until **`mkroom.c`** parity. */
function checkSpecialRoomSpoteffects(_g, _picked) {
    void _g;
    void _picked;
}

/**
 * C: hack.c **`spoteffects(boolean pick)`** — post-move arrival (**`domove`** / displace).
 * @param {typeof game} [g]
 * @param {boolean} [pick] — C **`pick`** (**`pickup(1)`** when true)
 * @param {{ fromDx?: number, fromDy?: number }} [opts] — last move for **`drown`** wading gate
 */
export async function spotEffects(g = game, pick = true, opts = {}) {
    g.iflags = g.iflags || {};
    const u = g.u;
    if (!u) return;

    /* C: `if (iflags.in_lava_effects) return;` */
    if (g.iflags.in_lava_effects | 0) return;

    const loc0 = g.level?.at(u.ux, u.uy);
    const curTerr = loc0 ? (loc0.typ | 0) : 0;
    const trap0 = tAt(u.ux, u.uy);
    const trapT0 = trap0 ? (trap0.ttyp | 0) : 0;

    /* C: `if (inspoteffects && u_at(spotloc) && spotterrain == levl[ux][uy].typ && (...)) return` */
    if (
        spDepth > 0
        && (u.ux | 0) === spLocX
        && (u.uy | 0) === spLocY
        && curTerr === spTerr
        && (!activeDotrapTtyp || !trap0 || (trapT0 | 0) === (activeDotrapTtyp | 0))
    ) {
        return;
    }

    spDepth += 1;
    spLocX = u.ux | 0;
    spLocY = u.uy | 0;
    spTerr = curTerr;

    try {
        /* C: `if (spotterrain != levl[u.ux0][u.uy0].typ || iflags.terrain_typ == MAX_TYPE) switch_terrain();` */
        const moved = await pooleffectsBooleanNewspot(g, true, opts);
        if (moved) return;

        checkSpecialRoomSpoteffects(g, false);

        /* C: `IS_SINK(...) && Levitation` dosinkfall; HLevitation timeout + float_down; in_steed_dismounting — not ported */

        const tr = tAt(u.ux, u.uy);
        const pit = !!(tr && is_pit(tr.ttyp | 0));
        if (pick && !pit) await pickup(1);

        const tr2 = tAt(u.ux, u.uy);
        if (tr2) {
            const tt = tr2.ttyp | 0;
            if (!activeDotrapTtyp || (activeDotrapTtyp | 0) !== tt) {
                activeDotrapTtyp = tt;
                try {
                    await dotrap(tr2, NO_TRAP_FLAGS);
                } finally {
                    activeDotrapTtyp = 0;
                }
            }
        }
        if (pick && pit) await pickup(1);

        /* C: Warning + melt_ice timer plines; m_at piercer / surprise — not ported */
    } finally {
        spDepth -= 1;
        if (spDepth <= 0) {
            spLocX = 0;
            spLocY = 0;
            spTerr = 0;
        }
    }
}
