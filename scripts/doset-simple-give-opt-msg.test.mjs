import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: options.c doset_simple `:8722–8733` — give_opt_msg FALSE around
// the pick loop, restored TRUE unconditionally on exit. JS restored the
// previous value, so a FALSE poisoned by an earlier full-doset
// idlecheckpoint toggle (`:5318`) survived every later simple menu and
// muted all later full-doset "'%s' option toggled %s." plines
// (scen-options-Tourist-585611 step 102: C prints
// "'dropped_nopick' option toggled off.", JS printed nothing while the
// toggle itself applied). Single prefix per file (multi-prefix
// runSegment leaks module state).
async function runPrefix(recipeName, nmoves) {
  const raw = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/recipes/${recipeName}.recipe.json`, import.meta.url), "utf8"));
  const seg = raw.segments[0];
  const { runSegment } = await import("../js/jsmain.js");
  const gstate = await import("../js/gstate.js");
  const m = new Map();
  const storage = {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    get length() { return m.size; },
    key: (i) => [...m.keys()][i] ?? null,
  };
  const handle = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, nmoves), storage,
  });
  return { handle, gstate };
}

describe("doset_simple restores give_opt_msg TRUE like C (options.c:8733)", () => {
  it("585611 step 102 prints the dropped_nopick toggle message", { timeout: 180000 }, async () => {
    const { handle, gstate } = await runPrefix("scen-options-Tourist-585611", 102);
    const screens = handle.getScreens();
    const topline = screens[screens.length - 1].split("\n")[0];
    assert.ok(
      topline.includes("'dropped_nopick' option toggled off."),
      `step 102 topline: ${JSON.stringify(topline)} (C: "'dropped_nopick' option toggled off.")`);
    assert.equal(gstate.game.flags?.nopick_dropped, false,
      "toggle applied: flags.nopick_dropped");
    assert.equal(gstate.game.give_opt_msg, true,
      "doset_simple exit restored give_opt_msg TRUE (C :8733)");
  });
});
