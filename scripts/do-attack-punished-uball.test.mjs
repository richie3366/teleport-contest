import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: uhitm.c do_attack safemon arm `:469–501` — `foo = Punished ||
// !rn2(7) || …`; youprop.h:77 Punished ≡ (uball != 0). A punished hero
// moving into a pet short-circuits before rn2(7): monflee(rnd(6)) +
// "You stop.  <Pet> is in the way!". JS read a never-written u.Punished
// flat, drew rn2(7) and swapped places (scen-sweep-Ranger-50250049
// step 953, D-4057). Single prefix per file (multi-prefix runSegment
// leaks module state).
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

describe("do_attack safemon arm reads live Punished (uball), not a flat (uhitm.c:469-501)", () => {
  it("50250049 step 953 stops at the pet instead of swapping", { timeout: 180000 }, async () => {
    const { screens, game } = await runPrefix("scen-sweep-Ranger-50250049", 954);
    assert.ok(screens.length > 953, `expected 954+ screens, got ${screens.length}`);
    const top = String(screens[953]).split("\n")[0];
    assert.ok(top.startsWith("You stop.  Your jackal is in the way!"),
      `step 953 topline: ${JSON.stringify(top.slice(0, 80))}`);
    assert.ok(game.u.uball, "hero is punished (uball set)");
  });
});
