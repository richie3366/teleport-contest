import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: do.c goto_level `:1776–1779` — `else if (Flying)` reads the
// youprop.h macro ((HFlying || EFlying || flying steed) && !BFlying over
// u.uprops[FLYING]). JS read the phantom u.Flying flat, which worn
// extrinsics never set, so a flying hero got «You descend the stairs.»
// instead of «You fly down the stairs.» (scen-sweep-Ranger-50255200
// s1308, D-4078). Single prefix per file (multi-prefix runSegment leaks
// module state).
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

describe("goto_level descent reads the live Flying macro (do.c)", () => {
  it("50255200 step 1308 flies down the stairs", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Ranger-50255200", 1309);
    const top = String(screens[1308]).split("\n")[0].replace(/\x1b\[(\d+)C/g, (_, n) => " ".repeat(+n));
    assert.ok(top.includes("You fly down the stairs."), JSON.stringify(top.slice(0, 80)));
  });
});
