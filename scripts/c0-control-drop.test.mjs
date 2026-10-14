import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");
const NS = await import("../js/gstate.js");

// C ref: wintty.c g_putch `:3745–3790` emits showsyms bytes raw (IBM arm
// putchar(ch)); C0 bytes paint nothing visible (real terminals ignore
// C0; nomux shadow drops ch < 32, patch 006 termcap.c nomux_putch), so
// the capture keeps the stale cell. D-3962: RogueEpyx S_human 0x01 /
// S_coin 0x0f must leave floor/stairs on the grid (not ' '), while the
// gbuf layer keeps the raw byte (C-exact show_glyph store).
const SESS = JSON.parse(readFileSync(
    new URL("../.cache/hidden/sessions/scen-symset-Caveman-50059032.session.json", import.meta.url),
));

function sharedStorage() {
    const mem = new Map();
    return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

describe("C0 control-byte emit (D-3962)", () => {
    it("gold/hero cells keep stale grid content, raw byte in gbuf", { timeout: 120000 }, async () => {
        const seg = SESS.segments[0];
        await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: [...seg.moves].slice(0, 16).join(""),
            storage: sharedStorage(),
        });
        const g = NS.game;
        // Map (56,3) gold over floor: grid keeps stale floor 'z'/8.
        assert.equal(g.nhDisplay.grid[4][55].ch, "z");
        assert.equal(g.nhDisplay.grid[4][55].color, 8);
        // Map (55,5) hero over stairs: grid keeps stale stairs 'p'.
        assert.equal(g.nhDisplay.grid[6][54].ch, "p");
        // Gbuf layer holds the raw C0 bytes (C show_glyph store).
        assert.equal(g.level.at(56, 3).disp_ch, "\x0f");
        assert.equal(g.level.at(55, 5).disp_ch, "\x01");
    });
});
