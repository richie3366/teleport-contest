import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { isRngCall, normalizeRng } from "./lib/fuzz-compare.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: muse.c mbhitm `:1625-1626` (losehp falls through to learnit on
// survive) + `:1647-1649` (learnit && zap_oseen → makeknown(WAN_STRIKING))
// + hack.h:1530 (makeknown = discover_object(x, TRUE, TRUE, TRUE)) +
// o_init.c discover_object `:482-483` (credit_hero → exercise(A_WIS, TRUE)
// when newly naming the type). JS mbhitm returned unconditionally after
// finish_losehp_done(), so a life-saved striking zap skipped learnit,
// stop_occupation/nomul and the makeknown WIS credit: no rn2(19) while C
// drew one (same shape as thitu, mthrowu.js, D-3426).
// scen-sweep-Barbarian-95328 diverged at step 170 with C `rn2(19)=11 @
// exercise` vs JS `rn2(100)=85 @ obj_resists` (Medusa's striking zap kills
// the hero; wizard "Die?" decline; the resumed turn opens with the WIS
// credit). This test pins the step-170 exercise draw and the full C RNG
// prefix.
const ID = "scen-sweep-Barbarian-95328";
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

describe("lifesaved striking zap credits WIS exercise (mbhitm makeknown, D-3776)", () => {
    it(`${ID}: step-170 rn2(19) + full C RNG prefix`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const steps = seg.steps || [];
        // Filtered C RNG log, flattened (same filter/order as hidden-worker).
        const cRng = [];
        const stepStart = [];
        for (const st of steps) {
            stepStart.push(cRng.length);
            for (const e of (st.rng || []).filter(isRngCall)) cRng.push(normalizeRng(e));
        }
        assert.equal(steps.length, 291, `expected 291 C steps`);
        // C-side pin: step 170 must open with the WIS-exercise draw, or the
        // recording changed shape and this test is vacuous.
        assert.equal(cRng[stepStart[170]], "rn2(19)=11",
            `C step-170 first draw moved: ${cRng[stepStart[170]]}`);

        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const jsRng = (g.getRngLog?.() || []).map(stripIdx)
            .filter(isRngCall).map(normalizeRng);
        const screens = (g.getScreens?.() || []).map(String);
        assert.ok(screens.length >= 291,
            `session truncated: ${screens.length} screens < 291 steps`);
        assert.ok((screens[170] || "").includes("You survived that attempt on your life."),
            `step 170 is not the lifesave resume: ${JSON.stringify((screens[170] || "").slice(0, 90))}`);
        assert.equal(jsRng[stepStart[170]], "rn2(19)=11",
            `step-170 first draw is not the WIS exercise: ${jsRng[stepStart[170]]}`);
        assert.ok(jsRng.length >= cRng.length,
            `JS RNG log short: ${jsRng.length} < ${cRng.length}`);
        for (let i = 0; i < cRng.length; i++) {
            if (jsRng[i] !== cRng[i]) {
                assert.fail(`RNG diverges at ${i}: C ${cRng[i]} vs JS ${jsRng[i]}`);
            }
        }
    });
});
