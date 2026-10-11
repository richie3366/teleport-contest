import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: invent.c look_here `:4224–4233` — the article gate suppresses
// a/an only for "molten lava"/"iron bars"/"ice"/"frozen …"/"* ice".
// C's "iron bars" never matches dfeature_at's "set of iron bars"
// (invent.c:4094), so iron bars take an(): «There is a set of iron
// bars here.» invent.js "corrected" the gate to 'set of iron bars',
// dropping the "a" (scen-worldtour-Healer-578136 step 274).

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

describe("look_here iron bars keep the article (invent.c:4224)", () => {
    it("worldtour-Healer shows C's 'a set of iron bars' topline", { timeout: 180000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-worldtour-Healer-578136.recipe.json", import.meta.url),
        ));
        const [seg0] = recipe.segments;
        // 274 moves: the ':' look that prints the iron-bars dfeature line.
        const g = await runSegment({
            seed: seg0.seed, datetime: seg0.datetime,
            nethackrc: seg0.nethackrc, moves: seg0.moves.slice(0, 274),
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        const last = strip(screens[screens.length - 1] || '');
        assert.match(last, /There is a set of iron bars here\./, "C article preserved");
    });
});
