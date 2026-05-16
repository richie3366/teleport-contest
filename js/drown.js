// drown.js — Hero entering water (trap.c drown() subset).
// C ref: trap.c drown() — Amphibious/Swimming/Breathless stay in water; else rnd_nextto_goodpos
// + crawl_destination crawl-out (emergency_disrobe / teleds / done(DROWNING) not ported).

import { game } from './gstate.js';
import { IS_POOL } from './const.js';
import { raceptr, breathless, swims, amphibious } from './mondata.js';
import { rndNexttoGoodposHero } from './walkable.js';
import { pline } from './display.js';

/**
 * After the hero steps onto an **`IS_POOL`** square: swimmers set **`u.underwater`**;
 * others try **`rndNexttoGoodposHero`** ( **`trap.c`** **`rnd_nextto_goodpos`** + **`crawl_destination`** ).
 * If no escape neighbor: **`u.underwater`** only (**`done(DROWNING)`** TODO).
 * @param {typeof game} [g]
 * @returns {Promise<boolean>} true if hero **crawled** to a different square (caller should **`newsym`** pool + new cell).
 */
export async function maybeHeroPoolEnter(g = game) {
    const u = g.u;
    if (!u) return false;
    const loc = g.level?.at(u.ux, u.uy);
    if (!loc || !IS_POOL(loc.typ)) return false;

    const ptr = raceptr(g.youmonst);
    if (breathless(ptr) || swims(ptr) || amphibious(ptr)) {
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
