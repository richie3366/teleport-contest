import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: sp_lev.c create_monster `:2125` — `mtmp->female = m->female`
// after every des.monster spawn. A des.monster({x,y}) table with no id
// and no "female" key keeps tmpmons.female = 0 (`:3299` BOOL_RANDOM
// default, `:3349–3353` skipped with mgend NEUTRAL, `:3356–3357`
// safety net), clobbering the makemon birth draw — C-verified by a
// temp-recorder FEMLOG: all 28 bigrm-3 spawns (dungeon level 10,
// scen-sweep-Barbarian-582719 step 432) log female=0 at sp_lev.c:2127.
// The load_bigrm_3 hand mirror (js/mklev.js) called bare
// makemon(null, x, y, 0) and kept the birth draw, so 11 of the 28
// printed female where C prints male — first visible at step 623 as
// «The hobbit zaps herself with an oak wand!» vs C «himself»
// (m_id 1136). Fix: `if (mtmp) mtmp.female = 0` after the makemon,
// mirroring the sibling class-letter clobbers (D-0873 shape).
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

describe("bigrm-3 des.monster clobbers female to 0 (sp_lev.c:2125)", () => {
  it("582719 step 623 zaps himself; des-spawns male, ordinary kept", { timeout: 180000 }, async () => {
    const { screens, game } = await runPrefix("scen-sweep-Barbarian-582719", 623);
    assert.ok(screens.length > 623, `expected 624+ screens, got ${screens.length}`);
    const top623 = String(screens[623]).split("\n")[0];
    assert.ok(top623.includes("The hobbit zaps himself with an oak wand!"),
      `step 623 topline: ${JSON.stringify(top623.slice(0, 120))}`);
    // Mechanism: every bigrm-3 des.monster survivor (C FEMLOG m->female=0)
    // reads female=0; 1147 is an ordinary (non-des) birth kept at 1.
    const byId = new Map((game.fmon || []).map((m) => [m.m_id, m]));
    const des = [1102, 1111, 1112, 1114, 1117, 1118, 1120, 1126, 1128,
      1131, 1133, 1134, 1136, 1140, 1142, 1148, 1152, 1155, 1156, 1159,
      1162, 1166, 1169];
    for (const id of des) {
      const m = byId.get(id);
      assert.ok(m, `des-spawn m_id ${id} present at step 623`);
      assert.equal(m.female | 0, 0, `des-spawn m_id ${id} female=0`);
    }
    assert.equal(byId.get(1147)?.female | 0, 1, "ordinary birth 1147 kept female=1");
  });
});
