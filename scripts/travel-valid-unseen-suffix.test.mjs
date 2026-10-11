import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: hack.c findtravelpath `:1395–1398` — one combined gate:
// test_move TEST_TRAV edge AND (seenv || (!Blind && couldsee)).
// The BFS destination terminates only INSIDE it, so an unseen,
// unremembered destination is never a valid travel point and
// getpos.c auto_describe `:657–658` prints " (no travel path)".
// JS tested the destination before the gate, so a TEST_TRAV-reachable
// but invisible cell (here a sensed "unseen creature" at seenv 0
// while blind) falsely validated and the suffix was dropped
// (scen-sweep-Wizard-95340 step 178: C «unseen creature
// (no travel path)» vs JS «unseen creature»).
describe("travel BFS destination needs the visibility gate (hack.c:1395-1398)", () => {
  it("unseen-creature travel describe keeps the no-path suffix", { timeout: 180000 }, async () => {
    const raw = JSON.parse(readFileSync(
      new URL("../hidden-corpus/recipes/scen-sweep-Wizard-95340.recipe.json", import.meta.url), "utf8"));
    const { runSegment } = await import("../js/jsmain.js");
    const m = new Map();
    const storage = {
      getItem: (k) => (m.has(k) ? m.get(k) : null),
      setItem: (k, v) => m.set(k, String(v)),
      removeItem: (k) => m.delete(k),
      get length() { return m.size; },
      key: (i) => [...m.keys()][i] ?? null,
    };
    const seg = raw.segments[0];
    const game = await runSegment({
      seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
      moves: seg.moves, storage,
    });
    const screens = (game.getScreens?.() || []).map((s) => String(s).split("\n"));
    const hit = screens.find((rows) => (rows[0] ?? "").startsWith("unseen creature (no travel path)"));
    assert.ok(hit, "travel-mode describe of the unseen creature carries the suffix");
  });
});
