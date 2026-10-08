import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: mkmaze.c movebubbles `:1557` + vision.c vision_recalc `:512–850` —
// C's vision_recalc(2) runs the main update loop, repainting old-visible
// cells as memory/unseen (the not_in_sight arm: old IN_SIGHT or COULD_SEE
// xor). JS vision_recalc skips that loop for control 2 (D-0852), so
// movebubbles runs it via vision_off_newsym_gbuf before the swap.
// Without it, a vacated bubble cell leaving sight keeps its stale live
// glyph: in scen-tour-Tourist-92100 the post-drift vision_recalc(0)
// compares against the blanked array and never newsyms map (60,7), which
// C repaints water while JS left a stale air space (screen row 8 col 59).
// This test replays that segment and pins C's step-158 row 8.
const ID = "scen-tour-Tourist-92100";
const SESS = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
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

function rowText(screens, step, r) {
    const g = decodeScreen(screens[step] || "");
    return g[r].map(renderCell).join("").trimEnd();
}

describe("movebubbles vacated-cell repaint (mkmaze.c:1557)", () => {
    it(`${ID}: step-158 row 8 matches C (water at col 59)`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 159, `screens ${screens.length} < 159`);
        assert.equal(
            rowText(screens, 158, 8),
            "``````````````````````````````````````````````````````` @ `````````````````````",
        );
    });
});
