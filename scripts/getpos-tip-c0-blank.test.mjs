import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");
const NS = await import("../js/gstate.js");

// C ref: wintty.c erase_menu_or_text corner arm `:982–984` → docorner
// `:3650–3715`, which cl_ends every row from offx BEFORE row_refresh
// reprints retained gbuf. A C0 door cell (AmigaFont S_vodoor 0x91 →
// 0x11, S_vcdoor 0x93 → 0x13 after the `:3757` meta-strip; nomux drops
// ch < 32, patch 006) is blanked and never rewritten, so C shows ' '.
// The getpos-tip corner dismiss must take that path: a bare resync
// reprint skips the dropped cell and keeps overlay residue (D-3962
// Must-fix: 6 AmigaFont getpos/dotravel FAILs).
function load(id) {
    return JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${id}.session.json`, import.meta.url)));
}

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

describe("getpos tip dismiss blanks C0 door cells (D-3962 Must-fix)", () => {
    it("open door 0x11 keeps no tip residue (Tourist-50255028 s4)", { timeout: 120000 }, async () => {
        const seg = load("scen-symset-Tourist-50255028").segments[0];
        await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: [...seg.moves].slice(0, 4).join(""),
            storage: sharedStorage(),
        });
        const g = NS.game;
        // Map (50,3): grid blank like C (was: tip 'l' residue).
        assert.equal(g.nhDisplay.grid[4][49].ch, " ");
        // Gbuf layer keeps the raw C0 byte (D-3962 intact).
        assert.equal(g.level.at(50, 3).disp_ch, "\x11");
    });

    it("closed door 0x13 keeps no tip residue (Priest-50155027 s77)", { timeout: 180000 }, async () => {
        const seg = load("scen-symset-Priest-50155027").segments[0];
        await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: [...seg.moves].slice(0, 77).join(""),
            storage: sharedStorage(),
        });
        const g = NS.game;
        // Map (48,3): grid blank like C (was: tip 'a' residue).
        assert.equal(g.nhDisplay.grid[4][47].ch, " ");
        assert.equal(g.level.at(48, 3).disp_ch, "\x13");
    });
});
