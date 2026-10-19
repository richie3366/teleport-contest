import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: hack.c nomul `:4160–4173` resets multi_reason only; nomovemsg is
// cleared by unmul and done_eating. lesshungry `:3315` stores "You're
// finally finished." on the first bite; a monster attack then runs
// stop_occupation → maybe_finished_meal → done_eating, which prints it.
// JS nomul(0) cleared nomovemsg on the way, so done_eating printed "You
// finish eating the cram ration." (scen-sweep-Archeologist-50055004 s591).
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
  return handle.getScreens?.() || [];
}

describe("nomul(0) keeps nomovemsg for done_eating (hack.c/eat.c)", () => {
  it("50055004 step 591 prints lesshungry's finished message", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Archeologist-50055004", 592);
    const row = String(screens[591]).split("\n")[0];
    assert.ok(row.includes("You're finally finished."), JSON.stringify(row));
  });
});
