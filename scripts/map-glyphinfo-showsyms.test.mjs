import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

const disp = await import("../js/display.js");
const { game } = await import("../js/gstate.js");
const { S_pool, S_fountain, MALE, PRIMARYSET, ROGUESET } = await import("../js/const.js");
const { monsterNames } = await import("../js/generated/monsters_data.js");

// C ref: display.c map_glyphinfo `:2653` — ttychar = gs.showsyms[symidx].
// JS encodes the symset side of showsyms in its hardcoded paint tables
// (DEC via use_decgraphics, ASCII defaults) and reads only the ov side
// (SYMBOLS/ROGUESYMBOLS overrides) at `:2653`. Probe:
// scen-special-Caveman-94257 carries SYMBOLS=S_pool:~,S_fountain:{ and C
// paints pool cells '~' (plain) where JS painted the DEC '`' — the ov
// tables were populated (parsesymbols/switch_symbols live) but no paint
// path consulted them. mlet_symidx is pinned too: C mlet is the MONSYM
// number (defsym.h MONSYM(1,'a',ANT,S_ANT)), so the M slot is positional
// (LOADSYMS [4,124,S_ANT]), not letter-code-based.

const ANT = monsterNames.indexOf("PM_GIANT_ANT");
assert.ok(ANT !== -1, "giant ant monnum resolves");
const M_ANT = 124; // LOADSYMS [4,124,"S_ANT"], S_ANT = 1 + SYM_OFF_M 123

let saved;
beforeEach(() => {
    saved = {
        go: game.go, u: game.u, sysopt: game.sysopt,
        currentgraphics: game.currentgraphics,
    };
    game.u = { ux: 5, uy: 5 };
    game.sysopt = { accessibility: 0 };
    game.currentgraphics = PRIMARYSET;
    game.go = undefined; // update_ov_* lazily zero-fill
});
afterEach(() => {
    game.go = saved.go;
    game.u = saved.u;
    game.sysopt = saved.sysopt;
    game.currentgraphics = saved.currentgraphics;
});

function baseFor(glyph, ch, dec) {
    return { ch, color: 0, dec, glyph };
}

describe("map_glyphinfo :2653 showsyms-ov read", () => {
    it("SYMBOLS pool override wins over the DEC backtick", () => {
        disp.update_ov_primary_symset(S_pool, "~");
        const gid = disp.cmap_to_glyph(S_pool);
        const out = disp.map_glyphinfo(10, 10,
            baseFor(gid, "`", true), disp.MG_FLAG_NORMAL);
        assert.equal(out.ch, "~");
        assert.equal(out.dec, false);
    });

    it("no override keeps the base paint", () => {
        const gid = disp.cmap_to_glyph(S_pool);
        const out = disp.map_glyphinfo(10, 10,
            baseFor(gid, "`", true), disp.MG_FLAG_NORMAL);
        assert.equal(out.ch, "`");
        assert.equal(out.dec, true);
    });

    it("fountain override applies (no-op value)", () => {
        disp.update_ov_primary_symset(S_fountain, "{");
        const gid = disp.cmap_to_glyph(S_fountain);
        const out = disp.map_glyphinfo(10, 10,
            baseFor(gid, "{", false), disp.MG_FLAG_NORMAL);
        assert.equal(out.ch, "{");
        assert.equal(out.dec, false);
    });

    it("high-bit override is a DEC-charset request (wintty strip rule)", () => {
        disp.update_ov_primary_symset(S_pool, 0xFE);
        const gid = disp.cmap_to_glyph(S_pool);
        const out = disp.map_glyphinfo(10, 10,
            baseFor(gid, "`", true), disp.MG_FLAG_NORMAL);
        assert.equal(out.ch, "~");
        assert.equal(out.dec, true);
    });

    it("rogue set reads the rogue table, not primary", () => {
        game.currentgraphics = ROGUESET;
        const gid = disp.cmap_to_glyph(S_pool);
        disp.update_ov_primary_symset(S_pool, "Q");
        let out = disp.map_glyphinfo(10, 10,
            baseFor(gid, "}", false), disp.MG_FLAG_NORMAL);
        assert.equal(out.ch, "}");
        disp.update_ov_rogue_symset(S_pool, "P");
        out = disp.map_glyphinfo(10, 10,
            baseFor(gid, "}", false), disp.MG_FLAG_NORMAL);
        assert.equal(out.ch, "P");
    });

    it("monster slots are positional (mlet_symidx)", () => {
        const gid = disp.monnum_to_glyph(ANT, MALE).glyph;
        assert.equal(disp.glyphmap_symidx(gid), M_ANT);
        disp.update_ov_primary_symset(M_ANT, "X");
        const out = disp.map_glyphinfo(10, 10,
            baseFor(gid, "a", false), disp.MG_FLAG_NORMAL);
        assert.equal(out.ch, "X");
    });

    it("pet NOOVERRIDE falls back to the plain letter", () => {
        game.sysopt = { accessibility: 1 };
        const gid = disp.petnum_to_glyph(ANT, MALE).glyph;
        const out = disp.map_glyphinfo(10, 10,
            baseFor(gid, "?", false), disp.MG_FLAG_NOOVERRIDE);
        assert.equal(out.ch, "a");
    });

    it("pet NOOVERRIDE takes the M override when set", () => {
        game.sysopt = { accessibility: 1 };
        disp.update_ov_primary_symset(M_ANT, "X");
        const gid = disp.petnum_to_glyph(ANT, MALE).glyph;
        const out = disp.map_glyphinfo(10, 10,
            baseFor(gid, "?", false), disp.MG_FLAG_NOOVERRIDE);
        assert.equal(out.ch, "X");
    });
});
