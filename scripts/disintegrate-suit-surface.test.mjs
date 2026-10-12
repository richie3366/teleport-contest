import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: do_wear.c disintegrate_arm suit arm `:3226-3229` —
// `urgent_pline("Your %s %s to dust and %s to the %s!", suit,
// vtense(suit,"turn"), vtense(suit,"fall"), surface(u.ux,u.uy))`.
// JS hardcoded "to the ground!" (scen-sweep-Barbarian-582708 step 472:
// C «falls to the floor!» vs JS «falls to the ground!» — the hero is
// disintegrated in a ROOM, so C surface() says "floor").
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

describe("disintegrate_arm suit arm reads live surface() (do_wear.c:3226)", () => {
  it("582708 step 472 mail falls to the floor, not the ground", { timeout: 180000 }, async () => {
    const { screens, game } = await runPrefix("scen-sweep-Barbarian-582708", 473);
    assert.ok(screens.length > 472, `expected 473+ screens, got ${screens.length}`);
    const top472 = String(screens[472]).split("\n")[0]
      .replace(/\x1b\[[0-9;]*[A-Za-z]/g, "");
    assert.equal(top472,
      "Your mail turns to dust and falls to the floor!  You stop searching.--More--",
      `step 472 topline: ${JSON.stringify(top472.slice(0, 120))}`);
    // Mechanism: the hero stands in a ROOM at the blast, so surface() is "floor".
    const { surface } = await import("../js/sit.js");
    assert.equal(surface(game.u.ux, game.u.uy), "floor",
      `surface at hero (${game.u.ux},${game.u.uy})`);
  });
});
