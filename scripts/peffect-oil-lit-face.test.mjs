import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: potion.c peffect_oil `:1260-1294` (lit oil quaffed by a
// non-fire-liker → You("burn your %s.", body_part(FACE)) + d(2|4,4)
// fire damage + burn_away_slime; FACE = hack.h bodypart_types 2).
// JS read bare `FACE` with no import/binding, so every lit-oil quaff
// threw `ReferenceError: FACE is not defined` and voided the run:
// scen-sweep-Wizard-51150073 died at seg0 with rngM/scrM 0 (board
// misattributed it to `randomize_gem_colors` step 0). This test pins
// the burn message and session completion.
const ID = "scen-sweep-Wizard-51150073";
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

describe("lit-oil quaff burns body_part(FACE) (peffect_oil)", () => {
    it(`${ID}: 989 burn message + session completes`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = (g.getScreens?.() || []).map(String);
        assert.ok(screens.length >= 1190,
            `session truncated: ${screens.length} screens < 1190 steps`);
        assert.ok(screens[989].includes("You burn your face."),
            `step 989 is not the lit-oil burn: ${JSON.stringify((screens[989] || "").slice(0, 90))}`);
    });
});
