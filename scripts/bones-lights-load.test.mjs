import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: restore.c getlev `:1145` restore_light_sources ghostly +
// `:1300` relink_light_sources(ghostly). scen-chain-Ranger-49950026 seg4
// loads the Dlvl-1 bones whose blob carries the previous life's lamp
// light (LS_OBJECT range 3 at map (57,6)); C temp-lights the two
// corridor cells just outside the open doors, map (55,7) and (58,9),
// so step 0 shows `#` there. JS dropped the blob's lights on the bones
// path (getlev_bones named omission), leaving both cells blank (queue
// row `allmain.c` welcome, region-heuristic owner).
const ID = "scen-chain-Ranger-49950026";
const SEG4_MOVES = 4; // 'Y   ' dismisses the 4 stacked Mores; screens[0] is step 0

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

function stripAnsi(s) {
    return String(s)
        .replace(/\u001b\[[0-9;]*[A-Za-z]/g, "")
        .replace(/[\u000e\u000f]/g, "");
}

describe("bones load installs RANGE_LEVEL lights (restore.c getlev ghostly)", () => {
    it(`${ID}: seg4 step 0 shows the lamp-lit corridor cells like recorded C`, { timeout: 300000 }, async () => {
        const sess = JSON.parse(readFileSync(
            new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
        ));
        const storage = sharedStorage();
        let seg4screens = [];
        for (let si = 0; si < sess.segments.length; si++) {
            const seg = sess.segments[si];
            const moves = si < 4 ? seg.moves : seg.moves.slice(0, SEG4_MOVES);
            const g = await runSegment({
                seed: seg.seed, datetime: seg.datetime,
                nethackrc: seg.nethackrc, moves, storage,
            });
            if (si === 4) seg4screens = g.getScreens?.() || [];
        }
        assert.equal(seg4screens.length, SEG4_MOVES + 1, "seg4 replay reaches step 4");
        const first = String(seg4screens[0]);
        // Recorded-C oracle content (JS screen encoding: literal UTF-8
        // where C emits SO/SI escapes): `#` at map (55,7) opens row 8,
        // `#` at map (58,9) is all of row 10.
        assert.equal(stripAnsi(first.split("\n")[8]), "#·· ·······[···│", "map (55,7) must show the lamp-lit corridor");
        assert.equal(stripAnsi(first.split("\n")[10]), "#", "map (58,9) must show the lamp-lit corridor");
    });
});
