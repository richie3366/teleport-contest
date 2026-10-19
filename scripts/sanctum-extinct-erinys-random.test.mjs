import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: sp_lev.c create_monster `:1949–1953` — `if (g_mvflags & G_GONE)
// pm = NULL` (make random monster). sanctum.lua's des.monster({ id =
// "erinys", … }) after three erinyes were born (G_EXTINCT, population
// cap) makes a random monster: rndmonst_adj's reservoir draws follow
// induced_align. JS's inline sanctum clone skipped the check and made an
// erinys (scen-worldtour-Wizard-49950016 step 289 level teleport to the
// sanctum, D-4063). Single prefix per file (multi-prefix runSegment
// leaks module state).
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
  return { handle, game };
}

describe("sanctum des.monster honours an extinct type (sp_lev.c:1949-1953)", () => {
  it("49950016 step 289 draws rndmonst after the extinct erinys' induced_align", { timeout: 180000 }, async () => {
    const { handle, game } = await runPrefix("scen-worldtour-Wizard-49950016", 290);
    assert.ok(game.sanctum_level && game.u.uz?.dlevel === game.sanctum_level.dlevel, "hero is in the sanctum");
    const { monsterNames } = await import("../js/generated/monsters_data.js");
    const erinys = monsterNames.indexOf("PM_ERINYS");
    assert.ok((game.mvitals?.[erinys]?.mvflags | 0) & 0x01, "erinys G_EXTINCT");
    assert.ok(!(game.fmon || []).some((mt) => mt.mnum === erinys), "no erinys made in the sanctum");
    const step = (handle.getRngSlices?.()?.[289] || []).map(String);
    assert.ok(step.some((e) => /^rn2\(5\)=/.test(e)), "rndmonst reservoir draws present");
  });
});
