import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: shk.c shk_move `:4960` (`if (Invis || u.usteed)`) + youprop.h:198
// (`Invis` = (HInvis||EInvis)&&!BInvis, live from uprops). JS read the
// u.Invis flat (synced only by the magic-trap toggle, timeout.js D-1999),
// missing worn-ring extrinsic (uprops[INVIS].extrinsic): an invisible hero
// took the uondoor/avoid/onlineu/satdoor arm (`:4963–4981`, appr=0,
// pick_move rn2 reservoir) where C skips it silent (avoid=FALSE,
// move_special appr=1, no draws). scen-sweep-Caveman-582707 step 658:
// C `rn2(5)=4 @ distfleeck` vs JS `rn2(1)=0 @ pick_move` at index 25442.
// This test pins the cliff acceptance: the matched RNG prefix moves
// strictly past the old 25442 divergence.
const ID = "scen-sweep-Caveman-582707";
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

describe("shk_move :4960 reads live Invis (youprop.h:198, not the flat)", () => {
    it(`${ID}: matched RNG prefix moves past 25442`, { timeout: 300000 }, async () => {
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
        assert.ok(prefix > 25442, `matched RNG prefix ${prefix} did not move past 25442`);
    });
});
