import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const { runSegment } = await import("../js/jsmain.js");
const gstate = await import("../js/gstate.js");

// C ref: sp_lev.c lspo_level_flags "nomongen" `:3812-3813` →
// svl.level.flags.rndmongen = 0 (dat/tut-1.lua:30-31, dat/tut-2.lua:3-4
// level_flags), read by the makemon `:1168` gate
// `(!svl.level.flags.rndmongen && !ptr) → return NULL` (draw-free).
// scen-tutorial-Barbarian-94039 step 7: C drew rn2(20)@gethungry after the
// vetoed spawn; JS wrote a dead `nomongen` field, kept rndmongen=true and
// drew rn2(77)@makemon_rnd_goodpos (a monster C never spawns).
async function replayTo(id, step) {
  const recipe = JSON.parse(readFileSync(
    join(ROOT, `hidden-corpus/recipes/${id}.recipe.json`), "utf8"));
  const seg = recipe.segments[0];
  const mem = new Map();
  const storage = {
    getItem: (k) => (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => mem.set(k, String(v)),
    removeItem: (k) => mem.delete(k),
    get length() { return mem.size; },
    key: (i) => [...mem.keys()][i] ?? null,
  };
  const g = await runSegment({
    seed: seg.seed,
    datetime: seg.datetime,
    nethackrc: seg.nethackrc,
    moves: seg.moves.slice(0, step),
    storage,
  });
  return g;
}

describe("tutorial nomongen levels veto random monsters", () => {
  it("tut-1 loads with rndmongen=false (Barbarian-94039 s7)", async () => {
    await replayTo("scen-tutorial-Barbarian-94039", 7);
    // NB: read gstate.game at assertion time — runSegment rebinds it.
    assert.equal(gstate.game.level.flags.rndmongen, false);
  });
});
