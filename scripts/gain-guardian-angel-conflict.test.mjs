import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: minion.c gain_guardian_angel `:497-565` — `Conflict` is the
// youprop.h:218 macro (HConflict || EConflict over u.uprops[CONFLICT]).
// The scen-worldtour-Wizard-50350024 hero wears a ring of conflict
// (uright, W_RINGR extrinsic in uprops[44]); C takes the Conflict arm
// («A voice booms:» + hostile angels). JS read the dead flats
// (u.HConflict/u.EConflict, no ring writer) and printed nothing.
// This test pins C's step-834 Astral-arrival topline and JS's match.
const ID = "scen-worldtour-Wizard-50350024";
const STEP = 834;
const ROW = "You sense alarm, hostility, and excitement in the air!  A voice booms:--More--";

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

describe("gain_guardian_angel reads canonical Conflict incl. worn ring (D-4072)", () => {
    it(`${ID}: step-${STEP} topline is C's booms line`, { timeout: 300000 }, async () => {
        const sess = JSON.parse(readFileSync(
            new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
        ));
        const seg = sess.segments[0];
        const steps = seg.steps || [];
        // C-side pin: the recording really is the Conflict-arm arrival,
        // or this test is vacuous.
        const cRow0 = String(steps[STEP].screen || "").split("\n")[0];
        assert.equal(cRow0, ROW,
            `C step-${STEP} row 0 moved: ${JSON.stringify(cRow0)}`);

        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = (g.getScreens?.() || []).map(String);
        assert.ok(screens.length > STEP,
            `session truncated: ${screens.length} screens <= ${STEP}`);
        assert.equal(screens[STEP].split("\n")[0], ROW,
            `step ${STEP} row 0 is not C's: ${JSON.stringify(screens[STEP].split("\n")[0])}`);
    });
});
