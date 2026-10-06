import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: monmove.c postmov :1514 `ptr = mtmp->data; /* in case mintrap()
// caused polymorph */` — the cached permonst must refresh after the
// post-move mintrap, before the door/hide arms read it. The kitten that
// steps on the wished polymorph trap (scen-dig-Valkyrie-94335 seg1 step
// 145, key 'u') becomes a scorpion (M1_CONCEAL); C's refreshed ptr takes
// the hides_under hide-check (rn2(5)=3 @ postmov :1696), drawing one die
// the stale ptr skips — forking the step at C distfleeck vs JS mcalcmove.
const SESS = JSON.parse(readFileSync(
    new URL("../.cache/hidden/sessions/scen-dig-Valkyrie-94335.session.json", import.meta.url),
));
const SEGS = SESS.segments;
const S1KEYS = SEGS[1].steps.map((s) => (s.key == null ? "" : s.key));
const K144 = S1KEYS.slice(0, 93).join("").length;
const K145 = S1KEYS.slice(0, 94).join("").length;
const strip = (e) => String(e).replace(/^\d+\s+/, "").split(" @ ")[0];
// C's recorded fork-step draws, caller tags stripped (36 draws).
const C145 = SEGS[1].steps[93].rng.map(strip);

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

async function seg1Draws(k1) {
    const storage = sharedStorage();
    await runSegment({
        seed: SEGS[0].seed, datetime: SEGS[0].datetime,
        nethackrc: SEGS[0].nethackrc, moves: SEGS[0].moves, storage,
    });
    const g = await runSegment({
        seed: SEGS[1].seed, datetime: SEGS[1].datetime,
        nethackrc: SEGS[1].nethackrc, moves: SEGS[1].moves.slice(0, k1), storage,
    });
    return (g.getRngLog?.() || []).map(strip);
}

describe("postmov mintrap ptr refresh (monmove.c:1514)", () => {
    it("fork-step draws equal C's 36 incl. the scorpion hide-check", { timeout: 300000 }, async () => {
        const logA = await seg1Draws(K144);
        const logB = await seg1Draws(K145);
        let common = 0;
        while (common < logA.length && common < logB.length && logA[common] === logB[common]) common++;
        assert.equal(common, logA.length);
        assert.deepEqual(logB.slice(common), C145);
    });
});
