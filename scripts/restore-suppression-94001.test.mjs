import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C refs: restore.c dorecover `:794–795` (restoring = REST_GSTATE at entry,
// "suppress map display if some part of the code tries to update that") +
// restgamestate `:680–684` (gd.defer_see_monsters = TRUE, re-enabled at
// allmain.c:92–94 moveloop top). JS try_restore_save set restoring only at
// the late REST_CURRENT_LEVEL envelope and never set defer_see_monsters,
// so restore-time newsym/see_monsters paints drew display RNG freely and
// desynced the hallucinated monster glyphs: in scen-trap-Wizard-94001
// (2-segment save/restore, Hallu on) seg1 step 0 shows the tame kitten's
// cell as GHOST (renders space, defsym.h:358) in C but `a` in JS.
// This test replays both segments and pins C's seg1 step-0 row 16.
const ID = "scen-trap-Wizard-94001";

function freshStorage() {
    const mem = new Map();
    return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

function rowText(screens, step, r) {
    const g = decodeScreen(screens[step] || "");
    return g[r].map(renderCell).join("").trimEnd();
}

describe("restore suppression (restore.c:795 + :684, D-3662)", () => {
    it(`${ID}: seg1 step-0 row 16 matches C (GHOST space, not 'a')`, { timeout: 300000 }, async () => {
        const r = JSON.parse(readFileSync(
            new URL(`../hidden-corpus/recipes/${ID}.recipe.json`, import.meta.url),
        ));
        const storage = freshStorage();
        await runSegment({
            seed: r.segments[0].seed, datetime: r.segments[0].datetime,
            timezone: r.segments[0].timezone, nethackrc: r.segments[0].nethackrc,
            moves: r.segments[0].moves, storage,
        });
        const g1 = await runSegment({
            seed: r.segments[1].seed, datetime: r.segments[1].datetime,
            timezone: r.segments[1].timezone, nethackrc: r.segments[1].nethackrc,
            moves: r.segments[1].moves, storage,
        });
        const screens = g1.getScreens?.() || [];
        assert.ok(screens.length >= 1, `seg1 screens ${screens.length} < 1`);
        assert.ok(
            rowText(screens, 0, 0).includes("undead studio audience"),
            "seg1 step-0 topline is the Hallu audience message",
        );
        assert.equal(
            rowText(screens, 0, 16),
            "                  │·^ ·│",
        );
    });
});
