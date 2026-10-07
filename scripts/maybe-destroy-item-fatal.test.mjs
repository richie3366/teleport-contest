import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: zap.c maybe_destroy_item `:5947–5949` (losehp then
// exercise(A_STR, FALSE)) + hack.c losehp `:4287` (done(DIED) noreturn on
// death unless life-saved). JS losehp is sync: fatal sets gameover +
// _losehp_needs_done and defers done() to finish_losehp_done (D-3608 oil
// pattern). maybe_destroy_item drew exercise BEFORE the drain, so a fatal
// fire-trap burn emitted an extra rn2(2) ahead of can_make_bones' rn2(1):
// scen-container-Barbarian-94326 mismatched at index 3764 (C rn2(1)=0 @
// can_make_bones vs JS rn2(2)=1 @ exercise, direct from
// maybe_destroy_item — the potionbreathe rn2(2)=0 at 3763 already matched).
// This test pins the aligned draw triple after the fix.
const ID = "scen-container-Barbarian-94326";
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

describe("fatal burn skips exercise (maybe_destroy_item losehp)", () => {
    it(`${ID}: 3764 is can_make_bones rn2(1), not exercise`, { timeout: 300000 }, async () => {
        const seg = SESS.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves,
            storage: sharedStorage(),
        });
        const log = (g.getRngLog?.() || []).map(String);
        assert.equal(bare(log[3763]), "rn2(2)=0",
            `3763 is not the potionbreathe exercise draw: ${bare(log[3763])}`);
        assert.equal(bare(log[3764]), "rn2(1)=0",
            `3764 is not the can_make_bones draw (extra exercise?): ${bare(log[3764])}`);
        assert.equal(bare(log[3765]), "rnd(2)=2",
            `3765 is not the realigned next_ident draw: ${bare(log[3765])}`);
    });
});
