import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: attrib.c is_innate `:889` innately(&u.uprops[propidx].intrinsic)
// → from_what `:947–948` « from your creature form» for a FROMFORM bit.
// JS is_innate returned FROM_NONE for any prop missing from its
// PROP_HFIELD table (FLYING, SWIMMING, TELEPAT, …), and innately() read
// only the flat H-field, so wizard-mode disclosure printed «You were
// flying.» for a polymorphed flyer (scen-sweep-Monk-50055080 s739,
// D-4089). Single prefix per file (multi-prefix runSegment leaks module
// state).
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

describe("from_what reads innateness for every prop (attrib.c)", () => {
  it("50055080 step 739 flying from your creature form", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-sweep-Monk-50055080", 740);
    const rows = String(screens[739]).split("\n");
    assert.ok(rows.some((r) => r.includes("You were flying from your creature form.")), JSON.stringify(rows.filter((r) => r.includes("flying"))));
  });
});
