import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { NethackGame } from "../js/jsmain.js";
import { GameDisplay } from "../js/game_display.js";
import { moveloop_core } from "../js/allmain.js";
import { game } from "../js/gstate.js";
import { couldsee } from "../js/vision.js";
import { getRngLog } from "../js/rng.js";

// C ref: allmain.c moveloop `:453–471` — the vision consume gate:
//   if (!context.mv || Blind) { ...see arms...; if (vision_full_recalc) vision_recalc(0); }
// The consume is INSIDE the gate: when the hero moved (mv) and can see,
// C defers the recalc to the next pline/see so it runs with the new
// position. D-3698: JS consumed unconditionally, recalc'd with the stale
// position and cleared the flag — scen-town-Priest-94382 step 99 showed
// floor at (24,6) where C shows the gnome (G) at the tether More.
//
// Drives the committed recipe headless and captures input boundary #100
// (the tether More, RNG 5079): cell (24,6) must be the sensed gnome.
describe("moveloop vision consume gate (allmain.c:453-471)", () => {
  it("defers the dirty-vision recalc past a moved turn (Priest-94382 hook#100 = G)", async () => {
    const recipe = JSON.parse(readFileSync(
      new URL("../hidden-corpus/recipes/scen-town-Priest-94382.recipe.json", import.meta.url), "utf8"));
    const seg = recipe.segments[0];
    const mem = new Map();
    const storage = {
      getItem: (k) => (mem.has(k) ? mem.get(k) : null),
      setItem: (k, v) => mem.set(k, String(v)),
      removeItem: (k) => mem.delete(k),
      get length() { return mem.size; },
      key: (i) => [...mem.keys()][i] ?? null,
    };
    const nhGame = new NethackGame({
      seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc, storage,
    });
    const display = new GameDisplay(null);
    display.onEmptyQueue = () => { throw new Error("Input queue empty - trace done"); };
    nhGame._pendingDisplay = display;
    for (const ch of seg.moves) display.pushKey(ch === "\r" ? 10 : ch.charCodeAt(0));
    await nhGame.start();
    const origPre = game._preNhgetchHook;
    let n = 0;
    let seen = null;
    game._preNhgetchHook = async () => {
      n++;
      if (n === 100) {
        seen = {
          rng: (getRngLog() || []).length,
          cell: game.nhDisplay?.grid?.[7]?.[23]?.ch,
          couldsee: couldsee(24, 6),
        };
      }
      await origPre();
    };
    for (; !game.program_state?.gameover;) {
      try {
        await moveloop_core();
      } catch (e) {
        if (String(e?.message || "").includes("Input queue empty")) break;
        throw e;
      }
    }
    assert.ok(seen, "hook#100 never fired");
    assert.equal(seen.rng, 5079);
    assert.equal(seen.couldsee, true);
    assert.equal(seen.cell, "G");
  });
});
