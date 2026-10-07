import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { isRngCall, normalizeRng } from "./lib/fuzz-compare.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: spell.c study_book `:506-510` (blank paper → makeknown) +
// hack.h:1530 (makeknown = discover_object(x, TRUE, TRUE, TRUE)) +
// o_init.c discover_object `:478-483` (credit_hero → exercise(A_WIS, TRUE)
// when newly naming the type). JS called discover_object(booktype, true,
// true) — credit_hero defaulted false — so reading a blank spellbook drew
// no rn2(19): scen-terrain-Monk-94160 diverged at step 97 with C
// `rn2(19)=3 @ exercise` vs JS `rn2(12)=10 @ mcalcmove` (D-3609).
// This test pins the step-97 exercise draw and the full C RNG prefix.
const ID = "scen-terrain-Monk-94160";
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

const stripIdx = (e) => String(e).replace(/^\d+\s+/, "");

describe("blank spellbook credits WIS exercise (study_book makeknown, D-3609)", () => {
    it(`${ID}: step-97 rn2(19) + full C RNG prefix`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const steps = seg.steps || [];
        // Filtered C RNG log, flattened (same filter/order as hidden-worker).
        const cRng = [];
        const stepStart = [];
        for (const st of steps) {
            stepStart.push(cRng.length);
            for (const e of (st.rng || []).filter(isRngCall)) cRng.push(normalizeRng(e));
        }
        assert.equal(steps.length, 157, `expected 157 C steps`);
        // C-side pin: step 97 must open with the WIS-exercise draw, or the
        // recording changed shape and this test is vacuous.
        assert.equal(cRng[stepStart[97]], "rn2(19)=3",
            `C step-97 first draw moved: ${cRng[stepStart[97]]}`);

        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const jsRng = (g.getRngLog?.() || []).map(stripIdx)
            .filter(isRngCall).map(normalizeRng);
        const screens = (g.getScreens?.() || []).map(String);
        assert.ok(screens.length >= 157,
            `session truncated: ${screens.length} screens < 157 steps`);
        assert.ok((screens[97] || "").includes("This spellbook is all blank."),
            `step 97 is not the blank-book read: ${JSON.stringify((screens[97] || "").slice(0, 90))}`);
        assert.equal(jsRng[stepStart[97]], "rn2(19)=3",
            `step-97 first draw is not the WIS exercise: ${jsRng[stepStart[97]]}`);
        assert.ok(jsRng.length >= cRng.length,
            `JS RNG log short: ${jsRng.length} < ${cRng.length}`);
        for (let i = 0; i < cRng.length; i++) {
            if (jsRng[i] !== cRng[i]) {
                assert.fail(`RNG diverges at ${i}: C ${cRng[i]} vs JS ${jsRng[i]}`);
            }
        }
    });
});
