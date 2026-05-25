// symbols_file.js — C symbols.c read_sym_file / switch_symbols (minimal).
// C ref: symbols.c parse_sym_line, load_symset, dat/symbols symset blocks.

import { gs, gp } from './const.js';

/** C: hack.h SYM_MAX — room for cmap + obj + mon + other symbol slots. */
const SYM_MAX = 512;

/**
 * C: symbols.c init_primary_symbols — allocate defaults (defsyms); walls still
 * flow through display.c decgraphics until map_glyph uses showsyms[].
 */
function initPrimarySymbolsLikeC() {
    gp.primary_syms = new Array(SYM_MAX).fill(0);
    gs.showsyms = new Array(SYM_MAX).fill(0);
}

/** C: dat/symbols DECgraphics cmap + feature overrides (subset). */
const DECGRAPHICS_PRIMARY = Object.freeze({
    1: 0xf8, 2: 0xf1, 3: 0xec, 4: 0xeb, 5: 0xed, 6: 0xea, 7: 0xee,
    8: 0xf6, 9: 0xf7, 10: 0xf5, 11: 0xf4,
});

/** C: dat/symbols IBMgraphics wall cmap bytes (subset). */
const IBMGRAPHICS_PRIMARY = Object.freeze({
    1: 0xb3, 2: 0xc4, 3: 0xda, 4: 0xbf, 5: 0xc0, 6: 0xd9, 7: 0xcc,
    8: 0xc9, 9: 0xcb, 10: 0xcb, 11: 0xcc,
});

const SYMSSET_PRIMARY_OVERRIDES = {
    DECgraphics: DECGRAPHICS_PRIMARY,
    IBMgraphics: IBMGRAPHICS_PRIMARY,
    curses: DECGRAPHICS_PRIMARY,
};

function applySymsetOverridesLikeC(name) {
    const tab = SYMSSET_PRIMARY_OVERRIDES[name];
    if (!tab || !gp.primary_syms) return;
    for (const [idx, byte] of Object.entries(tab)) {
        gp.primary_syms[idx | 0] = byte | 0;
    }
}

/**
 * C: symbols.c switch_symbols(nondefault) — copy primary_syms → showsyms.
 * @param {boolean} nondefault
 */
export function switchSymbolsPrimaryLikeC(nondefault) {
    if (nondefault && gp.primary_syms) {
        gs.showsyms = gp.primary_syms.slice();
        return;
    }
    initPrimarySymbolsLikeC();
}

/**
 * C: symbols.c read_sym_file(PRIMARYSET) for known symset names (no dat/symbols I/O).
 * @param {string} name
 * @returns {boolean}
 */
export function readSymFilePrimaryLikeC(name) {
    if (!name) return false;
    initPrimarySymbolsLikeC();
    if (!SYMSSET_PRIMARY_OVERRIDES[name]) return false;
    applySymsetOverridesLikeC(name);
    switchSymbolsPrimaryLikeC(true);
    return true;
}
