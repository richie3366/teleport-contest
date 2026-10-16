import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: cmd.c reset_commands `:3432–3436` + `:3463` — live dirchars under
// number_pad are ndir digits, so hjkl are unbound there: movecmd fails,
// matching[] finds no feature, and getpos prints "Unknown direction"
// naming the digit binds (getpos.c `:1116–1128`, force loops via nxtc).
// JS used to walk hjkl and autodescribe the landing cell.
// (scen-symset-Monk-50350087 step 612, D-4042).
// Single prefix per file (multi-prefix runSegment leaks module state).
async function runFull(recipeName) {
  const raw = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/recipes-reserve/${recipeName}.recipe.json`, import.meta.url), "utf8"));
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
  const handle = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves, storage,
  });
  const { game } = await import("../js/gstate.js");
  return { screens: handle.getScreens?.() || [], game };
}

describe("getpos hjkl under number_pad is Unknown direction (getpos.c:1116-1128)", () => {
  it("50350087 step 612 names the digit binds, not a walk-describe", { timeout: 180000 }, async () => {
    const { screens, game } = await runFull("scen-symset-Monk-50350087");
    assert.ok(screens.length > 612, `expected 613+ screens, got ${screens.length}`);
    const top = String(screens[612]).split("\n")[0];
    assert.equal(top, "Unknown direction: 'j' (use '4', '2', '8', '6' or '.').",
      `step 612 topline: ${JSON.stringify(top.slice(0, 80))}`);
    // Mechanism: number_pad:1 sets iflags.num_pad (optfn), so the walk
    // table is ndir and 'j' is unbound.
    assert.equal(game.iflags?.num_pad, true, "iflags.num_pad set from rc");
  });
});
