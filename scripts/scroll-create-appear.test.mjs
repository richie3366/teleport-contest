import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: muse.c MUSE_SCR_CREATE_MONSTER `:1018-1021` — a monster reading a
// scroll of create monster calls makemon(pm, cc, NO_MM_FLAGS) whose in-body
// appear Norep (makemon.c:1476-1500) prints "X suddenly appears close by!"
// when (canseemon && ap) || sensemon. JS makemon is sync so callers wire the
// async tail via makemon_appear_msg (D-0559; wand-arm sibling); the scroll
// arm forgot it, dropping 4 sensed summons' lines at 95211 steps 328-331.
// The 4 missing --More-- pages bundled C-328..332 into one JS step (JS slice
// 328 = 19291 draws = C-328..332 concatenated), shifting every later screen
// -4 (d/t/w "early" at 328; input-shift RNG death at 704). Pins the
// machine-recorded C toplines at steps 328-333.
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
  const game = await runSegment({
    seed: seg.seed, datetime: seg.datetime, nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, nmoves), storage,
  });
  return game.getScreens?.() || [];
}

const strip = (s) => String(s).replace(/\[[0-9;?]*[A-Za-z]/g, "");

describe("scroll create-monster appear lines (muse.c:1018-1021)", () => {
  it("95211 steps 328-333 match C, no bundled step", { timeout: 180000 }, async () => {
    const screens = await runPrefix("scen-worldtour-Caveman-95211", 340);
    assert.ok(screens.length > 333, `expected 334+ screens, got ${screens.length}`);
    const row = (i, r) => strip(screens[i]).split("\n")[r];
    assert.ok(row(328, 0).includes("incant VELOX NEB"),
      `step 328 topline: ${JSON.stringify(row(328, 0))}`);
    assert.ok(!row(328, 2).includes("d"),
      `step 328 row2 must not show d yet: ${JSON.stringify(row(328, 2))}`);
    assert.ok(row(329, 0).includes("pit viper suddenly appears close by"),
      `step 329 topline: ${JSON.stringify(row(329, 0))}`);
    assert.ok(row(330, 0).includes("lurker above suddenly appears close by"),
      `step 330 topline: ${JSON.stringify(row(330, 0))}`);
    assert.ok(row(331, 0).includes("winter wolf suddenly appears close by"),
      `step 331 topline: ${JSON.stringify(row(331, 0))}`);
    assert.ok(row(332, 0).includes("long worm suddenly appears close by"),
      `step 332 topline: ${JSON.stringify(row(332, 0))}`);
    assert.ok(row(333, 0).includes("Relinquish the amulet"),
      `step 333 topline: ${JSON.stringify(row(333, 0))}`);
  });
});
