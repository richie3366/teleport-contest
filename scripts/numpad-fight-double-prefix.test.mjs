import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: cmd.c rhack `:3833–3841` bad_command arm + do_fight `:1622–1634`.
// C's Unknown arm prints, clears the two cmd queues, skips sanity, sets
// move FALSE / multi 0 — it never clears forcefight. So F, unbound key,
// F doubles: the second do_fight sees forcefight still set and prints
// "Double fight prefix, canceled." JS cleared forcefight on Unknown, so
// the second F set silently. Pins the machine-recorded C expectation:
// scen-symset-Archeologist-50155056 step 6 (do_fight row).
// Single prefix per file: multi-prefix runSegment calls in one process
// leak module-level state across games.
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
  const game = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, nmoves), storage,
  });
  return (game.getScreens?.() || []).join("\n");
}

describe("num_pad: F/unbound/F doubles the fight prefix (cmd.c rhack)", () => {
  it("Unknown keeps forcefight so the second F cancels", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-symset-Archeologist-50155056", 7);
    assert.ok(screens.includes("Double fight prefix, canceled."),
      "C step-6 topline: forcefight survives the Unknown arm");
  });
});
