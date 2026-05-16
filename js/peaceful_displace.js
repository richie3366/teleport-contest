// peaceful_displace.js — Hero swaps with a peaceful / tame monster on walk.
// C ref: hack.c domove → displaceum / m_move (peaceful swap when not attacking).

import { game } from './gstate.js';
import { pline } from './display.js';

/**
 * Swap hero at `(heroX, heroY)` with peaceful `mtmp` currently at `(monX, monY)`.
 * C: peaceful displacement (no attack roll); tame pets use the same path.
 * @param {{ mpeaceful?: number, mtame?: number, mx?: number, my?: number, monnam?: string, data?: { mname?: string } }} mtmp
 * @param {number} heroX
 * @param {number} heroY
 * @param {number} monX
 * @param {number} monY
 */
export async function peacefulSwapWithHero(mtmp, heroX, heroY, monX, monY) {
    if (!(mtmp.mpeaceful | 0)) return;
    const u = game.u;
    mtmp.mx = heroX;
    mtmp.my = heroY;
    u.ux = monX;
    u.uy = monY;
    const who = mtmp.monnam || mtmp.data?.mname || 'the peaceful creature';
    await pline(`You swap places with ${who}.`);
}
