import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: pray.c dosacrifice `:1860–1864` — off an altar prints "You are
// not %s an altar." with (Levitation || Flying) ? "over" : "on"
// (youprop.h:240/:253–256 macros over uprops H/E). pray.js read the dead
// u.Levitation/u.Flying summary flats (zero writers in js/), so a
// levitating hero always heard "on" (scen-sweep-Barbarian-95337 step
// 729: C «You are not over an altar.», JS «You are not on an altar.»;
// the hero carries uprops[LEVITATION].intrinsic=8 there). dosacrifice
// now reads the live mhitu.js Levitation()/Flying() exports.

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

describe("dosacrifice off-altar prep follows live Levitation (pray.c:1861)", () => {
    it("levitating hero hears 'over an altar'", { timeout: 180000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-sweep-Barbarian-95337.recipe.json", import.meta.url),
        ));
        const [seg0] = recipe.segments;
        const g = await runSegment({
            seed: seg0.seed, datetime: seg0.datetime,
            nethackrc: seg0.nethackrc, moves: seg0.moves.slice(0, 729),
            storage: freshStorage(),
        });
        const screens = g.getScreens();
        const top = strip(screens[screens.length - 1] || '');
        assert.match(top, /You are not over an altar\./, "levitating hero: C 'over' prep (was JS 'on')");
    });
});
