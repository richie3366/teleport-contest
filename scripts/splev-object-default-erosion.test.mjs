import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: sp_lev.c create_object `:2273–2283` — a des.object() record with
// no "eroded" field resets oeroded/oeroded2/oerodeproof after mkobj_at,
// so a class-only object never keeps mkobj_erosions' random damage. JS's
// hand-rolled loaders used a mkobj_at+stackobj stand-in that skipped the
// create_object tail; bigrm-8's leather armor stayed rotted and the
// hobgoblin "puts on a rotted leather armor" (scen-symset-Archeologist-
// 50058510 s316, D-4096). Single prefix per file (multi-prefix runSegment
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
  return handle.getScreens?.() || [];
}

describe("des.object() resets erosion via create_object (sp_lev.c)", () => {
  it("50058510 step 316 names an uneroded leather armor", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-symset-Archeologist-50058510", 317);
    const row = String(screens[316]).split("\n")[0];
    assert.ok(row.includes("puts on a leather armor"), JSON.stringify(row));
  });
});
