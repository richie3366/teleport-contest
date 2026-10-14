// do_screen_description live showsyms: the looked path reads C's gs.showsyms
// (rogue set + loaded symsets + option overrides) instead of Primary/DEC
// house tables. Covers the cliffs-head pager.c writer: rogue-level stairs
// painted '%' (sweep-Healer-49956018 step 750) and RogueWindows stairs
// painted 'p' (Ranger-50059078 step 235) listed the wrong stair group.
import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { game } from "../js/gstate.js";
import {
    init_symbols, assign_graphics, symset_slot, live_showsyms,
    cmap_to_glyph, SYM_OFF_O, SYM_OFF_X, MAXMCLASSES,
} from "../js/display.js";
import { read_sym_file } from "../js/options.js";
import { do_screen_description } from "../js/pager.js";
import {
    PRIMARYSET, ROGUESET,
    S_upstair, S_dnstair, S_upladder, S_brupstair, S_brdnstair,
    S_vwall, S_hwall, S_ndoor, S_room, S_pool,
    SYM_NOTHING, SYM_INVISIBLE,
} from "../js/const.js";
import { MAXOCLASSES } from "../js/generated/objects_data.js";
import { DEF_MONSYM_MLET } from "../js/mondata.js";

// C hack.h: SYM_OFF_M = SYM_OFF_O + MAXOCLASSES, SYM_OFF_W = SYM_OFF_M +
// MAXMCLASSES (display.js keeps M/W file-local; derive per C here so the
// pins stay independent of that file's const visibility).
const SYM_OFF_M = SYM_OFF_O + MAXOCLASSES;
const SYM_OFF_W = SYM_OFF_M + MAXMCLASSES;
// C defsym.h MONSYM(53, '@', HUMAN, S_HUMAN): the JS list is C-aligned
// ([0] is null, [1] is S_ANT), so the index IS the C mlet.
const S_HUMAN_MLET = DEF_MONSYM_MLET.indexOf("S_HUMAN");

function freshState() {
    game.gs = null;
    game.gc = {};
    game.go = {};
    game.iflags = {};
    game.flags = {};
    game.u = { ux: 5, uy: 5, uz: { dnum: 0, dlevel: 5 } };
    game.head_engr = null;
    game.rogue_level = null;
    game.currentgraphics = PRIMARYSET;
    init_symbols();
}

function loadSet(whichSet, name) {
    symset_slot(whichSet).name = name;
    return read_sym_file(whichSet);
}

function mockLevelForGlyph(glyph, dispCh) {
    game.level = {
        at: () => ({ disp_glyph: glyph, disp_ch: dispCh, seenv: 1 }),
    };
}

function describeAt(x, y) {
    const out = { s: "" };
    const first = { v: null };
    const found = do_screen_description({ x, y }, true, 0, out, first, null);
    return { out: out.s, first: first.v, found };
}

describe("do_screen_description live showsyms (rogue/symset table)", () => {
    beforeEach(() => {
        freshState();
    });

    it("S_HUMAN mlet is C 53 (list index is the C mlet)", () => {
        assert.equal(S_HUMAN_MLET, 53);
        assert.equal(DEF_MONSYM_MLET[1], "S_ANT");
    });

    it("rogue-level stairs list up+down (sweep-Healer-49956018 step 750)", () => {
        // No symset: C gr.rogue_syms default (init_rogue_symbols :196-198).
        assign_graphics(ROGUESET);
        mockLevelForGlyph(cmap_to_glyph(S_upstair), "%");
        const got = describeAt(10, 10);
        assert.equal(got.out, "%        a staircase up or a staircase down (staircase up)");
        assert.equal(got.first, "staircase up");
        assert.equal(got.found, 1);
    });

    it("RogueWindows stairs list all four (Ranger-50059078 step 235)", () => {
        assert.equal(loadSet(ROGUESET, "RogueWindows"), 1);
        assign_graphics(ROGUESET);
        mockLevelForGlyph(cmap_to_glyph(S_dnstair), "p");
        const got = describeAt(10, 10);
        assert.equal(
            got.out,
            "p        a staircase up or a staircase down or a branch staircase up or a branch staircase down (staircase down)",
        );
        assert.equal(got.first, "staircase down");
        assert.equal(got.found, 1);
    });

    it("DEC wall description unchanged (fortress pin)", () => {
        assert.equal(loadSet(PRIMARYSET, "DECgraphics"), 1);
        game.iflags.decgraphics = true; // real DEC sessions set this
        mockLevelForGlyph(cmap_to_glyph(S_vwall), "x");
        const got = describeAt(10, 10);
        assert.equal(got.out, "x        the interior of a monster or a wall (wall)");
        assert.equal(got.found, 1);
    });

    it("DEC slots equal the Primary/DEC table (carrier parity)", () => {
        assert.equal(loadSet(PRIMARYSET, "DECgraphics"), 1);
        // dat/symbols DECGraphics block overlaid on Primary defaults.
        assert.equal(live_showsyms(S_vwall), 0xf8);
        assert.equal(live_showsyms(S_hwall), 0xf1);
        assert.equal(live_showsyms(S_room), 0xfe);
        assert.equal(live_showsyms(S_pool), 0xe0);
        assert.equal(live_showsyms(S_upstair), 0x3c); // no S_upstair line
        assert.equal(live_showsyms(S_dnstair), 0x3e); // no S_dnstair line
        assert.equal(live_showsyms(1 + SYM_OFF_M), 0x61); // S_ANT 'a'
        assert.equal(live_showsyms(S_HUMAN_MLET + SYM_OFF_M), 0x40);
        assert.equal(live_showsyms(7 + SYM_OFF_O), 0x25); // FOOD '%'
        assert.equal(live_showsyms(14 + SYM_OFF_O), 0x60); // ROCK '`'
        assert.equal(live_showsyms(1 + SYM_OFF_W), 0x31); // warn '1'
        assert.equal(live_showsyms(SYM_NOTHING + SYM_OFF_X), 0x20);
        assert.equal(live_showsyms(SYM_INVISIBLE + SYM_OFF_X), 0x49);
    });

    it("rogue-default slots match C init_rogue_symbols + def_r_oc_syms", () => {
        assign_graphics(ROGUESET);
        assert.equal(live_showsyms(S_upstair), 0x25); // '%'
        assert.equal(live_showsyms(S_dnstair), 0x25); // '%'
        assert.equal(live_showsyms(S_upladder), 0x3c); // unmapped '<'
        assert.equal(live_showsyms(S_ndoor), 0x2b); // '+' override
        assert.equal(live_showsyms(3 + SYM_OFF_O), 0x5d); // armor ']'
        assert.equal(live_showsyms(5 + SYM_OFF_O), 0x2c); // amulet ','
        assert.equal(live_showsyms(7 + SYM_OFF_O), 0x3a); // food ':'
        assert.equal(live_showsyms(12 + SYM_OFF_O), 0x2a); // gold '*'
        assert.equal(live_showsyms(1 + SYM_OFF_M), 0x61); // S_ANT 'a'
        assert.equal(live_showsyms(S_HUMAN_MLET + SYM_OFF_M), 0x40);
    });

    it("RogueWindows rogue slots map stairs+room, leave ladders", () => {
        assert.equal(loadSet(ROGUESET, "RogueWindows"), 1);
        assign_graphics(ROGUESET);
        assert.equal(live_showsyms(S_upstair), 0xf0);
        assert.equal(live_showsyms(S_dnstair), 0xf0);
        assert.equal(live_showsyms(S_brupstair), 0xf0);
        assert.equal(live_showsyms(S_brdnstair), 0xf0);
        assert.equal(live_showsyms(S_room), 0xfa);
        assert.equal(live_showsyms(S_upladder), 0x3c); // no S_upladder line
        assert.equal(live_showsyms(S_HUMAN_MLET + SYM_OFF_M), 0x40);
    });
});
