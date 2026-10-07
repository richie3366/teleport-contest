import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");
const NS = await import("../js/gstate.js");

// C ref: teleport.c rloc_to :1684 → steed.c place_monster :931
// `mon->mstate = MON_FLOOR` — placement wipes every mstate bit. JS
// rloc_to cleared only MON_OFFMAP (D-3577), so a bubble-carried pet
// kept MON_BUBBLEMOVE (16) after the mv_bubble→mnearto→rloc_to deposit
// and movemon_singlemon skipped it (mon_offmap, monst.h:255), forking
// scen-tour-Tourist-92100 step 141 at C distfleeck vs JS mcalcmove.
const SESS = JSON.parse(readFileSync(
    new URL("../.cache/hidden/sessions/scen-tour-Tourist-92100.session.json", import.meta.url),
));
const SEGS = SESS.segments;
const S0KEYS = SEGS[0].steps.map((s) => (s.key == null ? "" : s.key));
const K140 = S0KEYS.slice(0, 141).join("").length;
const K141 = S0KEYS.slice(0, 142).join("").length;
const strip = (e) => String(e).replace(/^\d+\s+/, "").split(" @ ")[0];
// C's recorded fork-step draws, caller tags stripped (322 draws).
const C141 = SEGS[0].steps[141].rng.map(strip);

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

async function replay(klen) {
    const storage = sharedStorage();
    const g = await runSegment({
        seed: SEGS[0].seed, datetime: SEGS[0].datetime,
        nethackrc: SEGS[0].nethackrc, moves: SEGS[0].moves.slice(0, klen), storage,
    });
    return { log: (g.getRngLog?.() || []).map(strip), game: NS.game };
}

describe("rloc_to mstate reset (steed.c:931)", () => {
    it("bubble-deposited pet has mstate MON_FLOOR at step-141 start", { timeout: 300000 }, async () => {
        const { game } = await replay(K140);
        const pets = (game.fmon || []).filter((m) => (m.mtame | 0) > 0);
        assert.ok(pets.length >= 1, "expected the tame pet on fmon");
        for (const pet of pets) assert.equal(pet.mstate | 0, 0);
    });

    it("fork-step draws equal C's 322 incl. the pet's distfleeck", { timeout: 300000 }, async () => {
        const { log: logA } = await replay(K140);
        const { log: logB } = await replay(K141);
        let common = 0;
        while (common < logA.length && common < logB.length && logA[common] === logB[common]) common++;
        assert.equal(common, logA.length);
        assert.deepEqual(logB.slice(common), C141);
    });
});
