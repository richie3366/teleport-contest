import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: potion.c dodip `:2286` — shortestname = (is_hands || is_plural(obj)
// || pair_of(obj)) ? "them" : "it"; obj.h pair_of = LENSES / gloves /
// boots. With flags.verbose off the pool prompt names the object by
// shortestname. JS tested only quan != 1 («pair_of deferred»), so a single
// pair of boots/gloves asked «Dip it into the moat?»
// (scen-worldtour-Monk-50650072 step 942, D-4069). Single prefix per file
// (multi-prefix runSegment leaks module state).
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

describe("dodip shortestname counts pair_of (potion.c:2286)", () => {
  it("50650072 step 942 pool prompt says them", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Monk-50650072", 943);
    const top = String(screens[942]).split("\n")[0];
    assert.ok(top.startsWith("Dip them into the moat?"), JSON.stringify(top.slice(0, 90)));
  });
});
