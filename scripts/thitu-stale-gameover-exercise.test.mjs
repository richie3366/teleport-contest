import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { isRngCall, normalizeRng } from "./lib/fuzz-compare.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: mthrowu.c thitu `:150-151` (losehp falls through to
// exercise(A_STR, FALSE) on survive) + hack.c losehp `:4287`
// (urgent_pline + done(DIED), noreturn unless life-saved).
// JS thitu gated its post-losehp drain on the sticky
// `program_state.gameover` instead of `_losehp_needs_done`, so a death
// whose done() was still pending (an earlier turn's wizard-mode Die?
// decline resolving late) made a later NON-FATAL thitu hit return
// before the A_STR exercise C draws.
// scen-worldtour-Wizard-95225 step 544 (moves 85): gas-cloud death #11
// pends across the turn boundary (gameover stuck set, flag consumed);
// the dart-trap thitu hits a healthy human hero (uhp 75, dieroll 6)
// without killing, but JS saw stale gameover and skipped the
// exercise: C `rn2(2)=0 @ exercise` vs JS `rn2(100)=80 @ regen_hp`.
// This test pins the divergent draw index on both sides.
const ID = "scen-worldtour-Wizard-95225";
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

describe("nonfatal thitu draws A_STR exercise under stale gameover (95225)", () => {
    it(`${ID}: step-544 rn2(2) + matched C RNG prefix`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const steps = seg.steps || [];
        // Filtered C RNG log, flattened (same filter/order as hidden-worker).
        const cRng = [];
        const stepStart = [];
        for (const st of steps) {
            stepStart.push(cRng.length);
            for (const e of (st.rng || []).filter(isRngCall)) cRng.push(normalizeRng(e));
        }
        assert.ok(steps.length > 544, `expected >544 C steps, got ${steps.length}`);
        // Divergent draw index, measured pre-fix (first C-vs-JS split;
        // the worker's rngM counts segments differently, so this flat
        // index is pinned here, not imported). C-side pin below guards
        // recording-shape change: if it fails the test is vacuous.
        const divIdx = 34460;
        assert.ok(cRng.length > divIdx, `C RNG log short: ${cRng.length}`);
        assert.equal(cRng[divIdx], "rn2(2)=0",
            `C divergent draw moved: ${cRng[divIdx]}`);

        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const jsRng = (g.getRngLog?.() || []).map(stripIdx)
            .filter(isRngCall).map(normalizeRng);
        const screens = (g.getScreens?.() || []).map(String);
        assert.ok(screens.length > 544,
            `session truncated: ${screens.length} screens`);
        assert.ok((screens[544] || "").includes("You are hit")
            && (screens[544] || "").includes("You survived that attempt on your life."),
            `step 544 is not the dart-trap lifesave resume: ${JSON.stringify((screens[544] || "").slice(0, 120))}`);
        // Matched prefix must be intact (no earlier breakage).
        for (let i = 0; i < divIdx; i++) {
            if (jsRng[i] !== cRng[i]) {
                assert.fail(`RNG diverges early at ${i}: C ${cRng[i]} vs JS ${jsRng[i]}`);
            }
        }
        assert.equal(jsRng[divIdx], "rn2(2)=0",
            `step-544 draw is not the A_STR exercise: ${jsRng[divIdx]}`);
    });
});
