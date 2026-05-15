// track.js — Hero movement trail (see_monsters / scent heuristics).
// C ref: track.c initrack(), UTSZ.

import { game } from './gstate.js';

const UTSZ = 100;

/** C: initrack() — clear ring buffer of recent hero coordinates. */
export function initrack() {
    game._track = {
        utcnt: 0,
        utpnt: 0,
        buf: Array.from({ length: UTSZ }, () => ({ x: 0, y: 0 })),
    };
}
