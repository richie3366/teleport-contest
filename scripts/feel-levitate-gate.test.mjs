import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");

// D-3827: feel_location's Levitation gate (C engrave.c can_reach_floor
// :198, read at display.c feel_location :777) must test the Levitation
// PROPERTY (HLevitation FROMFORM while poly'd into an eyeless floater),
// not the flat u.Levitation mirror. scen-sweep-Healer-95342 step 1197:
// blind + levitating (yellow light, FROMFORM) + rogue level + `s`
// search. C takes the Levitation Rules (:777-858): ROOM cells with
// S_stone memory hit do_room_glyph with !Is_rogue false, so memory
// stays stone-blank. JS read the never-set flat, took the reachable
// arm (:859+ map_location), and repainted live floor ('.').
// Machine-recorded C rows (session step 1197): row 9 `\x1b[9C%`,
// row 10 `\x1b[9Cy3`, row 11 blank. Pre-fix JS painted row 9 `.%.`,
// row 10 `.y3`, row 11 `..`.
describe("feel_location levitate gate (display.c:777)", () => {
    it("sweep-Healer-95342 step 1197 keeps stone-blank floors while blind+levitating", { timeout: 280000 }, async () => {
        const sess = JSON.parse(readFileSync(
            new URL("../.cache/hidden/sessions/scen-sweep-Healer-95342.session.json", import.meta.url),
        ));
        const seg = sess.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, 1197),
            storage: undefined,
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length === 1198, `expected 1198 screens, got ${screens.length}`);
        const grid = decodeScreen(screens[screens.length - 1]);
        const row = (r) => grid[r].map((c) => c.ch).join("").replace(/\s+$/, "");
        assert.equal(row(0), "You feel an unseen monster!");
        assert.equal(row(9), "         %");
        assert.equal(row(10), "         y3");
        assert.equal(row(11), "");
        assert.match(row(23), /Blind/, "hero still blind (FROMFORM past the gate fix)");
    });
});
