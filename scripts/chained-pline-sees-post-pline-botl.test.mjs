import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: pickup.c encumber_msg :1977–2020 + pline.c vpline :243–290 +
// display.c flush_screen :2236–2239 + dothrow.c throw_obj :267–271 +
// attrib.c exercise :516–517. C is synchronous: the stamina-drop's
// exercise-tail encumber_msg (2→1) fully completes — pline, More,
// disp.botl=TRUE (:2016) — before hitfloor's pline flushes, so that
// flush repaints Burdened and the floor-More screen (which still shows
// the «slowed slightly» topline) carries Burdened. JS floats exercise's
// encumber_msg and chains the floor pline on the D-3830 vpline tail,
// which releases in vpline's finally — before the caller's post-pline
// botl commit — so the floor flush missed botl and painted Stressed.
// Single prefix per file (multi-prefix runSegment leaks module state).
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
  const handle = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, nmoves), storage,
  });
  const { game } = await import("../js/gstate.js");
  const { near_capacity } = await import("../js/invent.js");
  return { screens: handle.getScreens?.() || [], game, near_capacity };
}

describe("chained pline sees the outer message's post-pline botl (pline.c vpline chain)", () => {
  it("610117 step 1013: slowed-More screen carries Burdened", { timeout: 180000 }, async () => {
    const { screens, game, near_capacity } =
      await runPrefix("scen-sweep-Valkyrie-610117", 1014);
    assert.ok(screens.length > 1012, `expected 1013+ screens, got ${screens.length}`);
    const top1012 = String(screens[1012]).split("\n")[0];
    assert.equal(top1012, "Your movements are only slowed slightly by your load.--More--",
      `step 1013 topline: ${JSON.stringify(top1012.slice(0, 100))}`);
    const row1012 = String(screens[1012]).split("\n")[23];
    assert.equal(row1012, "Dlvl:1 $:0 HP:9(59) Pw:9(9) AC:6 Xp:6 Burdened",
      `step 1013 row23 (Burdened, not stale Stressed): ${JSON.stringify(row1012)}`);
    // Mechanism: the lance left inventory (cap already 1); only the
    // paint timing was wrong.
    assert.equal(near_capacity(), 1, "near_capacity() is 1 (Burdened) at the divergence");
    assert.equal(game.oldcap | 0, 1, "game.oldcap committed the 2->1 crossing");
  });
});
