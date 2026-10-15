import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: cmd.c rhack bad_command `:3833–3841` (Unknown pline, 2×
// cmdq_clear, sanity skip, move FALSE, multi 0 — no reset, no
// end_running) + EOT `:262–263` (`flags.time && !context.run` gates
// time_botl). With OPTIONS=number_pad, '5' is the run prefix (do_run:
// run=3, DOMOVE_RUSH) and '0' is unbound, so '5'+'0' leaves run stuck
// at 3 in C; every later EOT suppresses time_botl and the status line
// lags. JS's Unknown arm ran a house end_running (D-3953 omission 1),
// clearing run and repainting fresh. Pins scen-symset-Caveman-50359027:
// step 82 "Unknown command '0'.", step 83 "You find a small mimic."
// with a STALE T:5 (pre-fix JS painted fresh T:6).
// Single runSegment per file: module-level state leaks across games.
describe("num_pad Unknown keeps run stuck, EOT suppresses time_botl (cmd.c rhack)", () => {
  it("Caveman-50359027 step 83 keeps stale T:5 after '5'+'0'", { timeout: 280000 }, async () => {
    const raw = JSON.parse(readFileSync(
      new URL("../hidden-corpus/recipes/scen-symset-Caveman-50359027.recipe.json", import.meta.url), "utf8"));
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
    const screens = game.getScreens();
    assert.ok(screens.length > 83, `expected >83 screens, got ${screens.length}`);
    const s82 = String(screens[82]).split("\n");
    assert.equal(s82[0], "Unknown command '0'.", `step-82 topline: ${JSON.stringify(s82[0])}`);
    const s83 = String(screens[83]).split("\n");
    assert.equal(s83[0], "You find a small mimic.", `step-83 topline: ${JSON.stringify(s83[0])}`);
    assert.ok(s83[23].endsWith("T:5"), `step-83 status keeps stale T:5: ${JSON.stringify(s83[23])}`);
  });
});
