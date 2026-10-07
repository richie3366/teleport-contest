import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { game } from "../js/gstate.js";

const { runSegment } = await import("../js/jsmain.js");

// C ref: include/decl.h:536 — gl.lastinvnr «never saved&restored»;
// a fresh C process starts at BSS 0 and restgamestate leaves it there,
// so the first post-restore assigninvlet fills the lowest free gap.
// JS saved and restored _lastinvnr, so a gap (thrown yumi 'c') was
// skipped and the wished daggers landed on 'g' instead of 'c' (D-3584).

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

describe("save/restore lastinvnr gap-fill (decl.h:536, D-3584)", () => {
    it("wished daggers fill the thrown-yumi gap 'c' after restore", { timeout: 180000 }, async () => {
        const recipe = JSON.parse(readFileSync(
            new URL("../hidden-corpus/recipes/scen-special-Samurai-94217.recipe.json", import.meta.url),
        ));
        const storage = freshStorage();
        const [seg0, seg1] = recipe.segments;
        // seg0 ends with save ('S'); seg1 restores, throws the yumi ('t'+'c'),
        // then wishes 10 daggers (^W at index 33, confirm \n at index 44).
        await runSegment({
            seed: seg0.seed, datetime: seg0.datetime,
            nethackrc: seg0.nethackrc, moves: seg0.moves, storage,
        });
        const g1 = await runSegment({
            seed: seg1.seed, datetime: seg1.datetime,
            nethackrc: seg1.nethackrc, moves: seg1.moves.slice(0, 45), storage,
        });
        const screens = g1.getScreens();
        const last = screens[screens.length - 1] || "";
        assert.match(last, /c - 10 daggers\./, "daggers take the freed 'c' slot (C behavior)");
        assert.doesNotMatch(last, /g - 10 daggers\./, "must not skip the gap to 'g'");
        // The wished stack itself carries 'c' (restore reset lastinvnr to
        // BSS 0, so assigninvlet filled the thrown-yumi gap instead of 'g').
        const daggers = (game.invent || []).find((o) => o && o.invlet === "c");
        assert.ok(daggers, "invent holds the daggers at 'c'");
    });
});
