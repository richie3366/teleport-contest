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
// D-3962 omission (1): the message-row (topline) path. Healer-50255063
// step 256 ';' farlook paints putmixed "\x01        a human or elf
// (human healer called wizard)" (RogueEpyx S_human 0x01 via encglyph +
// decode_mixed showsyms). C home-overwrites without clearing (getpos
// exits with msg_given=FALSE under autodescribe, getpos.c:889-890;
// no clear_nhwindow on the path) and nomux drops the 0x01, so the
// capture keeps the stale 'U' from step 255 "Unknown direction".
const HEALER = JSON.parse(readFileSync(
    new URL("../.cache/hidden/sessions/scen-symset-Healer-50255063.session.json", import.meta.url),
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

    it("topline keeps stale cell under C0, raw byte in message", { timeout: 180000 }, async () => {
        const seg = HEALER.segments[0];
        await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: [...seg.moves].slice(0, 256).join(""),
            storage: sharedStorage(),
        });
        const g = NS.game;
        // Message store keeps the raw C byte (C putmixed/decode_mixed).
        assert.equal((g._pending_message || "")[0], "\x01");
        // Grid row 0 col 0 keeps the stale 'U' (nomux ch<32 drop); the
        // rest of the farlook line paints over the old message, tail
        // cleared (C home + overwrite + cl_end).
        let row0 = "";
        for (let c = 0; c < 52; c++) row0 += g.nhDisplay.grid[0][c].ch;
        assert.equal(row0, "U        a human or elf (human healer called wizard)");
    });
});
