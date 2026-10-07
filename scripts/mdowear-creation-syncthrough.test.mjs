import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { toplineOf } from "./lib/fuzz-compare.mjs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: worn.c m_dowear `:757–796` + m_dowear_type `:798–1002` — the
// creation path is fully synchronous: each slot copies the monster name up
// front (`:817`, rndmonnam under Hallucination) with no wear messages, so
// all slot namings land consecutively in the display-RNG stream. JS
// `await`ed every slot (`await` always suspends, even for a resolved
// promise), so a fire-forget m_dowear (makemon.c:1445, mplayer.c:293,
// sp_lev.c:3034, trap.c:885) ran slot 1's naming, suspended, and resumed
// slots 2+ after the caller's newsym + appear message — shifting every
// later hallucinated name. In scen-impaired-Rogue-94310 the #monster
// appear message drew "Angel" where C draws "green slime" (step 245).
// This test replays both segments and pins C's step-245 topline.
const ID = "scen-impaired-Rogue-94310";
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

describe("m_dowear creation path runs sync-through (worn.c m_dowear)", () => {
    it(`${ID}: step-245 appear message matches C`, { timeout: 300000 }, async () => {
        const storage = sharedStorage();
        // seg0 primes cross-segment storage; seg1 holds global step 245.
        const s0 = SESS.segments[0];
        await runSegment({
            seed: s0.seed, datetime: s0.datetime,
            nethackrc: s0.nethackrc, moves: s0.moves, storage,
        });
        const s1 = SESS.segments[1];
        const g = await runSegment({
            seed: s1.seed, datetime: s1.datetime,
            nethackrc: s1.nethackrc, moves: s1.moves, storage,
        });
        const screens = g.getScreens?.() || [];
        // Global 245 = seg1 local 58 (seg0 contributes 187 steps).
        assert.ok(screens.length >= 59, `screens ${screens.length} < 59`);
        const cTop = toplineOf(s1.steps[58].screen);
        assert.equal(cTop, "The green slime appears next to you.");
        assert.equal(toplineOf(screens[58]), cTop);
    });
});
