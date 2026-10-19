import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: options.c dotogglepickup `:9262–9272` — `pline("Autopickup: %s.",
// buf)` passes buf as an argument, so a pickup_types class string holding
// '%' (food) prints literally. JS interpolated buf into the format, and
// vpline's vsnprintf read «% o» as a space-flag octal → «for 0bjects.»
// (scen-symset-Knight-50555046 s461, D-4076). Single prefix per file
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

describe("dotogglepickup passes buf as a %s argument (options.c)", () => {
  it("50555046 step 461 shows «for % objects»", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-symset-Knight-50555046", 462);
    const top = String(screens[461]).split("\n")[0].replace(/\x1b\[(\d+)C/g, (_, n) => " ".repeat(+n));
    assert.ok(top.includes("Autopickup: ON, for % objects."), JSON.stringify(top.slice(0, 80)));
  });
});
