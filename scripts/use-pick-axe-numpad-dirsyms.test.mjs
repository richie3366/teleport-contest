import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: dig.c use_pick_axe `:1123–1150` dirsyms via cmd_from_dir(dir,
// MV_WALK) through the live binds — ndir digits under number_pad (ndir
// "47896321><", phone "41236987><", cmd.c reset_commands `:3432–3435`).
// scen-symset-Barbarian-50950079 (number_pad:2) pins the machine-recorded
// C expectations: the step-269 chop prompt shows `[6>]` (east + down),
// and the recipe's 'h' reply is rejected with the cmdassist invalid-key
// help (letters are alpha commands under num_pad, not movement).
// Single prefix per file: multi-prefix runSegment calls in one process
// leak module-level state across games.
async function runPrefix(recipeName) {
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
    moves: seg.moves, storage,
  });
  return (game.getScreens?.() || []).join("\n");
}

describe("use_pick_axe: numpad dirsyms via live binds (dig.c)", () => {
  it("chop prompt shows [6>] and rejects 'h' with cmdassist", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-symset-Barbarian-50950079");
    assert.ok(screens.includes("In what direction do you want to chop? [6>]"),
      "C step-269 prompt: ndir digit for east under number_pad:2 (was [l>])");
    assert.ok(screens.includes("cmdassist: Invalid direction key!"),
      "C step-270: 'h' is not movement under num_pad (getdir rejects + help_dir)");
  });
});
