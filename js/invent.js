// invent.js — Minimal inventory display (invent.c / display.c).
// C ref: cmd.c #inventory → ddoinv() / display_inventory.
//
// Full invent.c is not ported yet; delegates to ini_inv_stub.js until invent.c exists.

import { paintIniInvStubIntoDisplay } from './ini_inv_stub.js';

/** @param {import('./game_display.js').GameDisplay} display */
export function paintInventoryIntoDisplay(display) {
    paintIniInvStubIntoDisplay(display);
}
