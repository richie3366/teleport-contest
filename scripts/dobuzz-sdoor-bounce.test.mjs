import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

globalThis.__NH_RNG_TRACE = true;
const { runSegment } = await import("../js/jsmain.js");

// C ref: zap.c dobuzz `:4998–5021` — the bounce test re-reads the LIVE
// cell (`levl[sx][sy].typ`), because zap_over_floor above it may have
// rewritten typ (SDOOR→DOOR `:5398–5409`, ice melt, pool→ROOM+PIT).
// js/zap.js cached `typ` at the iteration start and tested the stale
// value: a beam striking a secret door bounced (`!ZAP_POS(SDOOR)`) where
// C's live DOOR stops it (range already −1000 from the absorb), drawing
// a bogus extra rn2(75)@bounce_dir (scen-sweep-Healer-578216 step 668:
// C rn2(5)@distfleeck next, JS rn2(75)@bounce_dir). A leftover shim in the
// same loop also re-printed the absorb (C prints it once, from
// zap_over_floor `:5459`), doubling the message and the range cut.

function freshStorage() {
    const mem = new Map();
    return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

const strip = (s) => (s || '').split('\n')[0].replace(/\x1b\[[0-9;]*m/g, '');

describe("dobuzz secret-door absorb: live typ, single message (zap.c:4998)", () => {
    it("sweep-Healer beam absorbs once and yields to monmove, no bounce draw", { timeout: 180000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-sweep-Healer-578216.recipe.json", import.meta.url),
        ));
        const [seg0] = recipe.segments;
        const g = await runSegment({
            seed: seg0.seed, datetime: seg0.datetime,
            nethackrc: seg0.nethackrc, moves: seg0.moves,
            storage: freshStorage(),
        });
        const screens = g.getScreens().map(strip);
        // The sleep-ray beam (C step 668): miss + reveal; the absorb
        // paginates behind --More-- onto the next screen (C step 669).
        const k = screens.findIndex((t) => t.includes('reveals a secret door'));
        assert.ok(k >= 0, 'beam step shows the SDOOR reveal');
        const absorbs = (screens[k + 1] || '').split('absorbs your bolt').length - 1;
        assert.equal(absorbs, 1, `door absorbs exactly once (screen ${k + 1}): ${screens[k + 1]}`);
        // The beam ends there: the same screen runs monmove (C step 669).
        assert.match(
            screens[k + 1] || '',
            /The bone devil hits!/,
            `melee follows the absorb (screen ${k + 1}): ${screens[k + 1]}`,
        );
        // RNG channel: the draw after the beam's zap_hit is distfleeck's,
        // not a stale-typ bounce.
        const log = g.getRngLog?.() || [];
        const zh = log.findIndex((e) => String(e).startsWith('rnd(1)=1 @ zap_hit('));
        assert.ok(zh >= 0, 'beam zap_hit draw present');
        assert.match(
            String(log[zh + 1] || ''),
            /^rn2\(5\)=\d+ @ distfleeck\(/,
            `distfleeck follows zap_hit (got ${log[zh + 1]})`,
        );
    });
});
