import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// C ref: getpos.c dispatch + cmd.c reset_commands `:3463–3472` — the
// highc()/C() rush/run binds exist only under !num_pad, so under
// number_pad Enter ('\n', C('j')) is unbound and falls to the decl.c
// quitchars arm: "Done.", ccp (-1, 0), result 0 (getpos.c `:1132–1141`).
// JS used to rush +8 south and autodescribe ("stone").
// (scen-symset-Archeologist-50455067 steps 91/99/175/259/590, D-4042).
// Single prefix per file (multi-prefix runSegment leaks module state).
async function runFull(recipeName) {
  const raw = JSON.parse(readFileSync(
    new URL(`../hidden-corpus/recipes-reserve/${recipeName}.recipe.json`, import.meta.url), "utf8"));
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
    moves: seg.moves, storage,
  });
  const { game } = await import("../js/gstate.js");
  return { screens: handle.getScreens?.() || [], game };
}

describe("getpos Enter under number_pad is quitchar Done (getpos.c:1132-1141)", () => {
  it("50455067 #name-monster Enter prints Done, not rush-describe", { timeout: 180000 }, async () => {
    const { screens, game } = await runFull("scen-symset-Archeologist-50455067");
    assert.ok(screens.length > 590, `expected 591+ screens, got ${screens.length}`);
    for (const [idx, want] of [[91, "Done."], [99, "Done."], [175, "Done."],
        [259, "Done.--More--"], [590, "Done."]]) {
      const top = String(screens[idx]).split("\n")[0];
      assert.equal(top, want, `step ${idx} topline: ${JSON.stringify(top.slice(0, 60))}`);
    }
    // Mechanism: the rc's bare number_pad sets iflags.num_pad (optfn).
    assert.equal(game.iflags?.num_pad, true, "iflags.num_pad set from rc");
  });
});
