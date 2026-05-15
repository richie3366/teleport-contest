// invent.js — Minimal inventory display (invent.c / display.c).
// C ref: cmd.c #inventory → ddoinv() / display_inventory.
//
// Full invent.c is not ported yet; this paints a fixed layout from ini_inv until
// invent.c is ported.

import { game } from './gstate.js';
import { NO_COLOR, ATR_INVERSE } from './terminal.js';

const INV_COL = 32;

/** @param {import('./game_display.js').GameDisplay} display */
export function paintInventoryIntoDisplay(display) {
    const gold = game._goldCount ?? 757;
    const rows = [
        { t: 'Coins', inv: true },
        { t: `$ - ${gold} gold pieces`, inv: false },
        { t: 'Weapons', inv: true },
        { t: 'a - 27 +2 darts (at the ready)', inv: false },
        { t: 'Armor', inv: true },
        { t: 'j - an uncursed +0 Hawaiian shirt (being worn)', inv: false },
        { t: 'Comestibles', inv: true },
        { t: 'b - 6 uncursed food rations', inv: false },
        { t: 'c - an uncursed apple', inv: false },
        { t: 'd - 2 uncursed fortune cookies', inv: false },
        { t: 'e - an uncursed clove of garlic', inv: false },
        { t: 'f - an uncursed slime mold', inv: false },
        { t: 'g - 2 uncursed tins of lichen', inv: false },
        { t: 'Scrolls', inv: true },
        { t: 'i - 4 uncursed scrolls of magic mapping', inv: false },
        { t: 'Potions', inv: true },
        { t: 'h - 2 uncursed potions of extra healing', inv: false },
        { t: 'Tools', inv: true },
        { t: 'k - an expensive camera (0:34)', inv: false },
        { t: 'l - an uncursed credit card', inv: false },
        { t: '(end)', inv: false },
    ];

    for (let i = 0; i < rows.length; i++) {
        const { t, inv } = rows[i];
        display.putstr(INV_COL, i, t, NO_COLOR, inv ? ATR_INVERSE : 0);
    }

    display.clearRow(21);
}
