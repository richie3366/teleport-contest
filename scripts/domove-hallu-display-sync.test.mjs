import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: hack.c domove `:2964–2974` — after a step, C paints newsym(old)
// then vision_recalc(1) ("vision_recalc() will print our new one", `:2969`);
// there is no direct newsym(dest). The port's extra newsym(dest) burned one
// display-RNG draw per step, desyncing every later hallucinated paint
// (scen-sweep-Samurai-578121 step 1328: boulders `[+[` vs JS `/[+`).

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

const strip = (s) => (s || '').replace(/\x1b\[[0-9;]*[mABCD]/g, '');

describe("domove paints new square once via vision_recalc (hack.c:2969)", () => {
    it("sweep-Samurai hallucinated boulders match C after the move", { timeout: 300000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-sweep-Samurai-578121.recipe.json", import.meta.url),
        ));
        const [seg0] = recipe.segments;
        // 1328 moves: the west step onto the fractured-boulder stones.
        const g = await runSegment({
            seed: seg0.seed, datetime: seg0.datetime,
            nethackrc: seg0.nethackrc, moves: seg0.moves.slice(0, 1328),
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        const last = strip(screens[screens.length - 1] || '').split('\n');
        assert.match(last[0] ?? '', /You see here 28 stones\./, "on the stones square");
        assert.match(last[8] ?? '', /┘\[\+\[···\)··│/, "C's hallucinated boulder glyphs");
    });
});
