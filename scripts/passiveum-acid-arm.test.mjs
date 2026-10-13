import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: mhitu.c passiveum AD_ACID `:2478–2481` (`if (!rn2(30))
// erode_armor(mtmp, ERODE_CORRODE); if (!rn2(6))
// acid_damage(MON_WEP(mtmp));`). JS drew the rn2(30)/rn2(6) gates but
// left both calls `deferred`, so the attacker's weapon never reached
// erode_obj: scen-sweep-Rogue-587201 step 1128 drew C `rnl(4)=0 @
// erode_obj(trap.c:257)` (blessed-weapon save) vs JS `rn2(26)=24 @
// wipe_engr_at` at matched-RNG index 80094. This test pins the cliff
// acceptance: the matched RNG prefix moves strictly past 80094.
const ID = "scen-sweep-Rogue-587201";
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

describe("passiveum AD_ACID wires erode_armor + acid_damage (mhitu.c:2478-2481)", () => {
    it(`${ID}: matched RNG prefix moves past 80094`, { timeout: 300000 }, async () => {
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
        assert.ok(prefix > 80094, `matched RNG prefix ${prefix} did not move past 80094`);
    });
});
