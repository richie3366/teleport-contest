import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: eat.c obj_nutrition `:325–332` + objects.h FOOD `nutrition`
// (enormous meatball 2000, delay 20). JS obj_nutrition fell back to the
// hand-kept FOOD_NUTRITION table, which had no meat-family entries, so the
// wished enormous meatball ate as 0-nutrition: reqtime 0, instant silent
// done_eating(FALSE) + useup, and a queued "now unencumbered" where C
// starts a 20-bite meal (scen-wish-Tourist-91125 step 162/189, owner
// lesshungry: fullwarn at eat.c:3314 + paranoid Continue eating?).
// D-3606: oc_nutrition comes from the objects extractor (ground truth);
// this test pins the 162/163 toplines and full-session completion.
const ID = "scen-wish-Tourist-91125";
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

describe("enormous-meatball meal (obj_nutrition oc_nutrition, D-3606)", () => {
    it(`${ID}: step 162 fullwarn + 163 paranoid, session completes`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const screens = (g.getScreens?.() || []).map(String);
        const row0 = (i) => JSON.stringify(screens[i].slice(0, 90));
        assert.ok(screens.length >= 189,
            `session truncated: ${screens.length} screens < 189 steps`);
        assert.ok(screens[162].includes("hard time getting all of it down"),
            `step 162 is not the lesshungry fullwarn: ${row0(162)}`);
        assert.ok(screens[163].includes("Continue eating?"),
            `step 163 is not the paranoid query: ${row0(163)}`);
    });
});
