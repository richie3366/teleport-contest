import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { decodeScreen } from "../frozen/screen-decode.mjs";

// C ref: trap.c feeltrap `:3588–3594` — "like seetrap() but overrides
// vision": tseen = 1, then map_trap(trap, 1) paints the trap glyph and
// records it in memory UNCONDITIONALLY, then newsym re-covers it with
// any visible monster/object ("in case it's beneath something,
// redisplay the something"). JS marked tseen and called newsym only,
// so a felt-but-unseen trap (blind hero, or pit-vision 3x3 looking at
// a farther cell) never painted: newsym's !cansee arm re-showed stale
// memory (blank/floor/object) where C shows ^.
//
// scen-sweep-Knight-620053 step 555: pitted hero zaps digging east;
// the beam skips the conjoined pit at (8,17) and digs a new pit at
// (9,17) onto a gnome C cannot see (!couldsee outside pit vision).
// digactualhole takes the !cansee madeby_u arm → feeltrap. C paints
// ^ at row 18 col 8; JS showed blank (Ranger/Valkyrie/Barbarian probes
// show the same writer with object/floor/blank memories).
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

describe("feeltrap paints unseen traps via map_trap (trap.c:3591)", () => {
  it("Knight-620053 step 555 shows the felt pit ^ at row 18 col 8", { timeout: 180000 }, async () => {
    const { screens, game } = await runPrefix("scen-sweep-Knight-620053", 556);
    assert.ok(screens.length > 555, `expected 556+ screens, got ${screens.length}`);
    const g = decodeScreen(screens[555] || "");
    assert.equal(g[18][8].ch, "^",
      `row 18 col 8: ${JSON.stringify(g[18].map((c) => c.ch).join("").trimEnd())}`);
    // Mechanism (C map_trap `:301–304`): memory records the trap glyph,
    // and the trap is marked seen.
    const cell = game.level?.at(9, 17);
    assert.equal(cell?.remembered_glyph?.ch, "^",
      `memory at (9,17): ${JSON.stringify(cell?.remembered_glyph)}`);
    const traps = game.level?.traps ?? [];
    const pit = traps.find((t) => t && (t.tx | 0) === 9 && (t.ty | 0) === 17);
    assert.ok(pit && pit.tseen, `expected seen pit at (9,17), got ${JSON.stringify(pit)}`);
  });
});
