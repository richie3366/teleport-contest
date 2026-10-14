import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: cmd.c rhack `:3829–3841` bad_command arm + reset_commands
// `:3439–3472` num_pad restore. With OPTIONS=number_pad the sdir letters
// are unbound (restored to commands_init binds; 'K' has none), so C
// prints "Unknown command 'K'." via custompline(SUPPRESS_HISTORY).
// JS classified 'K' as run-north via a num_pad-blind isRunKey and moved
// silently. Pins the machine-recorded C expectation: scen-symset-
// Archeologist-50058510 step 3 (cliffs-head update_rest_on_space row —
// that owner is a cmd.c:3498 comment-text misattribution; the writer is
// rhack's num_pad dispatch).
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

describe("num_pad: unbound movement letter is Unknown command (cmd.c rhack)", () => {
  it("numpad 'K' prints C's Unknown command", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-symset-Archeologist-50058510", 4);
    assert.ok(screens.includes("Unknown command 'K'."),
      "C step-3 topline for the unbound run-north letter under number_pad");
  });
});
