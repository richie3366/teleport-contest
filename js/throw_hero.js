// throw_hero.js — dothrow.c throwit landing subset (1-tile) + breakobj / check_shop_obj(FALSE).
// C ref: dothrow.c throwit() (slip rng, bhitpos one step, !IS_SOFT+breaktest→breakobj/hero_breaks);
//        place_object + check_shop_obj(FALSE); invent.c remove from invent.

import { game } from './gstate.js';
import { pline, newsym, flush_screen } from './display.js';
import { readDirIntoU } from './dir_input.js';
import { removeObjFromHeroInvent } from './water_damage.js';
import { placeFloorObjectInLevel, stackObjOnFloorInLevel } from './floorobj.js';
import { checkShopObjAfterHeroPlaceLikeC } from './shop.js';
import { blocksMovementAt } from './walkable.js';
import { isok } from './hacklib.js';
import { IS_SOFT } from './const.js';
import { rn2 } from './rng.js';
import { breaktestLikeC, heroBreaksObjLikeC, BRK_FROM_INV } from './obj_break_dothrow.js';
import { NH5_WEAPON_CLASS } from './nh5_objclass.js';
import { doname } from './objnam.js';

/** C: dothrow.c **`throwing_weapon`** subset — **`WEAPON_CLASS`** until **`is_missile`/`is_blade`** port. */
function throwingWeaponStubLikeC(obj) {
    return (obj?.oclass | 0) === NH5_WEAPON_CLASS;
}

/**
 * C: **`dothrow.c`** **`throwit`** opening slip (**`rn2(7)`**, greased / **`throwing_weapon`**) — mutates **`u.dx`/`u.dy`**.
 * Omits **`ammo_and_launcher`** misfire pline, **`u.dz`** toss-up.
 */
async function applyThrowSlipRngLikeC(g, obj) {
    const u = g.u;
    if (!u || !obj) return;
    if (!(obj.cursed | 0) && !(obj.greased | 0)) return;
    const dx0 = u.dx | 0;
    const dy0 = u.dy | 0;
    if (!dx0 && !dy0) return;
    if (rn2(7)) return;
    if (!(obj.greased | 0) && !throwingWeaponStubLikeC(obj)) return;
    await pline(`${doname(obj, g)} slips as you throw it!`);
    u.dx = rn2(3) - 1;
    u.dy = rn2(3) - 1;
    if (!(u.dx | 0) && !(u.dy | 0)) u.dy = 1;
}

/**
 * C: **`dothrow.c`** **`throwit`** subset — one adjacent **`gb.bhitpos`**, top **`g.invent`**, horizontal only.
 * @param {import('./gstate.js').game} [g]
 */
export async function throwOneInventAdjacentLikeC(g = game) {
    const u = g.u;
    if (!u) return;

    await pline('In what direction?');
    g._retainMessageAfterCommand = true;
    await flush_screen(1);
    if (!(await readDirIntoU(g))) {
        await pline('Never mind.');
        g.context.move = 0;
        return;
    }

    if (u.dz | 0) {
        await pline('You cannot throw that way.');
        g.context.move = 0;
        return;
    }

    const obj = g.invent;
    if (!obj) {
        await pline('You have nothing to throw.');
        g.context.move = 0;
        return;
    }

    await applyThrowSlipRngLikeC(g, obj);

    const dx = u.dx | 0;
    const dy = u.dy | 0;
    if (!dx && !dy) {
        await pline('Never mind.');
        g.context.move = 0;
        return;
    }

    const tx = (u.ux | 0) + dx;
    const ty = (u.uy | 0) + dy;
    if (!isok(tx, ty) || blocksMovementAt(tx, ty)) {
        await pline('You cannot throw there.');
        g.context.move = 0;
        return;
    }

    const loc = g.level?.at(tx, ty);
    const ltyp = loc?.typ | 0;
    const soft = IS_SOFT(ltyp);

    removeObjFromHeroInvent(g, obj);

    if (!soft && breaktestLikeC(g, obj)) {
        const broke = await heroBreaksObjLikeC(g, obj, tx, ty, BRK_FROM_INV);
        if (broke) {
            await newsym(tx, ty);
            g.context.move = 1;
            return;
        }
    }

    placeFloorObjectInLevel(g, obj, tx, ty);
    await checkShopObjAfterHeroPlaceLikeC(g, obj, tx, ty);
    stackObjOnFloorInLevel(g, obj);
    await newsym(tx, ty);
    g.context.move = 1;
}
