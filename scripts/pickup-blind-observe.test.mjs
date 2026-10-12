import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: pickup.c pickup_object `:1817-1818` — `if (!Blind)
// observe_object(obj)` (autopickup look-ahead; affects
// docall(SCR_SCARE_MONSTER)). C Blind is the youprop.h macro
// `(HBlinded || EBlinded) && !BBlinded` — a worn blindfold counts.
// JS read the stale `game.u.Blind` flat (undefined under a worn
// blindfold), observed while blind, and set dknown=1 — so the second
// touch_artifact blast named the artifact ("named the Platinum
// Yendorian Express Card") where C prints the bare "credit card"
// (scen-sweep-Monk-582601 step 722, D-3883).
// Single prefix per file (multi-prefix runSegment leaks module state).
async function runPrefix(recipeName, nmoves) {
  const raw = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/recipes/${recipeName}.recipe.json`, import.meta.url), "utf8"));
  const seg = raw.segments[0];
  const { runSegment } = await import("../js/jsmain.js");
  const m = new Map();
  const storage = {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    get length() { return m.size; },
    key: (i) => [...m.keys()][i] ?? null,
  };
  const handle = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, nmoves), storage,
  });
  const { game } = await import("../js/gstate.js");
  return { screens: handle.getScreens?.() || [], game };
}

describe("pickup_object blind gate uses live Blind() (pickup.c:1817)", () => {
  it("582601 step 722 blasts the bare credit card; dknown stays 0", { timeout: 180000 }, async () => {
    const { screens, game } = await runPrefix("scen-sweep-Monk-582601", 723);
    assert.ok(screens.length > 722, `expected 723+ screens, got ${screens.length}`);
    const top722 = String(screens[722]).split("\n")[0];
    assert.equal(top722, "You are blasted by the credit card's power!--More--",
      `step 722 topline: ${JSON.stringify(top722.slice(0, 120))}`);
    // Mechanism: blind "," pickup must not observe the floor artifact.
    const { Blind } = await import("../js/invent.js");
    assert.equal(Blind(), true, "hero is blind (worn blindfold) at step 722");
    const { objects_at } = await import("../js/mkobj.js");
    let card = null;
    for (let x = 0; x < 80 && !card; x++) {
      for (let y = 0; y < 21 && !card; y++) {
        for (let o = objects_at(x, y); o; o = o.nexthere) {
          if (o.oartifact) card = o;
        }
      }
    }
    assert.ok(card, "blasted artifact still on the floor at step 722");
    assert.equal(card.dknown | 0, 0, "blind pickup leaves dknown=0 (C :1817 gate)");
  });
});
