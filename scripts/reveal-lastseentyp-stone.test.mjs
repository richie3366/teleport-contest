import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen, renderCell } from "../frozen/screen-decode.mjs";

// C ref: detect.c reveal_terrain_getglyph `:2249` — after the strip arm,
// `lastseentyp == typ` takes the live back_to_glyph, anything else fakes
// the remembered typ (fake STONE renders blank). There is no `!last`
// exception: 0 IS stone, and it is the live lastseentyp value at
// premapped-but-never-vision-mapped cells (premap_detect's
// map_background/map_object never call update_lastseentyp — display.c's
// only writers are magic_map_background, the _map_location vision macro,
// and the two hero-spot sites).
// scen-sweep-Samurai-582701 step 1814 ('b' terrain view on Sokoban soko4):
// 11 never-seen boulder cells (last=0, seenv=SVALL, live boulder) paint
// blank stone in C; JS painted live floor via `|| !last`.
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
  return { screens: handle.getScreens?.() || [], game };
}

describe("reveal_terrain_getglyph lastseentyp==typ has no zero exception (detect.c:2249)", () => {
  it("582701 step 1814 paints stone under unseen Sokoban boulders", { timeout: 300000 }, async () => {
    const { screens, game } = await runPrefix("scen-sweep-Samurai-582701", 1814);
    assert.ok(screens.length > 1814, `expected 1815+ screens, got ${screens.length}`);
    const grid = decodeScreen(screens[1814]);
    const row0 = grid[0].map((c) => renderCell(c)).join("").trimEnd();
    assert.equal(row0,
      "Showing known terrain and traps only...  (For instructions type a '?')",
      `step 1814 topline: ${JSON.stringify(row0.slice(0, 100))}`);
    // C row 8: `│·· ····  ·┌┤^│` — blanks where the never-seen boulders
    // strip to fake stone (screen col = map x - 1).
    for (const c of [35, 40, 41]) {
      assert.equal(renderCell(grid[8][c]), " ",
        `row8 col${c} is blank stone, got ${JSON.stringify(renderCell(grid[8][c]))}`);
    }
    // Mechanism: premapped (seenv set, boulder memory) but never
    // vision-mapped (lastseentyp 0), with a live boulder on top.
    const lvl = game.level;
    const loc = lvl.at(36, 7);
    assert.equal(loc.seenv & 0xff, 255, "seenv is SVALL (premap)");
    assert.equal(game.lastseentyp?.[36]?.[7] | 0, 0, "lastseentyp is 0 (never vision-mapped)");
    assert.equal(loc.remembered_glyph?.ch, "`", "memory holds the boulder");
    const { objects_at } = await import("../js/mkobj.js");
    assert.ok(objects_at(36, 7), "live boulder on the cell");
    // Control: the 12th boulder (40,13) was vision-mapped at entry
    // (last=ROOM), so both sides strip it to live floor here.
    assert.equal(game.lastseentyp?.[40]?.[13] | 0, 25, "control lastseentyp is ROOM");
    assert.equal(renderCell(grid[14][39]), "·", "control cell paints floor");
  });
});
