import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: invent.c hold_another_object `:1224–1230` — done() is noreturn: a
// fatal artifact touch (the blast kills the hero) never reaches
// obj_extract_self/dropy; the artifact stays on the floor where the "in
// case touching this object turns out to be fatal" place put it. JS kept
// going past death and re-dropped at zeroed hero coords, whose
// place_object impossible floated an input-exhaustion rejection that
// escaped runSegment and voided the run (0/0).
// (scen-genesis-Knight-50852027: debug ^W wish for "the Orb of Fate"
// blasts the Knight dead at step 17.)
// Single prefix per file (multi-prefix runSegment leaks module state).
async function runFull(sessionId) {
  const sess = JSON.parse(readFileSync(
    new URL(`../.cache/hidden/sessions/${sessionId}.session.json`, import.meta.url), "utf8"));
  const seg = sess.segments[0];
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
  return game.getScreens?.() || [];
}

const ID = "scen-genesis-Knight-50852027";
const top = (s) => String(s).split("\n")[0].replace(/\x1b\[[0-9;]*m/g, "");

describe("hold_another_object fatal touch stays on floor (invent.c:1224)", () => {
  it(`${ID}: wish-artifact blast kills; no off-map impossible; run completes`, { timeout: 240000 }, async () => {
    const screens = await runFull(ID);
    assert.ok(screens.length >= 32, `expected 32+ screens, got ${screens.length}`);
    assert.ok(top(screens[17]).includes("You are blasted by the glass orb"),
      `step 17 topline: ${JSON.stringify(top(screens[17]))}`);
    assert.ok(top(screens[18]).includes("You die..."),
      `step 18 topline: ${JSON.stringify(top(screens[18]))}`);
    for (const [i, s] of screens.entries()) {
      assert.ok(!top(s).includes("Program in disorder"),
        `step ${i} fired impossible: ${JSON.stringify(top(s))}`);
    }
  });
});
