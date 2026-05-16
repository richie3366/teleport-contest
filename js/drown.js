// drown.js — Hero entering water (trap.c drown() subset).
// C ref: trap.c drown() — feel_newsym; wading rn2(5); fall/sink plines; water_damage_chain /
// gremlin / iron golem / teleport / steed / emergency_disrobe / done(DROWNING) mostly TODO.

import { game } from './gstate.js';
import { IS_POOL } from './const.js';
import { raceptr, breathless, swims, amphibious } from './mondata.js';
import { rndNexttoGoodposHero } from './walkable.js';
import { pline } from './display.js';
import { rn2 } from './rng.js';

/**
 * C: trap.c waterbody_name() subset — hero on **`IS_POOL`**.
 * @param {typeof game} g
 */
function waterbodyNamePool(g) {
    const u = g.u;
    const loc = u ? g.level?.at(u.ux, u.uy) : null;
    if (loc && IS_POOL(loc.typ)) return 'pool of water';
    return 'water';
}

/**
 * C: **`Swimming`** macro (innate **`swims`** only until **`HSwimming`** / **`FROMFORM`** port).
 * @param {ReturnType<typeof raceptr>} ptr
 */
function swimmingMacro(ptr) {
    return swims(ptr);
}

/**
 * After the hero steps onto an **`IS_POOL`** square (**`trap.c`** **`drown()`**).
 * @param {typeof game} [g]
 * @param {{ fromDx?: number, fromDy?: number }} [opts] — last move (**`u.dx`/`u.dy`**); needed for wading **`rn2(5)`** gate.
 * @returns {Promise<boolean>} true if hero **crawled** to a different square (caller should **`newsym`** pool + new cell).
 */
export async function maybeHeroPoolEnter(g = game, opts = {}) {
    const u = g.u;
    if (!u) return false;
    const loc = g.level?.at(u.ux, u.uy);
    if (!loc || !IS_POOL(loc.typ)) return false;

    const ptr = raceptr(g.youmonst);
    const dx = opts.fromDx | 0;
    const dy = opts.fromDy | 0;
    const prevX = u.ux - dx;
    const prevY = u.uy - dy;
    const prevLoc = g.level?.at(prevX, prevY);

    /** C: `inpool_ok` — wading branch may still run **`water_damage_chain`** then exit before drowning setup. */
    let inpoolOk = false;
    if (
        (u.underwater | 0) &&
        prevLoc &&
        IS_POOL(prevLoc.typ) &&
        (breathless(ptr) || swims(ptr) || amphibious(ptr))
    ) {
        if (rn2(5) === 0) inpoolOk = true;
        else return false;
    }

    const comfyInWater = amphibious(ptr) || breathless(ptr) || swims(ptr);
    const swimM = swimmingMacro(ptr);
    const isWaterwall = false; /* C: is_waterwall(u.ux,u.uy) */

    if (!u.underwater) {
        const verb = isWaterwall ? 'plunge' : 'fall';
        const body = waterbodyNamePool(g);
        const punct = comfyInWater ? '.' : '!';
        await pline(`You ${verb} into the ${body}${punct}`);
        if (!swimM && !isWaterwall) {
            const sink = (u.Hallucination | 0) ? 'the Titanic' : 'a rock';
            await pline(`You sink like ${sink}.`);
        }
    }

    /* C: water_damage_chain(gi.invent, FALSE); — scroll/potion/luck draws not ported */
    /* C: gremlin split / iron golem rust — not ported */

    if (inpoolOk) return false;

    /* C: leash / teleport / steed / faint — not ported */

    if (comfyInWater) {
        if (amphibious(ptr) || breathless(ptr)) {
            if (g.flags?.verbose) await pline("But you aren't drowning.");
            /* C: !Is_waterlevel(&u.uz) */
            if (u.Hallucination | 0) await pline('Your keel hits the bottom.');
            else await pline('You touch bottom.');
        }
        /* C: Punished unplacebc / placebc — not ported */
        u.underwater = 1;
        return false;
    }

    const dest = rndNexttoGoodposHero(u.ux, u.uy, g);
    if (!dest) {
        u.underwater = 1;
        return false;
    }

    const ox = u.ux;
    const oy = u.uy;
    u.ux0 = ox;
    u.uy0 = oy;
    u.ux = dest.x;
    u.uy = dest.y;
    u.underwater = 0;

    await pline('You try to crawl out of the water.');
    await pline('Pheew!  That was close.');
    return true;
}
