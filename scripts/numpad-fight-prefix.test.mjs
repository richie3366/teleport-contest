import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: cmd.c rhack `:3693–3716` prefix gate + commands_init `:2772`
// bind_key('-', "fight"). Under num_pad '-' is the fight prefix and the
// reject names visctrl(cmd_from_func(do_fight)) = '-' (newest printable
// bind wins), so C prints "The '-' prefix should be followed by a
// movement command." — not 'F'. JS hardcoded 'F' and classified the
// following restored letter as movement. Pins the machine-recorded C
// expectation: scen-symset-Archeologist-50059076 step 10 (rhack row).
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

describe("num_pad: '-' fight-prefix reject names '-' (cmd.c rhack)", () => {
  it("numpad '-' + non-movement prints C's '-' reject", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-symset-Archeologist-50059076", 14);
    assert.ok(screens.includes(
      "The '-' prefix should be followed by a movement command."),
      "C step-10 topline: '-' names itself via cmd_from_func, not 'F'");
  });
});
