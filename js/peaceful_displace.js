// peaceful_displace.js — Hero swaps with a peaceful / tame monster on walk.
// C ref: hack.c domove → displaceum (peaceful swap when not attacking).

import { game } from './gstate.js';
import { pline } from './display.js';
import { tAt } from './search.js';
import { blocksMovementAt } from './walkable.js';

function monLabel(mtmp) {
    return mtmp?.monnam || mtmp?.data?.mname || 'the peaceful creature';
}

/** C: mon.c mundisplaceable — Oracle, shop, vault guard, … (stub: never). */
export function mundisplaceable(mtmp) {
    void mtmp;
    return false;
}

/**
 * C: hack.c displace — `!goodpos(hero,mon)` / trap on hero spot / `mundisplaceable` / `mtrapped`.
 * @param {{ mtrapped?: number }} mtmp
 * @param {number} heroX
 * @param {number} heroY
 */
export function canPeacefullyDisplace(mtmp, heroX, heroY) {
    if (!mtmp) return false;
    if ((mtmp.mtrapped | 0) !== 0) return false;
    if (mundisplaceable(mtmp)) return false;
    if (tAt(heroX, heroY)) return false;
    if (blocksMovementAt(heroX, heroY)) return false;
    return true;
}

/**
 * If `mtmp` is peaceful and displacement is allowed, swap with hero and pline success.
 * Otherwise pline refusal (C: "doesn't want to swap") and leave positions unchanged.
 * @returns {{ swapped: boolean }}
 */
export async function tryPeacefulSwap(mtmp, heroX, heroY, monX, monY) {
    if (!(mtmp.mpeaceful | 0)) return { swapped: false };
    const who = monLabel(mtmp);
    if (!canPeacefullyDisplace(mtmp, heroX, heroY)) {
        await pline(`You stop. ${who} doesn't want to swap places.`);
        return { swapped: false };
    }
    const u = game.u;
    mtmp.mx = heroX;
    mtmp.my = heroY;
    u.ux = monX;
    u.uy = monY;
    await pline(`You swap places with ${who}.`);
    return { swapped: true };
}
