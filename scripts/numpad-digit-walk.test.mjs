import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: cmd.c reset_commands `:3461–3472` num_pad bind — ndir digits
// walk (do_move_*), '0' has no bind (no extcmdlist '0', no ndir slot).
// The "10s" opener of scen-symset-Archeologist-50058507 therefore walks
// southwest ('1'), prints Unknown ('0'), then searches ('s'). JS treated
// digits as count bumps under num_pad. Pins the machine-recorded C
// expectations: step-1 "It's a wall." (the SW step meets a wall) and the
// '0' Unknown from C's bind table + `:3833–3841` bad_command arm.
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

describe("num_pad: digits walk, '0' is Unknown (cmd.c rhack)", () => {
  it("'1' walks into the wall, '0' is Unknown", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-symset-Archeologist-50058507", 3);
    assert.ok(screens.includes("It's a wall."),
      "C step-1 topline: the '1' step southwest meets a wall");
    assert.ok(screens.includes("Unknown command '0'."),
      "'0' is unbound under number_pad (no extcmdlist row, no ndir slot)");
    assert.ok(!screens.includes("Count:"),
      "digits are commands under num_pad, never counts");
  });
});
