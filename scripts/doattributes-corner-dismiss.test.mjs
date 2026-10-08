import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: wintty.c erase_menu_or_text `:966–984` — corner menu destroy
// (offx≠0, clearscreen=FALSE) is docorner(offx, maxrow+1, 0): a gbuf
// reprint with 0 display draws, never docrt(). The enlightenment
// attributes menu (23 items, offx=11) dismissed with an unconditional
// docrt() that burned 6 display draws and desynced the moveloop-end
// Hallucination arm, so substitute glyphs differed (`=`/`%` vs `[`).
// This test replays that segment and pins C's step-227 row 5.
const ID = "scen-wish-Rogue-92037";
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

describe("doattributes corner dismiss via docorner (wintty.c:982-984)", () => {
    it(`${ID}: step-227 row 5 matches C (=/% substitute glyphs)`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length >= 228, `screens ${screens.length} < 228`);
        assert.equal(
            rowText(screens, 227, 5),
            "           │·····=··%····│",
        );
    });
});
