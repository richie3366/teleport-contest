import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const GSTATE = await import("../js/gstate.js");
const { runSegment } = await import("../js/jsmain.js");
const { objects_at } = await import("../js/mkobj.js");

// C ref: dogmove.c dog_move leash kludge `:1322–1355` + cmd.c dirtocoord
// `:3858–3865` (`cc = (xdir[dd], ydir[dd])`, ASSIGNING, not additive).
// TEMP-C measured (recorder teleport.c goodpos trace, moves==62, reverted;
// log-only proven, pristine rebuild byte-identical): Hachi's kludge tests
// (62,5) [89, blocked] then the assigning spiral (1,-1),(1,0),(0,-1),
// (1,-1),(1,0),(1,1) — all fail — and falls back to STAY, turns 432+433.
// JS added (`cc += dir`), reached (63,4), and walked Hachi off her just-
// dropped dagger — forking scen-sweep-Samurai-50156002 step 433 (C
// `rn2(100) @ obj_resists` vs JS `rn2(5) @ distfleeck`) (D-4005).
const RECIPE = JSON.parse(readFileSync(
    new URL("../hidden-corpus/recipes/scen-sweep-Samurai-50156002.recipe.json", import.meta.url),
));

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

describe("dog_move leash kludge fallback stay (dogmove.c:1322-1355, D-4005)", () => {
    it("hook#434 (post-433): Hachi stays at (64,5) atop her dagger like C", { timeout: 120000 }, async () => {
        const seg = RECIPE.segments[0];
        let hookCount = 0;
        let snap = null;
        const p = runSegment({
            seed: seg.seed,
            datetime: seg.datetime,
            timezone: seg.timezone,
            nethackrc: seg.nethackrc,
            moves: seg.moves || "",
            storage: freshStorage(),
        });
        for (let i = 0; i < 200 && typeof GSTATE.game._preNhgetchHook !== "function"; i++) {
            await new Promise((r) => setImmediate(r));
        }
        const orig = GSTATE.game._preNhgetchHook;
        assert.equal(typeof orig, "function");
        GSTATE.game._preNhgetchHook = async () => {
            hookCount++;
            if (hookCount === 434 && !snap) {
                const hachi = (GSTATE.game.fmon || []).find((m) => m.m_id === 48);
                const floor = objects_at(64, 5);
                snap = {
                    hx: hachi.mx, hy: hachi.my,
                    dagger: floor && floor.otyp === 36,
                };
            }
            await orig();
        };
        await p;
        assert.ok(snap, "hook#434 reached");
        assert.equal(snap.hx, 64);
        assert.equal(snap.hy, 5);
        assert.equal(snap.dagger, true);
    });
});
