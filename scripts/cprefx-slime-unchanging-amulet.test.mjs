import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: eat.c cprefx PM_GREEN_SLIME `:851–856` — `if (!Slimed &&
// !Unchanging && !slimeproof(...))`; youprop.h Unchanging ≡ HUnchanging
// || EUnchanging, and a worn amulet of unchanging confers the extrinsic
// in uprops only. JS read flats only, so eating a glob of green slime
// with the amulet on slimed the hero at meal start (scen-sweep-Ranger-
// 50250033 step 648, D-4059). Single prefix per file (multi-prefix
// runSegment leaks module state).
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

describe("cprefx green slime honours a worn amulet of unchanging (eat.c:851-856)", () => {
  it("50250033 step 648 eats the glob without the slime message", { timeout: 180000 }, async () => {
    const { screens, game } = await runPrefix("scen-sweep-Ranger-50250033", 649);
    assert.ok(screens.length > 648, `expected 649+ screens, got ${screens.length}`);
    const top = String(screens[648]).split("\n")[0];
    assert.ok(!top.includes("You don't feel very well."), `step 648 topline: ${JSON.stringify(top.slice(0, 90))}`);
    assert.ok(top.includes("The quasit hits!"), `step 648 topline: ${JSON.stringify(top.slice(0, 90))}`);
    const { objectNames } = await import("../js/generated/objects_data.js");
    assert.equal(objectNames[game.u.uamul?.otyp], "AMULET_OF_UNCHANGING");
  });
});
