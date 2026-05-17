// punish_hero.js — Ball and chain (read.c punish / unpunish subset).
// C ref: read.c unpunish(void) (~3065); you.h Punished-style checks as in goto_level_hero heroPunishedLikeC.

import { W_BALL } from './const.js';
import { obliterateObjectInLevel } from './floorobj.js';
import { removeObjFromHeroInvent } from './water_damage.js';

/**
 * C: **`Punished`** / carried **`uball`** — same idea as **`goto_level_hero.js`** **`heroPunishedLikeC`**.
 * @param {import('./gstate.js').game} g
 */
export function heroPunishedLikeC(g) {
    const u = g?.u;
    if (!u) return false;
    if ((u.Punished | 0) !== 0) return true;
    const b = g.uball;
    if (!b) return false;
    for (let o = g.invent; o; o = o.nobj) {
        if (o === b) return true;
    }
    return false;
}

/**
 * C: read.c **`unpunish(void)`** — **`delobj`** chain; ball object stays in invent (**`setworn(0,W_BALL)`** clears **`uball`**).
 * @param {import('./gstate.js').game} g
 */
export function unpunishHeroLikeC(g) {
    const u = g?.u;
    if (!u) return;
    const chain = g.uchain;
    const ball = g.uball;
    if (chain) {
        removeObjFromHeroInvent(g, chain);
        obliterateObjectInLevel(g, chain);
        g.uchain = null;
    }
    if (ball) {
        ball.owornmask = (ball.owornmask | 0) & ~W_BALL;
        if (u.uwep === ball) u.uwep = null;
        g.uball = null;
    }
    u.Punished = 0;
}
