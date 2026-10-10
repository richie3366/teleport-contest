import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { isRngCall, normalizeRng } from "./lib/fuzz-compare.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: polyself.c polyself `:490-494` (shudder arm: rn2(20) gate,
// losehp(rnd(30)) `:492`, exercise(A_CON, FALSE) `:493`) + hack.c losehp
// `:4275-4276` (mh<1 while Upolyd rehumanizes SYNCHRONOUSLY inside
// losehp, clearing umonnum before the caller continues).
// JS losehp defers the revert (`_losehp_needs_rehumanize`, drained by
// `finish_losehp_rehumanize`), and the shudder arm never drained it
// before the `:493` exercise — so exercise read stale Upolyd, returned
// without drawing, and the revert message printed late:
// scen-sweep-Healer-95346 step 474: C `rn2(2)=0 @ exercise` vs JS
// `rn2(3)=1 @ mhitm_knockback` (D-3776 temp trace `11679:upolyd`).
// This test pins the divergent draw index on both sides.
const ID = "scen-sweep-Healer-95346";
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

describe("polyself shudder drains losehp rehumanize before exercise (95346)", () => {
    it(`${ID}: step-474 rn2(2) + matched C RNG prefix`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const steps = seg.steps || [];
        // Filtered C RNG log, flattened (same filter/order as hidden-worker).
        const cRng = [];
        const stepStart = [];
        for (const st of steps) {
            stepStart.push(cRng.length);
            for (const e of (st.rng || []).filter(isRngCall)) cRng.push(normalizeRng(e));
        }
        assert.ok(steps.length > 474, `expected >474 C steps, got ${steps.length}`);
        // Divergent draw index: flat index of the step-474 exercise draw
        // (prevEntry rnd(30)=10 matched; the worker's rngM counts
        // segments differently, so this flat index is pinned here, not
        // imported). C-side pin below guards recording-shape change: if
        // it fails the test is vacuous.
        const divIdx = 11679;
        assert.ok(cRng.length > divIdx, `C RNG log short: ${cRng.length}`);
        assert.equal(cRng[divIdx - 1], "rnd(30)=10",
            `C shudder losehp draw moved: ${cRng[divIdx - 1]}`);
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
        assert.ok(screens.length > 474,
            `session truncated: ${screens.length} screens`);
        assert.ok((screens[474] || "").includes("You shudder for a moment")
            && (screens[474] || "").includes("You return to gnomish form!"),
            `step 474 is not the shudder-revert: ${JSON.stringify((screens[474] || "").slice(0, 120))}`);
        // Matched prefix must be intact (no earlier breakage).
        for (let i = 0; i < divIdx; i++) {
            if (jsRng[i] !== cRng[i]) {
                assert.fail(`RNG diverges early at ${i}: C ${cRng[i]} vs JS ${jsRng[i]}`);
            }
        }
        assert.equal(jsRng[divIdx], "rn2(2)=0",
            `step-474 draw is not the A_CON exercise: ${jsRng[divIdx]}`);
    });
});
