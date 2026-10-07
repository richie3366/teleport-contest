import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: potion.c peffect_polymorph `:1327`
// `u.mtimedone = min(u.mtimedone, rn2(15) + 10)` — min is a macro
// ((x)<(y)?(x):(y), hack.h:1518), so when the condition is false the
// losing branch's rn2(15) evaluates TWICE: the condition draw plus the
// result draw. Math.min evaluates once. scen-poly-Valkyrie-92195 step
// 312 records [rn2(15)=13, rn2(15)=10] (mtimedone 500+ < 23 is false,
// so the second draw wins: mtimedone = 20); single-eval JS drew only
// rn2(15)=13 (mtimedone = 23) and shifted every later draw (C
// rn2(19)=9 @ exercise vs JS rn2(19)=17). This test pins the double
// draw plus the realigned tail and total.
const ID = "scen-poly-Valkyrie-92195";
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

describe("peffect_polymorph min-macro double draw (potion.c:1327)", () => {
    it(`${ID}: 3366-3367 are both rn2(15), tail realigned`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const log = (g.getRngLog?.() || []).map(String);
        assert.equal(bare(log[3366]), "rn2(15)=13",
            `3366 is not the min-condition draw: ${bare(log[3366])}`);
        assert.equal(bare(log[3367]), "rn2(15)=10",
            `3367 is not the min-result draw (single-eval Math.min?): ${bare(log[3367])}`);
        assert.equal(bare(log[3368]), "rn2(19)=9",
            `3368 is not the realigned exercise draw: ${bare(log[3368])}`);
        assert.equal(log.length, 3377,
            `RNG total is not the C-recorded 3377: ${log.length}`);
    });
});
