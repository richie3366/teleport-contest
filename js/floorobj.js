// floorobj.js — Floor object chains (nexthere) at (x,y).
// C ref: mkobj.c place_object(), rm.c / invent floor lists.
//
// Shared by mklev.js and trap/missile code so traps can drop projectiles
// without importing the full level generator.

import { game } from './gstate.js';

export function floorObjKey(x, y) {
    return `${x},${y}`;
}

/** C: take off chain before move — remove otmp from floorObjHeads at its coords. */
export function unlinkFloorObject(otmp) {
    const lvl = game.level;
    if (!lvl?.floorObjHeads || !otmp || otmp.ox < 0 || otmp.oy < 0) return;
    const k = floorObjKey(otmp.ox, otmp.oy);
    const head = lvl.floorObjHeads.get(k) ?? null;
    if (head === otmp) {
        if (otmp.nexthere) lvl.floorObjHeads.set(k, otmp.nexthere);
        else lvl.floorObjHeads.delete(k);
    } else if (head) {
        let cur = head;
        while (cur?.nexthere) {
            if (cur.nexthere === otmp) {
                cur.nexthere = otmp.nexthere;
                break;
            }
            cur = cur.nexthere;
        }
    }
    otmp.nexthere = null;
}

/** C: mkobj.c place_object(otmp, x, y) */
export function placeFloorObject(otmp, x, y) {
    const lvl = game.level;
    if (!lvl || !otmp) return;
    if (otmp.ox >= 0 && otmp.oy >= 0 && (otmp.ox !== x || otmp.oy !== y)) unlinkFloorObject(otmp);
    if (!lvl.floorObjHeads) lvl.floorObjHeads = new Map();
    const k = floorObjKey(x, y);
    otmp.ox = x;
    otmp.oy = y;
    const prev = lvl.floorObjHeads.get(k) ?? null;
    otmp.nexthere = prev;
    lvl.floorObjHeads.set(k, otmp);
    if (!lvl.objects.includes(otmp)) lvl.objects.push(otmp);
}
