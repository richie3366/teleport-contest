import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

// C ref: potion.c potionhit `:1636–1637` — a potion hitting the hero
// "crashes on your %s", body_part(HEAD), so a headless polymorphed hero
// reads "body" (or a vortex "central core"). JS hardcoded "head"
// (scen-sweep-Knight-50055042 s588, D-4100). Single prefix per file
// (multi-prefix runSegment leaks module state).
function recipePath(name) {
  for (const d of ["recipes", "recipes-reserve", "recipes-archive"]) {
    const u = new URL(`../hidden-corpus/${d}/${name}.recipe.json`, import.meta.url);
    if (existsSync(u)) return u;
  }
  throw new Error(`no recipe ${name}`);
}
async function runPrefix(recipeName, nmoves) {
  const raw = JSON.parse(readFileSync(recipePath(recipeName), "utf8"));
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

describe("potionhit names the hero's head via body_part (potion.c)", () => {
  it("50055042 step 588 says 'crashes on your body'", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Knight-50055042", 589);
    const row = String(screens[588]).split("\n")[0];
    assert.ok(row.includes("crashes on your body"), JSON.stringify(row));
  });
});
