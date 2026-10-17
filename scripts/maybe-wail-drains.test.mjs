import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: hack.c losehp `:4289–4291` runs maybe_wail inline; JS defers it
// via `_needs_maybe_wail` (D-3105) so every losehp site must drain with
// `finish_maybe_wail()`. Four sites lost the wail: the hero printed the
// next event's message where C prints the low-HP warning, shifting every
// later screen one step early (cliffs rank-16 `hack.c` maybe_wail ×5).

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

async function replay(recipePath, nkeys) {
    const recipe = JSON.parse(readFileSync(new URL(recipePath, import.meta.url)));
    const [seg0] = recipe.segments;
    const g = await runSegment({
        seed: seg0.seed, datetime: seg0.datetime,
        nethackrc: seg0.nethackrc, moves: seg0.moves.slice(0, nkeys),
        storage: freshStorage(),
    });
    return g.getScreens().map(strip);
}

describe("deferred low-HP wail drains (hack.c:4289-4291)", () => {
    it("losestr underflow wails: weaken then Banshee (attrib.c:244)", { timeout: 240000 }, async () => {
        // scen-sweep-Rogue-50250081: Wizard casts weaken-you, STR
        // underflows into 18x rn1(4,3) damage (C draws), losehp drops
        // the Rogue to uhp 1, C wails inline.
        const screens = await replay(
            "../hidden-corpus/recipes/scen-sweep-Rogue-50250081.recipe.json", 812);
        assert.match(screens[810] || '', /casts a spell at you/,
            "replay reaches the Wizard cast");
        assert.match(screens[811] || '', /You suddenly feel weaker!/,
            "weaken effect still leads");
        assert.match(screens[811] || '', /You hear the wailing of the Banshee\.\.\.--More--/,
            "losestr drains the deferred Banshee wail in C order");
    });

    it("chasm fall wails: Valkyrie life force (music.c do_pit:314)", { timeout: 240000 }, async () => {
        // scen-sweep-Valkyrie-50550049: earthquake opens a chasm under
        // the hero; C wails inline after the fall damage.
        const screens = await replay(
            "../hidden-corpus/recipes/scen-sweep-Valkyrie-50550049.recipe.json", 1173);
        assert.match(screens[1171] || '', /falls into a chasm/,
            "replay reaches the earthquake falls");
        assert.match(screens[1172] || '', /You fall into a chasm!/,
            "fall message still leads");
        assert.match(screens[1172] || '', /Valkyrie, your life force is running out\.--More--/,
            "do_pit drains the deferred wail in C order");
    });

    it("grappling-hook self-hit wails: CwnAnnwn (apply.c use_grapple:3865)", { timeout: 240000 }, async () => {
        // scen-sweep-Barbarian-50255242: unskilled grapple hooks the
        // hero; C wails inline after the self damage.
        const screens = await replay(
            "../hidden-corpus/recipes-reserve/scen-sweep-Barbarian-50255242.recipe.json", 671);
        assert.match(screens[670] || '', /You hook yourself!/,
            "hook message still leads");
        assert.match(screens[670] || '', /You hear the howling of the CwnAnnwn\.\.\.--More--/,
            "use_grapple drains the deferred wail in C order");
    });

    it("monster earth-scroll boulder wails: CwnAnnwn (read.c:2337 via muse)", { timeout: 240000 }, async () => {
        // scen-sweep-Knight-49956002: a monster reads scroll of earth;
        // the boulder hits for low-HP damage; C wails inline (paged at
        // s995 ahead of the next turn's titanothere hit).
        const screens = await replay(
            "../hidden-corpus/recipes-reserve/scen-sweep-Knight-49956002.recipe.json", 996);
        assert.match(screens[994] || '', /You are hit by a boulder!/,
            "replay reaches the earth-scroll boulder");
        assert.match(screens[995] || '', /You hear the howling of the CwnAnnwn\.\.\./,
            "muse boulder path drains the deferred wail in C order");
        assert.match(screens[995] || '', /The titanothere hits!/,
            "next turn still follows on the same page");
    });
});
