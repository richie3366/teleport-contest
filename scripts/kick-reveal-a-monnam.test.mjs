import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: dokick.c kick_monster `:173–174` — revealing a hidden or
// mimicking target prints There("is %s here.", a_monnam(mon)), the
// indefinite article. JS used mon_nam and printed "There is the small
// mimic here." (scen-sweep-Barbarian-50556029 s897, D-4097). Single
// prefix per file (multi-prefix runSegment leaks module state).
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

describe("kick_monster reveal names the target with a_monnam (dokick.c)", () => {
  it("50556029 step 897 prints 'There is a small mimic here.'", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Barbarian-50556029", 898);
    const row = String(screens[897]).split("\n")[0];
    assert.ok(row.includes("There is a small mimic here."), JSON.stringify(row));
  });
});
