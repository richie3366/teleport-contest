import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: cmd.c dotravel_target `:5375` + hack.c domove_core `:2724-2737` —
// dotravel_target calls domove() unconditionally; the travel-step
// recompute (travel->guess, travel1=0) sits at the top of domove_core and
// NOPATH FALLS THROUGH (findtravelpath `found:` `:1518-1522` zeroes dx/dy
// + nomul(0)), so domove's pre-step arms — notably uswallow, which zeroes
// dx/dy and attacks the engulfer — always run. JS dotravel_target instead
// gated domove on travelStep and skipped it on NOPATH, spending the turn
// (movemon + periodic) with no hero action (scen-sweep-Archeologist-95332
// step 817, engulfed: C melee gethungry->exercise->hitum vs JS movemon
// dochug first, prompt stale, no hit message).
// This test pins the cliff acceptance: the matched RNG prefix moves
// strictly past the old divergence.
const ID = "scen-sweep-Archeologist-95332";
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

describe("dotravel_target NOPATH still calls domove (cmd.c:5375)", () => {
    it(`${ID}: matched RNG prefix moves past 25348`, { timeout: 300000 }, async () => {
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
        assert.ok(prefix > 25348, `matched RNG prefix ${prefix} did not move past 25348`);
    });
});
