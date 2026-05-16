// watch_dig.js — Town watch reaction to digging damage (wand/spell/chew).
// C ref: dig.c watch_dig()

import { inTownLikeC } from './hacklib.js';
import { isClosedDoorLoc } from './walkable.js';
import {
    SDOOR,
    TREE,
    STONE,
    IS_WALL,
    IS_FOUNTAIN,
} from './const.js';

function isTreeCellLikeC(g, typ) {
    const t = typ | 0;
    if (t === TREE) return true;
    return !!(g.level?.flags?.arboreal && t === STONE);
}

/**
 * C: dig.c watch_dig — **`in_town`** + door / **`SDOOR`** / wall / fountain / tree
 * (**`closed_door`** / **`lev->typ == SDOOR`** / **`IS_WALL`** / **`IS_FOUNTAIN`** / **`IS_TREE`**).
 * @param {import('./gstate.js').game} g
 */
function watchDigCellQualifiesLikeC(g, x, y) {
    const loc = g.level?.at(x | 0, y | 0);
    if (!loc) return false;
    const t = loc.typ | 0;
    if (isClosedDoorLoc(loc) || t === SDOOR || IS_WALL(t) || IS_FOUNTAIN(t) || isTreeCellLikeC(g, t)) {
        return true;
    }
    return false;
}

/**
 * C: dig.c get_iter_mons(watchman_canseeu) — stub until **`is_watch`** / **`m_canseeu`** port.
 * @returns {null}
 */
function getIterMonsWatchmanCanSeeUStub(_g) {
    return null;
}

/**
 * C: dig.c watch_dig(struct monst *mtmp, coordxy x, coordxy y, boolean zap)
 *
 * When a watchman is found: **`verbalize`**, **`angry_guards`**, **`context.digging.warned`**,
 * **`stop_occupation`** ( **`dig.c`** ). Those paths are deferred; **`get_iter_mons`** stub is
 * always **`NULL`** today, so this is a **no-op** for RNG until watchmen exist.
 *
 * @param {import('./gstate.js').game} g
 * @param {object|null|undefined} mtmp
 * @param {number} x
 * @param {number} y
 * @param {boolean} zap
 */
export async function watchDigHeroLikeC(g, mtmp, x, y, zap) {
    void zap;
    const xi = x | 0;
    const yi = y | 0;
    if (!inTownLikeC(g, xi, yi)) return;
    if (!watchDigCellQualifiesLikeC(g, xi, yi)) return;

    let m = mtmp ?? null;
    if (!m) m = getIterMonsWatchmanCanSeeUStub(g);
    if (!m) return;

    /* C: SetVoice + verbalize + angry_guards / digging.warned + stop_occupation — TODO */
}
