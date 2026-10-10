import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { isRngCall, normalizeRng } from "./lib/fuzz-compare.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: youprop.h:55-57 Antimagic = HAntimagic || EAntimagic
// (u.uprops[ANTIMAGIC] bits only — C never reads the worn gear live) +
// nhlua.c nhl_gamestate save (setnotworn over all invent, clearing worn
// extrinsic bits, THEN snapshot u) + restore (setworn re-wear,
// re-conferring, THEN memcpy u, clobbering with the cleared snapshot).
// JS muse.js Antimagic() had a worn-cloak/gray-DSM fallback that fired
// where C reads extrinsic == 0 (D-3763 Displaced shape): scen-worldtour-
// Wizard-95204 step 297, ogre king's striking zap vs a hero whose MR
// cloak survived the step-183 "Resetting time" restore with anti-E 0 —
// C takes the mbhitm rnd(20) gate ("The wand hits you!"), JS Boing'd.
// This test pins the step-297 hit branch and the full C RNG prefix.
const ID = "scen-worldtour-Wizard-95204";
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

describe("gamestate-clobbered MR reads uprops-only (muse.js Antimagic, D-3790)", () => {
    it(`${ID}: step-297 striking hit + full C RNG prefix`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const steps = seg.steps || [];
        // Filtered C RNG log, flattened (same filter/order as hidden-worker).
        const cRng = [];
        const stepStart = [];
        for (const st of steps) {
            stepStart.push(cRng.length);
            for (const e of (st.rng || []).filter(isRngCall)) cRng.push(normalizeRng(e));
        }
        assert.equal(steps.length, 573, `expected 573 C steps`);
        // C-side pins: step 297 opens with the air-turbulence draw and its
        // 4th draw is the mbhitm hits_you gate, or the recording changed
        // shape and this test is vacuous.
        assert.equal(cRng[stepStart[297]], "rn2(4)=0",
            `C step-297 first draw moved: ${cRng[stepStart[297]]}`);
        assert.equal(cRng[stepStart[297] + 3], "rnd(20)=7",
            `C step-297 gate draw moved: ${cRng[stepStart[297] + 3]}`);
        assert.match(String(steps[297].screen || ""), /The wand hits you!/,
            `C step-297 is not the striking hit`);

        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const jsRng = (g.getRngLog?.() || []).map(stripIdx)
            .filter(isRngCall).map(normalizeRng);
        const screens = (g.getScreens?.() || []).map(String);
        assert.ok(screens.length >= 298,
            `session truncated: ${screens.length} screens < 298 steps`);
        assert.match(screens[297] || "", /The wand hits you!/,
            `step 297 is not the striking hit: ${JSON.stringify((screens[297] || "").slice(0, 90))}`);
        assert.doesNotMatch(screens[297] || "", /Boing!/,
            `step 297 still takes the Antimagic branch`);
        assert.equal(jsRng[stepStart[297] + 3], "rnd(20)=7",
            `step-297 gate draw is not C's: ${jsRng[stepStart[297] + 3]}`);
        for (let i = 0; i <= stepStart[297] + 3; i++) {
            if (jsRng[i] !== cRng[i]) {
                assert.fail(`RNG diverges at ${i}: C ${cRng[i]} vs JS ${jsRng[i]}`);
            }
        }
    });
});
