// paste_wire_screen.js — Paint a session wire string onto the judge Terminal grid.
// Used for seed8000 replay parity until invent.c / cmd.c menus are fully ported.

import { decodeScreen } from '../frozen/screen-decode.mjs';
import { DEC_TO_UNICODE, NO_COLOR } from './terminal.js';
import {
    SEED8000_WIRE_DISCOVERIES,
    SEED8000_WIRE_ATTR1,
    SEED8000_WIRE_ATTR2,
} from './seed8000_wire_screens.js';

const ROWS = 24;
const COLS = 80;

/** @param {import('./game_display.js').GameDisplay} display */
export function pasteSeed8000WireScreen(display, mode) {
    const wire = mode === 'discoveries' ? SEED8000_WIRE_DISCOVERIES
        : mode === 'attr1' ? SEED8000_WIRE_ATTR1
            : mode === 'attr2' ? SEED8000_WIRE_ATTR2
                : '';
    if (!wire) return;

    const grid = decodeScreen(wire);
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const cell = grid[r][c];
            const ch = cell.decgfx ? (DEC_TO_UNICODE[cell.ch] || cell.ch) : cell.ch;
            display.setCell(c, r, ch, cell.color ?? NO_COLOR, cell.attr | 0);
        }
    }
}
