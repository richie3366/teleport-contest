import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: hack.c test_move `:1011–1016` — a Passes_walls hero phases through
// rock (`if (Passes_walls && may_passwall(x, y)) ;`), and findtravelpath's
// BFS edge test (`:1395`, TEST_TRAV) routes through it. JS's BFS edge test
// (cmd.js travel_test_move) omitted the :1014 arm (named omit), so a Xorn
// hero's travel detoured around rock instead of phasing: in
// scen-extcmd-Samurai-51257046 the (44,3)->(33,18) travel swung east past a
// dark room, sighting + memorizing unseen gold/ration, and step 493 showed
// `$`/`%` where C shows floor (D-4054). Single prefix per file
// (multi-prefix runSegment leaks module state).
async function runPrefix(recipeName, nmoves) {
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
    moves: seg.moves.slice(0, nmoves), storage,
  });
  const { game } = await import("../js/gstate.js");
  return { screens: handle.getScreens?.() || [], game };
}

describe("travel_test_move phases Xorn hero through rock (test_move :1014)", () => {
  it("51257046 step 493 shows C's floor, not memorized gold/ration", { timeout: 180000 }, async () => {
    const { screens, game } = await runPrefix("scen-extcmd-Samurai-51257046", 493);
    assert.ok(screens.length > 493, `expected 494+ screens, got ${screens.length}`);
    const rows = String(screens[493]).split("\n");
    assert.ok(!(rows[14] || "").includes("$"),
      `step 493 row 14 must not show gold: ${JSON.stringify((rows[14] || "").slice(0, 90))}`);
    assert.ok(!(rows[17] || "").includes("%"),
      `step 493 row 17 must not show food: ${JSON.stringify((rows[17] || "").slice(0, 90))}`);
    // Mechanism: the SW-diagonal travel never nears the dark room, so the
    // unseen cells keep floor memory (no $/% memorize).
    const mem13 = game.level?.at(48, 13)?.remembered_glyph;
    const mem16 = game.level?.at(48, 16)?.remembered_glyph;
    assert.notEqual(mem13?.ch, "$", "memory (48,13) is not gold");
    assert.notEqual(mem16?.ch, "%", "memory (48,16) is not food");
    // Travel still completes to C's target.
    assert.equal(game.u.ux, 33, "hero x at target");
    assert.equal(game.u.uy, 18, "hero y at target");
  });
});
