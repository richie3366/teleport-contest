// pickup.js — Autopickup, encumbrance messages, pickup_prev flags.
// C ref: pickup.c reset_justpicked(), encumber_msg(), near_capacity via u.near_capacity

import { game } from './gstate.js';
import { pline } from './display.js';
import { stagger, permonstHuman } from './mondata.js';

/** C: reset_justpicked(olist) — clear pickup_prev on each object in the chain. */
export function resetJustPicked(olist) {
    const list = olist ?? game.invent;
    if (!list) return;
    for (let o = list; o; o = o.nobj) o.pickup_prev = 0;
}

/**
 * C: raceptr(&youmonst) / youmonst.data for encumber phrasing.
 * @returns {import('./mondata.js').Permonst}
 */
function encumberStaggerPtr() {
    return game.youmonst?.data ?? permonstHuman;
}

/**
 * C: encumber_msg() — pline when near_capacity() crosses go.oldcap.
 * Uses game.u.near_capacity until invent weight / near_capacity() is ported.
 */
export async function encumberMsg() {
    const g = game;
    const newcap = g.u?.near_capacity ?? 0;
    const old = g._encumberOldCap ?? 0;

    if (old < newcap) {
        switch (newcap) {
        case 1:
            await pline('Your movements are slowed slightly because of your load.');
            break;
        case 2:
            await pline('You rebalance your load.  Movement is difficult.');
            break;
        case 3:
            await pline(`You ${stagger(encumberStaggerPtr(), 'stagger')} under your heavy load.  Movement is very hard.`);
            break;
        default:
            await pline(
                newcap === 4
                    ? 'You can barely move a handspan with this load!'
                    : "You can't even move a handspan with this load!",
            );
            break;
        }
        g.disp = g.disp || {};
        g.disp.botl = true;
    } else if (old > newcap) {
        switch (newcap) {
        case 0:
            await pline('Your movements are now unencumbered.');
            break;
        case 1:
            await pline('Your movements are only slowed slightly by your load.');
            break;
        case 2:
            await pline('You rebalance your load.  Movement is still difficult.');
            break;
        case 3:
            await pline(`You ${stagger(encumberStaggerPtr(), 'stagger')} under your load.  Movement is still very hard.`);
            break;
        default:
            break;
        }
        g.disp = g.disp || {};
        g.disp.botl = true;
    }
    g._encumberOldCap = newcap;
}
