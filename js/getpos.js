// getpos.js — Cursor-position selection (partial).
// C ref: getpos.c getpos / hack.c handle_tip(TIP_GETPOS).
//
// Branch envelope: verbose instruction pline, first-use getpos tip
// (nhcore show_getpos_tip), hjklyubn cursor move + autodescribe topline,
// '.' → LOOK_TRADITIONAL, ESC → -1. Menu/jump/hilite/valids deferred.

import { game } from './gstate.js';
import { nhgetch } from './input.js';
import { flush_screen, pline, docrt } from './display.js';
import { isok } from './const.js';
import { paint_corner_nhw_menu } from './invent.js';

export const LOOK_TRADITIONAL = 0;
export const LOOK_QUICK = 1;
export const LOOK_ONCE = 2;
export const LOOK_VERBOSE = 3;

const DIR_DX = { h: -1, l: 1, j: 0, k: 0, y: -1, u: 1, b: -1, n: 1 };
const DIR_DY = { h: 0, l: 0, j: 1, k: -1, y: -1, u: -1, b: 1, n: 1 };

/**
 * C ref: nhcore.lua show_getpos_tip → nhlua.c nhl_text (NHW_MENU +
 * select_menu PICK_NONE) → wintty H2344 corner offx. Not NHW_TEXT
 * fullscreen; map under/left of the panel stays.
 */
async function show_getpos_tip() {
    // Exact nhcore.lua [[...]] lines (nhl_text splits on \n; wrap at 76).
    const lines = [
        'Tip: Farlooking or selecting a map location',
        '',
        'You are now in a "farlook" mode - the movement keys move the cursor,',
        'not your character.  Game time does not advance.  This mode is used',
        'to look around the map, or to select a location on it.',
        '',
        'When in this mode, you can press ESC to return to normal game mode,',
        'and pressing ? will show the key help.',
    ];
    await paint_corner_nhw_menu(lines, '(end) ');
    await flush_screen(1);
    await nhgetch();
    game._menu_overlay = false;
    await docrt();
    await flush_screen(1);
}

/**
 * C ref: getpos.c getpos — force unused for whatis (!quick).
 * Returns LOOK_* (>=0) or -1 on cancel. Updates ccp.x/ccp.y.
 */
export async function getpos(ccp, _force, goal, describeAt) {
    const g = game;
    if (!g.flags) g.flags = {};
    let cx = ccp.x | 0;
    let cy = ccp.y | 0;
    if (!isok(cx, cy)) {
        cx = g.u?.ux || 1;
        cy = g.u?.uy || 0;
    }

    let showGoalAfterTip = false;
    if (!g.context) g.context = {};
    if (!g.context.tips_given) g.context.tips_given = {};
    if (!g.context.tips_given.TIP_GETPOS) {
        g.context.tips_given.TIP_GETPOS = true;
        await show_getpos_tip();
        showGoalAfterTip = true;
    }

    if (g.flags.verbose !== false) {
        await pline("(For instructions type a '?')");
        // C: msg_given forces clear; whatis already may have pending --More--
    }

    if (showGoalAfterTip) {
        await pline(`Move cursor to ${goal || 'desired location'}:`);
    }

    const disp = g.nhDisplay;
    for (;;) {
        if (disp?.setCursor) {
            disp.setCursor(cx - 1, cy + 1);
            await flush_screen(1);
        }
        const key = await nhgetch();
        const ch = String.fromCharCode(key);

        if (key === 27) {
            ccp.x = -1;
            ccp.y = -1;
            g._pending_message = '';
            return -1;
        }

        if (ch === '.' || ch === ',' || ch === ':' || ch === ';') {
            ccp.x = cx;
            ccp.y = cy;
            // '.' → LOOK_TRADITIONAL (continue whatis loop); ',' often LOOK_ONCE
            return ch === ',' ? LOOK_ONCE : LOOK_TRADITIONAL;
        }

        if (ch in DIR_DX) {
            const nx = cx + DIR_DX[ch];
            const ny = cy + DIR_DY[ch];
            if (isok(nx, ny)) {
                cx = nx;
                cy = ny;
                if (typeof describeAt === 'function') {
                    const brief = describeAt(cx, cy);
                    if (brief) {
                        g._pending_message = brief;
                        await flush_screen(1);
                    }
                }
            }
            continue;
        }

        // Space / other: ignore for this subset (no menu jump)
        if (ch === ' ' || ch === '\n' || ch === '\r') continue;
        if (ch === '?') {
            await pline('Move the cursor with hjklyubn; . selects; ESC cancels.');
            continue;
        }
    }
}
