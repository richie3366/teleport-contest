// symbols_file.js — C symbols.c read_sym_file / switch_symbols / parse_sym_line (cmap subset).
// C ref: symbols.c parse_sym_line, load_symset, dat/symbols symset blocks.

import { gs, gp, H_DEC, H_IBM, PRIMARYSET } from './const.js';
import { NO_COLOR } from './terminal.js';

/** C: hack.h SYM_MAX — room for cmap + obj + mon + other symbol slots. */
const SYM_MAX = 512;

/** C: defsym.h cmap indices (PCHAR idx). */
export const S_stone = 0;
export const S_vwall = 1;
export const S_hwall = 2;
export const S_tlcorn = 3;
export const S_trcorn = 4;
export const S_blcorn = 5;
export const S_brcorn = 6;
export const S_crwall = 7;
export const S_tuwall = 8;
export const S_tdwall = 9;
export const S_tlwall = 10;
export const S_trwall = 11;
export const S_ndoor = 12;
export const S_vodoor = 13;
export const S_hodoor = 14;
export const S_vcdoor = 15;
export const S_hcdoor = 16;
export const S_bars = 17;
export const S_tree = 18;
export const S_room = 19;
export const S_upstair = 25;
export const S_dnstair = 26;
export const S_upladder = 27;
export const S_dnladder = 28;
export const S_altar = 33;
export const S_fountain = 37;
export const S_pool = 38;
export const S_ice = 39;
export const S_lava = 40;

/**
 * C: dat/symbols DECgraphics — sym_val bytes → tty DEC line-drawing chars (SO/SI set).
 * Matches display.js decgraphics[] for wall cmap 1–11.
 */
const DEC_SYM_BYTE_TO_TTY = Object.freeze({
    0xf8: 'x', 0xf1: 'q', 0xec: 'l', 0xeb: 'k', 0xed: 'm', 0xea: 'j', 0xee: 'n',
    0xf6: 'v', 0xf7: 'w', 0xf5: 'u', 0xf4: 't',
    0xfe: '~', 0xe1: 'a', 0xfc: '|', 0xe7: 'g', 0xe0: '\\',
    0xf9: 'y', 0xfa: 'z', 0xfb: '{', 0xef: 'o', 0xf3: 's',
});

/** C: dat/symbols DECgraphics cmap + features (parse_sym_line subset). */
const DECGRAPHICS_PRIMARY = Object.freeze({
    [S_vwall]: 0xf8, [S_hwall]: 0xf1, [S_tlcorn]: 0xec, [S_trcorn]: 0xeb,
    [S_blcorn]: 0xed, [S_brcorn]: 0xea, [S_crwall]: 0xee,
    [S_tuwall]: 0xf6, [S_tdwall]: 0xf7, [S_tlwall]: 0xf5, [S_trwall]: 0xf4,
    [S_ndoor]: 0xfe, [S_vodoor]: 0xe1, [S_hodoor]: 0xe1,
    [S_bars]: 0xfc, [S_tree]: 0xe7, [S_room]: 0xfe,
    [S_upstair]: 0xf9, [S_dnstair]: 0xfa, [S_upladder]: 0xf9, [S_dnladder]: 0xfa,
    [S_altar]: 0xfb, [S_fountain]: 0xfb, [S_pool]: 0xe0, [S_ice]: 0xfe,
    [S_lava]: 0xe0,
});

/** C: dat/symbols IBMgraphics wall cmap bytes (subset). */
const IBMGRAPHICS_PRIMARY = Object.freeze({
    [S_vwall]: 0xb3, [S_hwall]: 0xc4, [S_tlcorn]: 0xda, [S_trcorn]: 0xbf,
    [S_blcorn]: 0xc0, [S_brcorn]: 0xd9, [S_crwall]: 0xcc,
    [S_tuwall]: 0xc9, [S_tdwall]: 0xcb, [S_tlwall]: 0xcb, [S_trwall]: 0xcc,
});

const SYMSSET_PRIMARY_OVERRIDES = {
    DECgraphics: DECGRAPHICS_PRIMARY,
    IBMgraphics: IBMGRAPHICS_PRIMARY,
    curses: DECGRAPHICS_PRIMARY,
};

function initPrimarySymbolsLikeC() {
    gp.primary_syms = new Array(SYM_MAX).fill(0);
    gs.showsyms = new Array(SYM_MAX).fill(0);
}

function applySymsetOverridesLikeC(name) {
    const tab = SYMSSET_PRIMARY_OVERRIDES[name];
    if (!tab || !gp.primary_syms) return;
    for (const [idx, byte] of Object.entries(tab)) {
        gp.primary_syms[idx | 0] = byte | 0;
    }
}

/**
 * C: symbols.c sym_val DEC byte → tty alternate-font character for render_map_row.
 * @param {number} byte
 * @returns {string|null}
 */
export function decSymByteToTtyCh(byte) {
    return DEC_SYM_BYTE_TO_TTY[byte | 0] ?? null;
}

/**
 * C: display.c show_glyph — primary symset cmap entry → map_glyphinfo char.
 * @param {number} sIdx — defsym.h cmap index (e.g. S_room)
 * @param {boolean} rogueIbm — rogue D:1 IBM wire for non-DEC handlers
 * @returns {{ ch: string, color: number, dec: boolean }|null}
 */
export function cmapSymGlyphFromShowsymsLikeC(sIdx, rogueIbm) {
    const sym = gs.showsyms?.[sIdx | 0] | 0;
    if (!sym) return null;
    const handling = gs.symset[PRIMARYSET]?.handling | 0;
    if (handling === H_DEC) {
        const ch = decSymByteToTtyCh(sym);
        if (!ch) return null;
        return { ch, color: NO_COLOR, dec: true };
    }
    if (handling === H_IBM && rogueIbm) {
        const ch = String.fromCharCode(sym & 0xff);
        return { ch, color: NO_COLOR, dec: false };
    }
    return null;
}

/** C: symbols.c switch_symbols(nondefault) — copy primary_syms → showsyms. */
export function switchSymbolsPrimaryLikeC(nondefault) {
    if (nondefault && gp.primary_syms) {
        gs.showsyms = gp.primary_syms.slice();
        return;
    }
    initPrimarySymbolsLikeC();
}

/** C: symbols.c read_sym_file(PRIMARYSET) for known symset names (no dat/symbols I/O). */
export function readSymFilePrimaryLikeC(name) {
    if (!name) return false;
    initPrimarySymbolsLikeC();
    if (!SYMSSET_PRIMARY_OVERRIDES[name]) return false;
    applySymsetOverridesLikeC(name);
    switchSymbolsPrimaryLikeC(true);
    return true;
}
