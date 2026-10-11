import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: hack.c findtravelpath BFS-exhaust (`return FALSE` `:1515`) +
// domove_core `:2724-2728` — a travel start whose TRAVEL BFS and guess
// pick's second BFS both exhaust keeps the STALE u.dx/u.dy (no zeroing,
// no nomul): domove steps the stale direction. Only the two `found:`
// exits (`:1518-1522` — dest==hero `:1289`, guess no-pick TEST_MOVE fail
// `:1489`) zero dx/dy + nomul(0). JS dotravel_target instead zeroed dx/dy
// + nomul(0) on every NOPATH, self-stepping (0,0): a held hero on an
// un-enterable square (TREE, TEST_TRAV rejects entry so every reverse BFS
// fails) drew escape_from_sticky_mon rn2(40) where C stepped stale into
// the holder's square — silent escape, then "You move right into it."
// (scen-sweep-Valkyrie-578204 step 895, stale (-1,+1) from "Fb").
// This test pins the cliff acceptance: the matched RNG prefix moves
// strictly past the old 9216 divergence.
const ID = "scen-sweep-Valkyrie-578204";
const SESS = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${ID}.session.json`, import.meta.url),
));
const strip = (e) => String(e).replace(/^\d+\s+/, "").split(" @ ")[0];

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

describe("travel NOPATH keeps stale dx/dy (hack.c:1515, not found:)", () => {
    it(`${ID}: matched RNG prefix moves past 9216`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const gotDraws = (g.getRngLog?.() || []).map(strip);
        const wantDraws = [];
        for (const st of seg.steps) for (const d of (st.rng || [])) wantDraws.push(strip(d));
        let prefix = 0;
        while (prefix < gotDraws.length && prefix < wantDraws.length
            && gotDraws[prefix] === wantDraws[prefix]) prefix++;
        assert.ok(prefix > 9216, `matched RNG prefix ${prefix} did not move past 9216`);
    });
});
