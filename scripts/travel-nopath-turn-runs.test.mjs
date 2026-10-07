import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: hack.c domove_core `:2724-2728` + findtravelpath `found:`
// (`:1516-1520`) — a travel step with no path and no guess zeroes
// dx/dy + nomul(0) (multi cleared, travel over) and then FALLS
// THROUGH: domove self-steps (no-op) with move=1 and the turn still
// runs (movemon, timers, dosounds, gethungry). JS continue_run's
// `!travelStep` arm instead did end_running + move=0 + return,
// skipping the turn C runs (scen-town-Wizard-94142: C turn-12 runs
// 95 draws with the hero unmoved at (21,17); JS read the next
// command's getpos first, forking RNG at index 7672
// C `rn2(5) @ distfleeck` vs JS `rnd(2) @ next_ident`).
// This test pins the cliff acceptance: the matched RNG prefix moves
// strictly past the old 7672 divergence.
const ID = "scen-town-Wizard-94142";
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

describe("travel no-path step still runs its turn (hack.c:2724-2728)", () => {
    it(`${ID}: matched RNG prefix moves past 7672`, { timeout: 300000 }, async () => {
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
        assert.ok(prefix > 7672, `matched RNG prefix ${prefix} did not move past 7672`);
    });
});
