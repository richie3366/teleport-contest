import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { game } from "../js/gstate.js";

const { runSegment } = await import("../js/jsmain.js");
const C = await import("../js/const.js");

// `wizard.c` clonewiz (`:517–534`): the `!Protection_from_shape_changers`
// gate (`:527`) guards ROLL_FROM(wizapp) (`:530`, an rn2(12)). The C macro
// (youprop.h:355–360) is uprops[PROT_FROM_SHAPE_CHANGERS].intrinsic||
// extrinsic — no flats. scen-sweep-Ranger-50650001 wears a cursed -1 ring
// of protection from shape changers (W_RINGL extrinsic, flats unset), so
// C skips the roll at step 1037 while a flats-only JS gate draws it.
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

const ID = "scen-sweep-Ranger-50650001";

function loadSeg() {
    return JSON.parse(readFileSync(
        new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
    )).segments[0];
}

describe("clonewiz skips ROLL_FROM on ring extrinsic (distfleeck@1037 writer)", () => {
    it("step-1037 state + RNG slice match C (no rn2(12))", { timeout: 300000 }, async () => {
        const seg = loadSeg();
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, 1037),
            storage: sharedStorage(),
        });
        const u = game.u || {};
        // Mechanism: worn ring confers the extrinsic; flats stay unset.
        assert.equal(u.uleft?.otyp, 200); // RIN_PROTECTION_FROM_SHAPE_CHAN
        assert.equal(u.uleft?.owornmask, C.W_RINGL);
        const p = u.uprops?.[C.PROT_FROM_SHAPE_CHANGERS];
        assert.ok((p?.extrinsic | 0) !== 0, "ring extrinsic set");
        assert.ok(!u.HProtection_from_shape_changers
            && !u.EProtection_from_shape_changers
            && !u.Protection_from_shape_changers, "flats unset");
        // Effect: JS draws no rn2(12) — slice head equals C.
        const norm = (e) => String(e).replace(/ @ .*$/, "");
        assert.deepEqual(
            g.getRngSlices()[1037].slice(0, 2).map(norm),
            seg.steps[1037].rng.slice(0, 2).map(norm),
        );
    });
});
