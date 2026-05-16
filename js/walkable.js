// walkable.js — Terrain blocking for hero/monster moves (shared stub).
// C ref: hack.c blocks(), mon.c goodpos() (terrain slice only).

import { game } from './gstate.js';
import { STONE, DOOR, D_CLOSED, D_LOCKED, IS_WALL } from './const.js';

/**
 * True if (x,y) cannot be walked onto (walls, closed doors, void).
 * @param {number} x
 * @param {number} y
 * @param {Record<string, unknown>} [g]
 */
export function blocksMovementAt(x, y, g = game) {
    const loc = g.level?.at(x, y);
    if (!loc) return true;
    if (loc.typ === STONE) return true;
    if (IS_WALL(loc.typ)) return true;
    if (loc.typ === DOOR && (loc.doormask & (D_CLOSED | D_LOCKED))) return true;
    return false;
}
