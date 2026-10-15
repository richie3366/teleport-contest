import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { game } from "../js/gstate.js";

const { runSegment } = await import("../js/jsmain.js");
const { decodeScreen, renderCell } = await import("../frozen/screen-decode.mjs");

// C ref: do_wear.c Gloves_on (:576–603) — switch + known tail, NO find_ac
// (D-3891/D-3948 class): uac refreshes at the allmain once-per-input
// find_ac, so a donning that completes mid-turn paints the stale AC until
// the turn ends. JS ran a house find_ac() at completion.
// scen-sweep-Ranger-50050043 step 1125: wish → W wear gauntles of fumbling
// (oc_delay 2 → nomul + "dressing maneuver"); completion lands mid-turn.
// C paints stale AC:7; JS painted fresh AC:6, first divergence (owner
// do_statusline2). RNG fully matched (42680/42680); toplines identical.
const ID = "scen-sweep-Ranger-50050043";
const STEP = 1125;

function memStorage() {
    const mem = new Map();
    return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        get length() { return mem.size; },
        key: (i) => [...mem.keys()][i] ?? null,
    };
}

describe("Gloves_on completion paints stale AC (do_wear.c Gloves_on, no house find_ac)", () => {
    it(`${ID}@${STEP}: stale AC:7 like C, dressing topline intact`, { timeout: 300000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL(`../hidden-corpus/recipes/${ID}.recipe.json`, import.meta.url),
        ));
        const seg = recipe.segments[0];
        const g = await runSegment({
            seed: seg.seed, datetime: seg.datetime,
            nethackrc: seg.nethackrc, moves: seg.moves.slice(0, STEP),
            storage: memStorage(),
        });
        const u = game.u || {};
        assert.equal(u.uac, 7, "uac stays stale 7 at completion (C paints AC:7)");
        assert.ok(u.uarmg, "gauntlets worn (instant setworn at W time)");
        const grid = decodeScreen(g.getScreens()[STEP] || "");
        const topline = grid[0].map(renderCell).join("");
        assert.match(topline, /You finish your dressing maneuver/, "nomovemsg intact");
        assert.match(topline, /The troll hits!/, "troll attack intact");
        const row23 = (grid[23] || []).map(renderCell).join("");
        assert.match(row23, /AC:7/, `C-recorded stale row23 «${row23.trim()}»`);
    });
});
