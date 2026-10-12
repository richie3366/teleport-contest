import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: mcastu.c cursetxt `:63-85` — the frustrated-cast point_msg arm
// reads the live Invis macro (youprop.h:198 `(HInvis||EInvis) && !BInvis`).
// JS read the u.Invis/HInvis/EInvis flats, which are stale unless the
// magic-trap toggle synced them (D-1999), so an extrinsically-invisible
// hero with a stale wizard mux got "points at you, then curses" where C
// prints "points and curses in your general direction"
// (scen-sweep-Caveman-582707 step 900: live Invis true, flats unset,
// wizard mux (39,12) vs hero (38,12) at the cast).
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

describe("cursetxt Invis arm reads live Invis() (mcastu.c:69)", () => {
  it("582707 step 900 wizard curses in your general direction", { timeout: 180000 }, async () => {
    const { screens, game } = await runPrefix("scen-sweep-Caveman-582707", 900);
    assert.ok(screens.length > 900, `expected 901+ screens, got ${screens.length}`);
    const top900 = String(screens[900]).split("\n")[0]
      .replace(/\x1b\[[0-9;]*[A-Za-z]/g, "");
    assert.equal(top900,
      "The gnomish wizard points and curses in your general direction.",
      `step 900 topline: ${JSON.stringify(top900.slice(0, 120))}`);
    // Mechanism: the hero's invisibility is live-only (uprops extrinsic);
    // the flats cursetxt used to read are all unset.
    const { Invis } = await import("../js/timeout.js");
    assert.equal(Invis(), true, "live Invis() is true at step 900");
    assert.ok(!(game.u.Invis || game.u.HInvis || game.u.EInvis),
      `Invis flats unset (got ${game.u.Invis}/${game.u.HInvis}/${game.u.EInvis})`);
  });
});
