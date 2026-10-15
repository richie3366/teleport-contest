import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: botl.c:177 + botl.c:1201 read `Strangled`, which is
// u.uprops[STRANGLED].intrinsic ONLY (youprop.h:110). The worn amulet's
// oc_oprop extrinsic (worn.c:123-125) is write-only in C — no C reader of
// EStrangled/HStrangled exists — so an immune form wearing the amulet
// shows no Strngl. JS read a 5-way union incl. extrinsic: a dust-vortex
// hero (can_be_strangled false) donning a wished amulet of strangulation
// (scen-sweep-Wizard-50050007 step 373) showed Strngl where C shows none.
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
  const C = await import("../js/const.js");
  const { objectNames } = await import("../js/generated/objects_data.js");
  const AMULET_OF_STRANGULATION = objectNames.indexOf("AMULET_OF_STRANGULATION");
  const { can_be_strangled } = await import("../js/uhitm.js");
  return { screens: handle.getScreens?.() || [], game, C, AMULET_OF_STRANGULATION, can_be_strangled };
}

describe("Strngl reads Strangled-intrinsic only (botl.c:177/:1201, youprop.h:110)", () => {
  it("50050007 step 373: vortex + worn AoS shows no Strngl", { timeout: 180000 }, async () => {
    const { screens, game, C, AMULET_OF_STRANGULATION, can_be_strangled } =
      await runPrefix("scen-sweep-Wizard-50050007", 374);
    assert.ok(screens.length > 373, `expected 374+ screens, got ${screens.length}`);
    const top373 = String(screens[373]).split("\n")[0];
    assert.equal(top373, "t - a concave amulet (being worn).",
      `step 373 topline: ${JSON.stringify(top373.slice(0, 100))}`);
    const row373 = String(screens[373]).split("\n")[23];
    assert.equal(row373, "Dlvl:26 $:0 HP:16(18) Pw:82(82) AC:2 HD:4 T:98 Blind Fly",
      `step 373 row23 (no Strngl): ${JSON.stringify(row373)}`);
    // Mechanism: the amulet is worn (extrinsic conferred, C-faithful) but
    // the vortex form is immune, so intrinsic and the flat stay 0.
    assert.equal(game.u?.uamul?.otyp | 0, AMULET_OF_STRANGULATION,
      "step 373 wears the wished amulet of strangulation");
    assert.equal(can_be_strangled(game.youmonst), false,
      "dust-vortex youmonst is immune to strangulation");
    assert.ok((game.u?.uprops?.[C.STRANGLED]?.extrinsic | 0) !== 0,
      "worn-AoS oc_oprop extrinsic is conferred (write-only in C)");
    assert.equal(game.u?.uprops?.[C.STRANGLED]?.intrinsic | 0, 0,
      "uprops[STRANGLED].intrinsic stays 0 (Amulet_on gate false)");
    assert.equal(game.u?.Strangled | 0, 0, "u.Strangled flat stays 0");
  });
});
