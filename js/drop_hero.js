// drop_hero.js — invent.c dodrop / dothrow.c place_object + check_shop_obj(FALSE) subset.
// C ref: invent.c dodrop() → dropy → flooreffects / place_object; dothrow.c throwit (place_object then check_shop_obj).

import { game } from './gstate.js';
import { pline, newsym } from './display.js';
import { removeObjFromHeroInvent } from './water_damage.js';
import { placeFloorObjectInLevel, stackObjOnFloorInLevel } from './floorobj.js';
import { checkShopObjAfterHeroPlaceLikeC } from './shop.js';

/**
 * C: **`invent.c`** **`dodrop()`** subset — drop **top-of-chain** **`g.invent`** at **`u.ux,u.uy`** (**`getobj`** / multi / gold split deferred).
 * @param {import('./gstate.js').game} [g]
 */
export async function doDropOneAtHeroFeetLikeC(g = game) {
    const u = g.u;
    if (!u) return;
    const obj = g.invent;
    if (!obj) {
        await pline('You have nothing to drop.');
        g.context.move = 0;
        g._retainMessageAfterCommand = true;
        return;
    }
    removeObjFromHeroInvent(g, obj);
    const x = u.ux | 0;
    const y = u.uy | 0;
    placeFloorObjectInLevel(g, obj, x, y);
    await checkShopObjAfterHeroPlaceLikeC(g, obj, x, y);
    stackObjOnFloorInLevel(g, obj);
    await newsym(x, y);
    g.context.move = 1;
}
