// invent.js — Minimal inventory display (invent.c / display.c).
// C ref: cmd.c #inventory → ddoinv() / display_inventory; invent.c update_inventory.

import { game } from './gstate.js';
import { paintIniInvStubIntoDisplay } from './ini_inv_stub.js';

/** C: invent.c update_inventory() — persistent invent window (stub: no WIN_PERM). */
export function updateInventory() {
    if (!game.program_state?.in_moveloop) return;
    /* C: suppress_map_output() — skip until map suppression exists */
    /* C: (*windowprocs.win_update_inventory)(0) — browser port has no side window yet */
}

/** @param {import('./game_display.js').GameDisplay} display */
export function paintInventoryIntoDisplay(display) {
    paintIniInvStubIntoDisplay(display);
}
