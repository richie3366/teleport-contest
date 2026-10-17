import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: read.c seffect_confuse_monster :1404 `altfeedback = (Blind ||
// Invisible)` + :1434-1435 unblessed/unconfused arm (`Your("%s tingle%s.")`
// vs `Your("%s begin to glow %s.", hcolor(NH_RED))`); youprop.h:199
// `#define Invisible (Invis && !See_invisible)`. JS read the `u.Invisible`
// flat, which no writer in js/ sets (quaff/spell/wand invisibility lands
// in HInvis/uprops — D-1999: readers must call Invis()), so an invisible
// hero read the glow arm where C reads tingle (scen-sweep-Caveman-50055067
// step 1272 and scen-sweep-Rogue-620093 step 1060: C «Your hands tingle.»,
// JS «Your hands begin to glow red.» — both quaffed invisibility earlier
// with no wear-off before the read).

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

function loadRecipe(id) {
    for (const d of ["../hidden-corpus/recipes", "../hidden-corpus/recipes-reserve"]) {
        const u = new URL(`${d}/${id}.recipe.json`, import.meta.url);
        if (existsSync(u)) return JSON.parse(readFileSync(u));
    }
    throw new Error(`no recipe for ${id}`);
}

const strip = (s) => (s || '').split('\n')[0].replace(/\x1b\[[0-9;]*m/g, '');

async function toplineAt(id, keys, step) {
    const recipe = loadRecipe(id);
    const [seg0] = recipe.segments;
    const g = await runSegment({
        seed: seg0.seed, datetime: seg0.datetime,
        nethackrc: seg0.nethackrc, moves: seg0.moves.slice(0, keys),
        storage: freshStorage(),
    });
    const screens = g.getScreens();
    assert.ok(screens.length > step, `replay reaches step ${step} (${screens.length} screens)`);
    const top = strip(screens[step]);
    assert.match(top, /As you read the scroll, it disappears\./, `step ${step} is the scroll read`);
    return top;
}

describe("invisible hero reading confuse-monster gets C's tingle arm (read.c:1404/1434)", () => {
    it("Caveman-50055067 step 1272: tingle, not glow red", { timeout: 240000 }, async () => {
        const top = await toplineAt("scen-sweep-Caveman-50055067", 1273, 1272);
        assert.match(top, /Your hands tingle\./, "C's altfeedback arm");
        assert.doesNotMatch(top, /glow red/, "not the visible-hero arm");
    });
    it("Rogue-620093 step 1060: tingle, not glow red", { timeout: 240000 }, async () => {
        const top = await toplineAt("scen-sweep-Rogue-620093", 1061, 1060);
        assert.match(top, /Your hands tingle\./, "C's altfeedback arm");
        assert.doesNotMatch(top, /glow red/, "not the visible-hero arm");
    });
});
