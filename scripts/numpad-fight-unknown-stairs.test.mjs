import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: cmd.c rhack `:3693` prefix gate (call-local prefix_seen) +
// `:3833–3841` bad_command arm (no reset). Unknown returns with
// forcefight set, but the NEXT rhack call has prefix_seen NULL, so a
// bound key runs normally with the F gate off — C runs '>' as dodown
// ("You can't go down here."), it does not print the '-' prefix error.
// A gate reading the persistent forcefight over-fires here. Pins the
// machine-recorded C expectation: scen-symset-Monk-50059064 step 32
// (do_fight row; C steps 0..32 never print "other than up or down").
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

describe("num_pad: F gate is call-local across Unknown (cmd.c rhack)", () => {
  it("post-Unknown '>' runs dodown, no prefix error", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-symset-Monk-50059064", 33);
    assert.ok(screens.includes("You can't go down here."),
      "C step-32 topline: '>' runs dodown with the F gate off");
    assert.ok(!screens.includes("other than up or down"),
      "no F-prefix gate error anywhere in C steps 0..32");
  });
});
