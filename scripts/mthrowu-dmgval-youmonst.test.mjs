import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: mthrowu.c m_throw `:722` `dam = dmgval(singleobj, &gy.youmonst)`
// — the missile-vs-hero damage rolls over the hero's live form. JS passed
// `null` (mthrowu.js:1292), so bigmonst(ptr) was always false: a trapper-
// polyed hero (umonnum 99, MZ_HUGE) took the small branch. scen-engulf-
// Valkyrie-94212 step 166 records C `rnd(3)=3 @ dmgval(weapon.c:227)`
// (ELVEN_DAGGER oc_wldam 3, big arm) where JS drew `rnd(5)=2`
// (oc_wsdam 5, small arm). This test pins the hero-form draw plus its
// forcehit/thitu neighbours and the total.
const ID = "scen-engulf-Valkyrie-94212";
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

const bare = (e) => String(e).replace(/^\d+\s+/, "").split(" @")[0];

describe("m_throw dmgval over &gy.youmonst (mthrowu.c:722)", () => {
    it(`${ID}: 8541 is rnd(3), hero-form big branch`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const log = (g.getRngLog?.() || []).map(String);
        assert.equal(bare(log[8539]), "rn2(5)=1",
            `8539 is not the m_throw forcehit draw: ${bare(log[8539])}`);
        assert.equal(bare(log[8540]), "rn2(5)=1",
            `8540 is not the m_throw forcehit draw: ${bare(log[8540])}`);
        assert.equal(bare(log[8541]), "rnd(3)=3",
            `8541 is not the hero-form dmgval draw (null mon takes rnd(5)?): ${bare(log[8541])}`);
        assert.equal(bare(log[8542]), "rnd(20)=9",
            `8542 is not the thitu draw: ${bare(log[8542])}`);
        assert.equal(log.length, 8714,
            `RNG total is not the C-recorded 8714: ${log.length}`);
    });
});
