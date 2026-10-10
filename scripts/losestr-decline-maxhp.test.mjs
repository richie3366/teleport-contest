import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { isRngCall, normalizeRng } from "./lib/fuzz-compare.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: attrib.c losestr `:244` (losehp) + `:246-254` (max-HP cut). C's
// losehp→done() blocks mid-losestr at the wizard "Die?" prompt; answering
// "n" runs savelife and losestr RESUMES at :246, cutting uhpmax by the
// below-minimum STR damage. JS returned unconditionally after
// finish_losehp_done(), skipping the cut: scen-sweep-Barbarian-95309 step
// 839 C HP:30(44) vs JS HP:104(118) (step 836 weaken drew 18×rn2(4) @
// losestr, dmg 74, max 118→44, then d(3,6)=14 hell hound bite). Same shape
// as thitu/mbhitm (D-3426/D-3776/D-3777): only a true death stops the C
// tail. This test pins C's step-839 status + weaken shape and JS's match.
const ID = "scen-sweep-Barbarian-95309";
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
const stripAnsi = (s) => String(s).replace(/\x1b\[[0-9;]*m/g, "").replace(/[\x0e\x0f]/g, "");

describe("declined weaken-death still cuts max HP (losestr resume, D-3782)", () => {
    it(`${ID}: step-839 HP:30(44) + C RNG prefix through 838`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const steps = seg.steps || [];
        assert.equal(steps.length, 992, `expected 992 C steps`);
        // Filtered C RNG log, flattened (same filter/order as hidden-worker).
        const cRng = [];
        const stepStart = [];
        for (const st of steps) {
            stepStart.push(cRng.length);
            for (const e of (st.rng || []).filter(isRngCall)) cRng.push(normalizeRng(e));
        }
        // C-side pins: step 836 must be the 18-draw weaken, step 839 the
        // 30(44) decline resume, or the recording changed shape and this
        // test is vacuous.
        const c836 = (steps[836].rng || []).filter((e) => /losestr/.test(e));
        assert.equal(c836.length, 18, `C step-836 weaken shape moved: ${c836.length} losestr draws`);
        assert.ok((steps[836].rng || []).some((e) => /mcast_weaken_you/.test(e)),
            `C step-836 is not the weaken cast`);
        const cRow23 = stripAnsi(steps[839].screen).split("\n")[23] || "";
        assert.ok(cRow23.includes("HP:30(44)"),
            `C step-839 status moved: ${JSON.stringify(cRow23.slice(0, 80))}`);

        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const jsRng = (g.getRngLog?.() || []).map(stripIdx)
            .filter(isRngCall).map(normalizeRng);
        const screens = (g.getScreens?.() || []).map(String);
        assert.ok(screens.length >= 840,
            `session truncated: ${screens.length} screens < 840 steps`);
        // Guard: RNG prefix through step 838 still matches (fix adds no draws).
        const end838 = stepStart[839];
        assert.ok(jsRng.length >= end838,
            `JS RNG log short: ${jsRng.length} < ${end838}`);
        for (let i = 0; i < end838; i++) {
            if (jsRng[i] !== cRng[i]) {
                assert.fail(`RNG diverges at ${i}: C ${cRng[i]} vs JS ${jsRng[i]}`);
            }
        }
        // Signal: resumed losestr cut max HP 118→44 before the hound bite.
        const jsRow23 = stripAnsi(screens[839]).split("\n")[23] || "";
        assert.ok(jsRow23.includes("HP:30(44)"),
            `step-839 max-HP cut missing: ${JSON.stringify(jsRow23.slice(0, 80))}`);
    });
});
