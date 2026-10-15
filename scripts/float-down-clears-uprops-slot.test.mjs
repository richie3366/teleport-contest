import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: trap.c float_down `:4032–4033` + youprop.h:235-236 — HLevitation IS
// u.uprops[LEVITATION].intrinsic (single storage), so the hmask/emask clear
// must hit the slot too. JS cleared only the flats: the dodown float_down
// (scen-sweep-Barbarian-50556042 step 1070, "You float gently to the
// floor.") left the slot at 273, and the next nh_timeout generic loop
// decremented it to 272 and mirrored the TIMEOUT bits back into the flat —
// re-levitating the hero (row 23 showed "Lev" where C shows none).
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
  const { LEVITATION } = await import("../js/const.js");
  return { screens: handle.getScreens?.() || [], game, LEVITATION };
}

describe("float_down clears the uprops LEVITATION slot (trap.c:4032-4033)", () => {
  it("50556042 step 1071 stays down: no Lev, flat and slot 0", { timeout: 180000 }, async () => {
    const { screens, game, LEVITATION } = await runPrefix("scen-sweep-Barbarian-50556042", 1072);
    assert.ok(screens.length > 1071, `expected 1072+ screens, got ${screens.length}`);
    const top1071 = String(screens[1071]).split("\n")[0];
    assert.equal(top1071, "The mastodon butts again!",
      `step 1071 topline: ${JSON.stringify(top1071.slice(0, 100))}`);
    const row1071 = String(screens[1071]).split("\n")[23];
    assert.equal(row1071, "Tutorial:2 $:0 HP:55(110) Pw:34(34) AC:10 Xp:14/80000 T:256 Stun",
      `step 1071 row23 (no resurrected Lev): ${JSON.stringify(row1071)}`);
    // Mechanism: dodown's float_down cleared the flat at step 1070; the
    // slot must be cleared with it so nh_timeout cannot mirror it back.
    assert.equal(game.u.HLevitation | 0, 0, "HLevitation flat stays 0");
    assert.equal(game.u.uprops?.[LEVITATION]?.intrinsic | 0, 0,
      "uprops[LEVITATION].intrinsic stays 0");
  });
});
