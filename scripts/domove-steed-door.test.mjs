import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { runSegment } = await import("../js/jsmain.js");

// C ref: hack.c test_move `:1115–1120` — a hero impaired (Blind, Stunned,
// DEX<10 or Fumbling) moving orthogonally into a closed door prints
// `You_cant("lead %s through that closed door.", y_monnam(u.usteed))`
// when riding, and only the unmounted hero prints "Ouch!  You bump into
// a door." + exercise(A_DEX, FALSE). The live hero-move path
// (js/cmd.js domove's inline closed-door block) dropped the steed arm,
// so a riding hero bumped like a pedestrian: wrong topline plus a C-absent
// exercise rn2(2) draw (scen-ride-Samurai-94407 step 171: C
// «You can't lead your red dragon through that closed door.» + dochug
// rn2(40) vs JS «Ouch! You bump into a door.» + exercise rn2(2)).

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

describe("riding hero bumping a closed door is told to lead, not Ouch (hack.c:1116)", () => {
    it("ride-Samurai step 171 prints the lead-through message", { timeout: 180000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-ride-Samurai-94407.recipe.json", import.meta.url),
        ));
        const [seg0] = recipe.segments;
        const g = await runSegment({
            seed: seg0.seed, datetime: seg0.datetime,
            nethackrc: seg0.nethackrc, moves: seg0.moves,
            storage: freshStorage(),
        });
        const tops = g.getScreens().map(strip);
        assert.ok(
            tops.some((t) => t.includes("You can't lead your red dragon through that closed door.")),
            "riding hero bumping a closed door: C lead-through message (not Ouch)",
        );
    });
});
