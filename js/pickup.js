// pickup.js — Autopickup and pickup_prev flags.
// C ref: pickup.c reset_justpicked()

import { game } from './gstate.js';

/** C: reset_justpicked(olist) — clear pickup_prev on each object in the chain. */
export function resetJustPicked(olist) {
    const list = olist ?? game.invent;
    if (!list) return;
    for (let o = list; o; o = o.nobj) o.pickup_prev = 0;
}
