import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

const { runSegment } = await import("../js/jsmain.js");
const NS = await import("../js/gstate.js");

// can_reach_floor's ustuck-hugs arm (C engrave.c:192-197, read at
// display.c feel_location :777) must hold in the display.js cycle-avoidance
// inline feel_can_reach_floor, which mirrors the canonical engrave.js
// can_reach_floor. scen-worldtour-Valkyrie-587104 step 370: blind hero
// hug-held (u.ustuck, holder attacks include AT_HUGS) in pool water,
// hero form (Valkyrie) does not stick. C takes the Levitation Rules
// (:777-858): POOL cells with stone memory hit do_room_glyph with
// !waslit, so memory stays stone-blank. The inline omitted the arm, took
// the reachable arm (:859+ map_location), and painted live water.
// Machine-recorded C rows (session step 370): row 11 `\x1b[17CI I`,
// row 12 `\x1b[17CI@`, row 13 `\x1b[17CI`. Pre-fix JS painted row 11
// `I~I` and row 13 `I~` (decoded `I·I` / `I·`).
describe("can_reach_floor ustuck-hugs arm in feel inline (engrave.c:192-197)", () => {
    it("worldtour-Valkyrie-587104 step 370 keeps stone-blank water while hug-held", { timeout: 280000 }, async () => {
        const sess = JSON.parse(readFileSync(
            new URL("../.cache/hidden/sessions/scen-worldtour-Valkyrie-587104.session.json", import.meta.url),
        ));
        const seg = sess.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, 370),
            storage: undefined,
        });
        const screens = g.getScreens?.() || [];
        assert.ok(screens.length === 371, `expected 371 screens, got ${screens.length}`);
        const grid = decodeScreen(screens[screens.length - 1]);
        const row = (r) => grid[r].map((c) => c.ch).join("").replace(/\s+$/, "");
        assert.equal(row(0), "You feel an unseen monster!  It suddenly arrives next to you!--More--");
        assert.equal(row(11), "                 I I");
        assert.equal(row(12), "                 I@");
        assert.equal(row(13), "                 I");
        // Mechanism pins: blind + hug-held + non-sticky hero form.
        const game = NS.game;
        assert.equal(game.u.Blind, true, "hero blind at step 370");
        assert.ok(game.u.ustuck, "hero hug-held (u.ustuck set)");
        const attks = game.u.ustuck.data?.mattk || [];
        assert.ok(attks.some((a) => (a.aatyp | 0) === 7), "holder attacks include AT_HUGS");
        assert.match(row(23), /Blind/, "hero still blind on the status line");
    });
});
