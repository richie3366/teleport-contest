import { describe, it } from "node:test";
import assert from "node:assert/strict";

// runSegment drive loop: input exhaustion outside moveloop_core iterations
// (inside nhGame.start() — askname/player_selection prompts) ends the
// segment with what was captured, the same as exhaustion inside the loop
// (C would block on input; the harness has none). Previously it escaped
// runSegment and voided the run (0/0) instead of comparing.
// Single runSegment per file (multi-prefix runSegment leaks module state).
async function runNamelessStart() {
  const { runSegment } = await import("../js/jsmain.js");
  const m = new Map();
  const storage = {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    get length() { return m.size; },
    key: (i) => [...m.keys()][i] ?? null,
  };
  return runSegment({
    seed: 1,
    datetime: "20000110090000",
    nethackrc: "OPTIONS=!legacy\n",
    moves: "",
    storage,
  });
}

describe("runSegment input exhaustion during start()", () => {
  it("startup prompt with no input returns partial game, not a throw", { timeout: 240000 }, async () => {
    const game = await runNamelessStart();
    const screens = game.getScreens?.() || [];
    assert.ok(Array.isArray(screens), "expected getScreens() array");
  });
});
