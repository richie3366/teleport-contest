import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: botl.c bot() `:252–269` is the only WIN_STATUS painter; bones.c
// getbones() `:670–677` asks the wizard "Get bones?" mid-level-gen,
// before the first bot() — so C's status rows are empty at that prompt.
// JS `_buildScreenOutput` live-committed status when no bot() had run yet
// (D-3750), painting "Wizard the Troglodyte ..." on rows 22–23.
// Pins the machine-recorded C expectation at scen-chain-Archeologist-95418
// seg2 step 0 (board): the bones-prompt screen shows only the question.
describe("pre-first-bot status stays blank at bones prompt (botl.c:252-269)", () => {
  it("Get bones? screen has empty status rows", { timeout: 180000 }, async () => {
    const raw = JSON.parse(readFileSync(
      new URL("../hidden-corpus/recipes/scen-chain-Archeologist-95418.recipe.json", import.meta.url), "utf8"));
    const { runSegment } = await import("../js/jsmain.js");
    const m = new Map();
    const storage = {
      getItem: (k) => (m.has(k) ? m.get(k) : null),
      setItem: (k, v) => m.set(k, String(v)),
      removeItem: (k) => m.delete(k),
      get length() { return m.size; },
      key: (i) => [...m.keys()][i] ?? null,
    };
    // Chain prefix shares storage (scorer shape): seg0+seg1 deaths leave
    // the bones seg2's startup finds.
    for (const i of [0, 1]) {
      const seg = raw.segments[i];
      await runSegment({
        seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
        moves: seg.moves, storage,
      });
    }
    const seg2 = raw.segments[2];
    const game = await runSegment({
      seed: seg2.seed, datetime: seg2.datetime, nethackrc: seg2.nethackrc,
      moves: seg2.moves, storage,
    });
    const screens = game.getScreens?.() || [];
    const bones = screens.map((s) => String(s).split("\n"))
      .find((rows) => rows[0].startsWith("Get bones?"));
    assert.ok(bones, "bones-prompt screen captured");
    assert.equal((bones[22] ?? "").trim(), "",
      "row 22 blank before first bot()");
    assert.equal((bones[23] ?? "").trim(), "",
      "row 23 blank before first bot()");
  });
});
