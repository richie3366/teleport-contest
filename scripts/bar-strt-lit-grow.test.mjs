import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: sp_lev.c lspo_region argc=2 `:5619–5632` — region(selection,"lit")
// grows the selection W_ANY before sel_set_lit (lava-or-rlit); "unlit"
// does not grow. dat/Bar-strt.lua:48 lights area(00,00,75,19), whose grown
// fringe covers map row y0.
// JS load_bar_strt (mklev.js) painted the 10 des.region rects with an
// ungrown barLit helper, so pre-flip y0 stayed unlit (map app sets
// lit=false, barLit never covered y0 with my=1) and the post-flip arrival
// screen hid the y0 floor: scen-questtour-Barbarian-50850038 step 11/153
// kind=screen at teleport.c:1427, RNG fully in sync (5555/5555), row 1
// C `\x1b[23C\x0e~~~~~\x0f` (5 floor cells) vs JS blank.
// Pins the machine-recorded C expectation: JS row 1 shows the 5 floor
// cells once the mirror uses the grown light_region helper.
const ID = "scen-questtour-Barbarian-50850038";

function sharedStorage() {
  const mem = new Map();
  return {
    getItem: (k) => (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => mem.set(k, String(v)),
    removeItem: (k) => mem.delete(k),
    get length() { return mem.size; },
    key: (i) => [...mem.keys()][i] ?? null,
  };
}

describe("Bar-strt lit grows W_ANY like lspo_region (Bar-strt.lua:48)", () => {
  it(`${ID}: arrival screen shows the grown-fringe y0 floor`, { timeout: 180000 }, async () => {
    const raw = JSON.parse(readFileSync(
      new URL(`../hidden-corpus/recipes/${ID}.recipe.json`, import.meta.url), "utf8"));
    const seg = raw.segments[0];
    const { runSegment } = await import("../js/jsmain.js");
    // Slice past the step-11 arrival (prefix-deterministic through it).
    const game = await runSegment({
      seed: seg.seed, datetime: seg.datetime,
      nethackrc: seg.nethackrc, moves: seg.moves.slice(0, 40),
      storage: sharedStorage(),
    });
    const screens = game.getScreens?.() || [];
    assert.ok(screens.length > 11, `want screens past 11, got ${screens.length}`);
    const rows = String(screens[11]).split("\n");
    assert.ok(rows[0].includes("You materialize on a different level!"),
      `screen 11 is the arrival, got ${JSON.stringify(rows[0]).slice(0, 80)}`);
    assert.match(rows[1] ?? "", /·{5}/,
      `row 1 shows the 5 grown-fringe floor cells, got ${JSON.stringify(rows[1]).slice(0, 80)}`);
  });
});
